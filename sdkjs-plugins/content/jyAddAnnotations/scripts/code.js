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

			function addAnnotations () {
				function findMatches (input) {
					const matches = [];
					const regex1 = /([a-zA-Z\u4e00-\u9fa5]+[\u3002\uff1a\uff1b\uff0c\u201c\u201d\uff1f\u201a\u2018\u201b:,;?!"](?=[^a-zA-Z\u4e00-\u9fa5\pL\p{sc=Han}]|$)|[\u3002\uff1a\uff1b\uff0c\u201c\u201d\uff1f\u201a\u2018\u201b:,;?!"]\b[^a-zA-Z\u4e00-\u9fa5\pL\p{sc=Han}]+)(?:[^a-zA-Z\u4e00-\u9fa5\pL\p{sc=Han}]|$){0,10}/g;
					const regex2 = /_{6,}(?=\s|$)(?![\S_])/g;
					let match;

					// 规则1: 中英文标点符号后的位置没有在十个字符内出现中英文的字符
					while ((match = regex1.exec(input)) !== null) {
						matches.push({
							start: match.index,
							end: match.index + match[0].length,
							text: match[0]
						});
					}

					// 规则2: 出现连续的 6 个及以上下划线,但是如果是____有东西__ 这样就不算
					while ((match = regex2.exec(input)) !== null) {
						matches.push({
							start: match.index,
							end: match.index + match[0].length,
							text: match[0]
						});
					}

					return matches;
				}
				var oDocument = Api.GetDocument();
				var oDocEls = oDocument.GetContent(false);
				for (var index in oDocEls) {
					var oParagraph = oDocEls[index];
					var oText = oParagraph.GetText()
					console.log(findMatches(oText))
					findMatches(oText).forEach(function (item, index) {
						var oRange = oParagraph.GetRange(item.start, item.end);
						oRange.AddComment("此处应填写内容", "简蚁制标机器人", "uid-1");
					})
					// if(findMatches(oText).length > 0){
					// 	Api.AddComment(oText, "此处应填写内容", "简蚁制标机器人", "uid-1");
					// }
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
