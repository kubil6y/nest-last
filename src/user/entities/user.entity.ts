import { Exclude } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { ModelEntity } from '../../utils/abstract-entity';

@Entity('users')
export class User extends ModelEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
