export const formatItem = (item: any) => {
  const formattedItem: any = {};
  for (const key in item) {
    const value = item[key];

    if (value.S) {
      formattedItem[key] = value.S;
    } else if (value.N) {
      formattedItem[key] = parseFloat(value.N);
    } else if (value.B) {
      formattedItem[key] = value.B;
    } else if (value.BOOL) {
      formattedItem[key] = value.BOOL;
    } else if (value.L) {
      formattedItem[key] = value.L.map((elem: any) => formatItem(elem)); // Lista
    } else if (value.M) {
      formattedItem[key] = formatItem(value.M);
    } else if (value.NULL !== undefined) {
      formattedItem[key] = null;
    } else {
      formattedItem[key] = value;
    }
  }
  return formattedItem;
};
