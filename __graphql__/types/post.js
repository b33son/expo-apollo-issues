import GqlEntityDesc from "./gql-entity-desc";
// type Post @model {
//     createdAt: DateTime!
//     updatedAt: DateTime!
//     id: ID! @isUnique
//     name: String
//     caption: String
//     owner: User! @relation(name: "UserPost")
//     campaign: Campaign @relation(name: "CampaignPost")
//     medias: [Media!]! @relation(name: "PostMedia")
//     location: Location @relation(name: "PostLocation")
//   }

const T = "Post";

//const mutationParams = "$fullName: String!, $password: String";
//const graphParams = "fullName: $fullName, password: $password";

const mutationParams = ` 
$name: String, 
$caption:String,
$ownerId: ID, 
$campaignId:ID,
$mediasIds:[ID!],
$locationId:ID,
`;

const graphParams = `
name: $name, 
caption: $caption,
ownerId: $ownerId, 
campaignId:$campaignId,
mediasIds:$mediasIds,
locationId:$locationId
`;

const returnFields = `
id,
name,
caption,
campaign{
  name
}, 
owner{
  name
},
medias{
  name
},
location{
  name
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

class Post extends GqlEntityDesc {
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

export default Post;
