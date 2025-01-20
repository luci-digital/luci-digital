<?php
/**
 * The template to display Admin notices
 *
 * @package ANN
 * @since ANN 1.0.1
 */

$ann_theme_slug = get_template();
$ann_theme_obj  = wp_get_theme( $ann_theme_slug );

?>
<div class="ann_admin_notice ann_rate_notice notice notice-info is-dismissible" data-notice="rate">
	<?php
	// Theme image
	$ann_theme_img = ann_get_file_url( 'screenshot.jpg' );
	if ( '' != $ann_theme_img ) {
		?>
		<div class="ann_notice_image"><img src="<?php echo esc_url( $ann_theme_img ); ?>" alt="<?php esc_attr_e( 'Theme screenshot', 'ann' ); ?>"></div>
		<?php
	}

	// Title
	$ann_theme_name = '"' . $ann_theme_obj->get( 'Name' ) . ( ANN_THEME_FREE ? ' ' . __( 'Free', 'ann' ) : '' ) . '"';
	?>
	<h3 class="ann_notice_title"><a href="<?php echo esc_url( ann_storage_get( 'theme_rate_url' ) ); ?>" target="_blank">
		<?php
		echo esc_html(
			sprintf(
				// Translators: Add theme name to the 'Welcome' message
				__( 'Help Us Grow - Rate %s Today!', 'ann' ),
				$ann_theme_name
			)
		);
		?>
	</a></h3>
	<?php

	// Description
	?>
	<div class="ann_notice_text">
		<p><?php
			// Translators: Add theme name to the 'Welcome' message
			echo wp_kses_data( sprintf( __( "Thank you for choosing the %s theme for your website! We're excited to see how you've customized your site, and we hope you've enjoyed working with our theme.", 'ann' ), $ann_theme_name ) );
		?></p>
		<p><?php
			// Translators: Add theme name to the 'Welcome' message
			echo wp_kses_data( sprintf( __( "Your feedback really matters to us! If you've had a positive experience, we'd love for you to take a moment to rate %s and share your thoughts on the customer service you received.", 'ann' ), $ann_theme_name ) );
		?></p>
	</div>
	<?php

	// Buttons
	?>
	<div class="ann_notice_buttons">
		<?php
		// Link to the theme download page
		?>
		<a href="<?php echo esc_url( ann_storage_get( 'theme_rate_url' ) ); ?>" class="button button-primary" target="_blank"><i class="dashicons dashicons-star-filled"></i> 
			<?php
			// Translators: Add the theme name to the button caption
			echo esc_html( sprintf( __( 'Rate %s Now', 'ann' ), $ann_theme_name ) );
			?>
		</a>
		<?php
		// Link to the theme support
		?>
		<a href="<?php echo esc_url( ann_storage_get( 'theme_support_url' ) ); ?>" class="button" target="_blank"><i class="dashicons dashicons-sos"></i> 
			<?php
			esc_html_e( 'Support', 'ann' );
			?>
		</a>
		<?php
		// Link to the theme documentation
		?>
		<a href="<?php echo esc_url( ann_storage_get( 'theme_doc_url' ) ); ?>" class="button" target="_blank"><i class="dashicons dashicons-book"></i> 
			<?php
			esc_html_e( 'Documentation', 'ann' );
			?>
		</a>
	</div>
</div>
