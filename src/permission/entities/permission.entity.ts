import { Column, Entity } from 'typeorm';
import { ModelEntity } from '../../utils/abstract-entity';

@Entity('permissions')
export class Permission extends ModelEntity {
  @Column()
  name: string;
}
