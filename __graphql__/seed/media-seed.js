import typeInfos from "../types";
import { DEMO_SUFFIX } from "./constants";
import helper from "../index";

export const mediaSeedDemo = async client => {
  // $name: String,
  // $postId:ID,
  // $contentType: String!,
  // $size:Int!,
  // $url:String!,
  let createVars = [
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "http://www.djstrobe.com/wp-content/uploads/Utility-Pole-Poster-Mockupsmaller.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "http://photoblog.statesman.com/wp-content/uploads/2011/01/gig-0010.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "http://1.bp.blogspot.com/_JLkdStmKIyk/TVJIG3ydEPI/AAAAAAAAAb0/Qzs5c82w2ak/s1600/lost_pole_poster.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://static1.squarespace.com/static/53c28671e4b097c07c1a6187/53c3fda4e4b06bf169491e3d/53c66394e4b063b24aedaf9f/1405510584808/"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://www.cityofsydney.nsw.gov.au/__data/assets/image/0003/105942/Woman-looking-at-posters-on-pole.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://media1.fdncms.com/thecoast/imager/u/original/5534305/how_to_poster_a_pole_planifax.png"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://www.printivo.com/blog/wp-content/uploads/2015/06/thehundreds3338.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYhkJXRA0_gtMe-VkVeenNNYMqSd5a4OeKeSv_NYDq4v3yw453A"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://www.grandc.co.uk/wp-content/uploads/2016/06/GC-Website2016-BackgroundImgs-v001-AG-2.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://www.irishtimes.com/polopoly_fs/1.2694786.1466618705!/image/image.jpg_gen/derivatives/box_620_330/image.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url: "https://c1.staticflickr.com/2/1036/1409837004_5f5ae300b9_b.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "http://www2.philly.com/resizer/kLVm0D_5hqgCMZS83SvlIik_WFE=/1400x0/center/middle/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/LDIAABAFN5DP7FFIPRNCVNV6NE.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://streetpromotions.com.au/wp-content/uploads/2018/08/Street-Promotions-Pole-Posters-Carmada-e1534137807265.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url: "http://www.uniqueprint.com.au/media/1019/Pole-Posters.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://extramuralactivity.files.wordpress.com/2016/09/03936-2016-11-09-posters-pole.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7m3eXPjk8JCQLsyaD9hRYKo_7vUjaEjTmjHc9cbbCwRY_l6tOYg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJpJY6eiPQeOVllCgw8absCpcvI0Sk3gbBwn3N20WqntrPweTDaA"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "http://www2.philly.com/resizer/T_LbvdhHBELi33mTvhBkE1YqxcQ=/1400x0/center/middle/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/7XN4HCHWJBFVXNZ6QX4DUGDHOI.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url: "https://i.stack.imgur.com/WCNDc.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://c8.alamy.com/comp/EA0J2Y/an-advertising-column-or-pillar-in-quebec-city-quebec-canada-EA0J2Y.jpg"
    },

    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://www.leafletdistributionteam.co.uk/wp-content/uploads/2015/08/hand-to-hand-10.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "http://outofhandscotland.co.uk/wp-content/uploads/2014/10/Headers-small-hand.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "http://steprightup.com.au/wordpress/wp-content/uploads/photo-gallery/hand/MSFW%202014%2002.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "https://www.leafletdistributionteam.co.uk/wp-content/uploads/2015/08/hand-to-hand-5.jpg"
    },
    {
      name: "Media",
      contentType: "Image",
      size: 1234,
      url:
        "http://deliveryglasgow.co.uk/wp-content/uploads/2014/11/street-intercept-pic.jpg"
    }
  ];

  let ids = [];
  info = typeInfos.media;

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

export const connectPost = async (client, mediaId, postId) => {
  info = typeInfos.media;

  let vars = {
    id: mediaId,
    postId
  };

  const updatedEntity = await helper.updateEntity(client, vars, info);
  return updatedEntity;
};
