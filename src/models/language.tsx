import en from "../config/language/en";
import vi from "../config/language/vi";

export type Language = {
    settings: string;
    currency: string;
    data: string;
    theme: string;
    language: string;
    //home
    daily: string;
    celandar: string;
    total: string;
    close: string;
    //new transaction
    add: string;
    newTransaction: string;
    type: string;
    amount: string;
    account: string;
    category: string;
    note: string;
    date: string;
    save: string;
    income: string;
    expense: string;
    continue: string;
    //detail
    detailTransaction: string;
    delete: string;
    //account
    balance: string;
    group: string;
    //stats
    monthly: string;
    yearly: string;
    //shorten day of week
    today: string;
    sun: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    //list category
    categories: string[][];
}

export const languagePack = {
    en: en,
    vi: vi
}

export const CategoryList = [
    "food", "transport", "play", "watch", "study", "entertainment", "salary"
]