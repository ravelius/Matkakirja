# Viesti Fablelle: puhelimella pulun plus-kupla avaa repliikin tekstin

Opus-työagentti 14.9.2026. Haara `claude/bold-ride-vow4ki-plus-kupla`,
pohjana `origin/main` v1891 (09924de6). Kaikki luvut on MITATTU
Chromiumilla iPhone-emulaatiolla 390 × 844 ja 844 × 390 sekä
työpöydällä 1400 × 900.

## 0. Miksi oma haara eikä #2464

Fable pyysi ensin oman PR:n (koska #2464 oli julkaistu mainiin v1891:nä
ja suljettu) ja heti perään lisäystä samaan haaraan. Tarkistin GitHubista
ennen valintaa: **#2464 on tilassa `closed`, `merged: false`**, ja
`origin/main`in kärki on `v1891: Puhelimella tekstit piiloon; …(#2477)`.
Työ on siis jo mainissa toista PR:ää myöten, eikä suljettuun haaraan
pushaaminen veisi mitään eteenpäin. Tein siksi oman haaran — se on ainoa
reitti, joka oikeasti toimii. Jos sinulla on tästä eri tieto, kerro, niin
siirrän muutokset minne haluat.

## 1. Omistajan sana

> *"Pululla on se pieni puhekupla jossa plus merkki. Siitä tulee teksti
> näkyviin."*

Tämä vastaa v1891:n raportin avoimeen kysymykseen: äänettömällä
puhelimella pulun repliikki jäi kokonaan saamatta, koska kuplapino oli
piilotettu css:llä eikä tekstille ollut avaajaa.

## 2. Mikä muuttui — piilotus siirtyi css:stä pelin omaan mekanismiin

v1891 piilotti puhelimella koko kuplapinon:

```css
@media (max-width: 699px), (max-height: 520px) {
  .pollo-kuplapino-kehys, .pollo-vihje-yksin { display: none !important; }
}
```

Pluskupla (`.pollo-kuplapalautus`, omistajan tilaus 13.9.2026) oli jo
olemassa, mutta se ilmestyy vasta kun kuplat on SULJETTU — eikä kuplia
koskaan näytetty, joten sitä ei koskaan tullut. **Pelkkä css-näkyvyys ei
siis riittänyt**: pluskupla olisi näkynyt, mutta sen napautus ei olisi
tehnyt mitään (`palautaViimeisinKupla` palaa epätotena ilman muistettua
kuplaa).

Ratkaisu on pelin OMA mekanismi eikä uusi rinnakkainen: puhelimella
kupla **aloittaa suljettuna**. `.pollo-kuplapino-kehys` poistettiin
css-piilotuksesta, ja `js/pollo.js`:n `lisaaPinoon` imee uuden kuplan
heti pluskuplaan. Siitä eteenpäin kaikki on entistä koodia: napautus
palauttaa tekstin, lukuaika imee sen takaisin.

### Mitä pollo.js:ään koskettiin (Codexille tiedoksi)

Pakko koskea, koska näkyvyys ei ollut vain css:ää vaan myös pluskuplan
MUISTI (`viimeisinPiilotettuKupla`). Muutos on kolme kohtaa:

1. **`lisaaPinoon` loppu** — puhelimella (`puhelinTila()`) uusi
   `puhe`- tai `vihje`-kupla imeytyy heti pluskuplaan. Kutsu on
   synkroninen ja lisäyksen viimeinen askel, joten selain ei ehdi
   piirtää kuplaa väliin: pelaaja ei näe vilahdusta. (Ajastettu
   piilotus olisi vilauttanut tekstin ensin.)
2. **`imePuhelimenKuplaan` (uusi)** — sama teko kuin
   `piilotaPuhekuplat`, mutta lajista riippumatta. `piilotaPuhekuplat`
   poimii vain viimeisimmän `puhe`-kuplan, koska työpöydällä ohjekupla
   katoaa kartan kosketuksesta; puhelimella molemmat ovat samaa asiaa.
   Metodia kutsutaan VAIN puhelintunnistuksen takaa, joten työpöydän
   käytös ei muutu.
3. **`palautaViimeisinKupla` + `kuplaaPalautetaan`-lippu** — palautus
   kutsuu `lisaaPinoon`ia; ilman lippua palautettu kupla katoaisi saman
   tien takaisin pluskuplaan eikä napautus näyttäisi mitään.

Lisäksi `PUHELIN_KYSELY`/`puhelinTila` siirtyi `js/ui.js`:stä
`js/ui-apurit.js`:ään: pollo.js tarvitsee sen, eikä pollo saa tuoda
ui.js:ää (ui tuo pollon). ui.js vie nimen yhä eteenpäin, joten sen
käyttäjien ei tarvinnut muuttua. `tests/rules.test.mjs`:n vartio seuraa
nimeä uuteen paikkaansa ja vaatii yhä, ettei rajaa kirjoiteta kahdesti.

## 3. Mitattu käytös

Kulku mitattiin kolmessa koossa (repliikki → pluskupla → napautus →
lukuaika):

