<div class="container">
  <h3>NASA Mars Rover Photos</h3>
  <form id="rover-form" class="mb-4">
    <select id="rover-select" class="form-select mb-2">
      <option value="false">Select a Mars rover</option>
      <option value="curiosity">Curiosity</option>
      <option value="opportunity">Opportunity</option>
      <option value="spirit">Spirit</option>
    </select>
    <select id="camera-select" class="form-select mb-2" disabled>
      <option value="">Select a Camera</option>
      <!-- Camera options will be added dynamically -->
    </select>
    <div id="date-range-info" class="mb-2"></div>
    <label for="date-slider" class="form-label">Select Date:</label>
    <input type="range" id="date-slider" class="form-range" min="0" max="100" value="0">
    <div id="selected-date" class="mb-2">Selected Date: <span></span></div>
    <button type="submit" class="btn btn-primary">Search</button>
  </form>

  <h2 id="rover-name"></h2>
  <h4 id="camera-name"></h4>


  <nav aria-label="rover-photos-navigation">
    <ul class="pagination">
      <li id="prev-button" class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item page-of-pages">
        <a class="page-link" href="#"><span id="current-page"></span> of <span id="total-pages"></span></a>
      </li>
      <li id="next-button" class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>

  <div id="photo-container" class="row"></div>

</div>

<!-- Modal -->
<div class="modal fade" id="photoModal" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body">
        <img src="" alt="Full-size photo" class="modal-photo">
      </div>
    </div>
  </div>
</div>