import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../hooks'

export function Logout() {

    const { Logout } = useAuth()
    const { navigate } = useNavigate()

    const onLogout = () => {
        Logout()
        navigate('/admin')
    }
  return (
    <Button icon basic color='red' onClick={onLogout}>
        <Icon name='power off' /> Cerrar Sesion 
    </Button>
  )
}
