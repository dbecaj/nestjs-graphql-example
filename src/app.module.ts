import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './modules/cat/cat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "port": 5432,
      "username": "postgres",
      "password": "geslo123",
      "database": "cat-db",
      "synchronize": true,
      "entities": [join(__dirname, '**/**.entity{.ts,.js}')],
  }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => {
        return {
          request: req,
        };
      }
    }),
    CatModule,
    AuthModule,
    UserModule,
  ]
})
export class AppModule {}
