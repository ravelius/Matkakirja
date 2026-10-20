# Tuotantopohja: historiapeli

*(LUONNOS 17.10.2026, Sisältökirjuri, PT:n toimeksianto; järjestetty koko pelin pohjaksi 20.10.2026 PT:n erällä (omistajan kortit
KK:ssa klo 22.43). Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu nykyisten ohjeiden ja luovutusten opit
(Olavinlinna "Aarnivalkea", Kielletyn kaupungin juoksupeli, Kiinan dynastiat -linssin faktatyö); uusia sääntöjä ei ole omistajan
22.43-päätöksen lisäksi. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa. Kunkin luvun osuuden omistaa sen tekijä
(otsikot "TÄYDENTÄÄ: <rooli>" tai roolin nimi); PT kokoaa pohjan ja hyväksyy muutokset. Ei vielä dokumenttikartalla: pohja
muuttuu sitovaksi ja karttaan vasta, kun täydennetty versio on näytetty omistajalle KK:n kautta (omistaja 20.10.2026 klo 22.43).)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: GRAFIIKKA havainnekuva; KAMERA viitevideo tai kuvakäsikirjoitus ennen koodausta; ÄÄNET mallinäyte ja lyhyt kuvaus siitä, miltä pitää kuulostaa (Gemini vertaa sokkona); UUDET TEKSTITYYPIT muutama esimerkki pelinäkymässä ennen koko erää; KÄYTTÖLIITTYMÄ kuvakaappaus, johon muutos on piirretty. Historiapelissä koko pelin tavoite on tavoitekuva (luku 1). Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

Historiapeli = pelattava historiallinen kohde maan tasalta (Raamattu, HISTORIALLISET KOHTEET SEIKKAILUINA): Olavinlinna vuoden
1499 linnana, Kielletty kaupunki (kesä 1923 ja lapsi-Puyin juoksupeli noin 1914) ja Gizan historiallinen versio.
**Pohja kattaa koko pelin tekemisen ideasta junaan, ei vain sisältöä** (omistaja 20.10.2026 klo 22.43, "Koko peli"): kohde, hetki
ja tavoitekuva, harmaa pelattava versio, faktat, tarina, repliikit ja tietokerros, näköisyys (mallit, valo, kamera), äänet sekä
testaus ja juna. Ei kata historiaa kertovaa linssiä (esim. Kiinan dynastiat, jonka faktatyö on tässä esimerkkinä), kertojan
tekstiä yleisesti (`kertojan-teksti-ja-aani.md`) eikä esirenderöityä videota (`esirenderoity-video.md`).

**Järjestys (omistaja 20.10.2026 klo 22.43, "Tavoitekuva ja harmaa versio ensin"):** ensin kohde, hetki ja tavoitekuva (luku 1);
sitten harmaa pelattava versio, ja pelattavuus kuntoon ennen grafiikkaa (luku 2); faktat ja tarina rinnalla (luku 3); näköisyys
ja äänet lopuksi (luvut 4–5); testaus ja juna (luku 6).

**Omistaja näkee pelin kolmesti ennen junaa (omistaja 20.10.2026 klo 22.43):** 1) tavoitekuva: havainnekuvat ennen rakentamista;
2) harmaa versio isolla iPadilla: tuntuman hyväksyntä ennen grafiikkaa; 3) valmis näköisyys: pelikuva ja tavoitekuva rinnakkain
ennen junaa. Kaikki KK:n kautta.

**Rajaus:** työ etenee yksi kohde kerrallaan omistajan käskyllä. Olavinlinna on toistaiseksi tauolla (13.10.: vain viisi
keittiön tasoista tilaa peliin, ei uusia tiloja); Kielletyn kaupungin juoksupeli aloitetaan harmaasta pelattavasta
versiosta heti (omistaja 17.10. 22.17, Codexin Pekingiä ei odoteta; tuotantoputki Raamatussa, JUOKSUPELIN LINJAUS); Giza vasta Olavinlinnan ja Kielletyn kaupungin jälkeen. Euroopan ulkopuoliset kohteet ovat omistajan
nimetyt poikkeukset (muut maanosat vasta omistajan aloituspäätöksellä); uutta kohdetta ei aloiteta ilman hänen päätöstään.

## Putki ja roolit (yleiskuva)

```
PT + omistaja: kohde, hetki ja sävy (kortti) → tavoitekuva (havainnekuvat)          [omistaja näkee 1]
  → harmaa pelattava versio: Pelikoodari (+ Natiivi-UI, Lavastajan kehys ja kujaverkko) → botti
  → tuntuma isolla iPadilla                                                          [omistaja näkee 2]
     rinnalla Sisältökirjuri: faktapohja (2 lähdettä per väite, merkinnät) → anakronismi- ja kieltolista
       → tarina: hetki, hahmot, arvoitus (totta vs. FIKTIO eroteltuna) → repliikit → tietokerroksen kortit
       → riippumaton lähdetarkistus (omat haut, alkuperäislähteet) → PT:n tarkistus
       → Tekstit-osasto → omistajan rasti (uudet repliikit ja Pulun tekstit)
  → näköisyys: Lavastaja (mallit, tausta), valo ja kamera → äänet (Äänittäjä, vain luvalla)
  → pelikuva ja tavoitekuva rinnakkain                                               [omistaja näkee 3]
  → botti ja läpipeluu → Natiiviseppä runkoon → junaan
```

| Vaihe | Rooli | Tulos | Luku |
|---|---|---|---|
| 0. Hetki ja kohde | PT → KK → omistaja | kortti; tilanne, vuosi, sävy, rajaukset | 1 |
| 1. Tavoitekuva | PT, Codex (havainnekuvat) | havainnekuvat ja kameran kuvakäsikirjoitus; omistaja näkee | 1 |
| 2. Harmaa pelattava versio | Pelikoodari, Natiivi-UI, Lavastaja (kehys) | pelattava versio isolla iPadilla; omistaja hyväksyy tuntuman | 2 |
| 3. Faktapohja | Sisältökirjuri (Sonnet-tutkijat) | `docs/raportit/faktapohja-<kohde>.md` tai `docs/kohtaukset/<kohde>/…-faktat.md` | 3 |
| 4. Tarina | Sisältökirjuri / Opus | ehdotus (reitti, arvoitus, totta ja FIKTIO), PT valitsee | 3 |
| 5. Repliikit | Sisältökirjuri | repliikkitaulukko (id, vaihe, teksti, äänen ohje, merkkimäärä) | 3 |
| 6. Tietokerros | Sisältökirjuri | kortit (40–70 sanaa), lähteet, varmuus | 3 |
| 7. Tarkistus | tarkistaja-agentit | lähdetarkistus, sukupuoli- ja käännettävyystarkistus | 3 |
| 8. Näköisyys | Lavastaja, Pelikoodari, Natiivi-UI | mallit, valo, kamera; pelikuva ja tavoitekuva rinnakkain | 4 |
| 9. Äänet | Äänittäjä | vain luvalla | 5 |
| 10. Testaus ja juna | Pelikoodari, Natiiviseppä, PT | botti, läpipeluu, todistuskuvat, juna | 6 |
| 11. Retrospektiivi | jokainen tekijä | kirjaus luvun 7 oppeihin | 7 |

