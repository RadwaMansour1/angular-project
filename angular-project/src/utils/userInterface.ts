import { CartItem } from "../app/models/cartItem.model";

export default interface UserInterface{
    id:string,
    name:string,
    email:string,
    balance:number,
    password:string,
    phone:string,
    favorites:string[],
    gender:string,
    address:string,
    cart: CartItem[],
    orders:{
      orderId: string,
      products: { productId: string, quantity: number } [],
      totalPrice: number,
      status: string,
      date: string
    }[]|[]
}
