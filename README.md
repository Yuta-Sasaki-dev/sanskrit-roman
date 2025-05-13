# Sanskrit-Roman

This extension converts plain alphabets to romanized-transcript of Sanskrit (or Old Indo-Aryan).

## Getting Started

### Installation

1. Download `.vsix` file from "Releases" page.
2. Start VSCode and run this command:  `Extensions: Install from VSIX...`
3. choose `vsix` file that you downloaded.

### Rules to Replace alphabets

Replace texts in circumflex `%skt{}`.

#### Example

Original text:

`%skt{dharmaikat=an=a.h puru.s=a yad=asan satyav=adina.h /}`

Processed text:

`dharmaikatānāḥ puruṣā yadāsan satyavādinaḥ /`

#### Vowels

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

#### Consonants

|Consonant Type|Rules|Example(Before)|Example(After)|
|:-:|:-:|:-:|:-:|
|Guttural Nasal|`,` + n|`,n`|`ṅ`|
|Combining Dot Below(Retroflex etc.)|`.` + t, d, n, s, m, h, l|`.t`, `.s`|`ṭ`, `ṣ`|
|Palatal Nasal|`~` + n|`~n`|`ñ`|
|Palatal Fricative|`,` + s|`,s`|`ś`|
|Anunāsika|`,` + m|`,m`|`m̐`|

#### Others

`:root:` : `√`

## Release Notes

### 0.1.0

Full features released. (Not finished bug fix yet.)
