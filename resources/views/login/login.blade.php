<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>appleseeds</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
    <link href="{{ asset('assets/css/style.css') }}" rel="stylesheet">

  </head>
  <body>

    <div class="container">

      <form class="form-signin" method="post" action="{{ URL('/auth/login')  }}">
        <img src="{{asset('assets/img/logo.png')}}" alt="" height="250"/>
        @if( Session::has('login_error') )
            <div class="alert alert-danger" role="alert">{{ Session::get('login_error')  }}</div>
        @endif
        <?php echo csrf_field(); ?>
        <h2 class="form-signin-heading">התחבר</h2>
        <label for="inputEmail" class="sr-only">כתובת אימייל</label>
        <input name="email" type="email" id="inputEmail" class="form-control" placeholder="כתובת אימייל" required autofocus>
        @if ($errors->has('email')) <p class="help-block">{{ $errors->first('email') }}</p> @endif
        <label for="inputPassword" class="sr-only">סיסמה</label>
        <input name="password" type="password" id="inputPassword" class="form-control" placeholder="סיסמה" required>
        @if ($errors->has('password')) <p class="help-block">{{ $errors->first('password') }}</p> @endif
        {{--<div class="checkbox">--}}
          {{--<label>--}}
            {{--<input type="checkbox" value="remember-me"> זכור אותי--}}
          {{--</label>--}}
        {{--</div>--}}
        <button class="btn btn-success btn-block" type="submit">התחבר</button>
      </form>

    </div> <!-- /container -->


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script><script src="js/bootstrap.min.js"></script>

  </body>
</html>
