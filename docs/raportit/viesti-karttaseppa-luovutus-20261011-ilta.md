# Karttasepän luovutus 11.10.2026 ilta (noin 16.1x, PT:n nollaus)

Edellinen luovutus: `viesti-karttaseppa-luovutus-20261011-aamu.md`. Tilamuisti `karttaseppa-tila-20261010-ilta`, jonka loppurivit ovat tämän session loki.
**Älä aloita uusia töitä ennen kuin kiintiö nollautuu klo 17.30 (PT).**

## 1. AVOIMET (jatkokohta)

1. **Vatikaanin kohdekartta, juna 183.** Haara `karttaseppa-vatikaani-kohdekartta` d03678b91 (KESKEN-commit, pushattu),
   worktree `wt/karttaseppa-vatikaani-kohdekartta`. Kartassa 6 kohdetta: Pietarinkirkko, Pietarinaukio, Sikstuksen kappeli,
   Apostolinen palatsi, Vatikaanin museot ja Vatikaanin puutarhat (wiki "Vatican Gardens"). tarkista-karttapisteet on ok.
   **Tekemättä:** PNG:n katsominen, `npm test` ja PR Julkaisijalle (mallina #4412). Overpass on ruuhkainen; toimivin palvelin on kumi.systems.
2. **Pariisin puuttuvat aukiot kipille, juna 183** (Stortorgetin malli, T7 `_tyo/karttaseppa/kippi-tukholma-20261011/kippi-aukiot-tukholma.json`).
   Kerätty (ei vielä tiedostossa):
   - Place Vendôme Q643520. Colonne Vendôme Q1111051 48.86747/2.32944, 44,3 m (fr-wiki). Maanpinta 77,4 m (ell, IGN DTM 4 m).
   - Place de la Bastille Q778784. Colonne de Juillet Q269641 48.853165/2.369139, 50,5 m. Maanpinta 81,4 m (DSM 10 m min, ±2 m).
     Katse ei saa näyttää Opéra Bastillea (Carlos Ott, elossa; Ranska). Ehdotus: kamera etelässä ja katse_suunta 0.
   - Place de la République Q175055. Monument à la République Q15057808 48.8675/2.3638, 25 m (patsas 9,5 m + jalusta 15,5 m, Morice 1883). Maanpinta 81,3 m.
   - Place Saint-Michel Q1201111. Fontaine Saint-Michel 48.853144/2.3437 (Wikidatassa kaksi kohdetta: Q692839 (en) ja Q3076073 (fr)), noin 26 m (agentti tarkistaa). Maanpinta 78,8 m. Katse noin 190 kohti suihkulähdettä.
   - Place du Tertre Q526595, 48.886539/2.340772, ei monumenttia. Maanpinta 169,6 m. Valinnainen, koska se on 200 m Sacré-Cœurista.
   - Vertailukuvat: Sonnet-agentti kirjoittaa ne tiedostoon `scratchpad/kippi/pariisi-vertailukuvat.json`. Scratchpad katoaa nollauksessa, joten hae kuvat uudelleen, jos tiedostoa ei ole.
   - Ämpärin maanpinnat: `maa-20261010/maa-pariisi-lahi.png` (DTM 4 m, kattaa x −5204…+984) ja itäosalle `korkeus-20261008/korkeus-pariisi-kauko.png` (DSM 10 m). ENU-origo 48.86122/2.35092.
   - Toimitus LS1:lle ja Pelikoodarille (worker liiku-lista ja esittely-v1h). Ennen toimitusta suojatarkastus: kaikki monumentit ovat 1800-luvulta ja vapaita.
3. **Stortorget kipille, juna 183:** Pelikoodari lisää sen workeriin, ja data on toimitettu. Sergels torg on PT:n päätöksellä pois.

## 2. Valmista tässä sessiossa

- **Aloituskaupungit #4380** Ateena, Pariisi ja Tukholma (omistaja 11.5x) 1049ce1de, PT kuittasi, Julkaisija mergeää. Lisäksi niputuskorjaus 5b4b9a051.
  Natiivikuvaa ei tarvita (PT: testaus vain automaattisilla).
- **Pääkaupunkien kohdekartat:** e03 7 + Ramallah (Pelikoodarin #4391) ja Afrikka 42/48 (#4405 + #4412, mergetty).
  Kigali, Mogadishu ja Asmara siirrettiin keskustaan (`tools/tee-paakaupungit.mjs` SIJAINTIKORJAUS). Kuusi kaupunkia ilman karttaa odottaa tekstivaihetta.
  Amerikat EI nyt (vain Eurooppa). SDS on Etelä-Sudanin oikea pelikoodi.
- **Kipin suojatarkastus:** `docs/raportit/kippi-suojatarkastus-20261011.md` (tässä haarassa). Siinä PT:n päätökset ja A3 (LS1:n mallit).
  Toteutus #4413 (esittelykuvat tukholma-v7 ja pariisi-v4) ja vientipaketti `esittely-suoja-vienti-20261011` on VIETY, ja Julkaisija mergeää #4413:n ja julkaisee workerin.
  Notre-Damen lisenssi CC BY-SA 4.0 on merkitty, LS2 v6k18. Kipin ulkopuoliset obeliskikuvat PT ohjasi Sisältökirjurille.
- **Avainvuoto:** Sonnet-agentin xtrace tulosti avaimia transkriptiin. PT vie asian omistajalle. Agenttiohjeisiin on lisätty xtrace-kielto.

## 3. Worktreet

- `wt/karttaseppa-aloituskaupungit` (#4380): poista, kun mergetty.
- `wt/karttaseppa-esittely-suoja` (#4413): poista, kun mergetty.
- `wt/karttaseppa-vatikaani-kohdekartta`: jatka tästä.
- Poistettu: paakaupunki-kartat, -e03 ja afrikka-kohdekartat.

## 4. Opit

- Wikipedian `/w/api.php` ja `query.wikidata.org/sparql` ovat robots.txt:ssä kiellettyjä. `/wiki/`-sivut ovat sallittuja, ja koordinaatit saa sivun `wgCoordinates`-kentästä.
- Afrikan putki: Overpass-ehdokkaat, Sonnet-agentit (OHJE.md), korjaa.py, kokoa.mjs, piirra.sh ja kontaktiarkki (arkki.py). Putki oli scratchpadissa ja katosi nollauksessa, joten sen voi rakentaa uudelleen tämän kuvauksen mukaan.
- Ranskan panoraamanvapaus ei kata kaupallista käyttöä, kun taas Ruotsin ja Suomen rakennuksia saa kuvata vapaasti (PT:n linjaus 11.10.).
