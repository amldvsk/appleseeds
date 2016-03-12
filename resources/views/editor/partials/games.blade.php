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
        @foreach( $games as $game )
            <tr>
              <th scope="row">{{ $game->unique_id  }}</th>
              <td>{{ $game->game_name  }}</td>
              <td>{{ $game->content_area  }}</td>
              <td>{{ $game->audience  }}</td>
              <td>{{ count($game->questions)  }}</td>
              <td>{{ $game->difficulty_level  }}</td>
              <td>{{ $game->user->name  }}</td>
              <td>{{ $game->created_at  }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="...">
                  @if( $game->user->id == Auth::user()->id )
                    <a href="{{ URL('/editor/delete', $game->unique_id) }}" class="delete-game btn btn-danger">מחיקה</a>
                    <a href="{{ URL('/editor/edit', $game->unique_id) }}" class="btn btn-info">עריכה</a>
                  @endif
                  <a href="{{ URL('/editor/copy', $game->unique_id) }}" class="btn btn-success">שכפול</a>
                  <a href="{{ URL('/game', $game->unique_id) }}" target="_blank" class="btn btn-primary">צפייה</a>
                </div>
              </td>
            </tr>
        @endforeach
      </tbody>
    </table>

@endsection