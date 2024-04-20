import useLocalstorage from "src/hooks/useLocalStorage";
import { Movie } from "src/types/movie";
import MovieCard from "src/component/MovieCard";
export default function MyList() {
  const [MyList] = useLocalstorage("MyList", "[]");
  const ArrayList = JSON.parse(MyList);

  const MyListComponent = ArrayList?.map((Movie: Movie) => {
    return <MovieCard MovieData={Movie} />;
  });

  return (
    <div>
      <h2>MyList</h2>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {MyListComponent}
      </div>
    </div>
  );
}
