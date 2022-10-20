import React from 'react'
import './style.css'
const CustomizedModal = ({ children, title, closeModal, onCreateAttribute, onCancel, cancel, DoneBtnText }) => (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed w-full max-w-3xl mx-auto md:my-6 content_div">
        {/* content */}
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none mx-20 connect_inner_div">
          {/* header */}
          <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
            {title}
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
          <div className="flex flex-row items-center justify-end p-5 border-t border-gray-300 border-solid rounded-b">
            {cancel && (
              <button
                className="btn_transition text-red-600 border-2 border-red-600  font-medium py-2 px-8  mr-4 rounded-md text-red bg-transparent focus:outline-none"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}

            <button
              className="btn_transition rounded-md cta-btn font-medium text-white focus:outline-none"
              type="button"
              onClick={onCreateAttribute}
            >
              {DoneBtnText}
            </button>
          </div>
        </div>
      </div>
    </div>
)

export default CustomizedModal
