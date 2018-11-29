import moment from "moment";
import helper from "../../__graphql__";
import Org from "../../__graphql__/types/org";
require("dotenv").config();

const typeInfo = new Org();
let client;

describe("App snapshot", () => {
  beforeAll(async () => {
    client = helper.apolloClient();
    await helper.deleteAll(
      client,
      typeInfo.T,
      `(filter: {name_starts_with: "${typeInfo.variables.name}"})`
    );
  });

  beforeEach(() => {});

  ///
  ///

  it(`does query Get ALL ${typeInfo.T}`, async () => {
    // console.log(`Does query all${T}`);
    const ret = await helper.getAll(client, typeInfo.variables, typeInfo);

    expect(ret).toBeTruthy();
  });

  ///
  ///

  it(`does Mutation: Create ${typeInfo.T}`, async () => {
    // console.log(`does Mutation: create${T}`);
    const id = await helper.createEntity(client, typeInfo.variables, typeInfo);

    const searchResults = await helper.getAll(
      client,
      typeInfo.variables,
      typeInfo,
      `(filter: {id: "${id}"})`
    );

    expect(id).toEqual(searchResults.data[`all${typeInfo.T}s`][0].id);
  });

  ///
  ///

  it(`does Mutation: Update ${typeInfo.T}`, async () => {
    // console.log(`does Mutation: create${T}`);

    const id = await helper.createEntity(client, typeInfo.variables, typeInfo);

    // Needed because graphql adds __typename: T to return result
    // Plus we also will have the d
    let newValues = {
      ...typeInfo.variables,
      ...typeInfo.variablesUpdateValues,
      __typename: typeInfo.T,
      admins: [],
      members: [],
      id
    };

    const updatedEntity = await helper.updateEntity(
      client,
      newValues,
      typeInfo
    );
    expect(updatedEntity).toEqual(newValues);
  });
});
