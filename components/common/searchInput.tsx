import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'

import BeatLoader from './loaders/beatLoader'

// hooks
import { useToggle } from '../../hooks/useToggle'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useGeocoding } from '../../hooks/data/useGeocoding'
import { useValidateBooleanArray } from '../../hooks/useValidateBooleanArray'

// types
import { GeocodingApiResponseItem } from '../../types/geocoding'

// redux
import { useAppDispatch } from '../../stores/hooks'
import { updateCityData } from '../../stores/slices/cityNameSearchInputSlice'

const ContainerDiv = styled.div`
  position: relative;
`

const Input = styled.input<{ isOnlyTopCornersRounded: boolean }>`
  width: 300px;
  height: 30px;
  padding: 10px;
  /* font-family: 'Nunito'; */
  letter-spacing: 1.5px;
  font-size: 14px;
  border: none;
  color: #868686;
  border-radius: ${props => (props.isOnlyTopCornersRounded ? '10px 10px 0 0' : '30px')};
  :focus {
    outline: none;
  }
`

const SearchIconContainerDiv = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  border-radius: 30%;
  :active {
    background-color: #f1f2f3;
  }
`

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  color: #868686;
  cursor: pointer;
`

const DropdownUl = styled.ul`
  position: absolute;
  top: 30px;
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  background-color: #ffffff;
  border: none;
  padding: 0;
  margin: 0;
  list-style-type: none;
  border-radius: 0 0 10px 10px;
`

const OptionLi = styled.li`
  padding: 10px;
  color: #868686;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`
type Props = {
  defaultCityName: string
}

/**
 * Search input
 * Get a list of cities by the input value
 *
 * @return {*} JSX.Element
 */
const SearchInput = ({ defaultCityName }: Props) => {
  const dispatch = useAppDispatch()

  // state for input value
  const [cityNameInputVal, setCityNameInputVal] = useState(defaultCityName)
  // state for geocoding API call(to get values for drop down options)
  const [cityNameToSearch, setCityNameToSearch] = useState('')

  const { toggleState: showDropdown, setToggleState: setShowDropdown } = useToggle()

  // ref to control open/close dropdown when the outside of the dropdown is clicked
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => { setShowDropdown(false) })

  const { hasTrueValue, castAllValuesBoolean } = useValidateBooleanArray()

  // Get cities by input value
  const {
    geocodingResult,
    error: geocodingError,
    isLoading: isGeocodingLoading,
    isValidating: isGeocodingValidating,
  } = useGeocoding(
    { cityName: cityNameToSearch },
    5,
    {
      revalidateOnFocus: false,
      onErrorRetry(err, key, config, revalidate, revalidateOpts) {
        if (revalidateOpts.retryCount >= 5) return
      },
    }
  )

  const isLoading = hasTrueValue([isGeocodingLoading, isGeocodingValidating])

  const isError = hasTrueValue(castAllValuesBoolean([geocodingError]))

  /**
   * Manage input value
   * Close dropdown if it is open
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showDropdown) {
      setShowDropdown(false)
    }
    setCityNameInputVal(e.target.value)
  }

  /**
   * Triggers search
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if the input value is empty
    if (!cityNameInputVal) return

    const trimmedCityName = cityNameInputVal.replace(/\s/g, "")
    setCityNameToSearch(trimmedCityName) // triggers data fetching

    if (geocodingResult?.length) setShowDropdown(true)
  }

  /**
   * Select one of the city in the dropdown
   *
   * @param {GeocodingApiResponseItem} city
   */
  const handleOptionClick = (city: GeocodingApiResponseItem) => {
    setCityNameInputVal(city.name)
    setShowDropdown(false)
    dispatch(updateCityData({name: city.name, lat: city.lat, lon: city.lon}))
  }

  /**
   * Returns string for key prop of dropdown item
   *
   * @param {GeocodingApiResponseItem} city
   */
  const formatOptionKey = (city: GeocodingApiResponseItem) => (
    `${city.name}${city.country}${city.state || ''}${city.lat}${city.lon}`
  )

  /**
   * Returns string for display name of dropdown item
   *
   * @param {GeocodingApiResponseItem} city
   */
  const formatOptionLabel = (city: GeocodingApiResponseItem) => (
    `${city.name}, ${city.country} ${city.state || ''}`
  )

  useEffect(() => {
    if (geocodingResult &&  geocodingResult.length !== 0 && !isLoading) {
      setShowDropdown(true)
    }
  }, [geocodingResult, isLoading])

  useEffect(() => {
    setCityNameInputVal(defaultCityName || cityNameToSearch)
  }, [defaultCityName])

  return (
    <ContainerDiv ref={dropdownRef}>
      <form onSubmit={handleSearch}>
        <Input
          type='text'
          placeholder='City name'
          value={cityNameInputVal}
          onChange={handleInputChange}
          isOnlyTopCornersRounded={showDropdown && geocodingResult?.length && !isLoading}
        />
        <SearchIconContainerDiv>
          <SearchButton type='submit'>
            {isLoading ? <BeatLoader size={5} data-testid='beat-loader' /> : <FiSearch data-testid='search-input-search-icon' />}
          </SearchButton>
        </SearchIconContainerDiv>
      </form>
      {showDropdown && geocodingResult?.length && !isLoading &&(
        <DropdownUl data-testid='search-input-city-dropdown'>
          {geocodingResult.map((city, idx) => (
            <OptionLi
              key={formatOptionKey(city)}
              onClick={() => handleOptionClick(city)}
              data-testid={`search-input-city-dropdown-item-${idx}`}
            >
              {formatOptionLabel(city)}
            </OptionLi>
          ))}
        </DropdownUl>
      )}
    </ContainerDiv>
  )
}

export default SearchInput

