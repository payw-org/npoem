import './style.scss'

import PoemBoard from './PoemBoard'

type MainProps = {}

const Main: React.FC<MainProps> = () => {
  return (
    <main className="component-home">
      <PoemBoard />
    </main>
  )
}

export default Main
