import { Container, Row, Col } from "react-bootstrap"

export const Test = () => (
    <Container>
        <Row className="align-items-center">
            <Col>
                <Row>
                    <Col>Column A</Col>
                </Row>
                <Row>
                    <Col>Column B</Col>
                </Row>
            </Col>
            <Col>Column2</Col>
        </Row>
        {/* <Row>
            <Col>Column1</Col>
            <Col>Column2</Col>
        </Row> */}
    </Container>
)
