export function prettyResponse(json) {
  return `<pre>${JSON.stringify(json, null, "\t")}</pre>`;
}
