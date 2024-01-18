import { render, screen } from '@testing-library/react'

import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    {/* @ts-expect-error Server Component */}
    render(<Map />)

    //screen.logTestingPlaygroundURL()
    expect(
      screen.getByRole('link', {
        name: /openstreetmap/i
      })
    ).toBeInTheDocument()
  })

  it('should render with the marker in correct place', () => {
    const place = {
      id: '1',
      name: 'Petrópolis',
      slug: 'petropolis',
      location: {
        latitude: 0,
        longitude: 0
      }
    }
    {/* @ts-expect-error Server Component */}
    render(<Map places={[place]} />)

    expect(screen.getByTitle(/petrópolis/i)).toBeInTheDocument()
  })
})
