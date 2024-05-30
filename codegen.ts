
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "app/javascript/graphql/schema.graphql",
  documents: "app/javascript/**/*.{ts,tsx}",
  generates: {
    "app/javascript/graphql/types/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
