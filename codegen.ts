import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api-ca-central-1.hygraph.com/v2/clrcwru7e231301w70l06tavv/master',
  documents: 'src/graphql/**',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
