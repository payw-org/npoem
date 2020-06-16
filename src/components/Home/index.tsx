import './style.scss'

import PoemBoard from './PoemBoard'

type MainProps = unknown

const Main: React.FC<MainProps> = () => {
  return (
    <main className="home" data-component="">
      <PoemBoard />
    </main>
  )
}

export default Main
