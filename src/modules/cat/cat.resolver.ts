import { Cat, CreateCat, UpdateCat } from "./cat.entity";
import { CatService } from "./cat.service";
import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { Int } from "type-graphql";
import { CatValidator } from "./cat.guard";

@Resolver(of => Cat)
export class CatResolver {
    
    constructor (
        private readonly catService: CatService,
    ) {}

    @Query(returns => Cat, { nullable: true })
    async cat(@Args('id') id: string) {
        return await this.catService.get(id);
    }

    @CatValidator()
    @Query(returns => [Cat])
    async cats() {
        return this.catService.getAll();
    }

    @Mutation(returns => Cat)
    async createCat(@Args('cat') cat: CreateCat) {
        return this.catService.create(cat);
    }

    @Mutation(returns => Cat)
    async updateCat(@Args('id') id: string, @Args('cat') cat: UpdateCat) {
        return this.catService.update(id, cat);
    }

    @Mutation(returns => Boolean)
    async deleteCat(@Args('id') id: string) {
        const result = await this.catService.delete(id);
        return !!result.affected;
    }
}