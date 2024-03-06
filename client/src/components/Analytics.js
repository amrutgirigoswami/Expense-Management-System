import React from 'react'
import { Progress } from 'antd'
const Analytics = ({ allTransections }) => {

    // Category
    const categories = [
        "salary",
        "tip",
        "onlinework",
        "project",
        "entertainment",
        "travel",
        "food",
        "bills",
        "rent",
        "fees",
        "tax"
    ];


    // Total Calculations
    const totalTransaction = allTransections.length;
    const totalIncomeTransactions = allTransections.filter(transaction => transaction.type === 'income');
    const totalExpenseTransactions = allTransections.filter(transaction => transaction.type === 'expense');

    const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

    // Turnover
    const totalTunover = allTransections.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTunover = allTransections.filter((transaction) => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTunover = allTransections.filter((transaction) => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTunoverPercent = (totalIncomeTunover / totalTunover) * 100;
    const totalExpenseTunoverPercent = (totalExpenseTunover / totalTunover) * 100;

    return (
        <>
            <div className='row m-5'>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5>Total Transaction : {totalTransaction}</h5>
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Total Income : {totalIncomeTransactions.length}</h5>
                            <h5 className='text-danger'>Total Expense: {totalExpenseTransactions.length}</h5>
                            <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)} />
                            <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)} />
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5>Total Tunover : {totalTunover}</h5>
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'> Income : {totalIncomeTunover}</h5>
                            <h5 className='text-danger'> Expense: {totalExpenseTunover}</h5>
                            <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomeTunoverPercent.toFixed(0)} />
                            <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpenseTunoverPercent.toFixed(0)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col-md-4'>
                    <h5>Category wise Income</h5>
                    {categories.map((category) => {
                        const amount = allTransections.filter((transaction) => transaction.type === "income" && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
                        return (
                            amount > 0 &&
                            <div className='card mb-2'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount / totalIncomeTunover) * 100).toFixed(0)} />
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='col-md-4'>
                    <h5>Category wise Expense</h5>
                    {categories.map((category) => {
                        const amount = allTransections.filter((transaction) => transaction.type === "expense" && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
                        return (
                            amount > 0 &&
                            <div className='card mb-2'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount / totalExpenseTunover) * 100).toFixed(0)} />
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default Analytics