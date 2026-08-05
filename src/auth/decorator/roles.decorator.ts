import { SetMetadata } from '@nestjs/common'
import { RoleEnum } from '../enum/role.enum'

export const ROLES_METADATA_KEY = 'roles'

export const RequiredRoles = (...roles: RoleEnum[]) =>
  SetMetadata(ROLES_METADATA_KEY, roles)
