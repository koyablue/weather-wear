import styled from 'styled-components'

// components
import Header from '../header'

const ContainerDiv = styled.div`
  min-height: 100vh;
  max-width: 1400px;
  margin: auto;
  padding: 0 80px;
`

const ContentsMain = styled.main`
  min-height: 100vh;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Main = () => {
  return (
    <ContainerDiv>
      <Header />
      <ContentsMain>
        <div>
          <input type='text' name='cityName' />
          TEST
        </div>
      </ContentsMain>
    </ContainerDiv>
  )
}

export default Main
