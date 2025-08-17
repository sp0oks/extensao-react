import '../styles/Button.css'

export default function Button({ type="", action = null, text="" }) {
    return <button className={`button ${type}`} onClick={action}>{text}</button>;
}