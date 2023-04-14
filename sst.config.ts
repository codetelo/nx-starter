import {ApiStack, WebStack} from "./packages/server/stacks";

export default {
    config(input) {
        return {
            name: "keel",
            region: "us-east-1",
        };
    },
    stacks(app) {
        app.stack(ApiStack)
        app.stack(WebStack)
    },
};