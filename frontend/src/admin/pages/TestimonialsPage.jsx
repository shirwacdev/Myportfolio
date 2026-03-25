import AdminLayout from '../components/AdminLayout'
import CrudManager from '../components/CrudManager'

const fields = [
  { name: 'clientName', label: 'Client Name', type: 'text', required: true },
  { name: 'role', label: 'Role', type: 'text', required: true },
  { name: 'company', label: 'Company', type: 'text', required: true },
  { name: 'avatar', label: 'Avatar URL', type: 'text' },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', required: true, min: 1, max: 5, defaultValue: '5' },
  { name: 'order', label: 'Order', type: 'number', min: 0, defaultValue: '0' },
  { name: 'quote', label: 'Quote', type: 'textarea', required: true },
]

const columns = [
  { key: 'clientName', label: 'Client' },
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'rating', label: 'Rating', render: (item) => `${item.rating}/5` },
]

const TestimonialsPage = () => (
  <AdminLayout title="Testimonials" description="Manage client quotes and credibility section">
    <CrudManager
      title="Testimonials"
      singularLabel="Testimonial"
      description="Create and manage social proof cards shown publicly."
      resource="testimonials"
      fields={fields}
      columns={columns}
      emptyState="No testimonials found."
    />
  </AdminLayout>
)

export default TestimonialsPage
