const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const Group = mongoose.model("groups");
const User = mongoose.model("users");
const ObjectId = require("mongoose").Types.ObjectId;
const keys = require("../config/keys");
const axios = require("axios");
const _ = require("lodash");

const kloud_URL =
  "https://api.kloudless.com/v1/accounts/" + keys.kloudlessID + "/storage";

module.exports = app => {
  // fetching own groups
  app.get("/api/group/my_groups", RequireLogin, async (req, res) => {
    const groups = await Group.find({ _id: { $in: req.user._groups } });
    res.send(groups);
  });
  // fetching group users
  app.get("/api/group/users/:group_id", RequireLogin, async (req, res) => {
    const users = await Group.findById(req.params.group_id)
      .populate("_users", "firstname lastname imgURL")
      .select("_users");
    res.send(users._users);
  });
  // creating a group
  app.post("/api/group/create", RequireLogin, async (req, res) => {
    // create the group folder
    const request = await axios.post(
      kloud_URL + "/folders/",
      {
        parent_id: "root",
        name: req.body.name
      },
      { headers: { Authorization: "ApiKey " + keys.kloudlessApiKey } }
    );
    const folder_id = request.data.id;
    const default_img_url =
      "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person";
    const group = new Group({
      name: req.body.name,
      imgURL: req.body.imgurl === "" ? default_img_url : req.body.imgurl,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      facebook: req.body.facebook,
      email: req.body.email,
      _creator: [req.user.id],
      _users: [req.user.id],
      storage_folder_id: folder_id
    });
    req.user._groups.push(mongoose.Types.ObjectId(group.id));
    await req.user.save();
    await group.save();
    res.send(group);
  });
  // modify a group
  app.post("/api/group/modify", RequireLogin, async (req, res) => {
    await Group.findByIdAndUpdate(req.body.group_id, {
      name: req.body.name,
      imgURL: req.body.imgurl,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      facebook: req.body.facebook,
      email: req.body.email
    });
    storage;
    res.send(null);
  });
  // remove user from a group
  app.post("/api/group/remove", RequireLogin, async (req, res) => {
    await Group.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.group_id), {
      $pull: {
        _users: mongoose.Types.ObjectId(req.body.user_id)
      }
    });
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.user_id), {
      $pull: {
        _groups: mongoose.Types.ObjectId(req.body.group_id)
      }
    });
    res.send(null);
  });
  // deleting a group
  app.post("/api/group/delete", RequireLogin, async (req, res) => {
    await Group.findByIdAndRemove(req.body.group_id, async (err, group) => {
      var users_id = [];
      group._users.forEach(user_id => {
        users_id.push(user_id);
      });
      await User.updateMany(
        { _id: { $in: users_id } },
        {
          $pull: {
            _groups: req.body.group_id
          }
        }
      );
    });
    res.send(true);
  });
  // add a user to a group
  app.post("/api/group/join", RequireLogin, async (req, res) => {
    const group_id = req.body.code.split("/")[0];
    // check if the user is already in the group
    if (req.user._groups.find(user_group_id => user_group_id == group_id)) {
      res.send(null);
      return;
    }
    if (!ObjectId.isValid(group_id)) {
      // check if the id is not a valid mongodb id
      res.send(null);
      return;
    }
    // _______________
    const group = await Group.findById(group_id);
    if (!group || group.invitation_code !== req.body.code) {
      res.send(null);
      return;
    }
    group._users.push(req.user.id);
    await group.save();
    req.user._groups.push(group_id);
    await req.user.save();
    res.send(group);
  });
  // generate an invitation code for users
  app.post("/api/group/invite", RequireLogin, async (req, res) => {
    var code = "";
    for (
      ;
      code.length < 8;
      code += Math.random()
        .toString(36)
        .substr(2)
    );
    await Group.findByIdAndUpdate(req.body.group_id, {
      invitation_code: req.body.group_id + "/" + code
    });
    res.send(req.body.group_id + "/" + code);
  });
};
