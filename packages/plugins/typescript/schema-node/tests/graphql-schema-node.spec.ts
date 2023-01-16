import '@graphql-codegen/testing';
import { codegen } from '@graphql-codegen/core';
import { parse } from 'graphql';
import { plugin } from '../src/index.js';

function generate({ schema }: { schema: string }) {
  return codegen({
    filename: 'graphql.ts',
    schema: parse(schema),
    documents: [],
    plugins: [
      {
        'schema-node': {},
      },
    ],
    config: {},
    pluginMap: {
      'schema-node': {
        plugin,
      },
    },
  });
}

describe('graphql-codegen typescript-graphql-document-nodes', () => {
  it('Should generate simple module with one file', async () => {
    const schema = /* GraphQL */ `
      type Query {
        allUsers: [User]
      }

      type User @key(fields: "id") {
        id: ID!
        name: String
        username: String
      }

      type Book {
        id: ID!
      }
    `;

    const content = await generate({
      schema,
    });

    expect(content).toBeSimilarStringTo(`
import gql from 'graphql-tag';
export default gql\`schema {
  query: Query
}

type Query {
  allUsers: [User]
}

type User @key(fields: "id") {
  id: ID!
  name: String
  username: String
}

type Book {
  id: ID!
}\`;
`);
  });
});
