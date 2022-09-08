import { OmitType } from '@nestjs/swagger';
import { Person } from './../schemas/person.schema';

export class PersonRequest extends OmitType(Person, []) {}
