function updateUser(data)
{
    $.ajax({
        type: 'PUT',
        url: '/flights/' + formData.flightID,
        data: formData,
        dataType: 'json',
        encode: true
    })
        .done(function(data) {
            console.log("user updated Successfully")
            updateFields(data)
        })
        .fail(function(data) {
            console.log("error updating flight")
            //$('#result').text('Error creating flight: ' + data.responseText);
        });
}

function updateFields(data)
{
    $("#name").val(data.name)
}

$(document).ready(function() {
    //getAllFlights()

    $('#user').on('submit', function(event) {
    updateUser(data);
    });
}