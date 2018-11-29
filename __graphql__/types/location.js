import GqlEntityDesc from "./gql-entity-desc";

// type Location @model {
//     createdAt: DateTime!
//     updatedAt: DateTime!
//     id: ID! @isUnique
//     name: String
//     long: String
//     lat: String
//     post: Post @relation(name: "PostLocation")
//   }

const T = "Location";

//const mutationParams = "$fullName: String!, $password: String";
//const graphParams = "fullName: $fullName, password: $password";

const mutationParams = ` 
    $name: String, 
    $long: String,
    $lat: String,
    $postId:ID, 
`;

const graphParams = `
    name: $name, 
    lat: $lat,
    long: $long,
    postId: $postId, 
`;

const returnFields = `
    id,
    name,
    lat,
    long
    post{
        id
    }, 
`;

let params = {
  T,
  mutationParams,
  graphParams,
  returnFields
};

let variables = {
  name: `Test Los Angeles, CA ${T} `,
  lat: "34.0522",
  long: "118.2437"
};

let variablesUpdateValues = {
  ...variables,
  name: `Test Miami, Fl ${T} `,
  lat: "25.7617",
  long: "118.243780.1918"
};

class Location extends GqlEntityDesc {
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

export default Location;
