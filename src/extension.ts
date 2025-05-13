import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const replacementMap = new Map<string, string>([
		['=a', 'ā'],
		['=A', 'Ā'],
		['=i', 'ī'],
		['=I', 'Ī'],
		['=u', 'ū'],
		['=U', 'Ū'],
		[',r', 'r̥'],
		['=r', 'r̥̄'],
		[',R', 'R̥'],
		['=R', 'R̥̄'],
		[',l', 'l̥'],
		[',n', 'ṅ'],
		[',N', 'Ṅ'],
		['~n', 'ñ'],
		['~N', 'Ñ'],
		['.t', 'ṭ'],
		['.T', 'Ṭ'],
		['.d', 'ḍ'],
		['.D', 'Ḍ'],
		['.n', 'ṇ'],
		['.N', 'Ṇ'],
		[',s', 'ś'],
		[',S', 'Ś'],
		['.s', 'ṣ'],
		['.S', 'Ṣ'],
		['.m', 'ṃ'],
		['.h', 'ḥ'],
		[',m', 'm̐'],
		['.l', 'ḷ'],
		[':root:', '√']
	]);
	// Marker for target of transcript
	const marker = /%skt\{(.*?)\}/g;

	// Marker for accentuation
	const udatta = /,\((\p{L}\p{M}?)\)/gu;
	const svarita = /_\((\p{L}\p{M}?)\)/gu;

	// Add accentuation for vedic texts
	const accentType = (regexName: RegExp) => {
		if (regexName.source === udatta.source) {
			return "\u0301";
		} else if (regexName.source === svarita.source) {
			return "\u0300";
		}
		return "";
	};
	const accentuation = (text: string, regex: RegExp) => {
		const accentedChar = accentType(regex);
		if (!accentedChar) {
			return text;
		}
		return text.replace(regex, (match, capturedLetter) => {
			return capturedLetter + accentedChar;
		});
	};

	// Basic transcript process
	const sanskritTranscript = (text: string) => {
		// fundamental replacement logic
		let processedText = text;
		for (const [key, value] of replacementMap) {
			const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const regexKey = new RegExp(escapedKey, 'g');
			processedText = processedText.replace(regexKey, value);
		};
		let textBeforeAccentsA = "";
		do {
			textBeforeAccentsA = processedText;
			// accentuation logic
			if (udatta.test(processedText)) {
				processedText = accentuation(processedText, udatta);
			}
			if (svarita.test(processedText)) {
				processedText = accentuation(processedText, svarita);
			}
			udatta.lastIndex = 0;
		} while (textBeforeAccentsA !== processedText);
		let textBeforeAccentsB = "";
		do {
			textBeforeAccentsB = processedText;
			// accentuation logic
			if (svarita.test(processedText)) {
				processedText = accentuation(processedText, svarita);
			}
			svarita.lastIndex = 0;
		} while (textBeforeAccentsA !== processedText);
		return processedText;
	};

	const validateText = (input: string) => {
		const output = input.replace(marker, (match, textContent) => {
			return sanskritTranscript(textContent);
		});
		return output;
	};

	const disposable = vscode.commands.registerCommand('sanskrit-roman.execReplace', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const text = document?.getText() ?? "";
			const processedText = validateText(text);
			editor.edit(editApply => {
				const fullRangeText = new vscode.Range(
					new vscode.Position(0, 0),
					document.lineAt(document.lineCount - 1).range.end
				);
				editApply.replace(fullRangeText, processedText);
			})
				.then(success => {
					if (success) {
						vscode.window.setStatusBarMessage('Sanskrit Romanization Applied.');
					} else {
						console.error('Text replacement failed.');
						vscode.window.showErrorMessage('Failed to apply Sanskrit romanization.');
					}
				});
		} else {
			vscode.window.showInformationMessage('No Active Editor found.');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
