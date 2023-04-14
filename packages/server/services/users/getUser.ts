import {handler as h} from '../../lib/handler'
export const handler = h(getUser);

async function getUser(event) {
    console.log("hello from event");
}