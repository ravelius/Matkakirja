# Natiiviseppä: luovutus 10.10.2026 klo 19.5x (PT:n nollaus 50 %)

Edellinen: viesti-natiiviseppa-luovutus-20261010-paiva.md (TILA-osiot 11.5x–19.3x: BUILD 177/178/179, museon muistikorjaus, todistusajo-kuittaus).
Proto /Users/Shared/Claude/proto-3d/Matkakirja-proto (Unity 6000.7.0b4). Worktreet: /Users/Shared/Claude/wt/proto-natiiviseppa-j175 (junat),
proto-natiiviseppa-tyokalut (natiiviseppa/todistusajo-kuittaus; poista kun juna 180 masterissa), proto-natiiviseppa-unity67 → T7 (laitekäännökset).
Viestit: SendMessage-raja (10/vuoro) täyttyy → varakanava mcp__ccd_session_mgmt__send_message. PT local_cf5b4eca…, Julkaisija local_1325b8e8…,
LS1 local_4b4b976c…, LS2 local_ee961a2d…, NUI local_e9fdc695…, Siirtoseppä local_c264506b…, Pelikoodari local_242febe9….

## ENSIMMÄISEKSI
1. **Unity-beetaseuranta**: CronCreate "4 9 * * *" (prompt: aja unity-julkaisut.py, UUSI → rivi PT:lle + testikäännös) ja aja kerran
   `python3 /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-skriptit/unity-julkaisut.py` (tyhjä = ei uutta; nähdyt 6000.7.0b1–b4).
2. **JUNA 180** jatkuu (alla). Lukitus vasta kun muistiportti läpi + LS1 KIIRE + kippikorjaukset sisällä + PT käskee.

## JUNA 180 = natiiviseppa/juna-180 420bc0af7 (BUILD 179 75fcc2b1b:n päällä; wt j175; peilattu peili/proto/natiiviseppa/juna-180)
Kuitatut: Pelikoodari pulu-tur-blr2 65975137e (korvaa 4a69112d3 ja e2b97a8a4; Pulu 40 maata), NUI pallo-koysi-sumuun e341491f7 (latauskuvan köysi sumuun),
LS2 peking-vesikerroin 2c2305012, Natiiviseppä todistusajo-kuittaus 80d418513, LS1 museo-varjot-180 9106d012f (lattiaheijastus + sali-v2; ämpärissä
taidemuseo/alankomaat/sali-v2/), Siirtoseppä rantakivet-hamara 71c2080c9, kavely-monimesh dc53ccd54 (+7 097 kolmiota ≈ 0,7 Mt).
Testit L1347/P456/K461, unity 0, tarkista ok. EI junaan: siirtoseppa/diag-kivet (DIAG).
ODOTTAA: LS1 KIIRE intro-luenta-180 9cdc17616 (PT kuittaa iPad-kuvien jälkeen), omistajan kippikorjaukset, kartan KIIRE.
**Lisää muistia: KYLLÄ** (museon peilikamera HDR ~11 Mt + sali-v2, monimesh 0,7 Mt) → MUISTIAJO VASTA YÖN UUDELLEENKÄYNNISTYKSEN JÄLKEEN (PT: swap 18 Gt):
Julkaisijalta KÄÄNNÖS + iPad NYT → kaava scratchpad 4b38df01-b8d2-4933-9f70-8e7681ba2c22/{laite179.sh, muisti179.sh, ketju179.sh} (vaihda SHA/nimet 180:ksi;
laite-skripti T7-kopiossa `git checkout -q -- .` ennen detachia) + proto-3d/tyokalut/natiiviseppa-ajot/museo-muisti-ipad.sh <nimi> 11.
Portti: jetsam tai < 0,5 Gt pysäyttää; museo kaatuu → LS1:n kytkin "museo heijastus 0". Vertailu 179: Pariisi 0,75/0,74, Olavinlinna 0,72, museo 2,85 Gt.
Lukitus kuten 178/179: proto-kaanna.sh <runko> → `git update-ref refs/heads/juna/b13 <runko> <vanha>` → päächeckoutissa (master puhdas)
`git merge --no-ff -F <viesti> juna/b13` → juna.log-rivi → push natiivi-backup master + juna/b13 → SHA + muutosloki (julkaisija-tyokalut/muutosloki-180.txt)
Julkaisijalle → Mac: `MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli MATKAKIRJA_APPSTORE=1 mac-kaanna.sh <SHA> 1.1 180` (HUOM etuliite MATKAKIRJA_) → kopio
lokit/natiiviseppa-mac-tf-180-<sha> → simu-.app vahdin jälkeen `kopioi-juna-app.sh 1.1.180 <sha>` (etsii nyt Products-.appin).

## PYSYVÄT TEHTÄVÄT
- **Unity-beetaseuranta päivittäin** (PT 19.5x, omistaja "kokeillaan aina uusimmalla testi versio"; kumoaa "pysytään b4:ssä"): uusi beeta → HETI rivi PT:lle
  (versio + osuvat korjaukset: iOS/Metal, IL2CPP, muisti, URP, UI Toolkit, kaatumiset) → testikäännös erillisessä haarassa (käännös, unity-tarkistus, testit,
  iPad-muistiajo) → läpi: vaihto seuraavaan junaan PT:n kuittauksella, muuten rivi syineen. Lopullinen 6.7 ja LTS samoin. App Store vain lopullisella;
  6.3 LTS varalla (T7 unity63-talteen, K63-kääntäjäketju /Applications/Unity/Hub/Editor/6000.3.24f1 — älä poista).

## VALMIIT TÄNÄÄN (tiivistelmä)
BUILD 178 = 9e10d4d33 ja BUILD 179 = 75fcc2b1b (TF iOS + Mac, Julkaisija vei). Museon muistikorjaukset 378daacc3 + a52df1672 (Yövartion rajaton ruutuhaku,
keko 1126 → 592 Mt) junassa 179. Todistusajo-kuittaus 80d418513 (todiste lokit/todistus-todistusajo-kuittaus-2-20261010-1924). Levy 81 Gi.
Taustalla EI omia ajoja (cron 440f4d6d katoaa nollauksessa).

## TILA 10.10. 20.05 (uusi sessio, PT 20.0x)
- Unity-beetaseuranta: cron 3d91c360 "4 9 * * *" (session oma, vanhenee 7 pv / nollauksessa); ajo 20.04 tyhjä (ei uutta, nähdyt b1–b4).
- Juna 180 = 420bc0af7 (sis. Pelikoodari 65975137e, PT kuittasi 20.0x). Lukitusportit: LS1 intro-luenta-180 87f1dd8a0 (KIIRE, korvaa 9cdc17616),
  Siirtosepän Olavinlinnan laiturin ohjainkorjaus (KIIRE), Pelikoodarin latausmusiikki + kippikorjaukset, dc53ccd54:n vesipohjan tarkistus,
  iPad-muistiajo yön uudelleenkäynnistyksen jälkeen (Julkaisijan NYT).

## TILA 10.10. 20.28
- Juna 180 = 8f8a93acb (+ LS1 intro-luenta-180 87f1dd8a0, PT kuittasi 20.3x; sis. 9cdc17616 + b5f8a9d8a). L1347/P456/K461, unity 0, tarkista ok; peilattu.
- Odottaa: Siirtosepän laituri-KIIRE (tappi), dc53ccd54:n vesipohja, Pelikoodarin latausmusiikki (+ kippikorjaukset), yön iPad-muistiajo; ajoitus omistajalta.
