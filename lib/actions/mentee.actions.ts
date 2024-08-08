import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
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
}