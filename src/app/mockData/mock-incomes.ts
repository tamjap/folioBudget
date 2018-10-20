import { Income } from '../classes/income';

export const INCOMES: Income[] = [
    { id: 1, userID: 1, description: "Salary",  amount: 3000.00, dueDay: [1,15] },
    { id: 2, userID: 1, description: "Stocks", amount: 1300.00, dueDay: [25] },
    { id: 3, userID: 2, description: "Gary Check", amount: 400, dueDay: [1, 8, 15, 22] },
    { id: 4, userID: 2, description: "Sandy Check", amount: 532, dueDay: [8, 22] },
];