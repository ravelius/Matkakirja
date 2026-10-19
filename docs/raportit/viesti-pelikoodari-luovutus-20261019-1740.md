# Pelikoodarin luovutus 19.10.2026 klo 17.40 (Postivahdin KOVA RAJA 35 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-1557.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia).
Raportti kaikista simuista: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raportit/simu-204d-20261019.md.

## KÄYNNISSÄ NOLLAUSHETKELLÄ (tämän session taustalla, EI irrotettu – voi kuolla nollauksessa)
- Simuvuoro JU:lta (17.32) kahdelle ajolle peräkkäin:
  1. käärö v2b + drone + avoimet v2: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-kaaro-v2/aja-b.zsh` (loki aja-b-1732.log,
     app juoksupeli-kaaro-v2b-204-app = 08f2d1d09 ⊃ 1dc6448e9, iPad 39644E75)
  2. rakettivideo: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-video-vertailu/peraan.zsh` (odottaa 1:n "AJO"-riviä,
     loki raketti-video-vertailu/aja.log; pelikoodari-iPhone 3E6A1D4D pystyssä, app juna204-valikko-jatko-app 396021ef)
- ENSIN: `pgrep -fl todistusajo` + lokien tail. Jos kuolleet: aja puuttuvat uudelleen (taustalle). Molempien jälkeen JU:lle "SIMU VAPAA".

## LISÄYS 17.45: käärö v2b -simu VALMIS (AJO 0) – lokit/todistus-kaaro204b-ipad-20261019-1736
- Exception 0, maailma 10/10 (avoimet v2: normaalit seinät, taivas näkyy, ei kattoja), käärön kaikki 3 mallia paikalleen ennen
  uusintaa; repesi z73 ja Codexin irtopalat kirjoituksineen lattialla (R-0.png); "drone nousee ovella 4,50 m" / "drone palaa"
  jokaisella ovella (~10 m reittiä kerrallaan). Kuvissa E-04…E-08, R-0…R-30 + kaaro-v2b-botti.mp4 → kohta 1 = kuvapari PT:lle
  (vertaa Codexin esikatseluihin täysikokoisina; tarkista videosta kallistus kaarteen sisään ja ettei kamera mene seiniin).
- Rakettivideo lähti perään (raketti-video-vertailu/aja.log).

## ENSIN (järjestys)
1. **Käärö v2b -simun tarkistus** (lokit/todistus-kaaro204b-ipad-*): (a) ehjä käärö edessä E-kuvissa + repeämä R-kuvissa Codexin
   mallilla (ei harmaita paikkamalleja); (b) "maailma osia 10/10" = avoimet-v2 (normaalit seinät, ei kattoja); (c) lokissa "drone
   nousee ovella 4,50 m" / "drone palaa"; videosta ovikohdat: kamera palkin yli, Puyi kuvassa, paluu pehmeä; (d) drone kallistuu
   kaarteen SISÄÄN (69456f21b) eikä mene seiniin. → PT:lle 3 riviä + KUVAPARI: Codexin `…/juoksupeli-avoimet-rakennukset-v2-20261019/
   delivery/previews/ovikamera-vertailu.png` ja `seinat-ennen-jalkeen.png` + pelikuva ovelta TÄYSIKOKOISINA; samoin käärö: Codexin
   `…/scroll-tripo-v2/delivery/previews/kaaro-nakymat.png` + pelikuva. PT:n ehto: mainitse viestissä mitkä 12/22 GLB:tä jäivät pois
   ja miksi (raportin loppu: 10 collision + yhtenainen-maailma(+collision); peli lataa osat) ja että kaikki 4 huonetta ovat v2-korkeita.
2. **Rakettivideo PT:lle** (omistajan pyyntö 17.32, 9.3 poikkeus): lokit/todistus-raketti-pysty-iphone-*/raketti-pysty.mp4 → leikkaa
   ffmpeg:llä ilman ääntä (-an) (1) ~10 s laukaisu alustalta nousuun (sytytys −2 s … +8 s), (2) ~3 s valaan hyppy ja loiskahdus
   (avauksen alussa, loki "valas hyppy 1"). Kumpikin < 30 MiB. Tarkista täysikokoisina ruutuina (ffmpeg freezedetect: ei simun
   jumiruutuja; kuorma oli 58–127). Jumissa → uusi ajo kevyemmällä kuormalla. Polut PT:lle.
