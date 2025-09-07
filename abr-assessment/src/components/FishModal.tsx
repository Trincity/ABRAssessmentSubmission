import React from "react";

interface FishModalProps {
  fish: any;
  onClose: () => void;
}

const FishModal: React.FC<FishModalProps> = ({ fish, onClose }) => {
  if (!fish) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal-body">
          {/* Main Title and Illustration */}
          <h2 style={{ marginTop: 0 }}>{fish.SpeciesName || "N/A"}</h2>
          {fish.SpeciesIllustrationPhoto &&
            fish.SpeciesIllustrationPhoto.src && (
              <div className="modal-illustration">
                <img
                  src={fish.SpeciesIllustrationPhoto.src}
                  alt={fish.SpeciesIllustrationPhoto.alt || fish.SpeciesName}
                  title={
                    fish.SpeciesIllustrationPhoto.title || fish.SpeciesName
                  }
                  className="modal-illustration-img"
                />
              </div>
            )}

          {/* Scientific Name */}
          <p>
            <strong>Scientific Name:</strong> {fish.ScientificName || "N/A"}
          </p>

          {/* Aliases */}
          {fish.SpeciesAliases && (
            <p>
              <strong>Aliases:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: fish.SpeciesAliases }} />
            </p>
          )}

          {/* Location */}
          {fish.Location && (
            <div>
              <strong>Location:</strong>
              <div dangerouslySetInnerHTML={{ __html: fish.Location }} />
            </div>
          )}

          {/* Habitat */}
          {fish.Habitat && (
            <div>
              <strong>Habitat:</strong>
              <div dangerouslySetInnerHTML={{ __html: fish.Habitat }} />
            </div>
          )}

          {/* Habitat Impacts */}
          {fish.HabitatImpacts && (
            <p>
              <strong>Habitat Impacts:</strong> {fish.HabitatImpacts}
            </p>
          )}

          {/* Population Status */}
          {fish.PopulationStatus && (
            <div>
              <strong>Population Status:</strong>
              <div
                dangerouslySetInnerHTML={{ __html: fish.PopulationStatus }}
              />
            </div>
          )}

          {/* Image Gallery */}
          {fish.ImageGallery && fish.ImageGallery.length > 0 && (
            <div className="modal-gallery">
              {fish.ImageGallery.map(
                (
                  img: { src: string; alt?: string; title?: string },
                  i: number
                ) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    title={img.title}
                    className="modal-gallery-img"
                  />
                )
              )}
            </div>
          )}

          {/* Biology */}
          {fish.Biology && (
            <div>
              <strong>Biology:</strong>
              <div dangerouslySetInnerHTML={{ __html: fish.Biology }} />
            </div>
          )}

          {/* Harvest */}
          {fish.Harvest && (
            <div>
              <strong>Harvest:</strong>
              <div dangerouslySetInnerHTML={{ __html: fish.Harvest }} />
            </div>
          )}

          {/* Health Benefits */}
          {fish.HealthBenefits && (
            <div>
              <strong>Health Benefits:</strong>
              <div dangerouslySetInnerHTML={{ __html: fish.HealthBenefits }} />
            </div>
          )}

          {/* Taste & Texture */}
          {fish.Taste && (
            <div>
              <strong>Taste:</strong>
              <div dangerouslySetInnerHTML={{ __html: fish.Taste }} />
            </div>
          )}
          {fish.Texture && (
            <div>
              <strong>Texture:</strong>
              <div dangerouslySetInnerHTML={{ __html: fish.Texture }} />
            </div>
          )}

          {/* Other fields (simple values) */}
          {Object.entries(fish).map(([key, value]) => {
            if (
              [
                "SpeciesName",
                "ScientificName",
                "Habitat",
                "HabitatImpacts",
                "ImageGallery",
                "SpeciesIllustrationPhoto",
                "SpeciesAliases",
                "Location",
                "PopulationStatus",
                "Biology",
                "Harvest",
                "HealthBenefits",
                "Taste",
                "Texture",
                "Path",
                "last_update",
              ].includes(key)
            )
              return null;
            if (!value) return null;
            // Render HTML for known HTML fields
            if (typeof value === "string" && value.startsWith("<")) {
              return (
                <div key={key}>
                  <strong>{key}:</strong>
                  <div dangerouslySetInnerHTML={{ __html: value }} />
                </div>
              );
            }
            // Render images for objects with src
            if (typeof value === "object" && value && (value as any).src) {
              return (
                <div key={key} className="modal-extra-img-row">
                  <strong>{key}:</strong>
                  <img
                    src={(value as any).src}
                    alt={(value as any).alt || key}
                    className="modal-gallery-img"
                  />
                </div>
              );
            }
            return (
              <p key={key}>
                <strong>{key}:</strong>{" "}
                {typeof value === "string" ? value : JSON.stringify(value)}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FishModal;
