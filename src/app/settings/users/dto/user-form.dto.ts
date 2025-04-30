import { BaseFormDto } from "@/core/dto/base-form.dto";
import { UserEntity } from "../entity/user.entity";

export class UserFormDto extends BaseFormDto{
    constructor(data: UserEntity) {
        super();
        Object.assign(this, {
            isActive: data.isActive,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
            password: data.password,
        });
    }

    name!: string;
    email!: string;
    role!: string;
    phone?: string;
    isActive?: boolean;
    password?: string;
};