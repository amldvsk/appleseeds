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
                  <label for="exampleInputPassword1">תחום תוכן</label>
                  <select class="form-control" name="" id="">
                    <option value="0">נא לבחור תחום תוכן</option>
                    <option value="1">תחום 1</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">קהל יעד</label>
                  <select class="form-control" name="" id="">
                    <option value="0">נא לבחור קהל יעד</option>
                    <option value="1">יעד 1</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">רמת קושי</label>
                  <select class="form-control" name="" id="">
                    <option value="0">נא לבחור רמת קושי</option>
                    <option value="1">רמה 1</option>
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
                    <button type="submit" class="btn btn-success">המשך</button>
               </div>
            </form>
        </div>
    </div>


@endsection