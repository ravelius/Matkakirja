# Opus 9 → Fable: Siperian erä 3 valmis (v681)

Haara `claude/opus9-siperia-era3`, PR pushattu. Kolme kaupunkilehteä:
**Kamtšatka, Sahalin ja Vladivostok**. Erä 3 päättää Siperian
kahdeksan kaupungin urakan (erät 1–2 mainissa v659, v663, v673).

## Kaupunki-id:t: tehtävänannon arvaus oli väärä

Tehtävänanto oletti kaupungeiksi *petropavlovsk* ja
*juzhno-sahalinsk*. Laudan oikeat id:t ovat `kamtsatka` ("Kamtšatka",
niemimaa) ja `sahalin` ("Sahalin", saari) — eivät kaupunkeja vaan
alueita, joten kannet on kirjoitettu alueen näkökulmasta ja
Petropavlovsk sekä Južno-Sahalinsk esiintyvät niiden sisällä.
Kolmas on `vladivostok`.

## Mitä tehtiin

| Kohde | Kansi | Aihesivu | Minitehtävä |
| --- | --- | --- | --- |
| kamtsatka | 3 kansikuvaa + 3 nostoa | `luonto` / Tulivuoret | Gejsirien laakson löytäjä |
| sahalin | 3 kansikuvaa + 3 nostoa | `historia` / Historia | Pietarin sopimus 1875 |
| vladivostok | 3 kansikuvaa + 3 nostoa | `luonto` / Ussurin taiga | Sihote-Alin |

Aihetunnukset `luonto` ja `historia` eivät törmää MAA_KATEGORIAT.RUS:n
aiheisiin (taide, tiede, menovinkit) — sama linja kuin erissä 1–2.

Lisäksi **ERA5-säänormaalit** kaikille kolmelle
(`js/packs/saatiedot.js`), joten lehden mastoon tulee sää ja
vuosisääkortti. Kamtšatka on koko pelin sateisin Siperia-kohde
(1 231 mm), Vladivostokilla on monsuunikäyrä (tammikuu 11 mm,
elokuu 150 mm).

Linjaukset pidetty: ei uutisosiota, ei tv:tä, ei radiota, ei
kohtaamisia, ei nykypolitiikkaa eikä nykysotasisältöä. Sahalinin
vuoden 1945 vallanvaihto on yhdessä asiallisessa virkkeessä.
Matkakirjamerkintöjä ei generoitu, kaanoniin ei koskettu.

## Kuvat: 27 kpl, kaikki katsottu kahdesti

Jokainen kuva on Commonsista, ≥ 1200 px, .jpg, PD/CC. Tekijänimet on
verrattu koneellisesti `extmetadata.Artist`-arvoon merkki merkiltä.
`katsottu`-kentät kirjoitti kirjoittaja-agentti thumbnailin
perusteella, ja **katsoin lisäksi kaikki 27 kuvaa itse** 640 px
thumbeina selitettä vasten (toistuva vika 4). Silmätarkistus tuotti
kolme korjausta, joita koneellinen linssi ei olisi löytänyt:

- Vladivostokin Sihote-Alin-kuvan selite väitti valtapuuksi
  koreansembraa — kuvasta ei voi päätellä puulajia, selite muutettiin.
- Arsenjev-kuvan "kaarnamaja" on todellisuudessa risuista tehty
  leiripaikan runko.
- Beringin muistomerkin "kypärän muotoinen huippu" on tykinputkeksi
  muotoiltu metallipylväs, jonka päällä on lootuskukka ja tykinkuula
  (tämän löysi faktatarkastaja, silmätarkistus vahvisti).

Uusia kuvaduplikaatteja ei syntynyt: koko pakan haku (4 192
kuvaviittausta) löytää vain ne 9 duplikaattia, jotka olivat mainissa
jo ennestään.

## Tarkistuslinssit ajettiin LOPPUUN ennen PR:ää

Tämä oli erien 1–2 opetus, ja se kannatti. Ajoin kaksi linssiä:

**1. Koneellinen linssi** (kuvan leveys, pääte, lisenssi, tekijänimen
merkkitarkka vastaavuus, selitteen pituus ja sommittelusanat,
katsottu-kentän uskottavuus, tekstipituudet, minitehtävän muoto ja
vastauksen löytyminen sivulta). Löysi kaksi vikaa; molemmat korjattu.

**2. Riippumaton faktatarkastus** jokaiselle kaupungille erikseen,
tarkastajalle ei näytetty kirjoittajan perusteluja ja sille sanottiin
"oleta että jotain on pielessä". **Löysi 26 asiavirhettä.** Kaikki on
korjattu. Merkittävimmät:

