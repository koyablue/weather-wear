import React, { ReactElement, ReactNode } from 'react'

import { render, screen , RenderOptions} from '@testing-library/react'
import '@testing-library/jest-dom'

import Main from '../../components/pages/main'

import { celsiusToClothingGuidelineScale, getClothingAdviceByClothingGuidelineScale } from '../../services/clothingGuidelineScale'

import { Provider } from 'react-redux'
import { store } from '../../stores/store'

// TODO: mock svg
// TODO: loading
// TODO: outside click
// TODO: dropdown

describe('Search Input', () => {
  it('TODO: testing', () => {})
})