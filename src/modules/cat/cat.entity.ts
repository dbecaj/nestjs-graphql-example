import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, Int, ID, InputType } from 'type-graphql';
import { User } from "../user/user.entity";


@ObjectType()
@Entity()
export class Cat {
    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @Field(type => Int)
    @Column()
    age: number;

    @Field(type => Int)
    @Column()
    weight: number;
}

@InputType()
export class CreateCat {
    @Field()
    name: string;

    @Field(type => Int)
    age: number;

    @Field(type => Int)
    weight: number;
}

@InputType()
export class UpdateCat {
    @Field({ nullable: true })
    name: string;

    @Field(type => Int, { nullable: true })
    age: number;

    @Field(type => Int, { nullable: true })
    weight: number;
}