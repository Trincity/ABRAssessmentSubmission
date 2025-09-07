import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../secrets";

interface FishData {
  SpeciesName?: string;
  ScientificName?: string;
  SpeciesAliases?: string;
  SpeciesIllustrationPhoto?: { src: string; alt?: string; title?: string };
  [key: string]: any;
}

const SpeciesAliasPage: React.FC = () => {
  const { alias } = useParams<{ alias: string }>();
  const [fish, setFish] = useState<FishData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Find the fish whose SpeciesAliases contains a link with the alias as the last segment
        const found = data.find((f: FishData) => {
          if (!f.SpeciesAliases) return false;
          const div = document.createElement("div");
          div.innerHTML = f.SpeciesAliases;
          const links = Array.from(div.querySelectorAll("a"));
          return links.some((a) => {
            const href = a.getAttribute("href") || "";
            const match = href.match(/\/species-aliases\/([^/]+)/);
            return (
              match && match[1].toLowerCase() === (alias || "").toLowerCase()
            );
          });
        });
        setFish(found || null);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [alias]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!fish) return <div>No fish found for alias "{alias}".</div>;

  return (
    <div>
      <h1>{fish.SpeciesName}</h1>
      {fish.SpeciesIllustrationPhoto && fish.SpeciesIllustrationPhoto.src && (
        <img
          src={fish.SpeciesIllustrationPhoto.src}
          alt={fish.SpeciesIllustrationPhoto.alt || fish.SpeciesName}
          title={fish.SpeciesIllustrationPhoto.title || fish.SpeciesName}
          style={{
            maxWidth: 200,
            maxHeight: 200,
            display: "block",
            marginBottom: 16,
          }}
        />
      )}
      <p>
        <strong>Scientific Name:</strong> {fish.ScientificName}
      </p>
      {fish.SpeciesAliases && (
        <p>
          <strong>Aliases:</strong>{" "}
          {(() => {
            // Parse the HTML string to extract alias links and names
            const div = document.createElement("div");
            div.innerHTML = fish.SpeciesAliases;
            const links = Array.from(div.querySelectorAll("a"));
            return links.map((a, i) => (
              <React.Fragment key={i}>
                <Link to={a.getAttribute("href") || "#"}>{a.textContent}</Link>
                {i < links.length - 1 ? ", " : ""}
              </React.Fragment>
            ));
          })()}
        </p>
      )}
      {/* Add more details as needed */}
      <Link to="/search">Back to Search</Link>
    </div>
  );
};

export default SpeciesAliasPage;
