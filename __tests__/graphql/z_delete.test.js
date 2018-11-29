require("dotenv").config();
import "cross-fetch/polyfill";
import gql from "graphql-tag";
import moment from "moment";
import helper from "../../__graphql__";

// npm test -- ./__tests__/graphql/z_delete.test.js

let client;

describe("App snapshot", () => {
  beforeAll(() => {
    client = helper.apolloClient();
    let params = {
      ...params,
      client
    };
  });

  beforeEach(() => {});

  ///
  ///

  it(`does deleteALL and cleanup`, async () => {
    // console.log(`does delete ALL ${T}`);

    // let types = ["User", "Org", "Campaign"];
    // for (let entityName of types) {
    //   await helper.deleteAll(client, entityName);
    // }

    expect(true).toBeTruthy();
  });
});
