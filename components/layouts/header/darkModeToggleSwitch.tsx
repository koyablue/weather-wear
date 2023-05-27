import styled from 'styled-components'

// icons
import { FiSun, FiMoon } from 'react-icons/fi'

// hooks
import { useColorTheme } from '../../../hooks/useColorTheme'

const SunIcon = styled(FiSun)`
  font-size: 14px;
`

const MoonIcon = styled(FiMoon)`
  font-size: 14px;
`

// Use <label></label> to make all the area clickable
const SwitchWrapperLabel = styled.label`
  line-height    : 24px;
  letter-spacing : 0;
  text-align     : center;
  font-size      : 8px;

  position       : relative;
  // margin         : auto;
  width          : 56px;
  /* background     : #fff; */

  input[type="checkbox"] {
    display        : none;
  }

  input[type="checkbox"]:checked +label {
    border-color   : #78bd78;
  }

  label {
    display        : flex;
    justify-content: space-between;
    box-sizing     : border-box;
    height         : 26px;
    border         : 1.5px solid #333333;
    border-radius  : 30px;
    padding: 4.5px 4px;


    /* span:after{
      content        : "OFF";
      padding        : 0 0 0 24px;
      color          : #999999;
    } */
  }

  /* input[type="checkbox"]:checked + label span:after{
    padding        : 0 36px 0 0;
    color          : #78bd78;
  } */

  #swImg {
    position       : absolute;
    width          : 20px;
    height         : 20px;
    background     : #faf5eb;
    top            : 3px;
    left           : 4px;
    border-radius  : 26px;
    transition     : .2s;
    border         : 1.5px solid #333333;
  }

  input[type="checkbox"]:checked ~ #swImg {
    transform      : translateX(28px);
    background     : #78bd78;
  }
`

/**
 * Dark mode <-> light mode toggle switch
 * Update cookie value and global state on change
 *
 * @return {*} JSX.Element
 */
const DarkModeToggleSwitch = () => {
  const { getCurrentColorTheme, setColorTheme } = useColorTheme()

  const isDark = getCurrentColorTheme() === 'dark'

  const toggleDarkTheme = () => {
    isDark ? setColorTheme('light') : setColorTheme('dark')
  }

  return (
    <SwitchWrapperLabel>
      <input type='checkbox' id='switch1' checked={isDark} onChange={toggleDarkTheme} />
      <label htmlFor='switch1'>
        {/* <span> */}
          <SunIcon/>
          <MoonIcon/>
        {/* </span> */}
      </label>
      <div id='swImg'></div>
    </SwitchWrapperLabel>
  )
}

export default DarkModeToggleSwitch
