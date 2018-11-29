import typeInfos from "../types";
import { DEMO_SUFFIX } from "./constants";
import helper from "../index";

export const orgSeedDemo = async client => {
  let names = [
    "Temple SF",
    //"Temple Denver",
    "Insomniac",
    "Berkeley Rep Theatre",
    "XTX Street Teams",
    "Influencer, Inc"
  ];

  let ids = [];
  info = typeInfos.org;

  for (let name of names) {
    let vars = {
      ...info.variables,
      name: `${name} ${DEMO_SUFFIX}`
    };
    const id = await helper.createEntity(client, vars, info);
    ids.push(id);
  }
  return ids;
};

export const connectOrg = async (client, orgId, adminsIds, membersIds) => {
  info = typeInfos.org;

  let vars = {
    id: orgId,
    adminsIds,
    membersIds
  };

  const updatedEntity = await helper.updateEntity(client, vars, info);
  return updatedEntity;
};
