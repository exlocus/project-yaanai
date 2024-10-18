from flask import Flask, request, jsonify
from flask_cors import CORS
import g4f
from g4f import models

app = Flask(__name__)
CORS(app)

current_state = 'Ожидание'

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
                "content": ( 
                    f"Привет! Ты — отличник, знающий ответы на любые задания. Реши задание с платформы ЯКласс. Ознакомься с приведенным текстом задания: {message}. " 
                    f"Ответи строго на русском языке, не превышая 1900 символов. " 
                    f"Если есть варианты ответов, выбирай только из них, не выходя за их рамки. " 
                    f"Нужно дать только ответ (то что нужно заполнить в поле) в порядке уменьшения." 
                    f"Используй интернет для подтверждения информации. " 
                    f"Помни, что твои ответы должны основываться только на знаниях и фактах." 
                ) 
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

if __name__ == '__main__':
    app.run(port=5000)
   