Sisältökirjuri ei kytke eikä kirjoita proto-gitiin; löydökset ja valmis erä PT:lle viestinä (enintään 3 riviä), yksityiskohdat
tiedostoon. Agentit vain Opus ja Sonnet.

**Poikkeaminen.** Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois.

**Hyväksyntäpolku**

| Sisältö | Hyväksyjä | Perusta |
|---|---|---|
| Uusi kohde, hetki, sävy, rajaukset | omistaja (kortti PT:n kautta) | Raamattu, HISTORIALLISET KOHTEET SEIKKAILUINA |
| Tavoitekuva, harmaan version tuntuma, valmis näköisyys | omistaja (KK:n kautta) | omistaja 20.10.2026 klo 22.43 |
| Tarinaehdotus (reitti, arvoitus) | PT valitsee, omistaja kortilla | Aarnivalkea (omistaja 7.10.) |
| Faktapohja ja tietokerros | PT riippumattoman tarkistuksen jälkeen | Raamattu; Päätoimittaja tarkistaa vaakunat ja historian ennen kytkentää |
| Uudet repliikit, Pulun tekstit | omistaja (Tekstit-osasto, "Odottaa hyväksyntääsi") | ei pysyvää lupaa uusille teksteille; PT:n 17.10. linjaus: sanatarkka toisinto ei rastia |
| Äänet | omistaja (KK:n "OMISTAJAN PÄÄTÖS" -rivi); kertojalla pysyvä lupa PT:n hyväksymiin | `kertojan-teksti-ja-aani.md` |
| Sääntöjen muutos | PT → omistaja | Raamattu |

## 1. Kohde, hetki ja tavoitekuva

1. **Kohde, hetki ja sävy omistajan kortilla** (PT → KK → omistaja): tilanne, vuosi, sävy ja rajaukset. Uutta kohdetta ei
   aloiteta ilman omistajan päätöstä (Rajaus yllä).
2. **Pelin idea:** pelaaja astuu suoraan toimintaan, ja tehtävä on arvoitus tai aarre, joka nojaa todellisiin yksityiskohtiin
   (luku 3, kultainen polku 5). Mekaniikka nimetään jo tässä (esim. juoksupelin pyyhkäisyt, Olavinlinnan hiiviskely).
3. **Tavoitekuva ennen rakentamista:** havainnekuvat pelin tärkeimmistä näkymistä (esim. juoksupelin katottomat huoneet,
   havainnekuvat j9/j10) ja kamerasta viitevideo tai kuvakäsikirjoitus (Tavoitteen muoto yllä). Tavoitekuvassa näkyvät myös
   kameran etäisyys ja hahmon koko kuvassa (luku 7, juoksupelin opit 20.10.).
4. **Omistaja näkee tavoitekuvan** KK:n kautta ennen kuin harmaata versiota aletaan rakentaa (omistajan näkemiskerta 1).

**Valmis, kun:**

- [ ] Kohde ja hetki omistajan kortilla; sävy ja rajaukset kirjattu.
- [ ] Tavoitekuva (havainnekuvat ja kameran kuvakäsikirjoitus) näytetty omistajalle KK:n kautta ennen rakentamista.

## 2. Harmaa pelattava versio

Pelattavuus kuntoon ennen grafiikkaa (omistaja 20.10.2026 klo 22.43): harmaa versio on pelattava ilman lopullisia malleja,
valoa ja ääniä (juoksupeli: harmaasta pelattavasta versiosta heti, omistaja 17.10. 22.17). Lavastajan kehys ja kujaverkko
(luku 4, työvaiheet 1 ja 4) sekä Natiivi-UI:n ruudun osat pohjilla tehdään jo tähän versioon. Faktat ja tarina etenevät rinnalla
(luku 3).

**Omistaja näkee harmaan version isolla iPadilla** KK:n kautta, ja tuntuma hyväksytään ennen grafiikkaa (omistajan
näkemiskerta 2).

### TÄYDENTÄÄ: Pelikoodari (avausnappi; ei reunakuvaa)

*(pelimekaniikka ja ohjaus (esim. juoksupelin pyyhkäisyt, Olavinlinnan hiiviskely), tallennus kynnyksillä, anteeksiantava
vaikeus, kehittäjätilan aloituskohdat, botin läpäisy ennen läpipeluuta, tietokerroksen kytkentä. Avausnappi (ei reunakuvaa):
tietokerros tarjotaan lopussa tai pyydettäessä; nappia ei ole päätetty. Täydentää Pelikoodari.)*

### Natiivi-UI

*(Natiivi-UI 20.10.2026, PT:n toimeksianto (omistaja 20.10. klo 22.38, Raamattu 4.21). Kooste luovutuksista ja juna 207–209:n
eristä (Olavinlinnan alkuvalinta ja tietokerros, juoksupelin kuvateksti, Ohita, loppu- ja kokoelmakortti, maalin suunta); uusia
sääntöjä ei ole.)*

**Työvaiheet.**

1. **Lähtötieto.** Lue PT:n erä ja grep proto-repon `git log --all --since` ja Raamatun loki: osa eristä on jo tehty. Selvitä,
   kuka omistaa datan (Pelikoodari: säännöt `Peli/`, näkymä esim. `JuoksupeliNakyma`), ja sovi rajapinta hänen kanssaan ennen
   omaa luokkaa yhdellä viestillä: nimet, tyyppi ja kuka kutsuu ketä.
