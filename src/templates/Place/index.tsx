import Image from 'next/image'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import LinkWrapper from 'components/LinkWrapper'

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import * as S from './styles'

type ImageProps = {
  url: string
  height: number
  width: number
}

export type PlaceTemplateProps = {
  place: {
    slug: string
    name: string
    description?: {
      html: string
      text: string
    }
    gallery: ImageProps[]
  }
}

export default function PlacesTemplate({ place }: PlaceTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  // console.log('place', place)

  return (
    <>
       <NextSeo
        title={`${place.name} - My Trips`}
        description={
          place.description?.text ||
          'A simple project to show you the places that I would like to visit.'
        }
        canonical="'https://my-trips-dream.brunolima.com"
        openGraph={{
          url: 'https://my-trips-dream.brunolima.comm',
          title: `${place.name} - My Trips`,
          description:
            place.description?.text ||
            'A simple project to show you the places that I would like to visit.',
          images: [
            {
              url: place.gallery[0].url,
              width: place.gallery[0].width,
              height: place.gallery[0].height,
              alt: `${place.name}`
            }
          ]
        }}
      />
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>{place.name}</S.Heading>

          <S.Body dangerouslySetInnerHTML={{ __html: place.description?.html || '' }} />
          
          <S.Gallery>
          {place.gallery.map((image, index) => (
            <Image key={`photo-${index}`} src={image.url} alt={place.name} width={1000} height={600} quality={75}/>
          ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  )
}
