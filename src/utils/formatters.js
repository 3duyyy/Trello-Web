export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// Fix bug Column rỗng sẽ không di được Card từ Column khác vào: hàm này xử lý gen ra 1 Placeholder Card khi Card
// cuối cùng của 1 Column được kéo; Column mà rỗng sẵn sẽ xử lý riêng trong API
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column.columnId,
    FE_PlaceholderCard: true
  }
}
