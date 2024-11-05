/**
 * Главная функция для запуска всех процессов.
 * Назначает обработчики и наблюдателей.
 */
function initializeExtension() {
    window.addEventListener('load', async () => {
        await checkForUpdates();
        injectStyles(` .block { margin-bottom: 0 !important; } `);
        addThinkButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Универсальная функция для обработки ошибок.
 * Логирует ошибку и обновляет состояние на экране.
 */
function handleError(errorMessage) {
    console.error(errorMessage);
    updateStateIndicator(`Ошибка: ${errorMessage}`);
}

/**
 * Универсальная функция для инъекции пользовательских стилей на страницу.
 * @param {string} styles - CSS-стили, которые нужно добавить.
 */
function injectStyles(styles) {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

/**
 * Проверяет наличие новой версии.
 */
async function checkForUpdates() {
    const currentVersion = '0.0.2';
    try {
        const response = await fetch('https://raw.githubusercontent.com/exlocus/project-yaanai/refs/heads/main/get_version.json');
        const data = await response.json();
        if (data.current_version !== currentVersion) {
            showUpdateNotification();
        }
    } catch (error) {
        handleError('Ошибка при проверке версии:', error);
    }
}

/**
 * Показывает уведомление о новой версии с затемнённым фоном.
 */
function showUpdateNotification() {
    const overlay = $('<div class="ui-widget-overlay ui-front" style="z-index: 609;"></div>');
    $("body").append(overlay);

    const dialogHTML = `
        <div id="commonDialog" class="ui-dialog-content ui-widget-content">
            <div class="top-buffer-1">
                Обнаружена новая версия YaanAI. Пожалуйста, обновите до последней версии.
            </div>
        </div>
    `;

    const dialogContainer = $(dialogHTML);
    $("body").append(dialogContainer);

    // Инициализируем диалог без дублирования элементов
    dialogContainer.dialog({
        autoOpen: true,
        modal: true,
        width: 'auto',
        draggable: true,
        resizable: false,
        closeOnEscape: true,
        title: "Новая версия YaanAI", // Устанавливаем заголовок через dialog()
        close: function () {
            overlay.remove();
        },
        buttons: {
            "Обновить сейчас": function () {
                window.location.href = 'https://github.com/exlocus/project-yaanai';
            },
            "Подробнее": function () {
                window.location.href = 'https://github.com/exlocus/project-yaanai';
            }
        }
    });

    // Обработчик закрытия диалога по клику на кнопку "Закрыть"
    $(".ui-dialog-titlebar-close").on("click", function () {
        dialogContainer.dialog("close");
        overlay.remove();
    });
}


/**
 * Добавляет кнопку "Обдумать" на страницу.
 * Назначает обработчик клика для обработки задания с помощью AI.
 */
function addThinkButton() {
    const taskButtonsDiv = document.querySelector('.task-buttons');

    if (!taskButtonsDiv) {
        handleError('Элемент .task-buttons не найден.');
        return;
    }

    const parentBlock = taskButtonsDiv.closest('.block.sm-easy-header.no-bmarg');
    if (parentBlock && parentBlock.classList.contains('SolutionStepsBlock')) {
        return;
    }

    const thinkButton = createButton('Обдумать', 'thinkButton', 'rgb(0, 153, 210)', 'rgb(255, 253, 250)');
    taskButtonsDiv.appendChild(thinkButton);

    thinkButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const form = document.querySelector('.taskForm');
        if (!form) {
            handleError('Форма задания не найдена.');
            return;
        }

        const serverConnected = await checkServerConnection();
        if (!serverConnected) {
            handleError('Нет соединения с сервером');
            return;
        }

        await handleTaskSubmission(form);
    });
}

/**
 * Обрабатывает отправку задания на сервер AI для анализа.
 */
async function handleTaskSubmission(form) {
    try {
        const taskHtml = document.querySelector('#taskhtml').innerText;
        let solutionBlock = document.querySelector('.YaanAISolutionBlock') || createYaanAISolutionBlock();
        document.querySelector('.YaanAISolutionBlock .taskhtmlwrapper div').innerHTML = '';
        if (document.querySelector('.think-again-btn')) {
            document.querySelector('.think-again-btn').style.display = 'none';
        }
        updateStateIndicator('Думает...');

        const taskParts = splitTextIntoParts(taskHtml, 1000);
        await sendToAI(taskParts);
    } catch (error) {
        handleError(error.message);
    }
}

/**
 * Отправляет задание на сервер AI для анализа и обрабатывает ответ.
 */
async function sendToAI(taskHtmlParts) {
    updateStateIndicator('Думает...');

    chrome.storage.sync.get('selectedModel', (data) => {
        const selectedModel = data.selectedModel || 'gpt_4o';

        updateStateIndicator(`Думает... (${selectedModel})`);
        monitorServerState();

        fetch('http://localhost:5000/process_task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: taskHtmlParts, model: selectedModel })
        })
        .then(response => response.json())
        .then(data => {
            if (data.answer) {
                simulateTypingEffect(data.answer);
            } else {
                throw new Error('Ошибка получения ответа от AI');
            }
        })
        .catch(error => {
            handleError('Ошибка при обработке задания: ' + error.message);
        });
    });
}

/**
 * Симулирует эффект печати ответа с сервера AI.
 */
async function simulateTypingEffect(text) {
    const formattedText = formatMarkdownToHTML(text);
    const solutionBlock = document.querySelector('.YaanAISolutionBlock .taskhtmlwrapper div');
    solutionBlock.innerHTML = '';

    let index = 0;
    let currentText = '';

    function type() {
        if (index < formattedText.length) {
            currentText += formattedText[index];
            solutionBlock.innerHTML = currentText;
            index++;
            setTimeout(type, 10);
        } else {
            solutionBlock.innerHTML = sanitizeHTML(currentText);
            const thinkAgainButton = document.querySelector('.think-again-btn');
            if (thinkAgainButton) {
                thinkAgainButton.style.display = 'block';
            }
        }
    }

    type();
}

/**
 * С помощью MutationObserver добавляет обработчик на кнопку "Обдумать ещё раз".
 */
const observer = new MutationObserver(() => {
    const thinkAgainButton = document.querySelector('.think-again-btn');
    if (thinkAgainButton) {
        thinkAgainButton.addEventListener('click', async function () {
            thinkAgainButton.style.display = 'none';
            const form = document.querySelector('.taskForm');
            if (form) {
                document.querySelector('.YaanAISolutionBlock .taskhtmlwrapper div').innerHTML = '';
                await handleTaskSubmission(form);
            }
        });
        observer.disconnect();
    }
});

/**
 * Проверяет соединение с сервером.
 */
async function checkServerConnection() {
    try {
        const response = await fetch('http://localhost:5000/get_state');
        return response.ok;
    } catch (error) {
        handleError('Ошибка соединения с сервером: ' + error.message);
        return false;
    }
}

/**
 * Получает текущее состояние сервера.
 */
async function getServerState() {
    try {
        const response = await fetch('http://localhost:5000/get_state');
        const data = await response.json();
        return data.state;
    } catch (error) {
        handleError('Ошибка при получении состояния сервера: ' + error.message);
        return 'Ошибка';
    }
}

/**
 * Разделяет текст на части по заданному количеству символов.
 */
function splitTextIntoParts(text, partSize) {
    const parts = [];
    for (let i = 0; i < text.length; i += partSize) {
        parts.push(text.substring(i, i + partSize));
    }
    return parts;
}

/**
 * Обновляет индикатор состояния на странице.
 */
function updateStateIndicator(state) {
    const stateIndicator = document.querySelector('.YaanAISolutionBlock .state-indicator');
    if (stateIndicator) {
        stateIndicator.textContent = state;
    }
}

/**
 * Создает блок для отображения решения от YaanAI.
 */
function createYaanAISolutionBlock() {
    const solutionBlock = document.createElement('div');
    solutionBlock.classList.add('block', 'sm-easy-header', 'no-bmarg', 'YaanAISolutionBlock');

    solutionBlock.innerHTML = `
        <div class="header"><h3>YaanAI:</h3></div>
        <div class="blockbody">
            <div class="state-indicator">Думает...</div>
            <div class="taskhtmlwrapper no-text-select ready"><div></div></div>
            <div class="task-buttons">
                <button class="btn think-again-btn" style="display: none;">Обдумать ещё раз!</button>
            </div>
        </div>
    `;

    document.querySelector('.block.sm-easy-header')
        .insertAdjacentElement('afterend', solutionBlock);

    return solutionBlock;
}

/**
 * Форматирует текст из Markdown в HTML.
 */
function formatMarkdownToHTML(markdownText) {
    let formattedText = markdownText
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/^\d+\.\s(.*)$/gm, '<li>$1</li>')
        .replace(/^- (.*)$/gm, '<li>$1</li>');

    return formattedText.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');
}

/**
 * Очистка текста от специальных символов.
 */
function sanitizeHTML(text) {
    return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

/**
 * Мониторинг состояния сервера с периодическим обновлением.
 */
function monitorServerState() {
    const intervalId = setInterval(async () => {
        const state = await getServerState();
        updateStateIndicator(state);

        if (state === 'Готово!' || state === 'Ошибка при анализе задания!') {
            clearInterval(intervalId);
        }
    }, 1000);
}

/**
 * Создает и настраивает кнопку.
 */
function createButton(text, id, bgColor, textColor) {
    const button = document.createElement('button');
    button.textContent = text;
    button.id = id;
    button.classList.add('btn');
    button.style.backgroundColor = bgColor;
    button.style.color = textColor;
    button.type = 'button';
    return button;
}

// Запуск расширения
initializeExtension();
