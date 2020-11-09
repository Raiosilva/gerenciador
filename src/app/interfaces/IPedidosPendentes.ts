import { IInterface } from "./IINterfaces";

export interface IPedidosPendentes extends IInterface {
    customerName: string;
    date: string;
    category: string;
    subCategory: string;
}