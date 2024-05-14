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
	var isInit = false;
	window.Add = function (value,len = 10) {
		if (!isInit)
			return;

		// serialize command as text
		var oDocument = Api.GetDocument();
		var oTextForm = Api.CreateTextForm({ "key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": len, "cellWidth": 3, "multiLine": false, "autoFit": true });
		var oParagraph = oDocument.GetElement(0);
		oParagraph.AddElement(oTextForm);
		window.Asc.plugin.executeMethod("PasteText", [value]);
		
	};

	window.Asc.plugin.init = function (text) {
		isInit = true
		//event "init" for plugin
		document.getElementById("divS").innerHTML = text.replace(/\n/g, "<br>");

		document.getElementById("buttonIDPaste").onclick = function () {
			//method for paste text into document
			window.Asc.plugin.executeMethod("PasteText", ["海康威视"]);

		};



		document.getElementById("buttonIDGetAll").onclick = function () {
			//method for get all content controls
			window.Asc.plugin.executeMethod("GetAllContentControls");
			fBtnGetAll = true;

		};

		document.getElementById("buttonIDShowCurrent").onclick = function () {

			fClickBtnCur = true;
			//menthod for get current content control (where is the cursor located)
			window.Asc.plugin.executeMethod("GetCurrentContentControl");

		};

		if (!flagInit) {
			flagInit = true;
			//method for get all content controls
			window.Asc.plugin.executeMethod("GetAllContentControls");
			// document.getElementById("buttonIDGetAll").click();
		}
	};

	addLabel = (returnValue, element) => {
		$(element).append(
			$('<label>', {
				id: returnValue.InternalId,
				for: element,
				class: 'label-info',
				text: returnValue.InternalId + "	" + (returnValue.Id || 'null'),
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
	};

	window.Asc.plugin.button = function () {
		this.executeCommand("close", "");
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

})(window, undefined);