import "cross-fetch/polyfill";
import gql from "graphql-tag";
require("dotenv").config();

const toIds = array => array.map(e => e.id);

/**
 *
 * @param {*} client : An ApolloClient object
 * @param {*} graphqlTypeName : The type name / table name to delete items from
 * @param {*} filter : graphql filter statement. Ex: (filter: {name_starts_with: "Test"})
 */
export async function deleteAll(client, graphqlTypeName, filter = null) {
  const T = graphqlTypeName;
  // console.log(`deleteAll: ALL ${T}s`);
  filter = filter ? filter : ``;

  const getAllQuery = gql`
  {
    all${T}s ${filter}{
      id
    }
  }
`;

  // GET ALL USER IDs
  const res = await client
    .query({
      query: getAllQuery
    })
    .then(result => {
      return result;
    });

  const ids = toIds(res[`data`][`all${T}s`]);
  // GET ALL USER IDs

  console.log(`Deleting the following ids from ${T} (${ids.length}): `, ids);
  // DELETE
  await Promise.all(
    ids.map(id => {
      const mutation = gql`
        mutation Delete${T}($id: ID!) {
          delete${T}(id: $id) {
            id
          }
        }
      `;
      const variables = {
        id
      };

      return client
        .mutate({ mutation, variables })
        .then(() => {
          // console.log("Sucessful delete: ", id);
        })
        .catch(err => {
          // console.log(
          //   "err",
          //   "Delete script tried to delete an object that wasn't there."
          // );
        });
    })
  );
  // DELETE

  // await Promise.all([
  //   //detroyAllDataIn('Post'),
  //   detroyAllDataIn("User")
  //   // Add more
  // ]);
}
