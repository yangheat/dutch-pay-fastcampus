import { Button, Container, Form, Row } from "react-bootstrap"
import styled from 'styled-components'
import { OverlayWrapper } from "./shared/OverlayWrapper"

export const CenteredOverlayForm = ({
    title, validated, handleSubmit, children,  btnText
}) => {
    return (
        <StyledCenteralizedContainer>
            <StyledLogo>Dutch Pay</StyledLogo>
            <OverlayWrapper>
                <Container>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <StyledCentralizedContent>
                            <Row className="align-conent-itmes-start">
                                <StyledTitle>{title}</StyledTitle>
                            </Row>
                            <Row className="align-conent-items-center">
                                {children}
                            </Row>
                            <Row className="align-conent-items-end">
                                <StyleSubmitBtn>{btnText}</StyleSubmitBtn>
                            </Row>
                        </StyledCentralizedContent>
                    </Form>
                </Container>
            </OverlayWrapper>
        </StyledCenteralizedContainer>
    )
}

const StyledCenteralizedContainer = styled(Container)`
    width: 50vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
`

const StyledLogo = styled.h1`
    font-weight: 200;
    letter-spacing: 10px; 
`
const StyledTitle = styled.h2`
    font-weight: 700;
    line-height: 35px;
    text-align: right;
    word-break: keep-all;
`

const StyledCentralizedContent = styled(Row)`
    align-items: center;
    justify-content: center;
    height: 60vh;
    min-height: 200px;
`

export const StyleSubmitBtn = styled(Button).attrs({
    type: 'submit'
})`
    background: #6610F2;
    border-radius: 8px;
    border: none;
    font-size: 1rem;

    &:hover {
        background-color: #6610F2;
        filter: brightness(80%);
    }
`