# YaanAI - Расширение для ЯКласс

![YaanAI Logo]([https://example.com/logo.png](https://drive.google.com/uc?export=download&id=1NP7ZhM828HF2mapueuX0jg6J9w8H06MV))

**YaanAI** — это расширение для браузера, которое интегрирует AI на платформе [ЯКласс](https://www.yaklass.ru). Расширение добавляет кнопку "Обдумать" рядом с кнопкой "Ответить", позволяя отправлять задание AI для анализа и получения помощи в его решении.

---

## 📋 Возможности

- **Кнопка "Обдумать"**: Добавляется рядом с кнопкой "Ответить" для отправки задания в AI.
- **Выбор модели AI**: В выпадающем списке можно выбрать модель AI (gpt_4o или gpt_3.5_turbo).
- **Отправка задания к AI**: Задание отправляется на сервер с выбранной моделью AI для анализа и получения ответа.

---

## 🚀 Установка

### Установка YaanAI на Windows

#### Что вам понадобится:

1. **Компьютер с Windows**.
2. **Подключение к интернету**.
3. Установленный браузер **Chrome** (или другой на основе Chromium).

### Шаги установки

#### Шаг 1. Скачайте архив YaanAI

1. Откройте ваш браузер и перейдите по [ссылке на Github](https://github.com/exlocus/project-yaanai/releases).
2. Найдите файл с названием **YaanAI-Windows.zip** и нажмите на него, чтобы скачать архив.

   Архив загрузится в папку **"Загрузки"** вашего компьютера.

#### Шаг 2. Разархивируйте архив

1. Откройте папку **Загрузки** и найдите скачанный архив **YaanAI-Windows.zip**.
2. Щелкните правой кнопкой мыши на архив и выберите опцию **"Извлечь все..."** или используйте любую программу для разархивации, например, WinRAR или 7-Zip.
3. Выберите папку, куда хотите сохранить распакованные файлы (например, создайте новую папку на рабочем столе).

#### Шаг 3. Запуск приложения

Теперь давайте запустим YaanAI.

1. Перейдите в папку, куда вы разархивировали файлы YaanAI.
2. Откройте папку **server**.
3. Найдите файл **yaanai-service.exe** и дважды щелкните на него, чтобы запустить.

   Откроется консольное окно. Дождитесь, пока в окне будет написано `*Running on 127.0.0.1:5000`. Это значит, что сервер YaanAI успешно запущен и будет слушать на **http://localhost:5000**.

#### Шаг 4. Установка расширения в браузер

Теперь установим расширение YaanAI в браузер.

**Для Google Chrome**:

1. Откройте браузер **Chrome** и в адресной строке введите:
   ```text
   chrome://extensions
   ```
2. Включите **Режим разработчика** (в верхнем правом углу).
3. Нажмите на кнопку **Загрузить распакованное**.
4. Найдите папку, в которую вы разархивировали файлы YaanAI, и откройте её.
5. Внутри папки выберите подпапку **extension** и нажмите **ОК**.

**Для других браузеров**:

Если вы используете другой браузер, например **Firefox** или **Microsoft Edge**, найдите, как включить режим разработчика для вашего браузера.

---

### Установка YaanAI на Android

#### Что вам понадобится:

1. **Android-устройство** (смартфон или планшет).
2. **Подключение к интернету**.
3. Приложение **Termux** (для установки Python).
4. Браузер с поддержкой расширений, например **Kiwi Browser**.

### Шаги установки на Android

#### Шаг 1. Скачайте архив YaanAI

1. Откройте ваш браузер и перейдите по [ссылке на Github](https://github.com/exlocus/project-yaanai/releases).
2. Найдите файл с названием **YaanAI-Universal.zip** и нажмите на него, чтобы скачать архив.

   Архив загрузится в папку **"Загрузки"** вашего устройства.

#### Шаг 2. Разархивируйте архив

1. Откройте приложение для управления файлами на вашем телефоне.
2. Перейдите в папку **Загрузки**, найдите скачанный архив **YaanAI-Universal.zip**.
3. Нажмите на архив и выберите опцию **"Разархивировать"** или **"Извлечь"**.
4. Выберите папку, куда хотите сохранить распакованные файлы.

#### Шаг 3. Убедитесь, что у вас установлен Python

1. Откройте **Play Маркет** на вашем телефоне.
2. Найдите приложение **Termux** и установите его.
3. После установки откройте Termux и выполните команды:
   ```bash
   pkg update
   pkg install python
   ```

#### Шаг 4. Установите нужные зависимости

Выполните следующие команды в **Termux**:

```bash
pip install flask
pip install flask_cors
pip install g4f
```

#### Шаг 5. Запустите сервер YaanAI

1. В **Termux** перейдите в папку с распакованными файлами YaanAI:
   ```bash
   cd ~/storage/downloads/YaanAI
   ```
2. Запустите YaanAI, введя команду:
   ```bash
   python yaanai-service.py
   ```

Сервер YaanAI запущен и будет доступен по адресу **http://localhost:5000**.

#### Шаг 6. Установите расширение в браузер

1. Откройте **Play Маркет** и установите **Kiwi Browser**.
2. После установки откройте Kiwi Browser и введите в адресной строке:
   ```text
   chrome://extensions
   ```
3. Включите **Режим разработчика**.
4. Нажмите на кнопку **Загрузить распакованное**.
5. Найдите папку с распакованными файлами YaanAI и выберите её.

Теперь расширение YaanAI установлено в вашем браузере!

---

## 🛠 Использование

1. Перейдите на сайт [ЯКласс](https://www.yaklass.ru).
2. Откройте задание.
3. Выберите модель AI в выпадающем меню.
4. Нажмите кнопку "Обдумать", чтобы отправить задание AI.
5. Ответ от AI будет отображён на странице, а текущее состояние выполнения будет показано в блоке состояния.

---

## 📋 Требования

- **Universal**:
  - **Python** 3.x
  - **Flask**, **flask_cors** и **g4f** для запуска серверной части
  - **Chrome** для установки расширения

- **Windows**:
  - **Chrome** для установки расширения

---

## 📄 Лицензия

Этот проект распространяется под лицензией [MIT](https://opensource.org/licenses/MIT).

---

## 🤝 Вклад

Если вы хотите внести свой вклад, пожалуйста, откройте issue или создайте pull request!
