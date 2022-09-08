import { ApiStatus } from '../config/consts.config';
import { Response } from './response.dto';

function createResponse<T>(
  success: boolean,
  status: number,
  message: string,
  data: T = null,
): Response<T> {
  return {
    success: success,
    status: status,
    message: message,
    data: data,
  };
}

export function createAuthorizationFailureResponse(): Response<null> {
  return createResponse(
    false,
    ApiStatus.STATUS_AUTHORIZATION_FAILURE,
    "Either invalid authorization or you're not authorized for this action!",
  );
}

export function createRouteNotFoundResponse(): Response<null> {
  return createResponse(
    false,
    ApiStatus.STATUS_URL_NOT_FOUND,
    "Requested endpoint doesn't exist!",
  );
}

export function createInternalFailureResponse(
  message: string = 'Something went wrong!',
): Response<null> {
  return createResponse(false, ApiStatus.STATUS_DATABASE_FAILURE, message);
}

export function createUploadFailureResponse(message: string): Response<null> {
  return createResponse(
    false,
    ApiStatus.STATUS_DATABASE_FAILURE,
    message || 'Something went wrong!',
  );
}

export function createBadRequestResponse(message: string): Response<null> {
  return createResponse(true, ApiStatus.STATUS_BAD_REQUEST, message);
}

export function createMessageResponse(message: string): Response<null> {
  return createResponse(
    true,
    ApiStatus.STATUS_DATA_NOT_FOUND,
    message || 'No records found.',
  );
}

export function createDataResponse<T>(message: string, data: T): Response<T> {
  return createResponse(
    true,
    ApiStatus.STATUS_SUCCESS_WITH_DATA,
    message,
    data,
  );
}
