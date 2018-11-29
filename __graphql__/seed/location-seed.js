import typeInfos from "../types";
import { DEMO_SUFFIX } from "./constants";
import helper from "../index";

export const locationSeedDemo = async client => {
  // $name: String,
  // $long: String,
  // $lat: String,
  // $postId:ID,
  let createVars = [
    {
      name: "North Main Street, Walnut Creek",
      lat: "37.927830",
      long: "-122.061819"
    },
    {
      name: "Miami, Fl",
      lat: "25.761681",
      long: "-80.191788"
    },
    {
      name: "Denver, CO",
      lat: "39.739235",
      long: "-104.990250"
    },
    {
      name: "Haight St, San Francisco, CA",
      lat: "37.770160",
      long: "-122.445816"
    },
    {
      name: "Los Angeles, CA",
      lat: "34.052235",
      long: "-118.243683"
    },
    {
      name: "Bronx, NY",
      lat: "40.826150",
      long: "-73.920270"
    },
    {
      name: "Berkeley, CA",
      lat: "37.871593",
      long: "-122.272743"
    },
    {
      name: "Telegraph Ave, Berkeley, CA",
      lat: "37.860670",
      long: "-122.259100"
    },
    {
      name: "Shattuck Ave, Berkeley, CA",
      lat: "37.870680",
      long: "-122.268230"
    },
    {
      name: "University Ave, Berkeley, CA",
      lat: "37.866430",
      long: "-122.305100"
    }
  ];

  let ids = [];
  info = typeInfos.location;

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

export const connectPost = async (client, locationId, postId) => {
  info = typeInfos.location;

  let vars = {
    id: locationId,
    postId
  };

  const updatedEntity = await helper.updateEntity(client, vars, info);
  return updatedEntity;
};
