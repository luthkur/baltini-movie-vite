import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [search, setSearch] = useState("one");
  const [searchKeyword, setSearchKeyword] = useState("one");

  const clickSearch = () => {
    setSearchKeyword(search);
  };

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className="flex">
        <ul>
          <li>
            <Link to="/">Movie List Beta</Link>
          </li>
          <li>
            <Link to="/my-list">MyList</Link>
          </li>
          <li>
            <div>
              <label className="flex justify-center items-center gap-4">
                Search Movie:
                <input
                  className="border py-2 px-3"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => (e.key === "Enter" ? clickSearch() : null)}
                />
                <button onClick={clickSearch}>Search</button>
              </label>
            </div>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet context={{ searchKeyword }} />
    </div>
  );
}
