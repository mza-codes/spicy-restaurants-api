import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurants.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurants.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: Model<Restaurant>,
    ) {}

    validateObjectId(id: string | any): id is ObjectId {
        return /[0-9a-fA-F]{24}/.test(id);
    }

    create(createRestaurantDto: CreateRestaurantDto) {
        console.log('@Create => ', createRestaurantDto);
        return 'This action adds a new restaurant';
    }

    async findAll() {
        return await this.restaurantModel.find();
    }

    async findOne(id: ObjectId) {
        const restaurant = await this.restaurantModel.findById(id);
        console.log('@getbyID => ', { id, restaurant });
        return restaurant;
    }

    update(id: ObjectId, updateRestaurantDto: UpdateRestaurantDto) {
        console.log('@Update => ', { updateRestaurantDto, id });
        return `This action updates a #${id} restaurant`;
    }

    remove(id: ObjectId) {
        console.log('@Remove => ', id);
        return `This action removes a #${id} restaurant`;
    }
}