2. **Pohja ensin** (Raamattu 4.1, 4.2): ruudulla vain liikkumistappi (TAPPI, Raamattu 4.7), toimintonappi kontekstikuvakkein ja
   tauko (Raamattu 2.180), ☰ OHJAUSNAPPI-ryhmässä. Kortit KORTTI-pohjan tummalla teemalla (videopeli, Raamattu 4.2), otsikot
   latauskuvan nimipohjalla (`mk-astroavaus__nimi`, `__viiva`, `__lahde`) ja `Latauskuva.Luettava`, ohitusnappi aloituslennon
   Ohita-pohjalla (`mk-aloitus__ohita`), suunta OHJAUSNAPPI › SUUNTANÄYTTÄJÄ. Jos pohjaa ei ole, kysy PT:ltä ennen koodia;
   makuvalinnassa tee kokeiluhaaraan kaksi vaihtoehtoa testikomennon taakse ja kuvat simulla (iPhone pystyssä), suositus
   ensimmäiseksi, ja omistaja valitsee KK:n kortilla.
3. **UI-osat omina tiedostoinaan** `UI/Pelit/` (malli `JuoksuKuvateksti`, `JuoksuOhita`, `JuoksuLoppukortti`, `JuoksuMaalisuunta`):
   isännän näkymään tulee vain 1–3 kutsuriviä (Nayta/Paivita ruudussa, Piilota/Poista sulkiessa). UI kuuntelee pelin aikajanaa
   tapahtumina (esim. `JuoksuAvaus.Tapahtui`) eikä laske ajoitusta itse; pelin tila luetaan isännän julkisista jäsenistä
   (esim. `AvausKaynnissa`, `MaalinSuunta`).
4. **Alku- ja loppunäkymät.** Alkuvalinta KORTTI tumma -korttina (Olavinlinna: Pelaa / Historia vierekkäin leveällä, allekkain
   kapealla). Avauksen kuvateksti pohjan kaksirivisenä muotona (paikka ja vuosi ylärivillä, alarivi viivan alla), sivuilta ☰:n
   verran sisään, rivitys sanojen väliin ja pisin sana pienentää kokoa (`Tietajagalleria.SovitaSana`). Ohita näkyy vain lennon
   aikana. Loppukortti: otsikko (Maali! / Jäit kiinni! / Uuvuit!), matka ja aika, korostuksena aarteet ja pisteet, "Uutta
   kokoelmaan: …", napit Kokoelma, Lopeta, Uudestaan (kulta). Kokoelma samassa kortissa: kerätyt n/kaikki, löytämättömien määrä,
   paikat, tämän juoksun uudet merkittyinä.
5. **Tietokerros** (Raamattu 2.173, 2.176): KORTTI tumma -kortisto vasta lopussa tai pyydettäessä (☰ › Vihje / tietokerros), ei
   pelin aikana; videopeleissä ei Pulua. Tekstivahti (`ui seikkailutapit teksti`) todistaa, ettei pelin aikana näy muuta tekstiä
   kuin löytö- ja tietokerrospohjat.
6. **Tekstit ja testit.** Näyttötekstit `ui.fi.json`:iin avaimina (kielivahti); paikkamerkit `{x}` ja rivin loppuun
   `// kieli: ei (paikkamerkki)`; kehittäjäkortit `// kieli: ei (kehittäjätyökalu)` vain kehittäjätilaan. Jokaiselle UI-osalle
   QA-komento (`ui juoksuloppu maali|kokoelma`, `ui juoksusuunta <kulma> <m>`), `tyokalut/tarkista.sh` 0 virhettä ja pelin
   testit, jos kosket isännän tiedostoon. Simu vain uudelle tekniikalle ja pyydettyihin kuviin (Raamattu 9.2).
7. **Muisti** (Raamattu 6.15): ei kiinteää rajaa; iso pysyvä kuva näkymän ajaksi `Kuvat.Kiinnita` (välimuisti tuhoaa vanhimmat),
   latauskuva vain 3D-maailmoihin (Raamattu 4.27).
8. **Luovutus:** haara ja SHA PT:lle (≤ 3 riviä), isännälle kutsurivit ja järjestys (kumpi haara ensin), Natiiviseppä vie runkoon.
   Ominaisuus, jonka pelaaja näkee vasta UI:n kautta (esim. maali ja sen suunta), menee junaan samassa commitissa UI:n kanssa.

**Valmis, kun:**

- [ ] Jokainen ruudun osa on hyväksytyllä pohjalla tai omistajan valitsemana uutena pohjana, joka on kirjattu tyylikirjaan.
- [ ] Pelin aikana ruudulla vain tappi, toimintonappi, tauko/☰ ja pohjan näyttäjät; tekstivahti OK.
- [ ] Tekstit mahtuvat iPhonella ja iPadilla pystyssä ja vaakana tasaisin reunoin (pitkä otsikko rivittyy tai pienenee).
- [ ] Teksti erottuu vaaleaa taivasta ja tummaa seinää vasten (`Latauskuva.Luettava`); yksiköt pienellä ("340 m").
- [ ] Ajoitus pelin tapahtumista; osa katoaa sulkiessa ja uusintajuoksussa (ei jää kartan päälle).
- [ ] Avaimet `ui.fi.json`:ssa, kielivahti, pohjavahti, liikevahti ja `tarkista.sh` 0 virhettä; isännän testit läpi.
- [ ] QA-komento jokaiselle osalle; makuvalinnan kuvat omistajalle tarkistettuina täysikokoisina.

**Opit.**

- **20.10.2026, juoksupelin alkuteksti iPadilla liian leveä** (omistaja 18.28): yhden rivin "Peking, kesä 1914 · Kielletty kaupunki"
  latauskuvan suurella kirjainvälillä ylitti ruudun. Tee pitkästä otsikosta pohjan kaksirivinen muoto ja anna sivuväli ennen
  kuin näytät sen.
- **20.10.2026, Ohita-napin rajapinta** (omistaja 18.39): rinnakkaiset viestit Pelikoodarin kanssa ristesivät, ja runkoon tuli kaksi
  kutsutapaa (yhteensopivuusfunktio). Sovi nimi yhdellä viestillä ja odota vastaus, tai tee UI niin, että se kutsuu isännän
  olemassa olevaa funktiota ja piilottaa itsensä isännän tilasta (ei uutta riviä isännän tiedostoon).
