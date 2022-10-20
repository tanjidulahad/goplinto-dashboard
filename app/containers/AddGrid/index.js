import { Radio } from 'antd'
import GridImageUpload from 'components/GridImageUpload'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import React, { useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'

const AddGrid = () => {
    const history = useHistory();
    const [gridType, setGridType] = useState(2)
    const [countAdd, setCountAdd] = useState([])
    const addGridToSite = () => {
        if (countAdd.length == gridType) {
            console.log("good to go")
        }
        else {
            alert(`add ${gridType} images to proceed`)
        }
        console.log("addgridtosite clicked", countAdd)
    }
    return (
        <>
            <ExtendedNavBar text="Add Grid" onBack={() => history.goBack()} />
            <div className="p-10">
                <h1 className='text-lg font-bold '>Add Grid Images</h1>
                <div className="w-full pt-2 bg-white rounded-t-lg shadow-lg lg:mt-0 pb-5" style={{ marginBottom: "1px" }}>
                    <div className="px-4 md:px-8 mb-2 mt-2">
                        <h3 className='font-semibold text-base'>Title</h3>
                        <input
                            type="text"
                            className="form-input w-full md:w-1/2 mb-5"
                            placeholder='Enter Title (eg- Best deals, New Arrivals, Featured Products)'
                        />
                        <div className='mb-5'>
                            <Radio.Group
                                value={gridType}
                                onChange={e => {
                                    setGridType(e.target.value)
                                }}
                                size="large"
                            >
                                <Radio className="font-semibold my-3 mx-4" size="large" value={2}>
                                    <div>
                                        <span className=" text-sm font-normal" style={{ fontWeight: 450 }}>
                                            2 images Grid
                                        </span>
                                    </div>
                                </Radio>
                                <Radio className="font-semibold my-4 mx-4" value={4} size="large">
                                    <div >
                                        <span className=" text-sm font-normal " style={{ fontWeight: 450 }}>
                                            4 images Grid
                                        </span>
                                    </div>
                                </Radio>
                            </Radio.Group>
                        </div>
                        <div className='flex w-3/5 flex-wrap'>
                            <GridImageUpload setCountAdd={setCountAdd} countAdd={countAdd} />
                            <GridImageUpload setCountAdd={setCountAdd} countAdd={countAdd} />
                            {gridType === 4 &&
                                <>
                                    <GridImageUpload setCountAdd={setCountAdd} countAdd={countAdd} />
                                    <GridImageUpload setCountAdd={setCountAdd} countAdd={countAdd} />
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full pt-2 bg-white lg:mt-0 mb-4 pb-5 flex flex-row">
                    <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
                    <p className="text-xs font-semibold text-muted-med">
                        These widgets will be displayed on the home page, below the banner image of your website.{' '}
                        <span className="text-secondary cursor-pointer">See Preview</span>
                    </p>
                </div>

                <div onClick={addGridToSite} className="flex justify-end mb-4">
                    <button type="submit" className="px-4 py-2 text-white rounded-sm bg-secondary cta-btn">
                        Add to Site
                    </button>
                </div>
            </div>
        </>
    );
}

export default AddGrid
