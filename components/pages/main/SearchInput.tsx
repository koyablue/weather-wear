import React, { useState } from 'react'
import styled from 'styled-components'

import { useToggle } from '../../../hooks/useToggle';

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
    setShowDropdown(true)
  };

  const handleOptionClick = (option: string) => {
    setSearchTerm(option)
    setShowDropdown(false)
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // TODO: API call

  // TODO: Make Option based on API call result

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        showDropdown={showDropdown}
      />
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
