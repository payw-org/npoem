import './style.scss'

import PoemItem from '@/components/PoemList/PoemItem'

type PoemListProps = {}

const PoemList: React.FC<PoemListProps> = () => {
  return (
    <div className="component-poem-list">
      <PoemItem />
      <PoemItem />
      <PoemItem />
    </div>
  )
}

export default PoemList
