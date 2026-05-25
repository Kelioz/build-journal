import { Button, Popconfirm, Space } from 'antd'
import { ColumnProps } from 'antd/es/table'
import dayjs from 'dayjs'
import { ColumnConfigProps } from './types'

export const getColumns = (props: ColumnConfigProps): ColumnProps[] => [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    render: (d: string) => dayjs(d).format('YYYY-MM-DD'),
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
    render: (_, record) => `${record.volume} ${record.unit}`,
  },
  {
    title: 'Исполнитель',
    dataIndex: 'performer',
    key: 'performer',
  },
  {
    title: 'Действия',
    key: 'actions',
    render: (_, record) => (
      <Space>
        <Button type='link' onClick={() => props.onNavigate(record.id)}>
          Редактировать
        </Button>
        <Popconfirm
          title='Удалить запись?'
          okText={'Ок'}
          cancelText={'Отмена'}
          onConfirm={() => props.onDelete(record.id)}
        >
          <Button danger>Удалить</Button>
        </Popconfirm>
      </Space>
    ),
  },
]
