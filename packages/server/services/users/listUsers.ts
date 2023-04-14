import {handler as h} from '../../lib/handler'
export const handler = h(listUsers);

async function listUsers(event) {
    console.log("hello from list");
}