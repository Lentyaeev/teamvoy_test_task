const apiKey = 'febbab958eca47d6b8ba1ad64879dfe9';

export const getArticles = ({ query, from, to, params }) => {
  let searchQuery;
  searchQuery = query;

  if (!query) {
    searchQuery = 'cats';
  }

  const url = `https://newsapi.org/v2/everything?q=${searchQuery}${from ? '&from=' + from : ''}${to ? '&to=' + to : ''}&language=en&sortBy=${params ? 'relavance' : 'popularity'}&apiKey=${apiKey}`;

  return(
    fetch(url)
  );
}
