import React, {useContext} from 'react';
import { Box, Typography, Divider } from "@mui/material";
import "./ExpenseList.css";
import {ReactComponent as DeleteButton} from "../Assets/deleteIcon.svg";
import {ReactComponent as EditButton} from "../Assets/editIcon.svg";


export default function ExpenseListItem({name, cost, date, category, image}){
    
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
            <DeleteButton />
            <EditButton />
        </Box>
    </Box>
    <Divider sx={{marginTop: "8px", backgroundColor: "#9B9B9B"}}/>
    </Box>
    )
}