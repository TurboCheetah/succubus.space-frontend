import Layout from '../../components/layout'
import Scripts from '../../components/scripts'
import Utils from '../../utils'
import Link from 'next/link'
import * as axios from 'axios'

const Post = (props) => (
  <div>
    <Layout />
    <div id='preloder'>
      <div class='loader' />
    </div>
    <header class='header'>
      <div class='container'>
        <div class='row'>
          <div class='col-lg-2'>
            <div class='header__logo'>
              <Link href='/'><a>
                <img width='50px' height='50px' src='/img/logo.png' alt='' />
              </a>
              </Link>
            </div>
          </div>
          <div class='col-lg-8'>
            <div class='header__nav'>
              <nav class='header__menu mobile-menu'>
                <ul>
                  <li class='active'><Link href='/'><a>Home</a></Link></li>
                  {/*                   <li><a href='./categories.html'>Categories <span class='arrow_carrot-down' /></a>
                    <ul class='dropdown'>
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
          <div class='col-lg-2'>
            <div class='header__right'>
              <a href='#' class='search-switch'><span class='icon_search' /></a>
              <Link href='/login'><a><span class='icon_profile' /></a></Link>
            </div>
          </div>
        </div>
        <div id='mobile-menu-wrap' />
      </div>
    </header>

    <section class='anime-details spad'>
      <div class='container'>
        <div class='anime__details__content'>
          <div class='row'>
            <div class='col-lg-3'>
              <div class='anime__details__pic set-bg' data-setbg={props.poster}>
                <div class='comment'><i class='fa fa-thumbs-up' /> {props.likes}</div>
                <div class='view'><i class='fa fa-eye' /> {props.views}</div>
              </div>
            </div>
            <div class='col-lg-9'>
              <div class='anime__details__text'>
                <div class='anime__details__title'>
                  <h3>{props.name}</h3>
                  <span>{props.titles ? props.titles.join(', ') : ''}</span>
                </div>
                <p>{props.description ? props.description : 'No description available'}
                </p>
                <div class='anime__details__widget'>
                  <div class='row'>
                    <div class='col-lg-6 col-md-6'>
                      <ul>
                        <li><span>Censored:</span> {props.censored}</li>
                        <li><span>Studios:</span> {props.brand ? props.brand : ''}</li>
                        <li><span>Date aired:</span> {props.release}</li>
                        <li><span>Genre:</span> {props.tags}</li>
                      </ul>
                    </div>
                    <div class='col-lg-6 col-md-6'>
                      <ul>
                        <li><span>Likes/Dislikes:</span> {props.likes} / {props.dislikes}</li>
                        <li><span>Rank:</span> {props.rank}</li>
                        <li><span>Duration:</span> {props.duration}</li>
                        <li><span>Views:</span> {props.views}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class='anime__details__btn'>
                  <a href='#' class='follow-btn'><i class='fa fa-heart-o' /> Like</a>
                  <a href={props.watch} class='follow-btn'>Watch Now <i class='fa fa-angle-right' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class='footer'>
      <div class='page-up'>
        <a href='#' id='scrollToTopButton'><span class='arrow_carrot-up' /></a>
      </div>
      <div class='container'>
        <div class='row'>
          <div class='col-lg-3'>
            <div class='footer__logo'>
              <Link href='/'><a><img width='100%' src='/img/logo-banner.png' alt='' /></a></Link>
            </div>
          </div>
          <div class='col-lg-6'>
            <div class='footer__nav'>
              <ul>
                <li class='active'><Link href='/'><a>Home</a></Link></li>
                {/* <li><a href='./categories.html'>Categories</a></li> */}
                <li><a href='https://discord.gg/FFGrsWE'>Discord</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class='search-model'>
      <div class='h-100 d-flex align-items-center justify-content-center'>
        <div class='search-close-switch'><i class='icon_close' /></div>
        <form class='search-model-form'>
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
      url: `http://66.70.162.209:4445/api/hentai/${request.query.id}`,
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
