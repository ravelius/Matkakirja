# Nippu 2 (Lähi-idän kaupunkilehdet) — suunnittelumuistio 12.8.2026

*Kirjattu ennen kirjoitustyön aloittamista, koska pilottikaupungissa
tuli vastaan este, joka koskee kaikkia kahdeksaatoista.*

## Tehtävän rajat

Lähi-idän laudalla on 29 kaupunkia. Niistä:

- **3 valmiina** (lehti + kohdekartta): Istanbul, Kairo, Dubai.
- **2 odottaa omistajan päätöstä:** Mekka ja Medina. Pyhät kaupungit
  tehdään vain omistajan erillisellä päätöksellä (Raamattu 2.0,
  Rajaukset ja turvalinjat) — ei aloitettu, ei valmisteltu.
- **6 erikoiskohdetta ilman maa-attribuutiota:** Jerusalem, Petra,
  Siinai, Rub al-Khali, Persepolis, Kappadokia. Nämä eivät ole
  kaupunkeja, joten katuverkkokartta olisi tyhjä; esitystapa on Fablen
  pöydällä (docs/opus2-tilanne.md).
- **18 tehtävää:** Izmir, Ankara, Nikosia, Aleppo, Damaskos, Luxor,
  Riad, Sana, Aden, Salalah, Masqat, Doha, Kuwait, Bagdad, Mosul,
  Tabriz, Teheran, Isfahan.

## ESTE: maalehdet ovat jo syöneet kaupunkien maamerkit

Lähi-idän maalehdet kirjoitettiin, kun yhdelläkään näistä kaupungeista
ei ollut omaa lehteä. Siksi maalehtiin päätyi juttuja, jotka kertovat
nimenomaan kaupungin kohteista — ja juuri ne kohteet ovat ne, jotka
kaupungin kohdekartalle merkitään. Mitattuna:

| Kaupunki | Maalehden juttuja samasta kaupungista |
|---|---|
| Isfahan | **6** (Naqsh-e Jahan, Si-o-se-pol, Sheikh Lotfollah, Chehel Sotoun…) |
| Doha | **5** (kansallismuseo, Souq Waqif, Islamilaisen taiteen museo…) |
| Aleppo, Kuwait | 4 |
| Salalah, Sana, Damaskos | 3 |
| Petra | 2 |
| Masqat, Bagdad, Riad | 1 |

Doha on pilottina paljastava: kolme kuudesta ilmeisestä karttakohteesta
(kansallismuseo, Souq Waqif, Islamilaisen taiteen museo) on jo
kirjoitettu QAT-maalehteen omina juttuinaan. Jos nähtävyysjutut
kirjoitetaan suoraviivaisesti, pelaaja lukee saman jutun kahdesti —
täsmälleen se vika, joka nipussa 1 purettiin kuudesta kohdasta.

## Miten tämä ratkaistaan — ehdotus, ei päätös

**Nähtävyysjuttu ja maalehden nosto EIVÄT ole sama laji.** Nosto on
440–660 merkkiä maan aihesivulla; nähtävyysjuttu on 900–1400 merkkiä,
kiinni kartan numeropisteessä ja luettavissa vain siinä kaupungissa.
Euroopassa nämä ovat tarkoituksella pareja (kannen teaser + pop-up), ja
nipun 1 toistotutka nosti ne esiin juuri siksi.

Ehdotettu työtapa, jolla ei tarvita mallipoikkeusta:

1. **Karttakohteiksi valitaan ensisijaisesti ne kohteet, joista
   maalehti EI kerro.** Dohassa esimerkiksi Msheireb, Al Koot
   -linnake, Corniche ja kalasatama ovat vapaita.
2. **Kun maamerkki on kartalla väistämätön** (Dohan kartalta ei voi
   jättää pois Islamilaisen taiteen museota), nähtävyysjuttu
   kirjoitetaan eri näkökulmasta kuin maalehden nosto — ja
   `tools/tarkista-aihetoisto.mjs` ajetaan ennen julkaisua, jotta
   toisto näkyy numerona eikä mielipiteenä.
3. **Jokainen uusi kaupunki mitataan ensin** samalla ajolla maalehteä,
   karttasivua, kaupungin kulttuurivisaa ja `maasto-tekstit.js`:ää
   vasten — nämä neljä ovat kilpailijoita (docs/opus1-tilanne.md 1d).

