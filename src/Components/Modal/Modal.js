import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css";
import { ExpenseContext } from '../../App';
import { useSnackbar } from 'notistack';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  height: "300px",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: "rgba(239, 239, 239, 0.85)",
  borderRadius: "15px",
};



export default function BasicModal({open, setOpen, title}) {  

  const {enqueueSnackbar} = useSnackbar();

  const { balance, expenditure, expenditureData} = useContext(ExpenseContext);

  const [walletBalance, setWalletBalance] = balance;
  const [expenses, setExpenses] = expenditure;
  const [expenseData, setExpenseData] = expenditureData;
 
 
  const [incomeAmount, setIncomeAmount] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [foodExpense, setFoodExpense] = useState(0);
  const [entertainmentExpense, setEntertainmentExpense] = useState(0);
  const [travelExpense, setTravelExpense] = useState(0);
  

  const handleClose = () => setOpen(false);
    
    const handleExpenseTitleChange = (e) => {
      setExpenseTitle(e.target.value);
    }

    const handlePriceChange = (e) => {
      setPrice(e.target.value);
    }

    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    }

    const handleDateChange = (e) => {
      setDate(e.target.value);
    }

    const handleIncomeChange = (e) => {
      setIncomeAmount(e.target.value);
    }
    
    const handleAddIncome = (e) => {
        e.preventDefault();
        if(!incomeAmount){
          enqueueSnackbar("Income amount is a required field", {variant: "warning"});
          return;
        }else{
          let totalWalletBalance = parseInt(walletBalance) + parseInt(incomeAmount);
          setWalletBalance((amount) => parseInt(amount) + parseInt(incomeAmount));
          localStorage.setItem("totalWalletBalance", JSON.stringify(totalWalletBalance));
          setOpen(false);
        }
    }

    const handleAddExpense = (e) => {
        e.preventDefault();

        if(expenseTitle.length === 0){
          enqueueSnackbar("Title is a required field.", {variant: "warning"});
          return;
        }else if(price.length === 0){
          enqueueSnackbar("Price is a required field.", {variant: "warning"});
          return;
        }else if(category.length === 0){
          enqueueSnackbar("Category is a required field.", {variant: "warning"});
          return;
        }else if(date.length === 0){
          enqueueSnackbar("Date is a required field.", {variant: "warning"});
          return;
        }else{
            let totalExpense = parseInt(expenses) + parseInt(price);
            if(totalExpense>walletBalance){
              enqueueSnackbar("Wallet balance is low. Please add wallet balance to proceed with the transaction.", {variant: "error"})
            }else{
              setExpenses((amount) => parseInt(amount) + parseInt(price));
              localStorage.setItem("totalExpense", JSON.stringify(totalExpense));
              setOpen(false);
            }
            
          const formattedDate = new Date(date).toLocaleDateString("en-GB", {day:"numeric", month: "long", year: "numeric"});


          if(expenseData){
            setExpenseData([...expenseData, {itemName: expenseTitle, itemCost: price, itemCategory: category, expenditureDate: formattedDate, image: null}]);  
          }else{
            setExpenseData([{itemName: expenseTitle, itemCost: price, itemCategory: category, expenditureData: formattedDate, image: null}]);
          }
  
          localStorage.setItem("expenseData", JSON.stringify(expenseData));   

          
          
          if(category === "food"){
            const pastFoodExpense = JSON.parse(localStorage.getItem("foodExpense"));
            if(pastFoodExpense){
              let moneyOnFood = parseInt(pastFoodExpense) + parseInt(price); 
              setFoodExpense(moneyOnFood);
              localStorage.setItem("foodExpense", JSON.stringify(moneyOnFood));
            }else{
              let moneyOnFood = parseInt(foodExpense) + parseInt(price);
              setFoodExpense(moneyOnFood);
              localStorage.setItem("foodExpense", JSON.stringify(moneyOnFood));
            }
            

           } else if(category === "entertainment"){
            const pastEntertainmentExpense = JSON.parse(localStorage.getItem("entertainmentExpense"));
            if(pastEntertainmentExpense){
              let moneyOnEntertainment = parseInt(pastEntertainmentExpense) + parseInt(price); 
              setEntertainmentExpense(moneyOnEntertainment);
              localStorage.setItem("entertainmentExpense", JSON.stringify(moneyOnEntertainment));
            }else{
              let moneyOnEntertainment = parseInt(entertainmentExpense) + parseInt(price);
              setFoodExpense(moneyOnEntertainment);
              localStorage.setItem("entertainmentExpense", JSON.stringify(moneyOnEntertainment));
            }

           } else if (category === "travel"){
            const pastTravelExpense = JSON.parse(localStorage.getItem("travelExpense"));
            if(pastTravelExpense){
              let moneyOnTravel = parseInt(pastTravelExpense) + parseInt(price); 
              setTravelExpense(moneyOnTravel);
              localStorage.setItem("travelExpense", JSON.stringify(moneyOnTravel));
            }else{
              let moneyOnTravel = parseInt(travelExpense) + parseInt(price);
              setFoodExpense(moneyOnTravel);
              localStorage.setItem("travelExpense", JSON.stringify(moneyOnTravel));
            }
           }
        }
      }
    
  return (
    <div>
        {title === "Wallet Balance" ? <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
        <Typography className="main-heading">Add Balance</Typography>
        <input className="add-balance-input-field" type="number" name="add-income" value={incomeAmount} placeholder="Income Amount" required onChange={(e)=>handleIncomeChange(e)}/>
        <Button type="submit" className="add-balance-btn" onClick={(e) => handleAddIncome(e)}>Add Balance</Button>
        <Button type="button" className="add-balance-cancel-btn" onClick={handleClose}>Cancel</Button>
        </form>
        </Box>
      </Modal>
      </> : 
      <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography className="main-heading">Add Expenses</Typography>
            <form>
            <input className="input-field" type="text" name="expense-title" value={expenseTitle} placeholder="Title" required onChange={(e)=>handleExpenseTitleChange(e)}/>
            <input className="input-field" type="text" name="price" value={price} placeholder="Price" required onChange={(e)=>handlePriceChange(e)}/>
            <select className="input-field" required onChange={(e)=>handleCategoryChange(e)}>
                <option value={category} selected>Select Category</option>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="travel">Travel</option>
            </select>
            <input className="input-field" type="date" name="date" value={date} required onChange={(e)=>handleDateChange(e)}/>
            <Button type="submit" className="add-expense-btn" onClick={(e) => handleAddExpense(e)}>Add Expense</Button>
            <Button type="button" className="cancel-btn" onClick={handleClose}>Cancel</Button>
            </form>
        </Box>
      </Modal>
      </>}
    </div>
  );
}
