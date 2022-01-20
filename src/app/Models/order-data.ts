import { IproductOrderViewModels } from "./iproduct-order-view-models";

export interface OrderData
   {
        orderId: number
        userId:string
        orderDate:Date
        state: number
        paymentType: number
        name: string
        address: string
        phone: number
        productOrderViewModels :IproductOrderViewModels[] 
          
           
        
    }

