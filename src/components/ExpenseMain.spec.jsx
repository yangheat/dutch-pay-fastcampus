import { render, screen, within } from "@testing-library/react"
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
    describe('비용 추가 컴포넌트', () => {
        test('비용 추가 컴포넌트 렌더링', () => {
            const {dateInput, descriptionInput, costInput, payerInput, addBtn} = renderComponent()
            
            expect(dateInput).toBeInTheDocument()
            expect(descriptionInput).toBeInTheDocument()
            expect(costInput).toBeInTheDocument()
            expect(payerInput).toBeInTheDocument()
            expect(addBtn).toBeInTheDocument()
        })

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

    describe('비용 리스트 컴포넌트', () => {
        test('비용 리스트 컴포넌트 렌더링', () => {
            renderComponent()
            const expenseListComponent = screen.getByTestId('expenseList')

            expect(expenseListComponent).toBeInTheDocument()
        })
    })

    describe('정산 결과 컴포넌트', () => {
        test('정산 결과 컴포넌트가 렌더링되는가?', () => {
            renderComponent()

            const component = screen.getByTestId(/정산은 이렇게/i)
            expect(component.toBeInTheDocument())
        })
    })

    describe('새로운 비용이 입력되었을 때', () => {
        const addNewExpense = async () => {
            const {dateInput, descriptionInput, costInput, payerInput, addBtn} = renderComponent()

            await Promise.all([
                userEvent.type(dateInput, '2023-02-07'),
                userEvent.type(descriptionInput, '장보기'),
                userEvent.type(costInput, '30000'),
                userEvent.selectOptions(payerInput, '영수')
            ])
    
            await userEvent.click(addBtn)
        }
        test('날짜, 내용, 결제자, 금액 데이터가 정산 리스트에 추가된다.', async () => {
            await addNewExpense()
    
            const expenseListComponent = screen.getByTestId('expenseList')
            
            const dateValue = within(expenseListComponent).getByText('2023-02-07')
            expect(dateValue).toBeInTheDocument()
    
            const descriptionValue = within(expenseListComponent).getByText('장보기')
            expect(descriptionValue).toBeInTheDocument()
    
            const costValue = within(expenseListComponent).getByText('영수')
            expect(costValue).toBeInTheDocument()
    
            const payerValue = within(expenseListComponent).getByText('30000 원')
            expect(payerValue).toBeInTheDocument()
    
            const amountValue = within(expenseListComponent).getByText('2023-02-07')
            expect(amountValue).toBeInTheDocument()
        })

        test('정산 결과 또한 업데이트가 된다.', async () => {
            await addNewExpense()

            // \d명 - 총 (\d{1,3}\,)*\d{1,3} 원 지출.
            // 한 사람 당 (\d{1,3},)*\d{1,3}원
            // ・ \W+ -> \W+ - (\d{1,3},)*\d{1,3}원
            // ・ \W+ -> \W+ - (\d{1,3},)*\d{1,3}원
            
            const totalText = /\d명 - 총 (\d{1,3}\,)*\d{1,3} 원 지출/i
            expect(totalText.toBeInTheDocument())
            const calText = /한 사람 당 (\d{1,3},)*\d{1,3}원/i
            expect(calText.toBeInTheDocument())
            const individualText = /\W+ -> \W+ - (\d{1,3},)*\d{1,3}원/i
            expect(individualText.toBeInTheDocument())
        })
    })
})