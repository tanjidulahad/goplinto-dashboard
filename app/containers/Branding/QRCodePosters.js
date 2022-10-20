import React, { useEffect, useRef } from 'react'
import saveAs from 'file-saver'
import { b64toFile } from 'b64-to-file'
import makeStoreUrl from 'utils/makeStoreUrl'

const QRCodePosters = ({ numberOfElements, store, qr_codes, setShareData, downloadUrlFromApp }) => {
  const qrCodesCanvasEls = useRef(new Array())

  const storeURL = makeStoreUrl(store.store_name, store.store_id, store.store_domain_url)

  let qrCodeSrc
  const getQrCodeImage = () => {
    const qrCanvas = document.getElementById('qr_code')
    qrCodeSrc = qrCanvas.toDataURL('image/jpeg')
  }

  const loadCanvasesForQRCards = store_logo_img => {
    qrCodesCanvasEls.current.slice(0,numberOfElements).forEach((canvas, i) => {
      const cnvs = canvas
      cnvs.width = 1200
      cnvs.height = 1950
      const ctx = cnvs.getContext('2d')
      const img = new Image()
      const qr_img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, cnvs.width, cnvs.height)
        ctx.drawImage(qr_img, 325, 615, 550, 550)
        if (store_logo_img) {
          const logo_width = store_logo_img.width
          const logo_height = store_logo_img.height
          const maxH = 300
          const maxW = 500
          const w = Math.min(maxW, logo_width)
          const h = Math.min(maxH, logo_height)
          ctx.drawImage(store_logo_img, cnvs.width / 2 - w / 2, 250 - h / 2, w, h)
        }
        ctx.font = 'bold 30px Consolas'
        const storeLink = storeURL
        let fontsize = 100
        do {
          fontsize--
          ctx.font = `bold ${fontsize}px Consolas`
        } while (ctx.measureText(storeLink).width > 900)
        ctx.textAlign = 'center'
        ctx.fillText(storeLink, 600, 1500)
      }
      img.crossOrigin = 'anonymous'
      img.src = qr_codes[i]
      qr_img.crossOrigin = 'anonymous'
      qr_img.src = qrCodeSrc
    })
  }

  const loadStoreLogoAsyncAndDraw = () => {
    const loadImageAsync = url =>
      new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error(`Load ${url} fail`))
        img.crossOrigin = 'anonymous'
        img.src = url
      })

    const drawCanvases = store_logo_url =>
      loadImageAsync(store_logo_url)
        .then(store_logo_img => {
          loadCanvasesForQRCards(store_logo_img)
        })
        .catch(err => {
          /* If no store logo is set */
          loadCanvasesForQRCards(null)
        })

    drawCanvases(store.logo_img_url)
  }

  useEffect(() => {
    getQrCodeImage()
    loadStoreLogoAsyncAndDraw()
  }, [store])

  const toRender = qr_codes.map((_, i) => (
    <div className="branding__qrCode" key={i}>
      <div className="branding__overlay">

        {
          window.isWebView && (
            <div className="branding__share">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="share__icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={e => {
                  e.preventDefault()
                  const image_link = qrCodesCanvasEls.current[i].toDataURL('image/jpeg, 1.0')
                  const file = b64toFile(image_link, 'qr__code.jpeg')
                  setShareData({ idx: i, kind: 'qrCode', img: file, b64: image_link })
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
          )}

        <div className={`branding__download ${window.isWebView ? "branding__download_mobile" : "branding__download_web"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="download__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {
              const image_link = qrCodesCanvasEls.current[i].toDataURL('image/jpeg, 1.0')
              const file = b64toFile(image_link, 'business_card.jpeg')
              if (window.isWebView) {
                downloadUrlFromApp({ idx: i, kind: 'qrCode', img: file })
              } else saveAs(image_link, 'qr__code.jpeg')
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
      </div>
      <canvas ref={element => qrCodesCanvasEls.current.push(element)} />
    </div>
  ))

  return toRender
}

export default QRCodePosters
