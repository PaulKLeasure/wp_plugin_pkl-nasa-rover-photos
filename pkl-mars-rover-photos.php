<?php
/**
 * Plugin Name: PKL Mars Rover Photos
 * Description: Browse images from NASA's Mars Rovers.
 * Version: 1.0
 * Author: Your Name
 */

if (!defined('WPINC')) {
    die;
}

add_action('admin_menu', 'pkl_mars_rover_photos_add_admin_menu');

function pkl_mars_rover_photos_add_admin_menu() {
    add_menu_page(
        'PKL Mars Rover Photos Settings', 
        'PKL MArs Rover Photos', 
        'manage_options', 
        'pkl_mars_rover_photos', 
        'pkl_mars_rover_photos_settings_page'
    );
}

function pkl_mars_rover_photos_settings_page() {
    ?>
    <div class="wrap">
        <h2>PKL Mars Photos Settings</h2>
        <form action="options.php" method="post">
            <?php
            settings_fields('pkl_mars_rover_photos_options');
            do_settings_sections('pkl_mars_rover_photos');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

add_action('admin_init', 'pkl_mars_rover_photos_settings_init');

function pkl_mars_rover_photos_settings_init() {
    register_setting('pkl_mars_rover_photos_options', 'pkl_mars_rover_photos_settings');

    add_settings_section(
        'pkl_mars_rover_photos_section',
        'API Key Settings',
        'pkl_mars_rover_photos_section_callback',
        'pkl_mars_rover_photos'
    );

    add_settings_field(
        'pkl_mars_rover_photos_api_key', 
        'API Key', 
        'pkl_mars_rover_photos_api_key_render', 
        'pkl_mars_rover_photos', 
        'pkl_mars_rover_photos_section'
    );
}

function pkl_mars_rover_photos_section_callback() {
    echo 'Enter your API Key below.';
}

function pkl_mars_rover_photos_api_key_render() {
    $options = get_option('pkl_mars_rover_photos_settings');
    ?>
    <input type='text' name='pkl_mars_rover_photos_settings[api_key]' value='<?php echo $options['api_key']; ?>'>
    <?php
}


require_once plugin_dir_path(__FILE__) . 'class-pkl-mars-rover-photos.php';

function run_mars_rover_photos() {
    $plugin = new Mars_Rover_Photos();
    $plugin->run();
}

run_mars_rover_photos();
