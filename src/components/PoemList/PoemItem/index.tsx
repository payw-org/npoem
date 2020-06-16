import './style.scss'

type PoemItemProps = {
  username: string
  time: number
  word: string
  poem: string[]
}

const PoemItem: React.FC<PoemItemProps> = (props) => {
  const { username, time, word, poem } = props

  return (
    <div className="poem-item" data-component="">
      <div className="username">
        {username} {time}
      </div>
      {word.split('').map((letter, index) => {
        return (
          <div key={index} className="poem">
            <div className="letter">{letter}</div>
            <div className="phrase">{poem[index]}</div>
          </div>
        )
      })}
    </div>
  )
}

export default PoemItem
