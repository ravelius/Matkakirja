# Viesti Fablelle: pilvikerros sokaisi pinnan mustuusvartion (19.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-astro-pallo-pilvet`
(pohja `claude/bold-ride-vow4ki-v1947`, 6e153cf1). Ei versionnostoa,
ei PR:ää.

## Tehtävä

PR #2590 (Savukkeet, run 35401819516) jätti kaksi punaista
`tools/savukkeet/savuke-astro-pallo.mjs`:ään:

- `#tyopoyta` — **43: pinta tummeni kauttaaltaan mutta ei mustunut**:
  valkoisella 222 → linssin sävyllä 216 (vaadittu alle 0,95 × 222).
- `#vartija-b` — **MUSTA PINTA: mittaus näkee mustan piirtopuskurista**
  ja **varapolku palauttaa värillisen pinnan**: mittaukset [186].

## 1. Mittaako vartio pintaa vai pilviä? — PILVIÄ, molemmissa

Vastaus oli luettavissa suoraan luvuista, eikä `?sumu=0`-vertailuajoa
tarvittu arvaamiseen:

- **43**: valkoinen 222 ja "tummennettu" 216 ovat käytännössä sama luku.
  Jos mittaus näkisi pinnan, `diffuse`-kertoimen 0,60 pitäisi näkyä
  suoraan (ja näkyykin: korjauksen jälkeen 122 → 71 eli 0,58).
- **MUSTA PINTA**: koe pakottaa pinnan mustaksi (valehteleva kangas),
  ja vartio luki 186. Se on pilvikuoren kirkkaus, ei pinnan.

Juurisyy on `pinnanKirkkaus`in näytepisteissä
(`js/linssit/satelliitti-avaruus.js`): se lukee pikselit pallon
KESKELTÄ, ja PAATOKSET 43 kohta 7:n pilvikuori (säde 1,01 × pallon
säde, peitto kaukaa 0,9) on täsmälleen näytteiden ja pinnan välissä.
Avaruussumu on CSS-kalvo eikä näy `readPixels`issä lainkaan — vika
tulee yksin pilvikuoresta.

**Tämä ei ollut vain savukkeen vika vaan vartion vika.** Mustan pallon
juurisyy (globe.gl `Color(0)`, LISÄYS 13 kohta 37) on PINNASSA. Pilvien
tultua vartio olisi raportoinut `puute=ei` myös silloin, kun pelaajan
pallo on mustanaan pilvien alla — eli koko LISÄYS 13:n vartiointi oli
käytännössä pois päältä 18.9.2026 alkaen.

## 2. Korjaus: kuori pois VAIN siltä kehykseltä, jonka mittaus piirtää

Sumua ei sammuteta mittauksen ajaksi (`?sumu=0` olisi tehnyt väitteestä
tyhjän: musta pallo on pelaajalle musta juuri pilvien alla). Sen sijaan
mittaus, joka jo ennestään piirtää oman kehyksensä, vie kuoren pois
piirrosta siksi yhdeksi kehykseksi:

- `js/pallolauta/linssit.js` — kalvon kahvalle `piilota(kylla)`:
  `mesh.visible`, ei häivytystä eikä peittoa, joten materiaalin arvot
  eivät liiku.
- `js/linssit/astro-sumu.js` — kahvalle `piilotaPilvet(kylla)` ja
  `tila().pilvetPiilossa`.
- `js/linssit/satelliitti-avaruus.js` — `pinnanKirkkaus(pallo, ikkuna,
  piilotaEsteet)`. Kuori pois → oma kehys → `readPixels` → kuori
  takaisin `finally`ssä → **yksi kehys lisää**, jotta mittauksen kehys
  ei jää ruudulle (ilman jälkipiirtoa pilvet välähtäisivät pois
  yhdeksi kehykseksi jokaisella mittauksella). `avaaAvaruusnakyma`
  antaa kytkimen `mittaaPinta`lle, ja `pinta-mittaus`-diagriville tuli
  kenttä `este=` (montako kertaa kuori on viety pois) sekä
  `tila().pinnanEsteita`.

Kytkin on valinnainen: ilman sitä (tai ennen kuin kuori on rakennettu)
mittaus toimii kuten ennenkin.

## 3. Vastakoe: musta jää kiinni MYÖS pilvien alta

`#vartija-b`:n MUSTA PINTA -lohko ON tämä vastakoe — se pakottaa
pinnan mustaksi ja vaatii vartion näkevän sen. Lisäsin lohkoon
NELJÄNNEN väitteen, jottei punaista voi "korjata" sammuttamalla
pilviä:

