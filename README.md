# Трекер работы

[https://alice8080.github.io/work_tracker](https://alice8080.github.io/work_tracker/) – визуализация статистики телеграм-бота [Трекер работы](https://t.me/Treker_Raboty_Bot/), предназначенного для отслеживания времени работы. 

[Github разработчика бота](https://github.com/pe5ha)

Это веб-приложение отображает количество записанных в трекер часов для конкретного пользователя в формате гистограммы. Можно сортировать массив данных по временному промежутку (все время, последний месяц или последняя неделя) и по названию дела, которое пользователь указал при записи в бота. Также отображаются день и месяц с наибольшим количеством отработанных часов. В приложении можно выбрать темную или светлую тему, авторизация для просмотра статистики реализована с помощью [Telegram Login Widget](https://core.telegram.org/widgets/login). 

Пример статистики всех записей за все время использования бота:

![Темная тема](/readme_assets/dark-theme.png)

Пример статистики по определенному делу за последний месяц:

![Светлая тема](/readme_assets/light-theme.png)

## Стэк:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Material UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/), [react-chartjs-2](https://react-chartjs-2.js.org/)
- [React Router](https://reactrouter.com/en/main)
- [Redux](https://redux.js.org/), [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)