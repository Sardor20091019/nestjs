/* eslint-disable prettier/prettier */
import { RoleEnum } from "../../auth/enum/role.enum"

export class User {
    id!: number
    name!: string
    email!: string
    age!: number
    role?: RoleEnum
}
