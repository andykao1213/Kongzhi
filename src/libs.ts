export const getValueByPath = (obj: any, path = "") =>
  path
    .replace(/\[(\w+)\]/g, ".$1") // convert indexes to properties
    .replace(/^\./, "") // strip a leading dot
    .split(".")
    .reduce((acc, cur) => {
      if (cur in acc) acc = acc[cur];
      return acc;
    }, obj);

export const setValueByPath = (obj: any, path = "", newVal: any) => {
  const pathInArr = path
    .replace(/\[(\w+)\]/g, ".$1") // convert indexes to properties
    .replace(/^\./, "") // strip a leading dot
    .split(".");
  const interestedPath = pathInArr.slice(0, pathInArr.length - 1);
  const theRef = interestedPath.reduce((acc, cur) => {
    if (cur in acc) acc = acc[cur];
    return acc;
  }, obj);
  theRef[pathInArr[pathInArr.length - 1]] = newVal;
};