- **20.10.2026, maalin suunta** (omistaja 20.09 "1 Lasinelio"): makuvalinta ratkesi samana iltana, kun kahdesta vaihtoehdosta tehtiin
  kokeiluhaara ja kaksi kuvaa yhdellä todistusajolla (simuvuoro ~10 min). PT: maali ja nuoli junaan yhdessä; versaali "340 M"
  korjattiin pieneksi yksiköksi.
- **20.10.2026, tyylikirjan kopio:** natiivin `tyylikirja.json` sisälsi pohjan (PYSÄYTYSKUVA), jota pelirepon lähteessä ei ollut;
  `--natiivi` olisi pudottanut sen. Vertaa pohjien avaimet kopioon ennen regenerointia.
- **Kirjasimet ja tyylit:** Kone-kirjasimessa ääriviiva ei piirry, joten luettavuus tulee `Latauskuva.Luettava`-varjosta; inline-
  `opacity` peittää USS-luokan (häivytys lapsiin); simun napautus ei osu himmennettyihin kehysnappeihin (`ui kehysnapit 0`
  skenaarion alkuun).
- **AVOIN OMISTAJALLE: kokoelmakortti kuvineen vai tekstinä?** – suositus: tekstinä (KORTTI-pohjan kuvat 0|1; aarteen kuva näkyy
  jo muistokuplassa juoksun aikana).

**Harmaan version valmiin lista:**

- [ ] Peli pelattavissa alusta maaliin ilman lopullista grafiikkaa; botti läpäisee.
- [ ] Ruudun osat pohjilla (Natiivi-UI yllä); kehys ja kujaverkko Lavastajalta (luku 4).
- [ ] Omistaja on nähnyt harmaan version isolla iPadilla KK:n kautta ja hyväksynyt tuntuman ennen grafiikkaa.

## 3. Faktat, tarina ja repliikit (rinnakkain)

Tämä osuus etenee harmaan version rinnalla; sen omistaa Sisältökirjuri.

### Kultainen polku (oletustapa)

1. **Faktapohja ensin, kuvaukset ja ääni viimeisenä.** Tutkimus, ei generointia. Osat: henkilöt, tapahtumat ja paikan kunto
   pelin hetkellä, arki, esinetarkistus, legendat, kuvalähteet; lopuksi epävarmojen tarkistus, joka ohittaa osien alkuperäiset
   merkinnät. Faktapohja on tausta ja valinnainen tietokerros, ei pelin aikana opetettavaa.
2. **Merkinnät joka väitteelle.** [V]/[1L]/[EPÄVARMA] ja [FIKTIO/LEGENDA] sekä tutkimuksessa [EI LÖYDETTY], [EI PELIIN]
   (totta mutta ei sovi sävyyn: väkivalta, kurinpito). Pelitekstiin menevät vain faktat ilman [EPÄVARMA]-merkintää; PYSYVÄSTI
   EPÄVARMA ei käy pelitekstiin. Kaksi itsenäistä lähdettä; yksi lähde → muotoile varovasti tai pois. Kiistanalaiset kohdat
   kirjataan, ei luokitella virheiksi.
3. **Aikaikkuna ja anakronismit.** Määritä hetken ikkuna ennen kirjoittamista (Olavinlinna noin 1495–1510, lapsi-Puyi 1912–1918)
   ja kirjaa kielletyt asiat: Olavinlinnassa omena (ensimmäinen varma istuttaja Suomessa 1539), haarukka, peruna, tomaatti,
   mekaaninen kello, lasi-ikkuna ja markkakolikko; juoksupelissä polkupyörä (1922), englanti ja Johnston (1919–), silmälasit
   ja letin leikkaus (1922). Turvallisten esineiden lista kirjataan myös (puulusikka, nauris, kaali, ruisleipä, talikynttilä).
   Aineistoaukko kirjataan avoimesti (Olavinlinnan omat tilit alkavat vasta 1539–43), ja analogiat merkitään arvioksi.
4. **Totta ja FIKTIO erikseen.** Jokaisessa tarinassa on kirjattu, mikä on historiaa ja mikä keksittyä (aarre, kätkeminen, kiinnijäänti);
   tietokerros sisältää kortin "Mikä oli keksittyä?" (kortti 12), jolloin pelaaja ei sekoita sepitettä faktaan.
   Elokuvan tai romaanin tuoma virhe merkitään "elokuva ≠ historia".
5. **Pelaaja astuu suoraan toimintaan.** Peli ei aloita historian esittelyllä (tornien nimet, vuosiluvut): tehtävä on arvoitus
   tai aarre, ja historia opitaan pelatessa; pelin aikana ei opeteta eikä kysellä. Arvoitus nojaa todellisiin yksityiskohtiin
   (Olavinlinna: 13 vaakunalaattaa, umpeen muuratut komerot, ikkunaton kappeli), ei luettelon muistamiseen.
6. **Repliikit.** Lyhyt, luonteva puhe, aikakauden mukainen mutta ymmärrettävä; 13+, ei kiroilua; ei väkivaltaa ihmisiä vastaan
   (irtipääsy, köyden katkaisu, töytäisy matalaan veteen), ei verta eikä aseita ihmisiä vastaan. Taulukko: id, huone,
   vaihe (esim. rauha, epäily, tutkii, etsii, hälytys, kiinni), repliikki, äänen ohje, merkkimäärä; yksi otto per rivi.
   Ei kaanonmuutoksia (ei uusia hahmoja ilman PT:tä).
7. **Pelaaja on sukupuoleton.** Pelaajaa puhutellaan "sinä"; englanniksi Fogg / you / they, ei he/she missään kohtauskuvauksessa,
   alt-tekstissä, kortissa tai vihjeessä. Sukupuoli vain toisten hahmojen nimikkeissä, joissa kanoni on selvä (vouti, kappalainen).
   Tarkista suomi ja englanninnettavuus erikseen (esim. "pikku vintiö", "varas" ovat sukupuolettomia).
8. **Pulun osuus ja tietokerros.** Vain hyväksytyt Pulun rivit (`livia-aani.md`); Pulun reunakuvaa, vihjelentoja tai äännähdyksiä ei ole
   Olavinlinnan pelissä (Raamattu, KAMERA JA VIHJEET). Tietokerros (drone-näkymä, lähteet) tarjotaan vasta lopussa tai pyydettäessä,
   eikä pelin aikana opeteta mitään (Raamattu, HISTORIALLISET KOHTEET 7.10.); pyyntönappia ei ole päätetty, ja nappi kuuluu
   Pelikoodarin osaan (luku 2). Uudet Pulun tekstit vaativat omistajan rastin Tekstit-osastossa.
