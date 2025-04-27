import { User } from "./types";

export{}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface CustomJwtSessionClaims extends User {

    }
}