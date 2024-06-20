import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css";
import { ExpenseContext } from '../../App';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';


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

export default function BasicModal({open, setOpen, title, id}) {  

  const {enqueueSnackbar} = useSnackbar();

  const { balance, expenditure, expenditureData, foodExpenseData, entertainmentExpenseData, travelExpenseData} = useContext(ExpenseContext);

  const [walletBalance, setWalletBalance] = balance;
  const [expenses, setExpenses] = expenditure;
  const [expenseData, setExpenseData] = expenditureData;
  const [foodExpense, setFoodExpense] =  foodExpenseData;
  const [entertainmentExpense, setEntertainmentExpense] = entertainmentExpenseData;
  const [travelExpense, setTravelExpense] =  travelExpenseData;
 
 
  const [incomeAmount, setIncomeAmount] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
 
  

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

        //validation check
  
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
          //update expenses and wallet balance if validation checks are okay
            let totalExpense = parseInt(expenses) + parseInt(price);
            if(totalExpense>walletBalance){
              enqueueSnackbar("Wallet balance is low. Please add wallet balance to proceed with the transaction.", {variant: "error"})
            }else{
              setExpenses((amount) => parseInt(amount) + parseInt(price));
              localStorage.setItem("totalExpense", JSON.stringify(totalExpense));
              let totalWalletBalance = 5000 - parseInt(totalExpense);
              setWalletBalance(totalWalletBalance);
              localStorage.setItem("totalWalletBalance", JSON.stringify(totalWalletBalance));
              setOpen(false);
            }
          
            //change date format to the required format
            const formattedDate = new Date(date).toLocaleDateString("en-GB", {day:"numeric", month: "long", year: "numeric"});
            const dateArray = formattedDate.split(" ");
            const dayOfMonth = dateArray[0];
            const month = dateArray[1];
            const year = dateArray[2];
      
          //update expenseData if expenseData is available
          if(expenseData.length>0){ 
            const newExpenseData = {itemName: expenseTitle, itemCost: price, itemCategory: category, expenditureDate: `${month} ${dayOfMonth}, ${year}`, image: null, itemID: uuidv4()};
            setExpenseData([...expenseData, newExpenseData]);  
          }else{
            setExpenseData([{itemName: expenseTitle, itemCost: price, itemCategory: category, expenditureDate: `${month} ${dayOfMonth}, ${year}`, image: null, itemID: uuidv4()}]);
          }
  
          localStorage.setItem("expenseData", JSON.stringify(expenseData));   

          //update foodExpense or entertainmentExpense or travelExpense as per the expenseData added
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
              setEntertainmentExpense(moneyOnEntertainment);
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
              setTravelExpense(moneyOnTravel);
              localStorage.setItem("travelExpense", JSON.stringify(moneyOnTravel));
            }
           }
        }
    }

    const handleEditExpense = (e, id) => {
      e.preventDefault();

      //validation checks
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
        //get the oldListItem and deduct the foodExpense or entertainmentExpense or travelExpense as per the category of the oldListItem
      const oldListItem = expenseData.find((ele) => ele.itemID === id);
      const oldListItemExpense = oldListItem.itemCost;
      const oldListItemCategory = oldListItem.itemCategory;


      if(oldListItemCategory === "food"){
        const foodExpenseFromLocalStor = JSON.parse(localStorage.getItem("foodExpense"));
        const expenseOnFood = parseInt(foodExpenseFromLocalStor) - parseInt(oldListItemExpense);
        setFoodExpense(expenseOnFood);
        localStorage.setItem("foodExpense", JSON.stringify(expenseOnFood));
      } else if(oldListItemCategory === "entertainment"){
        const entertainmentExpenseFromLocalStor = JSON.parse(localStorage.getItem("entertainmentExpense"));
        const expenseOnEntertainment = parseInt(entertainmentExpenseFromLocalStor) - parseInt(oldListItemExpense);
        setEntertainmentExpense(expenseOnEntertainment);
        localStorage.setItem("entertainmentExpense", JSON.stringify(expenseOnEntertainment));
      } else if(oldListItemCategory === "travel"){
        const travelExpenseFromLocalStor = JSON.parse(localStorage.getItem("travelExpense"));
        const expenseOnTravel = parseInt(travelExpenseFromLocalStor) - parseInt(oldListItemExpense);
        setTravelExpense(expenseOnTravel);
        localStorage.setItem("travelExpense", JSON.stringify(expenseOnTravel));
      }

      //get the updatedExpenseList
      const newExpenseList = expenseData.map((ele) => {
        if (ele.itemID === id){
        
      //change the date format of the updatedListItem
        const formattedDate = new Date(date).toLocaleDateString("en-GB", {day:"numeric", month: "long", year: "numeric"});
        const dateArray = formattedDate.split(" ");
        const dayOfMonth = dateArray[0];
        const month = dateArray[1];
        const year = dateArray[2];

          const updatedListItem = {
            itemName: expenseTitle,
            itemCost: price,
            itemCategory: category,
            expenditureDate: `${month} ${dayOfMonth}, ${year}`,
            image: null, 
            itemID: uuidv4()
          }
        
          //update the expenses and wallet balance based on the updatedListItem

          const totalExpenseFromLocalStor = JSON.parse(localStorage.getItem("totalExpense"));
          const totalNewExpense = parseInt(totalExpenseFromLocalStor) - parseInt(oldListItemExpense) + parseInt(updatedListItem.itemCost);
          setExpenses(totalNewExpense);
          localStorage.setItem("totalExpense", JSON.stringify(totalNewExpense));

          const walletBalanceFromLocalStor = JSON.parse(localStorage.getItem("totalWalletBalance"));
          const totalNewWalletBalance = parseInt(walletBalanceFromLocalStor) + parseInt(oldListItemExpense) - parseInt(updatedListItem.itemCost);
          setWalletBalance(totalNewWalletBalance);
          localStorage.setItem("totalWalletBalance", JSON.stringify(totalNewWalletBalance));
          
      //update the foodExpense or travelExpense or entertainmentExpense based on the category of the updatedListItem
       if(updatedListItem.itemCategory === "food"){
        const pastFoodExpense = JSON.parse(localStorage.getItem("foodExpense")) || 0;
        let moneyOnFood = parseInt(pastFoodExpense) + parseInt(updatedListItem.itemCost); 
        setFoodExpense(moneyOnFood);
        localStorage.setItem("foodExpense", JSON.stringify(moneyOnFood));
      }else if(updatedListItem.itemCategory === "entertainment"){
        const pastEntertainmentExpense = JSON.parse(localStorage.getItem("entertainmentExpense")) || 0;
        let moneyOnEntertainment = parseInt(pastEntertainmentExpense) + parseInt(updatedListItem.itemCost); 
        setEntertainmentExpense(moneyOnEntertainment);
        localStorage.setItem("entertainmentExpense", JSON.stringify(moneyOnEntertainment));
      } else if (updatedListItem.itemCategory === "travel"){
        const pastTravelExpense = JSON.parse(localStorage.getItem("travelExpense")) || 0;    
        let moneyOnTravel = parseInt(pastTravelExpense) + parseInt(updatedListItem.itemCost); 
        setTravelExpense(moneyOnTravel);
        localStorage.setItem("travelExpense", JSON.stringify(moneyOnTravel));
      }
          
          return updatedListItem;
        }
        return ele;
      });

      // set the updatedListItem to the expenseData and localStorage
      setExpenseData(newExpenseList);
      localStorage.setItem("expenseData", JSON.stringify(expenseData));
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
            <Typography className="main-heading">{title==="Expenses" ? "Add Expenses" : "Edit Expenses"}</Typography>
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
            <Button type="submit" className="add-expense-btn" onClick={ title==="Expenses" ? (e) => handleAddExpense(e) : (e) => handleEditExpense(e, id)}>Add Expense</Button>
            <Button type="button" className="cancel-btn" onClick={handleClose}>Cancel</Button>
            </form>
        </Box>
      </Modal>
      </>}
    </div>
  );
}