9. **Lähdetarkistus paikallisesti ja alkuperäislähteistä.** Kun verkko tai botinsuoja estää sivun, ei kierretä: lataa vapaa
   PDF tai kokoteksti (esim. arkeologinen selvitys, Project Gutenberg) ja lue se; kirjaa sivunumerot tai rivit. Hakutulos-
   tiivistelmä merkitään "hakutulos". Tekoälyn tuottamia sivuja (esim. "AI-generated"-merkitty wikisivu) ei käytetä todisteena.
10. **Ikä ja ajanlasku oikein.** Muistelmien iät voivat olla kiinalaisia (vuosi = 1 v): "11 vuotta" = 9–10 v. Vuosiluvut
    gregoriaanisina, aina vuosi, johon fakta pätee (1912–1918 vs. myöhemmin). Luvut, jotka vaihtelevat lähteittäin: haarukka
    tai "noin".
11. **Historiaa kertova linssi: yksi virke per vuosi.** Esimerkkinä Kiinan dynastiat: kolme tarkistajaa kävi läpi 19 vuotta
    (nimet, pääkaupunki, tarinarivi, rajat); rivit hiottiin tarkistuksen jälkeen ("lähes neljän vuosisadan jälkeen" pois, koska
    laskutapa vaihtelee; "Tiibet valtaa Silkkitien ja Tarimin" liian vahva). Muutossarake kertoo, mitä tarkistus vaati.
12. **Riippumaton tarkistaja ennen PT:tä** (kultainen polku muista pohjista): tarkistaja ei näe kirjoittajan perusteluja, hakee omat
    lähteet ja ajaa tehtävän "oleta että jotain on pielessä". Raportti KORJAA / EPÄVARMA / OK väitteittäin.

### Tyypilliset virheet (tarkistajan lista)

1. **Anakronismi** (omena Savossa 1500, polkupyörä 1914, englanti 1914): tarkista jokainen esine ja tapa kieltolistaa vasten.
2. **Muistelma ≠ historia:** muistelma tai elokuva levittää virheen (imettäjän karkotus, Longyun rooli, "Pujie kertoo tasavallasta"):
   tarkista toisesta lähteestä ja merkitse "elokuva ≠ historia".
3. **Kiinalainen ikälaskenta** sekoitettu länsimaiseen.
4. **Yksi lähde esitetty varmana** ([1L] tai hakutulos pelitekstissä): pehmennä tai pois.
5. **FIKTIO esitetty faktana** (kätketty kalkki, hopea, komero): merkitse tietokerroksessa.
6. **Pelin aikana opetetaan** (vuosilukuja, nimiluetteloita repliikeissä): siirrä tietokerrokseen.
7. **Väkivalta tai verinen kuvaus** (kiinniotto, kurinpito, rautahiekkakakut): [EI PELIIN] tai pehmennys.
8. **Sukupuolitettu viittaus pelaajaan** englanninnoksessa (he/she).
9. **Yliveto** (laajuus: "valtaa Silkkitien ja Tarimin", "yksi suurimmista"): käytä lähteen sanaa tai "noin".
10. **Korjaus äänen jälkeen:** jokainen faktakorjaus äänitetyn rivin jälkeen maksaa uusintaotoksen; tarkista ennen lupaa.

### Sisältö-osuuden valmiin lista

Sisältö-osuus ei ole valmis ennen kuin kaikki kohdat täyttyvät:

- [ ] Aikaikkuna, anakronismi- ja kieltolista kirjattu (kohde ja hetki luvussa 1).
- [ ] Faktapohja: kaksi lähdettä per väite, merkinnät, [EPÄVARMA] ja [EI PELIIN] eritelty, aineistoaukot kirjattu.
- [ ] Tarina: totta ja FIKTIO eroteltu; arvoitus nojaa todellisiin yksityiskohtiin; ei historian esittelyä alussa.
- [ ] Repliikit taulukossa, merkkimäärät laskettu, sävy (13+, ei väkivaltaa ihmisiä vastaan) ja kaanon tarkistettu.
- [ ] Sukupuoli- ja käännettävyystarkistus tehty (suomi, englanti: Fogg / you / they).
- [ ] Tietokerroksen kortit (40–70 sanaa, lähteet, varmuus) ja kortti "Mikä oli keksittyä?".
- [ ] Riippumaton lähdetarkistus tehty, KORJAA-rivit korjattu, EPÄVARMA pehmennetty tai pois.
- [ ] PT:n tarkistus; uudet repliikit ja Pulun tekstit Tekstit-osastossa ja hyväksytty.
- [ ] Puheen merkkimäärä (puhutussa muodossa) ilmoitettu PT:lle; ääniluvat KK:n suoralla rivillä.
- [ ] Luovutusraportti: tiedostopolut, heikoimmat kohdat, pudotetut väitteet, huomiot kytkijöille.
- [ ] Retrospektiivi kirjattu luvun 7 oppeihin.

## 4. Näköisyys (mallit, valo, kamera)

Näköisyys tehdään vasta, kun omistaja on hyväksynyt harmaan version tuntuman (luku 2). Tavoite on tavoitekuva (luku 1); kamera
ja hahmon koko, katot ja maan sävy luvun 7 juoksupelin oppien mukaan. Uudet 3D-mallit vain Tripolla (Raamattu 11.7); tilattu
malli seurataan peliin asti. **Omistaja näkee valmiin näköisyyden:** pelikuva ja tavoitekuva rinnakkain ennen junaa KK:n kautta
(omistajan näkemiskerta 3).

### Lavastaja: rakennukset, tausta ja katottomat huoneet (Kielletyn kaupungin juoksupeli)

**Työvaiheet**
1. **Kehys ensin:** kaikki pohja.json-kehyksessä (glTF X itä, Y ylös, Z pohjoinen, origo Taihedian). Palatsin akseli on −2,0335°;
   mallit kierretään akselille, ja Lavastajan kehys (kk) ↔ pohja muunnetaan `peking_tausta.py`:n `kk2p`/`kk_kehyksessa`-funktioilla.
