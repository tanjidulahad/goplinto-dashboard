import { READ_ORDER, SET_ORDER, SHOW_ORDER } from "./constants";

export const readOrder = orderId => ({
    type: READ_ORDER,
    orderId
})

export const setOrder = order => ({
    type: SET_ORDER,
    order
})

export const showOrder = value => ({
    type: SHOW_ORDER,
    value
})