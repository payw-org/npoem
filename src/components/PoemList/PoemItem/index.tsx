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
      <div className="user-info">
        <div className="username">{username}</div>
        <div className="time-wrapper">
          <i className="f7-icons clock-icon">clock</i>
          <div className="time">{time}초 걸림</div>
        </div>
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
