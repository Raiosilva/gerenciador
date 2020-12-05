import { Audit } from './Audit.dto';

export class User extends Audit {
    firstName: string;
    photo: string;
    email: string;
    isRoot: boolean;
    password: string;
    confirmPassword: string;
}