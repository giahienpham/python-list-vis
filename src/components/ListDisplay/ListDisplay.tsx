import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ListDisplayProps {
  list: (number | number[])[]
  highlightedIndex: number | null
}

export const ListDisplay: React.FC<ListDisplayProps> = ({
  list,
  highlightedIndex,
}) => {
  return (
    <div className='flex flex-col items-center mt-8 w-full h-full'>
      <div className='w-full overflow-x-auto'>
        <div className='min-w-max'>
          <h4 className='text-xl font-bold mt-2'>Index:</h4>
          <div className='mt-4 flex'>
            <AnimatePresence>
              {list.map((_, index) => (
                <motion.div
                  key={`index-${index}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 1 }}
                  className={`text-gray-800 font-semibold p-2 m-1 rounded shadow-md border border-black w-24 h-12 text-sm flex items-center justify-center ${
                    index === highlightedIndex ? 'bg-red-500' : 'bg-gray-200'
                  }`}>
                  {index}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <h4 className='text-xl font-bold mt-2'>Value:</h4>
          <div className='mt-4 flex'>
            <AnimatePresence>
              {list.map((item, index) => (
                <motion.div
                  key={`item-${index}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 1 }}
                  className={`text-blue-800 font-semibold p-2 m-1 rounded shadow-md border border-black w-24 h-12 text-sm flex items-center justify-center overflow-hidden whitespace-nowrap ${
                    index === highlightedIndex ? 'bg-red-500' : 'bg-blue-200'
                  }`}
                  style={{ textOverflow: 'ellipsis' }}>
                  {JSON.stringify(item)}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
