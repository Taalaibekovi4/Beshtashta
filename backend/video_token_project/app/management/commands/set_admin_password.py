"""
Установка/сброс пароля админа для входа в админку (фронт).
Пример: python manage.py set_admin_password 1 1
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password

from app.models import AdminUser


class Command(BaseCommand):
    help = 'Установить пароль для админа по логину. Пример: set_admin_password 1 1'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Логин админа')
        parser.add_argument('password', type=str, help='Новый пароль')

    def handle(self, *args, **options):
        username = options['username'].strip()
        password = options['password']
        if not username:
            self.stderr.write(self.style.ERROR('Укажите логин'))
            return
        try:
            admin = AdminUser.objects.get(username=username)
        except AdminUser.DoesNotExist:
            admin = AdminUser.objects.create(
                username=username,
                password_hash=make_password(password),
            )
            self.stdout.write(self.style.SUCCESS(f'Создан админ "{username}" с указанным паролем'))
        else:
            admin.password_hash = make_password(password)
            admin.save(update_fields=['password_hash'])
            self.stdout.write(self.style.SUCCESS(f'Пароль для "{username}" обновлён'))
