# Linnanrakentajan luovutus 18.10.2026 klo 09.3x (Opus) – kova raja 45 % (Postivahti, PT)

Edellinen luovutus: `viesti-linnanrakentaja-luovutus-20261018-aamu.md` (16639078f). Viestit lähetetään AINA session id:llä
(`/Users/Shared/Claude/osoitekirja.md`). PT:lle enintään 3 riviä, ja polut ovat absoluuttisia.
Proton työkopio: `/Users/Shared/Claude/wt/proto-linnanrakentaja-kehykset`. Siinä on useita haaroja, joten tarkista `git branch --show-current`.

## ENSIN (PT 09.3x, tässä järjestyksessä)

### 1. Louvren pilotti sali-v2k (omistaja 09.05 "aitojen refe kuvien mukainen"; PT: ennen muita malleja)

- **Refet:** `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/louvre-pilotti/refe/` + VERTAILU.md (VS).
- **Työkopio:** `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/louvre-pilotti-v2k/`. Se on kopio `_valmiit/taidemuseo-ranska-v2`:sta, ja alkuperäinen paketti on koskematon.
- **Muutokset `lahde/ranska.py`:ssä:**
  - **GG:** `kattoikkunanauha` 6,0 + `kasetit` 5,0 (ennen 4 erillistä ikkunaa) ja 3 pyöreää harmaata istuinta (`malli: "pyorea"`, Ø 1,6).
  - **SE:** keskipenkki pois. Mona Lisan eteen kaareva puukaide (`kaarikaide`: kaari_keskus 18,1/−38,58, r 3,4, 110°). Metallikaiteet `se-kaide-z` (+z-seinä) ja `se-kaide-x0/x1` (x0 alkaa vasta oven gg–se jälkeen).
  - **SC:** verrière 7 → 10 m.
- **Muutokset `runko/lahde/sali_blender.py`:ssä:**
  - uudet `istuinsylinteri`, `palkki`, este `kaarikaide` ja `kaide`:n `kaidemateriaali`
  - uudet värit `penkki_harmaa`, `kaide_puu`.
- **Ajo käynnissä 09.3x:** `zsh lokit/aja_v2k.zsh > lokit/aja_v2k.log`.
  - Tarkista, että lokissa on "V2K VALMIS".
  - Jos ajo kaatui, katso `lokit/v2k/sali_lod*.log`. Ensimmäinen ajo kaatui nimitörmäykseen `sylinteri` (puutarha.py), ja se on korjattu.
- **Sitten:**
  1. **Esikatselu:** katso `esikatselu/v2k*` (atlas_kuvat).
  2. **Vientipaketti:** tee kuten v2j: `lahde/paketti_v2.py` (ASTC 6×6) → `_valmiit/taidemuseo-ranska-v2k-vienti-20261018/taidemuseo/ranska/sali-v2k/` + LAHTEET + SHA256SUMS.
  3. **Ämpäri:** JU vie paketin ämpäriin.
  4. **Pelin sali.json:** `Assets/Matkakirja/Linssit/Resources/Museo/ranska/sali.json` → `glb.kansio` "sali-v2k/". Kopioi työkopion sali.json:sta osien gg/sc `katto` sekä `esteet`, `esteet_malli`, `penkit` ja `penkit_malli`. **Älä korvaa koko tiedostoa:** pelin sali.json on LS1:n muokkaama (kohdat, v6-profiilit, rako).
  5. **Kuvaparit:** simuparit VS:lle (`local_ee961a2d-…`) ja PT:lle.
  6. **Kuittaus:** VS:lle ja PT:lle on kuitattu 09.3x, että työ on käynnissä.

### 2. Pienoismallit (omistaja 09.03 + 09.10)

- **Haara:** proto `linnanrakentaja/pienoismallit-202` **006f7f4df**. Pohjana juna-202 97775f95b + LS:n hehkukoodin poisto 3a354d600, tarkista.sh 0, Kartta-testit 508/508.
- **Mallit ja linssit:**
  - Big Ben → radio
  - Edinburgh Castle → keksinnot
  - Matterhorn (Zermatt 46,0207/7,7491) → topografia
  - Hagia Sofia → ihmisen-matka
  - Grimeton (57,1083/12,3922, LS hyväksyi) → radio
- **Toteutus:** `KaupunkiPallot.LinssiMallit` + `LisaaLinssiMalli`. Nappi näkyy, kun linssi on Saatavilla. `KaupunkiPalloKuva.LuoMalli` käyttää kameroita −11000…−15000.
- **Mallien lähteet:** `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/pienoismallit-202/<nimi>/` (Blender-skripti, glb, esikatselut, LAHTEET; CC0 oma työ).
- **Simu:** JU kääntää 006f7f4df → `_tyo/linnanrakentaja/pienoismallit-202-app`.
  - Tarkista `Data/Raw/kaannos.txt` = 006f7f4d ennen ajoa. Samaan kansioon käännettiin ensin 581df88d7.
  - Ajo `zsh /Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/ajo-pienoismallit-202.zsh <app>` (iPad) JU:n SIMU NYT -vuorolla.
  - Kuvat p-lontoo / edinburgh / alpit / istanbul / grimeton / eurooppa → arkki PT:lle → hyväksynnällä NS:lle.
