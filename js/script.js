/* Задания на урок 1:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

// const movieDB = {
//     movies: [
//         "Логан",
//         "Лига справедливости",
//         "Ла-ла лэнд",
//         "Одержимость",
//         "Скотт Пилигрим против..."
//     ]
// };


// const adv = document.querySelectorAll('.promo__adv img'),
//       genre = document.querySelector('.promo__bg'),
//       genreTittle = genre.querySelector('.promo__genre'),
//       movieList = document.querySelector('.promo__interactive-list');


// // 1.1)
// adv.forEach(item => {
//     item.remove();
// });

// // 1.2)
// genreTittle.textContent = 'драма';

// // 1.3)
// genre.style.backgroundImage = 'url("img/bg.jpg")';

// // 1.4/5)
// // movieList.forEach(item => {
// //     item.remove();
// // });
// // или можно вот так: 
// movieList.innerHTML = "";

// movieDB.movies.sort();

// movieDB.movies.forEach((item, i) => {
//     movieList.innerHTML += `
//     <li class="promo__interactive-item"> ${i + 1} ${item}
//         <div class="delete"></div>
//     </li>
//     `;
// });

// a=a+1; тоже самое, что и a+=1; (работает втч и со строками)


/* Задания на урок 2:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */


/* ===DOMContentLoaded - запускает JS-код только после того, как 
 загрузится вся структура/разметка документа, т.е DOM */
document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const adv = document.querySelectorAll('.promo__adv img'),
          genre = document.querySelector('.promo__bg'),
          genreTittle = genre.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');
    
    // 2.1)
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        
        if (newFilm) /*Т.к. строка - ложь в логическом контексте 
        (чтобы фильм пушился только по кнопке) */
        {   
            // 2.2)
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            // 2.4)
            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);

            // 2.5/1часть)
            sortArray(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });
    
    const deleteAdv = (advArray) => {
        advArray.forEach(item => {
            item.remove();
        });
    };
    deleteAdv(adv);
    
    const makeChanges = () => {
        genreTittle.textContent = 'драма';
        genre.style.backgroundImage = 'url("img/bg.jpg")';
    };
    makeChanges();
    
    const sortArray = (arr) => {
        arr.sort();
    };
    sortArray(movieDB.movies);
    
    function createMovieList (films, parent) {

        // 2.5/2часть)
        sortArray(films);
        // movieList.forEach(item => {
        //     item.remove();
        // });
        // или можно вот так: 
        parent.innerHTML = "";

        films.forEach((item, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item"> ${i + 1} ${item}
                <div class="delete"></div>
            </li>
            `;
        });

        // 2.3)
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent); // Для перестраивания нумерации (рекурсия)
                
            });
        });
    }
    createMovieList(movieDB.movies, movieList);
});