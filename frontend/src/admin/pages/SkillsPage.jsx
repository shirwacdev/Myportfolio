import AdminLayout from '../components/AdminLayout'
import CrudManager from '../components/CrudManager'

const fields = [
  { name: 'name', label: 'Skill Name', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'text', required: true },
  { name: 'level', label: 'Level (0-100)', type: 'number', required: true, min: 0, max: 100, defaultValue: '80' },
  { name: 'order', label: 'Order', type: 'number', min: 0, defaultValue: '0' },
  { name: 'highlight', label: 'Highlight', type: 'checkbox' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'level', label: 'Level', render: (item) => `${item.level}%` },
  { key: 'highlight', label: 'Highlight', render: (item) => (item.highlight ? 'Yes' : 'No') },
]

const SkillsPage = () => (
  <AdminLayout title="Skills" description="Manage skill bars and technology stack entries">
    <CrudManager
      title="Skills"
      singularLabel="Skill"
      description="Control skills shown in the Technologies section."
      resource="skills"
      fields={fields}
      columns={columns}
      emptyState="No skills found."
    />
  </AdminLayout>
)

export default SkillsPage
