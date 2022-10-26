import twemoji from 'twemoji'
import clsx from 'clsx'

type TwemojiSize = 'lg' | 'md' | 'sm'

interface TwemojiProps {
  emoji: string
  size?: TwemojiSize
}

export default function Twemoji({ emoji, size = 'md' }: TwemojiProps) {
  return (
    <span
      className={
        clsx(
          size === 'lg' && 'h-10 w-10',
          size === 'md' && 'h-8 w-8',
          size === 'sm' && 'h-6 w-6',
          'mr-[.05rem] ml-[.1rem] align-[-0.1rem]'
        ) 
      }
      dangerouslySetInnerHTML={
        {
          __html: twemoji.parse(emoji, {
            folder: 'svg',
            ext: '.svg',
          }),
        } 
      }
    />
  )
}
