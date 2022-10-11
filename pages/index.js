import LeftSideText from '../components/LeftSideText'
import RightSideText from '../components/RightSideText'
import TextBody from '../components/TextBody'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types'

export default function Home({ content }) {
return (
    <div className="min-h-screen">
      <div className='bg-tertiary-light'>
        <img
          src="/banner-mobile.jpg"
          className="max-h-96 w-full md:w-3/5 md:max-w-2xl mx-auto sm:hidden"
          alt="Open (out)Doors"
        />
        <img
          src="/banner.jpg"
          className="max-h-96 w-full md:w-3/5 md:max-w-2xl mx-auto hidden sm:block"
        />
      </div>
      <div className='bg-white pb-24 pt-2 sm:pt-10'>
        <main className='space-y-7'>
          <h1 className='header-font hidden sm:block mx-auto text-center'>Open (out)Doors</h1>
          {content.map((document, idx) => {
            const options = {
              renderNode: {
                [BLOCKS.UL_LIST]: (node, children) => <ul className='list-disc ml-7 space-y-2 pt-3'>{children}</ul>,
              }
            };

            let innerContent = documentToReactComponents(document, options)

            if(idx % 2 == 0) {
              return (
                <TextBody key={idx}>
                  <LeftSideText className="py-4">
                    {innerContent}
                  </LeftSideText>
                </TextBody>
              )
            } else {
              return (
                <TextBody key={idx}>
                  <RightSideText className="py-4 bg-white-alt">
                    {innerContent}
                  </RightSideText>
                </TextBody>
              )}
          }).flat()}
        </main>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  const HOMEPAGE_ENTRY_ID = "4YkqRwhrDZm92thaXmVtR7"
  let homepageContent = await client.getEntry(HOMEPAGE_ENTRY_ID)

  return {
    props: {
      content: Object.values(homepageContent.fields)
    }
  }
}
