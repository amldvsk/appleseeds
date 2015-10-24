@extends('editor.main')



@section('content')

    <table class="table table-striped">
      <caption>טבלת משחקים....</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>שם המשחק</th>
          <th>תחום תוכן</th>
          <th>קהל יעד</th>
          <th>מס' שאלות</th>
          <th>רמת קושי</th>
          <th>נוצר על ידי</th>
          <th>תאריך יצירה</th>
          <th>אפשרויות</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Otto</td>
          <td>
            <div class="btn-group" role="group" aria-label="...">
              <button type="button" class="btn btn-success">שכפול</button>
              <button type="button" class="btn btn-primary">צפייה</button>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Otto</td>
          <td>
            <div class="btn-group" role="group" aria-label="...">
              <button type="button" class="btn btn-danger">מחיקה</button>
              <button type="button" class="btn btn-info">עריכה</button>
              <button type="button" class="btn btn-primary">צפייה</button>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Otto</td>
          <td>
            <div class="btn-group" role="group" aria-label="...">
              <button type="button" class="btn btn-success">שכפול</button>
              <button type="button" class="btn btn-primary">צפייה</button>
            </div
          </td>
        </tr>
      </tbody>
    </table>

@endsection