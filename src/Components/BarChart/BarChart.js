import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import "./BarChart.css";



export default function BarChartOfExpenses() {
    const foodExpense = JSON.parse(localStorage.getItem("foodExpense"));
    const entertainmentExpense = JSON.parse(localStorage.getItem("entertainmentExpense"));
    const travelExpense = JSON.parse(localStorage.getItem("travelExpense"));

    const data = [
        {
            name: 'Food',
            value: foodExpense,
        },
        {
            name: 'Entertainment',
            value: entertainmentExpense,
        },
        {
            name: 'Travel',
            value: travelExpense,
        },
    ];

    return (
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart data={data} layout="vertical">
            <XAxis type="number" axisLine={false} hide />
            <YAxis type="category" width= {110} dataKey="name" axisLine={false} strokeOpacity={0}/>
          <Bar dataKey="value" fill="#8784D2" isAnimationActive={false} legendLine={false} barSize={22} radius={[0, 20, 20, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    );
}
