import helper from "../index";
import { DEMO_SUFFIX } from "./constants";
import { userSeedDemo } from "./user-seed";
import { orgSeedDemo, connectOrg } from "./org-seed";
import { campaignSeedDemo, connectCampaign } from "./campaign-seed";
import { postSeedDemo, connectPost } from "./post-seed";
import { locationSeedDemo, connectLocation } from "./location-seed";
import { mediaSeedDemo, connectMedia } from "./media-seed";
require("dotenv").config();

// babel-node --presets babel-preset-expo ./__graphql__/seed

let client = helper.apolloClient();

// const seedForDemo = async () => {
//   for (let key in typeInfos) {
//     let info = typeInfos[key];
//     };
//   }
// };

const deleteDemo = async () => {
  //await deleteAll(`(filter: {name_ends_with: "${DEMO_SUFFIX}"})`);
  let done = await deleteAll();
};

const deleteAll = async (filter = null) => {
  //let types = ["Post", "User", "Org", "Campaign"];

  const rt = await Promise.all([
    helper.deleteAll(client, "Media", filter),
    helper.deleteAll(client, "Location", filter),
    helper.deleteAll(client, "Post", filter),
    helper.deleteAll(client, "Org", filter),
    helper.deleteAll(client, "Campaign", filter),
    helper.deleteAll(client, "User", filter)
  ]);
  return rt;
};

const seedDemo = async () => {
  console.log("Deleting gql demo records... ");
  await deleteDemo();
  //deleteAll();
  console.log("Creating gql demo records... ");
  let userIds = await userSeedDemo(client);
  //console.log("users: ", userIds.length);
  console.log(`Created users (${userIds.length}):`, userIds);

  let orgIds = await orgSeedDemo(client);
  //console.log("orgs: ", orgIds.length);
  console.log(`Created orgs (${orgIds.length}):`, orgIds);

  let campaignIds = await campaignSeedDemo(client);
  //console.log("campaigns", campaignIds.length);
  console.log(`Created campaigns (${campaignIds.length}):`, campaignIds);

  ////// ORG 0 ////////
  let firstOrg = orgIds.slice(0, 1);
  let membersIds = userIds.slice(0, 6); // 6 members
  let leadsIds = membersIds.slice(0, 2); // first 2 users will be leads

  // connect campaign
  for (let campaignId of campaignIds) {
    // add all demo campaigns
    console.log(`Connecting Campaign: ${campaignId}`);
    await connectCampaign(client, campaignId, firstOrg, leadsIds, membersIds);
  }
  // connect org
  console.log(`Connecting Org: ${firstOrg[0]}`);
  let adminsIds = membersIds.slice(0, 1); // first user will be the admin
  await connectOrg(client, firstOrg[0], adminsIds, userIds);

  ////// ORG 1 ////////
  let secondOrg = orgIds.slice(1, 2);
  let membersIds2 = userIds.slice(6); // The remaining demo users will be members
  let leadsIds2 = membersIds2.slice(0, 3); // first 3 users will be leads

  let adminsIds2 = membersIds2.slice(0, 1); // first member will be admin
  console.log(`Connecting Org: ${secondOrg[0]}`);
  await connectOrg(client, secondOrg[0], adminsIds2, membersIds2);

  /// Create 2 campaigns that are shared between Org 0 and Org 1
  let sharedCampaignIds = campaignIds.slice(1, 3); // make 2 shared Campaigns
  let orgsShared = [...firstOrg, ...secondOrg];
  let membersIdsShared = [...membersIds, ...membersIds2];
  let leadsIdsShared = [...leadsIds, ...leadsIds2];

  for (let campaignId of sharedCampaignIds) {
    console.log(`Connecting Shared Campaign: ${campaignId}`);
    console.log(`_________ Campaign shared between Orgs: `, orgsShared);
    await connectCampaign(
      client,
      campaignId,
      orgsShared,
      leadsIdsShared,
      membersIdsShared
    );
  }

  // for (let campId of campaignIds) {
  //   await seedActivityDemo(campId);
  // }
  await seedActivityDemo(campaignIds[0]);
};

const seedActivityDemo = async campaignId => {
  //////  POSTS ////////
  let postsIds = await postSeedDemo(client);
  console.log(`Created posts (${postsIds.length}):`, postsIds);

  let locationsIds = await locationSeedDemo(client);
  console.log(`Created locations (${locationsIds.length}):`, locationsIds);

  let mediasIds = await mediaSeedDemo(client);
  console.log(`Created mediasIds (${mediasIds.length}):`, mediasIds);

  // connect some posts with 1 image, 2 images, 3, 4, 5... 8
  // connect to campaign
  let mi = 0;
  let mcount = 8;
  let MEDIA_MAX = 8; // max number of medias to add to a single post

  let li = 0;
  for (let postId of postsIds) {
    mcount = mcount - 1;
    li = li + 1;

    //let mIds = [mediasIds[(mi%mediasIds.length)],mediasIds[((mi+1)%mediasIds.length)],mediasIds[((mi+2)%mediasIds.length)], ]
    //mi = mi+3;
    let size = mcount % MEDIA_MAX;
    //size = size < 1 ? 1 : size;
    let start = mi % mediasIds.length;
    // console.log(`mediasIds.length: ${mediasIds.length}`);
    // console.log(`mi: ${mi}`);
    // console.log(`start: ${start}`);
    // console.log(`size: ${size}`);
    let end = start + size;
    let mIds = mediasIds.slice(start, end);
    // console.log(`mIds: `, mIds);
    // console.log(`mids.length: ${mIds.length}`);
    let locationId = locationsIds[li % locationsIds.length];

    mi = mi + size;
    console.log(`Connecting Post...: ${campaignId}`);
    console.log(`____ postId: ${postId}`);
    console.log(`____ campaignId: ${campaignId}`);
    console.log(`____ mediaIds: (${mIds.length}) `, mIds);
    console.log(`____ locationId: ${locationId}`);
    await connectPost(client, postId, campaignId, mIds, locationId);
  }
};

function run() {
  seedDemo();
}

run();
