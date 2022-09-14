import Layout from "../components/Layout"
import Modal from "../components/Modal"

import { getAllBoards, resetBoard } from "../features/board/boardSlice"
import { reset } from "../features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { setProgress } from "../features/progressBarReducer"


const Main = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { user, isLoading } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (user && user.name) {
      dispatch(getAllBoards())
    }

    dispatch(reset())
    dispatch(resetBoard())
  }, [dispatch, navigate, user, isLoading])


  return (
    <>
      <Layout />
      <Modal />
    </>
  )
}
export default Main