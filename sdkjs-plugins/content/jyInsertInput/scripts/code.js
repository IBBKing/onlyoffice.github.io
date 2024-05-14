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
	window.Add = function (value) {
		if (!isInit)
			return;

		// serialize command as text
		// var oDocument = Api.GetDocument();
		// var oTextForm = { "key": "EntName", "tip": "请输入内容", "placeholder": "海康威视", "multiLine": false, "autoFit": true };
		// oDocument.InsertTextForm(oTextForm)
		var sScript = "var oDocument = Api.GetDocument();";
		sScript += "var oTextForm = { 'key': 'EntName', 'tip': '请输入\'" + value + "\'', 'placeholder': '\'" + value + "\'', 'multiLine': false, 'autoFit': true };";
		sScript += "oDocument.InsertTextForm(oTextForm);";
		window.Asc.plugin.info.recalculate = true;
		window.Asc.plugin.executeCommand("command", sScript);
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

		// if (!flagInit) {
		// 	flagInit = true;
		// 	//method for get all content controls
		// 	window.Asc.plugin.executeMethod("GetAllContentControls");
		// 	// document.getElementById("buttonIDGetAll").click();
		// }
	};



	window.Asc.plugin.button = function () {
		this.executeCommand("close", "");
	};



	// window.Asc.plugin.event_onTargetPositionChanged = function () {
	// 	//event change cursor position
	// 	//all events are specified in the config file in the "events" field
	// 	if (!fClickLabel) {
	// 		//menthod for get current content control (where is the cursor located)
	// 		window.Asc.plugin.executeMethod("GetCurrentContentControl");
	// 	}
	// 	fClickLabel = false;
	// };

})(window, undefined);