import GqlEntityDesc from "./gql-entity-desc";

// type Media @model {
//   createdAt: DateTime!
//   updatedAt: DateTime!
//   id: ID! @isUnique
//   name: String
//   post: Post @relation(name: "PostMedia")
//   contentType: String!
//   size: Int
//   url: String!
// }

const T = "Media";

//const mutationParams = "$fullName: String!, $password: String";
//const graphParams = "fullName: $fullName, password: $password";

const mutationParams = ` 
    $name: String, 
    $postId:ID,
    $contentType: String!, 
    $size:Int!,
    $url:String!, 
`;

const graphParams = `
    name: $name, 
    postId: $postId,
    contentType: $contentType,  
    size:$size,
    url:$url
`;

const returnFields = `
    id,
    name,
    post{
        id
    },
    contentType,
    size,
    url,
`;

let params = {
  T,
  mutationParams,
  graphParams,
  returnFields
};

let variables = {
  name: `Test ${T} `,
  contentType: "image",
  size: 1050,
  url: "https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_1280.jpg"
  // admins: [],
  // members: []
};

let variablesUpdateValues = {
  ...variables,
  name: `Test ${T} `,
  contentType: "image",
  size: 2910,
  url: "https://cdn.pixabay.com/photo/2015/01/07/15/51/woman-591576_1280.jpg"
  // admins: [],
  // members: []
};

class Media extends GqlEntityDesc {
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

export default Media;
