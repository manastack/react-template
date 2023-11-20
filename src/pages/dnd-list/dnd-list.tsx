import { FC, useCallback, useMemo, useState } from 'react'
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StrictModeDroppable } from '@shared/lib/react-beautiful-dnd'
import { DndItem, ItemModel } from '@widgets/dnd-item'

import { StyledDndList } from './dnd-list.style'

const DndList: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => {
  const initialItems: ItemModel[] = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => i).map((p) => ({
        content: `Item ${p}`,
        id: `id-${p}`,
      })),
    [],
  )

  const [items, setItems] = useState<ItemModel[]>(initialItems)

  const onDragEnd: OnDragEndResponder = useCallback(
    ({ destination, source }) => {
      if (!destination || destination.index === source.index) {
        return
      }

      const newItems: ItemModel[] = [...items]
      const [removed] = newItems.splice(source.index, 1)
      newItems.splice(destination.index, 0, removed)
      setItems(newItems)
    },
    [items],
  )

  return (
    <StyledDndList className={setClassName('DndList')}>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="list">
          {({ droppableProps, innerRef, placeholder }) => (
            <div ref={innerRef} {...droppableProps}>
              {items.map((item, index) => (
                <DndItem
                  key={item.id}
                  renderLogId={item.id}
                  {...{ index, item }}
                />
              ))}
              {placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </StyledDndList>
  )
}

export default withEmotionNaming(withRenderLog(DndList))
