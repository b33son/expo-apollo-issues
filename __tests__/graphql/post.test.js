import "cross-fetch/polyfill";
import moment from "moment";
import helper from "../../__graphql__";
import Post from "../../__graphql__/types/post";
import User from "../../__graphql__/types/user";
require("dotenv").config();

const post = new Post();
const user = new User();

let client;

describe("App snapshot", () => {
  beforeAll(async () => {
    client = helper.apolloClient();
    await helper.deleteAll(
      client,
      post.T,
      `(filter: {name_starts_with: "${post.variables.name}"})`
    );
  });

  beforeEach(() => {});

  ///
  ///

  it(`does query Get ALL ${post.T}`, async () => {
    // console.log(`Does query all${T}`);
    const ret = await helper.getAll(client, post.variables, post);

    expect(ret).toBeTruthy();
  });

  ///
  ///

  it(`does Mutation: Create ${post.T}`, async () => {
    console.log(`does Mutation: create${post.T}`);

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

    if (!ownerId) {
      throw `Could not create ownerId in does Mutation: Create ${post.T}`;
    }

    let postVars = {
      ...post.variables,
      ownerId
    };
    console.log(`does Mutation: create post: owner: ${ownerId}`);
    const id = await helper.createEntity(client, postVars, post);

    console.log(`created post: ${id}`);

    const searchResults = await helper.getAll(
      client,
      post.variables,
      post,
      `(filter: {id: "${id}"})`
    );

    expect(id).toEqual(searchResults.data[`all${post.T}s`][0].id);

    expect(id).toBeTruthy();
  });

  ///
  ///

  it(`does Mutation: Update ${post.T}`, async () => {
    // console.log(`does Mutation: create${T}`);

    const userId = await helper.createEntity(client, user.variables, user);

    let postVars = {
      ...post.variables,
      ownerId: userId
    };
    const id = await helper.createEntity(client, postVars, post);

    let expectedValues = {
      ...post.variables,
      ...post.variablesUpdateValues,
      __typename: post.T,
      id,
      campaign: null,
      caption: null,
      location: null,
      medias: [],
      owner: {
        __typename: user.T,
        name: user.variables.name
      }
    };

    // GQL will not return userId so we need this...
    let newValues = {
      ...expectedValues,
      ownerId: userId
    };

    const updatedEntity = await helper.updateEntity(client, newValues, post);
    expect(updatedEntity).toEqual(expectedValues);
  });
});
