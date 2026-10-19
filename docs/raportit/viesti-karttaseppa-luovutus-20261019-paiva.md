# Karttasepän luovutus 19.10.2026 klo 11.4x (Postivahdin kova raja 54 %)

Rooli: Karttaseppä (Opus, high), sessio local_16f80454 (gmail-tili, osoitekirja 19.10.). Kirjoittanut: Karttaseppä itse.

## Lue ensin

- Tämä raportti, sitten oman muistion uusin rivi (memory: karttaseppa-tila-20261010-ilta.md, UUSIN 19.10. 11.4x).
- Kamerajohtajan käyttöohje (Linssiseppä): `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kamerajohtaja-ohje-LS-20261019.md`.
- Pallokierrokset ovat TAUOLLA (PT 19.10.). Ei omia eriä ilman PT:n viestiä.

## Tila

- Web-main: ei Karttasepän muutoksia tänään (main f3820b777 luovutushetkellä).
- Natiivi (proto-git `Matkakirja-natiivi`): juna 204 = `natiiviseppa/juna-204` d3f7b018c.
  - **Kohdekaupungit kehittäjätilassa** (omistaja 17.10. 22.52, työlistan rivi): `karttaseppa/kohdekaupungit-204` a58c817ba + 5933f592b +
    a211fe529, kaikki JUNASSA 204. Ilman huntua kaikki pallot täysinä (KaupunkiPalloMitat.Peitto), hälytinrivi
    "kohdekaupunkipallot N kaupunkia, ruudulla täysinä A, himmeinä B; kuvat …" ja vakiosarjan skenaario 16. PT hyväksyi kuvaparin.
    → Työlistan rivin voi merkitä valmiiksi, kun TF 204 on omistajalla.
  - **Pääkartan ja lentojen kamera Kamerajohtajalla** (PT 19.10.): `karttaseppa/lentojen-kamera-204` 92e5a317a
    (⊃ `karttaseppa/kamerajohtaja-kartta-204` 7e33d426d). **MERGE-PYYNTÖ NS:llä 11.4x, ei vielä junassa.** PT hyväksyi videot.

## Pushatut haarat (peili `natiivi-backup`, peili/proto/karttaseppa/…)

| haara | kärki | tila |
|---|---|---|
| kohdekaupungit-204 | a211fe529 | junassa 204 |
| kamerajohtaja-kartta-204 | 7e33d426d | sisältyy lentojen-kamera-204:ään |
| lentojen-kamera-204 | 92e5a317a | merge-pyyntö NS:llä |
| kiina-paketti-200 (wt/proto-karttaseppa-iss-reitti-198) | 3773371f4 | Kiina v14, tauolla, ei masterissa |

Mitä kamerahaarat tekevät:
1. 8baa88cfa: `Linssit/Ydin/Kamera/PalloLiikkeet.cs` (PalloTila = pallon tila KameraAsentona kartta-avaruudessa: P = pituus, leveys,
   ln korkeus; Yaw = suuntima; Pitch = −kallistus; PalloAjo = PalloKierto.Aja/Etene puhtaana) ja `PalloTarkastus.cs` (KarttaRajat:
   siirto 3,6 korkeutta/s, zoom 5,4 ln/s, kulma 125 °/s, kiihtyvyydet 24/18/280; päät levossa; AlkuLeikkaus).
2. 490cae4e9: PalloKierto.Etene ajaa PalloAjo-liikkeen johtajalla (rata identtinen, testi PalloAjoVastaaVanhaaEtenea).
3. 7e33d426d: PalloKierto.Palauta (lennon jälkeen) = Kaanto(yaw: 0), ei eksponenttisuodinta (nykäisy).
4. 627111f48 + 33a7550f6: `PalloRata.cs` (PalloRata, PalloSeuranta), LennonV3.Kuvaus, Nappula.LentoV3 (LentoKameraAlkaa/Kuvaa) ja
   Nappula.Lentopeli johtajalla. Kartta-testit kääntävät kamerakirjaston erillisenä `KameraYdin.dll`:nä (Ydinin V3 vs Matkakirja.V3).
5. 92e5a317a: AloituslennonRata.KulmanKesto/Yhtyma (liukuma 263 → 91 °/s lähinäkymästä, kesto 6,2 s) ja LennonV3.KameranSuunta
   (±1,3 s, taitteet 444 → 13 °/s²).

## Kesken — tee nämä ensin

1. Seuraa NS:n mergeä (lentojen-kamera-204). Jos NS pyytää korjauksia, työpuu `/Users/Shared/Claude/wt/proto-karttaseppa-lennot-204`.
2. Kun LS:n `linssiseppa/kamerajohtaja-204` c9a9a6ddf (KameraKirjoittaja Kartta-assemblyyn, kameravahti vain kirjoitukset) on
   junassa 204: PalloKierto.Aseta → KameraKirjoittaja.Aseta (lupasin LS:lle). Ei aloitettu.
3. Valoseppä rakentaa ISS-kamerat 7e33d426d:n päälle (PalloTila-malli): ilmoita VS:lle, jos PalloTila/PalloAjo-rajapinta muuttuu.

Ei käynnissä olevia käännöksiä, lukituksia eikä simuajoja (simu 00CF62C2 sammutettu 11.20, SIMU VAPAA ilmoitettu JU:lle).

## Odottaa päätöstä

- Ei omistajan päätöksiä auki. Jatkoerät (Kuvaa-polun loput linsseissä, pallokierrosten kamerat) vasta PT:n viestillä.

## Työtavat ja infra

- Käännös/simu vain JU:n KÄÄNNÖS NYT / SIMULAATTORI NYT -viestillä; skriptit `_tyo/karttaseppa/<erä>/{kaanna,ajo}.zsh`.
- Uusi peli (`uusi-peli`) EI aja aloituslentoa: lentotodisteisiin `komento nappula lenna …` / `komento nappula aloitus …`
  (`_tyo/karttaseppa/lentojen-kamera-204/sk-lennot.txt`).
- Todistusajon `palaute`-rivi lukee vain askeleen jälkeiset lokirivit; jo tulleelle riville `oleta`.
- ffmpegissä ei ole drawtext-suodinta: tekstiraita PIL:llä erillisenä kuvana (kuvatekstit kuvan ulkopuolelle).
- Omat appit: jäljellä `lentojen-kamera-204-app` ja `-jalkeen-app` (voi poistaa, kun lentojen kamera on junassa).

## Velat ja opetukset

1. Väitin ensin, että vakiosarjan 01 ja 16 kattavat lennon jälkeisen palautuksen; eivät kata (uusi-peli ilman lentoa). Korjattu
   PT:lle; opetus: tarkista komennon polku ennen kattavuusväitettä.
2. Liukuman kesto lähinäkymästä on nyt aina 6,2 s (OhitusS − 1, katsepisteen siirto ratkaisee); jos omistaja kokee sen hitaaksi,
   säätö: AloituslennonRata.LiukumaSiirto (2,8 näkymää/s).
3. Kameravahti ei näe PalloKierron omaa transform-kirjoitusta ennen LS:n c9a9a6ddf:ää.
