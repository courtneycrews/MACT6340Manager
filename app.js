import express from "express";
import * as utils from "./utils/utils.js";

const app = express();
const port = 8080;

app.use(express.static("public"));

app.post("/build-sequence", async (req, res) => {
  console.log("going");
  await utils
    .completeBuildAndDeploySequence()
    .then(() => {
      res.send({ result: "full sequence completed" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: "failure running full sequence" });
    });
});

app.get("/iframe", async (req, res) => {
    let hash = req.query.hash || "ffffffffffffffff";
    let iFrameData = await utils.getIframeString(hash);
    res.send(iFrameData);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });