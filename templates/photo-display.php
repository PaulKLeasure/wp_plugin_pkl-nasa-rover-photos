<div class="container">
    <form id="rover-form">
        <select id="rover-select" class="form-select">
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
        </select>
        <input type="date" id="date-picker" class="form-control">
        <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <div id="photo-container"></div>
    <div id="pagination-controls">
      <button id="prev-button">Previous</button>
      <span id="page-info">Page <span id="current-page"></span> of <span id="total-pages"></span></span>
      <button id="next-button">Next</button>
    </div>
</div>
