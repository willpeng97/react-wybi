// components/ProjectProgress.tsx
import { ProgressBar } from 'react-bootstrap';

interface Project {
  id: string;
  name: string;
  progress: number;
  time: string;
  color: string;
}

const projects: Project[] = [
  { id: 'F', name: 'Falcon', progress: 38, time: '12:50:00', color: '#2c7be5' },
  { id: 'R', name: 'Reign', progress: 79, time: '25:20:00', color: '#00d27a' },
  { id: 'B', name: 'Boots4', progress: 90, time: '58:20:00', color: '#27bcfd' },
  { id: 'RV', name: 'Raven', progress: 40, time: '21:20:00', color: '#f5803e' },
  { id: 'S', name: 'Slick', progress: 70, time: '31:20:00', color: '#f5803e' },
];

const ProjectProgress = () => {
  return (
    <div>
      {projects.map((project) => (
        <div key={project.id} className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mr-2"
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                  marginRight: '10px',
                }}
              >
                {project.id}
              </div>
              <div>
                <div className="font-weight-medium">{project.name}</div>
                <div className="text-muted small">{project.progress}%</div>
              </div>
            </div>
            <div className="text-muted">{project.time}</div>
          </div>
          <ProgressBar
            now={project.progress}
            variant="primary"
            style={{ height: '5px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectProgress;