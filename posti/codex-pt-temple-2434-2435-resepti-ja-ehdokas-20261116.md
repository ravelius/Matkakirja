# Codex → PT/KK: Temple-tornin halkaisukokeen resepti ja seuraava ehdokas (#2434–2435)

**Toimitus 16.11.2026:** yksi koontitiedosto toteutuneesta Temple 2251-kokeesta ja yksi ehdokas alkuperäiseltä 19 kohteen listalta. Tämä kokoaa aiemman reseptin 2256 ja ehdotuksen 2257 tarkistettuun muotoon; vanhoja kuvia tai malleja ei tuotettu eikä lähetetty uudelleen. Nyt: 0 Tripo-ottoa, 0 renderöintiä, 0 krediittiä, ei peli-integraatiota eikä Finna-hakuja.

## 1. Mitä kokeessa tehtiin ja mikä hyväksyttiin

Blenderissä rakennettiin aidosti avoin puolikas Grosse Tourista. Sen rakenteellista ohjainkuvaa käyttäen tehtiin yksi uusi ImageGen-mallikuva. KK hyväksyi tämän kuvan, minkä jälkeen **Tripolle annettiin yksi 1024 × 1536 PNG Single Image -syötteenä**. Pitkä englanninkielinen kehote tämän tiedoston lopussa kuului ImageGen-vaiheeseen. Tripo-jobin loki ei kirjaa erillistä Tripo-tekstikehotetta eikä monikuvasyötettä.

KK hyväksyi 15.11. klo 19.40 **tekniikkakokeen**: näkyvien neljän salin lattiat, keskipilarit, kaaret, kierreportaiden askelmat ja ullakon rakenteita syntyi myös oikeana geometriana. Sama näkyi tekstuurittomassa tarkistuskuvassa. Kameran tulee pysyä leikkauspuolella; yhden kuvan perusteella syntynyt takajulkisivu on Tripon tulkintaa. Tämä päätös ei yksin hyväksynyt historiallisia mittoja, kaikkia kulkureittejä tai raskasta koemallia peliin.

Tämä resepti koskee nimenomaan alkuperäistä 2251-koetta. Myöhempi 2271-kevennys ja nykyinen 2403-sisätilojen puhdistustilaus ovat erillisiä töitä eikä niiden vaiheita esitetä alkuperäisen kokeen syötteinä.

## 2. Rakenteellinen ohjain ennen mallikuvaa

Toteutunut koodi: `output/tripo-halkaistu-koe-2243-20261115/work/temple-guide-v2.py` projektijuuren alla.

1. Käytä paikallista XY-pohjaa, Z ylös, origo keskellä maan tasossa. Rakenna neljä päällekkäistä salia, yksi ullakko, kussakin salissa yksi keskipilari ja luettavat holvikaaret. Kokeen tasot olivat 0 / 7 / 13,5 / 19,5 / 24 m, pääkaton huippu 39 m ja kulmakartioiden huiput 34 m. Nämä ovat prototyypin oletuksia: lähteiden 39/50 m-ristiriitaa ei ratkaistu eikä ylimääräistä 11 m kerrosta lisätty. Petite Tour, kellari, kalusteet ja vankilaväliseinät jätettiin pois.
2. Näytä portaassa oikeat kiertyvät askelmat keskiakselin ympärillä. Avaa kulmatornien pyöreät sisätilat myös päämuureihin ja välipohjiin. Tämä oli ohjaimen v2-korjaus: pelkkä erillinen portaikko jäi muuten päämuurin taakse. Neljän salin oviliittymät olivat likimääräisiä; niitä ei pidä muuttaa lähdefaktoiksi.
3. Tee diagonaalinen pystyleikkaus **x=y**, normaalina `(1,-1,0)` origon kautta; säilytä **x≤y**. Etupuolikas poistettiin muureista, lattioista, holveista, pilarista, portaista ja katosta. Sulje rakenteellisten leikkausreunojen paksuuspinnat, säilytä huoneet ja portaikko avoimina. Toteutus käytti `bisect_plane`-arvoja `dist=0.00001, clear_outer=True, clear_inner=False`, leikkausreunalle ehtoa `abs(x-y)<0.0001` ja `holes_fill`-toimintoa.
4. Älä peilaa rakennetta. Kuvassa kierreportaikko oli vasemmalla ja pieni huonetorni oikealla. Tämä on paikallinen kuvasuunta, ei varmennettu maantieteellinen ilmansuunta. Näitä Blender-ohjaimen akseleita ei saa käyttää sellaisenaan myöhemmän GLB:n tai pelin halkaisutason arvoina.

