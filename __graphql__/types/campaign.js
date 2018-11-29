import GqlEntityDesc from "./gql-entity-desc";
// type Campaign @model {
//   endDateTime: DateTime
//   id: ID! @isUnique
//   name: String!
//   startDateTime: DateTime
//   leads: [User!]! @relation(name: "UserCampLead")
//   members: [User!]! @relation(name: "UserCampMember")
//   orgs: [Org!]! @relation(name: "OrgCampaign")
// }

// mutation updateCampaign($orgIds: [ID!], $leadIds:[ID!], $memberIds:[ID!]) {
//   updateCampaign(
//     id: "cjp0eoa8x0ujl0122yutfi4of"
//     orgsIds: $orgIds, leadsIds:$leadIds, membersIds:$memberIds
//   ) {
//     id
//     orgs {
//       name
//     }
//     leads{
//       fullName
//     }
//     members {
//       fullName
//     }
//   }
// }

const T = "Campaign";

const mutationParams = `
$name: String, 
$startDateTime: DateTime, 
$endDateTime: DateTime, 
$orgsIds: [ID!], 
$leadsIds:[ID!], 
$membersIds:[ID!]
`;

const graphParams = `
name: $name, 
startDateTime: $startDateTime, 
endDateTime: $endDateTime, 
orgsIds: $orgsIds, 
leadsIds: $leadsIds, 
membersIds: $membersIds
`;

const returnFields = `
        id
        name
        
        leads {
            fullName
        }
        members {
            fullName
        }
        orgs {
          name
        }
`;

let variables = {
  name: `Test ${T}` // required
  // leads: [],
  // members: []
  // orgIds: []
  // startDateTime: "2020-05-01", //moment().add(365).format(),
  // endDateTime: "2020-07-01" // moment().add(375)
};

// Used for testing. Add values here to be updated in test
let variablesUpdateValues = {
  ...variables,
  name: `${variables.name} updated`
};

class Campaign extends GqlEntityDesc {
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

export default Campaign;
