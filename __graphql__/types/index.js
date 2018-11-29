import Org from "./org";
import User from "./user";
import Campaign from "./campaign";
import Post from "./post";
import Media from "./media";
import Location from "./location";

export default {
  org: new Org(),
  user: new User(),
  campaign: new Campaign(),
  post: new Post(),
  media: new Media(),
  location: new Location()
};
