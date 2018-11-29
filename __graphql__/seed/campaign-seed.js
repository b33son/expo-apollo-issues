import typeInfos from "../types";
import { DEMO_SUFFIX } from "./constants";
import helper from "../index";

export const campaignSeedDemo = async client => {
  let createVars = [
    {
      name: `Benny Benassi - June 15th 2020`,
      startDateTime: "2018-01-15", //moment().add(365).format(),
      endDateTime: "2020-06-16" // moment().add(375)
    },
    {
      name: `Marshmello - July 19th 2020`,
      startDateTime: "2018-01-19", //moment().add(365).format(),
      endDateTime: "2020-06-19" // moment().add(375)
    },
    {
      name: `Chicago - August 21 2020`,
      startDateTime: "2018-01-21", //moment().add(365).format(),
      endDateTime: "2020-08-22" // moment().add(375)
    },
    {
      name: `Rave The River - August 29-31 2020`,
      startDateTime: "2018-01-29", //moment().add(365).format(),
      endDateTime: "2020-08-31" // moment().add(375)
    },
    {
      name: `EDC LV - May 15-18th 2020`,
      startDateTime: "2018-01-15", //moment().add(365).format(),
      endDateTime: "2020-05-18" // moment().add(375)
    },
    {
      name: `EDC NYC - July 20-21st 2020`,
      startDateTime: "2018-01-20", //moment().add(365).format(),
      endDateTime: "2020-07-21" // moment().add(375)
    },
    {
      name: `Ultra Miami - May 17-21 2020`,
      startDateTime: "2018-05-17", //moment().add(365).format(),
      endDateTime: "2020-05-21" // moment().add(375)
    }
  ];

  let ids = [];
  info = typeInfos.campaign;

  for (let v of createVars) {
    let vars = {
      ...info.variables,
      ...v,
      name: `${v.name} ${DEMO_SUFFIX}`
    };
    const id = await helper.createEntity(client, vars, info);
    ids.push(id);
  }
  return ids;
};

export const connectCampaign = async (
  client,
  campaignId,
  orgsIds,
  leadsIds,
  membersIds
) => {
  info = typeInfos.campaign;

  let vars = {
    id: campaignId,
    orgsIds,
    leadsIds,
    membersIds
  };

  const updatedEntity = await helper.updateEntity(client, vars, info);
  return updatedEntity;
};
