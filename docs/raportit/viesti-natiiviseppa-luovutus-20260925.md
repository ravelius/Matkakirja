# Natiivisepän luovutus 25.9.2026 klo 04.5x

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 70 % (Fable). Edellinen luovutus:
viesti-natiiviseppa-luovutus-20260924-ilta2.md. Rooli: natiivin pääkehittäjä, proto-gitin master, Unity-, simulaattori-
ja laitekäännökset, build-juna.

## Tila

- **Build 12 = proto-master b79f036** = TestFlight 1.0.12 (202609250125). Sisältö: juna/b12 a8eb8b8, jossa löydös 46
  (matala valo, horisonttiusva, kallistuksen katto, vektorirannat peitolla 0,25 = omistajan valinta, vektorirajat
  webin voimalla, rajakorkeudet 2026-09-25-gshhs-korkeus), löydös 49 (AudioListener LuoPallossa), löydös 50 (NostoKerros-
  portit, ankkuri, puoli ja ZoomKerroin, Nimikerroksen vaihe 2, kaupunkinimet väistävät nostoikoneita),
  saapumiskamera webin kotelon mukaan (9 %:n ero korjattu), radiouudistus (mastot, topografiapohja hämärässä,
  paneeli, veto, sulku), Panoroi, eleet ja Natiivi-UI:n pariteettierät. Generoidut tiedostot ovat samassa BUILD-
  merge-commitissa.
- Laitetestaajan savukierros (iPhone, docs/raportit/savukierros-b12-20260925.md): kaikki PASS. Epävarma:
  kahden sormen kallistus ei reagoinut synteettiseen eleeseen, joten se pitää vahvistaa oikealla sormella. iPadia ei
  testattu, koska attach odotti omistajan lupaa.
- **juna/b13** on avattu masterista b79f036, ja kaikki build 13 -merget menevät sinne.

## Käännöspalvelu ja juna (omistajan kortit 24.9. klo 22.2x ja 22.5x sekä 25.9. klo 04.1x)

- Kopio proto-3d/Matkakirja-proto-kaannos (worktree + Library-klooni). Kutsu: `proto-3d/tyokalut/proto-kaanna.sh
  <haara>[+<haara>…] [UDID…]`. Pohja on master, jono yksi kerrallaan (lukko /tmp/matkakirja-kaannospalvelu.lukko), ja
  loki on lokit/kaannospalvelu/. Unityn tekemät .metat tallentuvat kansioon `<loki>-metat/`.
- Julkaisijan TestFlight ajaa samassa kopiossa samalla lukolla (#3124). Pääkopio Matkakirja-proto jää sinulle
  (merget, laitekäännökset).
- `tyokalut/juna-merge.sh <haara>` mergeää uusimpaan juna/b<N>-haaraan plumbingilla. Testiajureiden LAHTEET-listat
  yhdistetään unionina (lahteet-union.py), ja muut ristiriidat hylätään, jolloin kirjoittaja mergeää junan omaan
  haaraansa. Metat voi lisätä junaan temp-indeksillä (katso tämän session tapa: GIT_INDEX_FILE, update-index).
- launchd: fi.matkakirja.juna (joka toinen tasatunti 08–22) ja **fi.matkakirja.juna-vahti** (10 min: uusi commit +
  10 min hiljaisuus → käännös Laitetestaajan ja pariteetin simulaattoreihin 1572C658, 3B4CDACB, C1D5E34C, 993F8873).
  Tila tiedostossa lokit/kaannospalvelu/juna-viimeisin.txt.
- BUILD-kaava: savukierros (Laitetestaaja) → valmistelu testihaarassa (merge + LuoPallo + generoidut commitiin, esim.
  valmis/b12) → master-merge, jonka viestissä on sana BUILD ja generoidut samassa commitissa
  (lokit/natiiviseppa-skriptit/build12-master.sh on malli) → SHA Fablelle ja Julkaisijalle.

## Build 13 -jono

1. **Lentopinnan kylmä alku** (haara natiiviseppa/lento-pinta 6a57441, worktree poistettu): komennot `cesium
   0|A–F`. B terävä mutta geometriareikiä, D ja F kaatuivat tai tummuivat, joten oletus 0 pysyy. Juurisyy: Cesiumin
   loadingDescendantLimit ja forbidHoles. Seuraava askel on taustapallo (ulospäin kääntyvät kolmiot 6a57441), sitten
   D:n uusintamittaus kylmällä asennuksella (kylmakoe.sh). D kaatui b12o:ssa heti käynnistyksessä, joten tutki
   konsoli.txt ensin.
2. **Black Marble -yövalot** radioon (uniformit _radioYonValot valmiina) ja **E28:n syvät tasot** Z9–Z11 ämpärissä
   (2026-09-23a-pohja-20260924e28syva). Fable: Z9 Laattapalvelimeen vasta uuden reseptin (2026-09-25) sarjasta,
   kun Fable ilmoittaa. Varalaattaa ei vaihdeta ennen sitä.
3. Kaupunkinimet: pelaajan nappula (pinot) varauksiin ja nimiölle 8 asentoa kuten webissä (nyt vain oikea).
4. Cesiumin varoitus "Two or more raster overlays use the same material key", kun radio lisää reliefin
   (KarttaKerrokset.LisaaRasteri).
5. Natiivi-UI:n erä 2: merge-pyynnöt tulevat Natiivi-UI:lta junaan b13. Mergeä juna-merge.sh:lla ja pyydä
   ristiriidoissa, että Natiivi-UI mergeää junan omaan haaraansa.

## Opit tältä yöltä

- Odotussilmukka `pgrep -f "testi.sh"` löytää toisten odottajien komentorivit ja lukkiutuu, joten aja jonot yhtenä
  ketjuna. Älä käytä `pkill -f "aja.sh|…"`, koska se tappaa myös käännöspalvelun ajot.
- Laitekäännös jumittuu iOS-moduulin alustukseen (noin 200 s), kun simulaattoreita on käynnissä noin 10.
  laite.sh:ssa on nyt RAUHA=600.
- testi.sh keskeyttää nyt mergen ristiriidassa (ei enää laitekäännöstä puolikkaasta mergestä).
- Kuvausskripti (k46-kuvat.sh): `kuva` kaappaa kehyksen lopussa, joten perään tarvitaan `odota`, ja ajoille
  annetaan omat kuvanimet.
- peli-komento `jatka-matka` ei sulje aloitusta, joten käytä `ui jatka` tai `ui aloita`.

## Worktreet (katto 3)

wt/proto-natiiviseppa-loydos46 (irrotettu, vapaa uuteen haaraan), wt/proto-natiiviseppa-nimikerros
(natiiviseppa/nimikerros-50, mergetty), wt/proto-natiiviseppa-saapuminen (natiiviseppa/saapuminen, mergetty). Kaikki
kolme voi poistaa tai käyttää uusiin haaroihin.
