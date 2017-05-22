<div class="header">
  <div class="container pure-g">
    <span class="brand pure-u-5-24">

      <a href="http://www.gizwits.com" class="logo">
        <img src="{{ url_for('images/logo.png') }}" alt="logo"> 
      </a>
      <a class="text" href="/">{{ __("sub_title") }}</a>
    </span>
    
    <div class="mobile-header"v>
      <span class="title">{{ __("title") }} {{ __("sub_title") }}</span>
      <i class="fa fa-caret-square-o-down fa-lg" aria-hidden="true"></i>
    </div>
    

    <span class="menu pure-u-16-24">
      <ul class="levelA-wrapper">
        {% for levelA in site.data["menu-" + lang] %}
          {% if levelA.path %}
            <li class="levelA"><a href="/{{ lang }}{{ levelA.path }}">{{ loop.key }}</a></li>
          {% else %}
            <li class="levelA">
              {{ loop.key }} &#9662;
              <ul class="levelB-wrapper">
                {% for levelB in levelA %}
                  {% if levelB.path %}
                    <li class="levelB"><a href="/{{ lang }}{{ levelB.path }}">{{ loop.key }}</a></li>
                  {% else %}
                    <li class="levelB has-submenu">
                      {{ loop.key }} &#9656;
                      <ul class="levelC-wrapper">
                        {% for levelC in levelB %}
                          <li class="levelC"><a href="/{{ lang }}{{ levelC.path }}">{{ loop.key }}</a></li>
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
  
    <span class="pure-u-3-24 lang-switch-wrapper">
      <i class="fa fa-globe" aria-hidden="true"></i> 
      {% if lang == "zh-cn" %}
      <a href="http://docsen.gizwits.com/" class="lang-switch">English</a>
      {% else %}
        <button class="lang-switch" data-lang="zh-cn">中文</button>
      {% endif %}
    </span>

  </div>
</div>