//Imports
import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { SessionContext } from "../Session/SessionContext"

function AdminRoute({ element }) {
    const userSession = useContext(SessionContext).userSesion

    if (!userSession || userSession.role !== 'admin') {
        return <Navigate to={'/'} replace />
    }
    return element
}

export default AdminRoute
