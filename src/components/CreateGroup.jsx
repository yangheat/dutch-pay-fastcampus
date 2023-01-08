import { useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { useSetRecoilState } from "recoil"
import styled from "styled-components"
import { groupNameState } from "../state/groupName"
import { CenteredOverlayForm } from "./CenteredOverlayForm"

export const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const [validGroupName, setValidGroupName] = useState(false)
    const setGroupName = useSetRecoilState(groupNameState)
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const form = e.currentTarget

        if(form.checkValidity()) {
            setValidGroupName(true)
        } else {
            e.stopPropagation()
            setValidGroupName(false)
        }
        setValidated(true)
    }

    return (
        <CenteredOverlayForm>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <StyledRow>
                        <Row className="align-items-start">
                            <StyleH2>먼저, 더치 페이할 그룹의 이름을 정해볼까요?</StyleH2>
                        </Row>
                        <Row className="align-items-center">
                            <Form.Group controlId="vaildationGroupName">
                                <Form.Control
                                    type="text"
                                    placeholder="2023 제주도 여행"
                                    required
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    data-valid={validGroupName}
                                >
                                    그룹명을 입력해주세요.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="align-items-end">
                            <StyleSubmitBtn size="lg">저장하고 다음 단계로</StyleSubmitBtn>
                        </Row>
                    </StyledRow>
                </Form>
            </Container>
        </CenteredOverlayForm>
    )
}

const StyledRow = styled(Row)`
    align-items: center;
    justify-content: center;
    height: 60vh;
    min-height: 200px;
`

const StyleH2 = styled.h2`
    font-weight: 700;
    line-height: 35px;
    text-align: right;
    word-break: keep-all;
`

const StyleSubmitBtn = styled(Button).attrs({
    type: 'submit'
})`
    background: #6610F2;
    border-radius: 8px;
    border: none;
    font-size: 1rem;

    &:hover {
        background-color: #6610F2;
        filter: brightness(80%);
    }
`