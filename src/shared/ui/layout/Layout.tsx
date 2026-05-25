import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { PropsWithChildren } from 'react'

const { Header, Content } = Layout

export function MainLayout(props: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()
  const getSelectedKey = () => {
    if (
      location.pathname === '/create' ||
      location.pathname.includes('/edit')
    ) {
      return '2'
    }
    return '1'
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div style={{ float: 'left', color: '#fff', fontWeight: 600 }}>
          Журнал работ
        </div>
        <Menu
          theme='dark'
          mode='horizontal'
          selectedKeys={[getSelectedKey()]}
          style={{ marginLeft: 160, userSelect: 'none' }}
          items={[
            {
              label: 'Записи',
              title: 'Записи',
              key: 1,
              onClick: () => navigate('/'),
            },
          ]}
        />
      </Header>
      <Content style={{ padding: 24 }}>{props.children}</Content>
    </Layout>
  )
}
