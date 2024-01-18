import client from 'graphql/client'
import { GetPageBySlugQuery, GetPagesQuery } from 'graphql/generated/graphql'
import { GET_PAGES, GET_PAGE_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import PageTemplate, { PageTemplateProps } from 'templates/Pages'

export default function Page({ heading, body }: PageTemplateProps) {
  const router = useRouter()

  // return loading or anything
  if (router.isFallback) return null

  return <PageTemplate heading={heading} body={body} />
}

export async function getStaticPaths() {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 3 })

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return { notFound: true }

  return {
    revalidate: 60,
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}

// getStaticPaths => it's used to generate urls during build time
// getStaticProps => it's used to get data from page (props) during build time
// getServerSideProps => it's used to get data from page (props) during the runtime (all request), the bundle stay on server
// getInitialProps => it's used to get data from page (props) during the runtime (all request), the bundle comes to the client
