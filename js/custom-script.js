


jQuery(document).ready(function($) {

  $('#rover-form').submit(function(event, page = 1) {
      event.preventDefault();
      const currentPage = page;
      const rover = $('#rover-select').val();
      const date = $('#date-picker').val();
      const marsRoverPhotos_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?page=${page}`;
      const api_key = 'ZfmINDjBqhdH2tNMgqPbYzjE8YIAZf0btHobVTCR';

      $.ajax({
          url: marsRoverPhotos_url,
          type: 'GET',
          data: {
              action: 'fetch_rover_photos',
              rover: rover,
              earth_date: date,
              api_key: api_key,
              page: page
          },
          success: function(response) {
              console.log("NASA RESP: ", response);
              output = "<ul>";
              const photoData = response;
              photoData.photos.forEach((data, idx) => {
                console.log("photoData", data.earth_date, data.camera);
                output += `<li class="rover-data"><img class="rover-img" src="${data.img_src}" alt="${data.earth_date} ${data.camera.full_name}" /></li>`;
              });
              $('div#photo-container').html(output);
          }
      });
  });

let currentPage = 1;

function fetchRoverPhotos(page = 1) {
    currentPage = page;
    var rover = $('#rover-select').val();
    var date = $('#date-picker').val();
    const marsRoverPhotos_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;
    const api_key = 'ZfmINDjBqhdH2tNMgqPbYzjE8YIAZf0btHobVTCR';

    $.ajax({
        url: marsRoverPhotos.ajax_url,
        type: 'POST',
        data: {
            action: 'fetch_rover_photos',
            rover: rover,
            earth_date: date,
            page: page,
            api_key: api_key
            // ... other data ...
        },
        success: function(response) {
            $('#photo-container').html(response.photos); // Update with response data
            updatePaginationControls(response.page, response.total_pages); // Assume these are part of the response
        }
    });
}

// Call this function on initial load and on pagination control clicks
fetchRoverPhotos();

function updatePaginationControls(currentPage, totalPages) {
    // Update your pagination controls based on currentPage and totalPages
    // This could involve showing/hiding next/prev buttons, updating page numbers, etc.
}

// Event listeners for your pagination controls
$('#next-button').on('click', function() {
    if (currentPage < totalPages) {
        fetchRoverPhotos(currentPage + 1);
    }
});

$('#prev-button').on('click', function() {
    if (currentPage > 1) {
        fetchRoverPhotos(currentPage - 1);
    }
});





});
