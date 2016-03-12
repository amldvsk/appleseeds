@extends('editor.main')



@section('content')
    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">יצירת משחק</h3>
        </div>
        <div class="panel-body">
            <p>עריכת משחק</p>
            <form action="{{URL::to('/editor/edit', $game->unique_id)}}" method="POST">
              <div class="form-group">
              </div>
              <div class="form-group">
                <label for="game_name">שם המשחק</label>
                <input type="text" class="form-control" id="game_name" name="game_name" placeholder="שם המשחק" value="{{ $game->game_name }}">
                @if ($errors->has('game_name')) <p class="help-block">{{ $errors->first('game_name') }}</p> @endif
              </div>
              <div class="form-group">
                <label for="game_opening_statement">טקסט פתיחה (לא חובה)</label>
                <input type="text" class="form-control" id="game_opening_statement" name="game_opening_statement" placeholder="טקסט פתיחה" value="{{ $game->game_opening_statement }}">
                @if ($errors->has('game_opening_statement')) <p class="help-block">{{ $errors->first('game_opening_statement') }}</p> @endif
              </div>
              <div class="form-group">
                  <label for="content_area">תחום תוכן</label>
                  <select class="form-control" name="content_area" id="content_area" >
                    <option value="0" selected="selected" disabled="disabled">נא לבחור תחום תוכן</option>
                    @foreach( $options['content_area'] as $area )
                        @if($game->content_area == $area->id)
                            <option value="{{ $area->id  }}" selected >{{ $area->area  }}</option>
                        @else
                            <option value="{{ $area->id  }}" >{{ $area->area  }}</option>
                        @endif
                    @endforeach
                  </select>
                  @if ($errors->has('content_area')) <p class="help-block">{{ $errors->first('content_area') }}</p> @endif
                </div>
                <div class="form-group">
                  <label for="audience">קהל יעד</label>
                  <select class="form-control" name="audience" id="audience" >
                    <option value="0" selected="selected" disabled="disabled">נא לבחור קהל יעד</option>
                    @foreach( $options['audience'] as $audience )
                        @if($game->audience == $audience->id)
                            <option value="{{ $audience->id  }}" selected>{{ $audience->audience_type  }}</option>
                        @else
                            <option value="{{ $audience->id  }}">{{ $audience->audience_type  }}</option>
                        @endif
                    @endforeach
                  </select>
                  @if ($errors->has('audience')) <p class="help-block">{{ $errors->first('audience') }}</p> @endif
                </div>
                <div class="form-group">
                  <label for="difficulty_level">רמת קושי</label>
                  <select class="form-control" name="difficulty_level" id="difficulty_level" >
                    <option value="0" selected="selected" disabled="disabled">נא לבחור רמת קושי</option>
                    @foreach( $options['difficulty_level'] as $level )
                        @if($game->difficulty_level == $level->id)
                            <option value="{{ $level->id  }}" selected>{{ $level->level  }}</option>
                        @else
                            <option value="{{ $level->id  }}">{{ $level->level  }}</option>
                        @endif
                    @endforeach
                  </select>
                  @if ($errors->has('difficulty_level')) <p class="help-block">{{ $errors->first('difficulty_level') }}</p> @endif
                </div>
              <div class="form-group hidden">
                  <label for="game_desc">הודעת פתיחה</label>
                  <input type="text" class="form-control" id="game_desc" name="game_desc" placeholder="הודעת פתיחה"  value="{{ $game->game_desc }}">
                  @if ($errors->has('game_desc')) <p class="help-block">{{ $errors->first('game_desc') }}</p> @endif
                </div>
               <div class="form-group">
                 <label for="game_ending_statement">הודעת סיום (לא חובה)</label>
                 <input type="text" class="form-control" id="game_ending_statement" name="game_ending_statement" placeholder="הודעת סיום"   value="{{  $game->game_ending_statement }}">
                 @if ($errors->has('game_ending_statement')) <p class="help-block">{{ $errors->first('game_ending_statement') }}</p> @endif
               </div>
               <div class="form-group hidden">
                    <label for="game_time">הגבלת זמן המשחק בשניות (0 ללא הגבלת זמן)</label>
                    <input type="number" class="form-control" id="game_time" name="game_time" placeholder="הודעת סיום"  min="0" value="{{ (Input::old('game_time') ? Input::old('game_time') : 0) }}">
                  </div>
               <div class="text-right">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <button type="submit" class="btn btn-success">עדכן משחק</button>
               </div>
            </form>
        </div>
    </div>


@endsection