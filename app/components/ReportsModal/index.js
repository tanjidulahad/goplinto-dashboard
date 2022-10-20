import React from 'react'
import MediaQuery, { useMediaQuery } from 'react-responsive'

const CreateStoreModal = ({ children, title, closeModal, onCreateAttribute, submit, proceedTitle, hideCancel, widthOfProceed, disableButton, ModalPosition, page }) => {

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  return (

    <>
      <Desktop>
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center overflow-x-hidden  overflow-y-scroll outline-none focus:outline-none">
          <div className="relative max-w-3xl mx-auto my-auto flex flex-col items-center" style={{ width: '95%', marginTop: page ? 65 : "" }}>
            {/* content */}
            <div className="p-4 md:p-10 relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* header */}
              <div
                className="flex items-start justify-between border-b border-gray-300 border-solid rounded-t"
                style={{ paddingBottom: '1rem' }}
              >
                <h3 className="text-xl font-semibold">{title}</h3>
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

              <div className="relative flex-auto py-6">{children}</div>
              {/* footer */}
              <div className="flex flex-row items-center justify-between md:justify-end md:px-6 rounded-b">
                <button
                  className="mobileModalButtonPastOrder px-8 py-2 text-sm font-bold text-red-500 outline-none background-transparent focus:outline-none border-2 border-secondary text-secondary rounded-lg"
                  type="button"
                  style={hideCancel ? { display: "none" } : { transition: 'all .15s ease', marginRight: 24 }}
                  onClick={closeModal}
                >
                  Cancel
            </button>
                <button
                  className="mobileModalButtonPastOrder bg-secondary rounded-lg text-white px-8 py-2 focus:outline-none border-2 border-secondary"
                  type="button"
                  disabled={disableButton}
                  style={{ transition: 'all .15s ease', width: widthOfProceed }}
                  onClick={submit}
                >
                  {proceedTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25" />
      </Desktop>
      <Mobile>
        <div className="fixed inset-0 z-50 flex justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true" style={{ backgroundColor: "#00000080" }}></div>
          <div className="relative max-w-3xl mx-auto my-6 flex flex-col items-center" style={{ width: '100%', marginBottom: 0, justifyContent: "flex-end" }}>
            {/* content */}
            <div className="p-4 md:p-10 relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none" style={{ maxHeight: "90%", overflow: "hidden", ...ModalPosition }}>
              {/* header */}
              <div
                className="flex items-start justify-between border-b border-gray-300 border-solid rounded-t"
                style={{ paddingBottom: '1rem' }}
              >
                <h3 className="text-xl font-semibold">{title}</h3>
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

              <div className="relative flex-auto py-6" style={{ overflow: "auto", marginBottom: "1.5rem" }}>{children}</div>
              {/* footer */}

            </div>
            <div className="flex flex-row items-center justify-between md:justify-end md:px-6 rounded-b mobileReportsModalbtns">
              <button
                className="mobileModalButtonPastOrder px-8 py-2 text-sm font-bold text-red-500 outline-none background-transparent focus:outline-none border-2 border-secondary text-secondary rounded-lg"
                type="button"
                style={hideCancel ? { display: "none" } : { transition: 'all .15s ease', marginRight: 24 }}
                onClick={closeModal}
              >
                Cancel
            </button>
              <button
                className="mobileModalButtonPastOrder bg-secondary rounded-lg text-white px-8 py-2 focus:outline-none border-2 border-secondary"
                type="button"
                disabled={disableButton}
                style={{ transition: 'all .15s ease', width: widthOfProceed }}
                onClick={submit}
              >
                {proceedTitle}
              </button>
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
}

export default CreateStoreModal
