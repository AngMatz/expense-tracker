import React, {useContext, useState} from 'react';
import { Box, Typography, Divider } from "@mui/material";
import "./ExpenseList.css";
import {ReactComponent as DeleteButton} from "../Assets/deleteIcon.svg";
import {ReactComponent as EditButton} from "../Assets/editIcon.svg";
import BasicModal from "../Modal/Modal.js";
import { ExpenseContext } from '../../App.js';

export default function ExpenseListItem({name, cost, date, category, image, id}){
  const [open, setOpen] = useState(false);

  const { balance, expenditure, expenditureData, foodExpenseData, entertainmentExpenseData, travelExpenseData} = useContext(ExpenseContext);

  const [walletBalance, setWalletBalance] = balance;
  const [expenses, setExpenses] = expenditure;
  const [expenseData, setExpenseData] = expenditureData;
  const [foodExpense, setFoodExpense] =  foodExpenseData;
  const [entertainmentExpense, setEntertainmentExpense] = entertainmentExpenseData;
  const [travelExpense, setTravelExpense] =  travelExpenseData;

    const handleEdit = () => {
        setOpen(true); 
    }

    const handleDelete = () => {
        
        const listItemToDelete = expenseData.find((ele) => ele.itemID === id);

        // update the expense list post delete
        const updatedListPostDelete = expenseData.filter((ele) => ele.itemID !== id);
        setExpenseData(updatedListPostDelete);
        localStorage.setItem("expenseData", JSON.stringify(expenseData));

        // update the expenses and wallet balance post delete of expense list item
          const totalExpenseFromLocalStor = JSON.parse(localStorage.getItem("totalExpense"));
          const totalNewExpense = parseInt(totalExpenseFromLocalStor) - parseInt(listItemToDelete.itemCost);
          setExpenses(totalNewExpense);
          localStorage.setItem("totalExpense", JSON.stringify(totalNewExpense));

          const walletBalanceFromLocalStor = JSON.parse(localStorage.getItem("totalWalletBalance"));
          const totalNewWalletBalance = parseInt(walletBalanceFromLocalStor) + parseInt(listItemToDelete.itemCost);
          setWalletBalance(totalNewWalletBalance);
          localStorage.setItem("totalWalletBalance", JSON.stringify(totalNewWalletBalance));
          
          //update foodExpense or entertainmentExpense or travelExpense based on the category of the deleted list item
          if(listItemToDelete.itemCategory === "food"){
            const pastFoodExpense = JSON.parse(localStorage.getItem("foodExpense")) || 0;
            let moneyOnFood = parseInt(pastFoodExpense) - parseInt(listItemToDelete.itemCost); 
            setFoodExpense(moneyOnFood);
            localStorage.setItem("foodExpense", JSON.stringify(moneyOnFood));
          }else if(listItemToDelete.itemCategory === "entertainment"){
            const pastEntertainmentExpense = JSON.parse(localStorage.getItem("entertainmentExpense")) || 0;
            let moneyOnEntertainment = parseInt(pastEntertainmentExpense) - parseInt(listItemToDelete.itemCost); 
            setEntertainmentExpense(moneyOnEntertainment);
            localStorage.setItem("entertainmentExpense", JSON.stringify(moneyOnEntertainment));
          } else if (listItemToDelete.itemCategory === "travel"){
            const pastTravelExpense = JSON.parse(localStorage.getItem("travelExpense")) || 0;    
            let moneyOnTravel = parseInt(pastTravelExpense) - parseInt(listItemToDelete.itemCost); 
            setTravelExpense(moneyOnTravel);
            localStorage.setItem("travelExpense", JSON.stringify(moneyOnTravel));
          }


    }

    return(
    <Box sx={{marginBottom: "2rem"}}>
    <Box sx={{display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
        <Box className="expense-list-left-block">
            <img src={image} style={{width: "38px", height: "38px"}} alt="icon"/>
            <Box>
                <Typography className="expense-title">{name}</Typography>
                <Typography className="expense-date">{date}</Typography>
            </Box>
        </Box>
        <Box className="expense-list-right-block">
            <Typography className="amount">₹{cost}</Typography>
            <DeleteButton onClick = {() => handleDelete()}/>
            <EditButton onClick={() => handleEdit()}/>
            {open ? 
            <BasicModal open={open} setOpen={setOpen} title={"Edit Expense"} id={id}/> 
            : <div></div>}
        </Box>
    </Box>
    <Divider sx={{marginTop: "8px", backgroundColor: "#9B9B9B"}}/>
    </Box>
    )
}