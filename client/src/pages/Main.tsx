import Layout from "../components/Layout"
import Modal from "../components/Modal"

import { getAllBoards } from "../features/board/boardSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect } from 'react'
import { changeBoardId } from "../features/currentBoardReducer"

const Main = () => {
  const dispatch = useAppDispatch()

  const { boards } = useAppSelector(state => state.board)

  useEffect(() => {
    dispatch(getAllBoards())
  }, [])

  return (
    <>
      <Layout />
      <Modal />
    </>
  )
}
export default Main