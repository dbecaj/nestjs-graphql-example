import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().request;
        console.log(req);
        
        return super.canActivate(new ExecutionContextHost([req]));
    }
}