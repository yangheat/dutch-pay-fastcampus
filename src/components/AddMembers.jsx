import { CenteredOverlayForm } from "./CenteredOverlayForm"
import { Button, Container, Form, Row } from "react-bootstrap"
import { InputTags } from "react-bootstrap-tagsinput"
import { useRecoilState, useRecoilValue } from "recoil"
import { groupMembersState } from "../state/groupMembers"
import { useState } from "react"
import { groupNameState } from "../state/groupName"

export const AddMembers = () => {
    const group = useRecoilValue(groupNameState)
    const [members, setMembers] = useRecoilState(groupMembersState)
    const [formSubmit, setFormSubmit] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormSubmit(true)
    }

    return (
        <CenteredOverlayForm>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <h2>{group}그룹에 속한 사람들의 이름을 모두 적어주세요.</h2>
                    </Row>
                    <Row>
                        <InputTags
                            data-testid="input-members"
                            placeholder="이름간 띄어 쓰기"
                            onTags={(value) => setMembers(value.values)}
                        />
                        {formSubmit && members.length === 0 && (
                            <span>그룹 멤버들의 이름을 입력해주세요.</span>
                        )}
                    </Row>
                    <Row>
                        <Button type="submit">저장</Button>
                    </Row>
                </Form>
            </Container>
        </CenteredOverlayForm>
    )
}