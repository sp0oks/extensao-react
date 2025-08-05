import '../styles/Button.css';

function geraBotao(className) {
    if (className === 'edit-button') {
        return <button class="button edit-button">Editar</button>;
    } else if (className === 'delete-button') {
        return <button class="button delete-button">Excluir</button>;
    }
    return <button class="button">{className}</button>;
}

export default function Button({type}) {
    return geraBotao(type);
}