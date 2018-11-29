import "cross-fetch/polyfill";
import moment from "moment";
import helper from "../../__graphql__";
import Location from "../../__graphql__/types/location";
import Post from "../../__graphql__/types/post";
import User from "../../__graphql__/types/user";
require("dotenv").config();

const location = new Location();
const post = new Post();
const user = new User();

let client;

describe("App snapshot", () => {
  beforeAll(async () => {
    client = helper.apolloClient();

    await helper.deleteAll(
      client,
      location.T,
      `(filter: {name_starts_with: "${location.variables.name}"})`
    );
    console.log("Delete completed. Begin testing... ");
  });

  beforeEach(() => {});

  ///
  ///

  it(`does query Get ALL ${location.T}`, async () => {
    // console.log(`Does query all${T}`);
    const ret = await helper.getAll(client, location.variables, location);

    expect(ret).toBeTruthy();
  });

  ///
  ///

  it(`does Mutation: Create ${location.T}`, async () => {
    // console.log(`does Mutation: create${T}`);
    // console.log(`does Mutation: create owner`);
    let userVars = {
      ...user.variables,
      authProvider: {
        email: {
          email: `${user.T}${Math.floor(Math.random() * 2020321)}@email.com`,
          password: "test"
        }
      }
    };
    const ownerId = await helper.createEntity(client, userVars, user);

    let postVars = {
      ...post.variables,
      ownerId
    };
    // console.log(`does Mutation: create post: owner: ${ownerId}`);
    const postId = await helper.createEntity(client, postVars, post);

    let vars = {
      ...location.variables,
      postId
    };
    // console.log(`does Mutation: create location. postId: ${postId}`);
    // console.log(`mediaVars: `, mediaVars);

    const id = await helper.createEntity(client, vars, location);

    const searchResults = await helper.getAll(
      client,
      location.variables,
      location,
      `(filter: {id: "${id}"})`
    );

    expect(id).toEqual(searchResults.data[`all${location.T}s`][0].id);
  });

  ///
  ///

  it(`does Mutation: Update ${location.T}`, async () => {
    // console.log(`does Mutation: create${T}`);
    let userVars = {
      ...user.variables,
      authProvider: {
        email: {
          email: `${user.T}${Math.floor(Math.random() * 2020321)}@email.com`,
          password: "test"
        }
      }
    };
    const ownerId = await helper.createEntity(client, userVars, user);

    let postVars = {
      ...post.variables,
      ownerId
    };
    // console.log(`does Mutation: create post: owner: ${ownerId}`);
    const postId = await helper.createEntity(client, postVars, post);

    let mediaVars = {
      ...location.variables,
      postId
    };
    // console.log(`does Mutation: create location. postId: ${postId}`);
    // console.log(`mediaVars: `, mediaVars);

    const mediaId = await helper.createEntity(client, mediaVars, location);
    let expectedValues = {
      ...location.variables,
      ...location.variablesUpdateValues,
      __typename: location.T,
      id: mediaId,
      post: {
        __typename: post.T,
        id: postId
      }
    };

    // GQL will not return userId so we need this...
    let newValues = {
      ...expectedValues,
      postId
    };

    const updatedEntity = await helper.updateEntity(
      client,
      newValues,
      location
    );
    expect(updatedEntity).toEqual(expectedValues);
  });
});
