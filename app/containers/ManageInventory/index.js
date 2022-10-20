import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import MediaQuery from 'react-responsive'
import NumericInput from 'react-numeric-input';
import "assets/ManageInventory.css"
import TopNav from "components/TopNav"
import ProductRow from 'components/InventoryProductRow'
import { StyledDiv, StyledInput } from 'components/SearchBox/styled'
import { Link } from 'react-router-dom'
import { notification, Tooltip } from 'antd'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import BinaryToggle from 'components/BinaryToggle';

import { connect } from 'react-redux'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { IoIosAdd } from 'react-icons/io';
import { updateInventoryItems, getInventoryItems, setTrackToggleInventory } from './actions';
import reducer from "./reducer"
import saga from "./saga"
import { useMediaQuery } from 'react-responsive'
import { Helmet } from 'react-helmet';

const ManageInventory=({
    storeId,
    merchantId,
    upgradePopUpStatus,
    inventoryItems,
    toggleTrackInventory,
    setTrackToggleInventory,
    updateInventoryItems,
    getInventoryItems
})=> {

    const isTablet = useMediaQuery({ minWidth: 992 })

    const [arr, setArr] = useState([])
    const [noOfQty, setNoOfQty] = useState(0)
    const [updateType, setUpdateType] = useState(true)
    const [showUpdateScreen, setShowUpdateScreen] = useState(false)
    
    // Details required in update inventory popup:
    const [MultiValueUpdateArr, setMultiValueUpdateArr] = useState([])
    
    const [inventoryArr, setinventoryArr] = useState(setinventoryArrFunc())
    const [showBackDrop, setShowBackdrop] = useState(false)
    const [ChangedInfo, setChangedInfo] = useState(false)
    const [SearchInput, setSearchInput] = useState("")
    const [UpdateMultiNumericValue, setUpdateMultiNumericValue] = useState(0)
    
    useInjectReducer({ key: 'ManageInventoryState', reducer })
    useInjectSaga({ key: 'ManageInventoryState', saga })
    
    let url=window.location.pathname.split('/')
    url = url[2]+"/"+url[3]
    
    useEffect(() => {
        getInventoryItems(storeId)
    }, [url])

    useEffect(()=>{
        setinventoryArr(setinventoryArrFunc());
    },[inventoryItems])

    function setinventoryArrFunc() {
        const newArray = inventoryItems && inventoryItems.map((val, idx) =>
       
        
            val.variantItems ?
                Object.keys(val.variantItems).map(item => ({
                    itemId: val.item_id,
                    item_name: val.item_name,
                    variantItemId: val.variantItems[item].variant_item_id,
                    variantDetails: {
                        variant_value_1: val.variantItems[item].variant_value_1,
                        variant_value_2: val.variantItems[item].variant_value_2,
                        variant_value_3: val.variantItems[item].variant_value_3,
                        variant_value_4: val.variantItems[item].variant_value_4,
                        variant_value_5: val.variantItems[item].variant_value_5,
                    },
                    img: val.variantItems[item] ? JSON.parse(val.variantItems[item].variant_item_images)&& JSON.parse(val.variantItems[item].variant_item_images).img_url_1 : null, 
                    inventoryQuantity: val.variantItems[item].inventoryDetails ? val.variantItems[item].inventoryDetails.inventory_quantity : null,
                    minQuantity: val.variantItems[item].inventoryDetails ? val.variantItems[item].inventoryDetails.min_order_quantity : null,
                    maxQuantity: val.variantItems[item].inventoryDetails ? val.variantItems[item].inventoryDetails.max_order_quantity : null,
                    thresholdQuantity: val.variantItems[item].inventoryDetails ? val.variantItems[item].inventoryDetails.threshold_quantity : null,
                    itemStatus: val.variantItems[item].variant_item_status,
                }))

                : ({
                    itemId: val.item_id,
                    item_name: val.item_name,
                    variantItemId: null,
                    img:val.primary_img,
                    inventoryQuantity: val.inventoryDetails ? val.inventoryDetails.inventory_quantity : null,
                    minQuantity: val.inventoryDetails ? val.inventoryDetails.min_order_quantity : null,
                    maxQuantity: val.inventoryDetails ? val.inventoryDetails.max_order_quantity : null,
                    thresholdQuantity: val.inventoryDetails ? val.inventoryDetails.threshold_quantity : null,
                    itemStatus: val.item_status,
                })
        ).flat();
        return newArray;
    }

    //dynamic changehandler for each input int the list

    const onChangeHandler = (e, index) => {
        const updatedProducts = inventoryArr&& inventoryArr.map((product, i) => index === i ?
        product.variantItems ?
        Object.keys(product.variantItems).map(val => (
            Object.assign(val, { [e.target.name]: parseInt(e.target.value) })
            ))
            :
            Object.assign(product, { [e.target.name]: parseInt(e.target.value) })
            : product)
            
            setinventoryArr(updatedProducts)
            setChangedInfo(true)
        }
    const onToggleChangeHandler=(index,value)=>{
        const updatedProducts = inventoryArr&&inventoryArr.map((product, i) => index === i ?
            product.variantItems ?
                Object.keys(product.variantItems).map(val => (
                    Object.assign(val, { variant_item_status: value?"AVAILABLE":"UNAVAILABLE" })
                ))
                :
                Object.assign(product, { itemStatus: value ? "AVAILABLE" : "UNAVAILABLE" })
            : product)

        setinventoryArr(updatedProducts)
        setChangedInfo(true)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        updateInventoryItems(storeId, merchantId, inventoryArr);
        setChangedInfo(false)
        notification.success({
                description: `Saved Changes`,
                placement:'bottomRight',
            })        
    }

    useEffect(() => {
        if (noOfQty) {
            updatedQuantity(noOfQty)
        }
    }, [updateType])


    const popupToggleHandler = (e) => {
        let x = e.target
        if (x.id === "add") {
            setUpdateType(true)
        }
        else {
            setUpdateType(false)

        }
    }
    const updatedQuantity = (value) => {
        setNoOfQty(value)
    }
    const popupCloseHandler = () => {
        setShowUpdateScreen(false)
    }

    const checkBoxHandler = (e, id) => {
        let x = e.target;
        if (id === "all") {
            inventoryArr && inventoryArr.forEach((val, idx) => {
                if (arr.indexOf((val.variantItemId ? val.variantItemId : val.itemId).toString()) === -1) {
                    setArr(prev => [...prev, `${val.variantItemId ? val.variantItemId : val.itemId}`])
                    setMultiValueUpdateArr(prev => [...prev,
                    ({
                        item_id: val.itemId,
                        item_name: val.item_name,
                        variantDetails: val.variantDetails,
                        variantItemId: val.variantItemId,
                        inventoryQty: val.inventoryQuantity
                    })
                    ])
                }
            })

            if (x.style.backgroundSize === "0px") {
                x.style.backgroundSize = "cover";
            }
            else {
                x.style.backgroundSize = "0px"
                setArr([])
                setMultiValueUpdateArr([])
            }
        }
        else {
            const val = inventoryArr.find((item => (item.variantItemId ? item.variantItemId : item.itemId) === id));
            if (x.style.backgroundSize === "0px") {

                setArr(prev => [...prev, `${id}`])

                setMultiValueUpdateArr(prev => [...prev,
                ({
                    item_id: val.itemId,
                    item_name: val.item_name,
                    variantDetails: val.variantDetails,
                    variantItemId: val.variantItemId,
                    inventoryQty: val.inventoryQuantity
                })
                ])
                x.style.backgroundSize = "cover";
            }
            else {
                let farr = arr&& arr.filter(idd => e.target.id !== idd)
                setArr(farr)

                let farr2 = MultiValueUpdateArr&&MultiValueUpdateArr.filter(item => id !== (item.variantItemId ? item.variantItemId : item.item_id))
                setMultiValueUpdateArr(farr2)

                x.style.backgroundSize = "0px"
            }
        }
    }

    const toggleHandler = (e) => {
        let x = e.target;
        if (x.id === "update_inventory_btn") {
            setShowUpdateScreen(true)
        }
    }

    useEffect(() => {
        handleChangesearch();
    }, [SearchInput])

    const isPresent = (value, checkValue) =>
        value.toLowerCase().includes(checkValue);

    const handleChangesearch = () => {

        const searchInp = SearchInput && SearchInput.toString().toLowerCase();
        setinventoryArr(inventoryArr&&inventoryArr.filter(
            ({ item_name, item_desc }) =>
                isPresent(item_name, searchInp)
        ));
        if (searchInp === "") {
            setinventoryArr(setinventoryArrFunc)
        }
    };
    const updateMulti = (e) => {
        e.preventDefault();
        const updatedProducts = inventoryArr&&inventoryArr.map((product, idx) =>          
            arr.indexOf(product.variantItemId ? (product.variantItemId).toString() : (product.itemId).toString()) !== -1 ? Object.assign(product, { inventoryQuantity: updateType ? parseInt(UpdateMultiNumericValue) + parseInt(product.inventoryQuantity||0) : UpdateMultiNumericValue }) : Object.assign(product)
            )
        setinventoryArr(updatedProducts)
        setMultiValueUpdateArr([]);
        setArr([]);
        setShowUpdateScreen(false);
        setChangedInfo(true);
    }
    return (
        <article>
            <Helmet>
                <title>Items Inventory</title>
                <meta name="description" content="Menu Details" />
            </Helmet>
            <div className="mb-10 sticky w-full bg-white" style={{ paddingLeft: "0", paddingRight: "0" }}>
                <div className="sticky bg-white mobile-topNav">
                    <div className="flex justify-between pt-4">
                        <div className={isTablet?"left_container sm:ml-4 ml-8 flex":"left_container ml-4 flex"}>
                            <MediaQuery minDeviceWidth={650}>
                            <Link to="/app/manage-items">
                                <div className="arrow_icon "><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg></div>
                            </Link>
                            </MediaQuery>
                            <p className={isTablet?"flex text-lg ml-2 font-semibold text-black":"text-sm font-semibold text-black"}>Manage Inventory</p>
                        </div>
                        <TopNav />
                    </div>
                </div>
            </div>

            <div className="relative px-2 md:px-10 font-medium" style={{paddingBottom:!isTablet&&"80px"}} >

                <div className="w-full md:mt-2 flex justify-between">
                    <div className="heading font-bold text-xl mb-6">Inventory</div>
                    { inventoryItems && inventoryItems.length > 0 &&
                   <div className="flex justify-between">
                        {isTablet && <p className="text-md mr-2" style={{ color: "#242424" }}>Track inventory for all items</p>}
                        <BinaryToggle
                            inactiveColor="rgba(36,36,36,0.3)"
                            activeColor="#F64B5D"
                            toggle={toggleTrackInventory}
                            toggleCallback={() => {
                                setTrackToggleInventory(!toggleTrackInventory)
                            }}
                        />
                    </div>}
                </div>


                {inventoryItems && inventoryItems.length < 1 ?

                    <div className=" px-8 pt-5 pb-10 text-center justify-between bg-white">
                        <p className="flex content-center justify-center mx-auto md:my-10 text-xl font-bold text-center text-gray-800 capitalize">
                            Looks like you don't have any items in your Inventory ...
                        </p>
                        <NavLink exact to={
                            {
                                pathname: '/app/manage-items/item',
                                state: { edit: false }
                            }
                        }
                        >

                            <button className='bg-red-500 py-2 px-4 text-white rounded lg font-semibold'>Add Item</button>
                        </NavLink>
                    </div>
                    :
                    <div>

                        <div className={isTablet ? "px-8 py-4 flex items-center justify-between bg-white" : "relative px-8 py-4 flex items-center justify-between bg-white rounded-t-lg"} style={{ height: "96px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                            <StyledDiv>
                                <span className="search_icon mx-2 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <StyledInput placeholder="Search for items by name" className='text-lg' value={SearchInput} onChange={e => setSearchInput(e.target.value)} />
                            </StyledDiv>
                            {arr&&arr.length > 1 &&<>
                                    <div className="float-right p-4 border-2 border-solid border-secondary text-secondary hover:bg-secondary hover:text-white rounded-lg cursor-pointer" style={{minWidth:"170px"}} onClick={e => toggleHandler(e)} id="update_inventory_btn">Update Inventory</div>
                                </>}
                        </div>

                        <div style={{ overflowX: "auto", marginBottom:!ChangedInfo&& "10rem" }} className="bg-white">
                            <div >
                                <table className="w-full inventory_table">
                                    <tbody className='relative'>
                                        <tr className="font-bold text-left inventory_header_row" style={{ backgroundColor: "#1A24551A" }}>
                                            <th>
                                                <label
                                                    id="all"
                                                    className="ncheckbox_container flex justify-center item-center"
                                                    style={{ backgroundSize: arr&&inventoryArr&&arr.length === inventoryArr.length&&inventoryArr.length>0 ? 'cover' : '0px', height: "21px",backgroundColor:"white" }}
                                                    onClick={e => checkBoxHandler(e, "all")}
                                                />
                                            </th>
                                            <th className="item-label px-2" style={{height:"50px"}}>Product Name</th>

                                            <th className="item-label px-2">
                                                <span className="inventory_headericon_wrapper">
                                                    <span>Max Quantity</span>
                                                    <Tooltip
                                                        title="set maximum number of items can be sold"
                                                        arrowPointAtCenter
                                                        color={'#242424'}
                                                    >
                                                        <AiOutlineInfoCircle
                                                            className="mr-2 ml-2 text-muted-light hover:text-black flex-none"
                                                            size={18}
                                                        />
                                                    </Tooltip>{' '}
                                                </span>

                                            </th>
                                            <th className="item-label px-2">
                                                <span className="inventory_headericon_wrapper">
                                                    <span>Min Quantity</span>
                                                    <Tooltip
                                                        title="set minimum number of items in order to sell"
                                                        arrowPointAtCenter
                                                        color={'#242424'}
                                                    >
                                                        <AiOutlineInfoCircle
                                                            className="mr-2 ml-2 text-muted-light hover:text-black flex-none"
                                                            size={18}
                                                        />
                                                    </Tooltip>{' '}
                                                </span>

                                            </th>
                                            <th className="item-label px-2">Inventory Quantity</th>
                                            <th className="item-label px-2">
                                                <span className="inventory_headericon_wrapper">
                                                    <span>Threshold</span>
                                                    <Tooltip
                                                        title="if the threshold value is reached, item will be turned out of stock"
                                                        arrowPointAtCenter
                                                        color={'#242424'}
                                                    >
                                                        <AiOutlineInfoCircle
                                                            className="mr-2 ml-2 text-muted-light hover:text-black flex-none"
                                                            size={18}
                                                        />
                                                    </Tooltip>{' '}
                                                </span>

                                            </th>
                                        </tr>
                                        {inventoryArr && inventoryArr.map((p, index) => {
                                            return (
                                                <>
                                                    <ProductRow key={index} p={p} index={index} toggleHandler={toggleHandler} checkBoxHandler={checkBoxHandler} color={toggleTrackInventory} arr={arr} onChangeHandler={onChangeHandler} onToggleChangeHandler={onToggleChangeHandler} isTablet={isTablet} />
                                                    <hr style={{ width:(index!==inventoryArr.length-1) && "100%" }} className="absolute" />
                                                </>
                                            )
                                        })}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>}
              
            </div>

            {showUpdateScreen &&
                <>
                    <div className="backdrop"  />
                    <div className="invetory_popup bg-white absolute p-8 pb-5 rounded-md" style={{ zIndex: "41",padding:!isTablet&&"10px" }}>
                        <div className="popup_header flex justify-between pb-4 border-b-2">
                            <h3 className="font-semibold">Update Item Values</h3>
                            <span onClick={popupCloseHandler} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg></span>
                        </div>
                        <div className="flex jusyify-start py-4">
                            <div className="popup_toggle_div mx-2 relative flex justify-between border-2 rounded-lg cursor-pointer">
                                <span className="text-black w-1/2 py-2 px-1 md:px-2 text-center rounded-md leading-loose" id="add" onClick={e => popupToggleHandler(e)} style={updateType ? { backgroundColor: "#F64B5D", color: "white" } : { backgroundColor: "white", color: "black" }}>Add</span>
                            <span className="text-black w-1/2 py-2 px-1 md:px-4 text-center rounded-md leading-loose" id="set" onClick={e => popupToggleHandler(e)} style={updateType ? { backgroundColor: "white", color: "black" } : { backgroundColor: "#F64B5D", color: "white" }}>Set</span>
                            </div>
                        <NumericInput min={0} value={UpdateMultiNumericValue} onChange={value => { updatedQuantity(value); setUpdateMultiNumericValue(value) }} className="ml-2 focus:outline-none" type="number" style={{ input: { height: "100%",margin:"0px" } }} />
                        </div>
                    <h3 className="font-semibold">Updating {arr&&arr.length} Items</h3>
                    <div className="flex flex-col" style={{ height: isTablet?"50vh":"50vh",overflowY: "auto"}}>
                            {MultiValueUpdateArr.map((val, index) => {
                                return (
                                    <div className="flex justify-between border-b-2 py-4 font-medium" key={index} style={{border:(index===MultiValueUpdateArr.length-1)&&"none"}}>
                                        <span style={{width:isTablet?"80%":"60%"}}>
                                            {inventoryItems.find(p => p.item_id === parseInt(val.item_id)) && inventoryItems.find(p => p.item_id === parseInt(val.item_id)).item_name.substring(0, 40)}
                                            {inventoryItems.find(p => p.item_id === parseInt(val.item_id)) && inventoryItems.find(p => p.item_id === parseInt(val.item_id)).item_name.length>40&&"....."}
                                            <br/>
                                            {val.variantDetails && <span className='text-gray-500'>{val.variantDetails.variant_value_1}{val.variantDetails.variant_value_2 && " | "+ val.variantDetails.variant_value_2 }</span>}
                                        </span>
                                        <div >
                                            <span className="p-3">{val.inventoryQty||0}</span>
                                            <span className="p-3">{">"}</span>
                                            <span className="p-3 text-secondary">{updateType ? parseInt(UpdateMultiNumericValue || 0) + parseInt(val.inventoryQty||0) : UpdateMultiNumericValue}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                            <div>
                                <button className="popup_update_btn focus:outline-none p-2 bg-secondary rounded-md text-white float-right w-15 mt-5" style={{float:!isTablet&&"left",marginTop:!isTablet&&"35px"}} onClick={(e) => updateMulti(e)}>Update</button>
                            </div>
                    </div>
                </>
            }


            <MediaQuery maxDeviceWidth={650}>

                <div>

                    {/* Navigation Menu Button */}

                    <div className="bottomSticky"
                        style={{ boxShadow:"0.5px 1.5px 6px 0.1px #f64b5d"}}
                        onClick={() => setShowBackdrop(!showBackDrop)}
                    >
                        <span className="block w-full h-full" >{showBackDrop ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>}
                        </span>
                    </div>

                    {/* Navigation Menu Options */}

                    {showBackDrop && <div className="backdrop" >
                        <div className="bottom_sticky_menu">
                            <NavLink
                            exact
                                to={!upgradePopUpStatus ? {
                                    pathname: '/app/manage-items/item',
                                    state: { edit: false },
                                } : "#"}
                            >
                                <p className="font-semibold text-md border-b-2 pb-3 border-gray-300 flex"
                                    style={{ color: "#F64B5D" }}
                                >
                                    <IoIosAdd size={20} className="font-bold" />
                                    Product</p>
                            </NavLink>

                            <NavLink
                            exact
                                to={!upgradePopUpStatus ? {
                                    pathname: '/app/manage-items',
                                    state: { edit: false },
                                } : "#"}

                            >
                                <p className="hover:text-secondary font-medium">All Products</p>
                            </NavLink>
                            <NavLink
                            exact
                                to={{
                                    pathname: '/app/manage-inventory-items',
                                    state: { edit: false },
                                }}

                            >
                                <p className="hover:text-secondary font-bold">Manage Inventory</p>
                            </NavLink>
                        </div>
                    </div>
                    }
                </div>
            </MediaQuery>
            {ChangedInfo &&
                <div className='bg-white w-full sticky bottom-0 flex justify-end py-5' style={{ boxShadow: "4px 3px 8px 1px #969696", paddingBottom: !isTablet && "4.4rem",marginTop:isTablet&&"15rem",justifyContent:!isTablet&&"start" }}>
                    <button className='my-auto cta-btn' onClick={(e) => submitHandler(e)}>Save Changes</button>
                </div>}
        </article>
        
    )
}

const mapStateToProps = state => ({
    storeId: state.get('global').store.store_id,
    merchantId: state.get('global').user.merchantId,
    upgradePopUpStatus: state.get("ManageInventoryState").showUpgradePopUp,
    toggleTrackInventory: state.get("ManageInventoryState").toggleTrackInventory,
    inventoryItems: state.get('ManageInventoryState').inventoryItems,
})

const mapDispatchToProps = dispatch => ({
    setTrackToggleInventory: value => dispatch(setTrackToggleInventory(value)),
    updateInventoryItems: (storeId, merchantId, products) => dispatch(updateInventoryItems(storeId, merchantId, products)),
    getInventoryItems: (storeId) => dispatch(getInventoryItems(storeId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ManageInventory)

