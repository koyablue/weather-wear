import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'

import BeatLoader from '../../common/loaders/beatLoader'

// hooks
import { useToggle } from '../../../hooks/useToggle'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { useGeocoding } from '../../../hooks/data/useGeocoding'
import { useValidateBooleanArray } from '../../../hooks/useValidateBooleanArray'

// types
import { Coordinate } from '.'
import { GeocodingApiResponseItem } from '../../../types/geocoding'

const ContainerDiv = styled.div`
  position: relative;
`

const Input = styled.input<{ showDropdown: boolean }>`
  width: 300px;
  height: 30px;
  padding: 10px;
  font-family: 'Nunito';
  letter-spacing: 1.5px;
  font-size: 14px;
  border: none;
  color: #868686;
  border-radius: ${props => (props.showDropdown ? '10px 10px 0 0' : '30px')};
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
  defaultCityData: {
    name: string
    lat: number
    lon: number
  }
  // state update function to trigger refetch data in Main component
  setCoordinate: Dispatch<SetStateAction<Coordinate>>
  // state update function to set a flag to tell if the content of Main component is based on user's location or searched value
  setDisplayBySearched: Dispatch<SetStateAction<boolean>>
}

/**
 * Search input
 * Get a list of cities by the input value
 *
 * @return {*} JSX.Element
 */
const SearchInput = ({ defaultCityData, setCoordinate, setDisplayBySearched }: Props) => {
  // state for input
  const [cityName, setCityName] = useState(defaultCityData.name)
  // state for API call
  const [cityNameToSearch, setCityNameToSearch] = useState('')
  // state for dropdown options
  const [cities, setCities] = useState<GeocodingApiResponseItem[]>([])

  // ref to control open/close dropdown when the outside of the dropdown is clicked
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => { setShowDropdown(false) })

  const { hasTrueValue, castAllValuesBoolean } = useValidateBooleanArray()

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

  const { toggleState: showDropdown, setToggleState: setShowDropdown } = useToggle(Boolean(geocodingResult))

  const isLoading = hasTrueValue([isGeocodingLoading, isGeocodingValidating])
  const isError = hasTrueValue(castAllValuesBoolean([geocodingError]))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showDropdown) setShowDropdown(false)
    setCityName(e.target.value)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!cityName) {
      setCoordinate({ lat: defaultCityData.lat, lon: defaultCityData.lon })
      setDisplayBySearched(false)
      return
    }

    const trimmedCityName = cityName.replace(/\s/g, "")
    setCityNameToSearch(trimmedCityName)
    setShowDropdown(true)
  }

  const handleOptionClick = (city: GeocodingApiResponseItem) => {
    setCityName(city.name)
    setShowDropdown(false)
    // update state to refetch currentWeather data in Main component
    setCoordinate({ lat: city.lat, lon: city.lon })
    // set a flag to tell if the content of Main component is based on user's location or searched value
    setDisplayBySearched(true)
  }

  const formatOptionKey = (city: GeocodingApiResponseItem) => (
    `${city.name}${city.country}${city.state || ''}${city.lat}${city.lon}`
  )

  const formatOptionLabel = (city: GeocodingApiResponseItem) => (
    `${city.name}, ${city.country} ${city.state || ''}`
  )

  useEffect(() => {
    if (geocodingResult) {
      setCities(geocodingResult)
      setShowDropdown(true)
    }
  }, [geocodingResult])

  useEffect(() => {
    setCityName(defaultCityData.name)
  }, [defaultCityData])

  return (
    <ContainerDiv ref={dropdownRef}>
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Search"
          value={cityName}
          onChange={handleInputChange}
          showDropdown={showDropdown}
        />
        <SearchIconContainerDiv>
          <SearchButton type='submit'>
            {isLoading ? <BeatLoader size={5} /> : <FiSearch />}
          </SearchButton>
        </SearchIconContainerDiv>
      </form>
      {showDropdown && cities &&(
        <DropdownUl>
          {cities.map(city => (
            <OptionLi key={formatOptionKey(city)} onClick={() => handleOptionClick(city)}>
              {formatOptionLabel(city)}
            </OptionLi>
          ))}
        </DropdownUl>
      )}
    </ContainerDiv>
  )
}

export default SearchInput

