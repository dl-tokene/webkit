import type { CodegenConfig } from '@graphql-codegen/cli'
import * as path from 'path'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    'https://thegraph.tokene.io/subgraphs/name/core',
    'https://thegraph.tokene.io/subgraphs/name/token-factory',
  ],
  documents: [path.resolve(__dirname, `./graphql/**/*.graphql`)],
  generates: {
    [`src/types/graphql/index.ts`]: {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-document-nodes',
      ],
    },
  },
}

export default config
