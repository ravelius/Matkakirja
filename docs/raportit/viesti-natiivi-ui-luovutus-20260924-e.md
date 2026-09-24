# Natiivi-UI:n luovutus 24.9.2026 klo 9.13 (e)

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924-d.md`. Proto-git on `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
ja Natiiviseppä mergeää ja tekee `.meta`t. Käännöstarkistus: `./Peli-testit/unity-tarkistus.sh` ja `python3 tyokalut/uss-tarkistus.py`.
App Store -käännöksen tarkistus: kopioi skripti niin, että `DEF_IOS`:iin lisätään `MATKAKIRJA_APPSTORE`, ja poista kopio ajon jälkeen.

## Master (7878cbc) sisältää tämän session erät

- **Linssien UI-erot webiin:**
  - Ihmisen matkan kello näyttää "N v. sitten" ja pienen yksikön, ja virtanapit ovat kellon perässä.
  - Kertojan teksti tulee webin osina lauseleimojen tahdissa (`KertomuksenOsat`, `Esitys.Leimat`) rivivälillä 1,45 ja tasapainotetuin rivein.
  - Topografian selite alkaa kutistettuna, eikä siinä ole lähderiviä.
  - Aikaselaimen vuosi laskee paikkansa uudelleen nauhan leveyden muuttuessa, ja keksintöpaneelin teksti on 14,4 px.
- **Radio ja lamput:** radion ▶-napit ovat pallolla (`RadioNapit` RadioNakyma.cs:ssä, `RadioSovitin.OmatNapit`), ja lampun napautus avaa noston kortin.
- **Ihmisen matkan loppu webin mukaan:** ei korttia; Loppu-nappi on pois käytöstä. Pulu on piilossa esityksen ajan ja kävelee lopussa sisään.
- **Matkakirjakortti:**
  - iPad tunnistetaan `UiKerros.Tabletti`-säännöllä.
  - Pallon napautus, veto ja nipistys kutistavat kortin (`PalloKierto.PelaajanEle`).
  - `ui napauta` ilman UI-osumaa välittää napautuksen pallolle.
- **Chat:** vastauksen kuva on kääreessä (Label, jolla on lapsi, ei mittaa tekstiään).
- **App Store -portti:** `MATKAKIRJA_APPSTORE` = kehittäjätila aina pois, eikä koodi-ikkunaa tai ui-komento.txt:tä ole.
- **Kehittäjälehti:** Lukijaääni-dialogi (`Tyohuone.cs` `LukijaaaniIkkuna`, Pelikoodarin Puhe-rajapinta), ja kehittäjäkoodi viedään workerille (`Puhe.TalletaKehittajakoodi`).
- **UI-tehosteet** ladataan taas PCM:nä. Pakattu klippi rikkoo `Aanet.Leikkaa`- ja `Iskut`-funktioiden GetDatan.

## Merge-pyynnöissä (Natiiviseppä mergeää build 5:n viennin jälkeen ja kokeilee iPadilla)

1. **natiivi-ui/lehtiporras 80eb557**, wt `/Users/Shared/Claude/wt/proto-natiivi-ui-lehtiporras`:
   - Lehden sivulta liitetään 4 lohkoa heti ja loput yksi per ruutu (`Porrasta`/`ValmistaSivu`).
   - Kuvien purku on jonossa, 2 kerrallaan (`Kuvat.Vuoro`).
   - Fontit esilämmitetään (`Kirjasimet.Esilammita`).
2. **natiivi-ui/paataso 0f6292b**, wt `…/proto-natiivi-ui-paataso`: UI-lukijat lukevat ensin päätason (`Rakenne.Paatasolta`, `Paataso.Nakyma`).
   Jäljellä ovat Fokusvirrat (`virta` ≠ `data` v38:ssa), LehtiSisalto.Taulu ja PuluHaku (tyypitetyt nostot ovat eri rakenteessa). Nämä tarvitsevat Siirtosepän kenttäkartan.
3. **natiivi-ui/lehtiotsikko e536f8e**, wt `…/proto-natiivi-ui-lehtiotsikko`, pariteettierä 1:
   - Yläpalkki on nyt sivun tarttuva otsikkorivi (`AsetaOtsikko`, `MitoitaNimio`): etusivulla UNOHDETTU AARRE + nimiö, aihesivulla aihe-nimi viivoineen, ☰ ja 🔊 sen sisällä ja lippu perässä.
   - Päiväysrivillä liitelinkki oikealla (kapea < 700: päivä vasemmalla), ja sää on ilman kehystä pienin kirjaimin.
   - Maalehti alkaa suoraan kartalla.
   - Ihmisen matkan testiotsikko korjattu.

   **Ei vielä nähty laitteella.**