Holvimuodot, välipohjien paksuudet, askelmäärä ja ovien yksityiskohdat olivat havainnollistavia. Rungon koemitta 13,5 m, seinä 2,27 m, sisäleveys 8,96 m sekä kulmatornit Ø5,5 m keskuksissa ±6,75 m antoivat 19,0 m ulkorajan. Näitä ei esitetä ratkaistuina historiallisina mittoina.

## 3. Syötekuvan täsmällinen kuvakulma ja valaistus

**Ohjaimen kamera:** ortografinen, sijainti `(48,-58,39)`, kohde `(0,0,19)`, `ortho_scale=45`, kuvakoko 1024 × 1536. Koko torni huippuineen mahtui kuvaan. Leikkauspinta oli hieman viistossa, jotta salien syvyys, pilarit ja portaiden kiertyminen näkyivät samanaikaisesti.

Ohjaimen asetukset: Blender Workbench, 4 säiettä, 16 AA, `paint.sl`, materiaalisävyt, varjot pois, cavity BOTH (ridge 0,7 / valley 1), Standard, tausta `(0.91,0.91,0.91)`. Näitä ei ajettu uudelleen tätä dokumenttia varten.

Ohjaimesta tehtiin yksi kokonaan uusi ImageGen-kuva: sama siluetti, leikkaus, neljä salia ja portaiden puoli; valkoinen tausta, vaalea lämmin kivi, tummat liuskekatot, hillitty puu ja pehmeä valo myös huoneisiin. Ei alustaa, ympäristöä, ihmisiä, tekstiä, kalusteita tai voimakkaita mustia syvyysvarjoja. Rakenne ja sisätilan syvyys ovat keskeisiä, pelkkä pintakuva ei korvaa niitä.

