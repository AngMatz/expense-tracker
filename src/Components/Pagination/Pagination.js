import { useContext, useState } from 'react';
import LeftArrow from "../Assets/leftArrow.png";
import RightArrow from "../Assets/rightArrow.png";
import "./Pagination.css"; 
import { ExpenseContext } from '../../App';

export default function Pagination({itemsPerPage, currentPageNumber, setCurrentPageNumber}){
    const totalPages = [];
    
    const expenseData = JSON.parse(localStorage.getItem("expenseData"));
   
    if(expenseData){
    for(let i=1; i<=Math.ceil(expenseData.length/itemsPerPage); i++){
        totalPages.push(i);
    }
    }

    const handlePrev = () => { 
        if(currentPageNumber===1){
            setCurrentPageNumber(1);
        }else{
            setCurrentPageNumber(currentPageNumber - 1);
        }
    }

    const handleNext = () => {
        if(currentPageNumber<totalPages.length){
            setCurrentPageNumber(currentPageNumber + 1);
        }else{
            setCurrentPageNumber(totalPages.length);
        }
    }

    const handleClick = (e) => {
        setCurrentPageNumber(e.target.outerText);
    }
    
    return(
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <button className="arrow-button" onClick={handlePrev}> <img src={LeftArrow} height="24px" width="24px" alt="previous-icon" /> </button>
            <button className="button" onClick={(e) => {handleClick(e)}}> {currentPageNumber} </button>
            <button className="arrow-button" onClick={handleNext}> <img src={RightArrow} height="24px" width="24px" alt="previous-icon" /> </button>
        </div>
    )
}