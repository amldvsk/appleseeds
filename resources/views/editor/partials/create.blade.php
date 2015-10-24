@extends('editor.main')



@section('content')
    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">יצירת משחק</h3>
        </div>
        <div class="panel-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">שם המשחק</label>
                <input type="text" class="form-control" id="exampleInputEmail1" placeholder="שם המשחק">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">טקסט פתיחה (לא חובה)</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="טקסט פתיחה">
              </div>
              <div class="form-group">
                  <label for="exampleInputPassword1">כמות השאלות</label>
                  <input type="number" class="form-control" id="exampleInputPassword1" placeholder="כמות השאלות">
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
                    <button type="submit" class="btn btn-success">המשך</button>
               </div>
            </form>
        </div>
    </div>


@endsection