export async function fetchMovieList({
  searchKeyword,
  pageParam = 1,
}: {
  searchKeyword: string;
  pageParam: number;
}) {
  const res = await fetch(
    `https://www.omdbapi.com/?s=${searchKeyword}&page=${pageParam}&apikey=7d2bc3be`
  );
  const data = await res.json();
  return data;
}

export async function fetchMovieDetailById(id: string) {
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=7d2bc3be`);
  const data = await res.json();
  return data;
}
