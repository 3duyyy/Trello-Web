import { Box, CircularProgress, Container, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import {
  moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { cloneDeep } from 'lodash'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
// React-router-dom
import { useParams } from 'react-router-dom'

const Board = () => {
  const dispatch = useDispatch()
  // Dùng State của Store thay vì dùng State của component
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  useEffect(() => {
    // Call API để lấy dữ liệu cho Board
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  // Func có nhiệm vụ call API và xử lý khi kéo thả Columns xong xuôi: call API cập nhật columnOrderIds của Board chứa nó
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)

    /**
     * Trường hợp dùng Spread Operator ở đây không lỗi bởi vì ta không dùng method làm thay đổi trực tiếp mảng như PUSH ở trên mà chỉ gán lại toàn bộ giá trị columns và columnsOrderIds bằng 2 mảng mới (tương tự như dùng concat)
     */
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    // Call API Update Board khi kéo thả Column
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
  }

  // Khi di chuyển card trong cùng 1 Column: call API cập nhật mảng cardOrderIds của mảng Column chứa nó
  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    /**
     * Cannot assign to read only property 'cards' of object
     * Trường hợp Immutability ở đây đã đụng tới cards được coi là read only bởi vì đây là nested object (can thiệp sâu dữ liệu)
     */
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    // Call API Update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Khi di card giữa 2 column khác nhau:
   * B1: cập nhật lại cardOrderIds của Column ban đầu (xóa _id của Card trong Column cũ)
   * B2: cập nhật lại cardOrderIds của Column tiếp theo (thêm _id của Card kéo thả vào Column mới)
   * B3: cập nhật field columnId cho Card kéo thả
   */
  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    // Update chuẩn dữ liệu State Board
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)

    // Tương tự moveColumn nên không làm ảnh hưởng rules Immutability của Redux Toolkit
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    dispatch(updateCurrentActiveBoard(newBoard))

    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds
    // Xử lý chuẩn dữ liệu để gửi cho BE: khi kéo Card cuối cùng ra khỏi column thì column rỗng sẽ tự gen ra placeholder Card, sẽ bị lỗi format ObjectId ở backend
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    // Call API xử lý BE
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        // 3 trường hợp move giữ nguyên để xử lý kéo thả ở BoardContent không bị quá dài dẫn đến mất kiểm soát khi đọc và maintain
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
