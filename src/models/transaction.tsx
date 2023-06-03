import { Account } from "./account";
import { Category } from "./category";

export type Transaction = {
    id: number;
    type: string;
    category: Category;
    amount: number;
    day: number;
    month: number;
    year: number;
    note: string;
    account: Account;
}
