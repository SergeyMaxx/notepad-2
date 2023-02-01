import {useState} from 'react'
import httpService from '../services/http.service'
import {useSelector} from 'react-redux'
import {getNotes} from '../Store/notes'

const useMockData = () => {
  const notes = useSelector(getNotes())
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('Not Started')

  async function initialize() {
    try {
      console.log(notes)
      for (const note of notes) {
        await httpService.put('note/' + note.id, note)
        console.log(note)
      }

    } catch (error) {
      setError(error)
      setStatus('Error occurred')
    }
  }
  return {error, initialize, status}
}

export default useMockData