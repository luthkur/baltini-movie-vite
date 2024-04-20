export async function fetchMovieList(search: string) {
  const res = await fetch(
    `http://www.omdbapi.com/?s=${search}&apikey=7d2bc3be`
  );
  const data = await res.json();
  return data;
}

export async function fetchMovieDetailById(id: string) {
  const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=7d2bc3be`);
  const data = await res.json();
  return data;
}
