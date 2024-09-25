import styles from './index.module.css';

function NotFound() {
    return (
        <div className={styles.notFoundPage}>
            Страница не найдена.<br/>
            <a className={styles.goToMain} href="/">Перейти на главную</a>
        </div>
    )

}

export default NotFound