import { FC, PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet-async'
import { withRenderLog } from '@manauser/react-render-log'

type IPageProps = {
  title: string
}

const Page: FC<PropsWithChildren<IPageProps>> = ({ title, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </>
)

export default withRenderLog(Page)
