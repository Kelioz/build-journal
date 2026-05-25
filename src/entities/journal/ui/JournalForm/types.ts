import { FormProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import dayjs from 'dayjs'

export type JournalFormValues = {
  date: dayjs.Dayjs
  workTypeId: number
  volume: number
  unit: string
  performer: string
  notes?: string
}

export const UNIT_OPTIONS: DefaultOptionType[] = [
  { value: 'м³', label: 'м³' },
  { value: 'м²', label: 'м²' },
  { value: 'м.пог', label: 'м.пог' },
  { value: 'шт', label: 'шт' },
  { value: 'т', label: 'т' },
  { value: 'кг', label: 'кг' },
]

export type JournalFormProps = Omit<
  FormProps<JournalFormValues>,
  'children'
> & {
  id?: string
  onSuccess?: () => void
  onCancel?: () => void
}
