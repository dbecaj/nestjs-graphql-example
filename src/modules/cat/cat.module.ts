import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cat } from "./cat.entity";
import { CatService } from "./cat.service";
import { CatResolver } from "./cat.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cat]),
    ],
    providers: [
        CatService,
        CatResolver,
    ]
})
export class CatModule {}