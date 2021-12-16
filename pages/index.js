import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export async function getStaticProps() {
  const allPostData = getSortedPostData()
  return {
    props: {
      allPostData
    }
  }
}

export default function Home({allPostData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd} >
        <p>[Your self Introduction]</p>
        <p>
          (This is a sample website - you'll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostData.map(({id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br/>
              {id}
              <br/>
              {date}
              <br/>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
