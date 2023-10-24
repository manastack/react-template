import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledOrderedList, StyledOrderedListItem } from './ordered-list.style'

type Props = {}
const OrderedList: FC<PropsWithEmotionNaming<Props>> = ({ setClassName }) => (
  <StyledOrderedList className={setClassName('OrderedList')}>
    <StyledOrderedListItem className={setClassName('OrderedListItem')}>
      First
    </StyledOrderedListItem>
    <StyledOrderedListItem className={setClassName('OrderedListItem')}>
      Second
    </StyledOrderedListItem>
    <StyledOrderedListItem className={setClassName('OrderedListItem')}>
      Third
    </StyledOrderedListItem>
  </StyledOrderedList>
)

export default withEmotionNaming(withRenderLog(OrderedList))
