import { Col, Row } from "react-bootstrap"

export const ExpenseMain = () => {
    return (
        <Row>
            <Col lg="4">
                <Row className="justify-content-center">
                    Dutch Pay
                </Row>
                <Row className="justify-content-center">1. 비용 추가하기</Row>
                <Row className="justify-content-center">2. 정산은 이렇게!</Row>
            </Col>
            <Col>
                <Row className="justify-content-center">&#123;그룹 이름&#125;</Row>
                <Row className="justify-content-center">리스트</Row>
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