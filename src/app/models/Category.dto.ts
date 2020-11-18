import { IInterface } from "../interfaces/IINterfaces";
import { Audit } from "./Audit.dto";

export class Category extends Audit {
    name: string;
    description: string;
}