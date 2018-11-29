import GqlEntityDesc from "./gql-entity-desc";
// type User @model {
//   createdAt: DateTime!
//   updatedAt: DateTime!
//   id: ID! @isUnique
//   fullName: String
//   password: String
//   phone: String
//   email: String
//   facebookUrl: String
//   instagramUrl: String
//   twitterUrl: String
//   snapchatUrl: String
//   orgs: [Org!]! @relation(name: "UserOrgMember")
//   orgsAsAdmin: [Org!]! @relation(name: "UserOrgAdmin")
//   campaigns: [Campaign!]! @relation(name: "UserCampMember")
//   campaignsAsLead: [Campaign!]! @relation(name: "UserCampLead")
// }

const T = "User";

//const mutationParams = "$fullName: String!, $password: String";
//const graphParams = "fullName: $fullName, password: $password";

const mutationParams = `
$name: String, 
$fullName: String, 
$authProvider:AuthProviderSignupData!
$phone: String,  
$facebookUrl: String, 
$instagramUrl: String, 
$twitterUrl: String, 
$snapchatUrl: String
`;

const graphParams = `
name: $name, 
fullName: $fullName,  
authProvider:$authProvider,
phone: $phone,
facebookUrl: $facebookUrl, 
instagramUrl: $instagramUrl, 
twitterUrl: $twitterUrl, 
snapchatUrl: $snapchatUrl
`;
const returnFields = `
id
name
fullName
phone
facebookUrl
twitterUrl
snapchatUrl
orgs {
  name
}
orgsAsAdmin {
  name
}
campaigns {
  name
}
campaignsAsLead {
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
  name: `Test ${T} `,
  fullName: `Test ${T} `,
  authProvider: {
    email: {
      email: `${T}${Math.floor(Math.random() * 2020321)}@email.com`,
      password: "test"
    }
  },
  phone: "949-232-2110",

  facebookUrl: "http://facebook.com",
  twitterUrl: "http://twitter.com",
  snapchatUrl: "http://snapchat.com",
  orgs: [],
  orgsAsAdmin: [],
  campaigns: [],
  campaignsAsLead: []
  // startDateTime: "2020-05-01", //moment().add(365).format(),
  // endDateTime: "2020-07-01" // moment().add(375)
};

let variablesUpdateValues = {
  ...variables,
  name: `Test ${T} `,
  fullName: `Test Updated ${T} `,
  password: "password updated",
  phone: "949-232-2110 x5012",
  email: "updated_super_email@email.com",
  facebookUrl: "http://facebook.com/updated",
  twitterUrl: "http://twitter.com/updated",
  snapchatUrl: "http://snapchat.com/updated",
  orgs: [],
  orgsAsAdmin: [],
  campaigns: [],
  campaignsAsLead: []
};

class User extends GqlEntityDesc {
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

export default User;
