import { Bill } from "./bill";
import { login } from "./login";

export interface Payment 
// extends login,Bill
{
    paymentid: number,
    billid: number,
    id: number,
    
    paymentdate: string,
    paymentstatus: string,

}