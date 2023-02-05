import { useState } from "react"
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
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
        <StyledWrapper xs={12} lg={6}>
            <Form noValidate onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} lg={6}>
                        <StyledTitle>1. 비용 추가하기</StyledTitle>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
                            <Form.Control
                                type="date"
                                name="expenseDate"
                                placeholder="결제한 날짜를 선택해주세요."
                                value={date}
                                onChange={({target}) => setDate(target.value)}
                            />
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
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
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
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
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
                            <Form.Select
                                name="expensePayer"
                                defaultValue=""
                                className="form-control"
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
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6} className="d-grid gap-2">
                        <StyledSubmitBtn>추가하기</StyledSubmitBtn>
                    </Col>
                </Row>
            </Form>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA2;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
`

const StyledTitle = styled.h1`
    color: #FFFBFB;
    text-align: center;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: 0.25px;
    margin-bottom: 18px;
`

const StyledFormGroup = styled(FormGroup)`
    margin-bottom: 18px;
    select, input {
        background: #59359A;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        border: 0px;
        color: #F8F9FA;
        height: 45px;

        &:focus {
            background: #59359A;
            color: #F8F9FA;
            filter: brightness(80%)
        }

        &::placeholder {
            color: #F8F9FA;
        }
    }
`

const StyledSubmitBtn = styled(Button).attrs({
    type: 'submit'
})`
    height: 60px;
    /* padding: 16px 32px;
    gap: 8px; */
    border: 0px;
    border-radius: 8px;
    background-color: #E2D9F3;
    color: #59359A;
    margin-top

    &:hover, &:focus {
        background: #E2D9F3;
        filter: rgba(0, 0, 0, 0, 3);
    }
`
