


var questions = 5;

function addQuestion() {


    var template = '<div class="panel panel-default question_panel">'+
        '<div class="panel-heading" role="tab" id="headingOne">'+
        '<h4 class="panel-title">'+
        '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+questions+'" aria-expanded="true" aria-controls="collapse'+questions+'">'+
        'שאלה <span>'+(questions+1)+'</span>'+
        '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
        '</a>'+
        '</h4>'+
        '</div>'+
        '<div id="collapse'+questions+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">'+
    '<div class="panel-body">'+
    '<div class="form-group">'+
    '<label for="game_name">שאלה <span>'+(questions+1)+'</span></label>'+
    '<input type="text" class="form-control" id="question_'+questions+1+'" name="question[][question][question_text]" placeholder="מלל שאלה '+(questions+1)+'" >'+
    '<ul class="list-unstyled answers">';

    for( var i = 0; i < 4; i++ ) {
        template +='<li>'+
                        '<div class="form-group">'+
                            '<label for="game_name">תשובה <span>'+ (i+1) +'</span></label>'+
                            '<input type="text" class="form-control" id="answers" name="question['+(questions)+'][question][answers][]" placeholder="מלל תשובה '+ (i+1) +'" >'+
                        '</div>'+
                    '</li>';
    }

    template +='<div class="form-group">'+
    '<label for="game_name">בחר תשובה נכונה</label>'+
    '<select name="question['+questions+'][question][right_answer]" id="" class="form-control">'+
    '<option value="0">תשובה 1</option>'+
    '<option value="1">תשובה 2</option>'+
    '<option value="2">תשובה 3</option>'+
    '<option value="3">תשובה 4</option>'+
    '</select>'+
    '</div>'+
    '</ul>'+
    '</div>'+
    '</div>'+
    '</div>'+
'</div>';


    questions++;
    $('#accordion').append(template);

}


$('.add-questions').on('click', '.question_panel .close', function(e) {
    e.stopPropagation();
    questions--;
    $(this).parents('.question_panel').remove();
});



$('.delete-game').on('click', function(e) {
    e.preventDefault();
    var hr = $(this).attr('href');

    if(confirm("האם אתה בטוח ?")) {
        window.location.href = hr;
    }
});