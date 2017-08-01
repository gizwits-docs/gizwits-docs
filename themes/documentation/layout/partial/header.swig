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
      <span class="header-search-btn" id="header-search-btn">
        <i class="fa fa-search"></i>
      </span>
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

  <div class="header-search-panel" id="header-search-panel">
    <div class="header-search-input-wrap">
      <input type="text" class="header-search-input" placeholder="请输入关键字">
      <span class="header-search-input-icon"><i class="fa fa-search"></i></span>
    </div>

    <div class="header-search-trend" id="header-search-trend">
      <div class="header-search-trend-title">热搜词</div>
      <div class="header-search-trend-items clearfix">
        {% for k in site.data.searchTrend %}
        <div class="header-search-trend-item" data-word="{{k}}">{{k}}</div>
        {% endfor %}
      </div>  
    </div>

    <div class="header-search-result hidden" id="header-search-result">
      <div class="header-search-result-head">
        搜索结果 &gt; <span id="header-search-keyword"></span>
      </div>
      <div class="header-search-result-items" id="header-search-result-items">
      </div>
    </div>
  </div>
</div>