## Pariteettikierros (Fable: Laitetestaaja ottaa web-kuvat, Natiivi-UI natiivikuvat ja korjaa)

- **Kuvat ja taulu:**
  - Natiivikuvat, erät 1 ja 2 (25 näkymää × iPad ja iPhone), ovat kansiossa `proto-3d/lokit/pariteetti-20260924/`. Luettelo on `ERA1-NATIIVI.md`:ssä, ja skripti `kuvaa.sh` käyttää simulaattoreita iPhone 1572C658 ja iPad 503000D1 (vain kuvaus, ei asennusta; Laitetestaajan lupa).
  - Taulu on tiedostossa `docs/raportit/pariteetti-natiivi-20260924.md` (haara laitetestaaja-pariteetti-b, PR #3034).
- **Erä 1:n tila:**
  - Rivi 5 (aihesivun otsikko): korjattu lehtiotsikossa.
  - Rivi 13 (linssin otsikko): testikomennon vika, korjattu.
  - Rivi 9 (maalehti): nimiösivu poistettu. **Kesken:** perustiedot pitää tehdä webin tapaan ikonein ja palkein ("PERUSTIEDOT", mittarit demokratiaindeksille ja keskitulolle) sekä HYVÄÄ PÄIVÄÄ -rivi lippuineen. Web: css/styles.css `.maa-osasto`/perustiedot ja js/maalehti.js.
  - Rivi 8 (sisällys): **KESKEN.** Webissä on kiinteä vaalea levy (`.sisallys-levy`, css/styles.css rivi ~20261). Riveillä on pikkukuva, lihavoitu sivun otsikko (`sivunOtsikko`: "Ateena pintaa syvemmältä", "Historian hetki: Louis 1896") ja kaksirivinen kuvaus. Otsikkona "SISÄLLYS ×" ja alla "← Palaa kartalle" -nappi. Web: js/lehti.js `avaaSisallysvalikko` ja `rakennaSisallysLista`. Natiivissa: `Lehtinakyma.VaihdaSisallys`/`sisallysLista`.
  - Rivit 6, 7 ja 12 odottavat Laitetestaajan mittaustavan korjausta. Rivi 10 on 7878cbc:n GetData-bugi, ja kuva uusitaan.
- **Erä 2:** kuvat otettu, Laitetestaajan vertailu odottaa.

## UI-piikit (Fablen tavoite: ei yli 16 ms)

- **Mittaus iPadilla** (development c2b3521, `proto-3d/lokit/ui-piikit-20260924/`, ajotapa `aja2.sh`: konsoli + vain ui-loki, EI koko Documentsia; levy täyttyi 24.9.).
- **Tulokset:** lehti 30–42 ms, maalehti 32 ms, kortti 41 ms, nosto 27 ms, chat 41 ms (avaus) ja 18–25 ms (vastaus). Valikko, asetukset, laukku ja matkakirja: ei piikkejä.
- **Korjaukset:** lehtiportaassa. Uusintamittaus mergen jälkeen (Natiiviseppä tekee development-buildin). Chatin avauksen piikki on vielä korjaamatta.

## Avoimet

1. Pariteetti erä 1: sisällysvalikko ja maalehden perustiedot (yllä).
2. Pariteetti erä 2: Laitetestaajan erälista.
3. UI-piikkien uusintamittaus lehtiportaan jälkeen ja chatin avaus.
4. Raakaluvut: Fokusvirrat, LehtiSisalto ja PuluHaku (Siirtosepän kenttäkartta).
5. ETOPO1 vs. 2022 lahteet.json:ssa (kerrottu Fablelle; Linssiseppä/Siirtoseppä).
6. Inventaario: NUI 198 on / 0 osittain / 0 puuttuu / 0 KOKEET / 5 ei tarvita (`nappi-inventaario-natiivi-20260923.md`).

## Opit

- Label, jolla on lapsi, ei mittaa tekstiään, jolloin korkeus = min-height. Kuvat kääreeseen.
- `DownloadHandlerAudioClip.compressed` estää `GetData`:n. Tehosteet siivutetaan, joten niitä ei saa pakata.
- USS ei tue `:not()`-valitsinta; käytä omaa luokkaa.
- Rich text `<line-height=145%>` antaa rivivälin, ja `MeasureTextSize` mittaa sen mukana.
- `ui napauta` ei aiemmin välittänyt ohi menevää napautusta pallolle, joten kartan napautuksen testit eivät toimineet.
- Koko Documentsin kopiointi iPadilta täytti levyn. Hae vain nimetyt tiedostot.
