$(function() {
  $('#address').on('submit', function(e) {
    e.preventDefault();
    var data = $('#address').serialize();
    $.get('/address?'+ data, function(res) {
      if (res.error) {
        alert(res.error);
        return;
      }
      console.log(res);

      if (res.valid) {
        $('#verified_address').html("ADDRESS VERIFIED:<br /><br />" + res.address.filter(Boolean).join('<br />'));
      } else {
        alert('Invalid address');
      }
    });
  })
});
