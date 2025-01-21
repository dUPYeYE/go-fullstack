import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.API_URL}/graphql/query`,
  documents: "**/**.graphql", 
    generates: {
    "src/graphql/types/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        addTypename: "false",
      },
    },
  },
};

export default config;
