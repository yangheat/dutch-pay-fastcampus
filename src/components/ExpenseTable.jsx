import { Table } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { expensesState } from "../state/expenses"
import { OverlayWrapper } from "./shared/OverlayWrapper"

export default function ExpenseTable() {
    const expenses = useRecoilValue(expensesState)
    
    return (
        <OverlayWrapper minHeight={'73vh'}>
            <Table data-testid="expenseList" borderless hover responsive>
                <StyledThead>
                    <tr>
                        <th>날짜</th>
                        <th>내용</th>
                        <th>결제자</th>
                        <th>금액</th>
                    </tr>
                </StyledThead>
                <StyledTbody>
                    {
                        expenses.map(({date, description, payer, cost}, idx) => (
                            <tr key={`expense-${idx}`}>
                                <td>{date}</td>
                                <td>{description}</td>
                                <td>{payer}</td>
                                <td>{cost} 원</td>
                            </tr>
                        ))
                    }
                </StyledTbody>
            </Table>
        </OverlayWrapper>
    )
}

const StyledThead = styled.thead`
    line-height: 29px;

    th {
        padding: 20px 8px ;
        color: #6B3DA6;
        text-align: center;
        font-weight: 700;
        font-size: 24px;
    }
`

const StyledTbody = styled.tbody`
    td {
        font-weight: 400;
        font-size: 24px;
        line-height: 59px;
    }
`