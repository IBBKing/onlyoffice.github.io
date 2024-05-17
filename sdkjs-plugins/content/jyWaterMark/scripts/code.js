/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function (window, undefined) {

	try {
		var fileUrl = "https://gw-dev.jianyiqifu.com/jy-comp/pws/demonstration/upload/file_to_img";
		var waterTypeVal = '1'
		var fontSizeVal = '18'
		var marginXVal = ''
		var marginYVal = ''
		var markAngleVal = ''
		var opacityVal = ''
		var patternTypeVal = '0'
		var waterTextVal = ''
		var waterImageFile = ''
		var isAddWaterMask = true
		var file = ''

		window.Asc.plugin.init = function () {
			$('input[name="style"]').on('change', function () {
				var selectedValue = $('input[name="style"]:checked').val(); // 获取选中的单选框的值
				waterTypeVal = selectedValue
				if (selectedValue === '1') {
					$('#waterPic').hide()
				} else {
					$('#waterPic').show()
				}
				// 在这里可以执行其他操作，根据需要进行相应的处理
			});

			$('input[name="layout"]').on('change', function () {
				var selectedValue = $('input[name="layout"]:checked').val(); // 获取选中的单选框的值
				patternTypeVal = selectedValue
				// 在这里可以执行其他操作，根据需要进行相应的处理
			});

			$('#uploadFile').click(function () {
				$('#waterFile').click()
				$('#waterFile').on('change', function (event) {
					var files = $(this).prop('files'); // 获取文件列表
					file = files[0]; // 获取第一个文件对象
					console.log(file); // 输出文件对象
					$('#fileNamId').text(file.name)
					// 创建 FormData 对象
					// 将文件对象添加到 FormData 中
				});
			})
			$('#uploadImage').click(function () {
				$('#waterImage').click()
				$('#waterImage').on('change', function (event) {
					var files = $(this).prop('files'); // 获取文件列表
					waterImageFile = files[0]; // 获取第一个文件对象
					$('#waterImageId').text(waterImageFile.name)
					// 创建 FormData 对象
					// 将文件对象添加到 FormData 中
				});
			})
			$('#fileAddWaterMask').on('change', function () {
				if ($(this).is(':checked')) {
					console.log('复选框被选中了');
					// 如果复选框被选中，执行相应的操作
					isAddWaterMask = true
				} else {
					console.log('复选框被取消选中了');
					// 如果复选框被取消选中，执行相应的操作
					isAddWaterMask = false
				}
			});
			fontSizeVal = $('#fontsize-select').val()
			marginXVal = $('#leftMargin').val()
			marginYVal = $('#topMargin').val()
			opacityVal = $('#transparency').val()
			markAngleVal = $('#rotate').val()
			waterTextVal = $('#waterTextValue').val()
			console.log($('#waterTextValue').val(), 83);
		};

		window.Asc.plugin.button = function (id) {
			if (id === 0) {
				var formData = new FormData();
				formData.append('file', file);
				if (isAddWaterMask) {
					formData.append('waterType', waterTypeVal);
					formData.append('fontSize', $('#fontsize-select').val());
					// formData.append('marginX', $('#leftMargin').val());
					// formData.append('marginY', $('#topMargin').val());
					formData.append('markAngle', $('#rotate').val());
					formData.append('opacity', $('#transparency').val());
					formData.append('patternType', patternTypeVal);
					formData.append('waterText', $('#waterTextValue').val());
					formData.append('waterImg', waterImageFile);
					formData.append('colorCode', '#999999');
				}
				console.log(formData, 119);
				$.ajax({
					url: fileUrl, // 上传的服务器端 URL
					type: 'POST',
					data: formData,
					processData: false, // 告诉 jQuery 不要处理数据
					contentType: false, // 告诉 jQuery 不要设置 Content-Type
					success: function (res) {
						// 上传成功的处理逻辑
						if (res.code === 0) {
							console.log('上传成功:', res);
							var _param = {
								"data": "{data}",
								"imgSrc": res.data[0].url,
								"guid": "asc.{EA65DDE7-E22F-6C22-53BF-0732158EF3C4}",
								"width": 150,
								"height": 200,
								"widthPix": 60 * 36000,
								"heightPix": 60 * 36000
							};
							window.Asc.plugin.executeMethod("AddOleObject", [_param], function () {
								window.Asc.plugin.executeCommand("close", "");
							});
						}
					},
					error: function (xhr, status, error) {
						// 上传失败的处理逻辑
						console.error('上传失败:', error);
					}
				});
				
			} else {
				this.executeCommand("close", "");
			}
		};

		window.Asc.plugin.onTranslate = function () {

		};
	} catch (error) {
		console.log("Some problem");
	}


})(window, undefined);
