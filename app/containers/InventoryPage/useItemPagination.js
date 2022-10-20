import React from 'react'

// Custom hook to fetch items based on category and subcategory
// For all items, pass category = 0 and subcategory = 0

const useGetItems = (pageNum, setPageNum, totalPageCount, categoryId, subCategoryId, storeId, getItems, setItems) => {
  React.useEffect(() => {
    setItems([])
    setPageNum(1)
  }, [categoryId, subCategoryId])

  React.useEffect(() => {
    if (!totalPageCount || pageNum <= totalPageCount) getItems(storeId, categoryId, subCategoryId, pageNum)
  }, [pageNum, categoryId, subCategoryId])
  return null
}

export default useGetItems
