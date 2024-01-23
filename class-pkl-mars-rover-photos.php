<?php

class Mars_Rover_Photos {

    public function run() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        // Register AJAX handlers for logged-in and non-logged-in users
        add_action('wp_ajax_fetch_rover_photos', array($this, 'handle_ajax_request'));
        add_action('wp_ajax_nopriv_fetch_rover_photos', array($this, 'handle_ajax_request'));
        add_shortcode('mars_rover_photos', array($this, 'display_rover_photos'));
    }

    public function enqueue_scripts() {
        wp_enqueue_style('bootstrap', plugin_dir_url(__FILE__) . 'css/bootstrap.min.css');
        wp_enqueue_script('bootstrap', plugin_dir_url(__FILE__) . 'js/bootstrap.bundle.min.js', array('jquery'), null, true);
        //wp_enqueue_script('custom-script', plugin_dir_url(__FILE__) . 'js/custom-script.js', array('jquery'), null, true);
        wp_enqueue_script('fetch-mars-rovers', plugin_dir_url(__FILE__) . 'js/fetch-mars-rovers.js', array('jquery'), null, true);
        
        $options = get_option('pkl_mars_rover_photos_settings');
        $api_key = $options['api_key'] ?? '';

        wp_localize_script('fetch-mars-rovers', 'pklMarsRoverPhotos', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'api_key' => $api_key,
        ));
    }

    public function display_rover_photos() {
        ob_start();
        include 'templates/photo-display.php';
        return ob_get_clean();
    }

    public function fetch_photos_from_nasa($rover, $date = "02/18/2021") {
        $api_key = 'ZfmINDjBqhdH2tNMgqPbYzjE8YIAZf0btHobVTCR';
        $url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

        $response = wp_remote_get(add_query_arg(array(
            'earth_date' => $date,
            'api_key' => $api_key
        ), $url));

        if (is_wp_error($response)) {
            return array('error' => $response->get_error_message());
        }

        $body = wp_remote_retrieve_body($response);
        return json_decode($body, true);
    }

    public function handle_ajax_request() {
        check_ajax_referer('mars_rover_photos_nonce', 'nonce');
    
        $rover = sanitize_text_field($_POST['rover']);
        $date = sanitize_text_field($_POST['date']);
    
        $photos = $this->fetch_photos_from_nasa($rover, $date);
    
        // Process and return the photos data to the client
        wp_send_json($photos);
    }
    
    // Other necessary methods, like AJAX handlers, API calls, etc.
}
