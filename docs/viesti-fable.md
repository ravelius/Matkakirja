# Viesti Fablelle — pyramidin paperivakiot (haara claude/pyramidi-paperivakiot)

*(Opus, 30.8.2026. Haara tuoreesta origin/mainista v1363. Versiota EI
nostettu, PR:ää EI tehty, generointityönkulkua EI ajettu — omistaja
julkaisee ja ajaa. Muutos on TOOLS-puolella; js/-puoleen ei koskettu,
koska toinen agentti purkaa siellä vanhaa lehtijärjestelmää.)*

## Lyhyesti

Rantaviivavika oli oikea, mutta se oli vain yksi tapaus laajemmasta
vikaluokasta: **koko piirtoketju kertoi painojäljen kartan
mittakaavalla.** Moottorin `S` on yhden arkin lehdellä pelkkä
tarkkuuskerroin mutta pyramidissa mittakaavakerroin, ja kaikki `S`:llä
kerrottu kasvoi siksi tasoittain ruudulla. Mitattuna rannikon kynä oli
z3:lla 1 px, z6:lla 11 px ja z7:llä 19–23 px; nyt se on 1 px joka
tasolla.

Sama korjaus paransi myös **uloimman tason**, josta ei ollut puhetta:
z0:lla viiva oli 0,12 px eli näkymätön ja mantereet sulivat mereen.

Vanhat lehdet ovat **tavulleen ennallaan** (kaksi md5-todistetta).

Yksi hälytys oli väärä: **nimet eivät katoa z7:llä.** Ateena on
nimetty naapurilaatassa `z7/93/41`; laatassa `92/41` ei ole nimiä
kummallakaan tasolla. Ladonta antaa 345 nimiötä ja 0 pudotusta sekä
z6:lla että z7:llä.

## Päätöskortti omistajalle (en toteuttanut)

**Kalusteet syvillä tasoilla.** Valtamerten nimet ja kompassiruusu
ovat yhä arkin mittakaavassa. Katsoin z7-laatan `14/57` (Tyynimeri):
se on kokonaan kahden kirjaimen sisällä. Mitat: kirjaimen korkeus
26 px → 351 px, koko nimi ~3 350 px eli 6,5 laattaa, kompassin
ulkokehä 322 px → 4 350 px eli 8,5 laattaa.

En korjannut, koska **tämä ei ole mittakaavakysymys vaan
yleistyskysymys.** Paperivakioksi muuttaminen rikkoisi toisen pään:
z0:lla maailma on 675 px leveä ja 20 laitepikselin merennimi olisi
harvennuksineen 190 px eli lähes kolmannes maailman leveydestä. Oikea
ratkaisu on sama kynnyskoneisto kuin sisällöllä: kalusteet vain
tasoille, joilla arkki on lähellä viiteleveyttä (esim. z0–z4).
**Millä tasolla raja menee, on tyylipäätös.** Se on ainoa tiedossa
oleva kartografinen vika, joka kannattaa ratkaista ennen seuraavaa
täysajoa — samalla ajolla, ei erikseen.

Kehyksen marginaali ja sen kalusteet (kaksoisviiva, kartussi,
mittajana, painajanrivi) jäävät joka tapauksessa arkin mittakaavaan:
marginaali määrää laattaruudukon, ja sen sisällä olevan kalusteen on
oltava marginaalin kokoinen.

## Kerrottavat sivuvaikutukset

1. **Tavut kasvavat noin 14 %.** Mitattu Ateenan otoksesta: z6
   0,222 → 0,247 tavua/px, z7 0,217 → 0,248. Koko pyramidi
   1,16…1,30 Gt → **noin 1,32…1,48 Gt**. Syy on rakenteellinen:
   paperin rae on nyt joka tasolla yhtä hienoa eikä harvene tason
   mukana, ja rae on juuri sitä korkeataajuista kohinaa, jota
   kuvanpakkaus ei voi pakata. R2:n ilmaisraja 10 Gt ei ole uhattuna.
2. **Piirtotyö vähenee syvimmillä tasoilla.** Kun jokainen
   paikallinen operaattori on paperivakio, lohkon reunuksen ei enää
   tarvitse kasvaa tason mukana: 144 px → 32 px, eli 4 × 4 laatan
   lohkon ylimääräinen työ 30 % → 6 %.
3. **Jokainen laatta muuttuu**, myös z0–z5. Pyramidi on ajettava
   kokonaan uudelleen uudella versionumerolla — osittainen ajo
   jättäisi ämpäriin kaksi eri kartografiaa.
4. Työkalun vanhentunut VAROITUS-tuloste kohdistusheitosta poistettiin
   (kohdistus irrotettiin `s`:stä jo aiemmin, joten varoitus valehteli
   jokaisessa ajossa).

## Havainto js/-puolelta (en koskenut)

`js/laattapyramidi.js` lukee version luettelosta `pyramidi.json`, joten
uusi ajo uudella versiolla ei vaadi js-muutosta. Sen sijaan
`js/media.js FOKUS_VUOSIKERTA` on nostettava, jos `patinoi-fokus.yml`
ajetaan uudelleen — patina.mjs muuttui, vaikka sen ULOSTULO vanhalla
polulla on todennetusti sama; nosto on tarpeen vasta jos joku muu
muuttaa reseptiä.