**Fablelle / omistajalle päätettäväksi jää yksi asia:** halutaanko
päällekkäisissä tapauksissa mieluummin (a) siirtää maalehden juttu pois
ja antaa aihe kaupunkilehdelle, vai (b) jättää molemmat ja kirjoittaa
eri näkökulmista. Nippu 1 teki Dubain kohdalla valinnan (b) — kannen
helmijuttu kirjoitettiin kaiverruksesta, Bahrain piti sukellustekniikan.
Sama linja skaalaa, mutta (a) tuottaisi tiiviimmät maalehdet.

## Pilotin tila

- **Dohan kohdekartta piirretty ja katsottu.** Rajaus 25,278–25,302 N,
  51,518–51,556 E (n. 3,8 × 2,7 km).
- **Kaksi karttaopetusta kirjattu työkaluun:** Dohanlahti on OSM:ssä
  pelkkää rantaviivaa ilman vesimonikulmiota, joten ilman `meri: true`
  -lippua meri piirtyi paperina ja Corniche näytti tavalliselta
  kadulta. Ja itäreuna oli ensin 51,548, jolloin kansallismuseo
  (51,5495) jäi juuri ulkopuolelle.
- Kohteiden koordinaatit haettu Nominatimista; vesitarkistus
  (`tools/tarkista-karttapisteet.mjs`) ajetaan vasta kun
  KAUPUNKIKARTAT-rivi on olemassa — työkalu lukee kohteet siitä.

## Pilotti valmis 12.8.2026 (v587)

Doha tehtiin kokonaan: kohdekartta + kansisivu + aihesivu `ruoka`
minitehtävineen + kuusi nähtävyysjuttua + säätiedot. Kirjoitustyö
tehtiin seitsemällä rinnakkaisella kirjoittaja-agentilla ja tarkistus
kolmella Sonnet-agentilla (kuvat, faktat, päällekkäisyys).

**Tarkistus löysi seitsemän vikaa, jotka kaikki korjattiin ennen
liittämistä.** Yksikään ei olisi näkynyt testeissä:

1. Msheireb-kuvan tekijämerkintä oli "Michael Coghlan", kun Commonsin
   `extmetadata.Artist` on "Michael Coghlan @ Flickr". Kirjoittaja oli
   pudottanut alustaliitteen tarkoituksella — juuri se "kaunisteltu
   nimi", joka on lisenssirikkomus.
2. **Sama kuva kahdesti samassa kaupungissa:** Msheirebin raitiovaunu
   oli sekä nähtävyysjutussa että kannen nostossa.
3. **Kannen kolmas nosto kertoi saman tarinan** kuin Msheirebin
   nähtävyysjuttu, sanasta sanaan samalla avausvirkkeellä. Korvattiin
   metroasemien muotoa käsittelevällä jutulla (ja Dubain lehden
   "Metrossa ei ole kuljettajaa" -kulma kierrettiin tarkoituksella).
4. Islamilaisen taiteen museon juttu päättyi merinäkymään, jonka
   QAT-maalehti antaa jo huipennuksenaan → poistettu.
5. Corniche-juttu avasi maantäyttöväitteellä, joka on sanasta sanaan jo
   `asia-valokuvat.js`:n kuvatekstissä → kärki vaihdettu.
6. Haukkasairaalan "yli 150 lintua päivässä" → lähteet sanovat "jopa
   150" (swfh.com, The Peninsula).
7. Metsästysmatkojen kohdemaista vain osa oli vahvistettavissa →
   virke poistettu kokonaan.

**Karttaopetus, joka kannattaa periä:** vesitarkistin ilmoitti
Islamilaisen taiteen museon pisteestä "vettä 100 %". Se on tässä
OIKEIN eikä vika — museo seisoo aidosti lahdella omalla tekosaarellaan
(en-Wikipedia 25,2950 / 51,5393), joka ei piirry Overpassin
aineistosta. Piste jätettiin paikalleen ja perustelu kirjoitettiin
`maakartat.js`:ään, ettei sitä siirretä rannalle myöhemmin.

**Mitat:** kuusi juttua 1 256–1 400 merkkiä, 20 kuvaa joista yksikään
ei ole pelissä ennestään eikä toistu kaupungin sisällä. `npm test`
573/0, `tarkista-aihetoisto` ei nosta yhtään Doha-paria, selaintarkistus
390 px: lehti kolme ruutua, sää näkyy mastossa, nähtävyyspopup selaa
kohteita 3/6 ja kuvia 1/2.

**Seuraavat neljä kaupunkia** samalla työtavalla: Masqat, Kuwait,
Nikosia ja Bagdad. Isfahan jätetään myöhemmäksi, koska sen kuusi
maamerkkiä ovat IRN-maalehdessä — se vaatii eniten uudelleenkulmausta.
