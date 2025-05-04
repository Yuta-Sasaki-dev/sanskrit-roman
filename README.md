# Sanskrit-Roman

Under construction...

## Features

Soon...

## Requirements

No Requirements.

## Rules to Replace alphabets

Replacement `%skt{}`

### Vowels

Replacement Rules for Vowels.

|Vowel Type|Rules|Before Replacement|After Replacement|
|:-:|:-:|:-:|:-:|
|long vowels|`=` + short vowels (contains r)|`=a`, `=A`|`ā`, `Ā`|
|r, l as vowels|`,` + `r` or `l`|`,r`|`r̥`|

#### Accentuation

|Accent type|Rules|Before Replacement|After Replacement|
|:-:|:-:|:-:|:-:|
|Udātta Accent|`,([vowels])`|`,(a)`, `,(=a)`|`á`, `ā́`|
|Svarita Accent|`_([vowels])`|`_(a)`, `_(=a)`|`à`, `ā̀`|

### Consonants

|Consonant Type|Rules|Example(Before)|Example(After)|
|:-:|:-:|:-:|:-:|
|Guttural Nasal|`,` + n|`,n`|`ṅ`|
|Combining Dot Below(Retroflex etc.)|`.` + t, d, n, s, m, h|`.t`, `.s`|`ṭ`, `ṣ`|
|Palatal Nasal|`~` + n|`~n`|`ñ`|
|Palatal Fricative|`z`|`z`|`ś`|
|Anunāsika|`,` + m|`,m`|`m̐`|

### Others

`:root:` : `√`

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 1.0.0

First Release.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.
