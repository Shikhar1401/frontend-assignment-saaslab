import React from "react";

const ProjectTable = ({ projects }) => {    
  if (projects.length === 0) {
    return (
      <div role="alert" aria-live="assertive">
        No projects available.
      </div>
    );
  }

  return (
    <table className="table" aria-labelledby="projectTableHeading">
      <caption id="projectTableHeading">Highly Rated Kickstarter Projects</caption>
      <thead>
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Percentage Funded</th>
          <th scope="col">Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => {
          return (
            <tr key={project.sNo}>
              <td>{project?.sNo}</td>
              <td>{project?.percentageFunded || 0 }%</td>
              <td>
                <span
                  aria-label={`Amount pledged: ${project?.amountPledged.toLocaleString() || 0}`}
                >
                  ${project?.amountPledged.toLocaleString()}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProjectTable;
