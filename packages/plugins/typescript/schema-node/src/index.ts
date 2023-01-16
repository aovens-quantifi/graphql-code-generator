import { PluginFunction, PluginValidateFn, Types } from '@graphql-codegen/plugin-helpers';
import { RawConfig } from '@graphql-codegen/visitor-plugin-common';
import { printSchemaWithDirectives } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

export const plugin: PluginFunction<RawConfig> = (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  _config: RawConfig
) => {
  const schemaString = printSchemaWithDirectives(schema, {});

  return {
    content: `import gql from 'graphql-tag';
export default gql\`${schemaString}\`;
`,
  };
};

export const validate: PluginValidateFn<any> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: any,
  outputFile: string
) => {
  if (!outputFile.endsWith('.ts')) {
    throw new Error(`Plugin "typescript-schema-node" requires extension to be ".ts"!`);
  }
};
