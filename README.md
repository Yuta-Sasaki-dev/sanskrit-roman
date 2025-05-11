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
|Udātta Accent|`,(vowel)`|`,(a)`, `,(=a)`|`á`, `ā́`|
|Svarita Accent|`_(vowel)`|`_(a)`, `_(=a)`|`à`, `ā̀`|

### Consonants

|Consonant Type|Rules|Example(Before)|Example(After)|
|:-:|:-:|:-:|:-:|
|Guttural Nasal|`,` + n|`,n`|`ṅ`|
|Combining Dot Below(Retroflex etc.)|`.` + t, d, n, s, m, h, l|`.t`, `.s`|`ṭ`, `ṣ`|
|Palatal Nasal|`~` + n|`~n`|`ñ`|
|Palatal Fricative|`,` + s|`,s`|`ś`|
|Anunāsika|`,` + m|`,m`|`m̐`|

### Others

`:root:` : `√`

## Installation

1. Download `.vsix` file from "Releases" page.
2. Start VSCode and run this command:  `Extensions: Install from VSIX...`
3. choose `vsix` file that you downloaded.

## Release Notes

### 1.0.0

First Release.
