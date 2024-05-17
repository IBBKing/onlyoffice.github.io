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
	var isInit = false;

	window.Add = function (key, value,keyName) {
		if (!isInit)
			return;

		// serialize command as text
		// var oDocument = Api.GetDocument();
		// var oTextForm = { "key": "EntName", "tip": "请输入内容", "placeholder": "海康威视", "multiLine": false, "autoFit": true };
		// oDocument.InsertTextForm(oTextForm)
		var sScript = "var oDocument = Api.GetDocument();";
		sScript += "var oTextForm = { 'key': '" + key + "','value': '" + value + "', 'tip': \'" + keyName + "\', 'placeholder': '" + value + "', 'multiLine': false, 'autoFit': true };";
		sScript += "oDocument.InsertTextForm(oTextForm);";
		sScript += " var aForms = oDocument.GetAllForms(); " +
			"for(var i in aForms){ " +
			"    if(aForms[i].GetFormKey() === '"+key+"'){ " +
			"       aForms[i].SetText(\""+value+"\"); " +
			"    }" +
			"}";
		window.Asc.plugin.info.recalculate = true;
		window.Asc.plugin.executeCommand("command", sScript);
	};

	window.addImage = function (url) {
		var _param = {
			"data": "{data}",
			"imgSrc": url,
			"guid": "asc.{3CC9F0BC-B979-D03B-9FAC-EBED495E9CA3}",
			"width": 50,
			"height": 50,
			"widthPix": 60 * 36000,
			"heightPix": 60 * 36000
		};
		window.Asc.plugin.executeMethod("AddOleObject", [_param], function () {
			window.Asc.plugin.executeCommand("close", "");
		});
	}

	window.Asc.plugin.init = function (text) {
		isInit = true
		var that = this
		var dom = ''
		var entInfo = '<div style="font-weight: bold;font-size: 14px;padding:10px 0;">企业信息</div>'
		var projectInfo = '<div style="font-weight: bold;font-size: 14px;padding:10px 0;">项目信息</div>'
		var sign = '<div style="font-weight: bold;font-size: 14px;padding:10px 0;">签章信息</div>'
		bidData.entInfo.forEach(function (item) {
			if (item.type !== 'img') {
				entInfo += `<div style="cursor: pointer;" onclick="Add('${item.key}','${item.value}','${item.keyName}')">${item.keyName}：${item.value}</div>`
			} else {
				entInfo += `<div style="cursor: pointer;display: flex; justify-content: flex-start;" onclick="addImage('${item.value}')">${item.keyName}：<img style="width: 100px;height: 100px;cursor: pointer;" src="${item.value}" alt="签章"></div>`
			}
		})
		bidData.projectInfo.forEach(function (item) {
			if (item.type !== 'img') {
				projectInfo += `<div style="cursor: pointer;" onclick="Add('${item.key}','${item.value}','${item.keyName}')">${item.keyName}：${item.value}</div>`
			} else {
				projectInfo += `<div style="cursor: pointer;" onclick="addImage('${item.value}',${item.keyName})">${item.keyName}：<img style="width: 100px;height: 100px;cursor: pointer;" src="${item.value}" alt="签章"></div>`
			}
		})
		bidData.sign.forEach(function (item) {
			if (item.type !== 'img') {
				sign += `<div style="cursor: pointer;" onclick="Add('${item.key}','${item.value}')">${item.keyName}：${item.value}</div>`
			} else {
				sign += `<div style="cursor: pointer;display: flex; justify-content: flex-start;" onclick="addImage('${item.value}')">${item.keyName}：<img style="width: 100px;height: 100px;cursor: pointer;" src="${item.value}" alt="签章"></div>`
			}
		})
		dom += entInfo
		dom += projectInfo
		dom += sign
		$('#editBidId').html(dom)
		// imgDump

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