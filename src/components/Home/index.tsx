import './style.scss'

import PoemBoard from './PoemBoard'

export type HomeProps = {
  word: string
}

const Home: React.FC<HomeProps> = ({ word }) => {
  return (
    <main className="home" data-component="">
      <PoemBoard word={word} />
    </main>
  )
}

export default Home
