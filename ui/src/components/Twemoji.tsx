import twemoji from 'twemoji'
import clsx from 'clsx'

type TwemojiSize = 'lg' | 'md' | 'sm'

interface TwemojiProps {
  emoji: string
  size?: TwemojiSize
}

export default function Twemoji({ emoji, size = 'md' }: TwemojiProps) {
  return <span className={clsx(size === 'lg' && 'w-10 h-10', size === 'md' && 'w-8 h-8', size === 'sm' && 'w-6 h-6', 'mr-[.05rem] ml-[.1rem] align-[-0.1rem]')} dangerouslySetInnerHTML={{
    __html: twemoji.parse(emoji, {
      folder: 'svg',
      ext: '.svg'
    })
  }} />
}