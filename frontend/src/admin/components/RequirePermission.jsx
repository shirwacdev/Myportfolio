import { Navigate, useLocation } from 'react-router-dom'
import { hasAdminPermission } from '../utils/authSession'

const RequirePermission = ({ permission, children }) => {
  const location = useLocation()

  if (!hasAdminPermission(permission)) {
    return <Navigate to="/admin" replace state={{ from: location }} />
  }

  return children
}

export default RequirePermission
