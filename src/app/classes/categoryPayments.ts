import { Category } from './category';
import { PaymentItem } from './paymentItem';


export class CategoryPayments {
    category: Category;
    paymentItems: PaymentItem[];
    paymentTotal: number;
}
