import React, { useState } from 'react'
import styled from 'styled-components'

import { FiSearch } from 'react-icons/fi'

import { useToggle } from '../../../hooks/useToggle'

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

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
]

// SearchDropdown component
const SearchDropdown: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { toggleState: showDropdown, setToggleState: setShowDropdown } = useToggle(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleOptionClick = (option: string) => {
    setSearchTerm(option)
    setShowDropdown(false)
  }

  const handleSearch = () => {
    // Perform search process here
    setShowDropdown(true)
    console.log('Search term:', searchTerm)
  }

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // TODO: API call when search icon clicked -> show drop down
  // TODO: dropdown select -> API call to get weather

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        showDropdown={showDropdown}
      />
      <SearchIconContainer onClick={handleSearch}>
        <SearchButton>
          <FiSearch />
        </SearchButton>
      </SearchIconContainer>
      {showDropdown && (
        <Dropdown>
          {filteredOptions.map(option => (
            <Option key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  )
}

export default SearchDropdown

