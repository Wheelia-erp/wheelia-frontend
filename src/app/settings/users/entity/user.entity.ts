import { BaseEntity } from "@/core/entity/base.entity";

export class UserEntity extends BaseEntity{
  id!: string;
  name!: string;
  email!: string;
  phone?: string;
  role?: string;
  isActive!: boolean;
  password!: string;
}