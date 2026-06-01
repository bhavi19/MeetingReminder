const isExtension =
  typeof chrome !== "undefined" &&
  Boolean(chrome.storage?.local);

const storageGet = (keys) =>
  new Promise((resolve) => {
    if (isExtension) {
      chrome.storage.local.get(keys, resolve);
      return;
    }

    const result = {};
    keys.forEach((key) => {
      const raw = localStorage.getItem(key);
      if (raw === null) return;
      try {
        result[key] = JSON.parse(raw);
      } catch {
        result[key] = raw;
      }
    });
    resolve(result);
  });

const storageSet = (items) =>
  new Promise((resolve) => {
    if (isExtension) {
      chrome.storage.local.set(items, resolve);
      return;
    }

    Object.entries(items).forEach(
      ([key, value]) => {
        localStorage.setItem(
          key,
          typeof value === "string"
            ? value
            : JSON.stringify(value)
        );
      }
    );
    resolve();
  });

const storageRemove = (keys) =>
  new Promise((resolve) => {
    if (isExtension) {
      chrome.storage.local.remove(keys, resolve);
      return;
    }

    keys.forEach((key) =>
      localStorage.removeItem(key)
    );
    resolve();
  });

export async function getSession() {
  const data = await storageGet([
    "token",
    "user",
  ]);
  return {
    token: data.token ?? null,
    user: data.user ?? null,
  };
}

export async function saveSession(token, user) {
  await storageSet({ token, user });
}

export async function clearSession() {
  await storageRemove([
    "token",
    "user",
    "nextMeeting",
    "lastTriggeredMeetingId",
  ]);
}

export async function getLastTriggeredMeetingId() {
  const data = await storageGet([
    "lastTriggeredMeetingId",
  ]);
  return data.lastTriggeredMeetingId ?? null;
}

export async function setLastTriggeredMeetingId(
  meetingId
) {
  await storageSet({
    lastTriggeredMeetingId: meetingId,
  });
}

export async function getNextMeeting() {
  const data = await storageGet(["nextMeeting"]);
  return data.nextMeeting ?? null;
}

export async function saveNextMeeting(nextMeeting) {
  await storageSet({ nextMeeting });
}

export async function removeToken() {
  await storageRemove(["token"]);
}
