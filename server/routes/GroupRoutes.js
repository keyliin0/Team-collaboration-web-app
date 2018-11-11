const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const Group = mongoose.model("groups");
const User = mongoose.model("users");

module.exports = app => {
  // fetching own groups
  app.get("/api/group/my_groups", RequireLogin, async (req, res) => {
    const groups = [];
    await Group.findById({ $in: req.user._groups }, (err, group) => {
      groups.push(group);
    });
    res.send(groups);
  });
  // creating a group
  app.post("/api/group/create", RequireLogin, async (req, res) => {
    const group = await new Group({
      name: req.body.name,
      _creator: [req.user.id],
      _users: [req.user.id]
    });
    req.user._groups.push(mongoose.Types.ObjectId(group.id));
    await req.user.save();
    await group.save();
    res.send(group);
  });
  // deleting a group
  app.delete("/api/group/delete", RequireLogin, async (req, res) => {
    await Group.findById(
      mongoose.Types.ObjectId(req.body.group_id),
      async (err, group) => {
        await User.findByIdAndUpdate(
          { $in: group._users },
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
};
