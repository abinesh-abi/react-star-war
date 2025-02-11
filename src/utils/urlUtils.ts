export default {
  getValue(url: string, paramField: string): string | null {
    const newUrl = new URL(url);
    const query = newUrl.searchParams;
    return query.get(paramField);
  },
  updateQueryParam(
    query: string,
    paramName: string,
    newValue: string | number
  ): string {
    let params = new URLSearchParams(query);
    // if (params.has(paramName)) {
    params.set(paramName, String(newValue));
    // }
    return "?" + params.toString();
  },
  getQueryFromURL(currentURL: string): string {
    const url = new URL(currentURL);
    const query = url.searchParams;
    return "?" + query.toString();
  },
};
