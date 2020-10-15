import * as axios from 'axios'
import { useRouter } from 'next/router'
const index = (props) => (
  <div>
    <h1>{props.name}</h1>
    <h3>Alternate Titles: {props.titles.join(', ')}</h3>
    <p>Downloads: {props.downloads}</p>
    {props.malURL.length > 0 ? <p>{props.malURL}</p> : <p>Not listed on MAL</p>}
    {getID()}
  </div>
)

function getID () {
  const router = useRouter()
  console.log(router.route)
}

index.getInitialProps = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'http://66.70.162.209:4445/api/hentai/1226',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      }
    }

    const data = await axios.request(options).then(res => {
      return res.data
    }).catch(err => {
      console.error(err)
    })

    return {
      name: data.name,
      titles: data.titles,
      description: data.description,
      likes: data.likes,
      dislikes: data.dislikes,
      downloads: data.downloads,
      malURL: data.malURL
    }
  } catch (e) {
    console.error(e)
    return e.length > 0 ? e : 'Error'
  }
}

export default index
