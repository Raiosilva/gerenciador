import { Audit } from "./Audit.dto";
import { Category } from './Category.dto';

export class SubCategory extends Audit {
    name: string;
    cost: number;
    description: string;
    category: Category;

    constructor() {
        super();
        this.category = new Category();
    }
}