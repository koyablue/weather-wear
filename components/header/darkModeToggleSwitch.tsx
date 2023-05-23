import styled from 'styled-components'

// icons
import { FiSun, FiMoon } from 'react-icons/fi'

const SunIcon = styled(FiSun)`
  font-size: 14px;
`

const MoonIcon = styled(FiMoon)`
  font-size: 14px;
`

const SwitchWrapperDiv = styled.div`
  line-height    : 24px;                /* 1行の高さ          */
  letter-spacing : 0;                   /* 文字間             */
  text-align     : center;              /* 文字位置は中央     */
  font-size      : 8px;                /* 文字サイズ         */

  position       : relative;            /* 親要素が基点       */
  // margin         : auto;                /* 中央寄せ           */
  width          : 56px;               /* ボタンの横幅       */
  /* background     : #fff; */

  input[type="checkbox"] {
    display        : none;            /* チェックボックス非表示 */
  }

  input[type="checkbox"]:checked +label {
    border-color   : #78bd78;             /* 選択タブの枠線     */
  }

  label {
    display        : flex;               /* ボックス要素に変更 */
    justify-content: space-between;
    box-sizing     : border-box;          /* 枠線を含んだサイズ */
    height         : 26px;                /* ボタンの高さ       */
    border         : 1.5px solid #333333;   /* 未選択タブのの枠線 */
    border-radius  : 30px;                /* 角丸               */
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
    position       : absolute;            /* 親要素からの相対位置*/
    width          : 20px;                /* 丸の横幅           */
    height         : 20px;                /* 丸の高さ           */
    background     : #faf5eb;             /* カーソルタブの背景 */
    top            : 3px;                 /* 親要素からの位置   */
    left           : 4px;                 /* 親要素からの位置   */
    border-radius  : 26px;                /* 角丸               */
    transition     : .2s;                 /* 滑らか変化         */
    border         : 1.5px solid #333333;
  }

  input[type="checkbox"]:checked ~ #swImg {
    transform      : translateX(28px);    /* 丸も右へ移動       */
    background     : #78bd78;             /* カーソルタブの背景 */
  }
`
// TODO: switch all the area clickable(checked=true)
// TODO: dark mode

const DarkModeToggleSwitch = () => {
  return (
    <SwitchWrapperDiv>
      <input type="checkbox" id="switch1" />
      <label htmlFor="switch1">
        {/* <span> */}
          <SunIcon/>
          <MoonIcon/>
        {/* </span> */}
      </label>
      <div id="swImg"></div>
    </SwitchWrapperDiv>
  )
}

export default DarkModeToggleSwitch
