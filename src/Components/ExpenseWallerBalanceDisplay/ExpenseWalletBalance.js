import React, {useState, useContext} from "react";
import { Box, Typography, Button } from "@mui/material";
import "./ExpenseWalletBalance.css";
import BasicModal from "../Modal/Modal.js";
import { ExpenseContext } from "../../App.js";

export default function ExpenseWalletBalance({title}){

    const [open, setOpen] = useState(false);
  
    const {balance, expenditure} = useContext(ExpenseContext);
    
    const [walletBalance, setWalletBalance] = balance;
    const [expenses, setExpenses] = expenditure;

    
    const handleClick = () => {
        setOpen(true);
    }

    return(
        <Box 
        sx={{
            width: "355.41px",
            height: "181px",
            backgroundColor: "#9B9B9B",
            border: "1px solid #9B9B9B", 
            borderRadius: "10px",
            marginRight: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <Typography className="title">
                {title}: <span className={title==="Wallet Balance" ? "amount-green" : "amount-orange"}>₹{title==="Wallet Balance" ? walletBalance : expenses}</span>
            </Typography>
            <Button className={title==="Wallet Balance" ? "button-green" : "button-red"}
            onClick={handleClick}
            >
                {title==="Wallet Balance" ? "+Add Income" : "+Add Expense"}
            </Button>
            {open ? 
            <BasicModal open={open} setOpen={setOpen} title={title}/> 
            : <div></div>}
        </Box>
    )
}