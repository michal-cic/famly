export function findChild(id, children) {
  return children.find((child) => child.id === id);
}

export function checkIn(id, children) {
  const child = findChild(id, children);

  if (!child) throw new Error(`Child not found "${id}"`);

  if (child.checkInAt) throw new Error("Child checked in already");

  if (child.checkOutAt) throw new Error("Child checked out already");

  child.checkInAt = Date.now();
}

export function checkOut(id, children) {
  const child = findChild(id, children);

  if (!child) throw new Error("Child not found");

  if (!child.checkInAt) throw new Error("Child not checked in yet");

  if (child.checkOutAt) throw new Error("Child checked out already");

  child.checkOutAt = Date.now();
}

export function getCheckedInChildren(children) {
  return children.filter(
    (child) => child.checkInAt !== null && child.checkOutAt === null
  );
}

export function getChildrenCheckedInForDuration(hours, children) {
  return children.filter((child) => {
    // Child is not checked in or out
    if (!child.checkInAt || !child.checkOutAt) {
      return false;
    }

    const currentDateTimeTS = Date.now();
    const currentDateTime = new Date(currentDateTimeTS);

    // Child is not checked in or out TODAY
    if (
      new Date(child.checkInAt).toDateString() !==
        currentDateTime.toDateString() &&
      new Date(child.checkOutAt).toDateString() !==
        currentDateTime.toDateString()
    ) {
      return false;
    }

    const checkInHours = child.checkInAt / 1000 / 60 / 60;
    const checkOutHours = child.checkOutAt / 1000 / 60 / 60;

    if (checkOutHours - checkInHours <= hours) {
      return false;
    }

    return true;
  });
}
