# Natiivisepän luovutus 3.11.2026 klo 01.20 (konteksti 30 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261103-0015.md (PR 6045, tämä korvaa sen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. Rungon 8d9951aa7 testit läpi.

## JONO
1. **ENSIN (PT 01.2x, KK katsoi videot; korjataan VALINNASTA RIIPPUMATTA, ennen GC:tä): TYHJÄT RUUDUT ZOOMAUKSESSA.**
   Videot lokit/natiiviseppa-saapuminen-video-sim-20261103/ (iPad11-simu, 2cf83b7c3, kylmä Pariisi→Lontoo bussi; video-a = LAHI paalle,
   video-b = LAHI pois; ruudut/rivi.jpg = vahvistetut kohdat): (a) ~32 s koko kartta välähtää valkoiseksi; ~36 s tyhjä beige ruutu
   odotuksen jälkeen (zoomauksen alku); (b) 6 s tyhjä beige ruutu, 7 s pelkät nimet ja karkea läpikuultava katuverkko ennen
   Lontoo-kuvaa. Molemmissa loitonnuksessa (a ~80 s, b ~52 s) yksi ruutu pelkkää oranssia rinnevarjoa ilman karttaa.
   Lähtökohta: KarttaKerrokset.cs:~660–690 kuvaa saman ilmiön (Cesium piirtää laatan ilman rasteria → alfa 0 → pergamentti) ja
   varakartan (Z2 Blue Marble -mosaiikki paikassa 1); forbidHoles + preloadAncestors ovat jo päällä. Selvitä: toimiiko varakartta
   piirroskartalla (pergamenttityyli) ja zoomauksen nopeissa tasonvaihdoissa; mistä valkoinen välähdys (~32 s, zoomauksen alku tai
   Perillä-siirtymä?). Toista ensin simussa (saapuminen-video-sim218.sh, simu-lukko.sh yhteinen-iPad11/13), korjaa, uudet videot
   (a)+(b) samalla tavalla → rivi PT:lle "korjattu" + polut. Pakkaus: ffmpeg -fflags +igndts … scale=1080:-2 -crf 27 (≈7 Mt).
2. **OSA C ODOTTAA OMISTAJAN VALINTAA (KK suosittaa aamulla (b) + taustaesilataus).** Haara natiiviseppa/esilataus-218
   (työpuu wt/proto-natiiviseppa-esilataus, peili peili/proto/natiiviseppa/esilataus-218) kärki 2cf83b7c3. EI runkoon eikä
   NUI-kytkentää (SaapumisKarttaOdottaa → latausilmaisin) ennen omistajan valintaa. Mittaus I (Iso iPad, lokit/natiiviseppa-saapuminen-
   kohde-i1…i4-*-20261103): odotus kylmänä 30,0 s (raja 30 s, lähinäkymä EI valmis), lämpimänä 23,3 s (Lontoon lista vaihtelee
   ajosta toiseen: käytävä riippuu saaton lopusta), ennakoituna 0 s (Edinburgh 1620 palaa piirtyi 241 s joutoaikana Lontoossa;
   lämmin uusinta i4: kaikki levyllä, levy säilyy). Zoomauksessa pyydettäessä kylmä 105, lämmin 52, ennakoitu 1–30.
   Nykäysvahti HYLÄTTY kaikissa: kylmä 88, lämmin 115, ennakoitu 30–33 pitkää (zoomausliike 9–12, suurin 75 ms) → loput GC/"muu".
   Jos omistaja valitsee (b): zoomaus heti (LahinakymaPaalla-polku ilman OdotaLahinakymaa), ennakointi ja hiljainen
   taustaesilataus säilyvät; poista odotus ja sen 30 s raja.
