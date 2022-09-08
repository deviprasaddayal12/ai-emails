import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.schema';
import {
  CreateUserRequest,
  UpdatePasswordRequest,
  UpdateUserRequest,
} from './dtos/user.request';
import { SignUpRequest } from '../auth/dtos/auth.request';
import { AuthHelper } from 'src/global/services/auth.helper';
import { Messages } from 'src/global/config/consts.config';

const TAG = 'user.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly authHelper: AuthHelper,
  ) {}

  /**
   * @name doesUserExist
   * @description Method to check if asked email is registered against any user
   * @param email asked email to check for
   * @returns true if user exists false if not
   */
  async doesUserExist(email: string): Promise<boolean> {
    const user = await this.userModel
      .findOne({
        email: email,
      })
      .select('-password');
    return user !== null;
  }

  /**
   * @name signUpUser (meant for internal use only)
   * @description Method to create a new user document in users collection
   * @param signUpRequest all required/optional user details
   * @returns newly created user
   */
  async signUpUser(signUpRequest: SignUpRequest): Promise<User> {
    return await this.userModel.create({
      ...signUpRequest,
      isVerified: true,
      is2FAEnabled: false,
      isActive: true,
    });
  }

  /**
   * @name addUser (meant for internal use only)
   * @description Method to create a new user document in users collection
   * @param createUserRequest all required/optional user details
   * @returns newly created user
   */
  async addUser(
    userId: string,
    createUserRequest: CreateUserRequest,
  ): Promise<User> {
    return await this.userModel.create({
      ...createUserRequest,
      updatedBy: userId,
    });
  }

  /**
   * @name updateUser
   * @description Method to update a user
   * @param userId id of the user to update for
   * @param updateUserRequest all updatable fields for the user
   * @returns updated user
   */
  async updateUser(
    authUserId: string,
    userId: string,
    updateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    updateUserRequest.updatedBy = userId;
    // if (updateUserRequest.lastStatus !== null)
    //   updateUserRequest.lastStatus.updatedBy = userId;

    return await this.userModel
      .findByIdAndUpdate(userId, updateUserRequest, {
        new: true,
      })
      .select('-password');
  }

  /**
   * @name updatePassword
   * @description Method to update only the password for a user
   * @param updatePasswordRequest user-id and new-password of the user to update for
   * @returns updated user
   */
  async updatePassword(
    updatePasswordRequest: UpdatePasswordRequest,
  ): Promise<User> {
    const hashedPassword = await this.authHelper.hashPassword(
      updatePasswordRequest.password,
    );
    return await this.userModel
      .findByIdAndUpdate(
        updatePasswordRequest.userId,
        { password: hashedPassword },
        { new: true },
      )
      .select('-password');
  }

  /**
   * @name update2FactorAuth
   * @description Method to enable/disable 2fa for a user
   * @param userId id of the user to update for
   * @param enable2FA 2fa value to set
   * @returns updated user
   */
  async update2FactorAuth(userId: string, enable2FA: boolean): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(userId, { is2FAEnabled: enable2FA }, { new: true })
      .select('-password')
      .lean();
  }

  /**
   * @name update2FAVerification
   * @description Method to mark if 2fa is complete for current sign-in or reset it for next
   * @param userId id of the user to update for
   * @param markVerified true: 2fa has been verified for current sign-in; false: reset for next sign-in
   * @returns updated user
   */
  async update2FAVerification(
    userId: string,
    markVerified: boolean,
  ): Promise<User> {
    if (markVerified)
      return await this.userModel
        .findByIdAndUpdate(
          userId,
          {
            is2FAVerified: markVerified,
            // $set: { lastLoggedInAt: new Date().toString() },
          },
          { new: true },
        )
        .select('-password');
    else
      return await this.userModel
        .findByIdAndUpdate(
          userId,
          { is2FAVerified: markVerified },
          { new: true },
        )
        .select('-password');
  }

  /**
   * @name updateLastSignIn
   * @description Method to update last sign-in timestamp
   * @param userId id of the user to update for
   * @returns updated user
   */
  async updateLastSignIn(userId: string): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          // $set: { lastLoggedInAt: new Date().toString() },
        },
        { new: true },
      )
      .select('-password');
  }

  /**
   * @name markVerified for internal use only
   * @description Method to mark if user has been verified after signing-up
   * @param userId id of the user to update for
   * @returns updated user
   */
  async markVerified(userId: string): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(userId, { isVerified: true }, { new: true })
      .select('-password');
  }

  /**
   * @name markUnverified for internal use only
   * @description Method to mark if user has been verified after signing-up
   * @param userId id of the user to update for
   * @returns updated user
   */
  async markUnverified(userId: string): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(userId, { isVerified: false }, { new: true })
      .select('-password');
  }

  /**
   * @name updateLocation
   * @description Method to update current location of user
   * @param userId id of the user to update for
   * @param coordinates latest coordinates of the user
   * @returns updated user
   */
  async updateLocation(userId: string, coordinates: number[]): Promise<User> {
    const geoJson = {};
    geoJson['type'] = 'Point';
    geoJson['coordinates'] = coordinates;

    return await this.userModel
      .findByIdAndUpdate(userId, { userLocation: geoJson }, { new: true })
      .select('-password');
  }

  async getUsers(offset: number, limit: number): Promise<User[]> {
    return await this.userModel
      .find({
        isActive: true,
      })
      .select('-password')
      .skip(offset)
      .limit(limit);
  }

  async getInactiveUsers(): Promise<User[]> {
    return await this.userModel
      .find({
        isActive: false,
        isVerified: true,
      })
      .select('-password');
  }

  async getUnverifiedUsers(): Promise<User[]> {
    return await this.userModel
      .find({
        isVerified: true,
      })
      .select('-password');
  }

  async getUser(userId: string): Promise<User> {
    return await this.userModel.findById(userId).select('-password');
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({
        email: email,
      })
      .select('-password');
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    return await this.userModel.findOne({
      email: email,
    });
  }

  async findByName(name: string): Promise<User> {
    return await this.userModel
      .findOne({
        isVerified: true,
        $text: {
          $search: name,
        },
      })
      .select('-password');
  }

  /**
   * @name searchUser
   * @description Method to get list of users with asked searchKey
   * @param searchKey look for users that contain this key in fullname, email
   * @returns list of users
   */
  async searchUser(searchKey: string): Promise<User[]> {
    return await this.userModel
      .find({
        isVerified: true,
        isActive: true,
        $text: {
          $search: searchKey,
        },
      })
      .select('-password');
  }

  /**
   * @name deactivate
   * @description Method to disable a user
   * @param userId id of the user to look for
   * @returns an info-message
   */
  async deactivate(userId: string): Promise<string> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        isActive: false,
      },
      {
        new: true,
      },
    );

    if (user === null)
      throw new BadRequestException(Messages.User.ERR_NOT_EXIST);
    else return Messages.User.ERR_NOT_EXIST;
  }

  /**
   * @name delete
   * @description Method to delete a user
   * @param userId id of the user to look for
   * @returns deleted user
   */
  async delete(userId: string): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(userId, {
        isDeleted: true,
      })
      .select('-password');

    if (user === null)
      throw new BadRequestException(Messages.User.ERR_NOT_EXIST);
    else return user;
  }
}
