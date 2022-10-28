const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotal()
   }
});

select.addEventListener('change', function (e) {
    calculateTotal();
});

function calculateTotal() {
    const selcectedSeats = container.querySelectorAll('.seat.selected');

    const selcectedSeatsArr = [];
    const seatsArr = [];

    selcectedSeats.forEach(function (seat) {
        selcectedSeatsArr.push(seat);
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

    let selcectedSeatIndexs = selcectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    
    let selcectedSeatCount = selcectedSeats.length;
    count.innerText = selcectedSeatCount;
    amount.innerText = selcectedSeatCount * select.value;

    saveToLocalStorage(selcectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}