2. **Tarkat rakennukset** (A–M) omina malleinaan, LOD0/1/2 + törmäys. **Tausta** Codexin Peking-laatoista; tarkkojen mallien,
   huoneiden ja avausten kohdat tyhjennetään KORVAA-alueina (jalanjälki + vara, kolmiot leikataan reunoilla), ja alle tulee maa −0,02.
3. **Katottomat huoneet (havainnekuvat j9/j10):** avoimet-osat kujien varsille niin, että kujan puoleinen ulkoseinä tulee
   reunamuurin paikalle ja ovi aukeaa kujalle. Seinät syvän punaiset ja ristikot tummaa puuta (avoimet-v3). Sijoitus, ovet ja
   liitokset `avoimet_sijoitus.py` → `avoimet-sijoitus.json` (PK:n lukema muoto: huoneet[], liitokset[], avaukset[], kaistat[]).
4. **Jokaisella huoneella vähintään kaksi yhteyttä kujaan** (sivuovi + päätyovi liitoksella). Verkko karsii umpikujat, joten
   yhden oven huone jää saarekkeeksi. Tarkista taustan korkeuskartasta (lod0, 0,5 m, vapaa < 0,5 m, 1,2 m väljyys), että
   liitokset ja kujien päät ovat oikeasti auki, ja avaa tukot taustaan (avaukset).
5. **Katot kiinni seiniin:** Pekingin lähteessä sisämuurit ovat 7–8 m ja hallien seinät jäävät 0,5 m katon alle. Taustassa muurit
   madalletaan pohja.json-korkeuteen + 0,5 m, ja seinien yläkärjet jatketaan katon alapintaan. Kujilla, joilla botti tai nuoli
   kulkee ja lappeet näkyvät kujalle, hallit poistetaan kaistalta (kuja-75: 13,5 m) ja tilalle tulee katottomia huoneita.
6. **Luovutus:** paketti `_valmiit/<nimi>-vienti-<pvm>/` → JU vienti → PK kytkee (TaustaKansio, AvoimetKansio) ja ajaa eston →
   NS:n juna → PT:lle kuvapari pelin kulmasta (Blender-esikatselu, kamera kujan yllä juoksijan takana).

**Valmiin tarkistuslista**
- [ ] Ovet tarkistettu säteillä auki (kaikki neljä seinää) ja ovien paikat (x, z, suunta) PK:lla.
- [ ] Liitokset auki koko leveydeltä taustan lod0:ssa; PK:n testi oikealla pohjalla ja pelin estolla läpäisty.
- [ ] Ei kattojen suikaleita kujalla (kaistojen saumat avattu), ei leijuvia kattoja, muurit ≤ pohja-korkeus + 0,5 m.
- [ ] Kuvapari PT:lle samasta kulmasta (ennen/jälkeen), kuvatekstit kuvan ulkopuolella.

**Opit (20.10.2026)**
- Taustan kujat ovat noin 2 m sivussa pohja.json:n kujista: liitokset piirretään taustan korkeuskartasta, ei pohjasta.
- Lyhyet tarkistukset (pohja.json-rakennukset oven edessä) eivät riitä: taustassa voi olla rakennus, jota pohjassa ei ole.
- Kärkikohtainen madallus litisti viereisten hallien räystäät; madalla vain kasvot, joiden kaikki kärjet ovat muurilinjan
  kohtisuoran etäisyyden sisällä.
- Mikä tahansa korkeuden "korjaus" tarkistetaan pelin kulmasta ennen lähetystä: v10:n ensimmäinen versio näytti huonommalta
  kuin v9, joten valinta tuotiin PT:lle ennen jatkoa.

**Näköisyyden valmiin lista:**

- [ ] Kamera ja hahmon koko tavoitekuvan mukaiset (juoksupeli: Puyi noin 1/6 kuvasta; kujilla kapea, aukioilla laaja kuvakulma).
- [ ] Katot kiinni seinissä tai katottomat huoneet kujan varrella; ei leijuvia kattoja; maalaatat vaaleat.
- [ ] Jokainen tilattu Tripo-malli näkyy pelissä (ei jää ämpäriin tai vientiin).
- [ ] Pelikuva ja tavoitekuva rinnakkain näytetty omistajalle KK:n kautta ennen junaa.

## 5. Äänet

### Äänittäjä

Hahmoäänet, kertoja William ja tehosteet; musiikki on aina Lyriaa (Raamattu 5.15). Äänet generoidaan vain luvalla (Raamattu, UUSIA ÄÄNIÄ EI GENEROIDA).
Kertojan ja hahmojen putki: `kertojan-teksti-ja-aani.md`.

1. **Lukutarkistus ensin.** Selvitä kytkijältä, lukeeko peli tekstin jo itse (`KortinLukija` / `Puhe.Lue`); vain silloin, kun tiedosto
   tarvitaan, jatka (`kertojan-teksti-ja-aani.md`, kultainen polku 1). Tarkista myös ämpärin manifesti: onko ääni jo olemassa.
2. **Lupapyyntö tekstinä PT:lle.** Sanatarkat tekstit, palvelu, leikemäärä ja merkkimäärä puhutussa muodossa; lupa tulee vain KK:n
   suoralla "OMISTAJAN PÄÄTÖS klo …" -rivillä. Jos raja on pelkkien tekstien merkkimäärä, tageja ei lasketa.
3. **Otto.** Oikea ääni ja malli, `language_code: fi`, `speed` natiivisti, yksi otto per repliikki (dialogi yhtenä ottona, Raamattu 5.12);
   raaka talteen heti (Raamattu 5.13).
4. **Kuuntelu ennen omistajaa.** Gemini kuvaa jokaisen oton sokkona, Whisper tiedoksi (Raamattu 9.11). Heikko kirjain (esim. j sanassa
   "Majesteetti") näkyy litteroinnissa; se on korvakuuntelun ja PT:n päätettävä, ei uusinta omin päin.
5. **Portti ja vienti.** `aaniportti.py` läpi, `vie-paketti.sh`; korjaus aina uudelle polulle (`-v2`), ilmoitus kytkijälle.
6. **Luovutus.** PT:lle enintään 3 riviä: polut, sha, lupa käytetty / jäljellä.

**Hiiviskely ja musiikki.** Hiiviskelyssä ei musiikkia; kantele löydössä ja lopussa. Musiikki tehdään Lyrialla lyhyellä, pelkästään myönteisellä
kehotteella (Raamattu 5.16), muuten lupa omistajalta.

