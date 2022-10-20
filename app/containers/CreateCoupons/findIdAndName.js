import couponTypesName from './couponTypesName'

const findTypeId = couponType => {
  let type_id = 3
  if (couponType == couponTypesName.FIXED_AMOUNT) {
    type_id = 1
  }
  if (couponType == couponTypesName.PERCENTAGE) {
    type_id = 2
  }
  if (couponType == couponTypesName.FREE_DELIVERY) {
    type_id = 3
  }
  if (couponType == couponTypesName.BUY_X_GET_Y) {
    type_id = 4
  }
  return type_id
}

const findTypeName = Id => {
  let type_name
  if (Id == 1) {
    type_name = 'FIXED_AMOUNT'
  }
  if (Id == 2) {
    type_name = 'PERCENTAGE'
  }
  if (Id == 3) {
    type_name = 'FREE_DELIVERY'
  }
  if (Id == 4) {
    type_name = 'BUY_X_GET_Y'
  }
  return type_name
}

export { findTypeName, findTypeId }
