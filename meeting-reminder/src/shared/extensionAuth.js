export const isExtensionAuth =
  typeof chrome !== "undefined" &&
  Boolean(chrome.identity?.getAuthToken);

export function getAccessToken(
  interactive = false
) {
  return new Promise((resolve, reject) => {
    if (!isExtensionAuth) {
      reject(new Error("Not in extension"));
      return;
    }

    chrome.identity.getAuthToken(
      { interactive },
      (token) => {
        if (chrome.runtime.lastError || !token) {
          reject(
            chrome.runtime.lastError ??
              new Error("No auth token")
          );
          return;
        }

        resolve(token);
      }
    );
  });
}

export function removeCachedAuthToken(token) {
  return new Promise((resolve) => {
    if (!isExtensionAuth) {
      resolve();
      return;
    }

    chrome.identity.removeCachedAuthToken(
      { token },
      resolve
    );
  });
}

export function clearAllAuthTokens() {
  return new Promise((resolve) => {
    if (!isExtensionAuth) {
      resolve();
      return;
    }

    chrome.identity.clearAllCachedAuthTokens(
      resolve
    );
  });
}
