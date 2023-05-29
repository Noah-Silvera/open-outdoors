import GearItem from "../../components/gear_library/GearItem";
import contentfulClient from "../../src/server/contentful_client";

export default function({ gearItem }){
  return (
    <div className="bg-tertiary-light/70">
      <div className="max-w-lg mx-auto pt-8 pb-8">
        <div className="bg-white-alt rounded-md">
          <GearItem gearForLoan={gearItem}/>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  let response = await contentfulClient.getEntries({
    content_type: "gearForLoan",
    order: "sys.createdAt"
  })

  return {
    paths: response.items.map((item) => {
      return {
        params: {
          gearId: item.sys.id
        }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let response = await contentfulClient.getEntry(params.gearId)

  return {
    props: {
      gearItem: response.fields
    }
  }
}
