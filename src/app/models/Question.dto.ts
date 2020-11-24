import { Audit } from "./Audit.dto";
import { QuestionType } from "./enums/QuestionType";
import { SubCategory } from './SubCategory.dto';

export class Question extends Audit {

    question: string;
    type: QuestionType;
    options: string;
    subCategory: SubCategory

    constructor() {
        super();
        this.subCategory = new SubCategory();
    }
}