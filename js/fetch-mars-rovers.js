jQuery(document).ready(function($) {
  let allPhotos = [];
  let currentPage = 1;
  const photosPerPage = 10; 
  const roverCameras = {
    curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
    opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]
  };
  // Feth Mars Rover Photos from NASA's API
  $('#rover-form').submit(function (event) {
      event.preventDefault();
      const apiKey = pklMarsRoverPhotos.api_key;
      const rover = $('select#rover-select').val();
      const camera = $('#camera-select').val();
      const earthDate = $('#date-picker').val();
      //const apiKey = 'ZfmINDjBqhdH2tNMgqPbYzjE8YIAZf0btHobVTCR';
      console.log("ROVER::", rover);
      const marsRoverPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;
      // Fetch data from NASA API 
      $.ajax({
          url: marsRoverPhotosUrl,
          type: 'GET',
          data: {
              action: 'fetch_rover_photos',
              api_key: apiKey,
              earth_date: earthDate,
              camera: camera
          },
          success: function(response) {
              console.log("RESPONSE: ", response);
              allPhotos = response.photos; // Store all photos
              displayPhotos(); // Display the first page of photos
          }
      });
    });

  
  function displayPhotos() {
      const startIndex = (currentPage - 1) * photosPerPage;
      const endIndex = startIndex + photosPerPage;
      const photosToShow = allPhotos.slice(startIndex, endIndex);
  
      $('#photo-container').empty();
      photosToShow.forEach(function(photo) {
          // Append each photo to the container
          $('#photo-container').append('<img src="' + photo.img_src + '" alt="Mars Photo">');
      });
  
      updatePaginationControls();
  }
  
  function updatePaginationControls() {
      // Update pagination controls based on currentPage and total number of pages
      const totalPages = Math.ceil(allPhotos.length / photosPerPage);
      $('#current-page').text(currentPage);
      $('#total-pages').text(totalPages);
      // Enable/disable next/prev buttons as necessary
      $('#prev-button').prop('disabled', currentPage === 1);
      $('#next-button').prop('disabled', currentPage === totalPages);
  }
  
    // Event listeners for pagination controls
    $('#next-button').on('click', function() {
        if (currentPage * photosPerPage < allPhotos.length) {
            currentPage++;
            displayPhotos();
        }
    });
    
    $('#prev-button').on('click', function() {
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
            cameras.forEach(camera => {
                cameraSelect.append($('<option></option>').val(camera).text(camera));
            });
            cameraSelect.prop('disabled', false);
        } else {
            cameraSelect.prop('disabled', true);
        }
    }
    
    $('#rover-select').on('change', function() {
        const selectedRover = $(this).val();
        updateCameraSelection(selectedRover);
    });

  
});// ------------_END_------------------