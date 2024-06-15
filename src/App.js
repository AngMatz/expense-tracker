import React from 'react';
import ExpenseTracker from './Components/ExpenseTracker/ExpenseTracker';
import { StyledEngineProvider } from '@mui/material/styles';
import { createContext, useState} from 'react';

export const ExpenseContext = createContext();

function App() {
  const totalExpense = JSON.parse(localStorage.getItem("totalExpense"));
  const totalWalletBalance = JSON.parse(localStorage.getItem("totalWalletBalance"));
  let totalExpenditureData = JSON.parse(localStorage.getItem("expenseData"));
  
  const [walletBalance, setWalletBalance] = useState(totalWalletBalance || 5000);
  const [expenses, setExpenses] = useState(totalExpense || 0);
  const [expenseData, setExpenseData] = useState(totalExpenditureData || []);
  
  return (
    <StyledEngineProvider injectFirst>
        <ExpenseContext.Provider value={{
          balance: [walletBalance, setWalletBalance],
          expenditure: [expenses, setExpenses],
          expenditureData: [expenseData, setExpenseData]
          }}>
          <ExpenseTracker />
        </ExpenseContext.Provider>
    </StyledEngineProvider>
  );
}

export default App;
