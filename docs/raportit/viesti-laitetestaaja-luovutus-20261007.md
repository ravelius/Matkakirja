# Laitetestaaja: luovutus 7.10.2026 illalla (tilinvaihto)

## OMISTAJAN PÄÄTÖS 7.10. klo 15.5x–16.0x (sitova, Postivahdin kautta) — LUE ENSIN
- **Laitetestaajan rutiini poistettu käytöstä**: ei koekäännöksen savua, ei rutiinikierroksia, ei stillejä/videoita kuittausta varten, ei iPad-mittauksia eikä toistoajoja; roolit eivät tee omia iOS/iPad/Mac-käännöksiä. Simu vain jos vian syy on muuten epäselvä (ilmoitus Päätoimittajalle etukäteen yhdellä rivillä). 15.5x-erä (apurahakortti + TF 161 -rutiini) peruttu.
- Siis: ei ajoja ilman uutta, erillistä pyyntöä Päätoimittajalta. Vanhat ohjeet alla (ajokaava) ovat varalla, jos pyyntö tulee.

## Tila
- Haara `laitetestaaja-savukierros-b13` (checkout /Users/Shared/Claude/Matkakirja-laitetestaaja), kaikki pushattu (kärki ks. `git log -1`). Ei käynnissä olevia ajoja. Simu 1572C658 Shutdown, sovellus poistettu; iPad 3B4CDACB ei käytetty.
- Tulokset 7.10. (kuittaus-*-20261007.md + todistus-*): **TULOS 155 (061c8850) OK**, **156 (59f03c63) OK**, **160 (a5b381a7) OK**, **161 (68429b27) OK**; kaikissa 0 Exception.
- Odottaa: Julkaisijan "SIMULAATTORI NYT" -viestiä (UDID + app-polku + SHA). Tulos vuoron viimeiselle riville "TULOS <build>: OK/VIKA – …" + raportti; yksi lyhyt viesti Julkaisijalle (simu vapaa) kun hän pyytää.

## Ajokaava (toimii, ~5 min / ajo)
- `proto-3d/Matkakirja-proto/tyokalut/todistusajo/todistusajo.sh --era <nimi> --udid 1572C658-6455-4E55-8C05-3F88CB3C32F6 --app <polku.app> --sha <kaannos.txt> --skenaario <tiedosto> --nyt`, käynnistys `perl -e 'use POSIX; if(fork()){exit 0} setsid(); open(STDOUT,">","<out>"); open(STDERR,">&STDOUT"); exec(...)'`, odotus `pgrep`-silmukalla.
- Vakioskenaario = `skenaariot/01-jatka-matkaa.txt` + `odota 12` + `11-opas-amsterdam.txt` (ilman # -rivejä, `veto 200 760 200 160 0.5` + `odota 1` ×10 yhden vedon tilalle; 160:ssa maanosat jo ylhäällä) + `linssi linssi pois` + `04-linna.txt` (`odota 15` → `odota 75`). Skenaariotiedostot ovat session scratchpadissa (katoavat) — rakenna uudelleen tästä.
- Sudenkuopat: (1) kuormassa (load > 100) mykistysvarmistus voi aikakatkaista oppaan avauksen jälkeen → ajo keskeytyy, lisää `odota 12` ennen `linssi opas testiotsake 1` ja aja uudelleen; (2) linnassa Keittiö kuunnelma alkaa vain kun saapumiskierros (70 s) on ohi — tap +15 s ei vie huoneeseen (156:n epäilty havainto, ei varmistettu viaksi); (3) uninstall vaatii boottauksen: `simctl boot` → `uninstall app.matkakirja.proto3d` → `shutdown`.

## Avoimet
- iPad 00008103 10 min opas-muistiajo (ei VIE-ehto) tekemättä.
- Todentamatta usean junan yli: Kysy-kysymyksen napautus → `opas: kysy`; Kaupunkikierros; Keittiö kesken saapumiskierroksen (toistettava ennen vikaraporttia).
