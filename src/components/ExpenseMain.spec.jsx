import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RecoilRoot } from "recoil"
import { ExpenseMain } from "./ExpenseMain"

const renderComponent = () => {
    render(
        <RecoilRoot>
            <ExpenseMain />
        </RecoilRoot>
    )

    // const dateInput = screen.getByPlaceholderText(/결제한 날짜/)
    // const descInput = screen.getByPlaceholderText(/비용에 대한 설명/)
    // const costInput = screen.getByPlaceholderText(/비용은 얼마/)
    // const payerInput = screen.getByPlaceholderText(/누가 결제/)
    // const addBtn = screen.getByText(/추가/)

    const dateInput = screen.getByPlaceholderText('결제한 날짜를 선택해주세요.')
    const descInput = screen.getByPlaceholderText('비용에 대한 설명을 입력해주세요.')
    const costInput = screen.getByPlaceholderText('비용은 얼마였나요?')
    const payerInput = screen.getByPlaceholderText('누가 결제했나요?')
    const addBtn = screen.getByText('추가하기')
    

    return {dateInput, descInput, costInput, payerInput, addBtn}
}

describe('비용 정산 메인 페이지', () => {
    test('비용 추가 컴포넌트 렌더링', () => {
        const {dateInput, descInput, costInput, payerInput, addBtn} = renderComponent()
        
        expect(dateInput).toBeInTheDocument()
        expect(descInput).toBeInTheDocument()
        expect(costInput).toBeInTheDocument()
        expect(payerInput).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
    })

    describe('비용 추가 컴포넌트', () => {
        test('필수 항목을 입력하지 않고 "추가" 버튼 클릭 시, 오류 메시지 출력', async () => {
            const {addBtn} = renderComponent()
            addBtn.toBeInTheDocument()
            
            await userEvent.click(addBtn)

            const descErrMsg = screen.getByText('비용에 대한 설명을 입력해주세요.')
            descErrMsg.toBeInTheDocument()

            const costErrMsg = screen.getByText('비용을 입력해주세요.')
            costErrMsg.toBeInTheDocument()

            const payerErrMsg = screen.getByText('결제자를 입력해주세요')
            payerErrMsg.toBeInTheDocument()
        })
    
        test('필수 항목을 입력하고 "추가" 버튼 클릭 시, 저장 성공', async () => {
            const {descInput, costInput, payerInput, addBtn} = renderComponent()

            await Promise.all([
                userEvent.type(descInput, '장보기'),
                userEvent.type(costInput, '30000'),
                userEvent.selectOptions(payerInput, '홍길동')   // 테스트를 돌리기 전에 PayerList(멤버들 이름)을 셋업해야한다.
            ])
            await userEvent.click(addBtn)

            const descErrMsg = screen.queryByText('비용에 대한 설명을 입력해주세요.')
            expect(descErrMsg).not.toBeInTheDocument()

            const costErrMsg = screen.queryByText('비용을 입력해주세요.')
            expect(costErrMsg).not.toBeInTheDocument()

            const payerErrMsg = screen.queryByText('결제자를 입력해주세요')
            expect(payerErrMsg).not.toBeInTheDocument()

        })
    
        test('결제한 날짜를 선택하지 않고 추가 버큰 클릭 시, 에러 메시지 출력', () => {
            const {dateInput, addBtn} = renderComponent()
        })
        
    })


    test('비용에 대한 설명을 입력하지 않고 추가 버튼 클릭 시, 에러 메시지 출력', () => {
        const {descInput, addBtn} = renderComponent()

    })

    test('비용을 입력하지 않고 추가 버튼 클릭 시, 에러 메시지 출력', () => {
        const {costInput, addBtn} = renderComponent()
    })

    test('결제자 입력하지 않고 추가 버튼 클릭 시, 에러 메시지 출력', () => {
        const {payerInput, addBtn} = renderComponent()
    })

    test('정산 결과 렌더링', ()=> {

    })

    test('비용 리스트 렌더링', () => [

    ])
})