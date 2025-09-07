import React, { useEffect, useState } from "react";
import FishModal from "../components/FishModal";
import { API_URL } from "../secrets";

type Fish = {
  SpeciesName?: string;
  ScientificName?: string;
  Habitat?: string;
  HabitatImpacts?: string;
  ImageGallery?: { src: string; alt?: string; title?: string }[];
};

const Search: React.FC = () => {
  const [data, setData] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        // Sort by Species Name ascending before setting data
        const sortedData = [...json].sort((a, b) => {
          const aName = a.SpeciesName || "";
          const bName = b.SpeciesName || "";
          return aName.localeCompare(bName);
        });
        setData(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const speciesNames = Array.from(
    new Set(data.map((f) => f.SpeciesName).filter(Boolean))
  ).sort((a, b) => (a || "").localeCompare(b || ""));

  const filtered = data.filter((fish) => {
    const matchesSearch =
      !search ||
      (fish.SpeciesName &&
        fish.SpeciesName.toLowerCase().includes(search.toLowerCase()));
    const matchesDropdown = !dropdown || fish.SpeciesName === dropdown;
    return matchesSearch && matchesDropdown;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aName = a.SpeciesName || "";
    const bName = b.SpeciesName || "";
    return sortOrder === "asc"
      ? aName.localeCompare(bName)
      : bName.localeCompare(aName);
  });

  const pageCount = Math.ceil(sorted.length / rowsPerPage);
  const paginatedData = sorted.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div className="search-container">
      <h2>Search</h2>
      <div className="search-bar">
        <div className="search-bar-main">
          <input
            type="text"
            placeholder="Search by species name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="search-input"
          />
          <select
            value={dropdown}
            onChange={(e) => {
              setDropdown(e.target.value);
              setPage(0);
            }}
            className="search-select"
          >
            <option value="">All Species</option>
            {speciesNames.map((name, i) => (
              <option key={i} value={name as string}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="search-bar-right">
          <label className="search-rows-label">
            Rows per page:
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(0);
              }}
              className="search-rows-select"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </label>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <>
          <table className="search-table">
            <thead>
              <tr>
                <th
                  className="search-sort-header"
                  onClick={() => {
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                    setPage(0);
                  }}
                  title="Sort by Species Name"
                >
                  <span>
                    Species Name
                    <span style={{ fontSize: 16 }}>
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  </span>
                </th>
                <th>Scientific Name</th>
                <th>Habitat</th>
                <th>Habitat Impacts</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((fish, idx) => (
                <tr
                  key={idx + page * rowsPerPage}
                  className={`search-table-row${
                    selectedFish === fish ? " selected" : ""
                  }`}
                  onClick={() => setSelectedFish(fish)}
                  tabIndex={0}
                  title="Click to view details"
                >
                  <td>{fish.SpeciesName || "N/A"}</td>
                  <td>{fish.ScientificName || "N/A"}</td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: fish.Habitat || "N/A",
                      }}
                    />
                  </td>
                  <td>{fish.HabitatImpacts || "N/A"}</td>
                  <td>
                    {fish.ImageGallery && fish.ImageGallery.length > 0 ? (
                      <div className="search-images">
                        {fish.ImageGallery.slice(0, 2).map((img, i) => (
                          <img
                            key={i}
                            src={img.src}
                            alt={img.alt}
                            title={img.title}
                            style={{ maxWidth: 80, maxHeight: 80 }}
                          />
                        ))}
                      </div>
                    ) : (
                      "No images"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="search-pagination">
            <button onClick={() => setPage(0)} disabled={page === 0}>
              &laquo; First
            </button>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              &lsaquo; Prev
            </button>
            <span>
              Page {page + 1} of {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page >= pageCount - 1}
            >
              Next &rsaquo;
            </button>
            <button
              onClick={() => setPage(pageCount - 1)}
              disabled={page >= pageCount - 1}
            >
              Last &raquo;
            </button>
          </div>
        </>
      )}
      <FishModal fish={selectedFish} onClose={() => setSelectedFish(null)} />
    </div>
  );
};

export default Search;
