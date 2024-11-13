import React from 'react'
import './cstyle.css';
import { Card, Row } from 'antd';
import Button from '../Button/Bindex';
const Cards = ({income, expense, totalBalance, showExpenseModal, showIncomeModal}) => {
  return (
    <Row className='my-row'>
        <Card bordered={true}  className='my-card'>
            <h3>Current Balance</h3>
            <p>{totalBalance}</p>
            <Button text="Reset Balance" blue={true} />
        </Card>
        <Card bordered={true} className='my-card'>
            <h3>Total Income</h3>
            <p>{income}</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card>
        <Card bordered={true} className='my-card'>
            <h3>Total Expenses</h3>
            <p>{expense}</p>
            <Button  text="Add Expense" blue={true} onClick={showExpenseModal}/>
                
            
        </Card>
    </Row>
    
  )
}

export default Cards;
