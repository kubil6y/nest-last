import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { ModelEntity } from '../../utils/abstract-entity';

@Entity('users')
export class User extends ModelEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;
}
