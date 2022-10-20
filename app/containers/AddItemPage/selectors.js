export const categorySelector = state => {
  const categoriesObjList = state.get('inventory').categories
  const categories = categoriesObjList.map(item => ({ label: item.category_name, value: item.category_id }))
  return [...categories, { label: '+ Create New Category', value: -1 }]
}


export const subCategoriesSelector = state => {
  const allSubCategories = state.get('inventory').subCategories
  const requiredSubCategories = allSubCategories.map(item => ({
    categoryId: item.category_id,
    label: item.sub_category_name,
    value: item.sub_category_id,
  }))
  return requiredSubCategories
}
