import { useRef, useState } from 'react'
import ActionButtons from 'components/ActionButtons'
import CommandHistory from 'components/CommandHistory'
import InputForm from 'components/InputForm'
import ListDisplay from 'components/ListDisplay'

export const ListFunctions: React.FC = () => {
  const [list, setList] = useState<(number | number[])[]>([3,8,5])
  const refList = useRef(list)
  const [commandHistory, setCommandHistory] = useState<string[]>([
    'my_list = [3,8,5]',
  ])
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const formatInput = (inputValue: string): number[] => {
    return inputValue.split(',').map((val) => parseFloat(val.trim()))
  }

  const findFirstIndex = (
    list: (number | number[])[],
    value: number | number[]
  ): number => {
    return list.findIndex(
      (item) =>
        (Array.isArray(value) &&
          Array.isArray(item) &&
          JSON.stringify(item) === JSON.stringify(value)) ||
        (typeof value === 'number' && item === value)
    )
  }

  const handleClearCommandHistory = () => {
    setCommandHistory([])
  }

  const handleAppend = (inputValue: string) => {
    const values = formatInput(inputValue)
    if (values.some(isNaN)) {
      alert('All values should be number')
      return
    }

    const commandValues =
      values.length === 1 ? `${values[0]}` : JSON.stringify(values)

    setList((curList) => {
      const newList = [...curList, values.length === 1 ? values[0] : values]
      refList.current = newList

      return newList
    })

    setCommandHistory((history) => [
      ...history,
      `my_list.append(${commandValues}) # ${JSON.stringify(refList.current)}`,
    ])

    setHighlightedIndex(null)
  }

  const handleExtend = (inputValue: string) => {
    const values = formatInput(inputValue)
    if (values.some(isNaN)) {
      alert('All values should be number')
      return
    }

    const commandValues =
      values.length === 1 ? `${values[0]}` : JSON.stringify(values)

    setList((curList) => {
      const newList = [...curList, ...values]
      refList.current = newList

      return newList
    })

    setCommandHistory((history) => [
      ...history,
      `my_list.extend(${commandValues}) # ${JSON.stringify(refList.current)}`,
    ])

    setHighlightedIndex(null)
  }

  const handleInsert = (index: number, inputValue: string) => {
    const values = formatInput(inputValue)
    if (values.some(isNaN)) {
      alert('All values should be numbers')
      return
    }

    const commandValues =
      values.length === 1 ? `${values[0]}` : JSON.stringify(values)

    setList((curList) => {
      const newList = [...curList]
      newList.splice(index, 0, values.length === 1 ? values[0] : values)
      refList.current = newList

      return newList
    })

    setCommandHistory((history) => [
      ...history,
      `my_list.insert(${index}, ${commandValues}) # ${JSON.stringify(
        refList.current
      )}`,
    ])

    setHighlightedIndex(null)
  }

  const handleIndex = (inputValue: string) => {
    const values = formatInput(inputValue)
    if (values.some(isNaN)) {
      alert('All values should be numbers')
      return
    }
    const index = findFirstIndex(list, values.length === 1 ? values[0] : values)
    const commandValues =
      values.length === 1 ? `${values[0]}` : JSON.stringify(values)
    if (index === -1) {
      setCommandHistory((history) => [
        ...history,
        `# my_list.index(${commandValues}) # ValueError: ${commandValues} not in list`,
      ])
      alert(`ValueError: ${commandValues} not in list`)
      return
    }
    setHighlightedIndex(index)
    setTimeout(() => {
      setCommandHistory((history) => [
        ...history,
        `my_list.index(${commandValues}) # ${index}`,
      ])
      setHighlightedIndex(null)
    }, 2500)
  }

  const handleCount = (inputValue: string) => {
    const values = formatInput(inputValue)
    if (values.some(isNaN)) {
      alert('All values should be numbers')
      return
    }

    const valueToCount = values.length === 1 ? values[0] : values
    const count = list.filter(
      (item) =>
        (Array.isArray(valueToCount) &&
          Array.isArray(item) &&
          JSON.stringify(item) === JSON.stringify(valueToCount)) ||
        (typeof valueToCount === 'number' && item === valueToCount)
    ).length

    setCommandHistory((history) => [
      ...history,
      `my_list.count(${JSON.stringify(valueToCount)}) # ${count}`,
    ])

    alert(count)
  }

  const handleRemove = (inputValue: string) => {
    const values = formatInput(inputValue)
    if (values.some(isNaN)) {
      alert('All values should be numbers')
      return
    }

    const valueToRemove = values.length === 1 ? values[0] : values
    const index = findFirstIndex(list, valueToRemove)
    const commandValues = JSON.stringify(valueToRemove)
    if (index === -1) {
      setCommandHistory((history) => [
        ...history,
        `# my_list.remove(${values}) # ValueError: list.remove(${commandValues}): ${commandValues} not in list`,
      ])
      alert(
        `ValueError: list.remove(${commandValues}): ${commandValues} not in list`
      )
      return
    }

    setHighlightedIndex(index)
    setList((curList) => {
      const newList = [...curList]
      newList.splice(index, 1)
      refList.current = newList
      return newList
    })
    setCommandHistory((history) => [
      ...history,
      `my_list.remove(${values}) # ${JSON.stringify(refList.current)}`,
    ])
    setTimeout(() => {
      setHighlightedIndex(null)
    }, 2500)
  }

  const handlePop = () => {
    if (list.length === 0) {
      setCommandHistory((history) => [
        ...history,
        '# my_list.pop() # IndexError: pop from empty list',
      ])
      alert('IndexError: pop from empty list')
      return
    }

    setList((curList) => {
      const newList = curList.slice(0, -1)
      refList.current = newList
      return newList
    })

    setCommandHistory((history) => [
      ...history,
      `my_list.pop() # ${JSON.stringify(refList.current)}`,
    ])
  }

  const handleClear = () => {
    setList(() => [])
    setCommandHistory((history) => [...history, `my_list.clear() # []`])
  }

  const handleSortAscending = () => {
    const command = 'my_list.sort()'
    if (list.some((item) => Array.isArray(item))) {
      setCommandHistory((history) => [
        ...history,
        `# ${command} # TypeError: '<' not supported between instances of 'list' and 'int'`,
      ])
      alert(
        "TypeError: '<' not supported between instances of 'list' and 'int'"
      )
      return
    }
    setList((curList) => {
      const newList = [...curList]
      newList.sort((a, b) => {
        return (a as number) - (b as number)
      })
      refList.current = newList
      return newList
    })

    setCommandHistory((history) => [
      ...history,
      `${command} # ${JSON.stringify(refList.current)}`,
    ])
  }

  const handleSortDescending = () => {
    const command = 'my_list.sort(reverse=True)'
    if (list.some((item) => Array.isArray(item))) {
      setCommandHistory((history) => [
        ...history,
        `# ${command} # TypeError: '<' not supported between instances of 'list' and 'int'`,
      ])
      alert(
        "TypeError: '<' not supported between instances of 'list' and 'int'"
      )
      return
    }
    setList((curList) => {
      const newList = [...curList]
      newList.sort((a, b) => {
        return (b as number) - (a as number)
      })
      refList.current = newList
      return newList
    })

    setCommandHistory((history) => [
      ...history,
      `${command} # ${JSON.stringify(refList.current)}`,
    ])
  }

  const handleReverse = () => {
    setList((curList) => {
      const newList = [...curList]
      newList.reverse()
      refList.current = newList
      return newList
    })

    setCommandHistory((history) => [
      ...history,
      `my_list.reverse() # ${JSON.stringify(refList.current)}`,
    ])
  }

  return (
    <div className='bg-white p-6 rounded shadow-md'>
      <div className='grid grid-cols-2 gap-8 h-86'>
        <div className='grid grid-rows-2 gap-4'>
          <div className='border-2 border-black border-dashed px-4 py-4 rounded-md'>
            <InputForm
              onAppend={handleAppend}
              onExtend={handleExtend}
              onInsert={handleInsert}
              onRemove={handleRemove}
              onIndex={handleIndex}
              onCount={handleCount}
            />
          </div>

          <div className='border-2 border-black border-dashed px-4 py-4 rounded-md'>
            <ActionButtons
              onPop={handlePop}
              onClear={handleClear}
              onSortAscending={handleSortAscending}
              onSortDescending={handleSortDescending}
              onReverse={handleReverse}
            />
          </div>
        </div>

        <div className='w-full border-2 border-black border-dashed px-4 py-4 rounded-md'>
          <CommandHistory
            commandHistory={commandHistory}
            onClearHistory={handleClearCommandHistory}
          />
        </div>
      </div>

      <div className='w-full overflow-x-auto'>
        <ListDisplay list={list} highlightedIndex={highlightedIndex} />
      </div>
    </div>
  )
}
