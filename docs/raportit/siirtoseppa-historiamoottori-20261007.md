# Historiamoottori — arkkitehtuuri (Siirtoseppä 7.10.2026 klo 08.4x, Olavinlinna pilottina)

**Omistajan linja 7.10. klo 08.4x–08.5x** (Raamattu #4115, Päätoimittajan kautta): Olavinlinna, Kielletty kaupunki ja Gizan
historiallinen versio ovat **seikkailuja maan tasalta**. Ei aloitusesittelyä: pelaaja on heti toiminnan keskellä, ratkaisee
arvoituksen, löytää aarteen ja oppii historian vihjeistä. Tietokerros ja drone-näkymä vasta lopussa. Olavinlinna alkaa
elokuvamaisella venesaapumisella alaperspektiivistä. Liikkumistapa (pisteestä pisteeseen vai vapaa) on omistajan päätös,
joten moottori tukee molempia samasta datasta.

## 1. Periaatteet

- **Sama jako kuin nyt:** puhdas C# -ydin (`Linssit/Ydin/Seikkailu/`, testattava ilman Unityä, sama t → sama tila) ja Unity-sovitin
  (`Linssit/Unity/Seikkailu*.cs`). Ydin ei tunne Unityä, sovitin ei tee pelilogiikkaa.
- **Kaikki datasta:** rakennus.json saa osion `seikkailu` (Linnanrakentaja/Sisältökirjuri kirjoittavat, rakenna.mjs vie). Ei
  Unity-scenejä per rakennus: kohde on ämpärin dataa kuten nyt, joten uusi kohde = uusi data, ei uusi käännös.
- **Rakennus-id → juuri:** `DioraamaSovitin.AmpariJuuri` on nyt vakio …/olavinlinna/. Moottori tarvitsee juuren rakennus-id:stä
  (äänet, peili, osoitin), muuten Kielletty ja Giza eivät pääse pelaajille. Tehdään ensimmäisenä (pieni muutos).
- **Uudelleenkäyttö:** Cinemachine-kamerat (DioraamaCinemachine), ajon aikana rakennettu Timeline (DioraamaTimeline),
  hahmot + eleet + kasvot (DioraamaHahmot3D, Eleajoitus, Visemit), etsintä (DioraamaEtsinta: kimallus, sarana, löytö →
  PeliOhjain.LoydaMatkamuisto), äänet (DioraamaAanet, väistö), puolilähikuva puhujaan. Uusi koodi on tilakone ja liikkuminen.

## 2. Tilakone (Ydin `Seikkailu`)

```
Saapuminen (Timeline) ─▶ Tutki ◀──▶ Katsele ◀──▶ Esine
                           │  ▲                    │
                           ▼  │                    ▼
                         Keskustelu            Arvoitus ─▶ Löytö (Timeline) ─▶ Loppu: tietokerros + drone
```

- Jokainen tila on Ytimessä tietue (ei MonoBehaviour); siirtymät tapahtumista (napautus, saapui, ratkaisu, aikaraja).
- `Paivita(t, syote)` palauttaa näkymän: kameran tavoite (asento tai seurattava), näkyvät esineet ja vihjeet, aktiivinen
  keskustelu, UI-tila. Sovitin piirtää. Sama malli kuin PoikkileikkausLinssi.NakymaHetkella.

## 3. Liikkuminen — kaksi toteutusta, yksi rajapinta

`ILiikkuminen { Sijainti, Suunta, Paivita(dt, syote), Siirry(kohde), Sallittu(piste) }`, valinta datasta
`seikkailu.liikkuminen: "pisteet" | "vapaa"` (oletus omistajan päätöksen mukaan; testikomento vaihtaa A/B:tä varten).

- **Pisteet:** `seikkailu.paikat[] { id, paikka, katse, naapurit[], kamera? }`. Napautus naapurin merkkiin → Cinemachine-blendi
  (1,0–1,5 s, EaseInOut) tai lyhyt Timeline-ajo, jos väli on pitkä (portaat). Katselu paikalla: veto kääntää katsetta rajoissa
  (`katse.vaaka ±`, `pysty ±`), kuten nykyinen Kierto.
- **Vapaa:** sama `paikat` toimii kiinnekohtina ja tallennuspisteinä; lisäksi `kavelyalue` (monikulmio + korkeus per alue) ja
  törmäys tilojen MeshCollidereilla kerroksessa 30 (sama kuin Final IK -kokeen Grounderissa). Ohjaus: vasen TAPPI liike,
  oikea veto katse (TAPPI-pohja on jo hyväksytty oppaaseen; ei uusia UI-pohjia). Silmänkorkeus 1,6 m, nopeus 1,4 m/s.
- Molemmissa kamera on ensisijaisesti silmänkorkeudella; puolilähikuva keskusteluun (nyt valmiina eleet-2:ssa).

## 4. Katselu ja esineen tutkiminen

- **Katsele:** kohde (seinäkirjoitus, vaakuna, ikkuna) → kamera blendaa kohteeseen, teksti näkyy vasta pelaajan napautuksesta
  (omistajan linja: infokortit vain napautuksesta).
- **Esine:** `seikkailu.esineet[] { id, glb, paikka, kohdat[] { piste, teksti|vihje, ehto } }`. Lähinäkymä omalla
  CinemachineCameralla, sormella kääntö (rajat), kohdat napautettavissa. Etsinnän sarana/kansi/sinetti laajenee tähän.

## 5. Arvoitukset ja vihjeet

- `seikkailu.arvoitukset[] { id, ehdot[], vihjeet[3], ratkaisu, loyto }`. Ehdot: esine tutkittu, kohta nähty, valinta tehty,
  järjestys (esim. kolme vaakunaa oikeassa järjestyksessä). Ratkaisu → Löytö-Timeline → PeliOhjain.LoydaMatkamuisto.
- **Vihjeportaat** ajan ja yritysten mukaan (1 = suunta, 2 = paikka, 3 = melkein ratkaisu), lähteinä hahmojen repliikit
  (kohdistus + eleet), kertoja ja esineiden kirjoitukset. Historia opitaan vihjeistä, ei esittelystä.

## 6. Tallennus kesken kohteen

- Ydin-tila sarjallistuu JSONiksi: rakennus + datan versio, liikkuminen (paikka-id tai sijainti), avatut/tutkitut, arvoitusten
  vaiheet, vihjetasot, löydöt, kulunut aika. Tiedosto `persistentDataPath/seikkailu-<rakennus>.json`, tallennus jokaisesta
  merkittävästä tapahtumasta (ei ajastettuna). Jatka-tila palaa lähimpään paikkaan ilman saapumista.
- Datan versio muuttuu → tallennus sovitetaan (tuntemattomat id:t ohitetaan), ei kaadu.

## 7. Timeline-siirtymät

- Saapuminen, löytö ja loppu ovat **ajon aikana datasta rakennettuja TimelineAsseteja** (kuten DioraamaTimeline nyt):
  raidat kamera (CinemachineTrack, polku ja kohteet), animaatio (vene, airot, hahmot), ääni (DioraamaAanet-reitti, väistö),
  tapahtumat (tekstit, nimikyltti 3 s). Data `seikkailu.ajot[] { id, kesto, raidat[] }`.
- **Venesaapuminen (pilotti):** vene glb (Linnanrakentaja: airot omina solmuina, origo vesirajassa, `kamera_pera`), soutaja
  `soutu`-leikkeellä, kamera perästä silmäkorkeudelta y = vesi + 1,2 m, 45–60 s, pysäytykset 120 m / 40 m / 8 m
  (linna alhaalta → muurin juuri → vesiportti), lopussa blendi Tutki-tilan ensimmäiseen paikkaan laiturilla. Ohitettavissa
  napautuksella (käsikirjoituksen periaate).

## 8. Suorituskyky ja laitteet

- iPhone- ja iPad-vaaka. Lähitarkkuus vain silmänkorkeuden reiteille (Linnanrakentaja: rantakivikko, portti, muurin juuri),
  kauas LOD. Uudet efektit A/B-mitattuna iPadilla (raja 0,3 ms/kehys per ominaisuus) ennen junaa, kuten FACEIT.

## 9. Vaiheistus

| Vaihe | Sisältö | Riippuu |
|---|---|---|
| H0 | Rakennus-id → juuri (Kielletty/Giza pelaajille), `seikkailu`-osion lukija + testit | — |
| H1 | Venesaapuminen Cinemachine + Timeline (vene + vesi LR:ltä), simuvideo | LR:n vene |
| H2 | Tilakone + Pisteet-liikkuminen + yksi arvoitus (voudin sinetti etsinnästä laajennettuna) + tallennus | data |
| H3 | Vapaa-liikkuminen (TAPPI, kävelyalue, törmäys) samaan dataan → A/B omistajalle | törmäysmallit |
| H4 | Löytö- ja loppuajot, tietokerros + drone-näkymä | H2 |

## 10. Päätökset omistajalle

1. Liikkuminen: pisteet vai vapaa (H3 tuo A/B-videon samasta reitistä).
2. Kamera: ensimmäinen persoona vai olan yli (pelaajahahmo Fogg näkyvissä)?
3. Vihjeiden ajoitus: kuinka nopeasti portaat avautuvat (esim. 60 s / 120 s / 180 s)?

---

## 11. PÄIVITYS: omistajan päätös 7.10. klo 08.4x — VAPAA KÄVELY ensisijainen (Raamattu #4115)

"Koukuttavin, vaikka suuritöisin." Pisteestä pisteeseen ei tehdä nyt (kohdan 3 Pisteet-toteutus jää rajapinnan taakse). Pelin aikana
ei opeteta eikä ole luettavaa; joka huoneessa yksi pääteko (vähän tappelua, enimmäkseen oveluutta, hiiviskelyä ja reaktiota).
**Pystyleike:** Olavinlinna Laituri → Keittiö → Kappeli, ~10 min: venesaapuminen, hiiviskely vartijan ohi, harhautus ja
piiloutuminen keittiössä, valoarvoitus kappelissa. Tarina ja arvoitus Päätoimittajalta.

### Moottorin osat ja arvio (Siirtoseppä, Opus-agenttiparvi rinnakkain; päivät = työpäiviä, kalenterissa rinnakkain lyhyempi)

| Vaihe | Sisältö | Arvio | Riippuu |
|---|---|---|---|
| V0 | H0 rakennus-id → juuri (tehty 680d9b49), `ymparisto.mallit[]` staattisille glb:ille (rantakivet, vene) | 0,5 pv | — |
| V1 | Pelaaja: CharacterController + Cinemachine (1. persoona tai olan yli), ohjaus Input Systemillä: vasen TAPPI liike / oikea veto katse, Mac näppäimistö + hiiri, peliohjain; törmäys MeshCollidereilla, portaat ja rampit | 1,5 pv | törmäysmallit |
| V2 | Venesaapuminen Timeline + Cinemachine (vene, soutu, kamera perästä), loppu blendinä pelaajan ohjaukseen laiturilla | 1 pv | vene, soutu |
| V3 | Vartija-AI: NavMesh (ajon aikana tilojen käveltävistä pinnoista, AI Navigation 2.0.14), partioreitti datasta, näkökartio (säde + valoisuus), kuulo (askeleet, heitot), epäily → etsintä → paluu, kiinnijäänti → tarkistuspiste | 2 pv | NavMesh-pinnat, vartijan leikkeet |
| V4 | Vuorovaikutus ja konteksti-animaatiot: poimi/heitä (harhautus), piiloudu (tynnyri, kaappi, varjo), kiipeä merkityt reunat, ovet; Mixamo-leikkeet UAL-luurankoon | 1,5 pv | leikkeet, merkityt tyhjät |
| V5 | Arvoitustila + kappelin valoarvoitus (Päätoimittajan käsikirjoitus) | 1 pv | käsikirjoitus, esineet |
| V6 | Tallennus tarkistuspisteisiin + jatka | 0,5 pv | — |
| V7 | Pystyleikkeen viimeistely: äänet (askeleet pinnoittain, vartijan repliikit), valaistus hiiviskelyyn, iPhone/iPad-suorituskyky (A/B), video | 1,5 pv | kaikki |

Yhteensä ~9–10 työpäivää; V1, V2 ja V3 voivat kulkea rinnakkain agenteilla, kun data on olemassa.

### Linnanrakentajalta tarvitaan (järjestyksessä)

1. **Yhtenäinen kävelygeometria Laituri → Keittiö → Kappeli** 1:1: tilat ovat nyt erillisiä poikkileikkauksia. Tarvitaan yhdistävät
   käytävät, portaat ja oviaukot, katot ja ehjät seinät silmänkorkeudelta katsottuna (poikkileikkauksen avoin puoli suljettu).
2. **Törmäys- ja kävelypinnat** per tila: kevyt collider-mesh (oma solmu `tormays`) ja käveltävä pinta NavMeshille (`kavely`).
3. **Pelaajahahmo** (jos olan yli): Fogg UAL-luurankoon. **Leikkeet** (Mixamo sallittu): idle, kävely, juoksu, hiipiminen
   (kävely ja idle), kiipeä reunalle, piiloudu sisään ja ulos, poimi, heitä, kurkista. **Vartijalle:** partio, etsi (katselee),
   hälytys, juoksu, kiinniotto.
4. **Merkityt tyhjät:** `piilo:<id>`, `kiipea:<id>` (reunan alku ja loppu), `esine:<id>` (heitettävä), `ovi:<id>`, vartijan
   `partio:<id>` -pisteet ja odotusajat.
5. **Hiiviskelyn valo:** pimeät alueet leivottuun valoon ja valomäärän näytteet (light probes), jotta näkyvyys = valoisuus.
6. **Vene + rantakivet + soutu** (työn alla), kappelin valoarvoituksen esineet käsikirjoituksen tultua.

### Päätös vielä: kamera

Ensimmäinen persoona on kevyempi (ei pelaajahahmoa, ei kontekstianimaatioita pelaajalle) ja immersiivinen; olan yli näyttää
hiiviskelyn ja kiipeilyn paremmin ja on lajityypin tavallisin. Suositus pystyleikkeeseen: **olan yli** (hiiviskely ja kiipeily
luettavampia ilman opastusta, mikä sopii linjaan "ei opeteta"). Päätös omistajalle.

### Tarkennus 7.10. (Linnanrakentaja / Päätoimittaja): reitti lähteiden mukaan, kamera olan yli hyväksytty

- **Omistaja hyväksyi (08.5x):** kamera olan yli (nuori Fogg ruudussa, Mixamo), vihjeet Pululta pyydettäessä + kevyt automaattinen
  vihje ~3 min jumin jälkeen, ei tekstiä; ensin vain Olavinlinna.
- **Reitti:** laituri → Vesiportin bastioni (piha y −5,6) → porttikäytävä 11,7 m (nousu ~2 m, 4 askelmaa) → pikkupiha (y −2,7) →
  **keittiö pikkupihan eteläsiivessä** (purettu 1720-luvulla, mallinnetaan 1:1 ~59 m²; vanha keittiö käytössä kunnes uusi todennettu)
  → Kirkkotorni pihan koillisnurkassa (kierreportaat lounaispuolella, **kappeli 3. kerroksessa**). Itäsiiven alakerta = läpikulku.
- **Kappeli ikkunaton** (Aalto-arkisto 1910, opas 1923): Ø ~7,8 m, ristiholvi ~11,8 m, 8-aukkoinen ampumakäytävä ~10–10,5 m →
  V5 valoarvoitus kynttilöillä, soihduilla tai ampuma-aukkojen valolla.
- **V1 tehty koodina:** siirtoseppa/historia-h0 cf5a4379 (Ydin Seikkailu.Kavely + SeikkailuPelaaja, poikki kavely). Kosketustapit
  täysillä 2D-arvoilla pyydetään Natiivi-UI:lta TAPPI-pohjalla.
