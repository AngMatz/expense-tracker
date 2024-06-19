import React from "react";
import headerImage from "../Assets/headerImage.png";
import { Box, Typography } from "@mui/material";
import "./ExpenseTracker.css";
import { useEffect, useState, useContext } from "react";
import ExpenseWalletBalance from "../ExpenseWallerBalanceDisplay/ExpenseWalletBalance.js";
import ExpensePieChart from "../PieChart/PieChart.js";
import ExpenseListItem from "../ExpenseList/ExpenseList.js";
import Pagination from '../Pagination/Pagination.js';
import Stack from '@mui/material/Stack';
import { ExpenseContext } from "../../App.js";
import foodIcon from "../Assets/food.png";
import movieIcon from "../Assets/movie.png";
import autoIcon from "../Assets/travel.png";



export default function ExpenseTracker(){
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [expenseDataOnCurrentPage, setExpenseDataOnCurrentPage] = useState([])
    const [itemsPerPage] = useState(3);
    
    const { expenditureData } = useContext(ExpenseContext);
    const [expenseData] = expenditureData;


    useEffect(() => { 
            localStorage.setItem("expenseData", JSON.stringify(expenseData));
          if(expenseData){
            const indexOfLastListItem = (currentPageNumber * itemsPerPage);
            const indexOfFirstListItem = (indexOfLastListItem - itemsPerPage);
            setExpenseDataOnCurrentPage(expenseData.slice(indexOfFirstListItem, indexOfLastListItem));
            expenseData.map((ele)=>{
            if(ele.itemCategory==="food"){
                ele.image = foodIcon;
            }else if(ele.itemCategory==="entertainment"){
               ele.image = movieIcon;
            }else if(ele.itemCategory==="travel"){
               ele.image = autoIcon;
            }
            return <></>;
            })
            }
    }, [currentPageNumber, expenseData]);

   
  
return(
    <Box>
        <img src={headerImage} className="headerImage" alt="headerImage" />
        <Box className="wrapper">
            <Typography variant="h4" className="heading">Expense Tracker</Typography>
            <Box className="top-section-wrapper">
                <ExpenseWalletBalance title="Wallet Balance" />
                <ExpenseWalletBalance title="Expenses" />
                <Box sx={{width: "199px", height: "199px"}}>
                    <ExpensePieChart />
                </Box>
            </Box>
            <Box className="bottom-section-wrapper">
                <Box>
                    <Typography variant="h4" className="bottom-section-heading">Recent Transactions</Typography>
                    <Box className="expense-list">
                        {expenseData ? (<>
                        {expenseDataOnCurrentPage.map((ele, index) => {
                            return(
                                <ExpenseListItem name={ele.itemName} cost={ele.itemCost} date={ele.expenditureDate} category={ele.itemCategory} image={ele.image} id={ele.itemID} key={ele.itemID}/>
                            )
                        })}
                         </>): <div></div>}
                    </Box>
                    <Stack spacing={2} sx={{position:"absolute", top: "725px", left: "350px"}}>
                        <Pagination itemsPerPage={itemsPerPage} currentPageNumber={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber}/>
                    </Stack>
                </Box>
                <Box>
                    <Typography variant="h4" className="bottom-section-heading">Top Expenses</Typography>
                </Box>
            </Box>
        </Box>
    </Box>
)
}