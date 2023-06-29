import React, { ReactElement, ReactNode } from 'react'

import { render, screen , RenderOptions, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import Main from '../../components/pages/main'
import SearchInput from '../../components/common/searchInput'

import { celsiusToClothingGuidelineScale, getClothingAdviceByClothingGuidelineScale } from '../../services/clothingGuidelineScale'

import { Provider } from 'react-redux'
import { store } from '../../stores/store'

const useGeocodingMockData = {
  geocodingResult: undefined,
  error: null,
  isLoading: true,
  isValidating: false,
}

const mockGeocodingResult = [
  {
    'name': 'Tokyo',
    'local_names': {'zh':'东京都/東京都','ta':'டோக்கியோ','hr':'Tokio','ku':'Tokyo','sk':'Tokio','ru':'Токио','de':'Tokio','fa':'توکیو','hu':'Tokió','en':'Tokyo','sv':'Tokyo','ca':'Tòquio','cs':'Tokio','es':'Tokio','fi':'Tokio','tr':'Tokyo','ar':'طوكيو','fr':'Tokyo','da':'Tokyo','et':'Tōkyō','ia':'Tokyo','sr':'Токио','ko':'도쿄도','be':'Токіа','bg':'Токио','la':'Tokium','lv':'Tokija','lb':'Tokio','uk':'Токіо','vi':'Tokyo','el':'Τόκιο','eo':'Tokio','he':'טוקיו','sl':'Tokio','mi':'Tōkio','mr':'तोक्यो','it':'Tokyo','is':'Tókýó','pl':'Tokio','th':'โตเกียว','kn':'ಟೋಕ್ಯೊ','oc':'Tòquio','ja':'東京都','lt':'Tokijas','cy':'Tokyo','tg':'Токио','io':'Tokyo','pt':'Tóquio','nl':'Tokio'},
    'lat': 35.6828387,
    'lon': 139.7594549,
    'country': 'JP'
  },
  {
    'name': 'Chofu',
    'local_names': {'ar':'تشوفو، طوكيو','fi':'Chōfu','en':'Chofu','lt':'Čiofu','pl':'Chōfu','it':'Chōfu','sr':'Чофу','bg':'Чофу','sv':'Chofu','ms':'Chofu','es':'Chofu','pt':'Chofu','fr':'Chōfu','ko':'조후시','tg':'Чōфу','sh':'Čofu','ru':'Тёфу','th':'โชฟุ','et':'Chōfu','zh':'調布市','de':'Chōfu','gl':'Chōfu, Tōkyō','fa':'چوفو، توکیو','nl':'Chofu','ja':'調布市','uk':'Тьофу'},'lat':35.660036,'lon':139.554815,'country':'JP'},{'name':'Tama','local_names':{'ko':'다마시','pl':'Tama','ms':'Tama','nl':'Tama','it':'Tama','uk':'Тама','zh':'多摩市','lt':'Tama','tg':'Тама','fi':'Tama','th':'ทามะ','en':'Tama','bg':'Тама','de':'Tama','es':'Tama','gl':'Tama, Tōkyō','ru':'Тама','sr':'Тама','sh':'Tama','fa':'تاما، توکیو','pt':'Tama','ja':'多摩市','ar':'تاما، طوكيو','fr':'Tama'},
    'lat': 35.637188,
    'lon': 139.443503,
    'country': 'JP'
  },
  {
    'name': 'Kodaira',
    'local_names': {'de':'Kodaira','it':'Kodaira','tl':'Kodaira, Tokyo','ar':'كودايرا، طوكيو','gl':'Kodaira','ro':'Kodaira, Tokyo','zh':'小平市','sr':'Кодаира','ko':'고다이라시','es':'Kodaira','fa':'کودائیرا، توکیو','bg':'Кодайра','eo':'Kodaira','fi':'Kodaira','en':'Kodaira','sh':'Kodaira','tg':'Кодаира','ms':'Kodaira','pt':'Kodaira','lt':'Kodaira','ru':'Кодайра','fr':'Kodaira','vi':'Kodaira, Tokyo','ja':'小平市','pl':'Kodaira','th':'โคไดระ','uk':'Кодайра'},
    'lat': 35.72522,
    'lon': 139.476606,
    'country': 'JP'
  },
  {
    'name': 'Kokubunji',
    'local_names': {'tg':'Кокубунҷи','ja':'国分寺市','gl':'Kokubunji, Tōkyō','fa':'کوکوبونجی، توکیو','it':'Kokubunji','ar':'كوكوبونجي، طوكيو','uk':'Кокубундзі','fr':'Kokubunji','zh':'國分寺市','de':'Kokubunji','eo':'Kokubunĵi','ms':'Kokubunji','ko':'고쿠분지시','en':'Kokubunji','sr':'Кокубунџи','es':'Kokubunji','ru':'Кокубундзи','th':'โคกูบุนจิ','pl':'Kokubunji','pt':'Kokubunji','lt':'Kokubundžis','fi':'Kokubunji','sh':'Kokubunji'},
    'lat': 35.709674,
    'lon': 139.454224,
    'country': 'JP'
  },
]

jest.mock('../../hooks/data/useGeocoding.ts', () => ({
  useGeocoding: () => {
    return useGeocodingMockData
  }
}))

const customRender = (ui: ReactElement) => render(
  <Provider store={store}>
    {ui}
  </Provider>
)

describe('Search Input', () => {
  it('should display beat-loader when the data is being fetched', () => {
    customRender(<SearchInput defaultCityName='Tokyo' />)

    expect(screen.getByTestId('beat-loader')).toBeInTheDocument()
  })

  it('should not display dropdown when the data is being fetched', () => {
    customRender(<SearchInput defaultCityName='Tokyo' />)

    expect(screen.queryByTestId('search-input-city-dropdown')).not.toBeInTheDocument()
    expect(screen.queryByTestId('search-input-city-dropdown-item-0')).not.toBeInTheDocument()
  })

  it('should display dropdown when the cities data is fetched', () => {
    useGeocodingMockData.geocodingResult = mockGeocodingResult
    useGeocodingMockData.isLoading = false

    customRender(<SearchInput defaultCityName='Tokyo' />)

    expect(screen.getByTestId('search-input-city-dropdown')).toBeInTheDocument()
    expect(screen.getByTestId('search-input-city-dropdown-item-0')).toBeInTheDocument()
    expect(screen.getByTestId(`search-input-city-dropdown-item-${mockGeocodingResult.length - 1}`)).toBeInTheDocument()
    expect(screen.queryByTestId(`search-input-city-dropdown-item-${mockGeocodingResult.length}`)).not.toBeInTheDocument()
  })

  it('should hide dropdown when the outside area of the component is clicked', () => {
    useGeocodingMockData.geocodingResult = mockGeocodingResult
    useGeocodingMockData.isLoading = false

    customRender(<SearchInput defaultCityName='Tokyo' />)

    expect(screen.getByTestId('search-input-city-dropdown')).toBeInTheDocument()
    expect(screen.getByTestId('search-input-city-dropdown-item-0')).toBeInTheDocument()
    expect(screen.getByTestId(`search-input-city-dropdown-item-${mockGeocodingResult.length - 1}`)).toBeInTheDocument()

    // click outside of SearchInput
    fireEvent.click(document.body)

    expect(screen.queryByTestId('search-input-city-dropdown')).not.toBeInTheDocument()
    expect(screen.queryByTestId('search-input-city-dropdown-item-0')).not.toBeInTheDocument()
    expect(screen.queryByTestId(`search-input-city-dropdown-item-${mockGeocodingResult.length - 1}`)).not.toBeInTheDocument()
  })
})