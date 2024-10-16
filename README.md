# YaanAI - Расширение для ЯКласс

**YaanAI** — это расширение для браузера, которое интегрирует AI на платформе [ЯКласс](https://www.yaklass.ru). Расширение добавляет кнопку "Обдумать" рядом с кнопкой "Ответить", позволяя отправлять задание AI для анализа и получения помощи в его решении.

## Возможности

- **Кнопка "Обдумать"**: Добавляется рядом с кнопкой "Ответить" для отправки задания в AI.
- **Выбор модели AI**: В выпадающем списке можно выбрать модель AI (gpt_4o или gpt_3.5_turbo).
- **Отправка задания к AI**: Задание отправляется на сервер с выбранной моделью AI для анализа и получения ответа.

## Установка

### Установка YaanAI на Windows

#### Шаги по установке

1. **Скачайте архив**:
   Скачайте YaanAI-Windows.zip с https://github.com/exlocus/project-yaanai/releases

2. **Разархивируйте**:
   - Разархивируйте архив в удобное для вас место.

3. **Запуск приложения**:
   - Перейдите в разархивированную папку проекта, затем в папку server и запустите yaanai-service.exe. Откроется консоль, дождитесь, пока будет написано '*Running on 127.0.0.1:5000'.
   - Это запустит сервер, который будет слушать на `http://localhost:5000`.

4. **Установка расширения в Chrome**:
   - Откройте [chrome://extensions](chrome://extensions) в вашем браузере Chrome.
   - Включите "Режим разработчика".
   - Нажмите "Загрузить распакованное" и откройте папку с проектом, затем выбирите extension.

5. **Использование расширения**:
   - Перейдите на сайт [ЯКласс](https://www.yaklass.ru).
   - Откройте задание и используйте кнопку "Обдумать".

### Установка YaanAI на Android (Universal)

#### Шаги по установке

1. **Скачайте архив**:
   Скачайте YaanAI-Windows.zip с https://github.com/exlocus/project-yaanai/releases

2. **Разархивируйте**:
   - Разархивируйте архив в удобное для вас место.

2. **Убедитесь, что установлен Python**:
   - Убедитесь, что у вас установлен Python на вашем устройстве. Вы можете использовать приложения, такие как Termux, для установки Python.
   - Установите необходимые зависимости, выполнив команды:
   ```bash
   pip install flask
   ```
   ```bash
   pip install flask_cors
   ```
   ```bash
   pip install g4f
   ```

3. **Запуск сервера**:
   - Перейдите в папку проекта и запустите Python файл:
   ```bash
   cd YaanAI
   python yaanai-service.py
   ```
   - Это запустит сервер на `http://localhost:5000`.

4. **Установка расширения в браузер**:
   - Для Android установите браузер, поддерживающий расширения, например Kiwi Browser.
   - Откройте Kiwi Browser и перейдите на [chrome://extensions](chrome://extensions).
   - Включите "Режим разработчика".
   - Нажмите "Загрузить распакованное" и выберите папку с проектом.

5. **Использование расширения**:
   - Перейдите на сайт [ЯКласс](https://www.yaklass.ru).
   - Откройте задание и используйте кнопку "Обдумать".

## Использование

1. Перейдите на сайт [ЯКласс](https://www.yaklass.ru).
2. Откройте задание.
3. Выберите модель AI в выпадающем меню.
4. Нажмите кнопку "Обдумать", чтобы отправить задание AI.
5. Ответ от AI будет отображён на странице, а текущее состояние выполнения будет показано в блоке состояния.


## Требования

Universal:
- **Python** 3.x
- **Flask**, **flask_cors** и **g4f** для запуска серверной части
- **Chrome** для установки расширения

Windows:
- **Chrome** для установки расширения

## Лицензия

Этот проект распространяется под лицензией MIT.
