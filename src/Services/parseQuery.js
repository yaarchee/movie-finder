import queryString from 'query-string';

export default function getParseQuery(locationSearch) {
  return queryString.parse(locationSearch);
}
