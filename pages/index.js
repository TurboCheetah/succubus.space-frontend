import Layout from '../components/layout'
import Scripts from '../components/scripts'
import Utils from '../utils'
import Link from 'next/link'
import * as axios from 'axios'

const Index = (props) => (
  <div>
    <Layout
      title='Succubus.Space'
      description='Have you ever wanted to find hentai? Succubus.Space puts it all in one elegant website!'
      image='img/logo.png'
    />
    <div id='preloder'>
      <div className='loader' />
    </div>
    <Scripts />
  </div>
)

Index.getInitialProps = async () => {
  try {
        const options = {
      method: 'GET',
      url: `https://api.succubus.space/hentai/1226`,
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
      watch: data.url,
      views: data.views.toLocaleString(undefined),
      likes: data.likes.toLocaleString(undefined),
      dislikes: data.dislikes.toLocaleString(undefined),
      downloads: data.downloads.toLocaleString(undefined),
      malURL: data.malURL,
      poster: data.cover_url,
      brand: data.brand,
      release: data.released_at,
      tags: Utils.toProperCase(data.tags.join(', ')),
      rank: data.monthly_rank.toLocaleString(undefined),
      censored: Utils.toProperCase(data.is_censored.toString()),
      duration: Utils.getDuration(data.duration_in_ms)
    }
  } catch (e) {
    console.error(e)
    return e.length > 0 ? e : 'Error'
  }
}

export default Index
