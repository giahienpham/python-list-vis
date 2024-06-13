interface CommandHistoryProps {
  commandHistory: string[]
  onClearHistory: () => void
}

export const CommandHistory: React.FC<CommandHistoryProps> = ({
  commandHistory,
  onClearHistory,
}) => {
  return (
    <div>
      <div className='flex space-x-2 mt-8 items-center'>
        <h2 className='text-xl font-bold'>Command History:</h2>
        <button
          onClick={() => {
            const textToCopy = commandHistory.join('\n')
            navigator.clipboard
              .writeText(textToCopy)
              .then(() => alert('Command history copied to clipboard'))
              .catch((err) => console.error('Could not copy text: ', err))
          }}
          className=' bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700'>
          Copy All
        </button>
        <button
          onClick={onClearHistory}
          className=' bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700'>
          Clear
        </button>
      </div>

      <div className='mt-4 bg-gray-100 p-4 rounded shadow-md w-full h-full'>
        <pre className='text-left overflow-y-auto max-h-56'>
          {commandHistory.map((command, index) => (
            <div key={index}>{command}</div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export default CommandHistory
