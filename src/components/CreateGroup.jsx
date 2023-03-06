import { useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { ROUTES } from "../routes"
import { groupNameState } from "../state/groupName"
import { CenteredOverlayForm, StyledRow, StyleH2, StyleSubmitBtn } from "./CenteredOverlayForm"

export const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const [validGroupName, setValidGroupName] = useState(false)
    const setGroupName = useSetRecoilState(groupNameState)
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const form = e.currentTarget

        if(form.checkValidity()) {
            setValidGroupName(true)
            navigate(ROUTES.ADD_MEMBERS)
        } else {
            e.stopPropagation()
            setValidGroupName(false)
        }
        setValidated(true)

    }

    return (
        <CenteredOverlayForm 
            title="먼저, 더치 페이할 그룹의 이름을 정해볼까요?"
            validated={validated}
            handleSubmit={handleSubmit}
            btnText="저장"
        >
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
        </CenteredOverlayForm>
    )
}