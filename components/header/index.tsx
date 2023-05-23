import styled from 'styled-components'
import { BsGithub } from 'react-icons/bs'

import DarkModeToggleSwitch from './darkModeToggleSwitch'

import { GITHUB_URL } from '../../constants/url'

const ContainerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid;
  padding: 16px;
`

const GitHubIcon = styled(BsGithub)`
  width: 40px;
  height: 32px;
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
