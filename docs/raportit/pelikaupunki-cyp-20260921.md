# Pelikaupunki: Kypros / Nikosia — 21.9.2026

Sisältökirjuri-session dispatch (Sonnet), haara `sisalto-pelikaupunki-cyp`
origin/mainista (`de6205b2`, v2019). Tilaus: Fable hyväksyi, että Kypros,
Luxemburg ja Malta saavat pelikaupungin (kolme maata ilman aiempaa
pelikaupunkia). Tämä raportti kattaa Kyproksen (Nikosia).

## TÄRKEIN LÖYDÖS: Nikosia ei ollutkaan tyhjä merkki

Tehtävänannon täsmennys oli jo oikeassa siitä, että Nikosia on merkkinä
laudalla ja maalehti on jo täysi. Mutta laajempi tarkistus (grep +
testiajo) paljasti, että **käytännössä KOKO "MINIMI"- ja suuri osa
"TÄYSI"-reseptistä (viesti-fable-kaupunkiresepti-20260919.md) oli jo
olemassa** — vain väärässä paikassa reseptiin nähden. Resepti kirjoitettiin
Brysselin (europe.js/europe-countries.js/europe-questions.js jne.) mallin
mukaan, mutta **Nikosia ei koskaan ollut europe.js:n kaupunki: se on
`js/packs/middleeast.js`:n kaupunki** (merenkulkuyhteydet İzmiriin,
Halabiin ja Kairoon), ja sen sisältö asuu vastaavasti Lähi-idän/Aasian
tiedostoissa:

| Reseptin kohta | Reseptin odottama tiedosto | Missä Nikosian sisältö OIKEASTI on | Tila |
| --- | --- | --- | --- |
| 6–7 (kysymykset, tiesitkö) | europe-questions.js | `js/packs/middleeast-questions.js` (rivit 138, 1384) | jo olemassa, 5 kysymystä + 3 tiesitkö-tietoa (isoisä+nuori) |
| 8 (kuratoitu kuva) | europe-valokuvat.js | `js/packs/asia-valokuvat.js` (rivi 1231) | jo olemassa, Wellcome Collection CC BY 4.0 + kolme lisäkuvaa |
| 9 (oma artikkeli) | europe-artikkelit.js | `js/packs/asia-artikkelit.js` (avain `Nikosia`, rivi 507) | jo olemassa |
| 10 (saapumisteksti) | fokusvirta/saapumispuheet | `js/packs/asia-saapumiset.js` (rivi 47) — Aasia/Lähi-itä ei ole vielä siirretty fokusvirtoihin | jo olemassa, isoisän lainaus + nuoren havainto |
| 13 (radio) | radiot.js | `js/packs/radiot.js` CYP (rivi 55) | jo olemassa |
| 18 (kevyt kaupunkilehti) | kulttuuri-kategoriat.js | jo olemassa (v592, 12.8.2026): kansisivu + aihe "arki" | ennallaan, tilauksen mukaisesti EI laajennettu |
| 19 (nähtävyysjutut) | nahtavyysjutut.js | jo olemassa (v592): 6 juttua kohdekartan kohteille | jo olemassa |
| 20 (kohdekartta) | maakartat.js + PNG | jo olemassa (v592): `nikosia-keskusta.png`, 6 kohdetta | jo olemassa, tarkistettu uudelleen (ks. alla) |

**Korjaus myös aiempaan raporttiin**: `docs/raportit/sisaltoinventaario-
eurooppa-20260921.md` (sama päivä, aiempi Sonnet-sessio) väitti, että
"CYP:llä … EUROPE_CITY_COUNTRY-taulussa ei ole yhtään näiden maiden
kaupunkia … koko maa on pelaajalle tavoittamaton kartalta". Tämä pitää
paikkansa VAIN `europe-countries.js`:n `EUROPE_CITY_COUNTRY`-taulun
osalta — se ei tarkistanut `middleeast-countries.js`:ää eikä elävää
maailmankarttaa. Nikosia ON pelaajalle tavoitettavissa (reitti
İzmir–Nikosia meritse) ja on ollut sitä koko ajan. **Luxemburgilla ja
Maltalla ei ole vastaavaa piilokaupunkia** — tarkistin: kumpikaan ei
esiinny `CITY_COUNTRY`/`cityCountry`-taulussa yhdelläkään pakan
kaupungilla, joten niille resepti pätee sellaisenaan (aito uusi
pelikaupunki, kartalle lisättävä merkki mukaan lukien).

