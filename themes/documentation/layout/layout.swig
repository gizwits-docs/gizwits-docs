{% set lang = __("lang") %}
<!DOCTYPE html>
<html lang="{{ lang }}">
  {{ partial("partial/head") }}
  <body>
    {{ partial("partial/header", {lang: lang}) }}
    {{ body }}
    {{ partial("partial/footer") }}
    
    {{ partial("partial/widget") }}

    {{ partial("partial/after-footer") }}
  </body>
</html>