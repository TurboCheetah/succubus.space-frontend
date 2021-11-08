// eslint-disable-next-line no-unused-vars
import Head from 'next/head'
import { withRouter } from 'next/router'

const Layout = ({ title, description, image, tw, router }) => {
  const url = router && router.asPath ? router.asPath : undefined
  const canonical = url && url === '/' ? 'succubus.space' : 'succubus.space' + url
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#a902ff" />
        <meta name="description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content={tw} />
        <meta name="keywords" content="hentai" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/elegant-icons.css" type="text/css" />
        <link rel="stylesheet" href="/css/plyr.css" type="text/css" />
        <link rel="stylesheet" href="/css/nice-select.css" type="text/css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/style.css" type="text/css" />
      </Head>
    </div>
  )
}
export default withRouter(Layout)
