import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './types/paginated-result.interface';

@Injectable()
export abstract class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}

  async findAll(relations: any[] = []): Promise<any[]> {
    return this.repository.find({ relations });
  }
  async paginate(
    page: number = 1,
    take: number = 10,
    relations: any[] = [],
  ): Promise<PaginatedResult> {
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: take * (page - 1),
      relations,
    });
    return {
      meta: {
        total,
        currentPage: page,
        lastPage: Math.ceil(total / take),
      },
      data,
    };
  }

  async findOne(by: any, relations: any = []): Promise<any> {
    return this.repository.findOne(by, { relations });
  }

  async create(data): Promise<any> {
    return await this.repository.save(data);
  }

  async update(id: number, data): Promise<any> {
    await this.repository.update(id, data);
    return this.findOne({ id });
  }

  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
