import os
import subprocess
import sys

# Цвета для вывода в консоль
class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    CYAN = '\033[96m'
    RESET = '\033[0m'

# Определение путей
script_path = os.path.abspath(__file__)
script_dir = os.path.dirname(script_path)
requirements_path = os.path.join(script_dir, 'requirements.txt')
main_script = os.path.join(script_dir, 'main.py')
start_script = os.path.join(script_dir, 'start-yaanai-service.py')
command_name = 'start-yaanai-service'

def install_requirements():
    """Установить библиотеки из requirements.txt, если они не установлены."""
    print(f"{Colors.YELLOW}Установка необходимых библиотек...{Colors.RESET}")
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', requirements_path])
        print(f"{Colors.GREEN}Библиотеки успешно установлены!{Colors.RESET}")
    except subprocess.CalledProcessError:
        print(f"{Colors.RED}Ошибка при установке библиотек.{Colors.RESET}")
        sys.exit(1)

def make_command():
    """Создать глобальную команду для запуска main.py из любой директории."""
    bin_dir = os.path.expanduser('~/.local/bin')
    os.makedirs(bin_dir, exist_ok=True)
    command_path = os.path.join(bin_dir, command_name)

    if not os.path.exists(command_path):
        with open(command_path, 'w') as f:
            f.write(f"#!/bin/bash\npython3 {start_script}\n")
        os.chmod(command_path, 0o755)
        print(f"{Colors.CYAN}Команда '{command_name}' успешно создана!{Colors.RESET}")

        if bin_dir not in os.environ['PATH']:
            shell_config_file = os.path.expanduser('~/.bashrc')
            with open(shell_config_file, 'a') as f:
                f.write(f'\n# Добавление bin_dir в PATH для start-yaanai-service\n')
                f.write(f'export PATH="{bin_dir}:$PATH"\n')
            print(f"{Colors.CYAN}Путь {bin_dir} добавлен в {shell_config_file}.{Colors.RESET}")

def main():
    first_run_file = os.path.join(script_dir, '.first_run_complete')

    if not os.path.exists(first_run_file):
        install_requirements()
        make_command()
        open(first_run_file, 'w').close()
        print(f"{Colors.GREEN}Установка завершена!{Colors.RESET}")
        print(f"{Colors.CYAN}Перезапустите терминал или выполните 'source ~/.bashrc', чтобы обновить PATH.{Colors.RESET}")
        print(f"{Colors.CYAN}Теперь вы можете запустить 'start-yaanai-service' для запуска YaanAI Service из любой директории.{Colors.RESET}")
        return

    print(f"{Colors.GREEN}Запуск YaanAI Service...{Colors.RESET}")
    try:
        subprocess.check_call([sys.executable, main_script])
    except subprocess.CalledProcessError:
        print(f"{Colors.RED}Ошибка при запуске YaanAI Service.{Colors.RESET}")
        sys.exit(1)

if __name__ == "__main__":
    main()
