# Notre-Dame k4 — korjattu G-tilaus, yksi otto

Lähde: `posti/karttaseppa-codex-nahtavyysalue-notre-dame-k4-KORJATTU-20261103.md`, viimeisin commit `6250e9546328467321b74cc973e10a3cfef3aad9`, blob `5a59bf42125a8b920eb5fb72984e238bbfb6f14d`.
TILAUS SHA256 `2a0e9042358a0b518e03aebb9f078166b44acdbeaef9a1d2655915adc38dd291`; maski SHA256 `e1dcd77d3b5bf374dd792b32df6fe7f4c95506b211b3128a33c70e57376576c0`. Kaikki 14 lähdetiedostoa tarkistettu ennen generointia.

Käytetty vain korjattua oikeaa G-mallia (31.10., koko kaupunki SHA256 `692ff29f2c330a77d56dd6dd2f6bd50c4822d404ff128365b57cdd51b8fa2bde`), päivitettyä sijoituskuvaa ja laajennettua takasiluettia. Vanhasta k4/G-v4-tilauksesta ei tehty yhtään ottoa. Tämän yhdistetyn #1952–1953-tilauksen kokonaismäärä: **1 generointikutsu, 1 kuva**.

## Tulos ja mitat
Alkuperäinen ImageGen-PNG: **1536 × 1024 RGBA**, tavut muuttamattomina. Kuva on arvioitava ehdokas: **oma kokonais-QA EI läpäissyt**, ei käyttövalmis toimitus.

Natiivin kuvan koordinaattiruudukosta visuaalisesti arvioidut mitat (reunan ja perspektiivin epävarmuus mukana):
- Julkisivun etutason alaleveys noin **220–235 px** (tavoite noin 210 px).
- Julkisivun etutason yläleveys noin **230–245 px** (tavoite noin 235 px). Tämä mitta ei sisällä takasivujen perspektiivistä leveyttä.
- Molempien tornien koko yläsiluetin vaakasuuntainen ulottuma noin **295–305 px**. Se ylittää sijoitusmallin leveyden.
- Tornien korkeus niiden maatason ja yläreunan välillä noin **415–440 px** (tavoite noin 345 px).
- Julkisivun maanvastainen alareuna kulkee perspektiivissä noin **y605–655**, kun sijoitusmallin maataso on noin **y578**. Kirkko on liian alhaalla ja liian korkea.

## Onnistuneet piirteet
Kaksi tasakattoista tornia levenee ylöspäin, ruusuikkuna näkyy, keskihuippu ja laiva jatkuvat taakse oikealle. Sävyt ovat hillityt ja lämpimät. Veneitä, autoja tai muita liikkuvia osia ei havaittu. Takaosan sallittu joen päälle ulottuminen on huomioitu; sitä ei itsessään luokitella virheeksi.

## Poikkeamat, jotka estävät suoran käytön
1. Generointi siirsi rakennuksen alareunaa ja muutti saarten/rantojen muotoja. Maajalanjälki ja etelähaaran vapaa tila eivät noudata alkuperäistä ruudukkoa. Alkuperäisen pohjan päälle tehty QA-yhdistelmä paljastaa eron. Myös tilatut rantakaistat ovat osittain piirtämättä.
2. Alfarajaus ei vastaa toimitusmaskia. Maskin mustalla alueella on **170038** ei-nollaalfapikseliä, joista **38864** alfalla vähintään128. Veden alueella sallitun takasiluetin ulkopuolella on **65422** ei-nollaalfapikseliä, joista **34442** alfalla vähintään128.
3. Alfan vaihteluväli on **0–254**: alfa0-pikseleitä1128045, alfa255-pikseleitä0, osittaisia alfoja444819. Ehto sisäosa255 / ulkopuoli0 / enintään2pxreunapehmennys ei toteudu. Kuvan ympärillä näkyvä halo kuuluu tähän alfastatukseen.

Alkuperäiseen kuvaan ei tehty maskileikkausta, skaalausta, siirtoa, värikorjausta eikä muuta osittaista jälkimuokkausta. QA:n taustayhdistelmät ja mittaruudukko ovat erillisiä tarkistuskuvia eivätkä toimituskuva. Uusintaa ei tehty.

Karttasepän hyväksyntä, mahdollinen korjattu versio, PT/KK-arvio, runtime-integraatio ja julkaisu ovat edelleen erillisiä, varmentamattomia tiloja. SHA256-toimitusvarmennus ei ole laatu- tai käyttöhyväksyntä.

Paikallinen tarkistusaineisto ja täysi ImageGen-kehote:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-k4-1952-20261103/qa/`
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-k4-1952-20261103/source-and-prompt.json`
