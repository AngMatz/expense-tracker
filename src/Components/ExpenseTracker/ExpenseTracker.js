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
import BarChartOfExpenses from "../BarChart/BarChart.js";
import Container from '@mui/material/Container';



export default function ExpenseTracker(){
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [expenseDataOnCurrentPage, setExpenseDataOnCurrentPage] = useState([])
    const itemsPerPage = 3;
    
    
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
    <Container maxWidth="xl">
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
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: "725px", left: "350px"}}>
                            <Pagination itemsPerPage={itemsPerPage} currentPageNumber={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber}/>
                        </Box>
                         </>): <div></div>}
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h4" className="bottom-section-heading" sx={{marginLeft: "20px"}}>Top Expenses</Typography>
                    <Box className= "barChartWrapper" sx={{height: "345px", width: "417px", backgroundColor: "white"}}>
                        <BarChartOfExpenses />
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
</Container>
)
}