import { PartialType } from '@nestjs/mapped-types';
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayUnique,
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNotIn,
    IsNumberString,
    IsString,
    IsUrl,
} from 'class-validator';
import { IRestaurant, Tags } from '../schemas/restaurants.schema';

export class CreateRestaurantDto implements IRestaurant {
    @IsBoolean()
    featured: boolean;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    img: string;

    @IsString()
    @IsNotEmpty()
    place: string;

    @IsNumberString()
    @IsNotEmpty()
    price: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(6)
    @IsString({ each: true })
    @IsEnum(Tags, { each: true, message: 'One or more tags are invalid' })
    @ArrayUnique()
    tags: Tags[];

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumberString()
    @IsNotEmpty()
    time: string;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
