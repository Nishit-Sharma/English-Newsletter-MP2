import BLOG from '@/blog.config'
import Link from 'next/link'
import Social from '../Common/Social.js'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  MailIcon,
  RssIcon,
  ClipboardCheckIcon,
  NewspaperIcon
} from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import { NotionRenderer } from 'react-notion-x'

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then((m) => m.Collection), { ssr: true }
)

const Hero = ({ blockMap }) => {
  const [showCopied, setShowCopied] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]

  const clickCopy = async () => {
    setShowCopied(true)
    navigator.clipboard.writeText(BLOG.link + '/feed')
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  return (
    <>
      <div className=''>
        <div className=''>
          <NotionRenderer
            className='md:ml-0'
            recordMap={blockMap}
            components={{ Collection }}
          />
           <Social />
          <div className=''>
            <Link passHref href='' scroll={false}>
              <button className=''>
                <MailIcon className=''/>
                  {/*
                 <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.HOME.CONTACT_BUTTON_DES}
                  </span>
                  <span className='font-medium'>{t.HERO.HOME.CONTACT_BUTTON}</span>
                </span>
                */}
              </button>
            </Link>
            {showCopied ? (
              <button
                disabled
                className=''>
                <ClipboardCheckIcon className='' />
                <span className=''>
                  <span className=''>
                    {t.HERO.RSS_BUTTON_DES_COPIED}
                  </span>
                  <span className=''>
                    {t.HERO.RSS_BUTTON_COPIED}
                  </span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => clickCopy()}
                className=''
              >
                <RssIcon className='' />
                  {/*
                 <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.RSS_BUTTON_DES}
                  </span>
                  <span className='font-medium'>{t.HERO.HOME.RSS_BUTTON}</span>
                </span>
               */}
              </button>
            )}
          </div>
        </div>
        <div className='w-2/5'>
          <NewspaperIcon className='object-cover object-center text-gray-500 dark:text-gray-300' />
        </div>
      </div>
    </>
  )
}

export default Hero
