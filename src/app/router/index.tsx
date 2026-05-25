import { JournalListPage } from '@/pages/JournalListPage/JournalList'
import { JournalFormPage } from '@/entities/journal/ui/JournalForm/JournalForm'
import { Routes, Route } from 'react-router-dom'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<JournalListPage />} />
      <Route path='/create' element={<JournalFormPage />} />
    </Routes>
  )
}
