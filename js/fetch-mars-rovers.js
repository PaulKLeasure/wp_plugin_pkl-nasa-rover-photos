jQuery(document).ready(function ($) {
  let allPhotos = [];
  let currentPage = 1;
  const photosPerPage = 3;
  $('li#prev-button').hide();
  $('li#page-info').hide();
  $('li.page-of-pages').hide();
  $('span#current-page').hide();
  $('span#total-pages').hide();
  $('li#next-button').hide();
  const roverCameras = {
    curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
    opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
    spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
  };

  // Feth Mars Rover Photos from NASA's API
  $('#rover-form').submit(function (event) {
    event.preventDefault();
    const apiKey = pklMarsRoverPhotos.api_key;
    const rover = $('select#rover-select').val();
    const camera = $('#camera-select').val();
    //const earthDate = $('#date-picker').val();
    const earthDate = $('#selected-date span').text();
    console.log('SELECTED earthDate:', earthDate);
    console.log('ROVER::', rover);
    const marsRoverPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;
    // Fetch data from NASA API
    $.ajax({
      url: marsRoverPhotosUrl,
      type: 'GET',
      data: {
        action: 'fetch_rover_photos',
        api_key: apiKey,
        earth_date: earthDate,
        camera: camera,
      },
      success: function (response) {
        console.log('$.ajax-->RESPONSE:: ', response);
        allPhotos = response.photos; // Store all photos
        console.log('$.ajax-->allPhotos:: ', allPhotos);
        displayPhotos(); // Display the first page of photos
      },
      error: function (request, status, error) {
        alert(request.responseText);
      },
    });
  });

  // Logic to determine date range per rover
  const roverMissionDates = {
    curiosity: {
      landing_date: '2012-08-06',
      max_date: '2024-01-22',
    },
    opportunity: {
      landing_date: '2004-01-25',
      max_date: '2018-06-11',
    },
    spirit: {
      landing_date: '2004-01-04',
      max_date: '2010-03-22',
    },
  };

  function updateDateRangeDisplay(rover) {
    const dates = roverMissionDates[rover];
    if (dates) {
      const startDate = new Date(dates.landing_date);
      const endDate = new Date(dates.max_date);
      const totalDays = Math.round(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );
      $('#date-slider').attr('min', 0).attr('max', totalDays).val(0);
      updateSelectedDate(startDate);
    }
  }

  $('#date-slider').on('input', function () {
    const rover = $('#rover-select').val();
    const startDate = new Date(roverMissionDates[rover].landing_date);
    const selectedDay = parseInt($(this).val(), 10);
    const selectedDate = new Date(startDate);
    selectedDate.setDate(selectedDate.getDate() + selectedDay);
    updateSelectedDate(selectedDate);
  });

  function updateSelectedDate(date) {
    $('#selected-date span').text(formatDate(date));
  }

  function formatDate(date) {
    return date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
  }

  $('#rover-select').on('change', function () {
    const selectedRover = $(this).val();
    updateDateRangeDisplay(selectedRover);
  });

  function displayPhotos() {
    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    const photosToShow = allPhotos.slice(startIndex, endIndex);
    console.log('displayPhotos()::allPhotos: ', allPhotos);
    console.log('displayPhotos()::photosToShow: ', photosToShow);
    let photoHtml = `
      <div class="col-6 col-md-4 col-lg-3 photo-item">
          <p> NO PHOTOS </p>
      </div>`;
    $('#photo-container').empty();
    if (photosToShow.length > 0) {
      photosToShow.forEach((photo) => {
        photoHtml = `
              <div class="col-6 col-md-4 col-lg-3 photo-item">
                  <img src="${photo.img_src}" alt="Mars Photo">
              </div>`;
        $('#photo-container').append(photoHtml);
      });
      updatePaginationControls();
    } else {
      $('#photo-container').append(photoHtml);
      $('li.page-of-pages').hide();
      $('span#current-page').hide();
      $('span#total-pages').hide();
    }
    updatePaginationControls();
  }

  function updatePaginationControls() {
    // Update pagination controls based on currentPage and total number of pages
    const totalPages = Math.ceil(allPhotos.length / photosPerPage);
    console.log('totalPages::', totalPages);
    if (totalPages > 1) {
      //$("#pagination-controls").show();
      $('li#prev-button').show();
      $('li#page-info').show();
      $('li.page-of-pages').show();
      $('span#current-page').text(currentPage).show();
      $('span#total-pages').text(totalPages).show();
      $('li#next-button').show();
    }

    // Enable/disable next/prev buttons as necessary
    if (currentPage === 1 || totalPages < 1) {
      $('li#prev-button').hide();
    }
    if (currentPage === totalPages || totalPages < 1) {
      $('li#next-button').hide();
    }
  }

  // Event listeners for pagination controls
  $('#next-button').on('click', function () {
    if (currentPage * photosPerPage < allPhotos.length) {
      currentPage++;
      displayPhotos();
    }
  });

  $('#prev-button').on('click', function () {
    if (currentPage > 1) {
      currentPage--;
      displayPhotos();
    }
  });

  // Rover camera selection logic
  function updateCameraSelection(rover) {
    const cameras = roverCameras[rover];
    const cameraSelect = $('#camera-select');
    cameraSelect.empty().append('<option value="">Select a Camera</option>');

    if (cameras) {
      cameras.forEach((camera) => {
        cameraSelect.append($('<option></option>').val(camera).text(camera));
      });
      cameraSelect.prop('disabled', false);
    } else {
      cameraSelect.prop('disabled', true);
    }
  }

  $('#rover-select').on('change', function () {
    const selectedRover = $(this).val();
    updateCameraSelection(selectedRover);
  });

  $('#photo-container').on('click', '.photo-item img', function () {
    var src = $(this).attr('src');
    $('#photoModal .modal-photo').attr('src', src);
    $('#photoModal').modal('show');
  });
});
