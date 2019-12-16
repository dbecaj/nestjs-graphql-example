import { Injectable, CanActivate, ExecutionContext, UseGuards } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class CatGuard implements CanActivate {
    
    canActivate(context: ExecutionContext) {
        const newContext = GqlExecutionContext.create(context);
        console.log(newContext.getContext().request.body);

        return true;
    }
}

export const CatValidator = () => UseGuards(CatGuard);