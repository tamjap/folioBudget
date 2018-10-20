import { Debt } from '../classes/debt';

export const DEBTS: Debt[] = [
    { id: 1, userID: 1, description: "Mortgage",  amount: 1200, dueDay: [1], balance: 257365.24, interest: 4.2, extraPayment: 0, paidOff: false },
    { id: 2, userID: 1, description: "Volkswagon",  amount: 732, dueDay: [15], balance: 8569.25, interest: 7.2, extraPayment: 30, paidOff: false },
    { id: 3, userID: 1, description: "Home Depot",  amount: 247.15, dueDay: [5], balance: 3500, interest: 11.2, extraPayment: 15, paidOff: false },
    { id: 4, userID: 1, description: "Dillards",  amount: 53, dueDay: [18], balance: 127.32, interest: 18.97, extraPayment: 0, paidOff: false },
    { id: 5, userID: 1, description: "Mastercard",  amount: 200, dueDay: [8], balance: 3000, interest: 23.12, extraPayment: 50, paidOff: false },
    { id: 6, userID: 1, description: "Mercy Hospital",  amount: 200, dueDay: [12, 31], balance: 6784.95, interest: 0, extraPayment: 0, paidOff: false },
    { id: 7, userID: 2, description: "Khols",  amount: 52.21, dueDay: [4], balance: 342.07, interest: 23.5, extraPayment: 0, paidOff: false },
    { id: 8, userID: 2, description: "Mom",  amount: 30, dueDay: [8], balance: 230, interest: 0, extraPayment: 0, paidOff: false },
    { id: 9, userID: 2, description: "WalMart",  amount: 57.42, dueDay: [31], balance: 542.21, interest: 11.5, extraPayment: 0, paidOff: false },
];