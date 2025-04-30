export abstract class BaseEntity {
  id!: string;
  isActive!: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}