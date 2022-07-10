import DefaultHead from '../components/DefaultHead'
import LeftSideText from '../components/LeftSideText'
import Nav from '../components/Nav'
import RightSideText from '../components/RightSideText'
import TextBody from '../components/TextBody'

export default function Home() {
  return (
    <>
      <DefaultHead/>
      <div className='pb-24 sm:pb-0'>
        <Nav/>
      </div>
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
          <div className='space-y-7'>
            <h1 className='header-font hidden sm:block mx-auto text-center'>Open (out)Doors</h1>
            <TextBody>
              <LeftSideText className="py-4">
                <p>
                  Open Outdoors is a Queer led organization that seeks to minimize the barriers to accessing the outdoors for groups that have been historically isolated from the outdoors industry.
                </p>
              </LeftSideText>
              <RightSideText className="bg-white-alt py-4">
                  <p>
                    We consist of a few people excited to help queer people and other marginalized groups get outside, build relationships, and share knowledge and resources. One of our aims is to minimize financial and logistical barriers to accessing the outdoors by creating community gear share networks and building up a library of gear to lend and give away.
                  </p>
              </RightSideText>
              <LeftSideText className="py-4">
                <p>We also recognize the power of representation in enabling access to space, and want to normalize the inclusion of diverse communities, bodies, and skill levels that been historically excluded from the outdoors industry.</p>
              </LeftSideText>
              <RightSideText className="bg-white-alt py-4">
                <p>
                  We are a non-hierarchical organization, which for us means actively working to provide the resources and space to enable anyone involved to contribute, and recognizing the contributions of all involved, not just the organizers or leaders.
                </p>
              </RightSideText>
              <LeftSideText className="py-4">
                  <p>{"This organization is still in it's infancy but our dreams include:"}</p>
                  <ul className='list-disc ml-7 space-y-2 pt-3'>
                    <li>Gear sharing networks and swaps</li>
                    <li>Coordinating gear donations from major companies</li>
                    <li>Workshops and educational opportunities</li>
                    <li>Guided trips and excursions</li>
                    <li>Community building events</li>
                    <li>Rideshare networks</li>
                    <li>Adventure based communication channels</li>
                    <li>And more!</li>
                  </ul>
              </LeftSideText>
            </TextBody>
          </div>
        </div>
      </div>
    </>
  )
}
