# qilish kerak
 - auth / jwt / bycrpy
 - notification
   - GET    /notifications            # Мои уведомления
   - GET    /notifications/unread     # Непрочитанные уведомления
   - PUT    /notifications/{id}/read  # Отметить как прочитанное
   - PUT    /notifications/read-all   # Прочитать все
   - GET    /notifications/settings   # Настройки уведомлений
   - PUT    /notifications/settings   # Обновить настройки
 - СОЦИАЛЬНЫЕ ФУНКЦИИ
   - POST   /follow/{businessId}      # Подписаться на заведение
   - DELETE /follow/{businessId}      # Отписаться
   - GET    /follow/following         # Мои подписки
   - GET    /follow/favorites         # Избранные заведения
   - POST   /favorites/{businessId}   # Добавить в избранное
   - DELETE /favorites/{businessId}   # Удалить из избранного
   - GET    /feed                     # Лента активности
   - POST   /share/{orderId}          # Поделиться спасенной едой (в соцсети)

# 1fitga ushab istoriya / post / chat qilish kerak
# otzivlarga companiya uzi javob qiladigan qilish kerak