- **Kiinanlimppuköynnös "25 metriä"** oli yksikkövirhe: en-Wikipedian
  luku on korruptoitunut Missouri Botanical Gardenin "25 feet"
  -luvusta. Oikea 8–10 m.
- **Kultaisen sarven lahti "7 × 2 km"** olisi kolminkertainen
  ru-Wikipedian pinta-alaan (4,44 km²) nähden; "kaksi kilometriä" on
  suuaukon leveys, ei lahden.
- **"Kamtšatkalla on 127 tulivuorta"** palautuu vuoden 1932
  kartoitukseen ja oli suorassa ristiriidassa pelin oman
  kysymyspankin kanssa ("noin 300, yli kaksikymmentä aktiivista").
- **"Niemimaa on hieman Suomea suurempi"** oli väärinpäin: 270 000 km²
  vastaan Suomen 338 000.
- **"Aasiasta ei tunnettu ainuttakaan gejsiriä ennen 1941"** kumoutuu
  saman lehden toisella nostolla: Krašeninnikov kuvasi Kamtšatkan
  gejsirejä jo 1738.
- **Tšehov ei valokuvannut Sahalinilla** — kuvat ovat hänen mukanaan
  tuomiaan (kuvaajat Pavlovski, von Fricken, Štšerbak). Commonsin
  Artist-kenttä johtaa harhaan; `lahde` seuraa sitä, mutta selite ei
  enää väitä tekijyyttä.
- **Asemaa ei rakennettu vanhan tilalle** vaan laajennettiin, ja
  "kivitalo kävi pian pieneksi" oli keksitty syy.
- **"800 pakkotyövankia vuodessa"** — sana *vuodessa* ei ole
  määräyksessä.

Lisäksi **13 sanasta sanaan käännettyä lähdevirkettä** (toistuva vika
3) kirjoitettiin uusiksi ja **viisi keksittyä syy-yhteyttä**
poistettiin. Minitehtävät todettiin kaikki kolme kelvollisiksi
eivätkä ne törmää kaupunkien omiin visakysymyksiin
(`asia-questions.js`) — tarkistin ne erikseen (toistuva vika 2).

## Julkaisuputki

- `node tools/uusi-versio.mjs` → **v681** (main fetchattu juuri ennen)
- `node --test tests/*.test.mjs` → **# pass 703, # fail 0**
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `node tools/build-standalone.mjs` → dist 10 584 kt
- Savukkeet: savuke-dist ✅, savuke-kaupunkitaulut ✅,
  savuke-lehtiasettelu 10/10 ✅, savuke-lehtiotsikko 17/17 ✅
- Kuvakaappaukset 834 ja 1024 px kaikista yhdeksästä sivusta
  (kansi, kannen nostosivu, aihesivu × 3 kaupunkia) — **katsottu
  silmin**: kuvat latautuvat, sää näkyy mastossa, palstat eivät
  purista, ei vaakavieritystä.

Kaappauksissa oli kikka, joka kannattaa tietää: konttiselain ei saa
kuvia verkosta eikä uusia kuvia ole vielä peilissä, joten
kaappausskripti tarjoilee ladatut thumbit `context.route`n kautta —
ja se vaatii `serviceWorkers: 'block'`, koska sw.js kaappaa muuten
kuvapyynnöt eikä route näe niitä lainkaan.

## Kaksi asiaa sinulle päätettäväksi

1. **Salmen nimi.** fi-Wikipediassa artikkeli on *Tatariansalmi*;
   "Tatarinsalmi" ei ole edes ohjauksena. Pelin oma kysymyspankki
   (`asia-questions.js`) käyttää muotoa **Tatarinsalmi**, joten
   kirjoitin lehteen saman — sisäinen yhtenäisyys voitti. Jos koko
   pelin nimeäminen halutaan vaihtaa, se on oma pieni erä.
2. **Vladivostokin asemakuva** on ainoa kuva, johon en ole täysin
   tyytyväinen: asema jää täyden pysäköintikentän taakse. Etsin
   kolme vaihtoehtoa, ja ne kaikki kuvasivat laitureita eivätkä
   julkisivua. Jätin nykyisen; rakennus erottuu, mutta jos löydät
   paremman, se on helppo vaihto.

Havainto naapuriongelmasta (en korjannut, ohjeen mukaan):
`asia-questions.js` rivillä ~1961 on Sahalinin havainto "Venäjä ja
Japani kiistelevät saaresta", joka on nykypolitiikkaa. Se on vanhaa
sisältöä eikä tämän erän tekemää.

Jään valmiuteen.
