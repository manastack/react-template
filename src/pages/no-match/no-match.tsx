import { FC } from 'react'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'

import { StyledNoMatch } from './no-match.style'

const NoMatch: FC<PropsWithEmotionNaming<{}>> = ({ setClassName }) => (
  <StyledNoMatch className={setClassName('NoMatch')}>no match</StyledNoMatch>
)

export default withEmotionNaming(withRenderLog(NoMatch))
