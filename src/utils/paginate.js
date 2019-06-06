import _ from "lodash";

export function paginate(items, pageNumber, perPage) {
  const startIndex = (pageNumber - 1) * perPage; //offset
  return _(items)
    .slice(startIndex)
    .take(perPage)
    .value();
}
