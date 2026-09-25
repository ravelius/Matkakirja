# Viesti Fablelle: Ranskan hahmotelmapisteet (PAATOKSET 33)

Opus-agentti, 17.9.2026 klo 21.55 Suomen aikaa. Haara
`claude/bold-ride-vow4ki-ranska-hahmotelma`, PR mainiin.

## 1. Mitä tehtiin

Uusi pakka `js/packs/hahmotelma-fra.js`: **15 hahmotelmapistettä**, joilla on
vain otsikko (`nimi`) ja yhden rivin alaotsikko (`nappi`). Kortin leipätekstinä
on sama alaotsikko ja rivi "Sisältö tulossa." — ei kuvia, ei visoja, ei
Pulu-kysymyksiä. Jokaisella rivillä on `hahmotelma: true`, jotta seuraava erä
löytää ne yhdellä haulla.

Kytkentä on **KOHDE_MAAT-reitti** (`js/fokuskohteet.js`, kaksi riviä + tuonti),
sama kuin maastokohteilla, kuratoiduilla kohteilla ja näkyvillä kaupungeilla.
Perustelu: PAATOKSET 34 kohta 4 sanoo aidosti kaupungin ulkopuolisten nostojen
jäävän kartalle omina pisteinään, ja tämä on juuri se reitti, jolta pallolauta
lukee merkit. **js/pallolauta/nostot.js:ään ei ole koskettu lainkaan** — koko,
ladonta ja ankkurit tulevat sellaisinaan olemassa olevasta nostomekanismista
(ts. toisen agentin kokoerä osuu näihin automaattisesti).

`lahi: true` on jokaisella rivillä, sama lähizoomiportti kuin maalehtinostoilla.
Ilman sitä viisitoista uutta merkkiä olisi työntänyt vanhoja pääkartan 21 merkin
katon yli muissa maissa; kohdemaassa portti päästää kaikki läpi (mitattu, ks. 4).

## 2. Nykytila ennen erää — Ranskan kohteet kartalla kaupunkien ulkopuolella

`js/packs/maastokohteet-fra.js` (17), laudan `maailmankartta`-koordinaatit:

| nimi | tyyppi | maailmankartta x/y |
| --- | --- | --- |
| Mont Blanc | vuori | 6062,2 / 1567,3 |
| Vignemale | vuori | 5828,6 / 1692,4 |
| Välimeri | meri | 6016,7 / 1699,5 |
| Biskajanlahti | meri | 5726,7 / 1589,4 |
| Loire | joki | 5897 / 1480,4 |
| Rhône | joki | 5994,3 / 1604,7 |
| Mont-Saint-Michel | kulttuuri | 5783 / 1449,1 |
| Carcassonnen linnoituskaupunki | historia | 5912,1 / 1675 |
| Lascaux | historia | 5872,3 / 1599,6 |
| Chartresin katedraali | kulttuuri | 5882,9 / 1457,1 |
| Pont du Gard | tekniikka | 5984,5 / 1644,9 |
| Carnacin kivirivit | historia | 5731,2 / 1493,3 |
| Avignonin paavinpalatsi | historia | 5993,6 / 1644,8 |
| Chambordin linna | kulttuuri | 5883,9 / 1492,5 |
| Douaumontin luukammio | historia | 6014 / 1424,4 |
| Bayeux'n seinävaate | sana | 5810 / 1421,5 |
| Millaun silta | tekniikka | 5934,1 / 1639,5 |

`js/packs/maalehtinostot-fra.js`: 18 nostoa, joista **11 on kaupungin
ulkopuolella** (Versailles, Roquefort-sur-Soulzon, Clermont-Ferrand, Bretagne,
Annonay, Dune du Pilat, Camargue, Puy de Dôme, Mont-Saint-Michelin lahti,
La Ciotat, Le Mans) ja 7 kaupungin sisällä (Pariisi 5, Lyon 1, Marseille 1).

`js/packs/fokuskohteet-fra.js`: 2, molemmat Pariisissa (Tuileries, Bastilji).
`js/packs/nakyvat-kaupungit-fra.js`: 7 kaupunkipistettä (Lyon, Bordeaux, Lille,
Strasbourg, Nizza, Toulouse, Nantes).

**Kaupungin ulkopuolisia nostoja ennen erää: 17 + 11 = 28.** Tämän erän 15
vievät summan **43:een** eli päätöksen "noin 40" lukuun.

## 3. Lisätyt kohteet

