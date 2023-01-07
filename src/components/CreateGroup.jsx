import { useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { useRecoilState } from "recoil"
import { groupNameState } from "../state/groupName"
// import { CenteredOverlayForm } from "./CenteredOverlayForm"

export const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const [validGroupName, setValidGroupName] = useState(false)
    const [groupName, setGroupName] = useRecoilState(groupNameState)
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
        <div>
            <h1>Create Group Componet</h1>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <h2>먼저, 더피 체이할 그룹의 이름을 정해볼까요?</h2>
                    </Row>
                    <Row>
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
                    <Row>
                        <Button type="submit" size="lg">저장하고 다음 단계로</Button>
                    </Row>
                </Form>
            </Container>
            {/* <CenteredOverlayForm/> */}
        </div>
    )
}