| vaihe | puhelin 390 × 844 | puhelin 844 × 390 | työpöytä 1400 × 900 |
| --- | --- | --- | --- |
| ennen repliikkiä | ei pluskuplaa, 0 kuplaa | sama | sama |
| repliikin jälkeen | **pluskupla 44 × 44 @ (254, 689)**, 0 kuplatekstiä | **44 × 44 @ (708, 211)**, 0 tekstiä | 1 kupla näkyvissä, ei pluskuplaa |
| pluskupla napautettu | 1 kupla, teksti näkyvissä, pluskupla poissa | sama | napautettavaa ei ole |
| lukuajan jälkeen (7,8 s) | 0 kuplaa, pluskupla takaisin | sama | kupla imeytyy pluskuplaan kuten ennenkin |
| toinen kupla (ohjekupla) | menee samaan pluskuplaan | sama | **kaksi kuplaa pinossa** (vastakoe) |

- Pluskupla on sormen mitassa (44 × 44) eikä osu pulun nappiin
  (päällekkäisyys 0 molemmissa suunnissa).
- Lukuaika tulee pelin omasta kaavasta (`pulunKuplanPiilotusviive`):
  tälle 61 merkin repliikille 7 758 ms.
- **Ohjekuplat (`laji: 'vihje'`) menevät samaan pluskuplaan.** Ilman tätä
  ne olisivat palanneet puhelimella näkyviin — ne olivat v1891:ssä
  piilossa saman css-säännön alla, ja ne ovat yhtä lailla pulun tekstiä.
- `.pollo-vihje-yksin` (pinon ULKOPUOLINEN yksittäiskupla) on puhelimella
  yhä piilossa kuten v1891:ssä: pluskuplan muisti ei hallitse sitä.
  Kirjattu tähän, jos omistaja haluaa senkin avaajan taakse.

## 4. Portit

| portti | tulos |
| --- | --- |
| `npm test` | ks. alla |
| `tests/rules.test.mjs` | 334/334 |
| `tests/pollo.test.mjs` | 124/124 |
| `tarkista-kaksoisavaimet` | ei kaksoisavaimia |
| `tarkista-niputus` | 387 moduulia, ei törmäyksiä |
| `tarkista-savukkeet` | 1668 ui-viittausta, kunnossa |
| `tools/savukkeet/savuke-plus-kupla.mjs` (uusi) | **22/22 vartiota läpi** |
| `tools/savukkeet/savuke-iphone-tekstit.mjs` (v1891) | **33/33 vartiota läpi** |

### Korjattu häilyvyys v1891:n savukkeessa

`savuke-iphone-tekstit.mjs` kaatui mainissa kahteen vartioon ("luennan
jälkeen Liiku palaa näkyviin", "luennan jälkeen kaiutin ei syki") — MYÖS
ilman minun muutoksiani (ajoin sen `git stash`in takaa varmistaakseni,
ettei vika ollut omani). Syy mitattiin: luentavahti vapauttaa napin 1,5
sekunnissa (välirauha 1300 ms + 200 ms:n kysely), mutta savuke odotti
vain 2500 ms, ja kun kontissa ajoi rinnakkain muita raskaita prosesseja,
kysely myöhästyi. Odotus on nyt 4000 ms omana nimettynä vakionaan
perusteluineen. Se on yhä murto-osa varaventtiilistä (30 s), joten aito
jumi kaataisi vartion edelleen.

## 5. Kuvat

`docs/raportit/kuvat/`:

- `plus-kupla-suljettu-pysty.png` — puhelin: pelkkä pluskupla, ei tekstiä
- `plus-kupla-avattu-pysty.png` — puhelin: napautus avasi repliikin
- `plus-kupla-suljettu-tyopoyta.png`, `plus-kupla-avattu-tyopoyta.png` —
  työpöytä ennallaan (vastakoe)

Konttiselain ei saa karttapalloa auki (WebGL), joten kartta on kuvissa
musta. Kuplat ja pluskupla piirtyvät silti oikein, ja kaikki luvut yllä
on mitattu DOMista eikä kuvapikseleistä.

## 6. Muutetut tiedostot

- `js/pollo.js` — `imePuhelimenKuplaan`, `lisaaPinoon`in puhelinhaara,
  `kuplaaPalautetaan`-lippu
- `js/ui-apurit.js` — `PUHELIN_KYSELY` ja `puhelinTila`
- `js/ui.js` — raja tuodaan ja viedään eteenpäin, ei omaa määritystä
- `css/styles.css` — kuplapinon css-piilotus pois, perustelu tilalle
- `tests/rules.test.mjs` — vartio seuraa siirtynyttä rajaa
- `tools/savukkeet/savuke-plus-kupla.mjs` — uusi savuke
- `tools/savukkeet/savuke-iphone-tekstit.mjs` — häilyvän odotuksen korjaus
- `docs/raportit/kuvat/` — 4 kuvaa

Ei versionostoa, ei mergeä, ei `dist/`, ei Raamattuun kirjoitusta.
