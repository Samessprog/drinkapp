//Imports
import { Navigate } from "react-router-dom"
import { useContext } from "react"

import { SessionContext } from "../Session/SessionContext"

function PrivateRoute({ element }) {
  const userSession = useContext(SessionContext).userSesion

  if (!userSession) {
    return <Navigate to={'/'} replace />
  }

  return element
}

export default PrivateRoute
