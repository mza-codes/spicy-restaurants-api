import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IRestaurant {
    title: string;
    time: string;
    price: string;
    tags: Tags[];
    featured: boolean;
    img: string;
}

export enum Tags {
    pizza = 'pizza',
    burger = 'burger',
    bbq = 'bbq',
    sushi = 'sushi',
    vegan = 'vegan',
    desserts = 'desserts',
} // MUST SYNC WITH FRONTEND

@Schema({ timestamps: true })
export class Restaurant extends Document implements IRestaurant {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    time: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true })
    tags: Tags[];

    @Prop({ required: true })
    featured: boolean;

    @Prop({ required: true, unique: true })
    img: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

// export type Tags = 'pizza' | 'burger' | 'bbq' | 'sushi' | 'vegan' | 'desserts';
