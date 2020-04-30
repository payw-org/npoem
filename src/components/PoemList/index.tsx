import './style.scss'

import PoemItem from '@/components/PoemList/PoemItem'

type PoemListProps = {}

type exType = {
  id: number
  username: string
  word: string
  poem: string[]
}

const examples: exType[] = [
  {
    id: 1,
    username: '김정빈지노',
    word: '홍길동',
    poem: ['홍대', '길바닥에서', '동동주 한잔'],
  },
  {
    id: 2,
    username: '장해민초의난',
    word: '아이돌',
    poem: ['아저씨', '이제 자리로 좀', '돌아가주세요 안보여요'],
  },
]

const PoemList: React.FC<PoemListProps> = () => {
  return (
    <div className="poem-list" data-component="">
      <div>실시간 엔행시</div>
      <hr />
      {examples.map((example) => {
        return <PoemItem key={example.id} {...example}></PoemItem>
      })}
    </div>
  )
}

export default PoemList
