import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import JournalList from './pages/JournalList'
import JournalForm from './pages/JournalForm'

const { Header, Content } = Layout

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <div style={{ float: 'left', color: '#fff', fontWeight: 600 }}>
            Журнал работ
          </div>
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['1']}
            style={{ marginLeft: 160 }}
          >
            <Menu.Item key='1'>
              <Link to='/'>Записи</Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link to='/create'>Добавить запись</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: 24 }}>
          <Routes>
            <Route path='/' element={<JournalList />} />
            <Route path='/create' element={<JournalForm />} />
            <Route path='/edit/:id' element={<JournalForm />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App
