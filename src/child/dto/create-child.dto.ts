import { IsBoolean, IsDefined } from 'class-validator';

export class CreateChildDto {
  @IsDefined()
  name: string;
  @IsDefined()
  address: string;
  @IsDefined()
  @IsBoolean()
  isNaughty: boolean;
}
