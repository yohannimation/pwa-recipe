import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../../../common/enums/role.enum';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'John Doe' })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CHEF,
  })
  @ApiProperty({ enum: Role, example: Role.CHEF })
  role: Role;

  // JWT token version, ensures that the current token is the correct one
  @Column({ default: 0 })
  @Exclude()
  tokenVersion: number;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  @ApiProperty({ type: () => Recipe, isArray: true })
  recipes: Recipe[];
}
