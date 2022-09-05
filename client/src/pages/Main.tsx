import Layout from "../components/Layout"
import Modal from "../components/Modal"

import { getAllBoards } from "../features/board/boardSlice"
import { useAppDispatch } from "../app/hooks"
import { useEffect } from 'react'

const Main = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllBoards())
  }, [dispatch])
  
  return (
    <>
      <Layout />
      <Modal />
    </>
  )
}
export default Main