import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { Router } from 'itty-router';
import { validateDiscordRequest } from './request-validator.js';

class JsonResponse extends Response {
    constructor(body, init) {
        const jsonBody = JSON.stringify(body);
        init = init || {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        };
        super(jsonBody, init);
    }
}

const router = Router();
router.post('/interactions', async (request, env) => {
    const isValidRequest = await validateDiscordRequest(request, env);
    if (!isValidRequest) {
        console.error('Invalid Request');
        return new Response('Bad request signature.', { status: 401 });
    }

    const message = await request.json();
    console.log(message);
    if (message.type === InteractionType.PING) {
        console.log('Handling Ping request');
        return new JsonResponse({
            type: InteractionResponseType.PONG,
        });
    }

    return new JsonResponse({ type: 3, content: 'Hell, World!' }, { status: 200 });
});
router.all('*', () => new Response('Not found!', { status: 404 }));

export default {
    async fetch(request, env, ctx) {
        return router.handle(request, env);
    }
};
