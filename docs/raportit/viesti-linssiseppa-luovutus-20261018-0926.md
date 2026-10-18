# Linssisepän luovutus 18.10.2026 klo 09.26 (Postivahti: KOVA RAJA 43 %)

Edellinen: viesti-linssiseppa-luovutus-20261018-0735.md. Id:t /Users/Shared/Claude/osoitekirja.md (PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc,
JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, NS local_04e2850b-d63c-481d-be73-c7d784a7cbcb, LR local_2cf16574-67b6-40c0-928e-68bf36c72db0,
KS local_4bd7c316-55bc-423a-9da1-821fdd123cab, VS local_ee961a2d-8a39-4941-8eec-60d24777be2c, Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f).
Kaikki junaan 202. Proto-worktree /Users/Shared/Claude/wt/proto-linssiseppa-pyramidi (haara linssiseppa/museo-valahdys-202).
Ajot proto-3d/tyokalut/linssiseppa-ajot. PT:n ENSIN-järjestys 09.2x alla (1 → 4).

## 1. ENSIN: SIMUTODISTEET (AJOT KÄYNNISSÄ, IRROTETTU)
- Haara linssiseppa/museo-valahdys-202 kärki 3a354d600 (juna-202 97775f95b päällä):
  4b5d670de kierroksen alku = yksi kävely Mona Lisan eteen (syy: välähdys siirsi peruutuspisteeseen jo valinnassa → 8,4 m
  hyppy + 2. lähestyminen; MuseoKierroksenAlkuTestit), 01133b945 + c0a536d6d värihehkukoodi kokonaan pois, 3a354d600 KS:n
  kohdepisteet-202 (34523cd90) yhdistetty (ristiriidat ratkaistu: Kaupunkipisteet.cs). Testit: linssi 2079, kartta 504,
  peli 606, tarkista.sh 0.
- ajo-alku202.zsh: L2-käännös alkoi 09.20 (lukko linssiseppa/museo-valahdys-202) → app _tyo/linssiseppa/alku202-app → odottaa
  lippua `touch /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/simu-alku202.nyt` (JU:n "SIMU NYT"; jonossa ~09.35).
  Ajaa ENNEN (kuva8-app: Eurooppa värihehkuineen, sk-houkutin-ennen-iphone) + JÄLKEEN (sk-alku202-iphone: Eurooppa ilman
  hehkuja + Mona Lisa -video "alku"). Tulokset lokit/todistus-houkutin202ennen-iphone-* ja todistus-alku202-iphone-*.
- ajo-kuva2-202.zsh (JU:n pyyntö: juna 202 KUVA 2, _tyo/julkaisija/juna202-kuva2-app) käynnistyy itse ajo-alku202:n "SIMU ALAS"
  -rivin jälkeen samalla vuorolla: välähdysvideo Kaanaan häät → Mona Lisa + q1-602 / q2-7300 nimikyltit ”…”.
  Tulokset todistus-kuva2-202-iphone-*. Lopuksi "SIMU VAPAA" JU:lle.
- TARKISTA TÄYSIKOKOISINA: Eurooppa ennen|jälkeen (ei violettia/sinistä hehkua, Pariisin museon ja Andøyan pisteet poissa);
  video: yksi tasainen kävely ovelta Mona Lisan eteen, ei hyppyä, ei toista lähestymistä; kuva2: ei nimikylttiä vanhan teoksen
  päällä ennen mustaa (ruutuanalyysi kuten monalisa201b ruutu 2248: ffmpeg signalstats YAVG < 20 alkukohta + edeltävät ruudut).
  Sitten pari/video PT:lle (≤ 3 riviä) → PT → NS. NS:lle EI ennen todisteita (PT 09.2x).

