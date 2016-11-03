<div class="header">
  <div class="container pure-g">
    <span class="brand pure-u-5-24">
      <a href="http://www.gizwits.com" class="logo">
        <img src="{{ url_for('images/logo.png') }}" alt="logo"> 
      </a>
      <a class="text" href="/">{{ __("sub_title") }}</a>
    </span>

    <span class="menu pure-u-14-24">
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
    
    {# for DELETE #}
    <span class="pure-u-2-24"><a href="" style="color: #faeb00;">返回旧版</a></span>
  
    <span class="pure-u-3-24">
      <i class="fa fa-globe" aria-hidden="true"></i> 
      {% if lang == "zh-cn" %}
        <button class="lang-switch" data-lang="en-us">English</button>
      {% else %}
        <button class="lang-switch" data-lang="zh-cn">中文</button>
      {% endif %}
    </span>

  </div>
</div>