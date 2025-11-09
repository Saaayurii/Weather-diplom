export function getBaseUrl() {
  // Check if we're on the server
  if (typeof window === 'undefined') {
    // On Vercel production
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    }
    // On Vercel (fallback if VERCEL_URL is not set)
    if (process.env.VERCEL) {
      // Use the production domain - update this with your actual domain
      return 'https://weather-diplom.vercel.app'
    }
    // For local development, use localhost with PORT
    const port = process.env.PORT || '3001'
    return `http://127.0.0.1:${port}`
  }
  // On the client-side, use empty string for relative URLs
  return ''
}
