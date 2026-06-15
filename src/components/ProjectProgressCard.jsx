import { financeData } from "../data/salomonFinance";

function ProjectProgressCard() {
  const projects = financeData.goals.filter((goal) =>
    ["Maison Guinée", "Retour en Guinée", "Retraite"].includes(goal.name)
  );

  return (
    <div style={cardStyle}>
      <h2>Projets en cours</h2>

      {projects.map((project) => (
        <div key={project.name} style={projectRow}>
          <div>
            <h3>{project.name}</h3>
            <p>{project.progress}%</p>
          </div>

          <div style={barBg}>
            <div
              style={{
                width: `${project.progress}%`,
                height: "100%",
                background: "#4da3ff",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  background: "#0d1d33",
  border: "1px solid #1d3355",
  borderRadius: "16px",
  padding: "20px",
  minHeight: "260px",
};

const projectRow = {
  marginTop: "14px",
  padding: "12px",
  borderRadius: "12px",
  background: "#081427",
};

const barBg = {
  height: "8px",
  background: "#020817",
  borderRadius: "10px",
  marginTop: "10px",
};

export default ProjectProgressCard;