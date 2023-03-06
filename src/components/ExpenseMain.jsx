import { Col, Container, Row } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { groupNameState } from "../state/groupName"
import { AddExpenseForm } from "./AddExpenseForm"
import ExpenseTable from "./ExpenseTable"
import { ServiceLogo } from "./shared/ServiceLogo"
import { SummaryOfResult } from "./SummaryOfResult"

export const ExpenseMain = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} sm={5} md={5}>
                    <LeftPane />
                </Col>
                <Col>
                    <RightPane />
                </Col>
            </Row>
            
            
        </Container>
    )
}


const LeftPane = () => (
    <Container>
        <StyledLeftGapRow>
            <Row>
                <ServiceLogo />
            </Row>
            <Row> 
                <AddExpenseForm />
            </Row>
            <Row>
                <SummaryOfResult />
            </Row>
        </StyledLeftGapRow>
    </Container>
)

const StyledLeftGapRow = styled(Row)`
    gap: 5vh;
    padding-top: 100px;
    justify-content: center;
`

const RightPane = () => {
    const groupName = useRecoilValue(groupNameState)
    return (
        <StyledRightWrapper>
            <Row>
                <StyledGroupName>{groupName || '그룹 이름'}</StyledGroupName>
            </Row>
            <Row>
                <ExpenseTable />
            </Row>
        </StyledRightWrapper>
    )
}

const StyledRightWrapper = styled(Container)`
    padding: 100px 31px 100px 31px;
`

const StyledGroupName = styled.h2`
    text-align: center;
    font-weight: 700;
    font-size: 48px;
    line-height: 48px;
    margin-bottom: 80px;
`