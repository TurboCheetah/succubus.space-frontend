import Layout from '../../components/layout'
import Scripts from '../../components/scripts'
import Utils from '../../utils'
import Link from 'next/link'
import * as axios from 'axios'

const Post = (props) => (
  <div>
    <Layout title={`Succubus.Space | ${props.name}`} description={props.description} image={props.poster} />
    <div id='preloder'>
      <div className='loader' />
    </div>
    <header className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-2'>
            <div className='header__logo'>
              <Link href='/'><a>
                <img width='50px' height='50px' src='/img/logo.png' alt='' />
              </a>
              </Link>
            </div>
          </div>
          <div className='col-lg-8'>
            <div className='header__nav'>
              <nav className='header__menu mobile-menu'>
                <ul>
                  <li className='active'><Link href='/'><a>Home</a></Link></li>
                  {/*                   <li><a href='./categories.html'>Categories <span className='arrow_carrot-down' /></a>
                    <ul className='dropdown'>
                      <li><a href='./categories.html'>Categories</a></li>
                      <li><a href='./anime-details.html'>Anime Details</a></li>
                      <li><a href='./anime-watching.html'>Anime Watching</a></li>
                      <li><a href='./blog-details.html'>Blog Details</a></li>
                      <li><a href='./signup.html'>Sign Up</a></li>
                      <li><a href='./login.html'>Login</a></li>
                    </ul>
                  </li> */}
                  <li><a href='https://discord.gg/FFGrsWE'>Discord</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='header__right'>
              <a href='#' className='search-switch'><span className='icon_search' /></a>
              <Link href='/login'><a><span className='icon_profile' /></a></Link>
            </div>
          </div>
        </div>
        <div id='mobile-menu-wrap' />
      </div>
    </header>

    <section className='anime-details spad'>
      <div className='container'>
        <div className='anime__details__content'>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='anime__details__pic set-bg' data-setbg={props.poster}>
                <div className='comment'><i className='fa fa-thumbs-up' /> {props.likes}</div>
                <div className='view'><i className='fa fa-eye' /> {props.views}</div>
              </div>
            </div>
            <div className='col-lg-9'>
              <div className='anime__details__text'>
                <div className='anime__details__title'>
                  <h3>{props.name}</h3>
                  <span>{props.titles ? props.titles.join(', ') : ''}</span>
                </div>
                <p>{props.description ? props.description : 'No description available'}
                </p>
                <div className='anime__details__widget'>
                  <div className='row'>
                    <div className='col-lg-6 col-md-6'>
                      <ul>
                        <li><span>Censored:</span> {props.censored}</li>
                        <li><span>Studios:</span> {props.brand ? props.brand : ''}</li>
                        <li><span>Date aired:</span> {props.release}</li>
                        <li><span>Genre:</span> {props.tags}</li>
                      </ul>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                      <ul>
                        <li><span>Likes/Dislikes:</span> {props.likes} / {props.dislikes}</li>
                        <li><span>Rank:</span> {props.rank}</li>
                        <li><span>Duration:</span> {props.duration}</li>
                        <li><span>Views:</span> {props.views}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='anime__details__btn'>
                  <a href='#' className='follow-btn'><i className='fa fa-heart-o' /> Like</a>
                  <a href={props.watch} className='follow-btn'>Watch Now <i className='fa fa-angle-right' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer className='footer'>
      <div className='page-up'>
        <a href='#' id='scrollToTopButton'><span className='arrow_carrot-up' /></a>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3'>
            <div className='footer__logo'>
              <Link href='/'><a><img width='100%' src='/img/logo-banner.png' alt='' /></a></Link>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='footer__nav'>
              <ul>
                <li className='active'><Link href='/'><a>Home</a></Link></li>
                {/* <li><a href='./categories.html'>Categories</a></li> */}
                <li><a href='https://discord.gg/FFGrsWE'>Discord</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div className='search-model'>
      <div className='h-100 d-flex align-items-center justify-content-center'>
        <div className='search-close-switch'><i className='icon_close' /></div>
        <form className='search-model-form'>
          <input type='text' id='search-input' placeholder='Search here.....' />
        </form>
      </div>
    </div>
    <Scripts />
  </div>
)

Post.getInitialProps = async (request) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.succubus.space/hentai/${request.query.id}`,
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

export default Post
