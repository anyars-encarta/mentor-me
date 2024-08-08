import { ID, Query } from "node-appwrite"
import { DATABASE_ID, databases, MENTEE_COLLECTION_ID, users } from "../appwrite.config"
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            user.phone, 
            undefined, 
            user.name,
        )

        return parseStringify(newUser);
    } catch (e: any) {
        if (e && e?.code === 409) {
            const existingUser = await users.list([
                Query.equal('email', [user.email])
            ])

            return existingUser?.users[0]
        }
        console.error("An error occurred while creating a new user:", e);
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)

        return parseStringify(user)
    } catch (e) {
        console.log(e)
    }
};

export const registerMentee = async ({...mentee}: RegisterUserParams) => {
    try {
        const newMentee = await databases.createDocument(
            DATABASE_ID!,
            MENTEE_COLLECTION_ID!,
            ID.unique(),
            {
                ...mentee
            }
        )

        console.log('New Mentee: ', newMentee)

        return parseStringify(newMentee);
    } catch (e) {
        console.log(e)
    }
}