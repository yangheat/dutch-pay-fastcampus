import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CreateGroup } from "./CreateGroup"

const renderComponent = () => {
    render(<CreateGroup/>)

    const input = screen.getByPlaceholderText('2022 제주도 여행')
    const saveBtn = screen.getByText('저장')
    const errMsg = screen.getByText('그룹 이름을 입력해주세요.')
    
    return {input, saveBtn, errMsg}
}

describe('그룹 생성 페이지', () => {
    test('그룹 입력 컴포넌트 렌더링', () => {
        const {input, saveBtn} = renderComponent()
        
        expect(input).not.toBeNull()
        expect(saveBtn).not.toBeNull()
    })
    test('그룹 이름 입력하지 않고 저장 버튼 클릭 시, 에러 메시지 출력', async () => {
        const {saveBtn, errMsg} = renderComponent()

        await userEvent.click(saveBtn)
        expect(errMsg).not.toBeNull() 
    })
    test('그룹 이름 입력 후 저장 버튼 클릭 시, 저장 성공', async () => {
        const {input, saveBtn, errMsg} = renderComponent()

        await userEvent.type((input, '예시 그룹명'))
        await userEvent.click(saveBtn)

        expect(errMsg).toBeNull()
    })
})