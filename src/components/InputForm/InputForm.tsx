import { useState } from 'react'

interface InputFormProps {
  onAppend: (inputValue: string) => void
  onExtend: (inputValue: string) => void
  onInsert: (indexValue: number, inputValue: string) => void
  onRemove: (inputValue: string) => void
  onIndex: (inputValue: string) => void
  onCount: (inputValue: string) => void
}
type Operation = 'append' | 'extend' | 'insert' | 'remove' | 'index' | 'count'

export const InputForm: React.FC<InputFormProps> = ({
  onAppend,
  onExtend,
  onInsert,
  onRemove,
  onIndex,
  onCount,
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [indexValue, setIndexValue] = useState<string>('')
  const [operation, setOperation] = useState<Operation>('append')

  const allowedOperations: Record<string, () => void> = {
    append: () => onAppend(inputValue),
    extend: () => onExtend(inputValue),
    index: () => onIndex(inputValue),
    insert: () => {
      const idx = parseInt(indexValue, 10)
      if (!isNaN(idx)) {
        onInsert(idx, inputValue)
      } else {
        alert("TypeError: 'str' object cannot be interpreted as an integer")
      }
    },
    remove: () => onRemove(inputValue),
    count: () => onCount(inputValue),
  }

  const handleOperation = () => {
    allowedOperations[operation]()
    setInputValue('')
    setIndexValue('')
  }

  return (
    <div className='flex flex-col mt-4'>
      <div className='flex space-x-2 mt-8 items-center'>
        <div className='text-2xl text-blue-800 font-bold'>Select action</div>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value as Operation)}
          className='border p-2 rounded'>
          <option value='append'>Append</option>
          <option value='extend'>Extend</option>
          <option value='insert'>Insert</option>
          <option value='remove'>Remove</option>
          <option value='index'>Index</option>
          <option value='count'>Count</option>
        </select>
      </div>
      <div className='flex space-x-2 mt-8'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter number or comma-separated list'
          className='border p-2 w-full rounded'
        />
        {operation === 'insert' ? (
          <input
            type='text'
            value={indexValue}
            onChange={(e) => setIndexValue(e.target.value)}
            placeholder='Enter index'
            className='border p-2 rounded'
          />
        ) : null}

        <button
          onClick={handleOperation}
          className='bg-blue-500 text-white px-4 py-2 rounded'>
          {operation.charAt(0).toUpperCase() + operation.slice(1)}
        </button>
      </div>
    </div>
  )
}
