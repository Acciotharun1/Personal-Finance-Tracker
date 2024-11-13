import React from 'react'
import { Line, Pie } from '@ant-design/charts';
import { Transaction } from 'firebase/firestore';
const Charts = ({sortedTransactions}) => {
    const data = sortedTransactions.map((item) =>{
        return{date: item.date, amount:item.amount};
    });

    const spendingData = sortedTransactions.filter((transaction) => {
        if(transaction.type =="Expense"){
            return {tag: transaction.tag, amount: transaction.amount};
        }
    });

    let newSpendings = [
        {tag:"food", amount:0},
        {tag:"health", amount:0},
        {tag:"education", amount:0},
    ];

    spendingData.forEach((item) => {
        if(item.tag == "food"){
            newSpendings[0].amount+= item.amount;
        }else if (item.tag == "health"){
            newSpendings[1].amount+= item.amount;
        } else{
            newSpendings[2].amount+= item.amount;
        }
    });
    
    const config = {
        data: data,
        height:700,
        width:700,
        autoFit: false,
        xField: "date",
        yField: 'amount',    
    };

    const spendingConfig = {
       data: newSpendings,
       height:700,
       width:400,
       angleField: "amount",
       colorField: "tag", 
    };

    let chart;
    let pieChart;
  return (
    <div className='charts-wrapper'>
        <div style={{width:"50%", marginTop:"0px"}}>
            <h3 >Your Analytics</h3>
      <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </div>
        <div className='piechart' style={{position:"relative"}}>
            <h3 style={{ marginTop:"0px"}}>Your spendings</h3>
            <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
        </div>
    </div>
  );
}

export default Charts;
