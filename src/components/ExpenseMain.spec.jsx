import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RecoilRoot } from "recoil"
import { groupMembersState } from "../state/groupMembers"
import { ExpenseMain } from "./ExpenseMain"

const renderComponent = () => {
    render(
        <RecoilRoot initializeState={(snapshot) => {
            snapshot.set(groupMembersState, ['영수', '영희'])
        }}>
            <ExpenseMain />
        </RecoilRoot>
    )

    const dateInput = screen.getByPlaceholderText('결제한 날짜를 선택해주세요.')
    const descriptionInput = screen.getByPlaceholderText('비용에 대한 설명을 입력해주세요.')
    const costInput = screen.getByPlaceholderText('비용은 얼마였나요?')
    const payerInput = screen.getByDisplayValue('누가 결제했나요?')
    const addBtn = screen.getByText('추가하기')

    const descriptionErrMsg = screen.getByText('설명을 입력해주세요.')
    const costErrMsg = screen.getByText('1원 이상의 비용을 입력해주세요.')
    const payerErrMsg = screen.getByText('결제자를 입력해주세요.')
    

    return {
        dateInput, descriptionInput, costInput, payerInput, addBtn,
        descriptionErrMsg, costErrMsg, payerErrMsg
    }
}

describe('비용 정산 메인 페이지', () => {
    test('비용 추가 컴포넌트 렌더링', () => {
        const {dateInput, descriptionInput, costInput, payerInput, addBtn} = renderComponent()
        
        expect(dateInput).toBeInTheDocument()
        expect(descriptionInput).toBeInTheDocument()
        expect(costInput).toBeInTheDocument()
        expect(payerInput).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
    })

    describe('비용 추가 컴포넌트', () => {
        test('필수 항목을 입력하지 않고 "추가" 버튼 클릭 시, 오류 메시지 출력', async () => {
            const {addBtn, descriptionErrMsg, costErrMsg, payerErrMsg} = renderComponent()
            
            await userEvent.click(addBtn)

            expect(descriptionErrMsg).toHaveAttribute('data-valid', 'false')
            expect(costErrMsg).toHaveAttribute('data-valid', 'false')
            expect(payerErrMsg).toHaveAttribute('data-valid', 'false')
        })
    
        test('필수 항목을 입력하고 "추가" 버튼 클릭 시, 저장 성공', async () => {
            const {
                descriptionInput, costInput, payerInput, addBtn,
                descriptionErrMsg, costErrMsg, payerErrMsg
            } = renderComponent()

            await Promise.all([
                userEvent.type(descriptionInput, '장보기'),
                userEvent.type(costInput, '30000'),
                userEvent.selectOptions(payerInput, '영수')
            ])

            await userEvent.click(addBtn)
            
            expect(descriptionErrMsg).toHaveAttribute('data-valid', 'true')
            expect(costErrMsg).toHaveAttribute('data-valid', 'true')
            expect(payerErrMsg).toHaveAttribute('data-valid', 'true')
        })
    })


    // test('비용에 대한 설명을 입력하지 않고 추가 버튼 클릭 시, 에러 메시지 출력', () => {
    //     const {descriptionInput, addBtn} = renderComponent()

    // })

    // test('비용을 입력하지 않고 추가 버튼 클릭 시, 에러 메시지 출력', () => {
    //     const {costInput, addBtn} = renderComponent()
    // })

    // test('결제자 입력하지 않고 추가 버튼 클릭 시, 에러 메시지 출력', () => {
    //     const {payerInput, addBtn} = renderComponent()
    // })

    // test('정산 결과 렌더링', ()=> {

    // })

    // test('비용 리스트 렌더링', () => [

    // ])
})