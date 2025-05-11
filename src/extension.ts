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
		['\.t', 'ṭ'],
		['\.T', 'Ṭ'],
		['\.d', 'ḍ'],
		['\.D', 'Ḍ'],
		['\.n', 'ṇ'],
		['\.N', 'Ṇ'],
		[',s', 'ś'],
		[',S', 'Ś'],
		['\.s', 'ṣ'],
		['\.S', 'Ṣ'],
		['\.m', 'ṃ'],
		['\.h', 'ḥ'],
		['\,m', 'm̐'],
		['\.l', 'ḷ'],
		[':root:', '√']
	]);
	// Marker for target of transcript
	const circumflex = /%skt\{(.*?)\}/g;

	const udatta = /,\(\p{L}\p{M}?\)/gu;
	const svarita = /_\(\p{L}\p{M}?\)/gu;

	// Add accentuation for vedic texts
	const accentuation = (text: string, regex: RegExp) => {
		const accentType = (regexName: any) => {
			switch (regexName) {
				case udatta:
					return "\u0301";
				case svarita:
					return "\u0300";
				default:
					break;
			}
		};
		const replacedText = text.replace(regex, (match, baseLetter) => {
			return baseLetter + accentType(regex);
		});
		return replacedText;
	};

	// Basic transcript process
	const sanskritTranscript = (text: string) => {
		for (const [key, value] of replacementMap) {
			text = text?.replace(key, value);
		}
		const processedText: string = text;
		if (udatta.test(processedText)) {
			text = accentuation(processedText, udatta);
		} else if (svarita.test(processedText)) {
			text = accentuation(processedText, svarita);
		}
		return text;
	};

	const validateText = (input: string) => {
		const output = input.replace(circumflex, (match, textContent) => {
			const validText = sanskritTranscript(textContent);
			return validText;
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
