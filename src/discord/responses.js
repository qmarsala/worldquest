import { InteractionResponseType } from 'discord-interactions';

export class JsonResponse extends Response {
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

export class MessageResponse extends JsonResponse {
    constructor(message, init) {
        const body = {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: message
            }
        };
        super(body, init);
    }
}

export class ButtonsResponse extends JsonResponse {
    constructor(message, buttons, init) {
        const body = {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: message,
                components: [
                    ...buttons
                ]
            }
        };
        super(body, init);
    }
}