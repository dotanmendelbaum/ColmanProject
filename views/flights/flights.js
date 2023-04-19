var socket = io()
const twitterUtil = require('../../twitterApi');

function getAllFlights()
{
    $.ajax({
        url: '/flights',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, flight) {
                var row = '<tr>' +
                    '<td>' + flight.Number + '</td>' +
                    '<td>' + flight.flightDate + '</td>' +
                    '<td>' + flight.hour + '</td>' +
                    '<td>' + flight.Gate + '</td>' +
                    '<td>' + flight.Destination + '</td>' +
                    '<td>' + flight.Origin + '</td>' +
                    '<td>' + flight.flightPrice + '</td>' +
                    '<td>' + flight.ArrivingDate + '</td>' +
                    '<td>' + flight.NumberOfSeats + '</td>' +
                    '<td>' + flight.ArrivingHour + '</td>' +
                    '<td><button class="editFlight" data-flightid="' + flight._id + '">Edit</button>' +
                    '<button class="deleteFlight" data-flightid="' + flight._id + '">Delete</button></td>' +
                    '</tr>';
                $('#flightList').append(row);
            });
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function UpdateRowData(flightId, newData){
    const row = $("#flight-" + flightId);
    row.find(".flight-number").text(newData.flightNumber);
    row.find(".flight-date").text(newData.flightDate);
    row.find(".flight-hour").text(newData.hour);
    row.find(".flight-gate").text(newData.Gate);
    row.find(".flight-destination").text(newData.Destination);
    row.find(".flight-origin").text(newData.Origin);
    row.find(".flight-price").text(newData.flightPrice);
    row.find(".flight-arriving-date").text(newData.ArrivingDate);
    row.find(".flight-number-of-seats").text(newData.NumberOfSeats);
    row.find(".flight-arriving-hour").text(newData.ArrivingHour);
}
function refreshFlightById(flightId){
    const row = $("#flight-" + flightId);
    if(row){
        //request the refreshed flight data from the server:
        $.ajax({
            type: 'GET',
            url: '/flights/' + flightId,
            encode: true
        })
            .done(function(data) {
                UpdateRowData(row, data)
            })
            .fail(function(data) {
                $('#result').text('Error creating flight: ' + data.responseText);
            });
    }
}
addNewFlight = (data)=>
{
                var row = '<tr>' +
                    '<td>' + data.flightNumber + '</td>' +
                    '<td>' + data.flightDate + '</td>' +
                    '<td>' + data.hour + '</td>' +
                    '<td>' + data.Gate + '</td>' +
                    '<td>' + data.Destination + '</td>' +
                    '<td>' + data.Origin + '</td>' +
                    '<td>' + data.flightPrice + '</td>' +
                    '<td>' + data.ArrivingDate + '</td>' +
                    '<td>' + data.NumberOfSeats + '</td>' +
                    '<td>' + data.ArrivingHour + '</td>' +
                    '<td><button class="editFlight" ' +
                    'data-flightid="' + data._id + '"' +
                    'data-flightnumber="' + data.flightNumber + '"' +
                    'data-flightdate="' + data.flightDate + '"' +
                    'data-hour="' + data.hour + '"' +
                    'data-gate="' + data.Gate + '"' +
                    'data-destination="' + data.Destination + '"' +
                    'data-origin="' + data.Origin + '"' +
                    'data-price="' + data.flightPrice + '"' +
                    'data-arrivingdate="' + data.ArrivingDate + '"' +
                    'data-numberofseats="' + data.NumberOfSeats + '"' +
                    'data-arrivinghour="' + data.ArrivingHour + '"' +
                    '>Edit</button>' +
                    '<button class="deleteFlight" data-flightid="' + data._id + '">Delete</button></td>' +
                    '</tr>';
                $('#flightList').append(row);
}
$(document).ready(function() {
    //getAllFlights()

    $('#create_flight_form').on('submit', function(event) {
        event.preventDefault(); // prevent default form submission behavior
        console.log("create")

        var formData = {
            flightNumber: $('#flightNumber').val(),
            flightDate: $('#flightDate').val(),
            hour: $('#hour').val(),
            Gate: $('#Gate').val(),
            Destination: $('#Destination').val(),
            Origin: $('#Origin').val(),
            flightPrice: $('#flightPrice').val(),
            ArrivingDate: $('#ArrivingDate').val(),
            NumberOfSeats: $('#NumberOfSeats').val(),
            ArrivingHour: $('#ArrivingHour').val()
        };
        console.log("flight number: ", formData.flightNumber)

        $.ajax({
            type: 'POST',
            url: '/flights',
            data: formData,
            dataType: 'json',
            encode: true
        })
            .done(function(data) {
                console.log("flight created successfully")
                $('#createModal').css("display", "none");
                console.log(data)
                addNewFlight(data)
                twitterUtil.tweet(data)
            })
            .fail(function(data) {
                console.log("error creating flight")
                $('#result').text('Error creating flight: ' + data.responseText);
            });
    });

    $('#edit_flight_form').on('submit', function(event) {
        event.preventDefault(); // prevent default form submission behavior
        console.log("edit")

        var formData = {
            flightID: $('#eflightID').val(),
            flightNumber: $('#eflightNumber').val(),
            flightDate: $('#eflightDate').val(),
            hour: $('#ehour').val(),
            Gate: $('#eGate').val(),
            Destination: $('#eDestination').val(),
            Origin: $('#eOrigin').val(),
            flightPrice: $('#eflightPrice').val(),
            ArrivingDate: $('#eArrivingDate').val(),
            NumberOfSeats: $('#eNumberOfSeats').val(),
            ArrivingHour: $('#eArrivingHour').val()
        };

        $.ajax({
            type: 'PUT',
            url: '/flights/' + formData.flightID,
            data: formData,
            dataType: 'json',
            encode: true
        })
            .done(function(data) {
                console.log("flight updated Successfully")
                $('#editModal').css("display", "none");
                UpdateRowData(data._id, data)
            })
            .fail(function(data) {
                console.log("error updating flight")
                //$('#result').text('Error creating flight: ' + data.responseText);
            });
    });


    $('#flightList').on('click', '.editFlight', function() {
        //var flightID = $(this).data('flightid');
        //('#flightDate').val()
        console.log("flightid: ", $(this).data('flightid'))
            $('#editModal').css("display", "block");
            $('#eflightID').val($(this).data('flightid'));
            $('#eflightNumber').val($(this).data('flightnumber'));
            $('#eflightDate').val(new Date($(this).data('flightdate')).toISOString().substr(0, 10));
            $('#ehour').val($(this).data('hour'));
            $('#eGate').val($(this).data('gate'));
            $('#eDestination').val($(this).data('destination'));
            $('#eOrigin').val($(this).data('origin'));
            $('#eflightPrice').val($(this).data('price'));
            $('#AerrivingDate').val(new Date($(this).data('arrivingdate')).toISOString().substr(0, 10));
            $('#eNumberOfSeats').val($(this).data('numberofseats'));
            $('#eArrivingHour').val($(this).data('arrivinghour'));
    });

    $('#flightList').on('click', '.deleteFlight', function() {
        var flightID = $(this).data('flightid');
        var row = $(this).closest('tr'); // get the table row containing the flight to be deleted

        if (confirm('Are you sure you want to delete this flight?')) {
            $.ajax({
                url: '/flights/' + flightID,
                method: 'DELETE',
                success: function(data) {
                    //alert('Flight deleted successfully');
                    row.remove(); // remove the row containing the deleted flight from the table
                },
                error: function(err) {
                    console.log(err);
                    alert('Error deleting flight');
                }
            });
        }
    });
    var createNew = document.getElementById("createFlightBtn");

    $('#createFlightBtn').on('click', function() {
        $('#createModal').css("display", "block");
    });

    $('.btn-close').on('click', function(){
        $('#editModal').css("display", "none");
        $('#createModal').css("display", "none");

    });

    $('#btn-create-close').on('click', function(){
        $('#createModal').css("display", "none");
    })

    socket.on('flight-changed', function(data) {
        UpdateRowData(data._id, data)
    });
});
module.exports = {
    data
  };