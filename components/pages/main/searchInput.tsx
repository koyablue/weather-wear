import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { FiSearch } from 'react-icons/fi'

import { useToggle } from '../../../hooks/useToggle'
import { useGeocoding } from '../../../hooks/data/useGeocoding'
import { useValidateBooleanArray } from '../../../hooks/useValidateBooleanArray'
import BeatLoader from '../../common/loaders/beatLoader'
import { GeocodingApiResponseItem } from '../../../types/geocoding'

const Container = styled.div`
  position: relative;
`

const Input = styled.input<{ showDropdown: boolean }>`
  width: 300px;
  height: 30px;
  padding: 10px;
  font-size: 16px;
  border: none;
  color: #868686;
  border-radius: ${props => (props.showDropdown ? '10px 10px 0 0' : '30px')};
  :focus {
    outline: none;
  }
`

const SearchIconContainer = styled.div`
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

const Dropdown = styled.ul`
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

const Option = styled.li`
  padding: 10px;
  color: #868686;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`

const SearchDropdown = () => {
  const [cityName, setCityName] = useState('')
  const [cityNameToSearch, setCityNameToSearch] = useState('')
  const [cities, setCities] = useState<string[]>([])

  const { toggleState: showDropdown, setToggleState: setShowDropdown } = useToggle(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const { hasTrueValue } = useValidateBooleanArray()

  const {
    geocodingResult,
    error,
    isLoading: isGeocodingLoading,
    isValidating: isGeocodingValidating,
  } = useGeocoding(
    { cityName: cityNameToSearch },
    5,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  )

  const isLoading = hasTrueValue([isGeocodingLoading, isGeocodingValidating])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showDropdown) setShowDropdown(false)
    setCityName(e.target.value)
  }

  const handleOptionClick = (option: string) => {
    setCityName(option)
    setShowDropdown(false)
  }

  const handleSearch = () => {
    setCityNameToSearch(cityName)
    setShowDropdown(true)
  }

  /**
   * Close dropdown when the outside of the dropdown area is clicked
   *
   * @param {MouseEvent} e
   */
  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false)
    }
  }

  // TODO: API call when search icon clicked -> show drop down
  // TODO: dropdown select -> API call to get weather

  // onClick -> search -> result -> show dropdown
  // show dropdown if (result && !isLoading)

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [])

  useEffect(() => {
    if (geocodingResult) {
      setCities(geocodingResult.map(city => `${city.name}, ${city.country} ${city.state || ''}`))
    }
  }, [geocodingResult])

  return (
    <Container ref={dropdownRef}>
      <Input
        type="text"
        placeholder="Search"
        value={cityName}
        onChange={handleInputChange}
        showDropdown={showDropdown}
      />
      <SearchIconContainer onClick={handleSearch}>
        <SearchButton>
          {isLoading ? <BeatLoader size={5} /> : <FiSearch />}
        </SearchButton>
      </SearchIconContainer>
      {showDropdown && cities &&(
        <Dropdown>
          {cities.map(city => (
            <Option key={city} onClick={() => handleOptionClick(city)}>
              {city}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  )
}

export default SearchDropdown

