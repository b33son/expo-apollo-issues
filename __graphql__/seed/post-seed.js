import typeInfos from "../types";
import { DEMO_SUFFIX } from "./constants";
import helper from "../index";

export const postSeedDemo = async client => {
  // name: $name,
  // caption: $caption,
  // ownerId: $ownerId,
  // campaignId:$campaignId,
  // mediasIds:$mediasIds,
  // locationId:$locationId
  let createVars = [
    {
      name: "Post",
      caption: "promoting down main street"
    },
    {
      name: "Post",
      caption: "promoting art basel Miami"
    },
    {
      name: "Post",
      caption: "Handed out flyers after Tiesto show in Denver"
    },
    {
      name: "Post",
      caption: "Did flyer run on Haight Street"
    },
    {
      name: "Post",
      caption: "Delivered flyers to Mark, Jamie, Ed and Randy"
    },
    {
      name: "Post",
      caption: "promoting down main street"
    },
    {
      name: "Post",
      caption: "hung posters near The Warf"
    },
    {
      name: "Post",
      caption: "postered by the mall and skate shop on Telegraph Ave"
    }
  ];

  let ids = [];
  info = typeInfos.post;

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

export const connectPost = async (
  client,
  postId,
  campaignId,
  mediasIds,
  locationId
) => {
  info = typeInfos.post;

  let vars = {
    id: postId,
    campaignId,
    mediasIds,
    locationId
  };

  const updatedEntity = await helper.updateEntity(client, vars, info);
  return updatedEntity;
};
