import contentfulClient from '../src/server/contentful_client';
import { BasicHeader } from '../components/BasicHeader'
import styles from '../styles/MeetingMinutes.module.scss'
import classNames from 'classnames'

export default function MeetingMinutes({ pageTitle, content }){
  return (
    <main>
      <BasicHeader>{pageTitle}</BasicHeader>
      {/* {content.map((minutes, idx) => {
        return (
          <section className='max-w-3xl mx-auto py-10' key={idx}>
            <h2 className='text-3xl mb-5 text-center md:text-left'>{minutes.meetingTitle} - {new Date(minutes.meetingDate).toDateString()}</h2>
            <div className={classNames(styles["google-doc-iframe"], "border-black border-2")} dangerouslySetInnerHTML={{__html: minutes.googleDocEmbedLink.content[0].content[0].value}} />;
          </section>
        )
      })} */}
    </main>
  )
}

export async function getStaticProps() {
  let response = await contentfulClient.getEntries({
    content_type: "meetingMinutes",
    order: "-fields.meetingDate"
  })

  return {
    props: {
      pageTitle: "Meeting Minutes",
      content: response.items.map((item) => item.fields)
    }
  }
}
