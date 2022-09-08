import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiQuery,
  ApiParam,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { User } from './models/user.schema';
import { UserService } from './user.service';
import { JwtGuard } from 'src/global/guards/jwt.guard';
import { AuthUserId } from '../common/decorators/user-id.decorator';
import { Response } from 'src/global/response/response.dto';
import {
  createDataResponse,
  createMessageResponse,
} from 'src/global/response/response.helper';

const TAG = 'user.controller';

@ApiBearerAuth()
@ApiTags('users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  @ApiOperation({
    summary: 'Get a list of users',
  })
  @ApiOkResponse({
    description: 'Users successfully fetched',
    type: [User],
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiQuery({ name: 'offset', schema: { default: 0 } })
  @ApiQuery({ name: 'limit', schema: { default: 25 } })
  async getUsers(
    @AuthUserId() userId: string,
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ): Promise<Response<User[]>> {
    const users = await this.userService.getUsers(
      parseInt(offset),
      parseInt(limit),
    );
    if (users.length == 0) {
      return createMessageResponse('No users found!');
    }
    return createDataResponse<User[]>('Users successfully fetched.', users);
  }

  @UseGuards(JwtGuard)
  @Get('/:userId')
  @ApiOperation({
    summary: 'Get a specific user',
  })
  @ApiOkResponse({
    description: 'User successfully fetched',
    type: User,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiQuery({ name: 'userId', type: String })
  async getUser(
    @AuthUserId() authUserId: string,
    @Query('userId') userId: string,
  ): Promise<Response<User>> {
    const user = await this.userService.getUser(userId);
    if (user === null) {
      return createMessageResponse('Users not found!');
    }
    return createDataResponse<User>('Users successfully fetched.', user);
  }
}
