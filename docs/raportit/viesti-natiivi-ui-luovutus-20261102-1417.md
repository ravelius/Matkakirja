# Natiivi-UI: luovutus 2.11.2026 klo 14.17 (Liiku runkoon, sillat ja hehku todistettu)

Edellinen: viesti-natiivi-ui-luovutus-20261102-1345.md (PR 5987). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Valmiit
- **Liiku-nappi webin pohjan mukaan** (OMISTAJAN PÄÄTÖS 13.30): proto natiivi-ui/piirros-tahdet-218 11492e364. Kompassi + sana
  pergamenttilevyllä (.mk-liiku > .mk-liiku__nappi: samat tokenit kuin .mk-matkavalinta__rivit .mk-valintarivi = web .actions button).
  Rajattu kartan Liikuun, koska .mk-liiku__nappi on myös oppaan nappien LIIKU-pohja (OpasValikko, MuseoTaulu). iPhone pitää oman
  asunsa (omistaja 24.9.: läpinäkyvä sana). Huom: webin fokusnäkymän Liiku on yhä läpinäkyvä sana (PÄÄTÖKSET 28 kohta 3).
  PT KUITTASI 14.07, **NS mergesi runkoon f5afb5164**. Todistus proto-3d/lokit/todistus-liiku-sillat-jalkeen-048755428-20261102-1402
  (pari-liiku-kiinni/auki/ranska.png, liiku-napautus.mp4; ennen todistus-liiku-sillat-ennen-394a5b467-20261102-1354).
- **Seinen sillat veneiden päälle** (omistaja 13.19): proto natiivi-ui/piirros-sillat-218 cee38d922 (NS:n c4867180f:n päällä).
  PiirrosKerros.Sillat (22 siltaa + eiffel-joki, KS:n nui-rivit.txt), jono Tasot.Length + 2, kytkimestä riippumatta, kansio
  SiltaVersio leikkeet-sillat-20261102 (JU vei 13.54, tavut = paketti). Todistus OK: proto-3d/lokit/todistus-sillat-jalkeen-048755428-20261102-1407
  (pari-vene-silta.png: ennen vene sillan päällä | jälkeen alta, ei saumaa; vene4-sillat.mp4 n. 22–32 s). Lähetetty PT:lle 14.16.
  Veneet jäätyvät levossa (Joutosyke) → videoissa `komento syke jatkuva` (skenaario: scratchpad sillat-vene.txt, sisältö alla).
- **Pääkohteen kultahehku pois** (omistaja 13.21, PT/KS): sama haara d7b4244c5 (NostotKartalla.PaakohdeHehku = false). EI vielä
  käännöksessä; KS ajaa yhteisen parin omalla vuorollaan (karttaseppa/perinto-kipinat-218 9afaad3cc + d7b4244c5), pari PT:lle KS:ltä.

## SEURAAJAN JONO
1. Sillat: PT:n kuittaus → mergepyyntö NS:lle natiivi-ui/piirros-sillat-218 (cee38d922 + d7b4244c5). NS: vaatii hänen
   striimikorjauksensa c4867180f runkoon ensin (odottaa mittausta + PT:n kuittausta). Hehkun osalta odota KS:n kipinäparin kuittaus.
2. PELIT-välilehden 4 Codex-minikuvaa (tilaus postilaatikossa f670c1140; ei toimitettu 14.17): kytke FotoMinit/CodexFotot-tauluun, pari PT:lle.
3. Edellisen luovutuksen jono 3 (karikatyyri pois -liike) ja 6 (B nostot lajimerkein, E saapumiszoomaus): ei Postivahdin
   välittämässä PT:n järjestyksessä 13.4x; kysy PT:ltä ennen aloitusta.
4. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiivi-UI".

Worktreet: wt/proto-natiivi-ui-piirros-tahti (tahdet-218, mergetty) ja wt/proto-natiivi-ui-piirros-sillat (sillat-218, kesken).
Vienti-appi: proto-3d/app-jako/natiivi-ui-liiku-sillat (048755428 = sillat cee38d922 + Liiku).

Veneskenaario (todistusajo.sh --skenaario): ui konsoli pois / ui kierto pysty / komento karikatyyri on / komento veneet on /
komento syke jatkuva / komento veneet nayta 3 0.006 / odota 6 / video-alku vene4-sillat / odota 70 / video-loppu / komento syke jaatyy.
