import { useEffect, useState } from 'react'
import { Table, Button, Space, DatePicker, Popconfirm, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'
import {
  journalControllerFindAll,
  journalControllerRemove,
  WorkTypesControllerFindAllResult,
  JournalControllerFindAllResult,
} from '../shared/api/client/api'

const { RangePicker } = DatePicker

const JournalList = () => {
  const [data, setData] = useState<JournalControllerFindAllResult>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetch = async (params?: {
    from?: string
    to?: string
    sort?: string
  }) => {
    setLoading(true)
    try {
      const res = await journalControllerFindAll(params)
      setData(res || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch({ sort: 'desc' })
  }, [])

  const onDelete = async (id: number) => {
    try {
      await journalControllerRemove(id)
      message.success('Запись удалена')
      fetch()
    } catch (e) {
      message.error('Ошибка при удалении')
    }
  }

  const columns: ColumnsType<any> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (d: string) => dayjs(d).format('YYYY-MM-DD'),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Вид работ',
      dataIndex: ['workType', 'name'],
      key: 'workType',
    },
    {
      title: 'Объём',
      dataIndex: 'volume',
      key: 'volume',
      render: (_: any, record: any) => `${record.volume} ${record.unit}`,
    },
    {
      title: 'Исполнитель',
      dataIndex: 'performer',
      key: 'performer',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type='link' onClick={() => navigate(`/edit/${record.id}`)}>
            Редактировать
          </Button>
          <Popconfirm
            title='Удалить запись?'
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          onChange={(dates) => {
            if (!dates) return fetch({})
            const [from, to] = dates
            fetch({ from: from.toISOString(), to: to.toISOString() })
          }}
        />
        <Button onClick={() => fetch({ sort: 'asc' })}>
          Сортировать по дате ↑
        </Button>
        <Button onClick={() => fetch({ sort: 'desc' })}>
          Сортировать по дате ↓
        </Button>
        <Link to='/create'>
          <Button type='primary'>Добавить запись</Button>
        </Link>
      </Space>
      <Table
        rowKey='id'
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default JournalList
