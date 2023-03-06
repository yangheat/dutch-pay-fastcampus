import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { expensesState } from "../state/expenses"
import { groupMembersState } from "../state/groupMembers"
import { StyledTitle } from "./AddExpenseForm"
import { Download } from "react-bootstrap-icons"
import { toPng } from 'html-to-image'
import { useCallback, useRef } from "react"
import { Button } from "react-bootstrap"

export const calculateMinmumTransaction = (expenses, members, amountPerPerson) => {
    const minTransaction = []

    if (amountPerPerson === 0) {
        return minTransaction
    }

    // 1. 사람별로 냈어야 할 금액
    const membersToPay = {}
    members.forEach((member) => {
        membersToPay[member] = amountPerPerson
    })

    // 2. 사람별로 냈어야 할 금액 업데이트
    expenses.forEach(({payer, cost}) => {
        membersToPay[payer] -= cost
    })

    // 3. 
    const sortedMembersToPay = Object.keys(membersToPay)
        .map((member) => (
            {
                member: member,
                amount: membersToPay[member]
            }
        ))
        .sort((a, b) => a.amount - b.amount)

    // 4. 
    let left = 0
    let right = sortedMembersToPay.length - 1
    
    while (left < right) {
        const toRecive = sortedMembersToPay[left]
        const toSend = sortedMembersToPay[right]

        while (left < right && toRecive.amount === 0) {
            left++
        }

        while (left < right && toSend.amount === 0) {
            right--
        }

        const amountToReceive = Math.abs(toRecive.amount)
        const amountToSend = Math.abs(toSend.amount)

        if (amountToReceive < amountToSend) {
            minTransaction.push({
                receiver: toRecive.member,
                sender: toSend.member,
                amount: amountToReceive
            })

            toRecive.amount = 0
            toSend.amount -= amountToReceive
            left++
        } else {
            minTransaction.push({
                receiver: toRecive.member,
                sender: toSend.member,
                amount: amountToSend
            })

            toSend.amount = 0
            toRecive.amount -= amountToSend
            right--
        }
    }

    return minTransaction
}

export const SummaryOfResult = () => {
    const expenses = useRecoilValue(expensesState)
    const members = useRecoilValue(groupMembersState)
    
    const totalAmount = expenses.reduce((prevAmout, currentExpense) => prevAmout + currentExpense.cost, 0)
    const memberCount = members.length 
    const splitAmout = totalAmount / memberCount
    const minimumTransaction = calculateMinmumTransaction(expenses, members, splitAmout)

    const expenseSummaryScope = useRef(null)
    const downloadBtn = useRef(null)
    const onDownloadBtnClick = useCallback(() => {
        if (!expenseSummaryScope.current) return

        toPng(expenseSummaryScope.current, {
            filter: (node) => node.dataset?.testid !== 'download-icon'
        })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'settlement-summary.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.error(err)
            })
    }, [expenseSummaryScope])

    return (
        <StyledWrapper
            data-testid="expenseSummary"
            ref={expenseSummaryScope}
        >
            <StyledTitle>2. 정산은 이렇게!</StyledTitle>
            <StyledButton onClick={onDownloadBtnClick} data-testid="download-icon" ref={downloadBtn}>
                <Download />
            </StyledButton>
            {totalAmount > 0 && memberCount > 0 && (
            <>
                <StyledSummary>
                    <span>{memberCount}명이서 총 {totalAmount}원 지출</span>
                    <br />
                    <span>한 사람 당 {splitAmout}원</span>
                </StyledSummary>    
                <StyledUl>
                    {
                        minimumTransaction.map(({sender, receiver, amount}, index) => (
                            <li key={`transaction_${index}`}>
                                <span>{`${sender}가 ${receiver}에게 ${amount}원 보내기`}</span>
                            </li>
                        ))
                    }
                </StyledUl>
            </>
            )}
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    position: relative;
    background: #683BA2;
    color: #FFFBFB;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);;
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    font-size: 22px;
`
const StyledSummary = styled.div`
    margin-top: 31px;
`

const StyledButton = styled(Button)`
    background: none;
    border: 0;
    font-size: 25px;
    position: absolute;
    top: 15px;
    right: 20px;
    @media (max-width: 1000px) {
        top: -5px;
        right: -5px;
    }
    @media (max-width: 575px) {
        top: 15px;
        right: 20px;
    }
    @media (max-width: 350px) {
        top: -5px;
        right: -5px;
    }

    &:hover, &:active {
        background: none;
        opacity: 0.33;
    }

    &:active {
        background: none !important;
    }
`

const StyledUl = styled.ul`
    margin: 31px;
    font-weight: 600;
    line-height: 200%;
    list-style-type: disclosure-closed;
    li::marker {
        animation: blinker 1.5s linear infinite
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
`