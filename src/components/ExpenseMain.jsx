import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap"

export const ExpenseMain = () => {
    return (
        <Row>
            <Col lg="4">
                <Row className="justify-content-center">
                    Dutch Pay
                </Row>
                <Row>
                    <Row className="justify-content-center">1. 비용 추가하기</Row>
                    <Row>
                        <InputGroup>
                            <Form.Control
                                placeholder="결제한 날짜를 선택해주세요.">
                            </Form.Control>
                        </InputGroup>
                    </Row>
                    <Row>
                    <InputGroup>
                            <Form.Control
                                placeholder="비용에 대한 설명을 입력해주세요.">
                            </Form.Control>
                        </InputGroup>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                        <InputGroup>
                            <Form.Control
                                placeholder="비용은 얼마였나요?">
                            </Form.Control>
                        </InputGroup>
                        </Col>
                        <Col>
                        <InputGroup>
                            <Form.Control
                                placeholder="누가 결제했나요?">
                            </Form.Control>
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Button>추가하기</Button>
                    </Row>
                </Row>
                <Row className="justify-content-center">2. 정산은 이렇게!</Row>
            </Col>
            <Col>
                <Row className="justify-content-center">&#123;그룹 이름&#125;</Row>
                <Row className="justify-content-center">
                    <Table>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>내용</th>
                                <th>결제자</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                    </Table>
                </Row>
            </Col>
        </Row>
    )
}


// <div>
//     ExpenseMain
//     {/* Left {ane */}
//     <div>
//         {/* //TODO: 비용 추가 폼 렌더링*/}
//         {/* //TODO: 정산 결과 컴포넌트 렌더링 */}
//     </div>
//     {/* Right Pane */}
//     <div>
//         {/* //TODO:  그룹 헤더 렌더링 */}
//         {/* //TODO:  비용 리스트 컴포넌트 렌더링 */}
//     </div>
// </div>