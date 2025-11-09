export function getBaseUrl() {
  // Check if we're on the server
  if (typeof window === 'undefined') {
    // In production on Vercel
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    }
    // For server-side API calls in Docker/production, use 127.0.0.1 with PORT
    // Using 127.0.0.1 instead of localhost to avoid IPv6 issues in Docker
    const port = process.env.PORT || '3001'
    return `http://127.0.0.1:${port}`
  }
  // On the client-side, use empty string for relative URLs
  return ''
}
