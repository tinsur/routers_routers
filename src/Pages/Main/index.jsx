import React from "react";
import {Link} from "react-router-dom";
import img from "./pic/main_pic.jpg"
import style from "./index.module.css"


function Main() {

    return (
        <div>
            <h1>Это главная страница и на ней ссылка на список дел.
                <p>Больше ничего придумать не получилось, потому что согласно условию задния адрес task никак не
                    обработан</p></h1>
            <div className={style.mainPicWrap}>
                <img className={style.mainPic} src={img} alt="ooops!"/>
            </div>
            <Link className={style.linkTaskList} to="/task">Список дел</Link>


        </div>
    );
}

export default Main;
