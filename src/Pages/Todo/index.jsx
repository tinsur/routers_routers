import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {URL} from "../../Utils/const";
import {Outlet, useNavigate} from "react-router";
import styles from "./index.module.css"


function Todo() {
    const [todos, setTodos] = useState({});
    const [viewForm, setViewForm] = useState(false) //состояние появления формы
    const [dataForm, setDataForm] = useState({ // состояние данных из формы
        id: '',
        title: '',
        completed: false
    })
    const [getTodo, setGetTodo] = useState(true) // флаг для вызова юзэффекта
    const [isDelete, setIsDelete] = useState(false) // флаг для вызова юзэффекта
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        fetch(URL + params.id)
            .then((loadedData) => loadedData.json())
            .then((loadedTodos) => {
                console.log(loadedTodos)
                setTodos(loadedTodos)

            })
            .catch((e) => {
                navigate('/404');
            });
    }, [getTodo]);

    //событие клика на кнопку редактировать
    const editTodo = (e) => {
        e.preventDefault();
        setViewForm(true) //открытие формы
        //объект из дата-атрибутов данных
        const data = {
            id: e.target.dataset.id,
            title: e.target.dataset.title,
            completed: (e.target.dataset.completed === 'true') ? true : false
        }
        setDataForm(data)//устанавливаются состояния на основании data
    }

    const deleteTodo = (e) => {
        fetch(URL + e.target.dataset.id, {
            method: 'DELETE',
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                //блок успешного ответа
                setIsDelete(true)// флаг для удаления
            })
    }

    // событие отправки формы
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {...dataForm}; //промежуточная переменная для отправки данных без айди
        delete data.id; //удаление айди
        let url = '', method = '';
        //условие для определения добавить или редактировать данные
        console.log(data)
        url = URL + dataForm.id;
        method = 'PUT';
        //отправка запроса для добавления или редактирования
        fetch(url, {
            method: method, //метод запроса для определения действия: добавить или редактировать
            headers: {'Content-Type': 'application/json;charset=utf-8'},// заголовки для сервера, указывают тип контента и кодировку
            body: JSON.stringify(data),// тело запроса в котором данные конвертируются в JSON строку

        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log(response)
                //блок успешного ответа
                setViewForm(false);// скрытие формы
                setGetTodo(!getTodo)// смена флага для юзэффекта
                //setRefreshProducts(!refreshProducts);
            })
        // .finally(() => setIsCreating(false));
    }
    //событие изменения title
    const onChangeTitle = (e) => {
        setDataForm({...dataForm, title: e.target.value}) //в состояние устанавливается новое значение title
    }
    //событие изменения checked
    const onChangeCompleted = (e) => {
        setDataForm({...dataForm, completed: e.target.checked})//в состояние устанавливается новое значение чекбокса
    }
    const toBack = (e) => {
        navigate(-1)
    }

    return (
        <div className={styles.todoWrap}>

            <div className={styles.todo}>
                {!isDelete &&
                <div className={styles.todoTitle}>{todos.title}</div>}
                {isDelete && <span className={styles.todoDel}>Элемент удален!</span>}
                {!isDelete &&
                <div className={styles.todoButtons}>
                    <button className={styles.button} onClick={editTodo} data-id={todos.id} data-title={todos.title} data-completed={todos.completed}>Edit</button>
                    <button className={styles.button} data-id={todos.id} onClick={deleteTodo}>Delete</button>
                    <button onClick={toBack}>Назад</button>
                </div>
                }

            </div>


            {viewForm &&
            <div className={styles.formWrap}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <input type="hidden" value={dataForm.id}/>
                    <input className={styles.editWindow} type="text" value={dataForm.title} onChange={onChangeTitle}/>
                    <input type="checkbox" checked={dataForm.completed} onChange={onChangeCompleted}/>
                    <button className={styles.editSubmit} type='submit'>Submit</button>
                </form>
            </div>
            }

        </div>
    )

}

export default Todo;