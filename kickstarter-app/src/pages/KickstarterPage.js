import React, { useState, useEffect } from "react";
import { fetchKickstarterProjects } from "../services/api";
import ProjectTable from "../../src/components/projectTable";
import Pagination from "../../src/components/pagination";
import "../styles.css";

const KickstarterPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKickstarterProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(projects.length / recordsPerPage);
  const displayedProjects = projects.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{ padding: "20px", fontSize: "18px" }}
      >
        Loading projects, please wait...
      </div>
    );
  }

  return (
    <div className="container" aria-labelledby="kickstarterPageHeading">
      <h2 id="kickstarterPageHeading" className="title">
        Highly Rated Kickstarter Projects
      </h2>
      {error && (
        <div
          className="error"
          role="alert"
          aria-live="assertive"
          style={{ color: "red", fontWeight: "bold" }}
        >
          {error}
        </div>
      )}
      <section aria-labelledby="projectTableSection">
        <ProjectTable projects={displayedProjects} />
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default KickstarterPage;
