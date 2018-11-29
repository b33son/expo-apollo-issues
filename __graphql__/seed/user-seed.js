import typeInfos from "../types";
import { DEMO_SUFFIX } from "./constants";
import helper from "../index";

export const userSeedDemo = async client => {
  let userFirstNames = [
    "Mark",
    "Jason",
    "Janet",
    "Erica",
    "Mike",
    "David",
    "Larry",
    "Frank",
    "Edward",
    "Jordan",
    "Leo",
    "Sara"
  ];

  let ids = [];
  info = typeInfos.user;
  let i = 2;
  for (let name of userFirstNames) {
    i++;
    let vars = {
      ...info.variables,
      name: `${name} ${DEMO_SUFFIX}`,
      fullName: `${name} ${DEMO_SUFFIX}`,
      authProvider: {
        email: {
          email: `${name}@email.com`,
          password: "test"
        }
      },
      //password: `${name}password1234 ${DEMO_SUFFIX}`,
      phone: `${(i + 4) % 6}${(i + 6) % 9}9-${(i + 5) % 9}${i % 9}2-${(i + 7) %
        9}310`,
      //email: `${name}@email.com`,
      facebookUrl: `http://facebook.com/${name}`,
      twitterUrl: `http://twitter.com/${name}`,
      snapchatUrl: `http://snapchat.com/${name}`,
      instagramUrl: `http://snapchat.com/${name}`,
      orgs: [],
      orgsAsAdmin: [],
      campaigns: [],
      campaignsAsLead: []
    };
    const id = await helper.createEntity(client, vars, info);
    ids.push(id);
  }
  return ids;
};
