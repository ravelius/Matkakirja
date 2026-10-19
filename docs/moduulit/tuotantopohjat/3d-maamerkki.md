# Tuotantopohja: 3D-maamerkki

*(LUONNOS 17.10.2026, Linnanrakentaja, PT:n toimeksianto. Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu
vain nykyisten ohjeiden ja luovutusten opit; uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa.
Mallin osuuden omistaa Linnanrakentaja; valo, sijoitus ja kytkentä täydentävät omat osansa otsikoilla "TÄYDENTÄÄ: <rooli>".
PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

3D-maamerkki = oma Blender-malli rakennuksesta tai rakennelmasta, joka näytetään Googlen fotorealististen laattojen keskellä
(tai omana kaupunkitilanaan, kuten Peking) ja jonka alta Googlen laatat leikataan pois. Pohja kattaa päätöksen tehdä malli,
lähteet ja oikeudet, mittasuhteet, mallin ja LOD-tasot, materiaalit, tavoiteluupin ja yhteensovituksen Googlen laattoihin.
Se ei kata pallokierroksen tekstejä (`paakaupungin-avaus.md`), museon sisätiloja (`taidemuseon-maa.md`) eikä linssejä.

**Uudet mallit Codexille (Raamattu, 3D-MALLIT CODEXILLE, 15.10.2026):** uudet maamerkit tilataan jatkossa Codexilta
postilaatikon kautta; Claude tekee kytkennän, laattojen viennin ja tarkistukset. Louvre tehtiin vielä Claudella vertailuksi.
Tämä pohja pätee molempiin: Codexin malli kulkee samat portit (luvut 2.5–2.8 ja valmiin määritelmä).
Codexin toimituksen tiedostomuoto (GLB, metrit, pivot, luut, mobiilirajat, SHA256SUMS) ja tuontiportti `tools/codex-3d-tarkistus.mjs`:
`codex-3d-toimitus.md` (19.10.2026).

## 1. Tuotantoputki ja roolit

```
PT/omistaja: päätös tehdä malli (Googlen laatta ei riitä) + oikeustarkistus (luku 2.1)
  → Karttaseppä: sijainti, kohde.json (lat/lon, maan korkeus), ortokuva, LiDAR/OSM-pohja
  → Linnanrakentaja (tai Codex): SUUNNITELMA.md → mittaus (LiDAR, OSM, ortokuva) → malli v0 → leikkaus
  → Codex: tavoitekuvat + maskit pelin kulmista (PT hyväksyy kerran)
  → tavoiteluuppi: kierros.py → arkki + luvut → tuore Sonnet-arvioija → seuraava kierros (luku 2.6)
  → vertailuportti (ortokuva) → Valoseppä: syvyys, pelikuvapari, valo → PT → omistaja / KK
  → Natiiviseppä: GPU-arvio ja kytkentä; Julkaisija: paketti R2:een, osoitin junan lukituksessa
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Tarve ja oikeudet | PT (omistaja), Linnanrakentaja | Päätös lokissa; oikeusrivi `LAHTEET.md`:hen |
| 1. Pohja-aineisto | Karttaseppä | `kohde.json`, ortokuva, LiDAR/korkeusmalli, OSM-rajat |
| 2. Suunnitelma | Linnanrakentaja | `_valmiit/<kohde>-v1/SUUNNITELMA.md`: mitä tehdään, mitä jää Googlelle, kolmiobudjetit |
| 3. Mittaus ja v0 | Linnanrakentaja | Massamalli LiDAR-mitoista, leikkaus, `vienti-*.log` |
| 4. Tavoitekuvat | Codex (PT hyväksyy) | `tavoite/codex/` K1–K7 (+ L1–L3) + maskit; vastaanotto IoU-rajalla |
| 5. Tavoiteluuppi | Linnanrakentaja + Sonnet-arvioija | Kierrokset `kierrokset/kN/`, rivi `VERTAILU.md`:hen joka kierros |
| 6. Vertailuportti | Linnanrakentaja | `vertailuportti.zsh` 0 = läpi, tulos `LAHTEET.md`:hen |
| 7. Pelikuvat ja valo | Valoseppä | Syvyysleivottu glb, pelikuvapari, mittaukset (TÄYDENTÄÄ: Valoseppä) |
| 8. Hyväksyntä | PT → omistaja/KK | "OMISTAJAN PÄÄTÖS klo …" tai PT:n kuittaus; hyväksytyt kuvat `_valmiit/hyvaksytyt-mallit/` |
| 9. Paketti ja juna | Linnanrakentaja/Valoseppä, Julkaisija | `omat-mallit-vienti-<pvm>-vNkM`, portti 0 virhettä, `INTEGRAATIO-kN.md` |
| 10. Retrospektiivi | Linnanrakentaja | Kirjaus tämän pohjan opit-osioon |

Kanavat: viestit `send_message` session id:llä (osoitekirja), PT:lle enintään 3 riviä ja **absoluuttiset polut**;
yksityiskohdat `VERTAILU.md`:hen ja luovutukseen. Agentit vain Opus ja Sonnet.

## 2. Kultainen polku (oletustapa)

### 2.1 Tarve ja oikeudet ensin

1. **Tarkista, tarvitaanko omaa mallia.** Googlen laatta on oletus; oma malli vain kun laatta on sulanut tai väärä ja PT/omistaja
   päättää (esim. Eiffel-torni: omaa mallia ei tehdä, Googlen torni jää). `node tools/loki-hae.mjs <kohde>` ennen työtä,
   ettei työ ole peruttu tai tauolla (Peking ja Olavinlinna tauolla 10.10.).
2. **Arkkitehtuurin tekijänoikeus maan lain mukaan** (Raamattu, SUOJATUT TEOKSET KAIKISSA OMISSA JÄLJENNÖKSISSÄ): suoja on
   arkkitehdin kuolemasta 70 vuotta. Missä rakennusten kuvausvapaus on (Suomi, Ruotsi), rakennus saa jäädä; muualla (Ranska)
   suojatusta rakennuksesta ei tehdä omaa mallia. Pelkkä ei-kaupallinen panoraamavapaus = ei vapautta (peli on kaupallinen).
   Kirjaa suoja-ajan loppu `LAHTEET.md`:hen (esim. Louvren pyramidi: Pei k. 2019 → suojattu vuoteen 2089).
3. **Poikkeus vain omistajalta.** Suojattu kohde tehdään vain omistajan nimetyllä poikkeuksella (16.10. "Tehdään oma pyramidi"),
   ja se merkitään App Store -tarkistuslistalle (voi joutua pois ennen julkaisua). Ilman poikkeusta suojattu osa jää Googlen
   laataksi leikkausaukkoon.
4. **Suojatut veistokset ja yksityiskohdat pois mallista ja tilauksista** (alle 70 vuotta tekijän kuolemasta), samoin
   suojatut valaistussuunnitelmat (Raamattu, SUOJATUT VALAISTUKSET). Vanha teos, jolla on uusi valos, on vapaa, jos alkuperäinen
   on (Ludvig XIV:n ratsastajapatsas, Berninin teoksen lyijyvalos).
5. **Euroopan ulkopuolelle ei uutta ilman omistajan päätöstä** (VAIN EUROOPPA); kartta nykyajassa (AIKA): nykyiset rakenteet saa
   tehdä, vaikka niitä ei ollut 1873.

### 2.2 Lähteet

6. **Mitat avoimesta aineistosta:** LiDAR-korkeusmalli (esim. IGN LiDAR HD MNS − MNT 0,5 m), OSM-pohja (ODbL), ortokuva
   (esim. IGN BD ORTHO 0,2 m, Licence Ouverte). Jokainen lähde lisensseineen `LAHTEET.md`:hen taulukkoriviksi.
7. **Vertailukuvat:** Commons (PD/CC0/CC BY, katsottu silmin, `ref/LAHTEET.md`) ja Codexin havainnekuvat. Ne ovat vain
   vertailuun, eivät malliin. **Googlen laattoja sisältäviä pelikuvia ei anneta Codexille eikä muulle generoinnille**
   (Googlen ehdot); Codexin pohjat tehdään omasta aineistosta (oma renderi, LiDAR-massa, OSM).
8. **Tekstuurit vain CC0** (Poly Haven), kopio tai polku `lahde/`:ssa ja rivi `LAHTEET.md`:hen. Raamattu (VALOKUVAPOHJAISET
   PINNAT) suosii valokuvapohjaisia pintoja toistuvien tekstuurien sijaan; toistuvassa tekstuurissa tarkista toistokuvio
   pelikuvasta (luku 5, k61).

### 2.3 Mittasuhteet

9. **Massa LiDARista, rytmi kuvista.** Korkeudet, räystäät, harjat ja pohja mitataan korkeusmallista (räystäs, harja ja huippu
   erikseen; pihan maan korkeus `kohde.json`:iin). Ikkunajako, pilasterit ja kerroslistat lasketaan julkisivukuvista ja
   ortokuvasta. Mittaa vinot siivet omana kehyksenään (`kierretty()`), älä oleta rakennuksen akselia.
10. **Tarkistus maskeilla:** massamalli renderöidään samoista kulmista kuin LiDAR-massa ja Codexin kuvat; IoU ja
    korkeusero lasketaan `vertaa.py`:llä (kierros 0 = mallin testi LiDAR-maskeja vastaan).
11. **Yksityiskohdat vain pelin etäisyydelle.** Julkisivujakso tehdään kerran huolella ja monistetaan; lähitason koristeita vain
    kulmiin, joista pelaaja oikeasti katsoo (pallokierroksen kulmat + 2–3 lähintä).

### 2.4 Malli ja LOD

12. **Yksi lähdeskripti** (`lahde/<kohde>.py`, Blender `-b --factory-startup -P … -- vie`) rakentaa mallin, leikkauksen,
    LOD0–2 ja AO:n. Ei käsin muokattua .blendiä tuotantoon. Ennen jokaista muutosta varmuuskopio `<kohde>.py.ennen-kN`.
13. **Kolmiobudjetit (Louvre):** LOD0 ≤ 250 k, LOD1 ≤ 100 k, LOD2 ≤ 20 k, yksi mesh per LOD. Natiiviseppä saa GPU-arvion
    ennen junaa. 3D-nostoissa LOD0 on lähitaso (2–3 × kolmiot, vain lähellä).
14. **Koordinaatit:** glTF x itä, y ylös, z etelä; origo `kohde.json`:n lat/lon pihan maassa (sekä NGF- että ellipsoidikorkeus).
15. **Hyväksytty versio talteen ennen seuraavaa:** `glb/` = junassa oleva, edellinen `glb-kN/`, lähde `lahde-kN/`.
    Luuppikierrokset viedään `_tyo/<rooli>/<kohde>/luuppi-vienti/`:iin, ei `_valmiit/…/glb`:hen.

### 2.5 Materiaalit

16. **Albedo sovitetaan pelikuvista, ei Blender-renderistä.** Valoseppä mittaa pelikuvaparista (oma | tavoite); siirto
    T = havaittu / vientialbedo, uusi albedo = tavoite / T. Sävy leivotaan tekstuuriin (`*_savy.jpg`), koska glTF-vienti
    leikkaa baseColorFactorin ≤ 1:een.
17. **Valotus korjataan vain yhdessä paikassa.** Aurinko ja albedo ovat kytköksissä: kun aurinko vaihtuu (Louvre 300° → 160°),
    albedo viritetään uudelleen, mutta valotusta ei korjata sekä valolla että albedolla (tummuu kahdesti).
18. **Omat materiaalit eri pinnoille.** Yhteinen kerroin (esim. kivi ×0,65) osuu kaikkiin samaa materiaalia käyttäviin osiin;
    anna erottuville osille oma materiaali (jalusta, kello, sora) ennen kuin säädät yhteistä.
19. **Läpinäkyvät ja hehkuvat pinnat** (lasi, vesi, sisävalo) tarvitsevat Valosepän varjostintuen; tarkista ennen kuin malli
    lähtee, näkyykö alfa pelissä (k61: pyramidin lasi leikkautui pois).

### 2.6 Tavoiteluuppi (Raamattu, TAVOITELUUPPI ja LUUPIN TYÖNJAKO)

20. **Tavoitekuvat kerran:** Codex tekee tavoitekuvat ja kohdemaskit pallokierroksen kulmista + 2–3 lähikulmasta omien
    pohjakuvien päälle (renderit, rakennus- ja kohdemaskit, kulmat natiivina json:na). Vastaanotto: rakennusmaskin
    IoU ≥ 95 % omia maskeja vastaan (uudella osalla, kuten pyramidilla, ≥ 90 %, vaikeissa kulmissa ≥ 80 %). PT hyväksyy kerran.
21. **Kierros:** `get_usage` → muutos lähdeskriptiin → `python3 -I kierros.py N [--eevee] --kulmat … --tavoite …` →
    `ero/arkki-kN.jpg` + `yhteenveto-kN.txt` + `kierrosloki.jsonl`. L-kulmat aina `--eevee`-lipulla.
22. **Arvioija joka kierros tuore Sonnet-ali-agentti** (3 suurinta eroa tekstinä); rakentaja ei lue arkkikuvia itse, jottei
    konteksti täyty.
23. **Rivi `VERTAILU.md`:hen joka kierros:** kesto, IoU ka/min, korkeusero, dE, muutos, glb-md5. Pysähdys: luvut rajoissa,
    2 kierrosta ilman parannusta tai 10 kierrosta (`vertaa.py` tulostaa PYSÄHDY) → paras versio PT:lle.
24. **Kun tavoite ei sisällä osaa, IoU ei kerro siitä.** Uuden osan (pyramidi) kanssa tilataan uudet tavoitekuvat; siihen asti
    IoU-pudotus ei ole mallivirhe.
25. **Enintään 2 luuppia kerrallaan**; pelikäännös vasta lopuksi.

### 2.7 Yhteensovitus Googlen laattoihin

26. **Leikkaus = yksi rengas** (`leikkaus_latlon.json` myötäpäivään ja `_ccw`): mallin osat + pihat + 1 m reunus. Googlen alle
    jäävät osat (suojattu kohde, patsas) ovat aukkoja, jotka yhdistetään renkaaseen nollaleveällä sillalla. Pidä aukot
    koosta riippumatta (pieni aukko putosi kerran > 100 m² -rajalla). Tarkistuskuva leikkauksesta LiDAR-kuvan päälle.
27. **Aukon reuna mitataan ortokuvasta** (esim. altaiden graniittireuna), ja oma kiveys päättyy siihen; saumaan oma
    reunamateriaali Googlen sävyssä.
28. **Malli esitetään valaisemattomana kuten Googlen laatat** (valo ja AO leivotaan); kontrasti ja terävyys sovitetaan
    ympäristöön, sävy ja kirkkaus oikeaan maailmaan (VERTAILU OIKEAAN MAAILMAAN).
29. **Vertailuportti ennen Valosepälle luovutusta:** `kaupunkipinnat-v1/lahde/vertailuportti.zsh <kohde> <lod0.glb>`
    (0 läpi, 1 hylkäys, 2 kaatui): kirkkaus ±15 %, sävy ±15, ulokkeet ja katot ±0,12; kohdekohtainen poikkeus vain perusteltuna.
30. **Kameran alla oleva osa:** tarkista pelikuvasta, ettei laattojen karsinta tai lähileikkaus syö mallia kameran alta.

### 2.8 Hyväksyntä ja juna

31. **Luuppi-viennin md5 joka viestissä**, ja Valoseppä kertoo md5:n vastauksessaan (muuten se voi kuvata vanhaa vientiä).
32. **Hyväksytyt kuvat ja tekotyökalu** samassa vuorossa `_valmiit/hyvaksytyt-mallit/<aihe>-<pvm>/` (LAHTEET.md mukaan).
33. **Juna:** `INTEGRAATIO-kN.md` (mikä vaihtuu, md5:t, valaistusriippuvuudet kuten oma aurinko), paketti
    `omat-mallit-vienti-<pvm>-vNkM`, portti 0 virhettä, Julkaisija vie ja vaihtaa osoittimen junan lukituksessa. Valaistuksen
    delta (esim. kohteen oma atsimuutti) kulkee samassa junassa, muuten malli näyttää väärältä.
34. **Ei väliaikaisia poikkeamia:** poikkeava osa jätetään pois ja julkaisu odottaa riippuvuutta.

### 2.9 Kartan pienoismallit (karttaesinesarja)

Omistaja 17.10.2026 klo 19.27: kartan 3D-esineet ovat yksi sarja, kuin lautapelin nappulat. Ne tunnistetaan muodosta,
ei väristä tai koosta. Arkit 1–5b PT:n kautta, kartta hyväksytty junaan 202 (PT 18.10.). Koodissa sääntö on yhdessä paikassa:
`Karttaesineet.cs` + `KarttaesineSaanto.cs` (proto). Suunnitelma ja arkit: `proto-3d/_valmiit/kartan-pienoismallit-v1/`.

35. **Paletti:** karttapaletti (tyylikirja.json "karttapaletti"). Maamerkit muunnetaan yksisävyiseksi seepiarampiksi luminanssin
    mukaan: seepia 70/51/31 → okra 196/162/108 → kerma 230/216/186. Lasi ja vesi ovat liusketta 146/154/152, pienet korostukset
    messinkiä 205/178/128. Ramppi tehdään vain varjostimessa (`KarttaSeepia.hlsl`, Valoseppä), ei toista muunnosta CPU:lla.
    Oma tunnisteväri on vain pelinappulalla, kuumailmapalloilla ja kipsipäillä.
36. **Ääriviiva:** seepia 70/51/31, 1,2 pt kaikilla poluilla (`Symbolimallit.ReunaPt`). Ei mustaa viivaa. Iso esitys
    (galleria) piirretään tarkemmasta kuvasta, jotta viiva pysyy ohuena (`Nappula.NappulanGalleriaKuva`).
37. **Koko:** esineen suurin mitta ruudulla = `KaupunkiPalloMitat.KarttaesineKoko(pallo)` × mallin osuus (`Karttaesineet.Mitta`).
    Mallikohtainen kerroin on vain välillä 0,85–1,15. Matalat ja leveät esineet mitataan leveydestä, eli muoto ratkaisee eikä koko.
38. **Valo:** yksi suunta kaikille, korkeus 58° ja x 0,35 (`KarttaSeepia.Valo`).
39. **Maavarjo (omistaja 17.10. 22.27: "terävä mutta pieni, ei pehmeä"):** yksi soikio esineen juurella, reuna ≤ 1 px.
    Leveys on 1,05 × pohjan leveys, korkeus 0,3 × leveys, ei siirtoa ja peitto 0,5 (`Karttaesineet.Varjo*`). Ei jalustoja.
    Poikkeus on Louvren pyramidin kapea kivireunus, ja sen varjo on pohjan kokoinen.
40. **Yksi varjo per esine:**
    - Pelinappulan ainoa varjo on jalan rengas (≤ 1,3 × pohja). Vaalea sarjasoikio ei piirry sen alle.
    - Kuumailmapallon varjo on korin alla, vaaleampi ja pienempi (peitto 0,2, leveys 0,6 × pallo). Se piiloutuu, jos se osuisi
      nappulan varjoon.
41. **Tarkistus:** galleria (QA `ui galleria karttaesineet nyt|yhtenainen`, PK:n skenaario `sk-galleria-arkki4b`) + Pohjois- ja
    Etelä-Ranska samalla kameralla. Kuvat tarkistetaan täysikokoisina ja esineittäin lähikuvina (mallina `ARKKI-5b-lahikuvat.png`),
    ja arkki menee PT:lle. Uusi karttaesine tehdään näiden sääntöjen mukaan, eikä sille tehdä omaa poikkeusta.

## 3. Valmiin määritelmä (tarkistuslista)

Maamerkki ei ole valmis ennen kuin kaikki kohdat täyttyvät:

- [ ] Päätös tehdä oma malli on lokissa; kohde Euroopassa tai omistajan erillinen päätös.
- [ ] Oikeudet tarkistettu maan lain mukaan; suojatut osat Googlen aukossa tai omistajan poikkeus + App Store -tarkistuslista;
      suoja-ajan loppu kirjattu.
- [ ] `LAHTEET.md`: jokainen mitta-aineisto, tekstuuri ja vertailukuva lisensseineen; malli CC0 (oma työ).
- [ ] Mitat LiDARista ja ortokuvasta; massan IoU ja korkeusero LiDAR-maskeja vastaan kirjattu.
- [ ] LOD0–2 budjeteissa, yksi mesh per LOD; Natiivisepän GPU-arvio.
- [ ] Tavoiteluuppi pysähtyi rajoissa tai PYSÄHDY-säännöllä; jokainen kierros `VERTAILU.md`:ssä; Sonnet-arvioija ajettu.
- [ ] Leikkaus yhtenä renkaana, aukot ja sillat tarkistettu kuvasta; sauma siisti pelikuvassa.
- [ ] Vertailuportti 0 (tulos `LAHTEET.md`:ssä).
- [ ] Valosepän pelikuvapari: albedo ja valo mitattu, läpinäkyvät pinnat näkyvät; md5 täsmää.
- [ ] PT/omistaja hyväksyi; hyväksytyt kuvat `_valmiit/hyvaksytyt-mallit/`.
- [ ] `INTEGRAATIO-kN.md`, paketti portti 0, edellinen versio talteen, valaistusdelta samassa junassa.
- [ ] Retrospektiivi kirjattu tämän pohjan opit-osioon (luku 5).

## 4. Poikkeaminen

Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois.

## 5. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttuu pohjassa.

- **17.10.2026, Louvre k61–k62 (L2-sora).** Hidasti: laikkuisuus ei muuttunut, kun AO-kohinaa puolitettiin, koska raidat tulivat
  asfalttitekstuurin kaarista ja 4 m:n toistosta. Muuttuu: mittaa pelikuvasta, mistä vaihtelu tulee, ennen säätöä; toistuva
  tekstuuri tarkistetaan pelikuvasta (kohta 8).
- **17.10.2026, Louvre k60 (L3-jalusta).** Yhteinen kivikerroin ×0,65 tummensi myös patsaan jalustan ruskeaksi. Muuttuu: kohta 18.
- **16.10.2026, Louvre k59 (oma pyramidi).** Tavoitekuvissa ei ollut pyramidia → IoU putosi 96 → 87 % ilman mallivirhettä.
  Muuttuu: kohta 24. Pelissä lasi leikkautui alfan takia pois → kohta 19.
- **16.10.2026, Louvre k56–k57 (aurinko 160°).** Valotus korjattiin ensin sekä valolla että albedolla. Muuttuu: kohta 17.
  Louvren oma atsimuutti piti viedä samaan junaan (kohta 33).
- **16.10.2026, luuppi-vienti.** Valoseppä kuvasi kerran vanhaa vientiä. Muuttuu: md5 joka viestissä (kohta 31).
  PT ei näe lyhennettyjä polkuja → absoluuttiset polut (luku 1).
- **16.10.2026, Louvre k38–k43.** Luuppikierrokset vietiin vahingossa junassa olevan `glb/`:n päälle, ja L-kulmien maskit tulivat
  rei'itettyinä ilman `--eevee`-lippua. Muuttuu: kohdat 15 ja 21.
- **15.10.2026, Louvre v2c.** Pieni patsasaukko katosi leikkauksesta > 100 m² -rajan takia, ja Google leikattiin patsaan alta.
  Muuttuu: kohta 26.
- **15.10.2026, Louvre v1b–v2b.** Blender-renderistä sovitettu sävy oli liian tumma ja glTF leikkasi värikertoimen.
  Muuttuu: kohta 16 (sävy pelikuvista, leivotaan tekstuuriin).

## 6. Lähteet

Raamattu: TAVOITELUUPPI, LUUPIN TYÖNJAKO, 3D-MALLIT CODEXILLE, VALOKUVAPOHJAISET PINNAT, VERTAILU OIKEAAN MAAILMAAN,
SUOJATUT TEOKSET KAIKISSA OMISSA JÄLJENNÖKSISSÄ, SUOJATUT VALAISTUKSET, HYVÄKSYTYT MALLIT PYSYVÄÄN TALTEEN, TUOTANTOPOHJAT;
`proto-3d/_valmiit/louvre-v1/` (SUUNNITELMA.md, LUEMINUT.md, VERTAILU.md, INTEGRAATIO-k57.md, LAHTEET.md);
`proto-3d/_tyo/linnanrakentaja/louvre/tavoite/LUEMINUT.md`; Linnanrakentajan luovutukset 10.–17.10.2026
(`docs/raportit/viesti-linnanrakentaja-luovutus-*.md`).

## 7. TÄYDENTÄÄ: Valoseppä

*(valo ja varjostin: syvyysleivonta, pelikuvaparit ja mittari, kohteen oma aurinko, lasi/vesi/hehku, yövalo)*

## 8. TÄYDENTÄÄ: Karttaseppä

*(sijoitus: kohde.json, ortokuva ja LiDAR-pohja, pallokierroksen kulmat, laattojen karsinta)*

## 9. TÄYDENTÄÄ: Natiiviseppä

*(kytkentä: OmaMalli, LOD-vaihto, GPU-budjetti, osoitin ja paketin rakenne)*
