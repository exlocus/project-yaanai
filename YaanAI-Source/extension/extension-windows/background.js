chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'think') {
        const taskText = trimTaskText(message.task);

        processTaskAsync(taskText, sendResponse);

        return true;
    }
});

/**
 * Обрезает текст задания до 1000 символов и добавляет троеточие в конце, если текст длиннее.
 */
function trimTaskText(taskText) {
    const maxLength = 1000;
    return taskText.length > maxLength ? taskText.substring(0, maxLength) + '...' : taskText;
}

/**
 * Асинхронная функция для отправки задания на сервер Flask и обработки ответа.
 */
async function processTaskAsync(task, sendResponse) {
    try {
        const response = await sendTaskToServer(task);
        const data = await response.json();

        if (data && data.answer) {
            sendResponse({ answer: data.answer });
        } else {
            throw new Error('Некорректный ответ от сервера');
        }
    } catch (error) {
        handleError('Ошибка при обработке задания: ' + error.message, sendResponse);
    }
}

/**
 * Отправляет задание на сервер Flask.
 */
async function sendTaskToServer(task) {
    const url = 'http://localhost:5000/process_task';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: task })
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.statusText);
    }

    return response;
}

/**
 * Обрабатывает ошибки и отправляет их в ответ на запрос.
 */
function handleError(errorMessage, sendResponse) {
    console.error(errorMessage);
    sendResponse({ answer: errorMessage });
}
