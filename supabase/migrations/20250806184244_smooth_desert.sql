/*
  # Создание таблицы гостей

  1. Новые таблицы
    - `guests`
      - `id` (uuid, первичный ключ)
      - `surname` (text, фамилия)
      - `first_name` (text, имя)
      - `patronymic` (text, отчество, может быть null)
      - `phone_number` (text, номер телефона)
      - `confirmed` (boolean, подтверждение участия)
      - `created_at` (timestamptz, дата создания)

  2. Безопасность
    - Включить RLS для таблицы `guests`
    - Добавить политику для чтения данных аутентифицированными пользователями
    - Добавить политику для вставки данных всеми пользователями
*/

CREATE TABLE IF NOT EXISTS guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  surname text NOT NULL,
  first_name text NOT NULL,
  patronymic text,
  phone_number text NOT NULL,
  confirmed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Политика для чтения данных только аутентифицированными пользователями (админы)
CREATE POLICY "Authenticated users can read guests"
  ON guests
  FOR SELECT
  TO authenticated
  USING (true);

-- Политика для вставки данных всеми пользователями (регистрация гостей)
CREATE POLICY "Anyone can insert guests"
  ON guests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);