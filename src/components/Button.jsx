import '../styles/Button.css'

export default function Button({ type="", action = null, text="", disabled=false }) {
    return <button 
            className={`button ${type}`} 
            onClick={action} 
            disabled={disabled}>{text}</button>;
}