## Mitä siis oli oikeasti tehtävää

Reseptin 17 MINIMI-kohdasta Nikosialta puuttui testien ja grepin mukaan
oikeasti täsmälleen yksi asia:

### A) Lisätty: paikallisaarrepari (CYP)

`js/packs/paikallisaarteet.js` ei sisältänyt CYP-riviä (testi
`tests/paikallisaarteet.test.mjs` "jokaisella Euroopan laudan maalla on
oma pari" ei tätä vaadi, koska Kyproksen kaupunki on Lähi-idän pakassa,
mutta pelillisesti maa on ollut aktiivinen ilman omaa paria pitkään —
löytöteksti näytti laudan yleistä aarretta). Lisätty:

- **pieniAarre**: *Enkomin sarvijumala* — pronssinen jumalanpatsas
  (n. 1200-luku eaa.), löydetty Enkomista 1963, nyt Kyproksen museossa
  Nikosiassa.
- **isoAarre**: *Lambousan hopea-aarre* — bysanttilaiset hopealautaset
  Daavidin elämästä (600-luku), löydetty 1902, nykyään hajallaan
  Kyproksen museon, British Museumin ja Metropolitan-museon kokoelmissa.

Kuvaa ei ole (kuten Belgialla, Slovenialla ja Slovakialla) — CYP lisätty
`tests/paikallisaarteet.test.mjs`:n `KUVAA_ODOTTAVAT`-listaan.

### B) Kohdekartta — EI vaadi uutta työtä

`js/packs/maakartat.js` `KAUPUNKIKARTAT.nikosia` on jo olemassa (v592,
12.8.2026) täsmälleen tilauksen kuvaaman kokoisena: 6 kohdetta
venetsialaismuurien sisällä. Tarkistin uudelleen molemmilla työkaluilla:

```
node tools/tarkista-karttapisteet.mjs nikosia
```

— kaikki 6 pistettä maalla, mittakaavajana ei peity, numeroympyrät eivät
mene päällekkäin. `node --test tests/kaupunkiliuska.test.mjs` 22/22.
Katsoin myös itse `assets/kartat/nikosia-keskusta.png`: tähtimäinen
muurikehä erottuu selvästi, kuvassa ei silmin havaittavia virheitä.
`varikartta`-versiota ei ole (kuten ei suurimmalla osalla vanhemmista
kohdekartoista, esim. Doha/Kuwait/Masqat samasta erästä) — en piirtänyt
sitä, koska se ei ole testien eikä pelin toiminnan edellytys eikä
kaupunkia erikseen vaivaa verrattuna muihin saman erän kaupunkeihin.

Kohteet (jo pelissä, tekstien ja kuvien kera nähtävyysjutuissa):
Selimiyen moskeija, Büyük Han, Faneromenin kirkko, Omeryen hamam,
Kyproksen museo, Leventis-museo.

### C) Ei tehty (tarkistettu, ei tarvita)

- **Kaupunkilehti (kevyt)**: ennallaan, tilauksen mukaisesti — ei
  laajennettu täydeksi 6-aiheiseksi lehdeksi.
- **Maa numeroina**: toimii automaattisesti, koska `nikosia` on jo
  `CITY_COUNTRY`-taulussa (`"nikosia":"CYP"`, `js/packs/
  maailmankartta.js`). `js/lehti.js`/`js/maakayrat.js` lisäävät sivun
  jokaiseen kaupunkiin, jolla on maa — ei erillistä koodia.
- **Fokusvirta**: ei tarvita. Vain Eurooppa on siirretty
  fokusvirtapakkeihin (Raamattu 8.9.2026); Aasia ja Lähi-itä (johon
  Nikosia kuuluu) käyttävät yhä vanhaa `*-saapumiset.js`-taulua, ja
  Nikosialla on siellä jo merkintä.

## Avoin kysymys Fablelle: kaupunkimusiikin aluerivi (CYP)

