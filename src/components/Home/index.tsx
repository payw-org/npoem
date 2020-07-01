import './style.scss'

import PoemBoard from './PoemBoard'

export type HomeProps = {
  word: string
  id: number
}

const Home: React.FC<HomeProps> = ({ word, id }) => {
  return (
    <main className="home" data-component="">
      <PoemBoard word={word} id={id} token={false} />
    </main>
  )
}

export default Home
