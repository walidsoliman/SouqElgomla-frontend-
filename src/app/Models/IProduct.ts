export interface IProduct {
    id:number;
    name:string;
    productionDate?:Date;
    expirDate?:Date;
    imageUrl:string | null;
    price:number;
    quantity:number;
    description:string;
    categoryId:number;
    rate:number;
    image:Uint8Array[] | null;
    packgesNumber:number|null;
    unitWeight:string | null;
}