Reseptin kohta 15 pyytää riviä `js/kaupunkimusiikki.js`
`ALUEEN_MAAT`-tauluun. **En lisännyt tätä.** Tarkistin: `ALUEEN_MAAT`
kattaa TÄSMÄLLEEN `europe-countries.js`:n maat (britteinsaaret / pohjola
/ keski-eurooppa / välimeri / balkan / itä-eurooppa — "1873:n matkailijan
jako"), ja testi (`tests/musiikkivalitsin.test.mjs` "jokaisella Euroopan
laudan maalla on alue") vaatii aluetta vain näille. Yksikään Lähi-idän
maa (SYR, JOR, EGY, IRN, SAU, TUR mukaan lukien Turkin izmir/ankara/
kapadokia) ei ole taulussa — tämä ei siis ole Nikosia-kohtainen aukko
vaan koko Lähi-idän pakan tietoinen rajaus. Cyprus sopisi maantieteellisesti
lähinnä "valimeri"-alueeseen (sama kuin Kreikka/Italia/Espanja/Portugali),
mutta lisäisin sen yksin ilman että yksikään muu Lähi-idän maa saa
vastaavaa — se olisi epäjohdonmukainen puolinainen ratkaisu ilman
omistajan/Fablen päätöstä siitä, ulotetaanko aluejako koko Lähi-itään.
Jätän päätöksen Fablelle.

## PIENOISMALLITILAUS (Codexille, ei tehty tässä erässä)

Kohdekartan 6 kohdetta eivät ole vielä saaneet pienoismallikuvaa
(`assets/kartat/miniatyyrit/`-kansiosta tarkistettu: ei nikosia-alkuisia
tiedostoja). Sama tyyli kuin muissa Codex-tilauksissa: yksivärinen
seepiamusteluonnos, kevyt karikatyyri, muutama varma viiva,
paperinvärinen tausta, kohde tunnistettavana siluettina, ei tekstiä, ei
muotokuvia — rakennukset esineenä/näkymänä.

| Kohde | Piirrettävä aihe | Ehdotettu tiedostonimi |
| --- | --- | --- |
| Selimiyen moskeija | Goottilaisen entisen katedraalin länsijulkisivu, jonka päädyssä kaksi kapeaa kivistä minareettia; teräväkaarinen pääovi. | `nikosia-selimiyen-moskeija.webp` |
| Büyük Han | Kaksikerroksisen karavaanimajatalon sisäpiha kaarikäytävineen, keskellä pieni kahdeksankulmainen moskeijarakennelma pilarien varassa. | `nikosia-buyuk-han.webp` |
| Faneromenin kirkko | Ortodoksikirkon julkisivu kellotorneineen; vieressä matala muuri, jolla neljä marmorista sarkofagia rinnakkain. | `nikosia-faneromenin-kirkko.webp` |
| Omeryen hamam | Matala kivinen hammam-rakennus, katolla rivi pieniä pyöreitä valonlähdekupuja. | `nikosia-omeryen-hamam.webp` |
| Kyproksen museo | Neoklassisen museorakennuksen pääjulkisivu pylväineen ja leveine portaineen. | `nikosia-kyproksen-museo.webp` |
| Leventis-museo | Kaksikerroksinen kaupunkitalo kapealla kadulla, ylätasanteella pieni rautakaiteinen parveke. | `nikosia-leventis-museo.webp` |

## Testitulokset

`node --test tests/*.test.mjs`: **3836 pass / 0 fail / 13 skip**
(sama kuin ennen muutosta — muutos ei rikkonut mitään, eikä mikään ollut
punaisena Nikosian/CYP:n osalta ennen tätäkään). Ajettu myös kohdennetusti:

- `tests/paikallisaarteet.test.mjs`: 7/7 (uusi CYP-rivi mukana).
- `tests/kaupunkiliuska.test.mjs`: 22/22 (kohdekartta).
- `tests/rules.test.mjs`, `tests/vanha-maailma.test.mjs`,
  `tests/musiikkivalitsin.test.mjs`, `tests/fokusvirta.test.mjs`,
  `tests/pallonimet.test.mjs`, `tests/nostot-kartalla.test.mjs`: 450/450.

## Muutetut tiedostot

- `js/packs/paikallisaarteet.js` — CYP-pari (pieniAarre + isoAarre).
- `tests/paikallisaarteet.test.mjs` — CYP lisätty `KUVAA_ODOTTAVAT`-settiin.
- `docs/raportit/pelikaupunki-cyp-20260921.md` — tämä raportti.

## Suositus Fablelle

Ennen kuin Luxemburgin ja Maltan istunnot käynnistyvät samalla
reseptillä: **niille resepti pätee kirjaimellisesti** (ei piilokaupunkia
missään pakassa, tarkistettu), mutta kannattaa silti teettää sama
alkutarkistus (grep `CITY_COUNTRY`/`cityCountry`-tauluista) ennen
työn aloittamista, koska tämä sessio osoitti, että sama tarkistus
Kyproksella olisi säästänyt koko Bryssel-mallisen minimierän
kirjoittamisen.
