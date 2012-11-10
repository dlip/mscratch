$(document).ready(function () {
	var converter1 = Markdown.getSanitizingConverter();
	var editor1 = new Markdown.Editor(converter1);
	editor1.run();

	if($('#wmd-input').val().length == 0) {
		$('#wmd-input').focus();
	}
	else {
		$('#wmd-input').hide();
		$('#wmd-button-bar').hide();
	}
	
	
	$('#mscratch-edit').click(function() {
		if($('#mscratch-edit').text() == 'Edit') {
			$('#wmd-input').show();
			$('#wmd-button-bar').show();
			$('#mscratch-edit').text('Close');
			var temp=$('#wmd-input').val();
		    $('#wmd-input').val('');
		    $('#wmd-input').focus();
		    $('#wmd-input').val(temp);

		}
		else {
			$('#wmd-input').hide();
			$('#wmd-button-bar').hide();
			$('#mscratch-edit').text('Edit');
		}
		
	});

	$('#mscratch-delete').click(function() {
		var r=confirm("Really delete?");
		if (r!=true){
			return;
		}
		
		var data = {
			markdownfile: $('#markdownfile').text(),
		}
		$.ajax({
		  url: '/',
		  type: 'DELETE',
		  data: data,
		  success: function(text) {
		    location.reload();
		  }
		});
	});


	$('#mscratch-save').click(function() {
		var data = {
			markdownfile: $('#markdownfile').text(),
			text: $('#wmd-input').val()
		}
		$.post('/', data, function(text) {
			alert(text.result);
		});
	});


}	);
