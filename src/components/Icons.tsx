import type { SVGProps } from 'react'
import { Mail } from 'lucide-react'
import type { SocialLink } from '../types'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export function GitHubIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.65 18.35.5 12 .5Z" />
    </Base>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </Base>
  )
}

export function TelegramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M21.94 3.43a1.2 1.2 0 0 0-1.22-.2L2.6 10.2a1.2 1.2 0 0 0 .1 2.27l4.6 1.45 1.78 5.62a1.2 1.2 0 0 0 2.02.46l2.57-2.6 4.6 3.4a1.2 1.2 0 0 0 1.9-.72l3-15.2a1.2 1.2 0 0 0-.43-1.14ZM9.3 13.7l8.2-5.06-6.3 6.73a1.2 1.2 0 0 0-.3.6l-.35 2.1L9.3 13.7Z" />
    </Base>
  )
}

export function SocialIcon({ id, size = 20 }: { id: SocialLink['id']; size?: number }) {
  switch (id) {
    case 'github':
      return <GitHubIcon size={size} />
    case 'linkedin':
      return <LinkedInIcon size={size} />
    case 'telegram':
      return <TelegramIcon size={size} />
    case 'email':
      return <Mail size={size} aria-hidden="true" />
  }
}
