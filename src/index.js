import { InteractionResponseType, InteractionType, ButtonStyleTypes } from 'discord-interactions';
import { Router } from 'itty-router';
import { validateDiscordRequest } from './lib/discord/request-validator.js';
import { MessageResponse, ButtonsResponse } from './lib/discord/responses.js';
import { Button, ButtonComponent } from './lib/discord/components.js';

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

    if (message.type === InteractionType.MESSAGE_COMPONENT) {
        console.log('Handling message component request');
        return new MessageResponse(`${message.member.user.username ?? "somebody"} clicked me! ${message.data.custom_id}.`)
    }
    const button = new ButtonComponent("new_button", "Button 1");
    button.components.push(new Button("test", "testing"));
    const button2 = new ButtonComponent("new_button_2", "Button 2", ButtonStyleTypes.DANGER);
    button2.components.push(new Button("test_1", "also testing", ButtonStyleTypes.SUCCESS));
    const response = new ButtonsResponse('This is testing components!', [button, button2]);
    return response;
});
router.all('*', () => new Response('Not found!', { status: 404 }));

export default {
    async fetch(request, env, ctx) {
        return router.handle(request, env);
    }
};
