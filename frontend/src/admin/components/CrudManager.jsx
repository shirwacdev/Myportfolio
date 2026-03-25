import { useCallback, useEffect, useMemo, useState } from 'react'
import { createItem, deleteItem, fetchCollection, updateItem } from '../api/adminApi'

const readFormFromItem = (fields, item) =>
  fields.reduce((acc, field) => {
    const value = item?.[field.name]

    if (field.type === 'checkbox') {
      acc[field.name] = Boolean(value)
    } else if (field.type === 'tags') {
      acc[field.name] = Array.isArray(value) ? value.join(', ') : ''
    } else if (field.type === 'number') {
      acc[field.name] = typeof value === 'number' ? String(value) : field.defaultValue || '0'
    } else {
      acc[field.name] = value ?? field.defaultValue ?? ''
    }

    return acc
  }, {})

const CrudManager = ({
  title,
  singularLabel,
  description,
  resource,
  fields,
  columns,
  prepareSubmit,
  emptyState = 'No records found.',
}) => {
  const singular = singularLabel || title
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [formValues, setFormValues] = useState(() => readFormFromItem(fields, {}))

  const loadItems = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetchCollection(resource)
      setItems(response)
    } catch (loadError) {
      setError(loadError.message || `Could not load ${title.toLowerCase()}.`)
    } finally {
      setLoading(false)
    }
  }, [resource, title])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  const closeForm = () => {
    setFormOpen(false)
    setEditingItem(null)
    setFormError('')
    setFormValues(readFormFromItem(fields, {}))
  }

  const openCreateForm = () => {
    setEditingItem(null)
    setFormValues(readFormFromItem(fields, {}))
    setFormError('')
    setFormOpen(true)
  }

  const openEditForm = (item) => {
    setEditingItem(item)
    setFormValues(readFormFromItem(fields, item))
    setFormError('')
    setFormOpen(true)
  }

  const onFormChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const parseValue = (field, value) => {
    if (field.type === 'number') {
      return value === '' ? 0 : Number(value)
    }

    if (field.type === 'tags') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }

    if (field.type === 'checkbox') {
      return Boolean(value)
    }

    return value
  }

  const toPayload = useMemo(
    () =>
      prepareSubmit ||
      ((values) =>
        fields.reduce((acc, field) => {
          acc[field.name] = parseValue(field, values[field.name])
          return acc
        }, {})),
    [fields, prepareSubmit],
  )

  const onSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setFormError('')

    try {
      const payload = toPayload(formValues)

      if (editingItem?._id) {
        await updateItem(resource, editingItem._id, payload)
      } else {
        await createItem(resource, payload)
      }

      await loadItems()
      closeForm()
    } catch (saveError) {
      setFormError(saveError.message || 'Could not save item.')
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (id) => {
    const accepted = window.confirm('Delete this item? This action cannot be undone.')
    if (!accepted) return

    try {
      await deleteItem(resource, id)
      await loadItems()
    } catch (deleteError) {
      setError(deleteError.message || 'Could not delete item.')
    }
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
          {description ? <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p> : null}
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="rounded-full bg-[var(--brand-deep)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:bg-[var(--brand-strong)]"
        >
          Add New
        </button>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface-muted)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-3 font-semibold">
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-4 text-[var(--text-muted)]" colSpan={columns.length + 1}>
                    Loading...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-[var(--text-muted)]" colSpan={columns.length + 1}>
                    {emptyState}
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="border-t border-[var(--border-soft)] align-top">
                    {columns.map((column) => (
                      <td key={`${item._id}-${column.key}`} className="px-4 py-3 text-[var(--text-primary)]">
                        {column.render ? column.render(item) : item[column.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(item)}
                          className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(item._id)}
                          className="rounded-full border border-red-300/50 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {formOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-2xl rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-hard)]"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {editingItem ? `Edit ${singular}` : `Add ${singular}`}
              </h3>
              <button
                type="button"
                onClick={closeForm}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-soft)] text-[var(--text-muted)]"
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <label
                  key={field.name}
                  className={`block ${field.type === 'textarea' || field.type === 'tags' ? 'sm:col-span-2' : ''}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {field.label}
                  </span>

                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={onFormChange}
                      rows={4}
                      required={field.required}
                      className="mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 py-2 text-sm outline-none focus:border-[var(--brand-primary)]"
                    />
                  ) : field.type === 'checkbox' ? (
                    <span className="mt-2 inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name={field.name}
                        checked={Boolean(formValues[field.name])}
                        onChange={onFormChange}
                        className="h-4 w-4 rounded border-[var(--border-soft)]"
                      />
                      Enabled
                    </span>
                  ) : (
                    <input
                      type={field.type === 'number' ? 'number' : 'text'}
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={onFormChange}
                      required={field.required}
                      min={field.type === 'number' ? field.min : undefined}
                      max={field.type === 'number' ? field.max : undefined}
                      placeholder={field.placeholder}
                      className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
                    />
                  )}
                </label>
              ))}
            </div>

            {formError ? (
              <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-300">
                {formError}
              </p>
            ) : null}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-full border border-[var(--border-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[var(--brand-deep)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:bg-[var(--brand-strong)] disabled:opacity-70"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  )
}

export default CrudManager
