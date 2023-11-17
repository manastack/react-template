import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledDndList } from './dnd-list.style'

const DndList: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <StyledDndList className={setClassName('DndList')}>dnd-list</StyledDndList>
)

export default withEmotionNaming(withRenderLog(DndList))
