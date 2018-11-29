import "cross-fetch/polyfill";
import moment from "moment";
import helper from "../../__graphql__";
import Media from "../../__graphql__/types/media";
import Post from "../../__graphql__/types/post";
import User from "../../__graphql__/types/user";
require("dotenv").config();

const media = new Media();
const post = new Post();
const user = new User();

let client;

describe("App snapshot", () => {
  beforeAll(async () => {
    client = helper.apolloClient();

    await helper.deleteAll(
      client,
      media.T,
      `(filter: {name_starts_with: "${media.variables.name}"})`
    );
    console.log("Delete completed. Begin testing... ");
  });

  beforeEach(() => {});

  ///
  ///

  it(`does query Get ALL ${media.T}`, async () => {
    // console.log(`Does query all${T}`);
    const ret = await helper.getAll(client, media.variables, media);

    expect(ret).toBeTruthy();
  });

  ///
  ///

  it(`does Mutation: Create ${media.T}`, async () => {
    // console.log(`does Mutation: create${T}`);
    // console.log(`does Mutation: create owner`);
    const ownerId = await helper.createEntity(client, user.variables, user);

    let postVars = {
      ...post.variables,
      ownerId
    };
    // console.log(`does Mutation: create post: owner: ${ownerId}`);
    const postId = await helper.createEntity(client, postVars, post);

    let mediaVars = {
      ...media.variables,
      postId
    };
    // console.log(`does Mutation: create media. postId: ${postId}`);
    // console.log(`mediaVars: `, mediaVars);

    const mediaId = await helper.createEntity(client, mediaVars, media);
    expect(mediaId).toBeTruthy();
  });

  ///
  ///

  it(`does Mutation: Update ${media.T}`, async () => {
    // console.log(`does Mutation: create${T}`);
    const ownerId = await helper.createEntity(client, user.variables, user);

    let postVars = {
      ...post.variables,
      ownerId
    };
    // console.log(`does Mutation: create post: owner: ${ownerId}`);
    const postId = await helper.createEntity(client, postVars, post);

    let mediaVars = {
      ...media.variables,
      postId
    };
    // console.log(`does Mutation: create media. postId: ${postId}`);
    // console.log(`mediaVars: `, mediaVars);

    const mediaId = await helper.createEntity(client, mediaVars, media);
    let expectedValues = {
      ...media.variables,
      ...media.variablesUpdateValues,
      __typename: media.T,
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

    const updatedEntity = await helper.updateEntity(client, newValues, media);
    expect(updatedEntity).toEqual(expectedValues);
  });
});
