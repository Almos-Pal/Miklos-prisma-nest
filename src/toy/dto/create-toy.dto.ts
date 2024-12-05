import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateToyDto {
  @IsDefined()
  @IsString()
  name: string;
  @IsDefined()
  @IsString()
  material: 'wood' | 'metal' | 'plastic' | 'other';
  @IsDefined()
  @IsNumber()
  weight: number;
}
