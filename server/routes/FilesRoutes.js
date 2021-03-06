const keys = require("../config/keys");
const RequireLogin = require("../middlewares/RequireLogin");
const FileUpload = require("../middlewares/FileUpload");
const axios = require("axios");
const streamifier = require("streamifier");
var stream = require("stream");

const kloud_URL =
  "https://api.kloudless.com/v1/accounts/" + keys.kloudlessID + "/storage";

const FormatData = object => {
  return {
    id: object.id,
    name: object.name,
    modified: object.modified,
    size: object.size,
    type: object.type
  };
};

module.exports = app => {
  app.post("/api/files/create_folder", RequireLogin, async (req, res) => {
    const request = await axios.post(
      kloud_URL + "/folders/",
      {
        parent_id: req.body.parent_id,
        name: req.body.name
      },
      { headers: { Authorization: "ApiKey " + keys.kloudlessApiKey } }
    );
    const folder = FormatData(request.data);
    res.send(folder); // return the new folder object
  });
  app.post("/api/files/delete", RequireLogin, async (req, res) => {
    const request = await axios.delete(
      kloud_URL + "/files/" + req.body.object_id + "/",
      {
        headers: { Authorization: "ApiKey " + keys.kloudlessApiKey }
      }
    );
    res.send(request.data);
  });
  app.post("/api/files/rename", RequireLogin, async (req, res) => {
    const request = await axios.patch(
      kloud_URL + "/files/" + req.body.object_id,
      { name: req.body.name },
      {
        headers: { Authorization: "ApiKey " + keys.kloudlessApiKey }
      }
    );
    res.send(FormatData(request.data));
  });
  app.get("/api/files/get/:folder_id", RequireLogin, async (req, res) => {
    const request = await axios.get(
      kloud_URL + "/folders/" + req.params.folder_id + "/contents",
      {
        headers: { Authorization: "ApiKey " + keys.kloudlessApiKey }
      }
    );
    var objects = [];
    request.data.objects.map(object => {
      objects.push(FormatData(object));
    });
    res.send(objects);
  });
  app.post(
    "/api/files/upload/:folder_id",
    RequireLogin,
    FileUpload,
    async (req, res) => {
      const streamBuffer = streamifier.createReadStream(req.file.buffer);
      const request = await axios.post(kloud_URL + "/files/", streamBuffer, {
        headers: {
          Authorization: "ApiKey " + keys.kloudlessApiKey,
          ["X-Kloudless-Metadata"]: JSON.stringify({
            parent_id: req.params.folder_id,
            name: req.file.originalname
          })
        }
      });
      res.send(FormatData(request.data));
    }
  );
  app.get("/api/files/download/:file_id", RequireLogin, async (req, res) => {
    axios({
      url: kloud_URL + "/files/" + req.params.file_id + "/contents",
      headers: { Authorization: "ApiKey " + keys.kloudlessApiKey },
      method: "get",
      responseType: "stream"
    }).then(binary => {
      const filename = binary.headers["content-disposition"].slice(
        binary.headers["content-disposition"].indexOf('"') + 1,
        binary.headers["content-disposition"].length - 1
      );
      res.setHeader("content-type", binary.headers["content-type"]);
      res.setHeader("content-disposition", "attachment; filename=" + filename);
      binary.data.pipe(res);
    });
  });
};
