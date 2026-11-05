# Natiivi-UI: luovutus 5.11.2026 klo 12.30 (konteksti 28 %)

Edellinen: viesti-natiivi-ui-luovutus-20261105-1210.md (haara natiivi-ui/luovutus-20261105-1210; sen LISÄYS palmusta on kumottu).
Proto: /Users/Shared/Claude/wt/proto-natiivi-ui-nousu-pieni, haara natiivi-ui/pariisi-lento-219, kärki d81627510. Rakentaminen ensin (2.209), Pariisin suunnitelma: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisin-aloituslento.md.

## 1. Lippu: SEIS (omistaja 12.17 KK:n kautta)
Omistaja: "Vanha sääntö ja miksi tällaisia testaillaan kun piti keskittyä juoksuun ja Pariisiin?" Ei lipun korjauksia, selvityksiä eikä simu- tai Mac-ajoja. Raamattu 4.42 pysyy voimassa myös striimikartalla; sen toteutus, palmu ja muut kankaan viat odottavat, kunnes Pariisi on valmis. Haara natiivi-ui/kartan-kaanto-219 b558a2d00 tallella ilman mergeä, vain paikallisesti proto-repossa. Työlistalla rivi "Kohdemaan lippu odottaa Pariisia".

## 2. Kyltit 13355a9c2: kysytty PT:ltä, vastausta ei vielä tullut
Eivät ole juoksua eivätkä Pariisia, joten KK:n sanan mukaan kysyin PT:ltä 12.2x. Ei JU-vuoroa ennen sanaa. Commit on pariisi-lento-219:n historiassa. Jos PT seisauttaa kyltit, kumoa se ennen Pariisin mergeä, koska se on todistamatta (skenaario proto-3d/_tyo/natiivi-ui/kyltit-219/sk-kyltit.txt, raketin paikka arvattu).

## 3. Aloituslento: tehty tällä vuorolla (vain koodi, EI YHTÄÄN KUVAA)
Kääntyy (unity-tarkistus 0 virhettä); tarkista.sh läpi d81627510:ssa. Mitään näistä ei ole nähty pyörivän.
- c9427a7e4 A: viisi nousevaa kuvaa trailerissa (`Saapumistraileri`, `SaapumisKuvat.Aloituslento`, `TrailerinKuvat`), järjestys Eiffel, Riemukaari, Sacré-Cœur, Notre-Dame, Louvre. Yksi vuoro 4,2 s, viisi kuvaa noin 21 s. Kuva seuraa karttapistettä. Nimi lähtee ensimmäisen kuvan paluun alkaessa. Tiedostoa vailla oleva kuva jää pois, joten Louvre ja Riemukaari puuttuvat, kunnes Codexin kuvat on viety (haetaan Eiffelin kansiosta). `AloituslentoKartalle`: C1–C4, Invalidit ja Pulun kuvat kartalle lopussa ja ohituksessa.
- 2b84588dc D: i1 ja i2 nousevat Tuileries'n puutarhasta ja lentävät alaosaan (`Saapumisesitys.IsoisanKuvatLennolla`, `Introesitys.KuvaMatkakirjaan`). C5 ei enää näy saapumisessa. `AlaosanKuvat`: Pulun kuvat pois alaosasta Pariisissa. Luennan aikana samoja kuvia ei nosteta uudelleen.
- a34794be7 E: `SaapumisKuvat.PulunKuvaNousee`, kehys `Tyylikirja.Kehys.Kulta` 2 pt, näkyy vaikka samassa kohteessa on noston kuva. Väri on KK:n hyväksyttävä kuvasta.
- d81627510 D2: `TuileriesKuvaNapautettu`: Pariisissa `kierto.Aja` palatsin luo 1,8 s ja kortti `kohde:tuileries`; muualla kortti heti.

Rajaus: Aloituslento = NousuKoe, Pariisi, saapumiszoomaus, ei 2.161:n aloitusintroa. Muut kaupungit ennallaan.

## 4. Tarkistettavat, joita en todistanut
- Mac-kuvasta: nousu, limitys, paluu, nimi, viimeisen kuvan lasku 0,2 s ennen peitteen häipymistä (`Lopeta` piilottaa 220 ms:ssä).
- Lennon alla kuvat odottavat yhä kartan terävöitymistä (`NousuPysahdysMs`, `Teravana`); kameran 3.11. pysähdys on kumottu, joten katso B:n kanssa, tuleeko kuvien alkuun tyhjä hetki.
- Musiikki: nopea katkeaa isoisän kuvien jälkeen (`KaupunkiIntroOhita`). Sarja kestää nyt noin 21 + 8 s, ja kappaleen siirtymä on 31 s: kuunneltava. Ei uusia ääniajoja ilman lupaa.
- `kohde:tuileries` on päätelty datasta (js/packs/fokuskohteet-fra.js, kuva ihme-tuileries-loistoaika-v2). Katso, että kortissa on palatsi loistossaan.
- Lappuna oleva matkakirja: näkyykö alaosa, kun i1 ja i2 laskeutuvat ennen luentaa.

## 5. Tekemättä, järjestyksessä
1. Pyydä JU:lta ESIKATSELU NYT (d81627510, L2), aja skenaario Pariisin saapumisesta, katso kuvat itse, rivi JU:lle. Tarvittaessa korjaa. Liike ja kierto KK:lle (ei omistajalle ennen sanaa, ei videoita omistajalle 09.28).
2. D:n arkki KK:lle: Pariisin alaosan kuvat. Paris-merkinnän `valokuva` (Tuileriain palatsi palon jälkeen, `Matkakirjakortti.LisaaValokuva`) jää alaosaan; KK ratkaisee, onko se isoisän ottama. Muita merkintöjä en käynyt läpi.
3. D2:n jatko: isoisän oma kuva Tuileries-kortille toiseksi kuvaksi, "ellei pohja estä" (`Nostokortti.Avaa(valoId, x)` katsomatta).
4. B:n ajoitus NS:n kanssa: kierto hiipuu luennan alkupuolella, kosketus ja Ohita pysäyttävät pehmeästi. En löytänyt NS:n kameran haaraa natiiviseppa/*-nimillä hakusanoilla kierto, orbit, aloituslento: kysy NS:ltä.
5. Uudet kuvat Louvre ja Riemukaari: omistajalle ennen kytkentää (Codex toimittaa proto-3d/_tyo/codex/pariisi-esittelykuvat-20261105/).

## Huomiot
- Testit vasta valmiina, ei junaan, ei iPad-ajoja. Omat Mac-kuvat vain JU:n vuorolla.
- tarkista.sh muuttaa kolme tyylikirjatiedostoa: git restore (tehty).
- Lukitsematon yksityiskohta: katukuvat ja Invalidit ilmestyvät kartalle vasta sarjan lopussa; omistajan sana ei sido hetkeä.
- Ei auki olevia ajoja.
