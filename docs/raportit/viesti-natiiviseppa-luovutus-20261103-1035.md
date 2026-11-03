# Natiivisepän luovutus 3.11.2026 klo 10.35 (konteksti 30 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-0930.md (sen lisäys 09.35 käsitelty alla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä.

## TEHTY TÄLLÄ VUOROLLA
1. **PT 10.0x ETUSIJA – Pariisin lähtö ja Lontoon tulo (KK:n ruudukot lokit/kk-lontoo-4fc57a4aa-20261103/)**: haara
   natiiviseppa/lahto-tulo-218 = **9613f5ad7** (pohja runko 8d18d7047; wt/proto-natiiviseppa-esilataus; peili ok). Testit 2224/793/591, tarkista 0.
   - Tulo sumea 7–8,5 s: pyyntöloki (konsoli "elävä pyyntö") näytti, että Cesium tarkentaa taso kerrallaan (z11–z13 6,0–6,5 s, z14 7,0–7,5,
     z15–z16 8,0–8,5, z17 sen jälkeen) ja z17-lähinäkymä (~220 palaa) ensin vei koko matkan: ennakoidussakin ajossa 0 pyydettyä z13–z15-palaa
     levyllä. Korjaus: ElavaEsilataus.Lahinakyma = välitasot z11–z16 karkein ensin (ValitasoPalat: kartio TAI lopun ruutu, kumpi suurempi;
     z15–z16-kartio oli ruutua pienempi), z17 viimeisenä. LahinakymaValmis/edistys ennallaan (vain z17).
   - Lähtö beige 2,0–3,0 s: 8d18d7047 EI korjannut. Aloituskaupungin (ja piirroskaupungin) välitasoja ei ole levyllä. Korjaus:
     KarttaKerrokset.EnnakoiLahto (PeliOhjain.Joutilaana, ensimmäinen joutilastyö) piirtää nykyisen näkymän välitasot (ElavaEsilataus.Lahto)
     levon ehdoin ValmiiksiRinnakkain palaa; ElavaEnnakoija odottaa sen. Laattapalvelin.EsilataaElava(lahto: lista) ilman kohteen kirjanpitoa.
     Levossa ajettava esilataus yieldaa 16 levytarkistuksen välein.
   - Simutodistus (JU:n vuoro 10.14–10.31): lokit/natiiviseppa-esilataus-video-9613f5ad7-20261103-1021 ja -kylma-…-1026 (ruudut/lahto-1-3_5.jpg,
     tulo-6_5-9.jpg, aikajana.txt). TULO KORJATTU: Lontoo terävä ~7,5 s (ennen 8,25–8,5), zoomissa levyltä 162 (ennen 20).
     Pariisin lähdön välitasot 142 palaa valmiit ennen lähtöä, MUTTA LÄHTÖ YHÄ BEIGE ~1,0–1,75 s.
   - **LÄHDÖN TODELLINEN SYY (seuraava työ):** oma striimitauko piirroksen alla (PiirrosKerros.Striimi.cs, c4867180f 2.11.): Peitetty → pallon
     tileset suspendUpdate + renderöijät pois; StriimiTakaisin vasta kun ehto purkautuu = nousun alkaessa (konsoli 10:24:23.891 "piirros: striimi
     takaisin (4 laattaa)", 0,26 s valinnasta), jolloin Cesium valitsee ja lataa nousun tasot alusta eikä ehdi. Ehdotettu korjaus (PT:lle
     kerrottu 10.3x): striimi takaisin jo kohteen valinnassa (PeliOhjain: kohde valittu → PiirrosKerros-lippu, joka pakottaa ei-Peitetty) ja
     piirros täysin näkyvissä, kunnes pallon laaja taso on ladattu (tai enintään ~1 s) – tarkista, ettei omistajan 2.11. vierityssujuvuus kärsi
     (tauko vain lähdön ajan). Todistus samalla ketju.zsh:lla (lähtöruudukko).
   - PT:ltä kysytty 10.3x: 9613f5ad7 junaan 218 heti (tulo + muiden kaupunkien lähtö)? → odota vastausta, merge ehdokas-työpuuhun.
