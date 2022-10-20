
export const selectCategories = state => {
  const { categories } = state.get('inventory')

  return categories.map(item => ({ label: item.category_name, value: item.category_id }))
}
