# Opus → Fable: visa-lukko ja pulu laajassa nostokortissa (19.9.2026)

Erä `opus-local-visa-lukko`, Matkakirja Opus local (Mac Studio), noin 19.35–20.30 Suomen aikaa
(välissä v1963:n yläpalkkipunainen, ks. `viesti-fable-v1963-ylapalkki-20260919.md`).
Pohja origin/main (v1962). Tehtävä: Sonnet 1, kierros 11 (`viesti-fable-testipeli-kierros11-20260919.md`).

## 1. Visa: väärän vastauksen jälkeen voi vastata uudelleen

**Ei toistunut Playwrightissa.** Lukko toimii koodissa jo väärän vastauksen jälkeen
molemmilla pinnoilla, joita mittasin:

- Nostokortti: väärä vastaus ja kortin uudelleenavaus. Kortissa ei ole vaihtoehtoja,
  rahapilleri ja laskuri pysyvät ennallaan.
- Kohdekortti (Białowieża, vaihe 2): sama tulos.
- Avain `maailmankartta:nosto:hahmotelma-bialowieza` on tallenteessa (localStorage)
  heti väärän vastauksen jälkeen.

Lisäsin vartiot `savuke-nostovisa.mjs`:ään (commit b9676b42): 4b (nostokortti), 11 (kohdekortti)
ja 11b (avain tallenteessa).

Laitehavainnolle on kolme mahdollista selitystä. Mitään niistä en ole todentanut:

- Laitteella oli vanha SW-välimuistin versio (v1961 tai aiempi).
- Kortti avattiin eri pinnalta: lehteä en mitannut.
- Tallenne palautui vanhemmasta tilasta.

Uudelleenlatausta en voinut mitata savukkeessa. Sen `avaaPeli`-alustusskripti kirjoittaa
tallenteen uudelleen jokaisella latauksella, joten koe olisi ollut pätemätön.

## 2. Pulu laajassa nostokortissa: juurisyy mitattu ja korjattu

**Juurisyy**: `js/pulu-paneelin-ylla.js` muistaa löytämänsä paneelin, jotta pulu ei heilu
edestakaisin, ja vapauttaa pulun vasta, kun juuri se paneeli sulkeutuu. Jos pulu oli jo
hypännyt alalaidan paneelin yläpuolelle ja laaja nostokortti avautui sen PÄÄLLE, vanha
paneeli pysyi muistissa ja oletuspaikan alla. Pulu jäi vanhan paneelin yläreunaan, joka on
keskellä korttia oikeassa reunassa, tekstin ja visan napin päällä. Tämä vastaa Sonnetin kuvausta.

Suora avaus (pelkkä kortti, ei alapaneelia) toimi jo ennestään: pulu väistyi näkyvistä
(väite 9, 390 ja 430 px). Savukkeen väite 9 luki lisäksi osin `saapumistraileria`, joka oli
pulun alla päällimmäisenä. Ilman traileria tulos on sama (väistyy).

**Korjaus** (`js/pulu-paneelin-ylla.js`): kun paneeli on muistissa, vahti katsoo myös
oletuspaikan PÄÄLLIMMÄISEN paneelin. Jos se on eri paneeli eikä muistetun sisä- tai
ulkolaatikko, vahti vaihtaa siihen. Sama laskenta tehdään sen jälkeen: pulu nousee uuden
paneelin yläpuolelle tai väistyy, jos ei mahdu. Kun kortti sulkeutuu, pulu palaa alapaneelin
yläpuolelle.

**Vartio** `savuke-nostovisa.mjs`:

- 9c: savukkeen oma kiinteä alapaneeli, pulu sen yläpuolella, kortti päälle, pulu ei leikkaa
  kortin tekstiä.
- 9d: kortti kiinni, pulu palaa alapaneelin yläpuolelle.

| Ajo (Chromium 390 × 844) | 9c | Pulu kortin kanssa | Savuke |
| --- | --- | --- | --- |
| Vastakoe (vanha pulu-paneelin-ylla.js) | FAIL | ylla, alareuna 636 px (kortti 12–832), leikkaa 1 | 20/21 |
| **Korjattu** | **OK** | väistynyt, leikkaa 0; 9d OK (pulu 636 ≤ paneeli 644) | **21/21** |

`node --test tests/*.test.mjs`: pass 3685, fail 0. `node tools/tarkista-savukkeet.mjs`: kunnossa.

## Jäi tekemättä

- WebKit- ja laitemittaus. Korjaus ei riipu selaimesta (`elementsFromPoint` ja
  laatikkomitat), mutta laitteella sen voi todentaa vasta julkaisun jälkeen.
- Lehtipinnan visalukkoa en mitannut.
- Tapausta, jossa uusi paneeli peittää nostetun pulun mutta EI oletuspaikkaa, en käsitellyt.
  Silloin pulu jää sen alle. En löytänyt tällaista pelin paneelia.
