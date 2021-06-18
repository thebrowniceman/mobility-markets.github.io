var chartColors = {
			red: 'rgb(255, 99, 132)',
			purple: 'rgb(153, 102, 255)',
			green: 'rgb(75, 192, 192)',
			orange: 'rgb(255, 159, 64)',
			blue: 'rgb(54, 162, 235)'
		};

		var color = Chart.helpers.color;
		var config = {
			type: 'line',
			data: {
				datasets: [{
					backgroundColor: 'transparent',
					borderColor: chartColors.red,
					pointBackgroundColor: chartColors.red,
					tension: 0,
					fill: false
				},{
					backgroundColor: 'transparent',
					borderColor: chartColors.blue,
					pointBackgroundColor: chartColors.blue,
					tension: 0,
					fill: false
				},{
					backgroundColor: 'transparent',
					borderColor: chartColors.purple,
					pointBackgroundColor: chartColors.purple,
					tension: 0,
					fill: false
				},{
					backgroundColor: 'transparent',
					borderColor: chartColors.green,
					pointBackgroundColor: chartColors.green,
					tension: 0,
					fill: false
				},{
					backgroundColor: 'transparent',
					borderColor: chartColors.blue,
					pointBackgroundColor: chartColors.blue,
					tension: 0,
					fill: false
				}]
			},
			plugins: [ChartDataSource],
			options: {
				title: {
					display: true,
					text: 'D Segment xEV sales for Tesla'
				},
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						id: 'temperature',
						gridLines: {
							drawOnChartArea: false
						},
						scaleLabel: {
							display: true,
							labelString: 'Sales by Segment'
						}
					}]
				},
				plugins: {
					datasource: {
						type: 'sheet',
						url: 'https://mobility-markets.com/Dataset/Segment/dataset_dsegment_tesla.xlsx',
						rowMapping: 'dataset',
						datasetLabels: 'Sheet1!A2:A6',
						indexLabels: 'Sheet1!B1:M1',
						data: 'Sheet1!B2:M6'
					}
				}
			}
		};

		window.onload = function() {
			var ctx = document.getElementById('myChart').getContext('2d');
			window.myChart = new Chart(ctx, config);
		};
