import * as sdk from 'node-appwrite';

export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
export const MENTEE_COLLECTION_ID = process.env.NEXT_PUBLIC_MENTEE_COLLECTION_ID;
export const APPOINTMENT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID;
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const client = new sdk.Client();

client
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

    client.headers = {
        'Access-Control-Allow-Origin': BASE_URL!,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);