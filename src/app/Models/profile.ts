import { User } from "./user";

export class Profile 
{
    id!: number;
    name!: string;
    email!: string;
    address!: string;
    image!: string | null | ArrayBuffer;
    userName!:string;
}
