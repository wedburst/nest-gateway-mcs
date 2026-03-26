import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    available?: boolean;
}
