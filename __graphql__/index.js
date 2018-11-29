import "cross-fetch/polyfill";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
require("dotenv").config();
import { deleteAll } from "./delete";
// endpoint Squad 2

export const apolloClient = () => {
  const uri = process.env.GRAPHQL_ENDPOINT;

  let client = new ApolloClient({
    uri: uri
  });

  return client;
};

/**
 *
 * @param {*} client : apolloClient
 * @param {*} queryVariables : variables to pass to the apollo query call
 * @param {*} gqlEntityDesc : const { T, mutationParams, graphParams, returnFields } = gqlEntityDesc;
 * @param {*} filter : (filter: {name_not: "XAHAEI892381snjnsafd8ENX"})
 */
const getAll = async (client, queryVariables, gqlEntityDesc, filter = null) => {
  const { T, mutationParams, graphParams, returnFields } = gqlEntityDesc;
  filter = filter ? filter : ``; // (filter: {name_not: "Trump"})

  const getAllQuery = gql`
  {
    all${T}s ${filter}{
      ${returnFields}
    }
  }
`;

  let queryResults;
  await client
    .query({
      query: getAllQuery,
      variables: queryVariables
    })
    .then(result => {
      queryResults = result;
    });

  return queryResults;
};

/**
 *
 * @param {*} client : apolloClient
 * @param {*} queryVariables : variables to pass to the apollo query call
 * @param {*} gqlEntityDesc : const { T, mutationParams, graphParams, returnFields } = gqlEntityDesc;
 */
const createEntity = async (client, queryVariables, gqlEntityDesc) => {
  let id = null;

  const { T, mutationParams, graphParams, returnFields } = gqlEntityDesc;
  //console.log("T");
  const mutation = gql` 
      mutation Create${T}(${mutationParams}) {
        create${T}(${graphParams}) {
          ${returnFields}
        }
      }
  `;

  let ret = await client
    .mutate({
      mutation,
      variables: queryVariables
    })
    .then(result => {
      id = result.data[`create${T}`].id;
    })
    .catch(err => {
      console.log(`create${T} queryVariables: `, queryVariables);
    });

  return id;
};

/**
 *
 * @param {*} client : apolloClient
 * @param {*} queryVariables : variables to pass to the apollo query call
 * @param {*} gqlEntityDesc : const { T, mutationParams, graphParams, returnFields } = gqlEntityDesc;
 */
const updateEntity = async (client, queryVariables, gqlEntityDesc) => {
  const { T, mutationParams, graphParams, returnFields } = gqlEntityDesc;
  const mutation = gql` 
      mutation update${T}($id:ID!, ${mutationParams}) {
        update${T}(id:$id, ${graphParams}) {
          ${returnFields}
        }
      }
  `;
  let updatedEntity;
  let ret = await client
    .mutate({
      mutation,
      variables: queryVariables
    })
    .then(result => {
      updatedEntity = result.data[`update${T}`];
    })
    .catch(err => {
      console.log("updateEntity err: ", err);
    });

  return updatedEntity;
};

export default {
  apolloClient,
  getAll,
  createEntity,
  updateEntity,
  deleteAll
};
