import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/app.store';

type Props = {
  children: ReactNode
}

export default function Authenticate({ children }: Props) {
  const navigate = useNavigate();

  const { isAuth } = useAppStore()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])



  return (
    <>{children}</>
  )
}