- **Huom:**
  - Lopullinen näkyvyys vaatii linssin Saatavilla. Jos nappeja ei näy, tarkista lokin "kaupunkipallot".
  - Sijainti saattaa osua kaupunkipallon päälle (Lontoo), jolloin tarvitaan SiirtoX/Y kuten Louvressa.
- **Avoin:** Big Ben ei avaa radiota sen jälkeen, kun LS:n seuraaja siirtää linssin Grimetoniin (PT: "Lontoo ei enää linssikaupunki"). Seuraaja ilmoittaa. Muuta silloin Big Ben aina näkyväksi ilman linssiä (napautus PT:ltä).

### 3. Louvren kehykset v6 (PT 09.4x)

- **Haara:** proto `linnanrakentaja/kehykset-v6-202` **8a33ed5e4**, v5:n 640e58ceb päällä.
- **Muutokset:**
  - veiston V kaarenpituutena (MuseoGeometria)
  - fr_A/B/C (24 pistettä) ja fr_D (16) porrastettu, tumma sisärako (kehysmateriaali `rako`)
  - kulta 236/214/150 ja valo 1,55
- **Testit:** tarkista.sh 0; Linssit-testit Museo 173, Kehys 30, Ranska 8, Kaari 11.
- **Simu:** JU kääntää → `_tyo/linnanrakentaja/kehykset-v6-202-app`. Aja `ajo-kehykset-v6-202.zsh` (iPhone) samalla vuorolla kuin pienoismallit.
- **Kuvat:** kultasävyt QA:lla: oletus, v4 206/186/128 ja kirkas 245/228/175.
- **Kolmikko:** ennen (v5) | jälkeen | oikea `_valmiit/louvre-kehykset-201/kehysmuoto-202/oikea-louvre-salle904-sivupalkki.png` → PT ja KK.
- **Työkalu:** kolmikkotyökalu `/Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/kolmikko.py` (argumentit: ennen-kuva, jälkeen-kuvakansio, oikea, ulos, ulos2; rajaus 0,600,700,1500).

## TEHTY tänään 08.3x–09.3x (kaikki PT:n hyväksymiä)

- **Kaksi kehystä:** 602 kaarena (05833ad6e) junassa 202. Arkki `_valmiit/louvre-kehykset-201/yksi-kehys-202/ARKKI-ennen-jalkeen.png`. Muotokuvat (40) on tarkistettu, eikä niissä ole kehyksiä.
- **Kartan arkki 5b:** hyväksytty. Galleria-nappula sai seepiaviivan ja terävän pienen seepiavarjon (omistajan 22.27 sääntö, PT pyysi "pehmeää"). Tehty nappula-pehmea-202 → 2a191416b, ja se on junassa 202 c686c545e. Pari `_valmiit/kartan-pienoismallit-v1/ARKKI-5c-galleria-nappula.png`.
- **Luku 2.9 "Kartan pienoismallit":** `docs/moduulit/tuotantopohjat/3d-maamerkki.md`:ssä (#4858 mergetty).
- **Kehysmuoto v5:** veisto ei litisty, täytevalo yläviistosta (640e58ceb). PT hyväksyi, ja haara on lähetetty NS:lle (yhdistyksen kuittausta ei vielä tullut). Kolmikko `_valmiit/louvre-kehykset-201/kehysmuoto-202/`.

## Opit

- **Merge-viat:** JU:n käännös kaatuu, jos haara ei yhdisty masteriin. PK:n galleria-200 törmäsi KaupunkiPalloKuva.cs:ssä ja .meta-tiedostojen väärässä rename-tulkinnassa. Ratkaisun malli on e924f8947.
- **Omistajan linja voittaa PT:n sanamuodon:** PT pyysi "pehmeää" varjoa, mutta omistajan 22.27 sääntö "terävä, ei pehmeä" voittaa. Kerro siitä PT:lle parin yhteydessä.
- **Kuvaa ei voi päätellä tiedostonimestä:** PK:n galleriaskenaario tallentaa iPadin kuvat 90° kiertyneinä (raaka/*.png pystyssä). Kierrä takaisin ennen rajausta.
- **Blender-skriptin globaalit:** puutarha.py käyttää sali_blenderin globaaleja nimiä. Uudet apufunktiot tarvitsevat yksilölliset nimet.
