# Natiivi-UI:n luovutus 24.9.2026 (h), klo 17.3x

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924-g.md`. Proto-git on `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
työpuu `/Users/Shared/Claude/wt/proto-natiivi-ui-nostomerkit` (nyt haarassa `natiivi-ui/b10-jono`). Tarkistukset:
`./Peli-testit/unity-tarkistus.sh`, `./Peli-testit/kaanna.sh` (261/261), `python3 tyokalut/uss-tarkistus.py`.

## Mergetty
- Build 9 = master 9a5618b (iphone-island 6d39af4: päätasolukijat, valintavihje, Fablen päätös B iPhonella vihje muistiin).
  Kuvaparit `proto-3d/lokit/pariteetti-b9/merge-pyynto-natiivi-ui-b9.md`.
- Build 10 -erä 1 = master d3629d3 / kohtaus 3726485 (natiivi-ui/ei-webissa 42c5015): Ei webissä E1, E3–E5, E7–E20
  (E2 ja E6 jäävät), E10–E11 ryhmämerkki (levy r 3,4, nimiö vain NostoKerros.Lahella), E3 nostokortti napautuspisteen
  viereen + raahaus, Tietoja-attribuutiot (NASA, EOX), tehosteäänten esilataus (Linssisepän sulkupiikki).
  Kuvaparit `pariteetti-b9/merge-pyynto-natiivi-ui-b10.md` ja `kuvapari-b10-*.jpg`.

## Merge-jonossa: `natiivi-ui/b10-jono` 0e8ff30 (Natiiviseppä kääntää testi/b10e:n; b10d = 9584ae2 on laitteilla)
Haarat (kaikki masterista 3726485, yhdistetty b10-jonoon):
- `natiivi-ui/ylapalkki` b80fd27: iPhonelle webin ruskea palkki (57 pt, täyte 4,8/7,2, logo 92×22, pilleri 12,48 px, ☰ 40×40),
  iPad 61 pt (logo 130×32, pilleri 14,4 px, ☰ 44×36) — mitattu 393×852, 852×393, 834×1194, 1024×1366
  (`proto-3d/lokit/pariteetti-b10/web-ylapalkki-*.jpg`). ⚙ EI näy (löydös 37). iPhonen ☰ = omistajan linssivalikko,
  linssit eivät laukkuun (Ylapalkki.Puhelin). iPhonella kartan veto piilottaa palkin, napautus palauttaa; vaaka piilossa;
  piilossa VAIN ☰ (karttaselite- ja linssinappi piiloon, Ylapalkki.PalkkiPiilossa). Testikomento `ui ylapalkki veto|napautus`.
- `natiivi-ui/arkkipaperi` 29326ba + `natiivi-ui/lehtiteksti` (b542574, nostokortin riviväli): lehti ja nähtävyysarkit
  #f5f0e2 + hieno kohina (Kuviot.Arkkipaperi 420 px → 140 pt); etusivun esittely American Typewriter 16 #5a4326 lh 1,6;
  aihesivun teksti Iowan 16,32 #211d18 lh 1,62 + anfangi sivun 1. nostoon; johdanto kursiivi 16,32; nostokortti lh 1,58.
- `natiivi-ui/nostohytina`: löydös 27, merkit pyöristämättä kameran liikkeessä, levossa pikselille.
- `natiivi-ui/linssisulku` fe7ff15: löydös 32, "✕ Sulje linssi" 1,2 s → teksti sulaa 0,6 s → pyöreä ✕ (todennettu b10d,
  `pariteetti-b9/natiivi-b10d-linssisulku-kehykset-iphone.jpg`).
- `natiivi-ui/kuvaselaus` 6285b06: löydös 34, reunanapautus 24 % + pyyhkäisy 30 px (web galleria.js / kuvasarja.js), ei nuolia
  (Rakenne.KuvaSelaus: nostokortti, lehti, nähtävyysarkki, Kuvasuurennos, Wiki). Todennettu b10d (ei nuolia, 1/7).
- `natiivi-ui/maailmanappi` 5d65549: löydös 36, KOKEET-rivi "Maailma" (webin #kehittaja-maailma-btn, maapallo), vain
  kehittäjätilassa, huntu pois (Varitaso.huntu). Webin "napauta kaupunkia siirtyäksesi" puuttuu (Pelikoodarin logiikka, ei tilattu).

## Puuttuvat kuvaparit (b10e:stä, 4 koossa: 393×852, 852×393, 834×1194, 1024×1366)
- Yläpalkki: veto/vaaka "vain ☰" (b10d:ssä karttanappi vielä näkyi), iPad 61 pt web vs natiivi.
- Lehti: etusivu ja sivu 2 tekstit ja tausta web vs natiivi (web: `pariteetti-b10/web-lehti-tausta-iphone.jpg`,
  mittausskripti `Matkakirja-laitetestaaja/tools/.natiivi-ui-b10-lehtifontit.mjs`).
- Nostokortti vaihe 1 ja 2 (web: `pariteetti-b10/web-nostokortti{,2}-{iphone,ipad}.jpg`, napautus Marseille 47,672 / 370,860).
- Maailmanappi: kytke kehittäjätila simulaattorissa (PlayerPrefs-plist, ks. Asetukset.KehittajaAvain) ja kuvaa KOKEET-rivi.
- Hytinä: ennen/jälkeen-kehyssarja (simctl io screenshot silmukassa, kuten linssisulun sarja).
Kuvausskriptit: `pariteetti-b9/kuvaa-b9.sh` (iPhone 17 FB234D08, iPad 503000D1), `kierros-b10c.sh`.
Kun parit ovat valmiit: merge-pyyntö `pariteetti-b10/merge-pyynto-natiivi-ui-b10b.md` Natiivisepälle ja 8 rivin raportti Fablelle.

## Build 11 -jono
- 4 lehtieroa (b9-kuvapareista): anfangi/kappalejako muillakin sivuilla, tehtävän vastausrivit (web valintaruutu + viiva),
  alanappien kapiteelit (POISTU LEHDESTÄ, EDELLINEN / ATEENA PINTAA…), vihjekuplan häntä ja paikka (iPad).
- Päinvastaiset puutteet (pariteetti-natiivi-20260924.md): vertailukortin maakartta, lipun vaakunat, karttaselitteen
  peukalolevy, kohdekartan +/−.
- Kompassinappi (Natiivisepän PalloKierto.PalautaPohjoinen(0.4f), RAJAPINTA.md) — kysy Fablelta, onko webissä vastine.
- Nostokortin tausta: Fable kysyy omistajalta, jos hän tarkoitti muuta kuin tekstiä.

## Muiden haarat
Linssiseppä tekee löydöksen 35 (MinipulunKortti.KysyValmis, PuluChat.Konteksti) itse. Pelikoodari teki "Liiku tänne" -polun
(pelikoodari/liiku-tanne) ja avaustekstin portille.

## Opit
- Webin karttamerkit ovat kankaalla: mitat koodista (css/js), napautukset Playwrightin touchscreen.tap-komennolla.
- KaupunkiKortti ja Matkavalinta jakavat mk-valintarivi-luokat (rajaa tyylit säiliöön).
- Näkymien leveys paneelista (panel.visualTree.layout), ei Screen.widthista (pikselit).
- tools/uusi-worktree.sh --poista ei tunne proto-gitin worktreitä: `git -C proto worktree remove`.
- Natiivisepän socket vaihtuu: lähetä nimellä "Natiiviseppä (Opus)".
