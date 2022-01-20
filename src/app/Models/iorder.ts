import { OrderviewModels } from "./orderview-models";

export interface Iorder {
    name:string;
    address:string;
    phone:Number;
    payment:number;
    orderviewModels: OrderviewModels[]
}
