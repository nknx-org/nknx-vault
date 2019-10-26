import path from 'path'
import BrowserWinHandler from './BrowserWinHandler'
const isDev = process.env.NODE_ENV === 'development'

const INDEX_PATH = path.join(__dirname, '..', 'renderer', 'index.html')
const DEV_SERVER_URL = process.env.DEV_SERVER_URL // eslint-disable-line prefer-destructuring

const winHandler = new BrowserWinHandler({
  height: 855,
  minHeight: 855,
  maxHeight: 855,
  width: 1080,
  minWidth: 1080,
  maxWidth: 1380,
  transparent: true,
  frame: false
})

winHandler.onCreated(browserWindow => {
  if (isDev) {
    browserWindow.loadURL(DEV_SERVER_URL)
  } else {
    browserWindow.loadFile(INDEX_PATH)
    browserWindow.removeMenu()
  }
})

export default winHandler
