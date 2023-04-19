var socket = io()

function getAllWorkers()
{
    $.ajax({
        url: '/workers',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, worker) {
                var row = '<tr>' +
                    '<td>' + worker.ID + '</td>' +
                    '<td>' + worker.name + '</td>' +
                    '<td>' + worker.age + '</td>' +
                    '<td>' + worker.role + '</td>' +
                    '<td>' + worker.experience + '</td>' +
                    '<td>' + worker.started + '</td>' +
                    '<td>' + worker.school + '</td>' +
                    '<td><button class="editWorker" data-workerid="' + worker.ID + '">Edit</button>' +
                    '<button class="deleteWorker" data-workerid="' + worker.ID + '">Delete</button></td>' +
                    '</tr>';
                $('#workersList').append(row);
            });
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function UpdateRowData(ID, newData){
    const row = $("#worker-" + ID);
    row.find(".worker-ID").text(newData.ID);
    row.find(".worker-name").text(newData.name);
    row.find(".worker-age").text(newData.age);
    row.find(".worker-role").text(newData.role);
    row.find(".worker-experience").text(newData.experience);
    row.find(".worker-started").text(newData.started);
    row.find(".worker-school").text(newData.school);
}
function refreshWorkerById(ID){
    const row = $("#worker-" + ID);
    if(row){
        //request the refreshed flight data from the server:
        $.ajax({
            type: 'GET',
            url: '/workers/' + ID,
            encode: true
        })
            .done(function(data) {
                UpdateRowData(row, data)
            })
            .fail(function(data) {
                $('#result').text('Error creating worker: ' + data.responseText);
            });
    }
}
addNewWorker = (data)=>
{
                var row = '<tr>' +
                    '<td>' + data.ID + '</td>' +
                    '<td>' + data.name + '</td>' +
                    '<td>' + data.age + '</td>' +
                    '<td>' + data.role + '</td>' +
                    '<td>' + data.experience + '</td>' +
                    '<td>' + data.started + '</td>' +
                    '<td>' + data.school + '</td>' +
                    '<td><button class="editWorker" ' +
                    'data-workerid="' + data.ID + '"' +
                    'data-workername="' + data.name + '"' +
                    'data-workerage="' + data.age + '"' +
                    'data-workerrole="' + data.role + '"' +
                    'data-workerexperience="' + data.experience + '"' +
                    'data-workerstarted="' + data.started + '"' +
                    'data-workerschool="' + data.school + '"' +
                    '>Edit</button>' +
                    '<button class="deleteWorker" data-workerid="' + data.ID + '">Delete</button></td>' +
                    '</tr>';
                $('#workersList').append(row);
}
$(document).ready(function() {
    //getAllFlights()

    $('#create_worker_form').on('submit', function(event) {
        event.preventDefault(); // prevent default form submission behavior
        console.log("create")

        var formData = {
            ID: $('#ID').val(),
            name: $('#name').val(),
            age: $('#age').val(),
            role: $('#role').val(),
            experience: $('#experience').val(),
            started: $('#started').val(),
            school: $('#school').val(),
        };
        console.log("worker's ID: ", formData.ID)

        $.ajax({
            type: 'POST',
            url: '/workers',
            data: formData,
            dataType: 'json',
            encode: true
        })
            .done(function(data) {
                console.log("new worker added successfully")
                $('#createModal').css("display", "none");
                console.log(data)
                addNewWorker(data)
            })
            .fail(function(data) {
                console.log("error adding new worker")
                $('#result').text('Error adding new worker: ' + data.responseText);
            });
    });

    $('#edit_worker_form').on('submit', function(event) {
        event.preventDefault(); // prevent default form submission behavior
        console.log("edit")

        var formData = {
            ID: $('#eflightID').val(),
            name: $('#eflightNumber').val(),
            age: $('#eflightDate').val(),
            role: $('#ehour').val(),
            experience: $('#eGate').val(),
            started: $('#eDestination').val(),
            school: $('#eOrigin').val(),
        };

        $.ajax({
            type: 'PUT',
            url: '/workers/' + formData.ID,
            data: formData,
            dataType: 'json',
            encode: true
        })
            .done(function(data) {
                console.log("worker updated Successfully")
                $('#editModal').css("display", "none");
                UpdateRowData(data._id, data)
            })
            .fail(function(data) {
                console.log("error updating worker")
                //$('#result').text('Error creating flight: ' + data.responseText);
            });
    });


    $('#workersList').on('click', '.editWorker', function() {
        console.log("ID: ", $(this).data('ID'))
            $('#editModal').css("display", "block");
            $('#eID').val($(this).data('ID'));
            $('#ename').val($(this).data('name'));
            $('#eage').val($(this).data('age'));
            $('#erole').val($(this).data('role'));
            $('#eexperience').val($(this).data('experience'));
            $('#estarted').val(new Date($(this).data('started'))).toISOString().substr(0, 10);
            $('#eschool').val($(this).data('school'));
    });

    $('#workersList').on('click', '.deleteWorker', function() {
        var ID = $(this).data('ID');
        var row = $(this).closest('tr'); // get the table row containing the flight to be deleted

        if (confirm('Are you sure you want to delete this flight?')) {
            $.ajax({
                url: '/workers/' + ID,
                method: 'DELETE',
                success: function(data) {
                    //alert('Flight deleted successfully');
                    row.remove(); // remove the row containing the deleted flight from the table
                },
                error: function(err) {
                    console.log(err);
                    alert('Error deleting worker');
                }
            });
        }
    });
    var createNew = document.getElementById("createFlightBtn");

    $('#createWorkerBtn').on('click', function() {
        $('#createModal').css("display", "block");
    });

    $('.btn-close').on('click', function(){
        $('#editModal').css("display", "none");
        $('#createModal').css("display", "none");

    });

    $('#btn-create-close').on('click', function(){
        $('#createModal').css("display", "none");
    })

    socket.on('worker-changed', function(data) {
        UpdateRowData(data._id, data)
    });
});