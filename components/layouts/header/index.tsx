import styled from 'styled-components'
import { BsGithub } from 'react-icons/bs'

// styles
import { breakPoint } from '../../../styles/breakPoint'

// components
import DarkModeToggleSwitch from './darkModeToggleSwitch'

// constants
import { GITHUB_URL } from '../../../constants/url'

const ContainerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${breakPoint.mobileS} {
    height: 60px;
    padding: 16px 0;
  }

  @media ${breakPoint.mobileM} {
    height: 80px;
    padding: 40px 0;
  }
`

const GitHubIcon = styled(BsGithub)<{color?: string}>`
  width: 40px;
  height: 32px;
  opacity: 1;
  transition: opacity 0.3s ease;
  color: ${(props) => props.color || ''};
  :hover {
    opacity: 0.6;
  }
`

const Header = () => {
  return (
    <ContainerHeader>
      <a href={GITHUB_URL} target='_blank' rel='noreferrer'>
        <GitHubIcon />
      </a>
      <DarkModeToggleSwitch />
    </ContainerHeader>
  )
}

export default Header
