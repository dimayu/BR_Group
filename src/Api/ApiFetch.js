const baseUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
const newsItemUrl = "https://hacker-news.firebaseio.com/v0/item/";

export const fetchPost = (id) => {
  return fetch(`${newsItemUrl}${id}.json`)
  .then((res) => {
    return res.json()
  })
  .then(data => {
    if(!data){
      throw new Error('Error fetching the post')
    }
    return data
  })
};

export const fetchTopPosts = () => {
  return fetch(`${baseUrl}`)
  .then((res) => res.json())
  .then((ids) => {
    if(!ids) {
      throw new Error('Error fetching posts')
    }
    return ids.slice(0, 99);
  })
  .then((ids) => {
    return Promise.all(ids.map(fetchPost))
    .then(news => {
      return news
    })
  })
};

export const getKids = (ids) => {
  return Promise.all(ids.map(fetchPost))
  .then(kids => {
    return kids
  })
}