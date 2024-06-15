import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import "./PieChart.css";

const COLORS = ['#A000FF', '#FF9304', '#FDE006'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="percent-text">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ExpensePieChart() {

  const foodExpense = JSON.parse(localStorage.getItem("foodExpense"));
  const entertainmentExpense = JSON.parse(localStorage.getItem("entertainmentExpense"));
  const travelExpense = JSON.parse(localStorage.getItem("travelExpense"));

  const data = [
    { name: 'Food', value: foodExpense },
    { name: 'Entertainment', value: entertainmentExpense },
    { name: 'Travel', value: travelExpense },
  ];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={199} height={199}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            gap= "0px"
            opacity= "0px"
            angle= "-0 deg"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend wrapperStyle={{width: "400px", textAlign: "left", marginLeft: "-6rem"}} 
          formatter={(value, entry, index) => <span className="text-color-class">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    );
}
