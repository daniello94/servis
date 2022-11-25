import styles from '../style/A.module.scss';

const A = (props) => {

    return (
        <a className={ styles.a }
            href={props.href}>{props.children}</a>
    )
}
export default A