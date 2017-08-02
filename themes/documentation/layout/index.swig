<div class="body">

  <div class="container clearfix">
    <div class="navigation">
      <div class="navigation-inner">
        <div class="nav-title">{{ __('content') }}</div>
        <div class="nav"></div>
      </div>
    </div>
    <div class="markdown-body" data-spy="scroll" data-target=".navigation">
      <div class="heading">
        <div class="title">{{ page.title }}</div>
        <a class="edit-link" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> {{ __('edit') }}</a>
      </div>
      {{ page.content }}
    </div>
    
    {{ partial("partial/widget") }}
  </div>
</div>
