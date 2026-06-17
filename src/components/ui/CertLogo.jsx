import { useState } from 'react'

/**
 * CertLogo — renders a certification logo image when available, and falls back
 * to a styled text/name render if the file is missing or fails to load.
 *
 * Drop the real logo files into `public/images/certs/` (see the `logo` paths in
 * src/data/site.js). Until they exist, the fallback keeps the layout intact.
 */
export default function CertLogo({ cert, imgClassName = '', renderFallback }) {
  const [failed, setFailed] = useState(false)

  if (!cert.logo || failed) {
    return renderFallback ? renderFallback() : <span>{cert.name}</span>
  }

  return (
    <img
      src={cert.logo}
      alt={cert.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={imgClassName}
    />
  )
}