## 2. HEHKUKOODI POIS (TEHTY, c0a536d6d) + AVOIN OSA
- Pois: Houkuttimet.cs, UI/HoukutinVarit.cs, KaupunkiMerkit-houkutinosio, komento "houkuttimet", Aarrelaskurin ja KaupunkiPallojen
  houkutinväistö (KaupunkiPalloMitat.VaistavaPuoli/Vara), Aloitusnäkymän Pallovalinta. Jäljellä Kaupunkipisteet.cs (mitta + KS:n
  kehittäjäpisteet), EurooppaLoitonnus.LaattaJono. Vahti: KaupunkipisteetTestit.VarihehkutPoistettu.
- AVOIN (PT 09.2x "kyllä, samaan erään"): Olavinlinnan sininen rengas pois = NUI:n Videopelit.cs (Hehku()/KytkeSykaisy,
  luokka mk-nosto-merkki__hehku--videopeli, NostotKartalla). Tee samaan haaraan + yksi rivi NUI:lle muutoksesta.
- LR ja KS tietävät (LR:n pienoismallit-202 006f7f4df on 3a354d600:n päällä).

## 3. MAAILMANRADIO → GRIMETON (OMISTAJA 09.10, TEKEMÄTTÄ)
- Radio pois Lontoosta vapaaksi pisteeksi Grimetonin radioasemalle (LR:n kanssa sovittu 57,1083 N 12,3922 E), ei laudan kaupunki
  (kuten Andøya). Lontoo ei enää linssikaupunki. Houkuttimet.cs on jo poistettu, joten etsi radio-linssin Lontoo-kytkentä:
  git grep -i "radio" Linssirekisteri / LinssiOhjain.cs (~1115) / Linssivalitsin; web jos linssi on siellä (js/linssit/radio.js).
- LR kytki mallin linssiin "radio" (KaupunkiPallot.LinssiMallit); Big Ben avaa toistaiseksi radion → kerro LR:lle, kun Lontoon
  kytkentä on pois, LR vaihtaa rivin. Kuvapari PT:lle.

## 4. EIFFEL-KIERTOKULMA (TEHTY KOODINA, SIMU PUUTTUU)
- linssiseppa/eiffel-kulma-202 78314b9ef (3a354d600 päällä): OpasSilmukka.KehysKohteelle – lyhyen hypyn "katso nykyisestä
  silmästä" vain, jos silmä ≥ MinEtM; "ei perääntymistä" ei koske korkeaa kohdetta. Syy: Pariisin intro jätti silmän 122 m
  Eiffelistä, 8 m:n hyppy → kehys 151 m / 54°. Testi OpasKorkeaLahelta: nyt 879 m / 64°, silmä ≥ 790 m. Simu: NUI:n skenaario
  natiivi-ui-ajot/sk-kehyshaivytys-202b-iphone.txt (pariisi, linssi opas, täky → K1-kulma 12 s jälkeen) ennen|jälkeen → PT.

## 5. MUUTA
- Peking #361 sn1 vs V7 -parit Codexille postilaatikkoon e5c184a47 (V7:n kiveyssauma k1:ssä katosi sn1:ssä). Valmis.
- Kehyslista LR:lle (_tyo/linssiseppa/taidemuseo-ranska/kehyslista-20261018.md): museokehys kuvassa vain 602. LR teki "kaari" 05833ad6e.
- Lainausmerkit ”…”/’…’ museoteksteissä 5535edac8 + c2d0e2394 (NS yhdisti f5252fe04). Välähdys samaan ruutuun 2d8f548e8 (NS 5bba2dd3c).
- Kaanaan häät -uusinta (kuva8 007c891a) todistettu, PT:llä (todistus-museo201c-iphone-20261018-0758, TULOS-LS.md).
- Omat appit: alku202-app (tekeillä), kaanaanhaat201-app (Peking-ajon app). tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. ENSIN kohta 1 (JU:n SIMU NYT → touch simu-alku202.nyt → kuvat ja
video täysikokoisina → PT; kuva2 ajaa itse perään → SIMU VAPAA JU:lle). Sitten 2 (Olavinlinnan rengas), 3 (Grimeton), 4 (Eiffel-simu).
