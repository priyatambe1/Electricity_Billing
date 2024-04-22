import { login } from "./login";

export interface Bill extends login{
    billid: number,
    billgendate: string,
    id: number,
    perunitcost: number,
    totalunits: number,
    billamount: string,
    billduedate: string,

}