import { BasicHeader } from '../components/BasicHeader'

export default function DehydrationCookbook({ pageTitle }){
  return (
    <main className="grow">
      <iframe className="h-screen w-full mx-auto max-w-4xl" src="https://docs.google.com/document/d/e/2PACX-1vQCX-NA5_AfkGtNK7a_wqOIlN2Oz2PCja3gFC8Yl4z9s8O1WYhkqT2G52v62y_-x9A8teSk3LmAfUSH/pub?embedded=true"></iframe>
    </main>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Dehydration Cookbook",
    }
  }
}
