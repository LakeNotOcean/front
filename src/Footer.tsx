import styled from 'styled-components'

const FooterContainer = styled.footer`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    background-color: lightgrey;
`;

const Link = styled.a`
    padding: 20px;
`;


export default function Footer(): JSX.Element {
    return <FooterContainer>
        <Link>Terms of service</Link>
        <Link>Privacy Policy</Link>
    </FooterContainer>;
}