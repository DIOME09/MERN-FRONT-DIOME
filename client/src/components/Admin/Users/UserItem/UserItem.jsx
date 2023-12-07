import React, { useState } from 'react'
import { Image, Button, Icon, Confirm } from 'semantic-ui-react'
import { image } from '../../../../assets'
import { User } from '../../../../api'
import { useAuth } from '../../../../hooks'
import { BasicModal } from '../../../shared'
import { ENV } from '../../../../utils'
import { UserForm } from '../UserForm'
import './UserItem.scss'

export function UserItem(props) {
  const { user, onReload } = props
  const { accessToken } = useAuth()

  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')

  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [isDelete, setIsDelete] = useState(false)

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState)
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState)

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`)
    onOpenCloseModal()
  }

  const openDesactivateActiveConfirm = () => {
    setIsDelete(false)
    setConfirmMessage(user.active ? `Desactivar Usuario ${user.email}` : `Activar Usuario ${user.email}`)
    onOpenCloseConfirm()
  }

  const onActiveDesactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      })
      onReload()
      onOpenCloseConfirm()
    } catch (error) {
      console.error(error)
    }
  }

  const openDeleteConfirm = () => {
    setIsDelete(true)
    setConfirmMessage(`Eliminar Usuario ${user.email}`)
    onOpenCloseConfirm()
  }

  const onDelete = async () => {
    try {
      await userController.deleteUser(accessToken, user._id)
      onReload()
      onOpenCloseConfirm()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='user-item'>
        <div className='user-item__info'>
          <Image
          avatar src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar} />
          <div>
            <p>
              {user.firstname} {user.lastname}
            </p>
            <p>{user.email}</p>
          </div>
        </div>

        <div>
          <Button icon primary onClick={openUpdateUser}>
            <Icon name='pencil'/>
          </Button>
          <Button icon color={user.active ? 'orange' : 'teal'} onClick={openDesactivateActiveConfirm}>
            <Icon name={user.active ? 'ban' : 'check'}/>
          </Button>
          <Button icon color='red' onClick={openDeleteConfirm}>
            <Icon name='trash'/>
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} onreload={onReload} user={user}/>
      </BasicModal>

      <Confirm open={showConfirm} onCancel={onOpenCloseConfirm} onConfirm={isDelete ? onDelete : onActiveDesactivate} content={confirmMessage} size='mini'/>
    </>
  );
}
