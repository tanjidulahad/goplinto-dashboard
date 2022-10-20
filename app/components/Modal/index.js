import React from 'react'

const CreateStoreModal = ({ children, title, closeModal, onCreateAttribute, onCancel, cancel }) => (
  <>
    <div className="fixed inset-0 z-50 flex items-center  justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-3xl mx-auto my-6" style={{ marginTop: 120 }}>
        {/* content */}
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* header */}
          <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
            <h3 className="text-lg item-label capitalize">{title}</h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              type="button"
              onClick={closeModal}
            >
              <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/* body */}

          <div className="relative flex-auto p-6">{children}</div>
          {/* footer */}
          <div className="flex flex-row items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">

            {
              cancel && (
                <button
                  className="border border-red-900 py-2 px-4  mr-4 rounded-lg text-red bg-transparent focus:outline-none"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={onCancel}
                >
                  Cancel
                </button>

              )
            }


            <button
              className="cta-btn rounded-lg text-white focus:outline-none"
              type="button"
              style={{ transition: 'all .15s ease' }}
              onClick={onCreateAttribute}
            >
              {cancel ? "Done" : "Create " + title}
            </button>

          </div>
        </div>
      </div>
    </div>
    <div className="fixed inset-0 z-40 bg-black opacity-25" />
  </>
)

export default CreateStoreModal
