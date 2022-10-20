// Use Env var for choosing 'devo' or 'shops'
const shopsPrefix = process.env.REACT_APP_SHOPS_ENV

const makeStoreUrl = (storeName, storeId,store_domain_url) => {
    if (storeName && storeId)
        storeName = encodeURIComponent(storeName.replace(/\s+/g, '-'))
    const url = `https://${shopsPrefix}.goplinto.com/${storeName}/${storeId}`
    return store_domain_url||url
}

export default makeStoreUrl