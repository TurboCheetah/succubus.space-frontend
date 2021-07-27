// eslint-disable-next-line no-unused-vars
import Layout from '../../components/layout'
// eslint-disable-next-line no-unused-vars
import Scripts from '../../components/scripts'
// eslint-disable-next-line no-unused-vars
import Link from 'next/link'
import { useRouter } from 'next/router'
import Utils from '../../utils'
import c from '@aero/centra'

export const getStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps = async (request) => {
  const data = await c(`https://api.succubus.space/hentai/${request.params.id}`).json()

  return {
    props: { data }
  }
}

const Entry = ({ data }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <div>
        <Layout
          title=''
          description=''
          image=''
        />
        <div id='preloder'>
          <div className='loader' />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Layout
        title={`Succubus.Space | ${data.name}`}
        description={data.description}
        image={data.cover_url}
      />
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="header__logo">
                <Link href="/">
                  <a>
                    {/* <img
                      width="50px"
                      height="50px"
                      src="/img/logo.png"
                      alt=""
                    /> */}
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="header__nav">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li className="active">
                      <Link href="/">
                        <a>Home</a>
                      </Link>
                    </li>
                    <li>
                      <a href="https://discord.gg/FFGrsWE">Discord</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="header__right">
                <a href="#" className="search-switch">
                  <span className="icon_search" />
                </a>
                <Link href="/login">
                  <a>
                    <span className="icon_profile" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div id="mobile-menu-wrap" />
        </div>
      </header>

      <section className="anime-details spad">
        <div className="container">
          <div className="anime__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="anime__details__pic set-bg"
                  style={{ 'background-image': `url(${data.cover_url})` }}
                >
                  <div className="comment">
                    <i className="fa fa-thumbs-up" />{' '}
                    {data.likes.toLocaleString()}
                  </div>
                  <div className="view">
                    <i className="fa fa-eye" /> {data.views.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>{data.name}</h3>
                    <span>{data.titles ? data.titles.join(', ') : ''}</span>
                  </div>
                  <p>
                    {data.description
                      ? data.description
                      : 'No description available'}
                  </p>
                  <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Censored:</span>{' '}
                            {Utils.toProperCase(data.is_censored.toString())}
                          </li>
                          <li>
                            <span>Studios:</span> {data.brand ? data.brand : ''}
                          </li>
                          <li>
                            <span>Date aired:</span> {data.released_at}
                          </li>
                          <li>
                            <span>Genre:</span>{' '}
                            {Utils.toProperCase(data.tags.join(', '))}
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Likes/Dislikes:</span>{' '}
                            {data.likes.toLocaleString()} /{' '}
                            {data.dislikes.toLocaleString()}
                          </li>
                          <li>
                            <span>Rank:</span>{' '}
                            {data.monthly_rank.toLocaleString()}
                          </li>
                          <li>
                            <span>Duration:</span>{' '}
                            {Utils.getDuration(data.duration_in_ms)}
                          </li>
                          <li>
                            <span>Views:</span> {data.views.toLocaleString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="anime__details__btn">
                    <a href={data.url} className="follow-btn">
                      Watch Now <i className="fa fa-angle-right" />
                    </a>
                    <Link href={`${data.id - 1}`}>
                    <a className="follow-btn">
                    <i className="fa fa-angle-left" /> Back
                    </a>
                    </Link>
                    <Link href={`${data.id + 1}`}>
                    <a className="follow-btn">
                      Next <i className="fa fa-angle-right" />
                    </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="page-up">
          <a href="#" id="scrollToTopButton">
            <span className="arrow_carrot-up" />
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="footer__logo">
                <Link href="/">
                  <a>
                    {/* <img width="100%" src="/img/logo-banner.png" alt="" /> */}
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer__nav">
                <ul>
                  <li className="active">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <a href="https://discord.gg/FFGrsWE">Discord</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">
            <i className="icon_close" />
          </div>
          <form className="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>
      <Scripts />
    </div>
  )
}

export default Entry
