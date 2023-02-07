import { Table } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import { expensesState } from "../state/expenses"

export default function ExpenseTable() {

    const expenses = useRecoilValue(expensesState)
    
    return (
        // <div>ExpenseTable</div>
        <Table data-testid="expenseList" borderless hover>
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>내용</th>
                    <th>결제자</th>
                    <th>금액</th>
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map(({date, description, payer, cost}) => (
                        <tr>
                            <td>{date}</td>
                            <td>{description}</td>
                            <td>{payer}</td>
                            <td>{cost} 원</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}
