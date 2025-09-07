import React from "react";

const About: React.FC = () => {
  return (
    <div>
      <h2>About</h2>
      <p>This is the About page for the ABR Assessment Submission React app.</p>
      <h3>About the Search Page</h3>
      <p>
        The Search page allows users to explore a comprehensive list of fish
        species. It provides the following features:
      </p>
      <ul>
        <li>Search by species name using a text input.</li>
        <li>Filter the list by selecting a species from a dropdown menu.</li>
        <li>
          Sort the table of fish alphabetically by species name (A–Z or Z–A)
          using the table header.
        </li>
        <li>
          Paginate results, with a user-selectable number of rows per page (10
          or 25).
        </li>
        <li>
          Click on any row to view detailed information about the fish in a
          modal window.
        </li>
        <li>
          View images, scientific names, habitat, and other details for each
          fish.
        </li>
        <li>Navigate to related species via alias links.</li>
      </ul>
      <p>
        The Search page is designed for easy navigation, quick filtering, and
        detailed exploration of fish data.
      </p>
    </div>
  );
};

export default About;
