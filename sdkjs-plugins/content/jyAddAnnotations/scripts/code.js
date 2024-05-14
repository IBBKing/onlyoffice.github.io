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
(function (OnlyOfficeEmptyColonPlugin) {
	// 初始化 OnlyOffice 插件
	if (window.Asc.plugin) {
			window.Asc.plugin.init = function () {
					// 注册插件
					window.Asc.plugin.executeCommand = function (commandName, callback) {
							if (commandName === 'checkEmptyColon') {
									checkEmptyColon();
							}
					};
			};
	}

	// 检查冒号后的文本是否为空，并为为空的文本添加批注
	function checkEmptyColon() {
			var doc = window.Asc.plugin.doc;

			// 正则表达式，用于匹配冒号后的文本
			var regex = /:(.{0,15})/g;

			// 遍历所有段落
			doc.GetBody().GetContent().forEach(function (paragraph) {
					// 获取段落中的文本
					var text = paragraph.GetText();
					var match;

					// 使用正则表达式匹配冒号后的文本
					while ((match = regex.exec(text)) !== null) {
							var textAfterColon = match[1].trim();

							// 如果冒号后的文本为空，则添加批注
							if (textAfterColon === '') {
									var colonPosition = match.index + match[0].indexOf(':');
									var comment = new window.Asc.common.CComment(
											'',
											'This text after colon is empty',
											colonPosition,
											colonPosition + 1
									);

									// 将批注添加到文档中
									doc.AddComment(comment);
							}
					}
			});
	}
})(window.OnlyOfficeEmptyColonPlugin || (window.OnlyOfficeEmptyColonPlugin = {}));
