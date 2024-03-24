export function formatAllConversions(data: any) {
  let arr: any = '';
  for (let from = 0; from < data.from.length; from++) {
    for (let to = 0; to < data.to.length; to++) {
      arr += `${data.from[from]}-to-${data.to[to]},`;
    }
  }

  return arr;
}
