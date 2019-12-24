# Задание 2. Напишите линтер
https://github.com/yndx-shri-reviewer/shri-2020-task-2#readme

### Результат
В корне репозитория находиться каталог `build` с файлам `linter.js`, добавляющий 
в глобальную область видимости функцию lint

### Запуск
1. `npm install`      
2. `npm run start`

### Тестирование и сборка     
1. `npm run lint`   
2. `npm run test`
3. `npm run build`

### Использование     
```
const json = `{
    "block": "warning",
    "content": [
        {
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "m" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                }
            ]
        }
    ]
}`;

lint(json); 
// => [{
//        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
//        error: "All texts (blocks of text) in the warning block must be the same size",
//        location: {
//            start: { line: 1, column: 1 },
//            end: { line: 22, column: 2 }
//       }
//    }]

lint(json, {
  "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL": false
}); 
// => []
```

### Инструментарий      
1) typescript           
   Внешние интерфейсы линтера определены в задании, статическая типизация позволит не нарушать их.      
2) jest         
   Автоматическое тестирование позволит отказать от регулярного ручного тестирования, также оно требуется по заданию. Jest-популярное решение для задач тестирования.
3) webpack      
   Необходим для сборки линтера в один файл.            
4) ts-lint      
   Используется для проверки кода.
