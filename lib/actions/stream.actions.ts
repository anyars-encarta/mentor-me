'use server';

import { getUser } from "./mentee.actions";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async (userId: string) => {
    const user = await getUser(userId);

    if (!user) throw new Error('User is not logged in');
    if (!apiKey) throw new Error('No API key');
    if (!apiSecret) throw new Error('No API Secret');

    const streamClient = new streamClient
}