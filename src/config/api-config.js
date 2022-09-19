export const baseUrl = "http://35.208.65.24:3003";

export function buildQuery(query) {
  let queries = Object.keys(query).map((k) => `${k}=${query[k]}`);
  return `?${queries.join("&")}`;
}
