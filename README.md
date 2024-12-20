# YaanAI - Расширение для ЯКласс

![YaanAI Logo](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/logo.png)

**YaanAI** — это расширение для браузера, которое интегрирует AI на платформе [ЯКласс](https://www.yaklass.ru). Расширение добавляет кнопку "Обдумать" рядом с кнопкой "Ответить", позволяя отправлять задание AI для анализа и получения помощи в его решении.

---

## Отключено 🔌  (‼️ВНИМАНИЕ‼️)

Проект YaanAI больше не будет обновляться. Все наработки будут перенесены, включая новые функции и объявления, будут выходить в рамках нового проекта: [FlexAnswer](https://github.com/exlocus/flexanswer). Благодарим за поддержку и интерес!  

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
3. Архиватор к примеру **7zip**
4. Установленный браузер **Chrome** (или другой на основе Chromium).

### Шаги установки

#### Шаг 1. Скачайте архив YaanAI

1. Откройте ваш браузер и перейдите по [ссылке на Github](https://github.com/exlocus/project-yaanai/releases).
2. Найдите файлы с названием **server-windows.zip**, **extension-windows.zip** и нажмите на него, чтобы скачать архив.

   Архивы загрузится в папку **"Загрузки"** вашего компьютера.

![Step1 Windows](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step1_windows.gif)

#### Шаг 2. Разархивируйте архивы

1. Откройте папку **Загрузки** и найдите скачанные архивы **server-windows.zip**, **extension-windows.zip**.
2. Щелкните правой кнопкой мыши на архив и выберите опцию **"Извлечь все..."** или используйте любую программу для разархивации, например, WinRAR или 7-Zip.
3. Выберите папку, куда хотите сохранить распакованные файлы (например, на рабочий стол).

![Step2 Windows](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step2_windows.gif)

#### Шаг 3. Запуск приложения

Теперь давайте запустим YaanAI.

1. Перейдите в папку, куда вы разархивировали архивы.
2. Найдите файл **Yaanai Service.exe** и дважды щелкните на него, чтобы запустить.

   Откроется консольное окно. Дождитесь, пока в окне будет написано `Сервер запущен и ожидает запросов!`. Это значит, что сервер YaanAI успешно запущен и будет слушать на **http://localhost:5000**.

![Step3 Windows](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step3_windows.gif)

#### Шаг 4. Установка расширения в браузер

Теперь установим расширение YaanAI в браузер.

**Для Google Chrome**:

1. Откройте браузер **Chrome** и в адресной строке введите:
   ```text
   chrome://extensions
   ```
2. Включите **Режим разработчика** (в верхнем правом углу).
3. Нажмите на кнопку **Загрузить распакованное**.
4. Найдите папку, в которую вы разархивировали файлы YaanAI-Windows, и откройте её.
5. Внутри папки выберите подпапку **extension** и нажмите **ОК**.

**Для других браузеров**:

Если вы используете другой браузер, например **Firefox** или **Microsoft Edge**, найдите, как включить режим разработчика для вашего браузера.

![Step4 Windows](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step4_windows.gif)

---

### Установка YaanAI на Android

#### Что вам понадобится:

1. **Android-устройство** (смартфон или планшет).
2. **Подключение к интернету**.
3. Приложение **UserLand** (для установки Python).
4. Архиватор к примеру **RAR**
5. Браузер с поддержкой расширений, например **Kiwi Browser**.

### Шаги установки на Android

#### Шаг 1. Установите UserLAnd и настройте Ubuntu

1. Откройте **Play Маркет** и установите приложение **UserLAnd**.
2. Запустите UserLAnd и выберите **Ubuntu** для установки.
3. Следуйте инструкциям, чтобы завершить установку и создать учетные данные для Ubuntu.
4. После установки откройте терминал UserLAnd с Ubuntu.

![Step1 Android](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step1_android.gif)

#### Шаг 2. Обновите и установите необходимые пакеты

1. Выполните команду для обновления пакетов:
   ```bash
   sudo apt update && sudo apt upgrade
   ```
2. Установите Python 3, pip и утилиту для распаковки:
   ```bash
   sudo apt install python3 python3-pip unzip
   ```
![Step2 Android](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step2_android.gif)

#### Шаг 3. Скачайте архив YaanAI

1. В терминале UserLAnd выполните команду для загрузки архива YaanAI:
   ```bash
   wget https://github.com/exlocus/project-yaanai/releases/download/beta/server-android.zip
   ```
![Step3 Android](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step3_android.gif)

#### Шаг 4. Разархивируйте архив YaanAI

1. Распакуйте скачанный архив:
   ```bash
   unzip server-android.zip
   ```
2. Перейдите в папку `server-android`:
   ```bash
   cd server-android
   ```
![Step4 Android](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step4_android.gif)

#### Шаг 5. Запустите установочный скрипт

1. Выполните команду для запуска скрипта `start-yaanai-service.py`, который установит все необходимые библиотеки и создаст команду для быстрого запуска сервиса:
   ```bash
   python3 start-yaanai-service.py
   ```
2. Затем выполните команду:
   ```bash
   source ~/.bashrc
   ```
   Это обновит переменные среды, чтобы команда `start-yaanai-service` заработала.

![Step5 Android](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step5_android.gif)

#### Шаг 6. Запустите YaanAI

1. Чтобы запустить сервис YaanAI, выполните команду:
   ```bash
   start-yaanai-service
   ```

Теперь сервер YaanAI запущен и доступен по адресу **http://localhost:5000**.

![Step6 Android](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step6_android.gif)

#### Шаг 7. Установите расширение YaanAI в браузер Kiwi

1. Перейдите на [страницу релизов YaanAI на Github](https://github.com/exlocus/project-yaanai/releases) и скачайте архив **extension-android.zip**.
2. Разархивируйте файл с помощью любого архиватора (например, **RAR** из **Google Play**), чтобы получить файл `yaanai.crx`, и сохраните его в удобное место, например, в папку **Документы**.

3. Откройте **Kiwi Browser** и введите в адресной строке:
   ```text
   chrome://extensions/
   ```
4. Включите **Режим разработчика**.
5. Нажмите на **+ (from .zip/.crx/.user.js)**, затем выберите файл `yaanai.crx` из папки **Документы**.

Теперь расширение YaanAI установлено и готово к использованию в Kiwi Browser!

![Step7 Android](https://github.com/exlocus/project-yaanai/blob/main/YaanAI-README-Images/step7_android.gif)

---

## 🚫 Поддержка iOS

К сожалению, **YaanAI не поддерживается на iOS**. Однако вы можете попробовать запустить его с помощью исходного кода ([Sources](https://github.com/exlocus/project-yaanai/releases)), если разберетесь, как это сделать.

---

## 🛠 Использование

1. Перейдите на сайт [ЯКласс](https://www.yaklass.ru).
2. Откройте задание.
3. Выберите модель AI в выпадающем меню.
4. Нажмите кнопку "Обдумать", чтобы отправить задание AI.
5. Ответ от AI будет отображён на странице, а текущее состояние выполнения будет показано в блоке состояния.

---

## 📋 Требования

- **Android**:
  - **RAR** (к примеру) архиватор для распаковки расширения
  - **UserLand** для запуска серверной части
  - **Kiwi Browser** для установки расширения

- **Windows**:
  - **Chrome** для установки расширения
  - **7zip** (к примеру) архиватор для распаковки 

---

## 📄 Лицензия

Этот проект распространяется под лицензией [MIT](https://opensource.org/licenses/MIT).

---

## 🤝 Вклад

Если вы хотите внести свой вклад, пожалуйста, откройте issue или создайте pull request!
