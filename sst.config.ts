import {ApiStack} from "./packages/server/stacks/ApiStack";

export default {
    config(input) {
        return {
            name: "keel",
            region: "us-east-1",
        };
    },
    stacks(app) {
        app.stack(ApiStack)
    },
};