import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RecoilRoot } from "recoil"
import { AddMembers } from "./AddMembers"

const renderComponent = () => {
    render(
        <RecoilRoot>
            <AddMembers/>
        </RecoilRoot>
    )

    // <div data-testid="id"></div>
    const input = screen.getByTestId('input-members')
    const saveBtn = screen.getByText('저장')

    return {input, saveBtn}
}


describe('멤버 추가 페이지', () => {
    test('멤버 추가 컴포넌트 랜더링', () => {
        const {input, saveBtn} = renderComponent()

        expect(input).not.toBeNull()
        expect(saveBtn).not.toBeNull()
    })
    test('멤버를 추가하지 않고 저장 버튼 클릭 시, 에러 메시지 출력', async () => {
        const {saveBtn} = renderComponent()

        await userEvent.click(saveBtn)
        
        const errMsg = await screen.findByText('그룹 멤버들의 이름을 입력해주세요.')
        expect(errMsg).toBeInTheDocument()
    })
    test('멤버 추가 후 저장 버튼 클릭 시, 저장 성공', async () => {
        const {input, saveBtn} = renderComponent()

        await userEvent.type(input, '철수 영희 영수')
        await userEvent.click(saveBtn)
        
        const errMsg = screen.queryByText('그룹 멤버들의 이름을 입력해주세요.')
        expect(errMsg).toBeNull()
    })
})