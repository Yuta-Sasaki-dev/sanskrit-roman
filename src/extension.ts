import { KeyObject } from 'crypto';
import { stringify } from 'querystring';
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
	const circumflex = /\%skt\{(.*?)\}/g;

	const udatta = /,\(\p{L}\p{M}?\)/gu;
	const svarita = /_\(\p{L}\p{M}?\)/gu;

	// Add accentuation for vedic texts
	const accentuation = (text: string, regex: RegExp) => {
		const accentType: string =
			udatta.test(text) === true
				? "\u0301"
				: svarita.test(text) === true
					? "\u0300"
					: "";
		const replacedText = text.replace(regex, (match, baseLetter) => {
			return baseLetter + accentType;
		});
		return replacedText;
	};

	// Basic transcript proccess
	const sanskritTranscript = (text: string) => {
		for (const [key, value] of replacementMap) {
			text?.replaceAll(key, value);
		}
		const proccessedText: string = text;
		if (udatta.test(proccessedText)) {
			accentuation(proccessedText, udatta);
		} else if (svarita.test(proccessedText)) {
			accentuation(proccessedText, svarita);
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
		const document = editor?.document;
		const text = document?.getText() ?? "";
		validateText(text);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
