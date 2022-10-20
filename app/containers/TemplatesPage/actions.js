import { GET_STORE_TEMPLATES, SET_STORE_TEMPLATES, SET_TEMPLATES } from "./constants";

export const getTemplates = ({ storeId,planId }) => ({
  type: GET_STORE_TEMPLATES,
  storeId,
  planId
})
export const setTemplate = ({ storeId, template }) => ({
  type: SET_STORE_TEMPLATES,
  storeId,
  template
})

export const setTemplatesArray = ({templates}) => ({
    type: SET_TEMPLATES,
    templates
})
