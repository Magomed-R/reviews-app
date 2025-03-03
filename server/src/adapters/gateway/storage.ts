import fs from 'fs/promises'
import { basename, extname } from 'path'

interface Storage {
  put(image: { filename: string, buffer: Buffer }): Promise<{ url: string }>
}

class Storage {
  async put({ filename, buffer }: { filename: string, buffer: Buffer }) {
    const format = extname(filename)

    const url = `${basename(filename, format)}-${Date.now()}${format}`
    const writePath = `../storage/${url}`

    await fs.writeFile(writePath, buffer)

    return { url }
  }
}

export default new Storage()