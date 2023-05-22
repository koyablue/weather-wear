import styled from 'styled-components'

const MainContainer = styled.main`
  min-height: 100vh;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  max-width: 1400px;
  border-bottom: 1px solid;
`

const Main = () => {
  return (
    <>
      <Header>
        <div>test1</div>
        <div>test2</div>
      </Header>
      <MainContainer>
      <div>
        <input type='text' name='cityName' />
        TEST
      </div>
    </MainContainer>
    </>
  )
}

export default Main
