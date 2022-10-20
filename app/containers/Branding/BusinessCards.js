import React, { useEffect, useRef } from 'react'
import saveAs from 'file-saver'
import { b64toFile } from 'b64-to-file'
import makeStoreUrl from 'utils/makeStoreUrl'

const BusinessCards = ({ numberOfElements, store, business_cards, setShareData, downloadUrlFromApp }) => {
  const businessCanvasEls = useRef(new Array())

  const storeURL = makeStoreUrl(store.store_name, store.store_id, store.store_domain_url)

  let qrCodeSrc
  const getQrCodeImage = () => {
    const qrCanvas = document.getElementById('qr_code')
    qrCodeSrc = qrCanvas.toDataURL('image/jpeg')
  }

  const loadCanvasesForBusinessCards = store_logo_img => {
    businessCanvasEls.current.slice(0,numberOfElements).forEach((canvas, i) => {
      const cnvs = canvas
      cnvs.width = 1125
      cnvs.height = 675
      const ctx = cnvs.getContext('2d')
      if (i === 0) ctx.fillStyle = '#f2f2f2'
      else ctx.fillStyle = '#262626'
      ctx.font = 'bold 35px Consolas'
      const img = new Image()
      const qr_img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, cnvs.width, cnvs.height)
        ctx.drawImage(qr_img, 155, 300, 250, 250)
        if (store_logo_img) ctx.drawImage(store_logo_img, 105, 100, 350, 160)
        ctx.fillText(`+${store.isd_code_phone_number}${store.primary_phone}`, 630, 235)
        ctx.fillText(store.primary_email, 630, 340)
        let storeLink = storeURL
        let y = ctx.measureText(storeLink).width > 460 ? 440 : 445
        do {
          for (let i = storeLink.length - 1; i >= 0; i--) {
            const newLine = storeLink.substring(0, i + 1)
            if (ctx.measureText(newLine).width <= 460) {
              ctx.fillText(newLine, 630, y)
              storeLink = storeLink.substring(i + 1, storeLink.length)
              y += 50
              break
            }
          }
        } while (ctx.measureText(storeLink).width > 460)
        ctx.fillText(storeLink, 630, y)
      }
      img.crossOrigin = 'anonymous'
      img.src = business_cards[i]
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
          loadCanvasesForBusinessCards(store_logo_img)
        })
        .catch(err => {
          /* If no store logo is set */
          loadCanvasesForBusinessCards(null)
        })

    drawCanvases(store.logo_img_url)
  }

  useEffect(() => {
    getQrCodeImage()
    loadStoreLogoAsyncAndDraw()
  }, [store])

  const toRender = business_cards.map((_, i) => (
    <div className="branding__businessCard" key={i}>
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
                  const image_link = businessCanvasEls.current[i].toDataURL('image/jpeg, 1.0')
                  const file = b64toFile(image_link, 'business_card.jpeg')
                  setShareData({ idx: i, kind: 'branding', img: file, b64: image_link })
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
          )
        }

        <div className={`branding__download ${window.isWebView ? "branding__download_mobile" : "branding__download_web"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="download__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {
              const image_link = businessCanvasEls.current[i].toDataURL('image/jpeg, 1.0')
              const file = b64toFile(image_link, 'business_card.jpeg')
              if (window.isWebView) {
                downloadUrlFromApp({ idx: i, kind: 'branding', img: file })
              } else saveAs(image_link, 'business_card.jpeg')
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
      <canvas ref={element => businessCanvasEls.current.push(element)} />
    </div>
  ))

  return toRender
}

export default BusinessCards
