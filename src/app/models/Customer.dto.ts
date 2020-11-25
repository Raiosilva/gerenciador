import { Audit } from "./Audit.dto";

export class Customer extends Audit {
    name: string;
    email: string;
    photo: string;
    phone: string;
    password: string;
    password_confirmation: string;
}