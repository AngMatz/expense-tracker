import React from 'react';
import ExpenseTracker from './Components/ExpenseTracker/ExpenseTracker';
import { StyledEngineProvider } from '@mui/material/styles';
import { createContext, useState} from 'react';

export const ExpenseContext = createContext();

function App() {
  const totalExpense = JSON.parse(localStorage.getItem("totalExpense"));
  const totalWalletBalance = JSON.parse(localStorage.getItem("totalWalletBalance"));
  const totalExpenditureData = JSON.parse(localStorage.getItem("expenseData"));
  const totalFoodExpense = JSON.parse(localStorage.getItem("foodExpense"));
  const totalEntertainmentExpense = JSON.parse(localStorage.getItem("entertainmentExpense"));
  const totalTravelExpense = JSON.parse(localStorage.getItem("travelExpense"));

  
  const [walletBalance, setWalletBalance] = useState(totalWalletBalance || 5000);
  const [expenses, setExpenses] = useState(totalExpense || 0);
  const [expenseData, setExpenseData] = useState(totalExpenditureData || []);
  const [foodExpense, setFoodExpense] = useState(totalFoodExpense || 0);
  const [entertainmentExpense, setEntertainmentExpense] = useState(totalEntertainmentExpense || 0)
  const [travelExpense, setTravelExpense] = useState(totalTravelExpense || 0);
  
  return (
    <StyledEngineProvider injectFirst>
        <ExpenseContext.Provider value={{
          balance: [walletBalance, setWalletBalance],
          expenditure: [expenses, setExpenses],
          expenditureData: [expenseData, setExpenseData],
          foodExpenseData: [foodExpense, setFoodExpense],
          entertainmentExpenseData: [entertainmentExpense, setEntertainmentExpense],
          travelExpenseData: [travelExpense, setTravelExpense]
          }}>
          <ExpenseTracker />
        </ExpenseContext.Provider>
    </StyledEngineProvider>
  );
}

export default App;
