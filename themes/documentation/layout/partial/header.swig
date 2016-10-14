<div class="header">
  <div class="container pure-g">
    <span class="brand pure-u-1-5">
      {# <a class="logo" href="http://www.giziwts.com">&#xe600;</a> #}
      <a class="text" href="/">{{ __('sub_title') }}</a>
    </span>

    <span class="menu pure-u-4-5">
      <ul class="levelA-wrapper">
        {% for levelA in site.data['menu-' + lang] %}
          {% if levelA.path %}
            <li class="levelA"><a href="{{ lang }}{{ levelA.path }}">{{ loop.key }}</a></li>
          {% else %}
            <li class="levelA">
              {{ loop.key }} &#9662;
              <ul class="levelB-wrapper">
                {% for levelB in levelA %}
                  {% if levelB.path %}
                    <li class="levelB"><a href="{{ lang }}{{ levelB.path }}">{{ loop.key }}</a></li>
                  {% else %}
                    <li class="levelB">
                      {{ loop.key }} &#9656;
                      <ul class="levelC-wrapper">
                        {% for levelC in levelB %}
                          <li class="levelC"><a href="{{ lang }}{{ levelC.path }}">{{ loop.key }}</a></li>
                        {% endfor %}
                      </ul>
                    </li>
                  {% endif %}
                {% endfor %}
              </ul>
            </li>
          {% endif %}
        {% endfor %}
      </ul>
    </span>

  </div>
</div>