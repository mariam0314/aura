import JSZip from 'jszip'

/**
 * Extract clean readable text from a DOCX buffer
 */
export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buffer)
  const docXml = await zip.file('word/document.xml')?.async('text')
  if (!docXml) {
    throw new Error('Invalid DOCX file: word/document.xml not found')
  }

  // Extract text within <w:t> tags
  const textMatches = docXml.match(/<w:t[^>]*>(.*?)<\/w:t>/g)
  if (!textMatches) return ''

  const text = textMatches
    .map((tag) => tag.replace(/<[^>]+>/g, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  return text
}

/**
 * Extract clean readable text from a PPTX buffer
 */
export async function extractTextFromPptx(buffer: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buffer)
  const slideFiles = Object.keys(zip.files).filter((fileName) =>
    fileName.startsWith('ppt/slides/slide') && fileName.endsWith('.xml')
  )

  // Sort slides numerically
  slideFiles.sort((a, b) => {
    const numA = parseInt(a.replace(/[^0-9]/g, '') || '0', 10)
    const numB = parseInt(b.replace(/[^0-9]/g, '') || '0', 10)
    return numA - numB
  })

  const slidesText: string[] = []

  for (const slideFile of slideFiles) {
    const slideXml = await zip.file(slideFile)?.async('text')
    if (slideXml) {
      const textMatches = slideXml.match(/<a:t[^>]*>(.*?)<\/a:t>/g)
      if (textMatches) {
        const slideText = textMatches
          .map((tag) => tag.replace(/<[^>]+>/g, ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim()
        if (slideText) {
          slidesText.push(`[Slide ${slidesText.length + 1}]: ${slideText}`)
        }
      }
    }
  }

  return slidesText.join('\n\n')
}

/**
 * Extract text from PDF buffer
 */
export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import to avoid SSR/bundling issues
    const pdfParseModule = await import('pdf-parse')
    const pdfParse = (pdfParseModule as any).default || pdfParseModule
    const data = await pdfParse(buffer)
    return data.text ? data.text.trim() : ''
  } catch (err: any) {
    console.warn('pdf-parse error, falling back to raw stream text extraction:', err)
    // Fallback: extract ASCII string tokens from stream
    const raw = buffer.toString('utf-8')
    const matches = raw.match(/\(([^()]{2,})\)Tj/g) || []
    if (matches.length > 0) {
      return matches.map((m) => m.slice(1, -3)).join(' ')
    }
    return 'Document text could not be extracted directly from binary stream.'
  }
}

/**
 * Extract text based on file extension
 */
export async function extractDocumentText(
  fileName: string,
  buffer: Buffer
): Promise<string> {
  const lower = fileName.toLowerCase()
  if (lower.endsWith('.pdf')) {
    return extractTextFromPdf(buffer)
  }
  if (lower.endsWith('.docx')) {
    return extractTextFromDocx(buffer)
  }
  if (lower.endsWith('.pptx')) {
    return extractTextFromPptx(buffer)
  }
  if (lower.endsWith('.txt') || lower.endsWith('.md')) {
    return buffer.toString('utf-8')
  }
  throw new Error(`Unsupported file type: ${fileName}. Please upload PDF, PPTX, or DOCX.`)
}
