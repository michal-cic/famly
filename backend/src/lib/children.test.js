import { expect, test } from "@jest/globals";
import {
  checkIn,
  findChild,
  getChildrenCheckedInForDuration,
} from "./children.js";
import { generateChild } from "../utils/generateChild";

test("check in child that is not checked in", () => {
  // Arrage
  const children = [generateChild()];
  const childId = children[0].id;

  // Act
  checkIn(childId, children);

  // Assert
  expect(children[0].checkInAt).toBeDefined();
  expect(children[0].checkInAt).toBeGreaterThan(0);
});

test("check in child that is already checked in", () => {
  // Arrage
  const children = [generateChild()];
  const childId = children[0].id;
  let error = null;
  checkIn(childId, children);

  // Act
  try {
    checkIn(childId, children);
  } catch (e) {
    error = e;
  }

  // Assert
  expect(error).toBeDefined();
  expect(error.message).toBeDefined();
});

test("check in child that is already checked in", () => {
  // Arrage
  const children = [
    generateChild({
      checkInAt: Date.now(),
    }),
  ];
  const childId = children[0].id;
  let error = null;

  // Act
  try {
    checkIn(childId, children);
  } catch (e) {
    error = e;
  }

  // Assert
  expect(error).toBeDefined();
  expect(error.message).toBeDefined();
});

test("list children checked in for more than 2 hours ", () => {
  // Arrage
  // Check in at 09:00
  const checkInAt = new Date();
  checkInAt.setHours(9);
  checkInAt.setMinutes(0);
  // Check out at 12:00
  const checkOutAt = new Date();
  checkOutAt.setHours(12);
  checkOutAt.setMinutes(0);
  const children = [
    generateChild({
      checkInAt: +checkInAt,
      checkOutAt: +checkOutAt,
    }),
  ];
  let childrenCheckedInForMoreThanTwoHours = [];

  // Act
  try {
    childrenCheckedInForMoreThanTwoHours = getChildrenCheckedInForDuration(
      2,
      children
    );
  } catch (e) {
    error = e;
  }

  // Assert
  expect(childrenCheckedInForMoreThanTwoHours.length).toBe(1);
});
