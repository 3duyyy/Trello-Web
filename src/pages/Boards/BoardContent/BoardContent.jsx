import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/TrelloCard/TrelloCard'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board }) => {
  // =========dndkit sensors==========
  const mouseSensor = useSensor(MouseSensor, {
    // Yêu cầu chuột di chuyển 10px thì kích hoạt event
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Nhấn giữ khoảng 250ms, dung sai của cảm ứng là 5px thì kích hoạt event
    activationConstraint: { delay: 250, tolerance: 500 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  // =========States==========
  const [orderedColumns, setOrderedColumns] = useState([])
  // Tại 1 thời điểm chỉ có thể kéo thả card hoặc column
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)

  // =========Sort Columns theo API==========
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // =========Xử lý sự kiện==========
  // Tìm một Column theo 1 CardId
  const findColumnByCardId = (cardId) => {
    // Lưu ý dùng column.cards thay vì column.cardOrderIds vì ở handleDragOver chúng
    // ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo cardOrderIds mới
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    )
  }

  // Func chung xử lý cập nhật lại state khi di card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      // Tìm vị trí của overCard trong column đích (nơi activeCard thả)
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      )

      // Logic tính toán "cardIndex mới" (trên hoặc dưới overCard) lấy chuẩn từ code của thư viện
      // rect: vị trí của phần tử so với viewport (đã được thư viện tính toán)
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      let newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1

      // Clone mảng orderedColumns ra để xử lý và return cập nhật lại state
      const nextColumns = cloneDeep(prevColumns)
      // Column cũ
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      )
      // Column mới
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      )

      // Xử lý column cũ
      if (nextActiveColumn) {
        // Xóa card ở cái column active (có thể hiểu là column ban đầu chứa nó)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        // Cập nhật lại cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        )
      }

      // Xử lý column mới
      if (nextOverColumn) {
        // Kiểm tra card đang kéo tồn tại ở overColumn chưa, nếu có thì cần xóa đi trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        // Phải cập nhật chuẩn dữ liệu columndId sau khi kéo thả card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        // Thêm card đang kéo vào overColumn theo index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        )
        // Cập nhật lại cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        )
      }

      return nextColumns
    })
  }

  // Trigger khi bắt đầu kéo 1 phần tử
  const handleDragStart = (e) => {
    // console.log('handleDragStart', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(
      e?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(e?.active?.data.current)

    // Nếu kéo Card thì thực hiện set giá trị cho oldColumn
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
    }
  }

  // Trigger khi đang kéo 1 phần tử
  const handleDragOver = (e) => {
    // Không xử lý gì nếu đang kéo thả column vì kéo thả column ổn rồi
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    console.log('handleDragOver:', e)

    const { active, over } = e

    // Kiểm tra nếu không tồn tại active hoặc over (khi kéo khỏi phạm vi container) thì return luôn tránh lỗi (tránh crash trang)
    if (!active || !over) return

    // activeDraggingCard: là Card đang được kéo - ta custom vì id thì chung quá
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    // overCard: là Card đang nằm ở vùng có thể kéo thả mà Card active vừa qua
    const { id: overCardId } = over

    // Tìm 2 Column của Card active và over theo CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 thì return luôn tránh crash
    if (!activeColumn || !overColumn) return

    // Xử lý logic chỉ khi kéo qua 2 column khác nhau, nếu kéo thả trong 1 column thì không làm gì
    // Vì đây là xử lý lúc đang kéo (handleDragOver), còn lúc kéo thả xong xuôi là vấn đề ở handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // Trigger khi kết thúc hành động kéo 1 phần tử => thả
  const handleDragEnd = (e) => {
    console.log('handleDragEnd:', e)
    const { active, over } = e
    // Kiểm tra nếu không tồn tại active hoặc over (khi di khỏi phạm vi container) thì return luôn tránh lỗi (tránh crash trang)
    if (!active || !over) return

    // Kiểm tra xem nếu là kéo thả Card thì xử lý logic
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      // overCard: là Card đang nằm ở vùng có thể kéo thả mà Card active vừa qua
      const { id: overCardId } = over

      // Tìm 2 Column của Card active và over theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tồn tại 1 trong 2 thì return luôn tránh crash
      if (!oldColumnWhenDraggingCard || !overColumn) return

      // Kéo thả giữa 2 Column khác nhau
      // Phải dùng tới activeDragItemData.columnId hoặc tạo state mới lưu trữ oldColumn vì khi qua handleDragOver đã bị set lại State
      // nên find sẽ ra index mới của column
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      }
      // Kéo thả trong 1 Column
      else {
        // Lấy vị trí cũ từ state oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(
          (card) => card._id === activeDraggingCardId
        )
        // Lấy vị trí mới là overColumn
        const newCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        )
        // Dùng arrayMove để xử lý sắp xếp lại mảng cards khi kéo thả xong vì xử lý card trong 1 column tương tự kéo thả column trong 1 boardContent
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )
        setOrderedColumns((prevColumns) => {
          // Clone mảng orderedColumns ra để xử lý và return cập nhật lại state
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới column đang thả
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          )

          // Cập nhật lại cards và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id)

          // Return state mới với chuẩn vị trí card
          return nextColumns
        })
      }
    }

    // Kiểm tra xem nếu là kéo thả Column thì xử lý logic
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Kiểm tra vị trí nếu vị trí kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        // Lấy vị trí cũ là active
        const oldColumnIndex = orderedColumns.findIndex(
          (column) => column._id === active.id
        )
        // Lấy vị trí mới là over
        const newColumnIndex = orderedColumns.findIndex(
          (column) => column._id === over.id
        )
        // Dùng arrayMove để xử lý sắp xếp lại mảng columns khi kéo thả xong
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        )

        // Xử lý call API:
        // const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)
        // console.log('dndOrderedColumns', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Khi kéo thả xong set lại state của phần tử kéo thả là null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5
        }
      }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      // Thuật toán phát hiện va chạm, nếu ko có thì mặc định là closestCenter thì khi kéo card có cover lớn thì sẽ không kéo qua được column vì
      // lúc này nó đang bị conflict giữa card và column. Khi này dùng closestCorners thay vì closestCenter
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          width: '100%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <TrelloCard card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