**Äänitehosteet (Raamattu 5.27).** Soundly Pro ja Sonniss ensin; Freesound (CC0 / CC BY) vain aukkoihin alkuperäisinä ja robots.txt:n sallimana.
Jokainen ääni kuvataan sokkona ennen peliä; yksittäiset valmiit tehosteet, ei koneellista leikkausta kuuntelematta. Jos Soundly-GUI ei ole
käytettävissä (omistajan Space), älä kierrä: käytä Sonniss/Freesound-hakua (workflow `aanihaku`).

**Huudot ja avaus (juoksupeli).** Eri puhujat eri äänillä äänipankista (`tools/aanipankki/rekisteri.json`); älä soita samaa ääntä kahden hahmon
rooliin. Hahmolle, jolle ei ole sopivaa ääntä, etsi ensin pankista ja vanhoista otoista; uusi otto vain luvalla. AVOIN OMISTAJALLE: saako huutoja
venyttää jälkikäteen (atempo)? – suositus: ei, pidempi huuto generoidaan suoraan ohjeella.

**Tarkistuslista**
- [ ] Ääni ja malli oikein, kieli `fi`, raaka talteen, ei lupaa ylitetty.
- [ ] Sokkokuvaus tehty; heikot kirjaimet kirjattu PT:lle.
- [ ] Ääniportti läpi, vienti uudelle polulle, polut ja sha PT:lle / kytkijälle.

## 6. Testaus ja juna

1. **Automaattiset testit ja botti** jokaisessa erässä (botin läpäisy ennen läpipeluuta, luku 2); simu vain uudelle tekniikalle,
   pyydettyihin kuviin ja yöjunaan (Raamattu 9.2).
2. **Todistuskuvat pelinäkymästä** pelin omasta kulmasta; latausruutu ei kelpaa todistuskuvaksi (luku 7, juoksupelin opit 20.10.).
3. **Omistajan kolme näkemiskertaa tehty** (luvut 1, 2 ja 4) ennen junaa.
4. **Juna:** Natiiviseppä vie runkoon; kaikki yhteen avoimeen junaan. Ominaisuus, jonka pelaaja näkee vasta UI:n kautta, menee
   junaan samassa commitissa UI:n kanssa (luku 2, Natiivi-UI).

**Koko pelin valmiin lista:**

- [ ] Tavoitekuva, harmaa versio isolla iPadilla ja valmis näköisyys rinnakkain tavoitekuvan kanssa näytetty omistajalle KK:n kautta.
- [ ] Lukujen 2–5 valmiin listat täytetty.
- [ ] Botti ja läpipeluu läpi; todistuskuvat pelinäkymästä, ei latausruudusta.
- [ ] Juna: Natiiviseppä vienyt runkoon; PT kirjannut.
- [ ] Opit kirjattu lukuun 7 (paketti on valmis vasta, kun opit on viety pohjaan, Raamattu 8.1).

## 7. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui pohjassa. Roolien omat opit ovat myös niiden osioissa (Natiivi-UI
luvussa 2, Lavastaja luvussa 4).

*(Rivit 19.10.2026 on siirretty lokista ja muistista omistajan päätöksellä 19.10. klo 15.35; uusia sääntöjä ei ole.)*

- **20.10.2026, juoksupelin kamera ja hahmon koko.** Puyin pitää olla noin 1/6 kuvasta. Kujilla kapea kuvakulma (noin 40°), kamera
  7,5 m ylhäällä ja 8 m takana; aukioilla laaja kuvakulma. Muuttuu: kameran etäisyys ja hahmon koko näkyvät jo tavoitekuvassa
  (luku 1) ja näköisyyden valmiin listassa (luku 4).
- **20.10.2026, juoksupelin katot.** Katot kiinni seinissä tai katottomat huoneet kujan varrella; ei leijuvia kattoja (Lavastajan
  työvaiheet 3 ja 5, luku 4). Muuttuu: näköisyyden valmiin listassa.
- **20.10.2026, juoksupelin maa.** Maalaatat vaaleiksi. Muuttuu: näköisyyden valmiin listassa.
- **20.10.2026, Tripo-mallit.** Tilattu Tripo-malli ei ole valmis ennen kuin se näkyy pelissä; tilaus seurataan peliin asti.
  Muuttuu: näköisyyden valmiin listassa.
- **20.10.2026, todistuskuva.** Latausruutu ei kelpaa todistuskuvaksi; kuva otetaan pelinäkymästä. Muuttuu: luku 6.
- **19.10.2026, Puyin huudot (juoksupeli).** Omistajan linjaus: huudot lyhyiksi (esim. "Voi ei! Maljakko maksoi miljoonia!"),
  usein sidottuna kuplan tarinaan, samalle esineelle useita versioita ja hinta vain harvoin; puhuja on juokseva lapsi, joten
  vaihtelu ja hauskuus painavat enemmän kuin täydellinen faktatieto; toistuvalle esineelle lyhyt yleishuuto ("Voi ei taas").
  Hidasti: omistaja ei ymmärtänyt huutoa ilman kuplan sisältöä. Muuttuu: huutorivin mukana näytetään aina uneksinnan
  (kuplan) teksti ("Uni: …, teksti: dynastia + vuosi"); uusia huutoeriä ei ennen kuin erät 1–2 on testattu pelissä. Lähde:
  loki "PAATOS 19.10.2026 klo 09.41", "PYYNNOT 19.10.2026 klo 10.2x–10.27", "PAATOKSET 19.10.2026 klo 12.11–12.23"; muisti
  huudot-uneksinnan-teksti-mukaan.
- **19.10.2026, Puyin ääni.** Hidasti: koeäänet kuulostivat liian vanhoilta (6 oli lähimpänä); lapsi juoksee huutaessaan,
  joten tunnetagi huomioi sen. Valittu 08 Kavya (bA58y3FqVI6b6gTNh0oT), tagi `[shouting] [panicked]`, `speed` 1,2 natiivisti,
  suomi pakotettuna, ei jälkikäsittelyä; huudon alut ("Oho!", "Auts!", "Hoplaa!", "Noin!", "Katos vaan!", "Hups!", "Sori!"
  iloisena kiljahduksena) valitsi omistaja kuuntelemalla. Hahmoäänille ei ole omaa pohjaa. Lähde: loki "PAATOKSET
  19.10.2026 klo 11.08–11.23" ja "klo 11.41–11.45"; muisti aanet-ei-kysymyskortteja.
