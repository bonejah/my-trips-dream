import LinkWrapper from 'components/LinkWrapper'
import dynamic from 'next/dynamic'
import { InfoOutline } from '@styled-icons/evaicons-outline/InfoOutline'
import { MapProps } from 'components/Map'

import { NextSeo } from 'next-seo'

const Map = dynamic(() => import('components/Map'), { ssr: false })

export default function HomeTemplate({ places }: MapProps) {
  return (
    <>
      <NextSeo 
        title='My Trips Dream'
        description='A simple project to show you the places that I would like to visit.'
        canonical='https://my-trips-dream.brunolima.com'
        openGraph={{
          url: 'https://my-trips-dream.brunolima.com',
          title: 'My Trips Dream',
          description: 'A simple project to show you the places that I would like to visit.',
          images: [
            {
              url: 'https://my-trips-dream.brunolima.com/img/cover.png',
              width: 1280,
              height: 720,
              alt: 'My Trips Dream'
            }
          ],
          siteName: 'My Trips Dream'
        }}
      />
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      {/* @ts-expect-error Server Component */}
      <Map places={places} />
    </>
  )
}
