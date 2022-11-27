import { verifyKey } from 'discord-interactions';

const validateDiscordRequest = async (request, env) => {
    if (request.method === 'POST') {
        const signature = request.headers.get('x-signature-ed25519');
        const timestamp = request.headers.get('x-signature-timestamp');
        const body = await request.clone().arrayBuffer();
        const isValidRequest = verifyKey(
            body,
            signature,
            timestamp,
            env.DISCORD_PUBLIC_KEY
        );
        return isValidRequest;
    }
    return true;
}

export { validateDiscordRequest }