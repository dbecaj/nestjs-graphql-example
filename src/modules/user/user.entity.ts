import { Field, ID, InputType, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    STANDARD = 'STANDARD',
    ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
    name: "UserRole",
    description: "User roles"
});

@ObjectType()
@Entity()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({
        unique: true
    })
    email: string;

    @Field()
    @Column()
    password: string;

    @Field(type => UserRole, {
        nullable: true
    })
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STANDARD
    })
    role: UserRole;
}

@InputType()
export class LoginUser {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class CreateUser {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class UpdateUser {
    @Field({ nullable: true })
    password: string;
}