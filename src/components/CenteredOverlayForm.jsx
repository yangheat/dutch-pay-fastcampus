import { Container } from "react-bootstrap"
import styled from 'styled-components'
import { OverlayWrapper } from "./shared/OverlayWrapper"

export const CenteredOverlayForm = ({children}) => {
    return (
        <StyledCenteralizedContainer>
            <StyledHeader>Dutch Pay</StyledHeader>
            <OverlayWrapper>
                {children}
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

const StyledHeader = styled.h2`
    font-weight: 200;
    letter-spacing: 10px; 
`