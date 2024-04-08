export function getSupportedFormats(
  data: [],
  from: boolean,
  to: boolean,
  group: boolean
) {
  const conversionFormat = data.map((item: any) => {
    if (from && !to) return { from: item.SourceFileFormats };
    if (!from && to) return { to: item.DestinationFileFormats };
    if (from && to && group)
      return {
        from: item.SourceFileFormats,
        to: item.DestinationFileFormats,
        group: item.ConverterGroup,
      };
    return { from: item.SourceFileFormats, to: item.DestinationFileFormats };
  });

  return conversionFormat;
}

export function formatAllConversions(data: any, group: boolean) {
  let arr: any = '';
  for (let from = 0; from < data.from.length; from++) {
    for (let to = 0; to < data.to.length; to++) {
      if (!group) arr += `${data.from[from]}-to-${data.to[to]},`;
      if (group) arr += `${data.from[from]}+${data.to[to]}+${data.group},`;
    }
  }

  return arr;
}

export function formatSomeConversions(data: any) {
  console.log(data);
  const formatedAllConversions = data.reduce((acc: any, item: any) => {
    return acc + item.to + ',';
  }, []);

  return formatedAllConversions.split(',').slice(0, -1);
}
