import AdminLayout from '../components/AdminLayout'
import CrudManager from '../components/CrudManager'

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'text', required: true },
  { name: 'image', label: 'Image URL', type: 'text', required: true },
  { name: 'liveDemo', label: 'Live Demo URL', type: 'text' },
  { name: 'github', label: 'GitHub URL', type: 'text' },
  { name: 'order', label: 'Order', type: 'number', min: 0, defaultValue: '0' },
  { name: 'featured', label: 'Featured', type: 'checkbox' },
  { name: 'techStack', label: 'Tech Stack (comma separated)', type: 'tags' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  {
    key: 'techStack',
    label: 'Tech Stack',
    render: (item) => (Array.isArray(item.techStack) ? item.techStack.join(', ') : '-'),
  },
  {
    key: 'featured',
    label: 'Featured',
    render: (item) => (item.featured ? 'Yes' : 'No'),
  },
]

const ProjectsPage = () => (
  <AdminLayout title="Projects" description="Manage portfolio projects and featured work">
    <CrudManager
      title="Projects"
      singularLabel="Project"
      description="Create, edit, and remove project entries shown on the website."
      resource="projects"
      fields={fields}
      columns={columns}
      emptyState="No projects found."
    />
  </AdminLayout>
)

export default ProjectsPage
