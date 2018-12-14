const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const Group = mongoose.model("groups");
const User = mongoose.model("users");

module.exports = app => {
  // fetching own groups
  app.get("/api/group/my_groups", RequireLogin, async (req, res) => {
    var groups = [];
    await Group.find({ _id: { $in: req.user._groups } }, (err, group) => {
      if (group) groups = [...groups, ...group];
    });
    console.log(groups);
    res.send(groups);
  });
  // creating a group
  app.post("/api/group/create", RequireLogin, async (req, res) => {
    const group = await new Group({
      name: req.body.name,
      imgURL: req.body.imgurl,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      facebook: req.body.twitter,
      email: req.body.email,
      _creator: [req.user.id],
      _users: [req.user]
    });
    req.user._groups.push(mongoose.Types.ObjectId(group.id));
    await req.user.save();
    await group.save();
    res.send(group);
  });
  app.post("/api/group/modify", RequireLogin, async (req, res) => {
    await Group.findByIdAndUpdate(req.body.group_id, {
      name: req.body.name,
      imgURL: req.body.imgurl,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      facebook: req.body.twitter,
      email: req.body.email,
      _creator: [req.user.id],
      _users: [req.user]
    });
    res.send("group updated");
  });
  // deleting a group
  app.post("/api/group/delete", RequireLogin, async (req, res) => {
    await Group.findById(
      mongoose.Types.ObjectId(req.body.group_id),
      async (err, group) => {
        const users_id = [];
        group._users.forEach(user => {
          users_id.push(user.id);
        });
        console.log(users_id);
        await User.findByIdAndUpdate(
          { $in: users_id },
          {
            $pull: {
              _groups: mongoose.Types.ObjectId(req.body.group_id)
            }
          }
        );
      }
    );
    await Group.findByIdAndDelete(mongoose.Types.ObjectId(req.body.group_id));
    res.send("group deleted");
  });
  app.post("/api/group/add", RequireLogin, async (req, res) => {
    await Group.findOneAndUpdate(req.body.group_id, {
      $push: {
        _users: req.user
      }
    });
  });
};
