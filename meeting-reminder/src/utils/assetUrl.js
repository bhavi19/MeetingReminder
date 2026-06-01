export function assetUrl(path) {
  const normalized = path.replace(/^\//, "");

  if (
    typeof chrome !== "undefined" &&
    chrome.runtime?.getURL
  ) {
    return chrome.runtime.getURL(normalized);
  }

  return `/${normalized}`;
}
