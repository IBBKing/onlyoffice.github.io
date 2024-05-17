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

	var flagInit = false;
	var fBtnGetAll = false;
	var fClickLabel = false;
	var fClickBtnCur = false;

	window.Mark = function () {
		return window.Add('${DynamicTable}');
	};
	var that;
	window.Asc.plugin.init = function (text) {

		//event "init" for plugin
		// document.getElementById("divS").innerHTML = text.replace(/\n/g, "<br>");

		// document.getElementById("buttonIDPaste").onclick = function () {
		// 	//method for paste text into document
		// 	window.Asc.plugin.executeMethod("PasteText", ["海康威视"]);
		//
		// };



		// document.getElementById("buttonIDGetAll").onclick = function () {
		// 	//method for get all content controls
		// 	window.Asc.plugin.executeMethod("GetAllContentControls");
		// 	fBtnGetAll = true;

		// };

		// document.getElementById("buttonIDShowCurrent").onclick = function () {

		// 	fClickBtnCur = true;
		// 	//menthod for get current content control (where is the cursor located)
		// 	window.Asc.plugin.executeMethod("GetCurrentContentControl");

		// };

		if (!flagInit) {
			flagInit = true;
			//method for get all content controls
			// window.Asc.plugin.executeMethod("GetAllForms");
			// this.callCommand(function() {
		
				// console.log(aForms)
				// return aForms;
			// }, false);
			// document.getElementById("buttonIDGetAll").click();
		}

		 that = this
		$('#checkDocId').click(function () {
			function addAnnotations () {
				function findMatches (input) {
					const results = [];

					// Rule 1: Match colon followed by up to 10 characters that do not contain valid digits, Chinese characters, or English letters.
					const regex1 = /([\u4e00-\u9fa5a-zA-Z]+[:：])((?![\d\u4e00-\u9fa5a-zA-Z]).{0,10})(?=\s|$)/g;
					// Rule 2: Match six or more consecutive underscores.
					const regex2 = /_{6,}/g;

					let match;

					// Rule 1
					while ((match = regex1.exec(input)) !== null) {
						const [fullMatch, prefix, suffix] = match;
						// Only add match if suffix does not contain valid digits, Chinese characters, or English letters.
						if (!suffix.trim() || suffix.trim().length === 0) {
							results.push({
								start: match.index,
								end: match.index + fullMatch.length,
								text: fullMatch.trim()
							});
						}
					}

					// Rule 2
					while ((match = regex2.exec(input)) !== null) {
						results.push({
							start: match.index,
							end: match.index + match[0].length,
							text: match[0]
						});
					}

					return results;
				}
				var oDocument = Api.GetDocument();
				var oDocEls = oDocument.GetContent(false);
				var aComments = oDocument.GetAllComments();
				aComments.forEach(function (item) {
					item.Delete()
				});
				for (var index in oDocEls) {
					var oParagraph = oDocEls[index];
					if (!oParagraph.Table) {
						var oText = oParagraph.GetText()
						var fText = findMatches(oText)
						if (fText.length > 0) {
							fText.forEach(function (item) {
								var oRange = Api.CreateRange(oParagraph, item.start, item.end);;
								oRange.AddComment("此处应填写内容", "简蚁制标机器人", "uid-1");
							})
						}
					}
				}
			}
			// export variable to plugin scope
			that.callCommand(addAnnotations, false);
		})

		$('#checkSign').click(function () {
			function addSignAnnotations () {
				function matchKeywords (input, keywords) {
					const results = [];
					// 构建匹配正则表达式
					const regex = new RegExp(`(${keywords.join('|')})`, 'g');

					let match;
					while ((match = regex.exec(input)) !== null) {
						results.push({
							start: match.index,
							end: match.index + match[0].length,
							text: match[0]
						});
					}

					return results;
				}
				var oDocument = Api.GetDocument();
				var oDocEls = oDocument.GetContent(false);
				var aComments = oDocument.GetAllComments();
				aComments.forEach(function (item) {
					item.Delete()
				});
				for (var index in oDocEls) {
					var oParagraph = oDocEls[index];
					if (!oParagraph.Table) {
						var oText = oParagraph.GetText()
						var fText = matchKeywords(oText, ['签章', '电子签章', '电子签名'])
						if (fText.length > 0) {
							fText.forEach(function (item) {
								var oRange = Api.CreateRange(oParagraph, item.start, item.end);;
								oRange.AddComment("此处应上传签章", "简蚁制标机器人", "uid-1");
							})
						}
					}
				}
			}
			// export variable to plugin scope
			that.callCommand(addSignAnnotations, false);
		})

		$('#divG').ready(function () {
			function addLabel(returnValue, element)  {
				$(element).append(
					$('<label>', {
						id: returnValue.InternalId,
						for: element,
						class: 'label-info',
						text: returnValue.name ,
						// text: returnValue.InternalId + "	" + (returnValue.Id || 'null'),
						on: {
							click: function () {
								fClickLabel = true;
								$('.label-selected').removeClass('label-selected');
								$(this).addClass('label-selected');
								if (element === "#divG") {
									//method for select content control by id
									window.Asc.plugin.executeMethod("SelectContentControl", [this.id]);
								} else {
									//method for move cursor to content control with specified id
									window.Asc.plugin.executeMethod("MoveCursorToContentControl", [this.id, true]);
								}
							},
							mouseover: function () {
								$(this).addClass('label-hovered');
							},
							mouseout: function () {
								$(this).removeClass('label-hovered');
							}
						}
					})
				);
			}

			that.callCommand(function (){
				var oDocument = Api.GetDocument();
				var aForms = oDocument.GetAllForms();
				// console.log(aForms)
				var rsp = []
				for (var i = 0; i < aForms.length; i++) {
					var keyName = aForms[i].GetTipText();
					var value = aForms[i].GetText();
					rsp[i] = {"InternalId":aForms[i].ce.$a,"name": (keyName+": "+value)}
				}
				return rsp;
			},false,null,function (rsp){
				// console.log(rsp)
				if(rsp){
					for (var i = 0; i < rsp.length; i++) {
						// console.log(rsp[i])
						addLabel(rsp[i], "#divG");
					}
				}
				
			});
			
		})
	};

	// addLabel = (returnValue, element) => {
	// 	$(element).append(
	// 		$('<label>', {
	// 			id: returnValue.InternalId,
	// 			for: element,
	// 			class: 'label-info',
	// 			text: returnValue.name ,
	// 			// text: returnValue.InternalId + "	" + (returnValue.Id || 'null'),
	// 			on: {
	// 				click: function () {
	// 					fClickLabel = true;
	// 					$('.label-selected').removeClass('label-selected');
	// 					$(this).addClass('label-selected');
	// 					if (element === "#divG") {
	// 						//method for select content control by id
	// 						window.Asc.plugin.executeMethod("SelectContentControl", [this.id]);
	// 					} else {
	// 						//method for move cursor to content control with specified id
	// 						window.Asc.plugin.executeMethod("MoveCursorToContentControl", [this.id, true]);
	// 					}
	// 				},
	// 				mouseover: function () {
	// 					$(this).addClass('label-hovered');
	// 				},
	// 				mouseout: function () {
	// 					$(this).removeClass('label-hovered');
	// 				}
	// 			}
	// 		})
	// 	);
	// };

	window.Asc.plugin.button = function () {
		this.executeCommand("close", "");
	};
	

	window.Asc.plugin.onMethodReturn = function (returnValue) {
		//evend return for completed methods
		var _plugin = window.Asc.plugin;
		
		console.log(_plugin.info.methodName)
		if (_plugin.info.methodName == "GetAllForms") {
		// 	if (fBtnGetAll) {
				// document.getElementById("divP").innerHTML = "";
				// fBtnGetAll = false;
				// for (var i = 0; i < returnValue.length; i++) {
				// 	addLabel(returnValue[i], "#divP");
				// }
			// } else {
			// 	document.getElementById("divG").innerHTML = "";
			// 	for (var i = 0; i < returnValue.length; i++) {
			// 		var internalId = returnValue[i].InternalId;
			// 		window.Asc.plugin.executeMethod("GetFormValue",[internalId],function (res){
			// 			console.log(internalId.InternalId,res)
			// 		})
					// addLabel(returnValue[i], "#divG");
				// }
			// }


		}
		else if (_plugin.info.methodName == "GetCurrentContentControl") {
			if (fClickBtnCur) {
		// 		method for select content control by id
				window.Asc.plugin.executeMethod("SelectContentControl", [returnValue]);
				fClickBtnCur = false;
			} else if (!($('.label-selected').length && $('.label-selected')[0].id === returnValue) && returnValue) {
				if (document.getElementById(returnValue)) {
					$('.label-selected').removeClass('label-selected');
					$('#divG #' + returnValue).addClass('label-selected');
					$('#divP #' + returnValue).addClass('label-selected');


				} else {
					$('.label-selected').removeClass('label-selected');
					addLabel({ InternalId: returnValue }, "#divG");
					$('#' + returnValue).addClass('label-selected');
				}
			} else if (!returnValue) {
				$('.label-selected').removeClass('label-selected');
			}
		}
	};

	window.Asc.plugin.event_onTargetPositionChanged = function () {
		//event change cursor position
		//all events are specified in the config file in the "events" field
		if (!fClickLabel) {
			//menthod for get current content control (where is the cursor located)
			window.Asc.plugin.executeMethod("GetCurrentContentControl");
		}
		fClickLabel = false;
	};
	window.Asc.plugin.attachEvent('onContextMenuShow', function(options) {
		console.log("onContextMenuShow")
	});
})(window, undefined);
