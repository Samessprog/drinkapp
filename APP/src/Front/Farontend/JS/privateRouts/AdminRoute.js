//Imports
import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { SessionContext } from "../Session/SessionContext"

function AdminRoute({ element }) {
    const userSesion = useContext(SessionContext).userSesion

    if (!userSesion || userSesion.role !== 'admin') {
        return <Navigate to={'/'} replace />
    }
    return element
}

export default AdminRoute
