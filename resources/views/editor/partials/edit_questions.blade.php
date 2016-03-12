@extends('editor.main')



@section('content')



    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">הוספת שאלות</h3>
        </div>
        <div class="panel-body">
            <p>הוספת שאלות למשחק</p>
             <form action="{{ URL::to('/editor/edit/questions')  }}" class="add-questions" method="POST">
                @if ($errors->has())
                    <div class="alert alert-danger">
                        @foreach ($errors->all() as $error)
                            {{ $error }}<br>
                        @endforeach
                    </div>
                @endif
                 <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                    @foreach($game->questions as $i => $qs)
                        <div class="panel panel-default question_panel">
                            <div class="panel-heading" role="tab" id="headingOne">
                              <h4 class="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse{{ $i }}" aria-expanded="true" aria-controls="collapse{{ $i }}">
                                  שאלה <span>{{ $i + 1 }}</span>
                                  @if( $i > 5 )
                                    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                  @endif
                                </a>
                              </h4>
                            </div>
                            <div id="collapse{{ $i }}" class="panel-collapse collapse {{ $i == 0 ? 'in' : ''  }}" role="tabpanel" aria-labelledby="headingOne">
                              <div class="panel-body">
                                <div class="form-group">
                                    <label for="game_name">שאלה <span>{{ $i + 1 }}</span></label>
                                    <input type="text" class="form-control" id="question_{{ $i + 1 }}" name="question[][question][question_text]" placeholder="מלל שאלה {{ $i + 1 }}" value="{{ $qs->question }}">
                                    @if ($errors->has('game_name')) <p class="help-block">{{ $errors->first('game_name') }}</p> @endif
                                    <ul class="list-unstyled answers">
                                        @foreach ($qs->answers as $j => $ans)
                                            <li>
                                                <div class="form-group">
                                                    <label for="game_name">תשובה <span>{{ $j + 1 }}</span></label>
                                                    <input type="text" class="form-control" id="answers" name="question[{{$i}}][question][answers][]" placeholder="מלל תשובה {{ $j + 1 }}" value="{{ $ans->answer }}">
                                                </div>
                                            </li>
                                        @endforeach
                                        <div class="form-group">
                                            <label for="game_name">בחר תשובה נכונה</label>
                                            <select name="question[{{$i}}][question][right_answer]" id="" class="form-control">
                                                <option value="0">תשובה 1</option>
                                                <option value="1">תשובה 2</option>
                                                <option value="2">תשובה 3</option>
                                                <option value="3">תשובה 4</option>
                                            </select>
                                        </div>
                                    </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                    @endforeach
                </div>
                <div class="text-right">
                    <button type="button" class="btn btn-default" onClick="addQuestion(); return false;" >+ הוסף שאלה</button>
                </div>
                <hr/>
               <div class="text-right">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="game_id" value="{{ $game_id  }}">
                    <button type="submit" class="btn btn-success">עדכן שאלות</button>
               </div>
            </form>
        </div>
    </div>




@endsection