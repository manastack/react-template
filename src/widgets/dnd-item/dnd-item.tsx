import { FC, memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledDndItem } from './dnd-item.style'

export type ItemModel = {
  content: string
  id: string
}

type Props = {
  index: number
  item: ItemModel
}

const DndItem: FC<PropsWithEmotionNaming<Props>> = ({
  index,
  item,
  setClassName,
}) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <StyledDndItem
        className={setClassName('DndItem')}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {item.content}
      </StyledDndItem>
    )}
  </Draggable>
)

export default memo(withEmotionNaming(withRenderLog(DndItem)))
