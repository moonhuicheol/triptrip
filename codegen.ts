import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://main-practice.codebootcamp.co.kr/graphql",
  documents: ["src/**/*.ts"],
  // documents: ["src/components/boards-write/queries.ts"],
  generates: {
    "./src/common/gql/": {
      preset: "client",
    },
  },
};
export default config;
