# Natiivi-UI: luovutus 2.11.2026 klo 14.47 (Liikun kumous, 14.37-kohdat 1–3, karikatyyri pois -mittaus)

Edellinen: viesti-natiivi-ui-luovutus-20261102-1417.md (PR 5993). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Tehty (proto-git, kaikki natiiviseppa/juna-218 c7c3ffa2a:n päällä; runko nyt 23b37d035)
- **Sillat + hehku** (edellinen jono 1): jo rungossa c7c3ffa2a (NS mergesi), ei toimia.
- **Jono 3, karikatyyri pois -liike**: haara natiivi-ui/karikatyyri-kiinni-218 **e61f72c0b** (wt/proto-natiivi-ui-kiinni):
  NostotKartalla.SeuraaKameraa (UiKerros.KameranJalkeen) siirtää merkit kameran jälkeen samassa ruudussa. Käännetty
  (app-jako/natiivi-ui-kiinni, linja 1, JU:n vuoro). **VIKA EI TOISTUNUT SIMULLA**: merkki ja nimi 0 px kiinni kartassa jo ennen
  (hidas veto, nopea liuku, omistajan zoom). Mittaus proto-3d/lokit/todistus-kiinni-jalkeen-e61f72c0b-20261102-1436/MITTAUS.md
  (+ ennen -1435, zoom -1442/-1443). PT:lle kysytty 14.4x: missä tilanteessa omistaja näki liikkeen, mergetäänkö varmistus.
- **Liikun kumous** (PT 14.5x, KK: ei muutoksia ilman omistajan pyyntöä): haara natiivi-ui/liiku-palautus-218 **47067b095**
  (git revert 11492e364; USS identtinen 394a5b467:n kanssa). wt/proto-natiivi-ui-liiku-palautus.
- **OMISTAJAN 14.37 (PT) kohdat 1–3**: haara natiivi-ui/omistaja-1437-218 **eb9ad99fc** (wt/proto-natiivi-ui-1437), tarkista.sh 0:
  1) HetkenValinta.SadeMukana = false (sade pois, laiva/juna/parvi jäävät); 2) ElavaMatka.HehkuNakyy = false (käytyjen hehku);
  3) Aloitusverho.LogoOsuusIpad = 0,27 (iPhone 0,54), Rakennus.LogoLaunchScreen kirjoittaa iPadin storyboardiin oman osuuden.

## SEURAAJAN JONO
1. **JU:lle pyydetty 14.4x käännös**: liiku-palautus-218 + omistaja-1437-218 + karikatyyri-kiinni-218 (+-yhdistelmä proto-kaanna.sh:lla,
   PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/app-jako/natiivi-ui-palautus-1437). Odota KÄÄNNÖS NYT. Sitten todistusajo F7513985:
   skenaario alla (ennen = app-jako/natiivi-ui-kiinni e61f72c0b, jälkeen = uusi). Parit PT:lle: Liiku vanha | palautettu (kuva 0),
   hehku (1), iPad-logo (2). Kuittaus → mergepyynnöt NS:lle (Liiku ensin, PT: "ennen muita jonoja"). Lopuksi "VUORO VAPAA" JU:lle.
2. Jono 3: PT:n vastaus kysymykseen (tilanne / merge e61f72c0b).
3. 14.37 kohta 4: saapuminen = ensin zoomaus kaupunkinäkymään, VASTA SITTEN introkuvat ~70 % kuva-alasta, kartta näkyy ympärillä
   (korvaa E:n "zoomaus introa pitkin"; ks. luovutus 0900 kohta 5b: saapumiszoomaus aina keskustaan). Video PT:lle.
4. Jono 6: B nostot lajimerkein piirrokselle.
5. PELIT-välilehden 4 Codex-minikuvaa (tilaus postilaatikossa f670c1140, EI toimitettu 14.47): kytke FotoMinit/CodexFotot-tauluun, pari
   omistajalle PT:n kautta.

Todistusskenaario (palautus-1437.txt):
ui konsoli pois / ui kierto pysty / komento aja 48.858 2.345 0.012 3 / odota 5 / kuva 0-pariisi-liiku … /
linssi elava reitti marseille pariisi lontoo amsterdam berliini / komento aja 49 6 60 3 / odota 6 / kuva 1-eurooppa-kaydyt … /
linssi elava hetki sade / odota 2 / linssi elava hetki parvi / odota 2 / kaynnista-uudelleen / odota 2.5 / kuva 2-aloituslogo … /
ei-testattu iPhone: logo ennallaan / ei-testattu sade: arvonta ilman sadetta.
Mittausskriptit (videon ruuduista, numpy): viive.py (ruutupari) ja ajautuma.py (ruutu 0 vs muut) — kopiot proto-3d/lokit/todistus-kiinni-jalkeen-e61f72c0b-20261102-1436/.