- **19.10.2026, muistokuplan kuvatilaus (Codex).** Hyväksytty tyyli: realistinen värivalokuva, esine ja hahmo keskimmäisellä
  noin 60 %:lla, reunoilla vähintään 20 % rauhallista taustaa (peli häivyttää yhdellä soikiomaskilla, ei alfaa kuvaan),
  vaaleat ilmavat sävyt, oikea ympäristö, läheltä (pehmeä syväterävyys) ja kevyt vastavalo, paljon harmaantuneita
  vanhoja opettajia; muistotyypit vaihtelevat (sali ja jalustalla esine ilman ihmisiä, oppitunti, lahja, juhla). Hidasti:
  kuplatilaus "läheltä" ilman mittaa → 10 uusintaa (A-erä 10/12 hylättiin PT:n katselmuksessa). Muuttuu: tilaukseen mitta ja
  pohjakuva. Lähde: loki "PAATOKSET 19.10.2026 klo 09.36–09.37", "klo 09.47", "klo 09.5x–10.03", "klo 10.58–11.02";
  KK-katselmus (scratchpad putket-lapikaynti-20261019, kuvat).
- **19.10.2026, kiinankieliset kirjoitukset.** Muuttuu: pelissä näkyvä kiinankielinen kirjoitus vain tarkistetuista oikeista
  teksteistä (SK:n lista Codexille), ei generoituja merkkejä; kiinan ilmaukset (shifu) sivuhuomiona. Lähde: loki "PAATOS JA
  PYYNNOT 19.10.2026 klo 10.38".
- **19.10.2026, juoksupelin äänitehosteet.** Hidasti: aanet-v1 (61) ja v1.1 (7) leikattiin koneellisesti Freesoundin
  esikuuntelu-mp3:ista AST-tunnistimen valinnalla, kukaan ei kuunnellut, ja omistaja kuuli virheet ensin (puuaskel =
  korkokengät, jade = lusikka kivimukissa). Muuttuu: Soundly Pro ja Sonniss ensin, Freesound vain aukkoihin alkuperäisinä,
  valmiit yksittäiset tehosteet, tekoäly kuvaa jokaisen äänen sokkona ennen peliä (Raamattu 5.27). Luvun 5 rivi korjattu (PT 19.10.). Lähde: loki "OMISTAJA: ÄÄNITEHOSTEIDEN
  OLETUSTAPA HYVÄKSYTTY (19.10.2026 klo 14.35)"; muisti aanitehosteet-kuuntelu-ennen-omistajaa.
- **16.10.2026, lapsi-Puyin faktapohja 1912–1918.** Neljä Sonnet-tutkijaa; noin 120 riviä merkittiin [EPÄVARMA], koska muistelmaa
  ja Johnstonia ei saatu kokotekstinä; vain merkinnätön kelpaa peliin. Muuttuu: aikaikkuna ja ikälaskenta kirjataan ennen tutkimusta
  (luvun 3 kultainen polku 3 ja 10).
- **16.10.2026, Kiinan dynastiat (19 vuotta, 3 tarkistajaa).** Rivit hiottiin tarkistuksen jälkeen; AI-merkitty wikisivu jätettiin
  todisteista pois. Muuttuu: yksi virke per vuosi ja muutossarake (luvun 3 kultainen polku 11).
- **9.10.2026, Olavinlinnan repliikit (16 uutta, 552 merkkiä).** PT korjasi yhden bluffaavan repliikin; ääntä ei generoitu ennen lupaa.
  Muuttuu: repliikkitaulukon muoto (id, vaihe, ääniohje, merkkimäärä) on vakio.
- **7.10.2026, Olavinlinnan lähdetarkistus.** Pilvisessio ei avannut lähdesivuja; paikallinen tarkistus luki arkeologisen
  selvityksen PDF:n ja Härön artikkelin OCR:llä. Muuttuu: estetty sivu ei ole este, jos vapaa PDF tai kokoteksti on saatavilla
  (luvun 3 kultainen polku 9).
- **7.10.2026, Olavinlinnan sukupuoli- ja käännettävyystarkistus.** Suomeen ei tarvittu muutoksia; englanninnoksen vaaranpaikat
  löytyivät (he/she, hahmoetiketit). Muuttuu: tarkistus kuuluu jokaiseen historiapeliin (luvun 3 kultainen polku 7).
- **7.10.2026, Olavinlinnan faktapohja.** Anakronismit (omena, haarukka, peruna) löytyivät vasta tutkimuksessa. Muuttuu: kielto-
  ja turvalliset-lista tehdään heti alussa (luvun 3 kultainen polku 3).

## Lähteet

`docs/raportit/ehdotus-olavinlinna-seikkailu.md`, `faktapohja-olavinlinna-1500.md`, `olavinlinna-tietokerros-kortit.md`,
`olavinlinna-tietokerros-lahdetarkistus.md`, `olavinlinna-repliikit-puuttuvat-20261009.md`,
`olavinlinna-repliikit-sukupuoli-kaannettavyys-20261007.md`, `pelattavuusmalli-olavinlinna.md`,
`kiinan-dynastiat-faktatarkistus-20261016.md`, `docs/kohtaukset/kiinan-dynastiat/tarinarivit-20261016.md`,
`docs/kohtaukset/juoksupeli/puyi-lapsuus-faktat.md`, `docs/kohtaukset/oppaan-esittelyt/tyokalut/ohje-puyi-agentille.txt`,
`docs/moduulit/tuotantopohjat/kertojan-teksti-ja-aani.md`; Raamattu: HISTORIALLISET KOHTEET SEIKKAILUINA, OLAVINLINNAN PELIN
TOTEUTUS, OLAVINLINNA OIKEANA VUODEN 1499 LINNANA, OLAVINLINNA TAUOLLA, HETKET JA TARINAT, MUUT MAANOSAT VÄHITELLEN, TUOTANTOPOHJAT,
TUOTANTOPOHJIEN SANASTO; loki: KIELLETYN KAUPUNGIN JUOKSUPELI (16.10. 18.18), PAATOKSET 20.10.2026 klo 22.43: HISTORIAPELIN POHJA
KATTAA KOKO PELIN.
