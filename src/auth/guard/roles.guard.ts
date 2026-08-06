/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enum/role.enum';
import { ROLES_METADATA_KEY } from '../decorator/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const role = RoleEnum.Admin || RoleEnum.User;
    const request = context.switchToHttp().getRequest();
    const user = request.user as { role?: RoleEnum } | undefined;
    // if (!['admin', 'user'].includes(lowerRole)) {
    const lowerRole = String(role).toLowerCase();
    if (!user?.role || !requiredRoles.includes(lowerRole as RoleEnum)) {
      this.logger.error(
        `Unauthorized role. Required: ${requiredRoles.join(', ')}`,
      );
      throw new ForbiddenException(
        'You have to be admin to update or delete any user info',
      );
    }
    return true;
  }
}

@Injectable()
export class CheckIfAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('You have to register first');
    }

    const userRole = user.role ? String(user.role).toLowerCase() : '';
    const adminRole = String(RoleEnum.Admin).toLowerCase();

    if (userRole === adminRole) {
      return true;
    }

    throw new ForbiddenException({
      message: `You aren't admin, so if you still want to be admin, ask admins to grant you admin as well `,
      error: ForbiddenException,
      statuscode: 403,
    });
  }
}

@Injectable()
export class CheckIfAdminOrAccessingTheIrOwnInfoGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const userRole = user.role ? String(user.role).toLowerCase() : '';
    const adminRole = String(RoleEnum.Admin).toLowerCase();

    if (userRole === adminRole) {
      return true;
    }

    const userId = user.id !== undefined ? user.id : user.userId;
    const targetId =
      request.params.id !== undefined
        ? request.params.id
        : request.params.userId;

    if (
      userId !== undefined &&
      targetId !== undefined &&
      String(userId) === String(targetId)
    ) {
      return true;
    }

    throw new ForbiddenException(
      'You either not admin or not modifying your own information as user',
    );
  }
}
