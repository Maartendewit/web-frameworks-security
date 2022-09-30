export interface UserInterface {
    id?: number;
    name: string;
    eMail: string;
    hashedPassword: string;
    admin: boolean;
    exp: number;
}

export class User implements UserInterface {
    id?: number;
    name: string;
    eMail: string;
    hashedPassword: string;
    admin: boolean;
    exp: number;
}
