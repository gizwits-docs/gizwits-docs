<div class="header">
  <div class="container pure-g">
    <span class="brand pure-u-5-24">

      <a href="http://www.gizwits.com" class="logo">
        <img src="{{ url_for('images/logo.png') }}" alt="logo"> 
      </a>
      <a class="text" href="/" id="sub-title">{{ __("sub_title") }} <i class="fa fa-clone"></i></a>

      <div class="sub-title-menu" id="sub-title-menu">
        <a href="http://dev.gizwits.com" target="_blank">{{ __("dev_center") }}</a>
        <a href="http://download.gizwits.com" target="_blank">{{ __("res_center") }}</a>
        <a href="/" target="_blank">{{ __("sub_title") }}</a>
      </div>
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
      <a href="http://docsen.gizwits.com/hc/" class="lang-switch">English</a>
      {% else %}
        <button class="lang-switch" data-lang="zh-cn">中文</button>
      {% endif %}
    </span>

  </div>
</div>