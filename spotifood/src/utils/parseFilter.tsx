export default function parseFilter(data: any) {
  const filter: any = {};

  Object.keys(data).map((key: string) => {
    if (data[key]) {
      filter[key] = data[key];
      if (key === 'timestamp') {
        filter[key] = data[key] ? `${data[key]}:00` : '';
      }
    }
  });

  return filter;
}
