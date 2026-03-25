import AdminLayout from '../components/AdminLayout'
import CrudManager from '../components/CrudManager'

const fields = [
  { name: 'role', label: 'Role', type: 'text', required: true },
  { name: 'company', label: 'Company', type: 'text', required: true },
  { name: 'year', label: 'Year', type: 'text', required: true },
  { name: 'order', label: 'Order', type: 'number', min: 0, defaultValue: '0' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
]

const columns = [
  { key: 'role', label: 'Role' },
  { key: 'company', label: 'Company' },
  { key: 'year', label: 'Year' },
]

const ExperiencePage = () => (
  <AdminLayout title="Experience" description="Manage professional timeline records">
    <CrudManager
      title="Experience"
      singularLabel="Experience Item"
      description="Update roles, periods, and descriptions for your journey section."
      resource="experience"
      fields={fields}
      columns={columns}
      emptyState="No experience items found."
    />
  </AdminLayout>
)

export default ExperiencePage
