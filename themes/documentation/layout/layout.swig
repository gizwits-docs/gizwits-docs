{% set lang = __('lang') %}
<!DOCTYPE html>
<html lang="{{ lang }}">
  {{ partial('partial/head', {lang: lang}) }}
  <body>
    {{ partial('partial/header', {lang: lang}) }}
    {{ body }}
    {{ partial('partial/footer', {lang: lang}) }}

    {{ partial('partial/after-footer', {lang: lang}) }}
  </body>
</html>