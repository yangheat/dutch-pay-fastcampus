import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"
import { expensesState } from "../state/expenses"
import { groupMembersState } from "../state/groupMembers"

export const AddExpenseForm = () => {
    const members = useRecoilValue(groupMembersState)
    const [expenses, setExpenses] = useRecoilState(expensesState)

    const [validated, setValidated] = useState(false)
    const [validDescription, setValidDescription] = useState(false)
    const [validCost, setValidCost] = useState(false)
    const [validPayer, setValidPayer] = useState(false)

    const today = new Date()
    const year = today.getFullYear()
    const month = `0${today.getMonth() + 1}`.slice(-2)
    const day = `0${today.getDate()}`.slice(-2)

    const [date, setDate] = useState(`${year}-${month}-${day}`)
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState(0)
    const [payer, setPayer] = useState(null)

    const checkFormValidity = () => {
        setValidDescription(description.length > 0)
        setValidCost(cost > 0)
        setValidPayer(payer !== null)

        return description && cost && payer
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (checkFormValidity()) {
            setExpenses(...expenses,
                {
                    date,
                    description,
                    cost,
                    payer
                }
            )
        }
        setValidated(true)

    }

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <h1>1. 비용 추가하기</h1>
            <Form.Group>
                <Form.Control
                    type="date"
                    name="expenseDate"
                    placeholder="결제한 날짜를 선택해주세요."
                    value={date}
                    onChange={({target}) => setDate(target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    name="expenseDescription"
                    placeholder="비용에 대한 설명을 입력해주세요."
                    value={description}
                    onChange={({target}) => setDescription(target.value)}
                    isValid={validDescription}
                    isInvalid={!validDescription && validated}
                />
                <Form.Control.Feedback type="invalid" data-valid={validDescription}>
                    설명을 입력해주세요.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="number"
                    name="expenseAmount"
                    placeholder="비용은 얼마였나요?"
                    value={cost}
                    onChange={({target}) => setCost(parseInt(target.value) || '')}
                    isValid={validCost}
                    isInvalid={!validCost && validated}
                />
                <Form.Control.Feedback type="invalid" data-valid={validCost}>
                    1원 이상의 비용을 입력해주세요.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Select
                    name="expensePayer"
                    defaultValue=""
                    onChange={({target}) => setPayer(target.value)}
                    isValid={validPayer}
                    isInvalid={!validPayer && validated}
                >
                    <option disabled value="">누가 결제했나요?</option>
                    {
                        members.map((member) => <option key={member} value={member}>{member}</option>)
                    }
                </Form.Select>
                <Form.Control.Feedback type="invalid" data-valid={validPayer}>
                    결제자를 입력해주세요.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">추가하기</Button>
        </Form>
    )
}
