import '../styles/Button.css';

function geraBotao(className, buttonAction) {
    if (className === 'edit-button') {
        return <button className="button edit-button" onClick={buttonAction}>Editar</button>;
    } else if (className === 'delete-button') {
        return <button className="button delete-button" onClick={buttonAction}>Excluir</button>;
    } else if (className === 'create-button') {
        return <button className="button create-button" onClick={buttonAction}>Criar</button>;
    } else if (className === 'cancel-button') {
        return <button className="button cancel-button" onClick={buttonAction}>Cancelar</button>;
    }
    return <button className="button">{className}</button>;
}

export default function ProductAction({ type, action = null }) {
    return geraBotao(type, action);
}