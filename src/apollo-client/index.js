/*
 * File: /Users/michaelbeeson/Documents/VSCode/squad-force/squad-app/src/apollo/index.js
 */

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

debugger;

const client = new ApolloClient({
  // Must change here and in .graphqlconfig.yml endpoints default
  uri: "https://api.graph.cool/simple/v1/cjoxtwhv8dp2t0175dmgovk0h"
});

console.log(client);

// client
//   .query({
//     query: gql`
//       {
//         User(id: "cjojjuobdtybo01168lzsjhts") {
//           id
//           name
//           camps {
//             id
//             name
//           }
//         }
//       }
//     `
//   })
//   .then(result => {
//     debugger;
//     console.log(result);
//   });
export default client;
