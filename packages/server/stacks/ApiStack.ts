import {Api, StackContext} from "sst/constructs";
export function ApiStack({stack}: StackContext) {
    const api = new Api(stack, "Api", {
        routes: {
            "GET /users": "packages/server/services/users/listUsers.handler",
            "GET /users/{id}": "packages/server/services/users/getUser.handler",
        },
    });

    // Show the API endpoint in the output
    stack
        .addOutputs({
            ApiEndpoint: api.url,
        });
}
