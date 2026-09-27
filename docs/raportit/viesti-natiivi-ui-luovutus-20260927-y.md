# Natiivi-UI:n luovutus 27.9.2026 (y), päivitetty klo 17.2x

Jatkaa luovutusta (x) -20260927-tilinvaihto.md. Fable = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (päätoimittaja
tilapäisesti Opus). Simulaattorit: oma iPhone 17 FB234D08, jaettu iPad Pro 11 503000D1. Käännökset proto-kaanna.sh:lla
:00–:15-ikkunassa (Karttaseppä: ei polttoja ennen klo 22). Apuskriptit scratchpadissa: k.sh (kuten x), merkitse.py,
talous-tila.py (tallennuksen muokkaus: rahaton | loppu), web/talous-kuvat.mjs (webin talous-kuvat tuotannosta).

## VALMIIT TÄNÄÄN
- AVAUSKORTTI (11a3c43a): omistaja hyväksyi kuvaparit 35262df2 → Natiiviseppä kirjasi 1.0.30-junaan (juna/b13 23648936).
- MITÄ UUTTA -LÖYDÖS: juurisyy muutosloki-natiivi.json jäi build 11:een. Natiivin vartija natiivi-ui/mitauutta-build
  296ffd04 (asennetun buildin rivi aina kärjessä, "Peli päivittyi" vain edellistä asennettua uudemmat) → junassa
  (abd7ae10). Julkaisija: rivit 1.0.12–1.0.29 + TF-vartija #3405. CFBundleVersion = aikaleima (1.0.29 (202609270926)).
- 1.0.29-TODENNUS simulaattorissa: luennan säätimet + paneeli kerroksen juuressa, kaiutin tauko/jatko (rms 0,105 →
  0,006 → 0,106) PASS. "Ratas/kaiutin puuttuu iPhonella" EI VIKA: LISÄÄ vierittää yläriviä ylemmäs (löydös 131),
  ui puu listaa vain näkyvät; Laitetestaaja korjasi raporttinsa 84da8c2a7.
- Worktreet: kuvapakka poistettu; pulu-karttavaisto-codex on samireivinen-tilin (Codex poistaa, postilaatikko 98f4e19a1).

## TILANNE 17.2x
- TALOUS-UI 2addc08c on BUILD 30:ssä (master). Elämäpalkki (omistaja hyväksyi web #3421 16.5x): natiivi-ui/talous-vaihe1
  @ 1281414c (8 neliötä kartan yläreunaan, väistö, miniselite; lyhyt "0£ 2 vrk" kaikilla) → MERGE-PYYNTÖ Natiivisepällä
  1.0.31:een, kuvaparit Fablella (lokit/natiivi-ui-talous/kuvapari-elamapalkki2-{iphone,ipad}.png).
- LUENTA AINA (omistaja 15.5x): natiivi-ui/luenta-aina e8199dc0 (Pelikoodarin f4ab9dc2:n päällä) → merge-pyyntö lähetetty.
- HAVAINNEKUVA 793576bd, MITÄ UUTTA 296ffd04, AVAUSKORTTI 11a3c43a: junassa/masterissa.
- ALOITUSVALINTA (omistaja 16.3x/16.5x): pisteet → natiivi-ui/aloitusvalinta 7f699522 (NaytaVain(nakyvat) aina) →
  merge-pyyntö lähetetty. Pulun repliikit TOIMIVAT: esittely näkyy KERRAN LAITTEELLA (lippu matkakirja-livia-avaus, kuten
  web). KYSYMYS Fablella: jokaisessa uudessa matkassa? Diagnostiikkahaara natiivi-ui/livia-avaus 7cca24a9 (EI mergeä;
  poista, kun päätös tehty). Lipun poisto simulaattorista: `xcrun simctl spawn <UDID> defaults delete
  <data>/Library/Preferences/app.matkakirja.proto3d matkakirja-livia-avaus` (plutil-muokkaus ei mene cfprefsd:n ohi).

## KESKEN: VIERITYS (omistaja 17.0x) — natiivi-ui/vieritys-2 @ 34366dbd, työkopio wt/proto-natiivi-ui-vieritys
Analyysi (Opus-agentti): opas/linssikatalogi ym. käyttivät UITK:n ScrollViewia (heitto 1/3 Safarista), kartta piirtyi
arkin takana, katto 60 Hz. Tehty: (1) Kosketusvieritys.LiitaYleinen kaikkien UiKerros-juurien pystysuuntaisiin
ScrollViewihin (haltuunotto vasta pystyvedossa; lehti/nosto omilla liitoksillaan), (2) opas/linssipaneeli ≥ 85 % ruudusta
→ KuvaSumennus.Kokoruutu (pysäytyskuva, kamera pois). KYSYMYS Fablella: 120 Hz UI-vierityksessä (S10).
Mittaus: scratchpad siirtyma.py <video> [pt-leveys] (kehysten välinen siirtymä PIL:llä). ENNEN (077548e0, opas pariisi,
pyyhkäisy 200 pt / 0,1 s): iPhone 612 pt, 56 liikkuvaa kehystä/s; iPad 813 pt, 48/s. JÄLKEEN: 18.00-käännös
(juna/b13+talous+luenta-aina+aloitusvalinta+vieritys-2, FB234D08 + 503000D1) → sama mittaus → video + luvut Fablelle →
merge-pyyntö.

## OPIT
- Päättynyt matka ei jää tallennukseksi (web poistaa, natiivi Aloitus) → loppukortti testataan elävänä: rahaton
  alkuVuoro = vuoroLaskuri − 7, sitten tutki + vastaa vaara + Jatka matkaa.
- Kuplien ajoitus: simctl-kuvasarja jää lepopiirrossa samaan kuvaan; käytä recordVideo + ffmpeg fps=2.
- Saari ilman rahaa (c:valletta, raha 0) antaa Odota-napin; kulkutapa odota -komento toimii.
