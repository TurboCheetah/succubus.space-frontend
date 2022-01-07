// eslint-disable-next-line no-unused-vars
import Layout from '../../components/layout'
// eslint-disable-next-line no-unused-vars
import Scripts from '../../components/scripts'
// eslint-disable-next-line no-unused-vars
import Link from 'next/link'
import { useRouter } from 'next/router'
import Utils from '../../utils'
import { client } from '../../apolloClient'
import gql from 'graphql-tag'

export const getStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps = async ({ params }) => {
  let query
  let variables

  if (isNaN(+params.id)) {
    query = gql`
      query doujin($name: String!) {
        doujin(name: $name) {
          id
          titles {
            english
            japanese
            pretty
          }
          tags {
            all {
              name
            }
          }
          cover {
            url
          }
          favorites
          length
          uploadDate
        }
      }
    `
    variables = { name: params.id }
  } else {
    query = gql`
      query doujin($id: ID!) {
        doujin(id: $id) {
          id
          titles {
            english
            japanese
            pretty
          }
          tags {
            all {
              name
            }
          }
          cover {
            url
          }
          favorites
          length
          uploadDate
        }
      }
    `
    variables = { id: +params.id }
  }

  const {
    data: { doujin: data }
  } = await client.query({ query, variables })

  if (data.invalid) return { notFound: true }

  return {
    props: { data }
  }
}

const Entry = ({ data }) => {
  const aired = uploadDate => {
    const date = new Date(uploadDate)

    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
  }

  const titles = titles => {
    const arr = []
    for (const title in titles) {
      if (titles[title].length) arr.push(titles[title])
    }

    return arr.join(', ')
  }

  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <div>
        <Layout title="" description="" image="" tw="" />
        <div id="preloder">
          <div className="loader" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Layout title={`Succubus.Space | ${data.titles.pretty}`} description={data.tags.all.map(tag => tag.name).join(', ')} image={`https://api.succubus.space/proxy?url=${data.cover.url}`} tw="summary_large_image" />
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
                  style={{
                    backgroundImage: `url(https://api.succubus.space/proxy?url=${data.cover.url})`
                  }}
                >
                  <div className="comment">
                    <i className="fa fa-thumbs-up" /> {data.favorites.toLocaleString()}
                  </div>
                  <div className="view">
                    <i className="fa fa-book" /> {data.length.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>{data.titles.pretty}</h3>
                    <span>{titles(data.titles)}</span>
                  </div>
                  <p>{data.description ? data.description : 'No description available'}</p>
                  <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Released:</span> {aired(data.uploadDate)}
                          </li>
                          <li>
                            <span>Tags:</span> {Utils.toProperCase(data.tags.all.map(tag => tag.name).join(', '))}
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Favorites:</span> {data.favorites.toLocaleString()}
                          </li>
                          <li>
                            <span>Length:</span> {data.length.toLocaleString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="anime__details__btn">
                    <a href={`https://nhentai.net/g/${data.id}`} className="follow-btn">
                      Read Now <i className="fa fa-angle-right" />
                    </a>
                    <Link href={`${+data.id - 1}`} scroll={false}>
                      <a className="follow-btn">
                        <i className="fa fa-angle-left" /> Back
                      </a>
                    </Link>
                    <Link href={`${+data.id + 1}`} scroll={false}>
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
                  <a>{/* <img width="100%" src="/img/logo-banner.png" alt="" /> */}</a>
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
          <form className="search-model-form" onSubmit={() => this.replaceWith(`doujin/${document.getElementById('search-input').value}`)}>
            <input type="text" id="search-input" placeholder="Search here..." />
          </form>
        </div>
      </div>
      <Scripts />
    </div>
  )
}

export default Entry
