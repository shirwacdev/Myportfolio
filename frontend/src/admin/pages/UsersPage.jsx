import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import {
  changeAdminCredentials,
  createUser,
  deleteUser,
  fetchUsers,
  fetchUsersMeta,
  updateUser,
  updateUserPassword,
} from '../api/adminApi'
import { setAdminUser } from '../utils/authSession'

const INITIAL_USER_FORM = {
  username: '',
  email: '',
  password: '',
  role: 'admin',
  permissions: [],
  isActive: true,
}

const INITIAL_CREDENTIAL_FORM = {
  currentPassword: '',
  newUsername: '',
  newPassword: '',
}

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [meta, setMeta] = useState({ roles: [], permissions: [], roleDefaults: {} })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [userForm, setUserForm] = useState(INITIAL_USER_FORM)

  const [credentialForm, setCredentialForm] = useState(INITIAL_CREDENTIAL_FORM)
  const [credentialSaving, setCredentialSaving] = useState(false)
  const [credentialMessage, setCredentialMessage] = useState('')
  const [credentialError, setCredentialError] = useState('')

  const loadUsersData = async () => {
    try {
      setLoading(true)
      setError('')
      const [usersData, metaData] = await Promise.all([fetchUsers(), fetchUsersMeta()])
      setUsers(usersData)
      setMeta(metaData)
    } catch (loadError) {
      setError(loadError.message || 'Could not load users.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsersData()
  }, [])

  const roleOptions = useMemo(() => meta.roles || [], [meta.roles])
  const permissionOptions = useMemo(() => meta.permissions || [], [meta.permissions])

  const setDefaultPermissionsForRole = (role) => {
    const defaults = meta.roleDefaults?.[role] || []
    setUserForm((prev) => ({
      ...prev,
      role,
      permissions: role === 'super_admin' ? [...permissionOptions] : [...defaults],
    }))
  }

  const onUserFormChange = (event) => {
    const { name, value, type, checked } = event.target

    if (name === 'role') {
      setDefaultPermissionsForRole(value)
      return
    }

    setUserForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const togglePermission = (permission) => {
    setUserForm((prev) => {
      if (prev.role === 'super_admin') return prev

      const hasPermission = prev.permissions.includes(permission)
      const nextPermissions = hasPermission
        ? prev.permissions.filter((item) => item !== permission)
        : [...prev.permissions, permission]

      return {
        ...prev,
        permissions: nextPermissions,
      }
    })
  }

  const resetUserForm = () => {
    setEditingUser(null)
    setUserForm({
      ...INITIAL_USER_FORM,
      role: roleOptions.includes('admin') ? 'admin' : roleOptions[0] || 'admin',
      permissions: meta.roleDefaults?.admin || [],
    })
  }

  const beginEdit = (user) => {
    setEditingUser(user)
    setUserForm({
      username: user.username || '',
      email: user.email || '',
      password: '',
      role: user.role || 'admin',
      permissions: Array.isArray(user.permissions) ? user.permissions : [],
      isActive: Boolean(user.isActive),
    })
    setError('')
    setSuccess('')
  }

  const onSaveUser = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        username: userForm.username.trim(),
        email: userForm.email.trim(),
        role: userForm.role,
        permissions: userForm.role === 'super_admin' ? [...permissionOptions] : userForm.permissions,
        isActive: userForm.isActive,
      }

      if (editingUser?._id) {
        await updateUser(editingUser._id, payload)
        setSuccess('User updated successfully.')
      } else {
        await createUser({
          ...payload,
          password: userForm.password,
        })
        setSuccess('User created successfully.')
      }

      await loadUsersData()
      resetUserForm()
    } catch (saveError) {
      setError(saveError.message || 'Could not save user.')
    } finally {
      setSaving(false)
    }
  }

  const onDeleteUser = async (id) => {
    const accepted = window.confirm('Delete this user account?')
    if (!accepted) return

    try {
      setError('')
      setSuccess('')
      await deleteUser(id)
      await loadUsersData()
      if (editingUser?._id === id) {
        resetUserForm()
      }
      setSuccess('User deleted successfully.')
    } catch (deleteError) {
      setError(deleteError.message || 'Could not delete user.')
    }
  }

  const onResetUserPassword = async (id) => {
    const nextPassword = window.prompt('Enter new password (min 5 chars):')
    if (!nextPassword) return

    try {
      setError('')
      setSuccess('')
      await updateUserPassword(id, nextPassword)
      setSuccess('User password updated successfully.')
    } catch (passwordError) {
      setError(passwordError.message || 'Could not update user password.')
    }
  }

  const onCredentialChange = (event) => {
    const { name, value } = event.target
    setCredentialForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onUpdateMyCredentials = async (event) => {
    event.preventDefault()
    setCredentialSaving(true)
    setCredentialError('')
    setCredentialMessage('')

    try {
      const response = await changeAdminCredentials({
        currentPassword: credentialForm.currentPassword,
        newUsername: credentialForm.newUsername,
        newPassword: credentialForm.newPassword,
      })

      setAdminUser(response.user)
      setCredentialMessage('Credentials updated successfully.')
      setCredentialForm(INITIAL_CREDENTIAL_FORM)
      await loadUsersData()
    } catch (updateError) {
      setCredentialError(updateError.message || 'Could not update credentials.')
    } finally {
      setCredentialSaving(false)
    }
  }

  return (
    <AdminLayout title="Users" description="Manage admin users, permissions, and account credentials">
      <section className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-soft)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">My Credentials</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Change your username and password using your current password.
        </p>

        <form onSubmit={onUpdateMyCredentials} className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Current Password</span>
            <input
              type="password"
              name="currentPassword"
              value={credentialForm.currentPassword}
              onChange={onCredentialChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">New Username</span>
            <input
              type="text"
              name="newUsername"
              value={credentialForm.newUsername}
              onChange={onCredentialChange}
              placeholder="Optional"
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">New Password</span>
            <input
              type="password"
              name="newPassword"
              value={credentialForm.newPassword}
              onChange={onCredentialChange}
              placeholder="Optional"
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={credentialSaving}
              className="rounded-full bg-[var(--brand-deep)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:bg-[var(--brand-strong)] disabled:opacity-70"
            >
              {credentialSaving ? 'Updating...' : 'Update Credentials'}
            </button>
          </div>
        </form>

        {credentialError ? (
          <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-300">
            {credentialError}
          </p>
        ) : null}
        {credentialMessage ? (
          <p className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-300">
            {credentialMessage}
          </p>
        ) : null}
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            {editingUser ? `Edit User: ${editingUser.username}` : 'Create User'}
          </h2>
          {editingUser ? (
            <button
              type="button"
              onClick={resetUserForm}
              className="rounded-full border border-[var(--border-soft)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>

        <form onSubmit={onSaveUser} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Username</span>
            <input
              type="text"
              name="username"
              value={userForm.username}
              onChange={onUserFormChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Email</span>
            <input
              type="email"
              name="email"
              value={userForm.email}
              onChange={onUserFormChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          {!editingUser ? (
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Password</span>
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={onUserFormChange}
                required
                minLength={5}
                className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
              />
            </label>
          ) : null}

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Role</span>
            <select
              name="role"
              value={userForm.role}
              onChange={onUserFormChange}
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <label className="sm:col-span-2 inline-flex items-center gap-2 text-sm text-[var(--text-primary)]">
            <input
              type="checkbox"
              name="isActive"
              checked={userForm.isActive}
              onChange={onUserFormChange}
              className="h-4 w-4 rounded border-[var(--border-soft)]"
            />
            Active account
          </label>

          <div className="sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Permissions</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {permissionOptions.map((permission) => (
                <label key={permission} className="inline-flex items-center gap-2 text-sm text-[var(--text-primary)]">
                  <input
                    type="checkbox"
                    checked={userForm.role === 'super_admin' || userForm.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    disabled={userForm.role === 'super_admin'}
                    className="h-4 w-4 rounded border-[var(--border-soft)]"
                  />
                  {permission}
                </label>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[var(--brand-deep)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:bg-[var(--brand-strong)] disabled:opacity-70"
            >
              {saving ? 'Saving...' : editingUser ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>

        {error ? (
          <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-300">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-300">
            {success}
          </p>
        ) : null}
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-soft)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Users List</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Manage existing users and their account access.</p>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface-muted)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Username</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Permissions</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-4 text-[var(--text-muted)]" colSpan={6}>
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-[var(--text-muted)]" colSpan={6}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-t border-[var(--border-soft)] align-top">
                    <td className="px-4 py-3 text-[var(--text-primary)]">{user.username}</td>
                    <td className="px-4 py-3 text-[var(--text-primary)]">{user.email}</td>
                    <td className="px-4 py-3 text-[var(--text-primary)]">{user.role}</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">
                      {(user.permissions || []).join(', ') || '-'}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-primary)]">{user.isActive ? 'Active' : 'Disabled'}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => beginEdit(user)}
                          className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onResetUserPassword(user._id)}
                          className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                          Reset Password
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteUser(user._id)}
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
      </section>
    </AdminLayout>
  )
}

export default UsersPage
