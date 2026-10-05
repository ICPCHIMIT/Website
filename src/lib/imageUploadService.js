import { supabase } from './supabase'

/**
 * Compresses an image file client-side using HTML5 Canvas.
 * Keeps output compact (~50KB - 150KB) while maintaining crisp visual quality.
 */
export async function compressImage(file, { maxWidth = 1200, maxHeight = 1200, quality = 0.75 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => resolve({ dataUrl: reader.result, blob: file })
      reader.onerror = reject
      reader.readAsDataURL(file)
      return
    }

    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = (e) => {
      const rawDataUrl = e.target.result
      const img = new Image()
      img.onerror = () => resolve({ dataUrl: rawDataUrl, blob: file })
      img.onload = () => {
        try {
          let { width, height } = img

          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width)
              width = maxWidth
            } else {
              width = Math.round((width * maxHeight) / height)
              height = maxHeight
            }
          }

          const canvas = document.createElement('canvas')
          canvas.width = Math.max(width, 1)
          canvas.height = Math.max(height, 1)

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            resolve({ dataUrl: rawDataUrl, blob: file })
            return
          }

          // Fill white background in case PNG had transparent areas
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)

          canvas.toBlob(
            (blob) => {
              resolve({
                dataUrl: compressedDataUrl,
                blob: blob || file
              })
            },
            'image/jpeg',
            quality
          )
        } catch (err) {
          console.warn('Canvas compression fallback to raw data URL:', err)
          resolve({ dataUrl: rawDataUrl, blob: file })
        }
      }
      img.src = rawDataUrl
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Uploads a file/blob to Supabase Storage bucket.
 * Returns public URL if successful, or null on error.
 */
export async function uploadImageToStorage(blobOrFile, { bucket = 'applications', folder = 'uploads', filename } = {}) {
  try {
    const cleanExt = blobOrFile.type?.includes('png') ? 'png' : 'jpg'
    const name = filename || `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${cleanExt}`
    const path = `${folder}/${name}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, blobOrFile, {
        contentType: blobOrFile.type || 'image/jpeg',
        upsert: true
      })

    if (error) {
      console.warn(`Supabase Storage upload notice for ${bucket}/${path}:`, error.message)
      return null
    }

    if (data?.path) {
      const { data: pubData } = supabase.storage.from(bucket).getPublicUrl(data.path)
      return pubData?.publicUrl || null
    }

    return null
  } catch (err) {
    console.warn('Storage upload error caught:', err)
    return null
  }
}

/**
 * High-level helper: Compresses image, attempts storage upload, falls back to compressed Base64.
 * Guarantees a valid image value is returned without ever failing the user submission.
 */
export async function processAndUploadImage(file, { bucket = 'applications', folder = 'general' } = {}) {
  if (!file) return null

  // 1. Client-side compression
  const { dataUrl, blob } = await compressImage(file)

  // 2. Try Supabase Storage
  const storageUrl = await uploadImageToStorage(blob, { bucket, folder })

  if (storageUrl) {
    return {
      value: storageUrl,
      preview: storageUrl,
      isRemote: true
    }
  }

  // 3. Fallback to compact compressed DataURL
  return {
    value: dataUrl,
    preview: dataUrl,
    isRemote: false
  }
}
