import os
import sys
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import g4f
from g4f import models

# Конфигурация Flask
app = Flask(__name__)
CORS(app)
logging.getLogger('werkzeug').setLevel(logging.ERROR)

# Глобальные переменные
current_state = 'Ожидание'
server_running = False

MODEL_MAP = {
    'gpt_4o': models.gpt_4o,
    'gpt_4o_mini': models.gpt_4o_mini,
    'gpt_3.5_turbo': models.gpt_35_turbo,
    'gemini': models.gemini
}

def ask(message: str, model: str) -> str:
    global current_state
    try:
        current_state = f'Думает... ({model})'
        response = g4f.ChatCompletion.create(
            model=MODEL_MAP.get(model, models.gpt_4o),
            messages=[{
                "role": "user",
                "content": f"Привет! Вот задание: {message}. Ответь на русском языке, не превышая 1900 символов."
            }]
        )
        current_state = 'Формирует ответ...'
        return response
    except Exception as e:
        current_state = 'Ошибка при анализе задания!'
        return f'Ошибка: {str(e)}'

@app.route('/process_task', methods=['POST'])
def process_task():
    global current_state
    data = request.json
    task = data.get('task', '')
    model = data.get('model', 'gpt_4o')

    if not task:
        current_state = 'Ошибка: Пустое задание.'
        return jsonify({'answer': current_state})

    current_state = f'Отправка задания... (выбрана модель: {model})'
    answer = ask(task, model)
    current_state = 'Готово!'
    return jsonify({'answer': answer})

@app.route('/get_state', methods=['GET'])
def get_state():
    return jsonify({'state': current_state})

def start_server():
    # Подавление вывода сервера Flask
    sys.stdout = open(os.devnull, 'w')
    sys.stderr = open(os.devnull, 'w')
    app.run(port='5000', use_reloader=False)

def display_logo():
    os.system('clear')
    print("\033[32m"
          "██╗   ██╗ █████╗  █████╗ ███╗  ██╗ █████╗ ██╗\n"
          "\033[92m╚██╗ ██╔╝██╔══██╗██╔══██╗████╗ ██║██╔══██╗██║\n"
          "\033[92m ╚████╔╝ ███████║███████║██╔██╗██║███████║██║\n"
          "\033[32m  ╚██╔╝  ██╔══██║██╔══██║██║╚████║██╔══██║██║\n"
          "\033[92m   ██║   ██║  ██║██║  ██║██║ ╚███║██║  ██║██║\n"
          "\033[92m   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚══╝╚═╝  ╚═╝╚═╝\033[0m"
          "\n\n\033[90m      YaanAI Service - Версия v0.0.2\033[0m\n"
          "\033[90m           Lazzy dev - exLocus\033[0m\n")
    print("\n\033[32mСервер запущен и ожидает запросов!\033[0m\n")

if __name__ == "__main__":
    display_logo()
    start_server()