import './style.scss'

import PoemBoard from './PoemBoard'

type MainProps = {}

const Main: React.FC<MainProps> = () => {
  return (
    <main className="home" data-component="">
      <PoemBoard />
    </main>
  )
}

export default Main
