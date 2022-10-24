import twemoji from 'twemoji'

interface TwemojiProps {
  emoji: string
}

export default function Twemoji({ emoji }: TwemojiProps) {
  return <span className='w-6 h-6 mr-[.05rem] ml-[.1rem] align-[-0.1rem]' dangerouslySetInnerHTML={{
    __html: twemoji.parse(emoji, {
      folder: 'svg',
      ext: '.svg'
    })
  }} />
}