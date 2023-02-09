import styled from "styled-components"

export const OverlayWrapper = ({children, padding, minHeight}) => {
  return (
    <StyledContanier padding={padding} minHeight={minHeight}>{children}</StyledContanier>
  )
}

const StyledContanier = styled.div`
    background-color: white;
    box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    min-height: ${(props) => props.minHeight || 0};
    padding: ${(props) => props.padding || '5vw'}
`