Toteutunut hyväksytty syöte: `temple-cutaway-v1.png`, SHA-256 `92a5974331f3f881b88ba585443adb5e63e9b46c4dddb52272b58c34fc06f7ec`. ImageGen-job `exec-ebc47564-fd2b-4b4b-95d9-80acea0d1d3a`; sen rahahinta jäi aiempaan lokiin tuntemattomaksi. [Aiempi mallikuvatoimitus](https://github.com/ravelius/Matkakirja/blob/7367d2fbc204ec4e5b5a25cbd49ab0b632b8e771/posti/tripo3d-kk-temple-2248-halkaistu-referenssi-20261115.md).

## 4. Tripolle annettu aineisto ja toteutuneet asetukset

| Kohta | Toteutunut 2251-koe |
|---|---|
| Syöte | Yksi KK:n hyväksymä PNG, 1024 × 1536; ei kuvasarjaa |
| Työtila/malli | HD Model / Single Image / H3.1 Best Quality |
| Geometria | UltraMeshQuality ON, Triangle, tavoite 2 000 000 kolmiota |
| Tekstuuri | 8192; PBR ON; Remove Lighting ON |
| Muut | Generate in Parts OFF; AI Complete OFF |
| Job | `17ddf794-b654-41f4-a5cb-c07aac61c203` |
| Ajo | 15.11.2026 klo 19.21.34 EET; valmistuminen ja arkisto havaittu 19.28.12 |
| Kulutus | Yksi otto, 65 krediittiä; 15 425→15 360 |
| Alkuperäinen tulos | 1 868 577 kolmiota; 72 270 664 tavua; värikuva 8192², normaali- ja metalli/karheuskartat 4096² |

Tarkka alkuperäinen GLB säilytettiin ennen johdannaisia. SHA-256: `5c7114ffba86b69ff9fe8e128c0e9b221f19b71845c0d6b74607e556dbdebe3d`. [Kokeen tulos ja kuvat](https://github.com/ravelius/Matkakirja/blob/b594ad91b7fbbf1b74294552dc0a3d81caa4bc9e/posti/tripo3d-kk-temple-2251-tulos-20261115.md). Tämä kertoo toteutuneen kokeen; sama tulos ei ole takuu seuraavassa kohteessa. Toinen Temple-otto ei kuulu tähän tilaukseen.

## 5. Toteutuneet tarkistuskuvat — eri kamerat kuin syötekuvassa

Tripo-mallin tarkistus tehtiin erillisessä näyttökoordinaatistossa: mallin etu oli glTF +Z / Blender −Y. Malli sovitettiin tasaisesti 39 yksikön näyttökorkeuteen (`scale=39.69904631729365`, siirto `[-0.006663353182375431,-0.021807929500937462,0]`). Ei peilausta eikä historiallisen suunnan varmistusta. Kaikki kamerat olivat ortografisia:

| Näkymä | Kamera | Kohde | Ortho scale | Pinta |
|---|---|---|---|---|
|01 leikkaus edestä|(0,−90,20.2)|(0,0,19.5)|46|tekstuuri|
|02 viisto saleihin|(36,−75,33)|(0,0,18)|48|tekstuuri|
|03 portaikko läheltä|(−15.872970028380408,−65,14)|(−9.872969627380371,0,13.5)|31|tekstuuri|
|04 ulkopuoli takaa|(0,90,21)|(0,0,19.5)|46|tekstuuri|
|05 portaiden geometria|sama kuin 03|sama kuin 03|31|ilman tekstuuria|
|06 sisuksen geometria|sama kuin 02|sama kuin 02|48|ilman tekstuuria|

Tarkistus osoitti näkyvää sisägeometriaa. Se ei osoittanut kaikkien holvikuorten jatkuvuutta, ovien ja ikkunoiden läpäisevyyttä, törmäysgeometrian toimivuutta tai kävelyreittien jatkuvuutta. Suljettuja oviaukkoja, umpinaisia ikkunoita, lähes tasaisia katon alapintoja ja reliefimäistä puuta jäi. KK hyväksyi nämä tekniikkakokeen rajoiksi leikkauspuolelta katsottaessa. Tulevan kohteen lähteet, näyttökamera ja leikkaustaso on päätettävä ennen omaa mallikuvaa; tämä koonti ei käynnistä sitä.

## 6. Ehdokas 19 kohteen listalta: yksi rajattu Turun linna

**Turun linna — itäpää ja eteläsiipi yhtenä rajattuna kokeena:** alkuperäisessä 19 kohteen listassa mukana; aiempi lähdekatselmus yksilöi Nyströmien mittausleikkauksen `ArkMP:1903_014` (Aallon arkisto, kuvan aiemmin kirjattu oikeusmerkintä Public Domain / PDM 1.0), joka soveltuisi huoneiden syvyyden ja kerrosten avaamisen pohjaksi; piirroskuvan luettavuus, tarkka sisältö ja valitun rakennusvaiheen sopivuus on vielä katsottava vastaanotetusta kuvasta.

Ehdokkaita on tarkoituksella yksi, ei kolmea: [KK:n aiempi valinta 4b2260ceb9](https://github.com/ravelius/Matkakirja/blob/4b2260ceb95bbbe1369853fe6620c13892741642/posti/paatoimittaja-codex-2257-valinta-turku-20261115.md) rajasi seuraavaksi tämän Turun kokeen ja kielsi uusien ehdokkaiden hakemisen. Kronborg poistettiin, koska käytettävissä oleva piirros esitti kappelin alttariseinää, ei linnan leikkausta; Hämeen päälinnan täsmälähteen oikeusmerkintä oli CC BY-NC. Niitä ei nosteta nyt takaisin ehdokkaiksi. [Täsmällinen 19 kohteen lista](https://github.com/ravelius/Matkakirja/blob/c3b6658d0a1c81f67325c963815b880c9730348b/posti/paatoimittaja-codex-2257-19-kohteen-lista-20261115.md).

Tämän koonnin lähdearvio perustuu säilytettyihin 15.11. tietuehavaintoihin ja päätöksiin, ei uuteen kuvan tai lisenssin tarkastukseen. **Tässä koonnissa ei tehty uusia Finna-hakuja.** Aiemman 15.11. lähdekatselmuksen lokit kuitenkin kirjaavat Turun ja Hämeen Finna-tietuesivujen avaamisen; piirroskuvia ei ladattu eikä katsottu. Myöhemmin saapunut KK:n Finna-kielto säilyy voimassa. Aiemman päätöksen toimitustapa pysyy: SK etsii sallitusta Commons-lähteestä sopivan vapaan piirroksen, tai KK järjestää omistajan lataaman PD-kuvan. Kun kuva on vastaanotettu, arvioidaan leikkaustaso, kerrokset, holvit, portaat, luettavuus, rakennusvaihe ja arvioksi jäävät osat. Ennen mallikuvaa KK päättää myös pelin näyttötavan: kamera leikkauspuolella, osien lähikuvat ja niissä kerrottavat tapahtumat. Leikkaustaso valitaan tämän mukaan. KK päättää lähteestä ja seuraavasta vaiheesta; hyväksytty lähdekuva ja referenssivertailu tarvitaan ennen mahdollista erikseen sallittavaa yhtä Tripo-ottoa. Nykyinen #2435 on ehdotus, ei lupa mallikuvaan tai Tripo-ajoon.

## 7. Muuttamaton toteutunut ImageGen-kehote

Alla oleva teksti annettiin **ImageGenille rakenteellisen ohjainkuvan kanssa**, ei kirjattuna tekstisyötteenä Tripolle:

```text
Generate a new photorealistic architectural CUTAWAY reference of the medieval Grosse Tour du Temple in Paris, using the supplied structural guide as the exact camera, silhouette and floor-count guide. This is an approximate structural prototype, not an authoritative historical reconstruction.

Keep the exact half-building diagonal vertical cut: the entire foreground half is physically removed, revealing the interiors with real depth. Preserve the unmirrored arrangement: narrow spiral-stair tower on the LEFT, cut round cabinet/chamber turret on the RIGHT, the principal hall in the middle. Do not draw a painted facade or a flat infographic. Keep the complete object in frame on pure white background, no base pedestal, street, grass, adjacent Petite Tour, people, labels or text.

Exactly FOUR vaulted main halls stacked vertically: the lowest hall begins at ground level, above it three further halls. Preserve the guide's approximate 7,6.5,6,4.5m hall intervals. Four clearly readable floor plates at the bottoms of these halls and the attic floor above the fourth. Each hall has four groin-vault bays supported by ONE central stone pillar; the diagonal cut reveals the cut pillar and two bays. Preserve the vaulted ceiling forms with restrained stone ribs. No extra storeys, no cellar, no floating intermediate floor, no split levels, no furniture, no prison partitions.

Above the FOURTH hall: a SINGLE EMPTY ATTIC inside the tall steep four-sided PYRAMIDAL roof, with sparse timber rafters and no internal additional floor. The guide's roof is open along the diagonal cut. A narrow low parapet/wall-walk (guette representation) goes around the attic base. Corner turrets have steep slate conical roofs, also cut open. Central apex is roughly39m in this prototype, corner cone apex34m; do not add an11m compensation storey. Historical39/50m disagreement is unresolved and must not be solved by inventing geometry.

The LEFT cylindrical cutaway stairwell MUST visibly contain a continuous ascending stone SPIRAL STAIR around a slender central newel. Show the rising steps wrapping around the central support, with openings to the four main hall levels, exactly in the guide's location. No ladder, no straight stair, no four flat shelves mistaken for a spiral, no blank closed wall hiding the stair. The right cut turret contains small circular chambers aligned with the four hall floors, not stairs.

Materials: restrained medieval pale warm-gray limestone, larger smooth light stone at the sliced faces so the thick structural walls and floor plates are readable; worn but not rough/noisy or ruined. Vaults and pillars are solid masonry. Dark charcoal-gray slate external roof surfaces, sparse warm brown attic timber. Small simple recessed windows as in guide. Smooth clean section cuts, no broken rubble. Soft neutral ambient light reaching all four halls and the stairwell, subtle depth shading only, no dramatic black interior. Match this precise structural arrangement and framing faithfully; use detail only to clarify masonry and construction.
```

## Tarkistusjälki ja muut työrajat

Projektijuuri: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2`.

- Toteutunut ohjain ja oletukset: `output/tripo-halkaistu-koe-2243-20261115/work/temple-guide-v2.py` ja `guide-assumptions-v2.json`.
- Alkuperäinen mallikuva, kehote ja loki: `output/tripo-halkaistu-koe-2243-20261115/temple-cutaway-v1.*`.
- Tripo-job, muuttumaton GLB, arkistotarkistus ja kamerat: `output/tripo-halkaistu-koe-2243-20261115/tripo-2251/`.
- Aiempi resepti 2256: `recipe-2256/RECIPE.md` samassa koehakemistossa; toimituscommit `9b289b414aaf2ebd8e0175402dc3af0fcdb8fa48`.
- Tämän koonnin tarkistus: `output/temple-resepti-2434-2435-20261116/historical-source-audit.json`; kaikki 15 aiempaan SOURCES.json-luetteloon kuulunutta tiedostoa vastasivat tallennettuja SHA-256-tiivisteitä. Koodi, job-loki, hyväksynnät ja kamerat luettiin. Uusia kuvia tai malleja ei ajettu.
- Nykyinen tilaus: `cc9f8d8e0f36e3c80b68f971d576514106f810c1`; aloituskuittaus `b7e6bd2132079ce9d0285424ac3aee0b1348bf8c`. Aloitusaika ja varmennettu postitoimitusaika tallennetaan erikseen checkpointiin ja toimituskuittiin.
- #2432–2433: Hallgrim 2421:n liitoskuvaehto on KK:n mukaan täytetty ja malli hyväksytty vientiin sellaisenaan (`0c571bdb9e4857db50ebe5ca4b741408a61979c0`); Parthenon 2416 v2 on hyväksytty. Lavastajan paketointi ei vielä todista peli-integraatiota. Oma aiempi QA säilyy historiassa.
- Temple 2403:n raskas sisätilakorjaus odottaa erillistä PT/JU-aikaa. Grand Châtelet A/B/C (3/3 ottoa) ja Colosseumin kitkentä v1 odottavat KK:ta; ei toimia niihin tässä toimituksessa.
