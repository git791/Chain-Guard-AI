import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

describe('Header Component', () => {
  it('renders the header title correctly', () => {
    render(<Header onRefresh={() => {}} onNewAlert={() => {}} />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    
    expect(heading).toHaveTextContent('Overview')
    
    // Check if the refresh button is formatted
    const refreshButton = screen.getByText('↻ Refresh')
    expect(refreshButton).toBeInTheDocument()
  })
})
