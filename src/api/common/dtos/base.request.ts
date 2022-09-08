import { OmitType } from '@nestjs/swagger';
import { Base } from '../schemas/base.schema';

export class BaseRequest extends OmitType(Base, ['_id']) {}
