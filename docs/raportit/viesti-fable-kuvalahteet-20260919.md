# Opus → Fable: kuvan lähde ja havainnekuvamerkintä vain suurennoksessa (19.9.2026)

Erä `opus-local-kuvalahteet`, Matkakirja Opus local (Mac Studio), 19.24–19.40 Suomen aikaa.
Pohja origin/main (v1961, 883f09fb); rebase v1962:n päälle tarvittaessa.
Omistaja klo 19.04 Suomen aikaa (Loire-kohdekortti): *"Havainnekuva ja lähteet saa
näkyä vasta kun kuva klikataan isoksi. Tsekkaa kaikkialta läpi"*.

## Toteutus: yksi apuri

`js/tekijakortti.js` `kortinKuvalahde(el, lahde, kuva)` täyttää rivin samalla
`taytaLahderivi`llä kuin ennen, jotta gallerioiden kuvanvaihto kirjoittaa siihen yhä
eikä elementtiä poisteta. Lisäksi se antaa rivin luokan `kuvalahde-vain-suurennoksessa`,
jonka `css/styles.css` piilottaa. Suurennokset rakentavat oman rivinsä
(`fokuskohteet.js avaaKohdeSuurennos` → `.fokuskohde-zoomlahde`, `ui.js openLightbox` →
`.lightbox-lahde`, `fokusvirta.js avaaSuurennos`), joten lähde, CC BY -maininta ja
havainnekuvan selite näkyvät siellä kerran linkkeineen.

Kortin ja lehden kuvariveistä apuri otettiin käyttöön näissä:

| Pinta | Kohta |
| --- | --- |
| Kartan kohdekortti (maastokohteet, hahmotelmanostot) | fokuskohteet.js `.fokuskohde-kuvalahde` |
| Nostokortti: yksi kuva, kuvasarja, kuva edellä -kehys | fokusnosto.js `.fokusnosto-kuvalahde`, kuvasarjan lähderivi; nostokuva.js `.nostokuva-lahde` |
| Lehden noston tekijärivi (kun `lahde` on kuvan tekijä-/lisenssirivi) | fokusnosto.js `.fokusnosto-lahde`: tunnistus `Wikimedia Commons / Valokuva: / havainnekuva / CC BY / CC0 / public domain`; tekstilähde ("en-Wikipedia …") jää näkyviin |
| Kaupunkiesittely (hero) | kaupunkinosto.js |
| Kaupunkilehti ja maalehti | lehti.js, maalehti.js (vinkin hero), ui.js lehden nostogalleria ja Tutki-sivun wiki-galleria |
| Nähtävyyslehti / nähtävyysnäkymä | nahtavyydet.js (3 kohtaa) |
| Fokusvirran kortti | fokusvirta.js `.fokusvirta-kuvalahde` |
| Eläintäky (yksi kuva ja karusellit) | elaintaky.js (3 kohtaa) |
| Historian hetki | historian-hetket.js |
| Aikajanan avauskuva | aikajana.js |

Ennalleen jäivät (ei kuvan tekijäriviä kortilla tai jo suurennoksessa): tekstin
lähderivit (`fokuskohde-lahde`, `kulttuuri-lahde`, `fokuskierros-lahde`), kartta- ja
lippulähteet (maalehden kartta, nähtävyyskartta, liput) sekä suurennosten omat rivit.

## Auditointi (uusi `tools/savukkeet/savuke-kuvalahteet.mjs`, Chromium 390 px)

Kortilla ei saa olla näkyvää riviä, joka täsmää
`Valokuva: | Matkakirjan havainnekuva | Wikimedia Commons | CC BY | CC0 | public domain`.
Kuvan napautus (tarvittaessa toinen napautus kuva edellä -kortissa) avaa suurennoksen,
jossa rivi on.

| Pinta | Ennen (origin/main) | Jälkeen |
| --- | --- | --- |
| Kohdekortti Loire, vaihe 2 | FAIL: `Matkakirjan havainnekuva`, `Valokuva: Benjamin Smith …` kortilla | OK kortilla ei riviä / OK suurennoksessa |
| Hahmotelma Texel, vaihe 2 | FAIL: `Valokuva: Michielverbeek, Wikimedia Commons (CC BY…)` | OK / OK |
| Maalehtinosto Montgolfier, vaihe 2 | FAIL: `Tuntematon kaivertaja (BnF/Gallica), Wikimedia Commons…` | OK / OK |
| Loire, Texel, Montgolfier vaihe 1 (kuva edellä) | OK (rivi oli jo piilossa vaiheessa 1) | OK / OK |
| Yhteensä | 10/13 | 13/13 |

Kaappaus: `docs/raportit/kaappaukset/kuvalahteet-20260919/loire-suurennos-ennen-jalkeen-390.jpg`
(suurennos auki: lähde ja havainnekuvaselite näkyvät siellä).

`node --test tests/*.test.mjs`: pass 3658, fail 0 (`tests/elaintakyt.test.mjs`
lähdetekstitestin kaava hyväksyy nyt `kortinKuvalahde`n). Niputus 405, build kokoontuu.

## Jäi tekemättä

- **Mittaamatta selaimessa**: kaupunki- ja maalehden galleriat, nähtävyyslehti,
  fokusvirran kortti, eläintäky, historian hetki, aikajanan avauskuva, Ihmisen matka
  -jaksot ja lisänostot sekä Astronautin kameran kohdekortti. Muutos on tehty
  koodissa ja katettu samalla apurilla; auditointi kattaa kohdekortin, hahmotelman ja
  nostokortin.
- **Sonnet 3:n Ihmisen matka -kuvalähderivi** (haara sonnet3-ihmisen-kuvat, v1962):
  ei vielä mainissa, joten sitä ei siirretty. Rebasen jälkeen sama `kortinKuvalahde`-
  vaihto riittää.
- `savuke-nostokuva-karuselli` ja `savuke-kuvalahteet` sarjat.jsonin PR-porttiin
  tehdään v1962:n karsitun sarjat.jsonin päälle.
