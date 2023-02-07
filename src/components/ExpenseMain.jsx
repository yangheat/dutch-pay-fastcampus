import { Row } from "react-bootstrap"
import { AddExpenseForm } from "./AddExpenseForm"
import ExpenseTable from "./ExpenseTable"

export const ExpenseMain = () => {
    return (
        <div>
            ExpenseMain Component
            <div>
                <AddExpenseForm />
            </div>
            <div>
                <ExpenseTable />
            </div>
        </div>
    )
}