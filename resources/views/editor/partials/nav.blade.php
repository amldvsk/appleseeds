<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="{{URL::to('/editor')}}">עריכת משחקים</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li class="{{ ($active == 1 ? 'active' : '')  }}">
            <a href="{{URL::to('/editor/games')}}">
                            משחקים
            </a>
         </li>
        <li class="{{ ($active == 2 ? 'active' : '')  }}">
            <a href="{{URL::to('/editor/create')}}">
                יצירת משחק חדש
            </a>
        </li>
        {{--<li class="{{ ($active == 3 ? 'active' : '')  }}" ><a href="#contact">עריכת משחק</a></li>--}}
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ Auth::user()->name  }} <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="{{ URL('/logout')  }}">התנתק</a></li>
          </ul>
        </li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</nav>