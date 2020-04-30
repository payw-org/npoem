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
  {
    id: 3,
    username: '최범수렁텅이',
    word: '간장게장',
    poem: ['간질간질', '장지기장지기지기', '게르만족', '장염'],
  },
  {
    id: 4,
    username: '인근주민',
    word: '인근',
    poem: [
      '수비 안에는 밴첵밴첵밴 여잔 뿌려 페로몬 아웃핏은 매일마다 새로워',
      '미녀처럼 부자는 괴로워',
    ],
  },
  {
    id: 5,
    username: '가든리',
    word: '정원',
    poem: ['정력', '원천소'],
  },
]

const PoemList: React.FC<PoemListProps> = () => {
  return (
    <div className="poem-list" data-component="">
      <div className="poem-container">
        <div className="title">실시간 엔행시</div>
        {examples.map((example) => {
          return <PoemItem key={example.id} {...example}></PoemItem>
        })}
      </div>
    </div>
  )
}

export default PoemList
