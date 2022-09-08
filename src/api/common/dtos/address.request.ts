import { OmitType } from '@nestjs/swagger';
import { Address } from './../schemas/address.schema';

export class AddressRequest extends OmitType(Address, []) {}
