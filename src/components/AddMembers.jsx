import { CenteredOverlayForm } from "./CenteredOverlayForm"
import { InputTags } from "react-bootstrap-tagsinput"
import { useRecoilState, useRecoilValue } from "recoil"
import { groupMembersState } from "../state/groupMembers"
import { useState } from "react"
import { groupNameState } from "../state/groupName"
import styled from "styled-components"

export const AddMembers = () => {
    const group = useRecoilValue(groupNameState)
    const [members, setMembers] = useRecoilState(groupMembersState)
    const [validated, setValidated] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormSubmit(true)
        setValidated(true)
    }

    return (
        <CenteredOverlayForm 
            title={`${group}그룹에 속한 사람들의 이름을 모두 적어주세요.`}
            validated={validated}
            handleSubmit={handleSubmit}
            btnText="저장"
        >
            <InputTags
                data-testid="input-members"
                placeholder="이름간 띄어 쓰기"
                onTags={(value) => setMembers(value.values)}
            />
            {validated && members.length === 0 && (
                <StyledErrMsg>그룹 멤버들의 이름을 입력해주세요.</StyledErrMsg>
            )}
        </CenteredOverlayForm>
    )
}

const StyledErrMsg = styled.span`
    color: red
`