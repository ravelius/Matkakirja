# Natiivi-UI:n luovutus 25.9.2026 (j), klo 00.4x

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924-i.md` (haara natiivi-ui-luovutus-i). Proto-git on
`/Users/Shared/Claude/proto-3d/Matkakirja-proto`. Masterin mergeää Natiiviseppä. Build 12 kootaan integraatiohaaraan
`juna/b12` (docs/raportit/build-12-suunnitelma.md, haara selvittaja-3d-luovutus).

- Tarkistukset: `./Peli-testit/unity-tarkistus.sh` ja `python3 tyokalut/uss-tarkistus.py`.
- Web-mittaukset: `Matkakirja-laitetestaaja/tools/.natiivi-ui-b12-*.mjs`.
- Kuvat, mitat ja merge-pyynnöt: `proto-3d/lokit/pariteetti-b12/`.
- Kuvauskierrokset: `proto-3d/lokit/pariteetti-b9/kierros-b1*.sh` (kuvaa-b9.sh).

## Uusi työtapa (25.9.)
- **Testikäännös itse:** `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh haara1+haara2 FB234D08-4693-4496-9C7A-6C7C15B03963`.
  - Käännä vain omaan iPhone 17:ään (FB234D08). Jaettu iPad 503000D1 vain pyynnöstä.
  - Jono on yksi kerrallaan, joten aja taustalla. Tulos on lokin `proto-3d/lokit/kaannospalvelu/` viimeisellä rivillä.
  - Jono voi olla tunnin tukossa: silloin tulos on "VIKA jono". Laita käännös uudelleen jonoon.
- **Vaaka-asento:** `ui kierto vaaka|pysty|auto`, koska Simulator.appia ei ole. Kuva käännetään sips -r 270:llä.
- **Oikea napautus:** mcp iOS Simulator `tap` (device FB234D08, pisteet). `ui napauta x y` kirjoittaa osuman ui-lokiin.
- **UI-puu pariteettiajoon:** `ui puu [nimi]` (Pelikoodarin, masterissa).
- **Viestiraja:** kun SendMessage kieltäytyy, käytä mcp__ccd_session_mgmt__send_message session id:llä, tai kirjoita
  posti-tiedosto (Raamattu VIESTIRAJA JA VARAKANAVAT).
- **Jumissa:** tee AskUserQuestion-kortti ja PushNotification.
- **Worktreet:** enintään 3.

## Masterissa tänään (juna/b12)
- nosto-levea 43b70aa: iPadin vaakataitto ≥ 1100 pt, Havainnekuva-merkintä ja `ui kierto`.
- kartuscha-reuna b3cca79: kartuschan täyte 0, iPhonen Liiku ei nouse kortin päälle, Liiku pelkkänä sanana kuten erä 19.
- ylapalkki-matala 323a0b5: käynnistyksen NRE korjattu (Pulu.Oikea ja Lehti null). Kainalo c6db5b5.

## Haaroissa, odottavat (tilanne klo 00.4x)
1. **natiivi-ui/radio-mastonimi 7dd1e45** (natiiviseppa/radio-mastot-haaran päällä):
   - ▶-napit ovat piilossa mastojen aikana, ja valitun maston nimi on juuren vieressä.
   - Merge-pyyntö on Natiivisepällä (merge-pyynto-natiivi-ui-b12-radio-mastonimi.md), kuvapari b12f OK.
2. **natiivi-ui/tyyppikuvake 79a49af**: nostokortin ylärivin aihesymboli ja kohteen luokkanimi kohteenKategoria-säännöllä.
   - 13 png:tä UI/Resources/Symbolit, joiden .metat syntyvät editorissa.
   - Kuvapari b12j OK (kuvapari-b12j-tyyppikuvake-*). Merge-pyyntö puuttuu: kirjoita se ja lähetä Natiivisepälle.
3. **natiivi-ui/intro-palstat c79d00c**: lehden etusivun intro ≥ 768 pt kahdella palstalla (Virtaa-mittari yleistetty),
   tasattu `<align="justified">`, Tavutus.Suomi (U+00AD) kansiossa Kappalejako.cs.
   - b12j: tavutus ja palstat OK, mutta tasaus EI toiminut ilman lainausmerkkejä. c79d00c lisää lainausmerkit, ja se on
     todentamatta. Tarkista iPhonen vaakakuvassa `ui lehti ateena 0`.
   - Jos tasaus ei vieläkään toimi, kokeile `<align=justified>` Labelin -unity-text-align kanssa tai kysy.
4. **natiivi-ui/juliste-url de8852b**: julisteen osoite kaksinkertaistui (…/julisteet/https://…), joten galleria ja
   laukun vedokset olivat tyhjiä. Todenna, että galleria näyttää kuvat, ja lähetä merge-pyyntö.
5. **natiivi-ui/liuska-48 397b37f** (LÖYDÖS 48, omistaja, build 12 etusijalla): KaupunkiKortti kirjoitettiin uudelleen
   webin kaupunkiliuskaksi merkin viereen.
   - Uusi Kirjasin.Atlas = Liberation Serif kursiivi (TTF kansiossa UI/Resources/Fontit).
   - Mitat: pariteetti-b12/web-liuska-mitat.txt ja web-liuska-auki/ennen-*.png.
   - Kamera: Natiiviseppä tekee `PalloKierto.Panoroi(lat, lon, ruutuMaali, kesto, valmis)` haaraan natiiviseppa/panoroi.
     Pelikoodari kytkee sen AvaaKorttiin: kaupunki kohtaan (W/4, H/2), 0,42 s, ei zoomia. Molemmille on viestitty.
   - Todenna: liuska näkyy merkin oikealla, rivit ja pallot oikein, ohi-napautus sulkee, eikä pulu hypi.
     Kuvapari web-liuska-auki-iphone.png vs natiivi.
- Yhteiskäännös 2–5 → FB234D08 oli jonossa klo 00.30 (tausta-ajo). Tarkista uusin loki kaannospalvelu-kansiosta.

## Jono (Fable 25.9. yöllä, build 12)
- **Löydös 50:** nostojen asemointi kartalla webin mukaan (paikat kaupunkiin nähden, koot, tyyppimerkit, nimien sijoittelu,
  väistö). Mittaa Ranska ja Kreikka iPadilla ja iPhonella, kuvaparit. Tiedosto UI/NostotKartalla.cs.
- **Löydös 51:** maalehden tahmea vieritys. Pyysin Laitetestaajalta iPad-mittauksen natiivi vs Safari (kehysajat,
  viive, inertia). Epäillyt: Porrasta-animaatio vierityksen aikana, kuvien purku (Kuvat, 2 kerrallaan) ja ScrollView-
  oletukset. Lehtinakyma.NaytaSivu luo ScrollViewin oletusasetuksilla.
- **Pariteettiajo b12-2:** reititys `proto-3d/lokit/pariteetti-ajo/b12-2/reititys.md` (39 iPhone-riviä). Fablen rajat:
  yli 16 px = bugi build 12:een, 8–16 px = hienosäätö, kun kosket näkymään. PUUTTUU-riveistä tarkista, onko toiminto
  natiivissa. Alustava luenta:
  - Moni ERI johtuu hyväksytystä iPhone-asettelusta (ei yläpalkkia: "£300", "Päivä 1, aamu" ja pilleri), eikä ole vika.
  - Ensin tutkittavat: #35 maalehden aihesivu 1 (8/9 tekstiä puuttuu), #26 nostovisa, #25 nostokortti (puuttuu, voi olla
    kuvaushetki), #36 mediarivi, #6 aihesivun nostot, #27 eläintäky (Lisää dy +189), #28 aarre (Jatka matkaa),
    #1 etusivu, #17 kaupunkikortti (korvautuu löydös 48:lla), #14 asetukset ja #40 karuselli (dy −79).
- Avoimet (i):ltä: iPadin etusivun intro (tehty, kohta 3), kompassinappi (kysy Fablelta), hytinä (löydös 27, laite).

## Opit
- Julisteet: sisältöpaketin kuva.url on täysi osoite (skeema 1.20). Tarkista Url-kokoajat, kun skeema muuttuu.
- UITK-tavutus: pehmeä tavuviiva U+00AD toimii (b12j), ja rivi katkeaa tavuviivalla.
- Rich text `<align=justified>` ilman lainausmerkkejä ei tasannut (b12j). Unityn dokumentaation muoto on lainausmerkeillä.
- `ui napauta` ohittaa Input Systemin. Oikea kosketus kulkee mcp tap -työkalulla.
- Jaettu iPad on usein toisen käytössä: kuvaa omalla iPhonella ja iPadin koot kääntämällä muualla vain pyynnöstä.
