export class Constants {
  static USER_ID: 'userId';
  static AUTH_USER_ID: 'authUserId';
}

export const Envs = {
  DEV: 'dev',
  QA: 'qa',
  PROD: 'prod',
};

export const ApiStatus = {
  STATUS_AUTHORIZATION_FAILURE: 400,
  STATUS_BAD_REQUEST: 402,
  STATUS_URL_NOT_FOUND: 404,
  STATUS_DATABASE_FAILURE: 405,
  STATUS_DATA_NOT_FOUND: 201,
  STATUS_SUCCESS_WITH_DATA: 200,
};

export const Messages = {
  Auth: {
    MSG_EMAIL_NOT_REGISTERED: 'Email is not registered with us!',
    MSG_EMAIL_REGISTERED_ALREADY: 'Email is already registered with us!',
    MSG_PHONE_NOT_REGISTERED: 'Phone is not registered with us!',
    MSG_PHONE_REGISTERED_ALREADY: 'Phone is already registered with us!',
    MSG_PHONE_INVALID:
      "Phone number is invalid! Make sure you're adding country code.",
    MSG_EMAIL_OR_PHONE_NOT_REGISTERED:
      'Email or phone is not registered with us!',
    MSG_EMAIL_OR_PHONE_ALREADY_VERIFIED:
      'Email or phone has been verified already!',
    MSG_WRONG_PASSWORD: 'Entered password is wrong!',
    MSG_EMAIL_OR_PHONE_INVALID:
      "Email or phone is not valid! Make sure the domain is accepted for email and you've added country code in case of phone.",
    MSG_2FA_SUCCESSFUL: '2FA was successful.',
    MSG_INVALID_TOKEN:
      "Either requested user doen't exist or the token used is invalid.",

    MSG_OTP_SENT_TO_EMAIL: 'Otp has been sent to your email!',
    MSG_OTP_SENT_TO_PHONE: 'Otp has been sent to your phone!',
    MSG_OTP_INCORRECT: 'You have entered an incorrect otp!',
    MSG_OTP_RESEND: 'Otp has been sent to your registered',
    MSG_OTP_NOT_SENT: "Couldn't send otp for unknown reasons.",
  },

  User: {
    ERR_NOT_EXIST: "Requested user doesn't exist!",
    ERR_INACTIVE: 'Requested user is inactive!',

    MSG_VERIFICATION_PENDING: 'Your account is pending verification!',
    MSG_2FA_VERIFY: 'Your account is 2fa enabled.',
    MSG_DISABLED: 'You have disabled your account successfully!',
    MSG_INVITEE_NOT_EXIST: 'Invitee code used is invalid!',
    MSG_LOCATION_IS_MISSING: 'User location is missing!',

    INFO_DISABLED: 'Your account has been disabled!',
  },

  Template: {
    ERR_NOT_EXIST: "Requested template doesn't exist!",
    ERR_INACTIVE: 'Requested template is inactive!',

    MSG_CREATED: 'Requested template has been added successfully!',
    MSG_ALL_FOUND: 'Requested templates has been fetched successfully!',
    MSG_ONE_FOUND: 'Requested template has been fetched successfully!',
    MSG_UPDATED: 'Requested template has been updated successfully!',
    MSG_DEACTIVATED: 'Requested template has been deactivated successfully!',
    MSG_DELETED: 'Requested template has been deleted successfully!',
  },

  Report: {
    ERR_NOT_EXIST: "Requested report doesn't exist!",
    ERR_INACTIVE: 'Requested report is inactive!',

    MSG_CREATED: 'Requested report has been added successfully!',
    MSG_ALL_FOUND: 'Requested reports has been fetched successfully!',
    MSG_ONE_FOUND: 'Requested report has been fetched successfully!',
    MSG_UPDATED: 'Requested report has been updated successfully!',
    MSG_DEACTIVATED: 'Requested report has been deactivated successfully!',
    MSG_DELETED: 'Requested report has been deleted successfully!',
  },
};