Asteet en-Wikipedian rajapinnasta (`action=query&prop=coordinates`, haettu
17.9.2026). Laudan luvut laskettu `tools/johda-maastokohteet.mjs` `laudat`
-funktiolla. Jokainen osuu Ranskan fokuslehden rajaukseen (`osuuLehteen`), ja
lähinkin on 29,9 lautayksikön päässä lähimmästä kaupungista (raja
`KAUPUNGIN_KOHDALLA_SADE` = 7), joten yksikään ei valu kaupunkikartalle.

| nimi | aihe (`tyyppi`) | lat | lng | lähde (en-Wikipedia) | alue |
| --- | --- | --- | --- | --- | --- |
| Pic du Midi de Bigorre | vuori | 42,93638889 | 0,14277778 | "Pic du Midi de Bigorre" | Pyreneet |
| Lourdes | historia | 43,09416667 | −0,04694444 | "Lourdes" | Pyreneet |
| Canigou | vuori | 42,51888889 | 2,45666667 | "Canigó" | Languedoc |
| Gorges du Verdon | joki | 43,73777778 | 6,36388889 | "Verdon Gorge" | Provence / Alpit |
| Chenonceau | kulttuuri | 47,3247 | 1,0704 | "Château de Chenonceau" | Loire |
| Saint-Malo | merenkulku | 48,6494 | −2,0261 | "Saint-Malo" | Bretagne |
| Pointe du Raz | meri | 48,04027778 | −4,74111111 | "Pointe du Raz" | Bretagne |
| Étretat | meri | 49,71 | 0,21 | "Étretat" | Normandia |
| Amiensin tuomiokirkko | kulttuuri | 49,895 | 2,30222222 | "Amiens Cathedral" | Picardie |
| Reims | historia | 49,2628 | 4,0347 | "Reims" | Champagne |
| Vézelay | historia | 47,46638889 | 3,74861111 | "Vézelay Abbey" | Burgundi |
| Beaunen Hôtel-Dieu | kulttuuri | 47,02194444 | 4,83666667 | "Hospices de Beaune" | Burgundi |
| Ajaccio | historia | 41,9267 | 8,7369 | "Ajaccio" | Korsika |
| Bonifacio | merenkulku | 41,386814 | 9,156876 | "Bonifacio, Corse-du-Sud" | Korsika |
| Nancy, Place Stanislas | kulttuuri | 48,69361111 | 6,18305556 | "Place Stanislas" | Lorraine |

Otsikkorivit ovat Fablen lähettämät sanasta sanaan; yhtään omaa faktaväitettä ei
ole kirjoitettu.

### Jakauma erän jälkeen (kaupungin ulkopuoliset nostot, 43)

Pyreneet 3 · Korsika 2 · Burgundi 2 · Pohjois-Ranska (Picardie/Champagne) 2 ·
Bretagne 4 · Normandia 4 · Loire 4 · Provence/Rhône 8 · Languedoc 3 ·
Akvitania 3 · Massif Central 4 · Lorraine 2 · Île-de-France 2.
Ennen erää tyhjät alueet (Korsika 0, Burgundi 0, Pohjois-Ranska 0) ovat nyt
kaikki edustettuina.

## 4. Jätetyt ja miksi

**Jo kartalla samalla paikalla, ei toisteta** (5 — `maastokohteet-fra.js`):
Mont Blanc (`montblanc`), Carcassonne (`carcassonnen-linnoituskaupunki`),
Avignonin paavinpalatsi (`avignonin-paavinpalatsi`), Pont du Gard
(`pont-du-gard`), Carnac (`carnacin-kivirivit`).

**Jätetty määrän vuoksi tältä kierrokselta** (12): Mont Ventoux, Puy de Sancy,
Amboise, Nîmesin areena, Rouenin tuomiokirkko, Rocamadour, Saint-Émilion,
Cognac, Vichy, Biarritz, Toulouse/Canal du Midi, Le Puy-en-Velay. Kaikkien
alueella oli jo 3–8 nostoa; valintaperuste oli tyhjä alue kartalla, ei kohteen
arvo. Ne on helppo lisätä samaan pakkaan, jos omistaja haluaa summan 55:een.

Strasbourgia ja Alsacea ei lisätty (Saksalla 1871–1918) — Strasbourg on kartalla
jo ennestään näkyvänä kaupunkina, sitä ei koskettu.

## 5. Mittaus

`tools/savukkeet/savuke-ranska-sisalto.mjs` Ranskan saapumisnäkymässä, 390×844
ja 1400×900 (Mac, Chrome for Testing). **28/30 läpi.**

