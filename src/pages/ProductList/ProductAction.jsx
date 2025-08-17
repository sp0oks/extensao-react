import Button from '../../components/Button';

export default function ProductAction({ type, action = null, text='' }) {
    return <Button type={type} action={action} text={text} />
}