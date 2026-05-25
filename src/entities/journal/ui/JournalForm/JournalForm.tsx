import { useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
  Space,
} from 'antd'
import dayjs from 'dayjs'
import type { CreateJournalDto, UpdateJournalDto } from '@/shared/api/client'
import { JournalModel } from '@/entities/journal'
import { WorkTypeModel } from '@/entities/workType'
import { JournalFormProps, JournalFormValues, UNIT_OPTIONS } from './types'

const { TextArea } = Input

export function JournalFormPage({
  id,
  onSuccess,
  onCancel,
  ...props
}: JournalFormProps) {
  const [form] = Form.useForm<JournalFormValues>()

  const { data: workTypes = [], isLoading: workTypesLoading } =
    WorkTypeModel.Hooks.useWorkTypesFindAll()
  const { data: journalData, isLoading: journalLoading } =
    JournalModel.Hooks.useJournalFindOne(id ? Number(id) : undefined)
  const createJournal = JournalModel.Hooks.useJournalCreate()
  const updateJournal = JournalModel.Hooks.useJournalUpdate()

  useEffect(() => {
    if (journalData && id) {
      form.setFieldsValue({
        date: dayjs(journalData.date),
        workTypeId: journalData.workType.id,
        volume: journalData.volume,
        unit: journalData.unit,
        performer: journalData.performer,
        notes: journalData.notes,
      })
    } else if (!id) {
      form.resetFields()
      form.setFieldsValue({ unit: 'м³' })
    }
  }, [journalData, id, form])

  const onFinish = async (values: JournalFormValues) => {
    try {
      const payload = {
        date: values.date.toISOString(),
        workTypeId: values.workTypeId,
        volume: values.volume,
        unit: values.unit,
        performer: values.performer,
        notes: values.notes,
      }

      if (id) {
        const updateData: UpdateJournalDto = payload
        await updateJournal.mutateAsync({ id: Number(id), data: updateData })
      } else {
        const createData: CreateJournalDto = payload
        await createJournal.mutateAsync(createData)
      }

      onSuccess?.()
    } catch {
      message.error('Ошибка при сохранении')
    }
  }

  const isLoading =
    journalLoading ||
    workTypesLoading ||
    createJournal.isPending ||
    updateJournal.isPending

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={{ unit: 'м³' }}
      {...props}
    >
      <Form.Item name='date' label='Дата' rules={[{ required: true }]}>
        <DatePicker
          showTime
          style={{ width: '100%' }}
          placeholder='Выберите дату'
        />
      </Form.Item>
      <Form.Item
        name='workTypeId'
        label='Вид работ'
        rules={[{ required: true }]}
      >
        <Select
          placeholder='Выберите вид работ'
          loading={workTypesLoading}
          options={workTypes.map((w) => ({ label: w.name, value: w.id }))}
        />
      </Form.Item>
      <Form.Item name='volume' label='Объём' rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='unit' label='Единица' rules={[{ required: true }]}>
        <Select options={UNIT_OPTIONS} />
      </Form.Item>
      <Form.Item
        name='performer'
        label='Исполнитель'
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='notes' label='Примечание'>
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Сохранить
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
