import { ICart } from "./icart";
import { ItemInCart } from "./item-in-cart";
import { Profile } from "./profile";

export class UserData 
{
    profile!: Profile ;
    cart!: ICart;
    cartItem!: ItemInCart;
}
