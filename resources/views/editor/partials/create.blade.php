@extends('editor.main')



@section('content')
    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">יצירת משחק</h3>
        </div>
        <div class="panel-body">
            <p>יצירת משחק חדש...</p>
            <form action="{{URL::to('/editor/create')}}" method="POST">
              <div class="form-group">
                @if ($errors->has())
                      <div class="alert alert-danger">
                          @foreach ($errors->all() as $error)
                              {{ $error }}<br>
                          @endforeach
                      </div>
                  @endif
              </div>
              <div class="form-group">
                <label for="game_name">שם המשחק</label>
                <input type="text" class="form-control" id="game_name" name="game_name" placeholder="שם המשחק">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">טקסט פתיחה (לא חובה)</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="טקסט פתיחה">
              </div>
              <div class="form-group">
                  <label for="exampleInputPassword1">תחום תוכן</label>
                  <select class="form-control" name="" id="">
                    <option value="0">נא לבחור תחום תוכן</option>
                    @foreach( $options['content_area'] as $area )
                        <option value="{{ $area->id  }}">{{ $area->area  }}</option>
                    @endforeach
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">קהל יעד</label>
                  <select class="form-control" name="" id="">
                    <option value="0">נא לבחור קהל יעד</option>
                    @foreach( $options['audience'] as $audience )
                        <option value="{{ $audience->id  }}">{{ $audience->audience_type  }}</option>
                    @endforeach
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">רמת קושי</label>
                  <select class="form-control" name="" id="">
                    <option value="0">נא לבחור רמת קושי</option>
                    @foreach( $options['difficulty_level'] as $level )
                        <option value="{{ $level->id  }}">{{ $level->level  }}</option>
                    @endforeach
                  </select>
                </div>
              <div class="form-group">
                  <label for="exampleInputPassword1">הודעת פתיחה</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" placeholder="הודעת פתיחה">
                </div>
               <div class="form-group">
                 <label for="exampleInputPassword1">הודעת סיום</label>
                 <input type="text" class="form-control" id="exampleInputPassword1" placeholder="הודעת סיום">
               </div>
               <div class="text-right">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <button type="submit" class="btn btn-success">המשך</button>
               </div>
            </form>
        </div>
    </div>


@endsection