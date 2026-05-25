import { useState } from 'react'
import { Table, Button, Space, DatePicker, message, Modal } from 'antd'
import type { JournalControllerFindAllParams } from '@/shared/api/client'
import { JournalModel } from '@/entities/journal'
import { getColumns } from './columns'
import { JournalFormPage } from '../../entities/journal/ui/JournalForm/JournalForm'
import { useVisible } from '@/shared/lib/hooks/useVisisble'

const { RangePicker } = DatePicker

export function JournalListPage() {
  const [params, setParams] = useState<JournalControllerFindAllParams>({
    sort: 'desc',
  })
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const [editingId, setEditingId] = useState<string | undefined>(undefined)
  const modalIsVisible = useVisible()

  const { data = [], isLoading } = JournalModel.Hooks.useJournalFindAll(params)
  const removeJournal = JournalModel.Hooks.useJournalRemove()

  const handleDelete = async (id: number) => {
    try {
      await removeJournal.mutateAsync(id)
      message.success('Запись удалена')
      if (selectedRowId === id) {
        setSelectedRowId(null)
      }
    } catch {
      message.error('Ошибка при удалении')
    }
  }

  const handleOpenCreateModal = () => {
    setEditingId(undefined)
    modalIsVisible.show()
  }

  const handleOpenEditModal = (id: number) => {
    setEditingId(String(id))
    modalIsVisible.show()
  }

  const handleCloseModal = () => {
    modalIsVisible.hide()
    setEditingId(undefined)
  }

  const handleSuccess = async () => {
    handleCloseModal()
    message.success(editingId ? 'Запись обновлена' : 'Запись создана')
  }

  const columns = getColumns({
    onNavigate: (id: number) => {
      if (id) {
        handleOpenEditModal(id)
      }
    },
    onDelete: handleDelete,
  })

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          onChange={(dates) => {
            if (!dates) {
              setParams({ sort: 'desc' })
              return
            }
            const [from, to] = dates
            setParams({
              from: from?.toISOString(),
              to: to?.toISOString(),
              sort: params.sort || 'desc',
            })
          }}
        />
        <Button
          onClick={() => setParams({ ...params, sort: 'asc' })}
          type={params.sort == 'asc' ? 'link' : 'default'}
          style={params.sort == 'asc' ? { border: '1px solid' } : {}}
        >
          Сортировать по дате ↑
        </Button>
        <Button
          onClick={() => setParams({ ...params, sort: 'desc' })}
          type={params.sort == 'desc' ? 'link' : 'default'}
          style={params.sort == 'desc' ? { border: '1px solid' } : {}}
        >
          Сортировать по дате ↓
        </Button>
        <Button type='primary' onClick={handleOpenCreateModal}>
          Добавить запись
        </Button>
      </Space>
      <Table
        rowKey='id'
        loading={isLoading}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            setSelectedRowId(record.id)
          },
          style: {
            cursor: 'pointer',
            backgroundColor:
              selectedRowId === record.id ? '#e6f7ff' : 'transparent',
          },
        })}
        rowClassName={(record) =>
          selectedRowId === record.id ? 'ant-table-row-selected' : ''
        }
      />
      <Modal
        title={editingId ? 'Редактировать запись' : 'Добавить запись'}
        open={modalIsVisible.isVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
        destroyOnHidden
      >
        <JournalFormPage
          id={editingId || ''}
          onSuccess={handleSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  )
}
