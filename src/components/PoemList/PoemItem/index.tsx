import './style.scss'

type PoemItemProps = {
  username: string
  word: string
  poem: string[]
}

const PoemItem: React.FC<PoemItemProps> = ({ username, word, poem }) => {
  return (
    <div className="component-poem-item">
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
