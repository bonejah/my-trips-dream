// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { GetPlacesQuery } from 'graphql/generated/graphql'
import client from 'graphql/client'
import { GET_PLACES } from 'graphql/queries'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES)

  const fields = places.map(({ slug }) => ({
    loc: `https://my-trips-dream.vercel.app/${slug}`
    // lastmod: new Date().toISOString()
  }))

  fields.push(
    {
      loc: 'https://my-trips-dream.vercel.app/'
      // lastmod: new Date().toISOString()
    },
    {
      loc: 'https://my-trips-dream.vercel.app/about'
      // lastmod: new Date().toISOString()
    }
  )

  const urls = fields.map(f => f.loc)
  

  return getServerSideSitemapIndexLegacy(ctx, urls)
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
