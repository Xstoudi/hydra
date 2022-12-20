import twemoji from 'twemoji'
import clsx from 'clsx'
import { memo } from 'react'

type TwemojiSize = 'lg' | 'md' | 'sm'

interface TwemojiProps {
  emoji: string
  size?: TwemojiSize
  className?: string
}

function Twemoji({ emoji, size = 'md', className }: TwemojiProps) {
  return (
    <div className={
      clsx(
        size === 'lg' && 'h-10 w-10',
        size === 'md' && 'h-8 w-8',
        size === 'sm' && 'h-6 w-6',
        className
      ) 
    }>
      <span
        
        dangerouslySetInnerHTML={
          {
            __html: twemoji.parse(emoji, {
              folder: 'svg',
              ext: '.svg',
            }),
          } 
        }
      />
    </div>
  )
}

export default memo(Twemoji)