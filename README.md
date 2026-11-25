# OGm

## 🇷🇺 Русский

**OGm** --- расширение для браузера, предназначенное исключительно для
сайта [OpenGuessr](https://openguessr.com/). Оно автоматически внедряет
скрипт OGm при открытии сайта и его страниц.

**Важно:** OGm работает только с OpenGuessr. С GeoGuessr расширение не
работает и не предназначено для него.

### 📥 Установка

#### Google Chrome

1.  Скачайте `OGm_extension.zip` из раздела [Releases](../../releases).
2.  Распакуйте ZIP-архив в отдельную папку.
3.  Откройте `chrome://extensions/`.
4.  Включите **Режим разработчика (Developer mode)** в правом верхнем
    углу.
5.  Нажмите **Загрузить распакованное (Load unpacked)**.
6.  Выберите папку OGm, в которой находится `manifest.json`.
7.  Готово! Откройте [OpenGuessr](https://openguessr.com/).

#### Mozilla Firefox

1.  Скачайте `OGm_extension.zip` из раздела [Releases](../../releases).
2.  Распакуйте ZIP-архив в отдельную папку.
3.  Откройте `about:debugging#/runtime/this-firefox`.
4.  Нажмите **Загрузить временное дополнение (Load Temporary Add-on)**.
5.  Выберите файл: сам `OGm_extension.zip` либо `manifest.json` из
    распакованной папки OGm.
6.  Готово! Откройте [OpenGuessr](https://openguessr.com/).

> ⚠️ В Firefox это временная установка. После полного закрытия браузера
> расширение потребуется загрузить снова.

#### Other (Другие браузеры)

Если ваш браузер не поддерживает установку расширения OGm, можно
запустить скрипт вручную:

1.  Перейдите в корень репозитория.
2.  Скачайте файл [`OGm.js`](./OGm.js).
3.  Откройте [OpenGuessr](https://openguessr.com/).
4.  Откройте консоль разработчика браузера (Developer Console).
5.  Скопируйте всё содержимое файла `OGm.js` и вставьте его в консоль.
6.  Выполните вставленный код.

> ⚠️ При использовании этого способа скрипт потребуется запускать
> вручную.

> ⚠️ Предупреждение: слишком палевное использование приводит к
> блокировке аккаунта.

### ❓ Решение проблем

-   Убедитесь, что вы открыли OpenGuessr, а не GeoGuessr.
-   Проверьте, что ZIP-архив распакован.
-   Убедитесь, что в выбранной папке находится `manifest.json`.
-   Попробуйте перезагрузить страницу OpenGuessr.

------------------------------------------------------------------------

## 🇬🇧 English

**OGm** is a browser extension designed exclusively for
[OpenGuessr](https://openguessr.com/). It automatically injects the OGm
script when you open the website and its pages.

**Important:** OGm works only with OpenGuessr. It does not work with
GeoGuessr and is not intended for it.

### 📥 Installation

#### Google Chrome

1.  Download `OGm_extension.zip` from the [Releases](../../releases)
    section.
2.  Extract the ZIP archive into a separate folder.
3.  Open `chrome://extensions/`.
4.  Enable **Developer mode** in the top-right corner.
5.  Click **Load unpacked**.
6.  Select the OGm folder containing `manifest.json`.
7.  Done! Open [OpenGuessr](https://openguessr.com/).

#### Mozilla Firefox

1.  Download `OGm_extension.zip` from the [Releases](../../releases)
    section.
2.  Extract the ZIP archive into a separate folder.
3.  Open `about:debugging#/runtime/this-firefox`.
4.  Click **Load Temporary Add-on**.
5.  Select a file: either the `OGm_extension.zip` file itself, or the
    `manifest.json` file from the unzipped OGm folder.
6.  Done! Open [OpenGuessr](https://openguessr.com/).

> ⚠️ Firefox temporary add-ons are removed after completely closing the
> browser. You will need to load the extension again.

#### Other Browsers

If your browser does not support installing the OGm extension, you can
run the script manually:

1.  Go to the root directory of the repository.
2.  Download the [`OGm.js`](./OGm.js) file.
3.  Open [OpenGuessr](https://openguessr.com/).
4.  Open your browser's Developer Console.
5.  Copy the entire contents of `OGm.js` and paste it into the console.
6.  Execute the pasted code.

> ⚠️ When using this method, you will need to run the script manually.

> ⚠️ Warning: overly obvious usage may result in your account being
> blocked.

### ❓ Troubleshooting

-   Make sure you are using OpenGuessr, not GeoGuessr.
-   Make sure the ZIP archive has been extracted.
-   Make sure the selected folder contains `manifest.json`.
-   Try reloading the OpenGuessr page.

------------------------------------------------------------------------

## 📌 Information

-   **Project:** OGm
-   **Platform:** OpenGuessr
-   **Browsers:** Google Chrome / Mozilla Firefox
-   **Version:** 1.0.0

OGm is an independent community project and is not affiliated with
OpenGuessr or GeoGuessr.
