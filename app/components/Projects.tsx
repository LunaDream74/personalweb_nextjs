import ProjectCard from './ProjectCard'; // Import the new card component

// Define project as an array of objects
const projectData = [
  {
    title: 'Conveyor Belt Inspection',
    description: 'Automated conveyor inspection system uses sensors, cameras, and intelligent control to ensure every can meets quality standards.',
    tags: ['Microcontroller', 'C/C++', 'Embedded'],
    imageId: null // No ID for the first card
  },
  {
    title: 'Mini Elevator Model',
    description: 'Simulates real-world elevator, designed for education and research, it showcases key principles of automation and embedded control systems.',
    tags: ['Microcontroller', 'C/C++', 'Embedded'],
    imageId: 'Elevator' // This will match #Elevator in CSS
  },
  {
    title: 'Sonar Imaging',
    description: 'Extract data from COVIS and visualize plumes to effectively showcase changes in bending and structure of hydrothermal systems.',
    tags: ['Visualization', 'Python'],
    imageId: 'COVIS' // This will match #COVIS in CSS
  }
];

function Projects() {
  return (
    <section id="projects" className="section container" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title">Projects</h2>

      <div className="projects-grid" id="projectsGrid">
        {/* Map over the data array and render a card for each project */}
        {projectData.map((project) => (
          <ProjectCard
            key={project.title} // A unique 'key' is required for lists in React
            title={project.title}
            description={project.description}
            tags={project.tags}
            imageId={project.imageId}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;