import { HttpException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurants.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, Tags } from './schemas/restaurants.schema';
import { Model, ObjectId } from 'mongoose';
import { isEnum } from 'class-validator';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: Model<Restaurant>,
    ) {}

    async create(createRestaurantDto: CreateRestaurantDto) {
        console.log('@Create => ', createRestaurantDto);

        const restaurant = await this.restaurantModel.create(createRestaurantDto);
        return restaurant;
    }

    async findAll() {
        return this.restaurantModel.find();
    }

    async findOne(id: ObjectId) {
        const restaurant = await this.restaurantModel.findById(id);
        console.log('@getbyID => ', { id, restaurant });
        return restaurant;
    }

    async update(id: ObjectId, updateRestaurantDto: UpdateRestaurantDto) {
        console.log('@Update => ', { updateRestaurantDto, id });

        return `This action updates a #${id} restaurant`;
    }

    async remove(id: ObjectId) {
        console.log('@Remove => ', id);
        return `This action removes a #${id} restaurant`;
    }

    private validateTag(tags: string[]): tags is Tags[] {
        const isValid = tags.map((tag) => {
            return isEnum(tag, Tags);
        });
        console.log('@isValid => ', isValid);

        if (isValid.includes(false)) {
            throw new HttpException('One or more tags are invalid', 400);
        } else return true;
    }
}

/** 
 * @param validateObjectId(id: string | any): id is ObjectId {
        return /[0-9a-fA-F]{24}/.test(id);
    }
 */
