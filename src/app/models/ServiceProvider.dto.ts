import { Audit } from "./Audit.dto";

export class ServiceProvider extends Audit {

    name: string;
    photo: string;
    email: string;
    password: string;
    confirmPassword: string;
    description: string;
    address: string;
    addressComplement: string;  
    state: string;  
    city: string;  
    zipCode: string;  
    citiesCare: string;  
    categoriesCare: string;  
    phone: string;  
}