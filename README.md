# Team3_6303

## Шаги запуска сервера описаны ниже:

### Создание .env 
Нужно локально в папке server создать файл .env:

``` console
cd server/
```

В нем нужно прописать:
- Port;
- DB_LINK.

!Важное примечание!
MongoDB работает только через <b>vpn</b>


### Докачать библиотеки
``` console
npm install
```

### Запустить сервер
``` console
npm run start:dev
```

## Шаги перезапуска клиента описаны ниже:

### Докачать библиотеки

``` console
cd client/
```

``` console
npm run build
```
