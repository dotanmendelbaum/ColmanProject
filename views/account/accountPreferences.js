function updateUser(userData)
{
    $.ajax({
        type: 'PUT',
        url: '/myaccount',
        data: userData,
        dataType: 'json',
        encode: true
    })
        .done(function(data) {
            console.log("user updated Successfully", data)
            updateFields(data)
        })
        .fail(function(data) {
            console.log("error updating account")
            //$('#result').text('Error creating flight: ' + data.responseText);
        });
}

function updateFields(data)
{
    $('#name').val(data.name),
        $('#email').val(data.email),
        $('#id').val(data.id)
    $('#birthDate').val(new Date(data.birthDate).toISOString().slice(0, 10)),
    $('#phone').val(data.phone),
    $('#password').val(data.password)

}

function getFieldsData()
{
    var data = {
        name: $('#name').val(),
        email: $('#email').val(),
        birthDate: $('#birthDate').val(),
        phone: $('#phone').val(),
        password: $('#password').val(),
    }
    console.log(data)
    return data
}
$(document).ready(function() {
    $('#user').on('submit', function(event) {
        event.preventDefault(); // prevent default form submission behavior
        console.log("submit")
        updateUser(getFieldsData());
    });
})