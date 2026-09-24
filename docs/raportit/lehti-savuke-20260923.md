# Natiivin lehden savuke — simulaattori (23.9.2026)

Build 8b3e12b (natiivilehti, `ui lehti`/`ui maalehti` mukana). Kuvat:
`/Users/Shared/Claude/proto-3d/lokit/lehti-savuke-20260923/`.

## Kaupunkilehti (Pariisi, `ui lehti pariisi`)

- **Etusivu**: OK — otsikko PARIISI, "Ranska · 1. matkapäivä", isoin
  herokuva galleriana (nuolet < >, "1/4"), kuvateksti + lähdeviittaus
  ("Matkakirjan havainnekuva"), leipäteksti, "silloin/nyt" kaksipalstainen
  kuvavertailu, "Poistu lehdestä" / "Pariisi ›" -navigointi.
- **Kaiutin**: näkyy oikeassa yläkulmassa jokaisella sivulla (🔊-kuvake) —
  ei testattu ääntä itse komennolla, vain visuaalinen läsnäolo.
- **Sivunkääntö** (`ui lehti sivu 1`): OK — "PARIISI PINTAA SYVEMMÄLTÄ",
  oma artikkeli ("Paras patonki valitaan sokkona") oikealla Commons-kuvalla
  ja asianmukaisella attribuutiolla (Lionel Allorge, CC BY-SA 3.0),
  "‹ Etusivu" / "Musiikki ›" -navigointi — vahvistaa että sivujen välillä
  liikutaan nimettyjen aihepainikkeiden kautta.
- **Sisällys** (`ui lehti sisallys`): ei näyttänyt mitään erillistä
  paneelia kaupunkilehdellä (kuva identtinen etusivun kanssa) — vaikuttaa
  siltä, ettei kaupunkilehdellä ole sisällysluetteloa (vain maalehdellä,
  ks. alla), mikä on looginen ero yhden jatkuvan artikkelin ja
  monta aihetta sisältävän maalehden välillä. Ei tutkittu, onko tämä
  tarkoituksellista.
- **Kuvatesti** (`ui lehti kuva`): suoritettiin virheittä, kuva
  `ui-lehti-pariisi-kuva.png` tallessa.

## Maan oma lehti (Ranska, `ui maalehti FRA`)

- **Etusivu**: OK — "FRA · MAAN OMA LEHTI", "HISTORIA"-aihe otsikkona,
  artikkeli luolamaalauksista (Lascaux) real Commons-kuvalla ja
  attribuutiolla, "Ruoka ›" -painike seuraavaan aiheeseen.
- **Aiheet/sisällys** (`ui lehti sisallys`): **OK, selkeä lista** — kuusi
  aihetta (Historia, Ruoka, Keksinnöt, Luonto, Urheilu, Arki), kukin lyhyellä
  esittelyllä, vieritettävä paneeli. Tämä on juuri se "aiheet"-näkymä, jota
  Fable pyysi.
- **Sivunkääntö** (`ui lehti sivu 1`): OK, siirtyi seuraavaan aiheeseen.

## Yhteenveto

Kaikki pyydetyt osa-alueet (etusivu, aiheet, kuvien lataus, sivunkääntö,
kaiutin) vahvistettu toimiviksi sekä kaupunki- että maalehdellä. Ei
kontaktiarkkia web-lehteä vastaan tässä erässä — jos vertailu halutaan, se
vaatii web-puolen vastaavat kaappaukset samoista kohteista (Pariisi,
Ranska); en tehnyt niitä tässä kierroksessa ajan puutteessa, koska kolme
tehtävää oli jonossa yhtä aikaa.
