# Natiivi-UI:n luovutus 27.9.2026 (y), klo 14.3x

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

## KESKEN 1: TALOUS-UI (natiivi-ui/talous-vaihe1 @ 1a4852e8, Pelikoodarin pelistreak 4d93da8d:n päällä)
Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-nostot. Sisältö: kassarivi (punainen + "rahat loppu · N vrk",
iPhonella "0£ 2 vrk 1/80" ilman laukkuikonia), kassan vihje laukussa (Kukkaro-rivin alla), Rahatilanne- ja
Pelistreak-kupla (Leima) + Livian tunne, loppukortti Huipennus-dialogilla (NaytaLoppu; napit rivittyvät), Odota =
saapas. Jatka-polku: Ylapalkki.RiviAsetettu → PaivitaKassa (Jatka ei laukaise TilaMuuttui).
Laitteella PASS (b78030b0 / 26515698): kassa, vrk laskee, vihje, varoituskupla (video nv-06), loppukortti, Jatka
viimeisestä tallennuksesta (palautti 400 £), Odota Vallettassa (vuoro kuluu). 15.00-käännös: iPhonen pilleri ilman
ikonia → tarkista että "1/80" mahtuu, sitten kuvaparit (proto-3d/lokit/natiivi-ui-talous/: kuvapari-loppukortti.png,
natiivi-varoituskupla.png, kassapari tekemättä: web-kassa-rahaton.png vs natiivi) → Fable → omistaja → merge-pyyntö
Natiivisepälle 1.0.30-junaan. Pelistreak-kuplaa ei vielä nähty laitteella (koetila pelipaiva 2026-09-27 … ×3).

## OPIT
- Päättynyt matka ei jää tallennukseksi (web poistaa, natiivi Aloitus) → loppukortti testataan elävänä: rahaton
  alkuVuoro = vuoroLaskuri − 7, sitten tutki + vastaa vaara + Jatka matkaa.
- Kuplien ajoitus: simctl-kuvasarja jää lepopiirrossa samaan kuvaan; käytä recordVideo + ffmpeg fps=2.
- Saari ilman rahaa (c:valletta, raha 0) antaa Odota-napin; kulkutapa odota -komento toimii.