3. **GC-korjaus jatkuu (haara natiiviseppa/gc-mvt-218, työpuu wt/proto-natiiviseppa-gcmvt, peili peili/proto/natiiviseppa/gc-mvt-218).**
   Uudet: 6b92ac7b0 osa 3 (ElavaMaski: vahva allas ≤ 96 Mt + TyhjennaAllas muistivaroituksessa ja KartanMuisti-vapautuksessa,
   reunalistat säikeen altaasta, Viiva/Ympyra-puskurit säikeen yhteiset; testi MaskialtaassaKattoJaTyhjennys), 8b2c66f8d osa 4
   (Suurenna + Kaanna vuokralla JPG-pakkaukseen asti, ElavaMaski.VuokraaTavut). Testit 8b2c66f8d: Linssit 2223, Peli 793,
   Kartta 588 läpi, tarkista 0. Kutsupinoprofiili 8b2c66f8d EPÄONNISTUI (aja uudelleen): laitteelta haettu .raw oli EDELLISEN ajon (2.11. 23.37, luvut
   identtiset 1bb4a6337:n kanssa) → profiloija ei kirjoittanut uutta; tarkista saapuminen-profiili218.sh (poista laitteen vanha
   profiili ennen ajoa, vertaa .raw:n aikaa). Lisäksi ProfiiliVaraukset-editorityökalu puuttuu 8b2c66f8d:stä → analyysi
   `profiili-varaukset218.sh <.raw> 1bb4a6337`. Development-äppi lokit/natiiviseppa-app-210-runko-8b2c66f8d-kehitys-laite valmis (vertaa 1bb4a6337:een:
   taustasäie 1119 Mt / 30 s, Vuokraa 214, LueKohde 91, Suurenna 85, LisaaRengas 83, Ympyra 68, ElavaHaku pääsäie 63 Mt).
   Jäljellä isoimmat: ElavaMvt.LueKohde/Pakatut/Valmis/LueArvo (pysyvää purettua dataa, rakennemuutos), ElavaHaku (downloadHandler.data
   -kopio), PiirraVuokralla.Muunna (taulukot jäävät radat/Katko-listoihin → ei suoraa allasta). EI runkoon ennen A/B:tä ja PT:n kuittausta.
   Pääsäikeen "muu (merkitsemätön)" pitkät ruudut: katso "PITKÄ … | ali:" -rivit. PT:n kohdat 2 (ulkona/GPU) ja 3 odottavat.
4. **VS:n/NUI:n/KS:n merget** sitä mukaa kuin PT kuittaa (media ämpärissä curl -I:llä, jos TasoVersio/LeikeVersio/SiltaVersio vaihtuu).
5. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle "kaikille",
   rivi PT:lle. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
6. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara
   7280634c4 EI. Pariisin vieritys osa 3 EI NYT (PT). Pariisin piirros tehdään alusta (omistaja 17.42): ÄLÄ optimoi sen laattoja.
7. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf).
- **Juna 218 runko = 8d9951aa7** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218). Kansiot ennallaan: rakennukset-v98,
  tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; TasoVersio haamu3-20261102, LeikeVersio leikkeet-20261102,
  SiltaVersio leikkeet-sillat-20261102.
- Nykäysvahti 4.24 (koko liike + 1 s, yksikin yli 20 ms = hylkäys) on omistajan sitova sääntö; rajaa ei muuteta.
- Laiteäpit (lokit/natiiviseppa-app-210-runko-<sha>-laite): 8d9951aa7 (runko), 19da77e59, 2cf83b7c3 (+ 8b2c66f8d-kehitys profiilille).
  Simuäppi lokit/natiiviseppa-app-sim-2cf83b7c3 (proto-kaanna.sh PROTO_APP_KOPIO, linja 1). PT: pidä 2 uusinta + käytössä;
  CoreDevicen välimuisti ~0,5 Gt/asennus → saapuminen-kohde218.sh ASENNA=0 käyttää edellistä asennusta.
- Skriptit juna218/: saapuminen-kohde218.sh (uudet env ASENNA=0, JOUTO=<s>; konsolin aikaraja + JOUTO), saapuminen-video-sim218.sh
  (UUSI: (a)+(b) videot simussa yhdellä asennuksella; simusarja.sh --set T7-laitesarjaan; UDID-env), kutsupinot218.sh <sha9>.
  Kulkutavat: bussi|lento|liftaus|laiva|mannerlento (ei "juna").
- iPad-tallenne (oikea iPad-video) vaatii koodaus-käyttäjän Macin näytölle; PT: iPad-videot vain jos omistaja pyytää.
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus eikä T7-kopioita. Luovutusworktreet
  -20261102-1710 ja -2316 poistettu (PT 00.5x). Levy ~26 Gi.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`.
- Simukäännös: `PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-sim-<sha9> zsh /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh <sha9>`
  (sha sisältää masterin → suoraan kärki). Videot: `UDID=<simu> SIMU_MUISTIRAJA=16 zsh proto-3d/tyokalut/simu-lukko.sh kaari natiiviseppa
  yhteinen-iPad11 -- zsh .../juna218/saapuminen-video-sim218.sh <kansio> <.app>`.
- Saapumismittaus: `[ASENNA=0] [TYHJENNA=1] LAHI=paalle [JOUTO=240] zsh .../juna218/saapuminen-kohde218.sh <kansio> <sha9> <lähtö> <kohde> bussi`.
- Kartta-testit nopeasti: `bash <työpuu>/Kartta-testit/kaanna.sh` (bash, ~1 min).
