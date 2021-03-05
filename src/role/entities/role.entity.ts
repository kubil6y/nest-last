import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ModelEntity } from '../../utils/abstract-entity';

@Entity('roles')
export class Role extends ModelEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  user: User;
}