2. **Striimikartan vieritys 60 fps (erä 2), mittarikorjaus (PT kuittasi):** 1.11. "~20 % ruuduista myöhässä" sisälsi levon 30 fps -ruudut.
   Liikkeessä aidosti myöhässä kauko 4 %, keski 3 %, lähin Z17 0 %, zoom 4 % (0,6 s latausjakso). _tyo/natiiviseppa/fps60/LOYDOS.md viimeinen
   osio, työkalu liikeruudut.py. Työlistan "joka kuudes ruutu" liioiteltu (PT tietää).
   - iPhone-ajo 09.54 EPÄONNISTUI (xctrace "Cannot record until the device is connected", konsoli tyhjä, ei mittaustiedostoja):
     lokit/natiiviseppa-fps-218-8d18d-iphone-20261103-0954. PT 10.1x: laitemittaukset odottavat (omistaja katsoo Lontoon myöhemmin, iPhone ei nyt).
   - Valmis ajo: zsh _tyo/natiiviseppa/fps60/fps218.zsh ipad|iphone lokit/julkaisija-laite-218-8d18d7047/Matkakirja3D.app (JU:n Release-laiteäppi,
     ei omaa käännöstä). Huom. käännä uusi laiteäppi, jos lahto-tulo on jo rungossa.

## JONO
0. **PIIRROKSEN LÄHTÖBEIGE** (yllä "LÄHDÖN TODELLINEN SYY"): korjaus haaraan natiiviseppa/lahto-tulo-218 (wt/proto-natiiviseppa-esilataus),
   testit, JU:n vuoro, ketju.zsh, lähtöruudukko PT:lle. PT:n järjestys 10.2x: lähtö + tulo loppuun ENNEN fps-mittauksia (iso iPad nyt vapaa).
1. Lahto-tulo 9613f5ad7: PT:n kuittaus (kysytty 10.3x) → merge natiiviseppa/juna-218:aan (wt/proto-natiiviseppa-ehdokas) → testit → peili →
   JU päivittää ison iPadin ENNEN kuin omistaja katsoo Lontoon (PT 10.1x).
2. Laitemittaukset (60 fps, Time Profiler, vain liikeruudut > 34 ms): iso iPad vapaa (PT 10.2x, omistaja katsoi Lontoon pieneltä iPadilta 10.22 "Hyvä"); iPhone vain PT:n luvalla.
3. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla Lontoo/Pariisi, KK:n suunnitelma 20261103-saapumisen-kuvat.md) kun NUI:n A+C rungossa.
4. Kylmän tapauksen loppusumeus: odottaa PT/KK-palautetta korjauksen 9613f5ad7 videoista.
5. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget (VS/NUI/KS) PT:n kuittausten mukaan (zsh: `${C}:...`).
6. Avoin riski PT:lle: UITK-sumennuksen liuku muissa Kokoruutu-tilanteissa (+1 Gt). Juna 218 jatkuu; lukitus/TF vain "OMISTAJA PYYSI JULKAISUA".
7. Odottavat ennallaan: LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:tä; PK bugi 2; NUI:n leikehaara 7280634c4 EI;
   Pariisin vieritys osa 3 EI NYT; Pariisin piirrosta EI optimoida; KS:n tasankoresepti → uusi SileaUrl-kierros; Z11–Z12-välitasoa EI.
8. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = 8d18d7047 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; peili natiivi-backup peili/proto/natiiviseppa/juna-218).
  Isossa iPadissa 8d18d7047 (JU 09.51). TF 217 testaajilla.
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus (nyt natiiviseppa/lahto-tulo-218), -introkoe eikä
  T7-kopioita. Luovutusworktreet natiiviseppa-luovutus-20261103-* saa poistaa mergen jälkeen (tools/uusi-worktree.sh --poista <nimi>).
- Testiskriptin "VIKA Pariisin intro ei päättynyt 120 s:ssa" toistuu (video silti ok) – selvitä, jos aikaa.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>` (~5 min).
- Lähtö+tulo-video ja ruudukot (JU:n vuoro): `zsh /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/lahto-tulo/ketju.zsh <sha9>`.
- Pyyntöloki tasoittain: grep "elävä pyyntö" konsoli-video.txt (vain zoomauksen ajan + 1 s).
- Release-laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`.
- Muistikoe: `zsh .../juna218/muisti-koe218.sh <sha9>`. Pitkät ajot Bash run_in_background lokitiedostoon.
