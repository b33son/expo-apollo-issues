import GqlEntityDesc from "./gql-entity-desc";
// type Org @model {
//   id: ID! @isUnique
//   name: String!
//   admins: [User!]! @relation(name: "UserOrgAdmin")
//   members: [User!]! @relation(name: "UserOrgMember")
// }

// mutation updateOrg($adminsIds: [ID!], $membersIds:[ID!]) {
//   updateOrg(
//     id: "cjp0eoa8x0ujl0122yutfi4of"
//     adminsIds: $adminsIds, membersIds:$membersIds
//   ) {
//     id
//     admins {
//       name
//     }
//     members {
//       fullName
//     }
//   }
// }

const T = "Org";

//const mutationParams = "$fullName: String!, $password: String";
//const graphParams = "fullName: $fullName, password: $password";

const mutationParams = "$name: String, $adminsIds: [ID!], $membersIds:[ID!]";
const graphParams =
  "name: $name, adminsIds: $adminsIds, membersIds:$membersIds";
const returnFields = `
id
name
admins {
  fullName
}
members {
  fullName
}
`;

let params = {
  T,
  mutationParams,
  graphParams,
  returnFields
};

let variables = {
  name: `Test ${T} `
  // admins: [],
  // members: []
};

let variablesUpdateValues = {
  ...variables,
  name: `Test ${T} updated`
  // admins: [],
  // members: []
};

class Org extends GqlEntityDesc {
  constructor() {
    super(
      T,
      mutationParams,
      graphParams,
      returnFields,
      variables,
      variablesUpdateValues
    );
  }
}

export default Org;

// export default {
//   T,
//   mutationParams,
//   graphParams,
//   returnFields,
//   variables,
//   variablesUpdateValues
// };
