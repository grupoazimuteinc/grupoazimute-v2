import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'

export default function App({ Component, pageProps }) {
  return (
    <PrismicPreview repositoryName={repositoryName}>
      <Component {...pageProps} />
    </PrismicPreview>
  )
}