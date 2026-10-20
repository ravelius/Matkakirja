# Fablen luovutus 25.9.2026 klo 00.4x (tili B, sessio 24.9. klo 20.0x → 25.9. klo 00.4x)

Edellinen: viesti-fable-luovutus-20260924-d.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md
klo 20.09 → 00.36 (~75 otsikkoa). Omistaja meni nukkumaan klo 00.4x; yötila (kortit + yksi push, ei muistutuspusheja).

## Raamattuun tänä sessiona (kaikki sitovia)
- JUMI → KORTTI (+ PushNotification puhelimeen; Postivahti muistuttaa yli 10 min auki olleista, ei yöllä).
- VIESTIRAJA JA VARAKANAVAT: SendMessage ~10/vuoro → mcp__ccd_session_mgmt__send_message session id:llä → postitiedosto.
- TYÖTAVAN NELJÄ PARANNUSTA: käännöspalvelu (proto-kaanna.sh, kopio Matkakirja-proto-kaannos, TOIMII), build-juna
  (juna/b12, build-12-suunnitelma.md, 2 h ajastin = Natiivisepän launchd-kortti omistajalle), tilataulu
  (docs/raportit/tilataulu.md haarassa postivahti, 10 min), sisältöjunat 10.03/20.03 + BUILD-sana → automaattinen TF;
  Julkaisija PYSYY Opuksella (omistaja: tokeneita riittää, neljä tiliä).
- RADIOLINSSIN POHJA = värillinen topografia hämärässä yövaloineen (havainnekuva A, PR #3122); Iso-raja 2 milj.
- PERUSKARTAN RESEPTI 2026-09-25 (löydös 46): ei rantamustetta, meri sävyliukuna ilman käyriä, GLO-30/90-reliefi,
  pallosarja Z0–Z9 koko maailmalle; rannat ja rajat natiivissa vektorina (rantaviiva himmeä tai pois, rajat täydellä).
- ELEET: kierron estin 15°, kallistus hitaampi ja vedolla ylös, maastoon tarkkuutta (löydös 47, pelikoodari/eleet-kierto c5a4833).
- KAUPUNKIKORTTI JA KAMERA (löydös 48), ÄÄNET NATIIVIIN (löydös 49), LINSSIKATALOGI moottoreittain.

## Omistajan löydökset (build 11) ja omistajat
44 yläpalkki (tehty b11), 45 Liiku (tehty), 46 kartta rosoinen/valo/kallistus (Karttaseppä resepti + Natiiviseppä valo,
suodatus, usva, maasto, Maaraja pyöreät päät 603ac2d, vektorirannat E1–E3), 47 eleet (merge-pyynnössä), 48 kaupunkikortti
(Natiivi-UI liuska-48 397b37f; kamera Natiiviseppä Panoroi + Pelikoodari kytkentä), 49 äänet (Pelikoodari
aanet-kuuluviin d14f766, mittaus b12q-laitekäännöksestä ~01.15; pulun repliikki 404), 50 nostojen asemointi (Natiivi-UI),
51 maalehden tahmea vieritys (Natiivi-UI + Laitetestaajan mittaus), 52 saapumisen väliteksti (Pelikoodari). Seuraava 53.

## Build-tila
Build 11 = 1.0.11 (202609241848), proto 6ff16f3, TestFlightissa klo 21.5x; allekirjoitus korjattu #3120 (nimetty
identiteetti, ei hakulistan vaihtoa); #3124 vienti käännöskopiosta. Build 12 kokoontuu juna/b12:een: radio-mastot,
kamerareitti 6c2378e (kierto ≤ 180°, esilataus), löydökset 46–52, Natiivi-UI:n radio-mastonimi 7dd1e45, tyyppikuvake
79a49af, intro-palstat, juliste-url de8852b, liuska-48, kylmän alun sumeus (Natiiviseppä). BUILD-sana → Julkaisija ajaa
1.0.12 automaattisesti.

## Linssikatalogi
docs/linssikatalogi.md + linssikatalogi-data.js (165 linssiä, 6 moottoria, Pelissä nyt X1–X7 + B1 + C7 + Y1–Y6,
yhdistetyt 13, uudet D7 B8 B9 F5 P6 E10 R36 Q3 Q4 Y1–Y10; pilotit M1 ja S1 ennallaan). Sivu tuotannossa
matkakirja.app/linssikatalogi.html (v2209); korjaus-PR #3129 valmis Julkaisijalle; NELJÄ VÄLILEHTEÄ (omistaja 00.3x)
Sisältökirjurilla työn alla. Kuvaputki: erä 1 (29 linssiä) ämpärissä, erä 1b (23 linssiä) tilattu, kuvaputki TAUOLLA
(Codex siirtää datansa NAS:iin). Katalogin 18 uutta id:tä (X1–X7, B8, B9, D7, F5, P6, E10, R36, Q1–Q4) ja 12 poistunutta
päivitetään tilaukseen kun kuvaputki palaa.

