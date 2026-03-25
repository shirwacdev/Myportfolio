import AdminLayout from '../components/AdminLayout'
import CrudManager from '../components/CrudManager'

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'icon', label: 'Icon Key', type: 'text' },
  { name: 'order', label: 'Order', type: 'number', min: 0, defaultValue: '0' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'icon', label: 'Icon' },
  { key: 'order', label: 'Order' },
]

const ServicesPage = () => (
  <AdminLayout title="Services" description="Manage service cards shown on the public site">
    <CrudManager
      title="Services"
      singularLabel="Service"
      description="Update your offerings and card ordering."
      resource="services"
      fields={fields}
      columns={columns}
      emptyState="No services found."
    />
  </AdminLayout>
)

export default ServicesPage
