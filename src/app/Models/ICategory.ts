import { IProduct } from "./IProduct";

export interface ICategory {
    id:number;
    name : string;
    description : string;
    imgUrl:string | null;
    products : IProduct[];
    image : Uint8Array[] | null;
}
