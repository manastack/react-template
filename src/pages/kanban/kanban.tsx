import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledCard, StyledKanban } from './kanban.style'

type Props = {}

const Kanban: FC<PropsWithEmotionNaming<Props>> = ({ setClassName }) => (
  <StyledKanban className={setClassName('Kanban')}>
    <StyledCard className={setClassName('Card')}>First</StyledCard>
    <StyledCard className={setClassName('Card')}>Second</StyledCard>
    <StyledCard className={setClassName('Card')}>Third</StyledCard>
  </StyledKanban>
)

export default withEmotionNaming(withRenderLog(Kanban))
