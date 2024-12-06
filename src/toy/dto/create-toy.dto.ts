import { IsDefined, IsIn, IsNumber, IsString, Min } from 'class-validator';

export class CreateToyDto {
  @IsDefined()
  @IsString()
  name: string;
  @IsDefined()
  @IsString()
  @IsIn(['wood', 'metal', 'plastic', 'other'])
  material: 'wood' | 'metal' | 'plastic' | 'other';
  @IsDefined()
  @IsNumber()
  @Min(0)
  weight: number;
}
