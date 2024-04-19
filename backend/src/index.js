import express from "express";
import {
  getCheckedInChildren,
  checkIn,
  checkOut,
  findChild,
  getChildrenCheckedInForDuration,
} from "./lib/children.js";
import { prettyResponse } from "./utils/prettyResponse.js";
import { generateChild } from "./utils/generateChild.js";

let children = Array(10)
  .fill()
  .map(() => generateChild());

const app = express();
const port = 3000;

// Returns all children
app.get("/", (_, res) => {
  const response = prettyResponse(children);
  return res.send(response);
});

app.get("/checked-in", (_, res) => {
  const response = prettyResponse(getCheckedInChildren(children));
  res.send(response);
});

app.get("/checked-in-for/:hours", (req, res) => {
  const { hours } = req.params;

  if (Number.isInteger(+hours)) {
    const response = prettyResponse(
      getChildrenCheckedInForDuration(hours, children)
    );
    return res.send(response);
  }
});

// Returns a single child
app.get("/:childId", (req, res) => {
  const { childId } = req.params;
  const child = findChild(childId, children);
  res.send(prettyResponse(child));
});

// Checks in a child - this should be a POST request, but I want to test in the browser and there is no body needed
app.get("/:childId/checkin", (req, res) => {
  const { childId } = req.params;
  checkIn(childId, children);

  res.redirect(`/${childId}`);
});

// Checks out a child
app.get("/:childId/checkout", (req, res) => {
  const { childId } = req.params;
  checkOut(childId, children);

  res.redirect(`/${childId}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