> `MUSTA PINTA: pilvet olivat päällä, ja musta jäi silti kiinni`
> — `{"pilvet":0.9,"nakyvyys":0.9,"ladattu":true,"piilossa":false,"esteita":3}`

Mittaukset kulkivat **[0, 0, 57]**: pinta luettiin mustaksi (0),
askel 1 (väri) ei auttanut, askel 2 (generoitu vyöhykepallo) palautti
värin — pilvipeiton ollessa koko ajan 0,9 ja kuoren ollessa mittausten
jälkeen taas piirrossa.

Vastaava kiinnike tuli myös työpöydän sävyvartioon:

> `43b: sävy mitattiin pilvikuoren läpi (kuori pois vain mittauksen ajaksi)`
> — pilvipeitto 0.9, este 1 → 4, kuoren näkyvyys mittausten jälkeen 0.9

Lisäksi yksikkötesti `tests/satelliitti-avaruus.test.mjs`:
"pinnanKirkkaus näkee mustan pinnan myös pilvikuoren alta" mallintaa
tilanteen (kuori päällä 186, pinta 0) ja vaatii, että ilman kytkintä
mittari näkee 186 (= vika sellaisena kuin se oli), kytkimen kanssa
alle mustan kynnyksen, että kuori palautuu myös heittävällä
`readPixels`illä ja että jälkipiirto tehdään.

## 4. Ajot (Mac Studio, Chromium, portit 8849–8850)

| rivi | tulos |
| --- | --- |
| `savuke-astro-pallo.mjs#vartija-b` (`NAKYMAT=vartija-b`) | **17/17 läpi** (oli 14/16) |
| `savuke-astro-pallo.mjs#tyopoyta` (`NAKYMAT=tyopoyta,ei-vartija`) | **48/49 läpi** (oli 47/48) |

- `43: pinta tummeni kauttaaltaan mutta ei mustunut` — valkoisella 122
  → linssin sävyllä 71 (suhde 0,58 ≈ PALLON_SAVY 0,60), sama sävy
  uudestaan 71. **Vihreä.**
- Mustan pallon vartiot (`pallon pinnalla on osoite`, `pallon
  keskipiste ei ole musta`, SAFARIN RAJAT, KOLME AVAUSTA) pysyivät
  vihreinä; luvut laskivat odotetusti, koska ne mittaavat nyt pintaa
  eivätkä pilviä.

**Jäi punaiseksi (ei tämän erän aihe):**
`45c: valaisu tulee sädekehästä eikä maastosta` — sädekehä nostaa
10 px:n kehää **4,8** yksikköä, vaadittu ≥ 5 (PR #2590:ssa 5,4).
Väite mittaa kohdepisteen sädekehän valaisua kuvakaappauksen
pikseleistä eikä kulje `pinnanKirkkaus`in kautta lainkaan; raja on
ollut ennenkin kuormaherkkä (savukkeen oma kommentti: "maastonäytteen
vaihtelu, mitattu 4,6 kuormassa"). Ajoin kaksi riviä rinnakkain samalla
koneella, kuten CI tekee. Ajosäännön mukaisesti en uusinut ajoa.
Suositus: joko kirjata tunnetuksi kuormapunaiseksi `#tyopoyta`-riville
tai laskea raja 4,5:een — luku 45b:n kanssa yhdessä kertoo saman asian.

## 5. Portit

- `node --test tests/*.test.mjs` — **# pass 3644, # fail 0** (3657
  testiä, 13 skipattu).
- `node tools/tarkista-savukkeet.mjs` — kunnossa (2152 ui-viittausta).
- `node tools/tarkista-niputus.mjs` — kunnossa (398 moduulia).
- `node tools/build-standalone.mjs` — `dist/matkakirja.html` 32 785 kt.

## 6. Mitä tämä tarkoittaa Raamatulle

Ehdotan Fablelle PAATOKSET 43 kohta 7:n TARKENNUKSEEN yhtä virkettä:
*pilvikuori viedään pois piirrosta siksi yhdeksi kehykseksi, jonka
pinnan mustuusmittaus itse piirtää — muuten kuori sokaisee LISÄYS 13
kohta 37:n vartion.* Kirjaus kuuluu Fablelle; en kirjoittanut
Raamattuun.

En koskenut `js/reliefipyramidi.js`:ään enkä topografialinssin
savukkeeseen (toinen agentti työskentelee niissä).
