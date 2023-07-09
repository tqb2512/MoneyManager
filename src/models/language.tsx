import en from "../config/language/en";
import vi from "../config/language/vi";

export type Language = {
    settings: string;
    currency: string;
    data: string;
    theme: string;
    language: string;
    //new transaction
    newTransaction: string;
    type: string;
    amount: string;
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
    sun: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
}

export const languagePack = {
    en: en,
    vi: vi
}
