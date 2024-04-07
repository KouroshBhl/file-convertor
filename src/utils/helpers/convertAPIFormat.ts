export function getSupportedFormats(data: [], from: boolean, to: boolean) {
  const conversionFormat = data.map((item: any) => {
    if (from && !to) return { from: item.SourceFileFormats };
    if (!from && to) return { to: item.DestinationFileFormats };
    return { from: item.SourceFileFormats, to: item.DestinationFileFormats };
  });

  return conversionFormat;
}

export function formatAllConversions(data: any) {
  let arr: any = '';
  for (let from = 0; from < data.from.length; from++) {
    for (let to = 0; to < data.to.length; to++) {
      arr += `${data.from[from]}-to-${data.to[to]},`;
    }
  }

  return arr;
}

export function formatSomeConversions(data: any) {
  const formatedAllConversions = data.reduce((acc: any, item: any) => {
    return acc + item.to + ',';
  }, []);

  return formatedAllConversions.split(',').slice(0, -1);
}
