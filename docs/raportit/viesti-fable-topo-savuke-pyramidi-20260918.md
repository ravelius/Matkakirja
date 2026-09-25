# Viesti Fablelle: topografialinssin savuke pyramiditilaan (18.9.2026)

Haara `claude/bold-ride-vow4ki-topo-savuke-pyramidi`
(pohja: `claude/bold-ride-vow4ki-julkaisu-v1939`, PR #2578).

## Juurisyy — savuke, ei peli

`tools/savukkeet/savuke-topografialinssi.mjs` odotti joka vaiheessa
vanhan maailman tilaa (`perusKalvo === true` tai `tarkennus.paalla ===
true`), mutta pyramiditilassa kumpaakaan ei rakenneta lainkaan
(`js/linssit/topografia.js`: `perus = pyramidiPaalla ? null : …` ja
`if (!pyramidiPaalla) void (async () => { … luoTarkennus … })`), joten
jokainen odotus käveli aikakattoonsa: 30 s + 120 s + 20 s ruutua kohti,
neljä istuntoa — ja ajo kuoli 600 sekuntiin kesken.

**CORS ei ollut syy.** Savukkeessa oli jo route-välitys
(`sivu.route(/media\.matkakirja\.app|r2\.dev/ …)`) molemmissa
istuntofunktioissa, ja perusajon lokista näkyi, että reliefilaatat
tulivat normaalisti: `taso 7, nakyvia 48, taysin 48` yhdessä
sekunnissa. Linssiketju ei myöskään ole hidas: avauksesta
ensimmäiseen valmiiseen laattaan kuluu nyt noin 100 ms.

## Muutos (vain savuke, peliin ei koskettu)

`tools/savukkeet/savuke-topografialinssi.mjs`:

1. `ajaRuutu(ruutu, { pyramidi = true })`. Pääajo on oletus eli
   reliefipyramidi; vastakoe on `?reliefipyramidi=0` eli varalla oleva
   vanha maailma (ennen vastakoe oli `?tarkennus=0`).
2. Kaikki odotukset ovat pyramiditietoisia: lähizoomissa odotetaan
   laattakerroksen omia mittareita (`lepokerros().mittarit()`:
   `taso ≥ 5`, `valmiita > 0`), yleiskuvassa karkeaa tasoa (`taso ≤ 3`).
3. Uudet päävaiheen väitteet: linssi piirtää pyramidista eikä kalvosta
   tai laastarista; laatasto on lähizoomissa tasossa z ≥ 5;
   **seepiapohjan laattoja 0 pyyntöä linssin aikana** (kohta 49) ja
   reliefilaattoja > 0; ruudulla on piirrettyä reliefiä.
4. Vanhan maailman väitteet (laastari päällä, kankaan tiheys,
   pohjakuvan valinta 4k/8k, yleiskuvan kalvo, lähteiden terävyys)
   siirtyivät sellaisinaan vastakokeeseen, jotta varapolku ei mätäne.
5. Avausmittaus (luenta käynnissä): reliefin saapuminen luetaan
   pyramiditilassa `valmiita > 0`:sta, ja "paljas kartta" vaatii nyt
   myös `valmiita === 0`. Kalvotekstuuriväite on käännetty
   pyramiditilassa muotoon "pyramidin alla ei ole linssin omaa
   kalvotekstuuria".
6. Kirkkausväite vertaa avausta linssin lopputilaan eikä seepiaan
   (ks. oma lukunsa alla).
7. Kaksi mittausikkunan korjausta: laattapyyntöjä lasketaan vain
   linssin avauksen ja sulkemisen väliltä (ennen laskuri näki myös
   sulkemisen jälkeisen seepiapaluun, 94 pyyntöä), ja avausikkuna on
   vähintään 1 s (pyramidissa reliefi on perillä ~100 ms:ssa, jolloin
   ikkunaan mahtui yksi kompositorin kehys).

## Mittaus

| | ennen | jälkeen |
|---|---|---|
| savuke-topografialinssi.mjs | **AIKAKATTO 600 s**, 16/29 | **2 min 25 s**, 44/44 |

`node --test tests/*.test.mjs`: `# pass 3613`, `# fail 0`.
`node tools/tarkista-savukkeet.mjs`: kunnossa.

## Kirkkausväite mittaa nyt lopputilaa, ei seepiaa (jatkoerä)

Ensimmäisessä erässä jäi punaiseksi väite *"avauksen aikana ruutu ei ole
kertaakaan ennen-linssiä-tasoa vaaleampi"* (huippu 114,9 vs seepia
61,2). Erän 2 raportti
(`docs/raportit/viesti-fable-reliefi-kytkenta-era2-20260918.md`,
"TÄRKEIN LÖYTÖ") oli jo todennut, ettei tämä ole välähdys vaan itse
reliefi: pyramiditilassa lopputila on noin 115 eli seepiaa vaaleampi.
Vanha ehto olisi siis vaatinut, ettei reliefi piirry lainkaan.

Väite mittaa nyt 1 s:n avausikkunan kehysten **maksimikirkkautta**
suhteessa **vakiintuneeseen tilaan** (kehykset 2 s avauksen jälkeen,
samasta kaappaussarjasta — kaappausta jatkettiin 1,2 s:sta 2,5 s:iin).
Punainen tulee vain, jos maksimi > vakiintunut + 15 (piikki, joka ei
jää) tai jos ikkunassa on paluu ylhäältä alas > 15 (kirkkaus käy ensin
vaaleassa ja putoaa sitten). Molemmat luvut tulostetaan INFO-rivillä.

Mitattu 18.9.2026 (Mac Studio, Chromium, 390 × 844):

```
INFO  390 px, luenta: avauksen maksimikirkkaus 114,0,
      vakiintunut (2 s jälkeen, 45 kehystä) 113,9,
      suurin paluu ylhäältä alas 4,0, seepia ennen linssiä 61,2
OK    390 px, luenta: avauksessa ei ole välähdystä suhteessa linssin lopputilaan
```

Maksimi 114,0 on käytännössä sama kuin vakiintunut 113,9 ja paluu alas
4,0 on kohinaa: **avauksessa ei ole vaaleaa välivaihetta**. Aiempi
punainen oli vertailuluvun vika, ei pelin.

## Muut havainnot

- Erän ainoa punainen (kirkkauspiikki) osoittautui vertailuluvun
  viaksi ja on korjattu; pelin puolella ei jäänyt avointa vikaa.
- Vanha `?tarkennus=0`-vastakoe poistui: pyramidin kanssa laastaria ei
  ole, ja ilman pyramidia laastarin tila mitataan samassa ajossa
  `tarkennus`-kentästä. Väitemäärä 29 → 44 (uudet pyramidiväitteet
  kahdelle ruudulle ja vanhat vastakokeeseen siirrettyinä).