- **Ranskan merkkejä pääkartalla: 77** (ennen erää 62; +15). Saapumisnäkymässä
  portti päästää kaikki 77 kummallakin leveydellä, lähizoomiin piiloutuu 0 —
  kohdemaassa kattoa ei ole (PAATOKSET 25). Muille maille katto 21 on yhä
  voimassa (vartio 3 OK).
- **Otsikko-pop-up avautuu napautuksesta:** vartiot 7 ja 7b OK kummallakin
  leveydellä — jokainen uusi nosto avaa OMAN korttinsa sekä hiirellä että
  kosketuksella.
- **Nimiöiden leikkaukset saapumisessa:** 390 px 16 kaikkiaan / 8 uusia
  (raja 8, OK); 1400 px 11 / 7 (OK). Uusista ainoa oma pari on
  `hahmotelma-amiens × syvennys-pariisi-kyyhkyposti` 1400 px:ssä — muut ovat
  ennestään olleita (Millau × Roquefort, Lyon × Michelin jne.).
- **Kaappaukset:**
  - `docs/kaappaukset/ranska-hahmotelma/ranska-sisalto-saapuminen-390x844.jpg`
  - `docs/kaappaukset/ranska-hahmotelma/ranska-sisalto-saapuminen-1400x900.jpg`
  - `docs/kaappaukset/ranska-hahmotelma/ranska-sisalto-lahi-390x844.jpg`

  Saapumiskuvissa pisteet ovat nyt ympäri maata: Étretat ja Amiens pohjoisessa,
  Reims idässä, Vézelay ja Beaune Burgundissa, Pointe du Raz ja Saint-Malo
  lännessä, Lourdes/Pic du Midi/Canigou etelässä ja Korsika omana parinaan.

### Kaksi punaista, joita EN ehtinyt varmistaa mainia vasten

Aikakaton takia vastakoetta `origin/main`-tilaa vasten ei ajettu, joten en voi
sanoa varmasti, ovatko nämä tämän erän aiheuttamia:

1. `390x844: 8a. jokainen lisäkaupunki on osumalistalla` —
   `nakyva-kaupunki-strasbourg` ja `nakyva-kaupunki-nizza` puuttuvat 390 px:n
   osumalistalta (1400 px:ssä kaikki 7 ovat). Todennäköinen syy on
   saapumisnäkymän ahtaus kapealla ruudulla; jos syy on tämä erä, korjaus
   kuuluu ankkurien levitykseen (PAATOKSET 32 TARKENNUS), ei tähän pakkaan.
2. `390x844: 9. oikea vastaus maksaa +25` — `nosto-maalehti-roquefort`in visa
   ei auennut 390 px:ssä (lipukkeita 0, rahat 300 → 300). Sama ahtausepäily;
   1400 px:ssä vartio ei ole listalla lainkaan.

Kumpikaan ei koske hahmotelmapisteitä itseään (vartiot 4–8 ja 7/7b ovat vihreitä).

## 6. Testit ja muut muutokset

`node --test tests/*.test.mjs`: 3585 testiä, kaikki läpi erän jälkeen. Kolme
punaista syntyi uudesta pakasta ja korjattiin perustellusti:

- `sw.js` SHELL-lista + `tools/build-standalone.mjs` MODULES-lista: uusi pakka
  lisätty molempiin (ilman niitä offline ja yhden tiedoston versio jäisivät
  vajaiksi) — yksi rivi kumpaankin, `nakyvat-kaupungit-fra.js`:n viereen.
- `tests/vanha-maailma.test.mjs` ä/ö-vartio: omistajan sitaatin ASCII-sanat
  kirjoitettu umlautteineen (ympäri, jälkeen, määrä).
- `tools/savukkeet/savuke-ranska-sisalto.mjs`: `FRA_MERKKEJA` 62 → 77 (62 + 15,
  peruste kirjattu koodiin); lisäksi selaimen polku lukee nyt `CHROMIUM`-
  ympäristömuuttujaa (Mac) ja savuke tallentaa saapumiskuvan kummastakin
  leveydestä, ei vain lähikuvaa 390 px:stä.

**Pelikoodi muuttuu → vaatii versionoston.** `tools/uusi-versio.mjs`:ää ei ajettu
ohjeen mukaisesti. Raamattuun, `sarjat.json`:iin, `js/pallolauta/nostot.js`:ään
eikä viuhka-/listakoodiin ei koskettu.
