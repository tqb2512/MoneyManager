import { Transaction } from "./transaction";

export type DayBox = {
    day: number;
    month: number;
    year: number;
    totalIncome: number;
    totalExpense: number;
    transactions: Transaction[];
}