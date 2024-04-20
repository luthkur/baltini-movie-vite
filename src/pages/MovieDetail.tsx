import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMovieDetailById } from "src/api/movie";
import { Movie } from "src/types/movie";
import useLocalstorage from "src/hooks/useLocalStorage";

export default function MovieDetail() {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery<Movie>({
    queryKey: [`MovieDetail-${id}`],
    queryFn: () => fetchMovieDetailById(id as string),
  });

  const [MyList, SetMyList] = useLocalstorage("MyList", "[]");
  const ArrayList = JSON.parse(MyList);
  const AddedToMyList = ArrayList.find((movie: Movie) => movie.imdbID == id);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error fetching data</p>;
  }

  const AddToMyList = () => {
    const NewArrayList = [data, ...ArrayList];
    SetMyList(JSON.stringify(NewArrayList));
  };

  const RemoveFromMyList = () => {
    const NewArrayList = ArrayList.splice(
      ArrayList.findIndex((Movie: Movie) => Movie.imdbID === id),
      0
    );
    SetMyList(JSON.stringify(NewArrayList));
  };

  return (
    <div>
      <img width={300} height={444} src={data?.Poster} alt={data?.Title} />
      <h2>{data?.Title}</h2>
      <h2>{data?.Year}</h2>
      {AddedToMyList ? (
        <>
          <h2>Added To MY List</h2>
          <button onClick={RemoveFromMyList}>Remove From My List</button>
        </>
      ) : (
        <button onClick={AddToMyList}>Add To My List</button>
      )}
    </div>
  );
}
