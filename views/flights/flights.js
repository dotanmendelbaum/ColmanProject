var socket = io()
//const twitterUtil = require('../../twitterApi');

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
function getFlightData(flightId){
    const row = $("#flight-" + flightId);
    const data = {
        flightNumber: row.find(".flight-number").text(),
        flightDate: row.find(".flight-date").text(),
        hour: row.find(".flight-hour").text(),
        Gate: row.find(".flight-gate").text(),
        Destination: row.find(".flight-destination").text(),
        Origin:row.find(".flight-origin").text(),
        flightPrice:row.find(".flight-price").text(),
        ArrivingDate:row.find(".flight-arriving-date").text(),
        NumberOfSeats:row.find(".flight-number-of-seats").text(),
        ArrivingHour:row.find(".flight-arriving-hour").text()
    }
    return data
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
                //twitterUtil.tweet(data)
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
            $('#eArrivingDate').val(new Date($(this).data('arrivingdate')).toISOString().substr(0, 10));
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
        $('#orderModal').css("display", "none");

    });

    $('#flightList').on('click', '.orderFlight', function() {
        console.log("order")
        const row = $("#flight-" + $(this).data('flightid'));
        var flight = getFlightData($(this).data('flightid'))
        console.log("number:" , flight.flightNumber)
        $('#orderModal').css("display", "block");
        $('#oflightID').val($(this).data('flightid'));
        $('#oflightNumber').val(flight.flightNumber);
        $('#oflightDate').val(new Date(flight.flightDate).toISOString().substr(0, 10));
        $('#ohour').val(flight.hour);
        $('#oGate').val(flight.Gate);
        $('#oDestination').val(flight.Destination);
        $('#oOrigin').val(flight.Origin);
        $('#oflightPrice').val(flight.flightPrice);
        $('#oArrivingDate').val(new Date(flight.ArrivingDate).toISOString().substr(0, 10));
        $('#oNumberOfSeats').val(flight.NumberOfSeats);
        $('#oArrivingHour').val(flight.ArrivingHour);
    })

    $('#order_flight_form').on('submit', function(event) {
        event.preventDefault(); // prevent default form submission behavior
        const fData = {
            flightID: $('#oflightID').val(),
            flightNumber: $('#oflightNumber').val(),
            flightDate: $('#oflightDate').val(),
            hour: $('#ohour').val(),
            Gate: $('#oGate').val(),
            Destination: $('#oDestination').val(),
            Origin: $('#oOrigin').val(),
            flightPrice: $('#oflightPrice').val(),
            ArrivingDate: $('#oArrivingDate').val(),
            NumberOfSeats: $('#oNumberOfSeats').val(),
            ArrivingHour: $('#oArrivingHour').val()
        }
        const pData = {
            cardName: $('#cardName').val(),
            cardNumber: $('#cardNumber').val(),
            expiryDate: $('#expiryDate').val(),
            cvv: $('#cvv').val()
        }
        var dataInfo = {
            flightID: $('#oflightID').val(),
            flightNumber: $('#oflightNumber').val(),
            flightDate: $('#oflightDate').val(),
            hour: $('#ohour').val(),
            Gate: $('#oGate').val(),
            Destination: $('#oDestination').val(),
            Origin: $('#oOrigin').val(),
            flightPrice: $('#oflightPrice').val(),
            ArrivingDate: $('#oArrivingDate').val(),
            NumberOfSeats: $('#oNumberOfSeats').val(),
            ArrivingHour: $('#oArrivingHour').val(),
            cardName: $('#cardName').val(),
            cardNumber: $('#cardNumber').val(),
            expiryDate: $('#expiryDate').val(),
            cvv: $('#cvv').val()
        };
        console.log(dataInfo)
        $.ajax({
            type: 'POST',
            url: '/flights/book',
            data: dataInfo,
            dataType: 'json',
            encode: true
        })
            .done(function(data) {
                console.log("good")
                $('#orderModal').css("display", "none");
               //window.location = '/orders'
            })
            .fail(function(data) {
                console.log("error ordering flight")
                //$('#result').text('Error creating flight: ' + data.responseText);
            });
    });


    $('#btn-create-close').on('click', function(){
        $('#createModal').css("display", "none");
    })

    socket.on('flight-changed', function(data) {
        UpdateRowData(data._id, data)
    });
});

(function() {
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var canvas = document.getElementById("sig-canvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 4;

    var drawing = false;
    var mousePos = {
        x: 0,
        y: 0
    };
    var lastPos = mousePos;

    canvas.addEventListener("mousedown", function(e) {
        drawing = true;
        lastPos = getMousePos(canvas, e);
    }, false);

    canvas.addEventListener("mouseup", function(e) {
        drawing = false;
    }, false);

    canvas.addEventListener("mousemove", function(e) {
        mousePos = getMousePos(canvas, e);
    }, false);

    // Add touch event support for mobile
    canvas.addEventListener("touchstart", function(e) {

    }, false);

    canvas.addEventListener("touchmove", function(e) {
        var touch = e.touches[0];
        var me = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
    }, false);

    canvas.addEventListener("touchstart", function(e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var me = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
    }, false);

    canvas.addEventListener("touchend", function(e) {
        var me = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(me);
    }, false);

    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        }
    }

    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        }
    }

    function renderCanvas() {
        if (drawing) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
    }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function(e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchend", function(e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchmove", function(e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

    (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
    })();

    function clearCanvas() {
        canvas.width = canvas.width;
    }

    // Set up the UI
    var sigText = document.getElementById("sig-dataUrl");
    var sigImage = document.getElementById("sig-image");
    var clearBtn = document.getElementById("sig-clearBtn");
    var submitBtn = document.getElementById("sig-submitBtn");
    clearBtn.addEventListener("click", function(e) {
        clearCanvas();
        sigText.innerHTML = "Data URL for your signature will go here!";
        sigImage.setAttribute("src", "");
    }, false);
    submitBtn.addEventListener("click", function(e) {
        var dataUrl = canvas.toDataURL();
        sigText.innerHTML = dataUrl;
        sigImage.setAttribute("src", dataUrl);
    }, false);

})();
module.exports = {
    data
  };