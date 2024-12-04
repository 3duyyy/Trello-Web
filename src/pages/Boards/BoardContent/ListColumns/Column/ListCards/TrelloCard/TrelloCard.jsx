import { Attachment, Comment, Group } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'

const TrelloCard = ({ card }) => {
  const shouldShowCardAction = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    )
  }

  return (
    <Card
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      {/* Xử lý last-child đang bị padding-bottom */}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button size="small" startIcon={<Group />}>
            {card?.memberIds?.length}
          </Button>
          <Button size="small" startIcon={<Comment />}>
            {card?.comments?.length}
          </Button>
          <Button size="small" startIcon={<Attachment />}>
            {card?.attachments?.length}
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default TrelloCard
