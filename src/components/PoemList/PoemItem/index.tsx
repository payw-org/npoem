import './style.scss'

type PoemItemProps = {
  username: string
  word: string
  poem: string[]
}

const PoemItem: React.FC<PoemItemProps> = (props) => {
  const { username, word, poem } = props

  return (
    <div className="poem-item" data-component="">
      <div>{username}</div>
      {word.split('').map((letter, index) => {
        return (
          <div key={index}>
            <div>{letter}</div>
            <div>{poem[index]}</div>
          </div>
        )
      })}
      <hr />
    </div>
  )
}

export default PoemItem
