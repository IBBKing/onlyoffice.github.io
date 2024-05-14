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
	window.check = function (field_type) {
		if (!isInit)
			return;

	};
	window.Mark = function () {
		return window.Add('${DynamicTable}');
	};

	window.Asc.plugin.init = function () {
		isInit = true;
		var that = this
		$('#checkDocId').click(function () {
			console.log('点击事件');
			function findEmptyColonPositions (text) {
				const emptyColonPositions = [];
				const regex = /:(.{15})/g;

				let match;
				while ((match = regex.exec(text)) !== null) {
					const textAfterColon = match[1].trim();
					if (textAfterColon === '') {
						const emptyColonPosition = match.index + match[0].indexOf(':') + 1;
						emptyColonPositions.push(emptyColonPosition);
					}
				}

				return emptyColonPositions;
			}
			function addAnnotations () {
				var oDocument = Api.GetDocument();
				var oParagraph = oDocument.GetContent(false);
				for (var index in oDocEls) {
					var oParagraph = oDocEls[index];
					var oText = oParagraph.GetText()
					console.log(findEmptyColonPositions(oText))
				}
			}
			// export variable to plugin scope
			that.callCommand(addAnnotations, true);
		})
	};

	window.Asc.plugin.button = function (id) {
		if (-1 == id)
			this.executeCommand("close", "");
	};

})(window, undefined);
