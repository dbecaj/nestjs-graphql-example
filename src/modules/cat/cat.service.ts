import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cat, CreateCat, UpdateCat } from "./cat.entity";
import { Repository, DeleteResult } from "typeorm";

@Injectable()
export class CatService {

    constructor(
        @InjectRepository(Cat)
        private readonly catRepo: Repository<Cat>,
    ) {}

    async get(id: string): Promise<Cat> {
        return this.catRepo.findOne(id);
    }

    async getAll(): Promise<Cat[]> {
        return this.catRepo.find();
    }

    async create(cat: CreateCat): Promise<Cat> {
        return this.catRepo.save(Object.assign(new Cat(), cat));
    }

    async update(id: string, cat: UpdateCat): Promise<Cat> {
        return this.catRepo.save({
            id,
            ...cat
        })
    }

    async delete(id: string): Promise<DeleteResult> {
        return this.catRepo.delete(id);
    }
}