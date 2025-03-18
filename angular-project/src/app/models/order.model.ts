import { Product } from "./product";

export interface Order{
    orderId:string;
    products:Product[];
    totalPrice:number;
    status:string;
    date:string;
}