import { KeyObject } from 'crypto';
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
		[',(a)', 'á'],
		['_(=a)', 'ā́'],
		['`(a)', 'à'],
		['`(=a)', 'ā̀'],
		['\\.i', 'í'],
		['_i', 'ī́'],
		[',i', 'ì'],
		['\\|i', 'ī̀'],
		['\\.u', 'ú'],
		['_u', 'ū́'],
		[',u', 'ù'],
		['\\|u', 'ū̀'],
		['\\.r', 'ŕ̥'],
		['_r', 'r̥̄́'],
		['\\`r', 'r̥̀'],
		['\\|r', 'r̥̄̀'],
		['\\.e', 'é'],
		[',e', 'è'],
		['\\.o', 'ó'],
		[',o', 'ò'],
		[',n', 'ṅ'],
		[',N', 'Ṅ'],
		['~n', 'ñ'],
		['~N', 'Ñ'],
		['\\.t', 'ṭ'],
		['\\.T', 'Ṭ'],
		['\\.d', 'ḍ'],
		['\\.D', 'Ḍ'],
		['\\.n', 'ṇ'],
		['\\.N', 'Ṇ'],
		['z', 'ś'],
		['Z', 'Ś'],
		['\\.s', 'ṣ'],
		['\\.S', 'Ṣ'],
		['\\.m', 'ṃ'],
		['\\.h', 'ḥ'],
		['\\,m', 'm̐'],
		['\\.l', 'ḷ'],
		[':root:', '√']
	  ]);
	  

	const disposable = vscode.commands.registerCommand('sanskrit-roman.onCommand', () => {
		const editor = vscode.window.activeTextEditor;
		const document = editor?.document;
		const text = document?.getText();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
