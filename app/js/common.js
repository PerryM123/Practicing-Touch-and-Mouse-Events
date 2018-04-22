dragPractice();
		left_right_practice();
		imageDraggingPractice();
		MOBILEimageDraggingPractice();
		

		function dragPractice() {
			let $image_space = $(".image-space");
			let $the_image = $(".image-space img");

			$image_space.on( "dragover", (e) => {
				e.preventDefault();
			});

			$the_image.on( "drag", (e) => {
				e.preventDefault();
			});

			$image_space.on( "drop", (e) => {
				e.target.append($the_image[0]);	
			});
		}
		function left_right_practice() {
			let $left_button = $('.direction-button--left');
			let $right_button = $('.direction-button--right');
			let image_position = 0;
			let $image_container = $('.image-container');
			let image_amounts = $('.image-container .image-box').length;
			let image_loc = 0;

			$left_button.on('click', (e) => {
				image_loc += 185;
				$image_container.css('transform', 'translate3d(' + image_loc +'px, 0, 0)');
				image_position--;
			});
			$right_button.on('click', (e) => {
				image_loc -= 185;
				$image_container.css('transform', 'translate3d(' + image_loc +'px, 0, 0)');
				 image_position++;
			});
			$image_container.on('mouseover');
		}
		function imageDraggingPractice() {
			let mousedown = false;
			let $image_container = $('.image-container');
			let $mouseUPDOWNLEFTRIGHT = $('.mouseUPDOWNLEFTRIGHT');
			let container_position = 0;
			let old_position = 0;
			let startpoint = 0;
			let endpoint = 0;
			let difference = 0;
			let prevDifference = 0;
			let prevX = 0;
			let container_width = -($('.image-container').width());
			let windowWidth = $(window).width();

			$(window).on('resize', function() {
				windowWidth = $(window).width();
				console.log('width: ' + windowWidth);
				prevDifference = 0;
			});

			console.log("container_width: " + container_width);
			console.log("windowWidth: " + windowWidth);
			console.log("container_width + windowWidth: " + (container_width + windowWidth));

			$mouseUPDOWNLEFTRIGHT.on('mousedown', function(e) {
				startpoint = e.pageX;
				mousedown = true;
				prevX = e.pageX;
				console.log('mousedown: startpoint: ' + startpoint);
				}).on('mouseup', function(e) {

				console.log('prevDifference: ' + prevDifference);
				mousedown = false;
				endpoint = e.pageX;
				
					if (prevDifference >= 0) {
						$image_container.css('transform', 'translate3d(0px, 0, 0)');
						prevDifference = 0;
					}
					if (prevDifference <= (container_width + windowWidth)) {
						$image_container.css('transform', 'translate3d(' + (container_width + windowWidth) + 'px, 0, 0)');
							prevDifference = container_width + windowWidth;
							console.log('whoa2');
					}
				}).on('mousemove', function(e) {
					if (mousedown === true) {
						difference = e.pageX - prevX;
						prevDifference += difference;
						console.log('mouseup: endpoint: ' + endpoint);
						console.log('difference: ' + difference);
						console.log('============================');
						$image_container.css('transform', 'translate3d(' + prevDifference +'px, 0, 0)');
						prevX = e.pageX;
					}
				});
		}

		function MOBILEimageDraggingPractice() {
			let mousedown = false;
			let $image_container = $('.image-container');
			let $mouseUPDOWNLEFTRIGHT = $('.mouseUPDOWNLEFTRIGHT');
			let container_position = 0;
			let old_position = 0;
			let startpoint = 0;
			let endpoint = 0;
			let difference = 0;
			let prevDifference = 0;
			let $xValue = $('.x-value');
			let $startValue = $('.start-value');
			let $diffValue = $('.diff-value');
			let prevX = 0;
			let container_width = -($('.image-container').width());
			let windowWidth = $(window).width();

			$(window).on('resize', function() {
				windowWidth = $(window).width();
				console.log('width: ' + windowWidth);
				prevDifference = 0;
			});

			console.log("MOBILE: container_width: " + container_width);
			console.log("MOBILE: windowWidth: " + windowWidth);
			console.log("MOBILE: container_width + windowWidth: " + (container_width + windowWidth));

			$mouseUPDOWNLEFTRIGHT.on('touchstart', function(e) {
				e.preventDefault();
				startpoint = e.changedTouches[0].pageX;
				mousedown = true;
				prevX = e.changedTouches[0].pageX;
				console.log('MOBILE: mousedown: startpoint: ' + startpoint);
				}).on('touchend', function(e) {
					e.preventDefault();

				console.log('MOBILE: prevDifference: ' + prevDifference);
				mousedown = false;
				endpoint = e.changedTouches[0].pageX;
				
					if (prevDifference >= 0) {
						$image_container.css('transform', 'translate3d(0px, 0, 0)');
						prevDifference = 0;
					}
					if (prevDifference <= (container_width + windowWidth)) {
						$image_container.css('transform', 'translate3d(' + (container_width + windowWidth) + 'px, 0, 0)');
							prevDifference = container_width + windowWidth;
							console.log('whoa2');
					}
				}).on('touchmove', function(e) {
					e.preventDefault();
					if (mousedown === true) {
						difference = e.changedTouches[0].pageX - prevX;
						prevDifference += difference;
						console.log('MOBILE: mouseup: endpoint: ' + endpoint);
						console.log('MOBILE: difference: ' + difference);
						console.log('MOBILE: ============================');
						$image_container.css('transform', 'translate3d(' + prevDifference +'px, 0, 0)');
						prevX = e.changedTouches[0].pageX;
					}
				});
		}