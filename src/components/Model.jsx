import React from 'react'

const Model = ({item}) => {
  return (
    <div>
        {isModelOpen && (<div
        className={`fixed text-black inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none transition-all duration-300 ${
            isModelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-blue-500 bg-opacity-75 backdrop-blur-md"></div>
        <div className="relative w-auto max-w-md mx-auto my-6">
          {/* Modal content */}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-red-500 font-semibold">Update Income</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none" onClick={onClose}>×</span>
              </button>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">
              <div className='w-[100%]'>
                <label htmlFor="">Income Name</label>
                <br />
                <input type="text" placeholder='Enter income name' className='p-1 rounded-md bg-slate-300' />
              </div>
              <div className='w-[100%]'>
                <label htmlFor="">Income Amount</label>
                <br />
                <input type="text" placeholder='Enter income name' className='p-1 rounded-md bg-slate-300' />
              </div>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default Model