3. **NS:lle merge-pyyntö junaan 204** vasta käärö v2b -simun ja PT:n kuittauksen jälkeen: pelikoodari/juoksupeli-kaaro-v2-204 kärki
   1dc6448e9 (⊃ juoksupeli-aanet-204 993c0df9b + käärö v2 + drone + käärön rinnakkaislataus + avoimet v2 + nosto). Ämpäri
   juoksupeli/maailma-v4/avoimet-v2/ on viety (JU 17.02).
4. **Raketin automaattinen käynnistys** (omistaja 17.27, PT; EI junan 204 ehto): pelikoodari/raketti-autokaynnistys-204 30495a9a6
   (juna-204 d16ab89a5:n päällä; wt /Users/Shared/Claude/wt/proto-pelikoodari-raketti-auto). JU kääntää ~20.00 →
   raketti-auto-204-app; sitten `zsh …/simu-raketti-auto-204/aja.zsh` (iPad; skenaario tarkistaa: ei nappia, "käynnistys: lähtölaskenta"
   ilman painallusta, "raita … T0:ssa"). Synkka säilyy rakenteellisesti (sama KaynnistaNyt-ajastus kuin painalluksessa, lähtee kun
   alustan intro on soinut raidan lähtölaskentakohtaan; katto 40 s). Latauskuva a0: näkyykö vain laukaisupaikan nimi? Jos ei → kysy PT.
   Kuvapari/lyhyt video → PT.
5. **Kuvalähde (BY-SA) simu**: käännös 5890ccd32 JU:n L2-jonossa (ei vielä valmis 17.31) → `zsh …/simu-kuvalahde-204/aja.zsh`
   → PT:lle lähderivi + ☰ Lähteet täysikokoisina; vasta kuittauksen jälkeen merge-pyyntö NS:lle.
6. Käärö v2.1 (Codexin repeämäreunat samoin nimin): kun PT kuittaa, uusi vienti uuteen kansioon (kaaro-v21/) + KaaroKansio-vakio.
7. Mac WASD 4814ab2d1 omistajan paluuseen; PR ravelius/Matkakirja#4945 pidossa.

## TEHTY TÄSSÄ SESSIOSSA (16.01–17.40)
- Simu 204d (a075e982c): muistokuplat näkyvät kuvineen (39 Texture2D), maailma 10/10, 0 poikkeusta; kaaretaulun kupla ohitetaan
  oikein (ei kuvaa). Drone kallistui ULOS ja meni 90° kaarteissa seinän/katon sisään → 69456f21b (merkki käännetty; sisällä
  kääntöseuranta 4,5/s + viiveen katto 18°, ulkona 35°).
- Simu käärö v2 (21dd49e20; 1. yritys keskeytyi mykistykseen kuormassa 92): käärön mallit latautuivat peräkkäin muiden perässä → ehjä
  vasta z144 (revittiin z73) → 18f813022 (oma lataus heti, 3 tiedostoa rinnakkain); skenaario v2b lämmitysjuoksulla.
- Omistajan päätös 503b1ee32 (PT 16.5x): avoimet rakennukset v2 + dronen nosto ovilla → e12c0a793 + 1dc6448e9:
  DroneNosto (Matkakirja.Peli; 17 palkkia Codexin collision-GLB:istä, lentokorkeus 4,5 m / portti 4,95 m, nousu 7/s, paluu 3/s),
  sisäpihan portin katon sääntö pois (katto poistettu), MaailmaKansio "avoimet-v2/", sisapiha yhdistetty 1 737 → 22 primitiiviä.
  DroneNostoTestit: koko rata eteen + taakse 4–12 m/s → palkkiosumat 0 (ilman nostoa 55), muut seinät 0; Juoksu-testit 43/43.
  Vientipaketti _valmiit/juoksupeli-avoimet-v2-vienti-20261019 (portti KAIKKI OK) → JU vei 17.02.
- PR ravelius/Matkakirja#4977 mergetty (CI vihreä).
- tarkista.sh / unity-tarkistus 0 virhettä jokaisessa commitissa.
- Uudet wt: proto-pelikoodari-raketti-auto (haara pelikoodari/raketti-autokaynnistys-204).
