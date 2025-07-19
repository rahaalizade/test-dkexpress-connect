import { useState } from 'react'
import { NavigateTabProps } from './download-button.types'

const useDownloadButton = (properties: NavigateTabProps) => {
  const { navId } = properties
  const [loadingID, setLoading] = useState<any>(undefined)

  const handleDownload = async ({ fileUrl, id }: { fileUrl: any; id: any }) => {
    setLoading(id)
    try {
      const url = fileUrl
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = 'downloaded-file' // Optional: Add extension if needed
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download file.')
    } finally {
      setLoading(undefined)
    }
  }

  return {
    handleDownload,
    isLoading: loadingID === navId,
  }
}

export { useDownloadButton }
