import { useFileSystemAccess, useObjectUrl } from '@vueuse/core'

export const useFile = (
  types?: Array<{
    description?: string
    accept: Record<string, string[]>
  }>,
) => {
  const {
    isSupported,
    data,
    file,
    fileName,
    fileMIME,
    fileSize,
    fileLastModified,
    create,
    open,
    save,
    saveAs,
    updateData,
  } = useFileSystemAccess({ types })

  const fileUrl = useObjectUrl(file)

  return {
    isSupported,
    data,
    file,
    fileName,
    fileMIME,
    fileSize,
    fileLastModified,
    create,
    open,
    save,
    saveAs,
    updateData,

    fileUrl,
  }
}