## Pariteetti
tools/pariteetti-ajo.mjs (Pelikoodari) masterissa: 2. ajo juna/b12 0a55b60: SAMA 3 / ERI 124 / PUUTTUU 31 / VIRHE 18,
tilavartija. Rajat: >16 px bugi, 8–16 hienosäätö, <8 SAMA. Reititys proto-3d/lokit/pariteetti-ajo/b12-2/reititys.md
Natiivi-UI:lla. Laitetestaaja: mitattu käsikierros b11o:sta (rivit 1,5,6,7,12,14,21b,23,41; iPad 11 riviä + 9 + 30;
nappi-inventaario 3,5,6,7,8), PR #3126.

## Karttaseppä
E28 → 02.45 (vahti; 89/101 klo 00.0x). Reseptin 2026-09-25 koodaus kahdella agentilla (DEM-kaistajako GLO-30/90,
reseptilippu; rajojen pistekorkeudet), sitten koepoltto ja kuvapari omistajalle (Kreikka Z6 + Peloponnesos Z9) → vasta
sitten koko poltto (~3 h yöllä) ja ämpäri Fablen käskystä. Yövalosarja Black Marble klo 9 jälkeen. #3123 työkansiosiivous.
Levy: 59 Gt klo 22.5x (orvot työkansiot 35 Gt poistettu, Fablen skripti −14 Gt); Codexin NAS-siirto vapauttaa ~100 Gt.

## Sessiot (id:t)
Julkaisija (Opus) local_9922c4b6-320f-4074-aed4-f2811a7c9640 (nollattu 23.5x); Natiiviseppä local_860f922b-94b8-49da-975d-4233a993bbb8
(nollattu 20.2x); Pelikoodari local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 (nollattu 00.3x); Natiivi-UI
local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 (nollattu 00.3x); Linssiseppä local_3273f209-099d-4ed3-830e-e4e1b40bcc7d
(nollaus käsketty 00.2x — tarkista); Siirtoseppä local_7a1255c5-d525-4323-9438-70e7379ad2fe; Karttaseppä
local_445a5c7b-4317-4989-b65d-4cb81bd10056; Sisältökirjuri local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f (nollattu 00.0x);
Laitetestaaja local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 (nollattu 23.1x); Postivahti local_6f3d4c35-be83-4985-82c7-8d641ad18f1d.

## Opit
- mcp send_message session id:llä menee läpi kun SendMessage ei; SendMessage vaatii [ref]-tarkenteen, jos sama nimi on RC:ssä kahdesti.
- Julkaisija jäi luokitinestoon 20 min → JUMI → KORTTI -sääntö; kortista push puhelimeen.
- Sisältöjuna toimi (12 PR:ää yhdellä versionostolla). Käännöspalvelu syntyi tunnissa.
- Laattapyramidin poltto jätti työkansiot (35 Gt) — korjattu #3123; lokit kaikki alle 3 vrk, yön siivous ei auta.
- Omistajalla neljä tiliä: mallivalinta kyvyn mukaan, ei kiintiön.

## Jono uudelle Fablelle
1. Aamulla omistajalle yksi raportti: kortit yön ajalta (Postivahti kokoaa), build 12 -tila, äänten mittaus (49),
   Karttasepän kuvapari uudesta reseptistä → omistajan hyväksyntä → koko poltto → ämpäri → Z9 Laattapalvelimeen.
2. Julkaisija: #3129 merge, sisältöjuna 10.03; katalogin välilehdet-PR kun Sisältökirjuri ilmoittaa; kuvat omistajalle.
3. Natiiviseppä: E1–E3 vektorirannat (rannan peitto säädettävä, kolme vaihtoehtoa kuvapariin), löydös 46 valo/usva/maasto,
   kylmän alun sumeus, launchd-ajastin (kortti omistajalle). Kun juna/b12 on koossa → BUILD.
4. Kuvaputki palaa tauolta → päivitä linssikatalogin tilaus (18 uutta id:tä, 12 pois), erä 1b, galleria 59.
5. Omistajalta (ei kiire): 2RX77QMLHA:n poisto, Individual → Organization, GLO-30 koko maailmalle NAS:iin?
