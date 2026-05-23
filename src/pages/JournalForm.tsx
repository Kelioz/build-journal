import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import {
  workTypesControllerFindAll,
  journalControllerCreate,
  journalControllerFindOne,
  journalControllerUpdate,
} from '../shared/api/client/api'

const { TextArea } = Input

const JournalForm = () => {
  const [form] = Form.useForm()
  const [workTypes, setWorkTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()

  useEffect(() => {
    workTypesControllerFindAll().then((res) => setWorkTypes(res || []))
    if (id) {
      setLoading(true)
      journalControllerFindOne(Number(id))
        .then((r) => {
          form.setFieldsValue({
            ...r,
            date: dayjs(r.date),
            workTypeId: r.workType?.id,
          })
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  const onFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
        date: values.date.toISOString(),
      }
      if (id) {
        await journalControllerUpdate(Number(id), payload)
        message.success('Запись обновлена')
      } else {
        await journalControllerCreate(payload)
        message.success('Запись создана')
      }
      navigate('/')
    } catch (e) {
      message.error('Ошибка при сохранении')
    }
  }

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={{ unit: 'м³' }}
    >
      <Form.Item name='date' label='Дата' rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item
        name='workTypeId'
        label='Вид работ'
        rules={[{ required: true }]}
      >
        <Select>
          {workTypes.map((w) => (
            <Select.Option key={w.id} value={w.id}>
              {w.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='volume' label='Объём' rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='unit' label='Единица' rules={[{ required: true }]}>
        <Input />
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
        <Button type='primary' htmlType='submit' loading={loading}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default JournalForm
