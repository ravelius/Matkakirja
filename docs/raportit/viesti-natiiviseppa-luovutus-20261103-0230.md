# Natiivisepän luovutus 3.11.2026 klo 02.30 (konteksti 28 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261103-0120.md (PR 6052, tämä korvaa sen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. Rungon 55ce62126 testit läpi (Linssit 2223, Peli 793, Kartta 589, tarkista 0), peili pushattu.

## TEHTY TÄLLÄ VUOROLLA
- **Tyhjät ruudut zoomauksessa (KK:n videot)**: raportti, videot ja kuvat
  /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-saapuminen-video-sim-60cdaeee0/ (raportti.md, saapuminen-a/b-pieni.mp4, ruudut/).
  Rivi PT:lle lähetetty 02.2x. Korjaus a699e2e7e (haara natiiviseppa/tyhjat-ruudut-218, mergetty runkoon 55ce62126):
  (1) valkoinen välähdys (a 32 s) = varalaattojen uusinnan pohjan RemoveFromTileset/AddToTileset → nyt vain verhon alla
  (Laattapalvelin.pohjaOdottaa, LataaPohjaUudelleen) – todennettu poistuneeksi; (2) siirtymätarkkuus (×4) pois kamera-ajoista
  (LiikeLaatat.SiirtymaEste + PalloKierto.Ajossa) – ei muuttanut näkyvää. (3) Beige zoomausjakso ja loitonnuksen oranssi EIVÄT ole
  latausaukkoja: Lontoon kartta tasoilla ~9–10 on levossakin pelkkää pergamenttia + rinnevarjoa (lepokuvat ruudut/lepo-lontoo-*.jpg);
  oranssi = sama väli + elävän kartan GBR-maakuntavärit. Odottaa PT/KK:n linjausta (elävä kaupunkikartta aiemmin kuin Z11,
  KS:n pohjan Z9–Z10 sisältö tai nopeampi ohitus). ÄLÄ tee ilman päätöstä.
  Koekäännös 60cdaeee0 = esilataus 2cf83b7c3 + korjaus (haara natiiviseppa/tyhjat-koe-218 työpuussa wt/proto-natiiviseppa-esilataus;
  palauta työpuu haaraan natiiviseppa/esilataus-218 ennen osa C -työtä: `git -C … switch natiiviseppa/esilataus-218`).
- **NUI:n merge** natiivi-ui/zoomaus-kaikkiin-218 82634eb4b runkoon (9a9515ea3; KK hyväksyi omistajan puolesta 01.50); JU:lle ilmoitettu.

## JONO
1. **Odottaa PT:n vastausta tyhjistä ruuduista** (kohta 3 yllä). Jos PT päättää linjauksen, toteuta ja tee uudet videot samalla
   skriptillä (saapuminen-video-sim218.sh, UDID=F7513985-C8BC-4E97-8D29-9C9BD420E962 = yhteinen-iPad11, vuoro JU:lta).
   Lepokuvien skripti: proto-3d/lokit/natiiviseppa-saapuminen-video-sim-60cdaeee0/lepokuvat-valitaso.sh <kansio> (komento `aja lat lon kaari kesto`).
2. **OSA C ODOTTAA OMISTAJAN VALINTAA (KK suosittaa aamulla (b) + taustaesilataus).** Haara natiiviseppa/esilataus-218
   (työpuu wt/proto-natiiviseppa-esilataus, peili peili/proto/natiiviseppa/esilataus-218) kärki 2cf83b7c3. EI runkoon eikä
   NUI-kytkentää (SaapumisKarttaOdottaa → latausilmaisin) ennen omistajan valintaa. Mittaus I (Iso iPad, lokit/natiiviseppa-saapuminen-
   kohde-i1…i4-*-20261103): odotus kylmänä 30,0 s (raja 30 s, lähinäkymä EI valmis), lämpimänä 23,3 s, ennakoituna 0 s.
   Zoomauksessa pyydettäessä kylmä 105, lämmin 52, ennakoitu 1–30. Nykäysvahti HYLÄTTY kaikissa (zoomausliike 9–12, suurin 75 ms).
   Jos omistaja valitsee (b): zoomaus heti (LahinakymaPaalla-polku ilman OdotaLahinakymaa), ennakointi ja hiljainen
   taustaesilataus säilyvät; poista odotus ja sen 30 s raja. Muista myös a699e2e7e (jo runkoon, esilataus-haaraan tulee mergessä).
3. **GC-korjaus jatkuu (haara natiiviseppa/gc-mvt-218, työpuu wt/proto-natiiviseppa-gcmvt, peili peili/proto/natiiviseppa/gc-mvt-218).**
   6b92ac7b0 osa 3 (ElavaMaski allas ≤ 96 Mt + TyhjennaAllas), 8b2c66f8d osa 4 (Suurenna + Kaanna vuokralla). Testit 8b2c66f8d läpi.
   Kutsupinoprofiili 8b2c66f8d EPÄONNISTUI (aja uudelleen): laitteelta haettu .raw oli EDELLISEN ajon → tarkista
   saapuminen-profiili218.sh (poista laitteen vanha profiili ennen ajoa, vertaa .raw:n aikaa). Analyysi
   `profiili-varaukset218.sh <.raw> 1bb4a6337`. Development-äppi lokit/natiiviseppa-app-210-runko-8b2c66f8d-kehitys-laite valmis
   (1bb4a6337: taustasäie 1119 Mt / 30 s, Vuokraa 214, LueKohde 91, Suurenna 85, LisaaRengas 83, Ympyra 68, ElavaHaku pääsäie 63 Mt).
   Jäljellä isoimmat: ElavaMvt.LueKohde/Pakatut/Valmis/LueArvo, ElavaHaku (downloadHandler.data), PiirraVuokralla.Muunna.
   EI runkoon ennen A/B:tä ja PT:n kuittausta. Haara perustuu 8d9951aa7:ään: merge runkoon (55ce62126) ennen A/B:tä.
4. **VS:n/NUI:n/KS:n merget** sitä mukaa kuin PT kuittaa (media ämpärissä curl -I:llä, jos TasoVersio/LeikeVersio/SiltaVersio vaihtuu).
   Ilman ehdokastyöpuun checkoutia: `git merge-tree --write-tree runko haara` → commit-tree → update-ref (tehty 9a9515ea3:lle).
5. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle "kaikille",
   rivi PT:lle. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
6. **JU:n löydös (ei tehty)**: proto-kaanna.sh linja 2 → yhteinen-iPad13: asennettu appi ei käynnistynyt kahdesti ("No such process",
   vanha bundlepolku); uninstall + install korjasi. Ehdotus: simctl uninstall ennen installia (proto-kaanna.sh rivi ~208). HUOM: uninstall
   tyhjentää äpin datan (laattavälimuisti, tallennus) kaikilta simuilta → tee vain epäonnistuneen käynnistyksen jälkeen tai kysy PT:ltä.
7. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara
   7280634c4 EI. Pariisin vieritys osa 3 EI NYT (PT). Pariisin piirros tehdään alusta (omistaja 17.42): ÄLÄ optimoi sen laattoja.
8. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf).
- **Juna 218 runko = 55ce62126** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218). Kansiot ennallaan: rakennukset-v98,
  tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; TasoVersio haamu3-20261102, LeikeVersio leikkeet-20261102,
  SiltaVersio leikkeet-sillat-20261102.
- Nykäysvahti 4.24 (koko liike + 1 s, yksikin yli 20 ms = hylkäys) on omistajan sitova sääntö; rajaa ei muuteta.
- Laiteäpit (lokit/natiiviseppa-app-210-runko-<sha>-laite): 8d9951aa7, 19da77e59, 2cf83b7c3 (+ 8b2c66f8d-kehitys profiilille).
  Simuäppi lokit/natiiviseppa-app-sim-60cdaeee0 (korvasi 2cf83b7c3:n). PT: pidä 2 uusinta + käytössä.
- Skriptit juna218/: saapuminen-kohde218.sh (ASENNA=0, JOUTO=<s>), saapuminen-video-sim218.sh ((a)+(b) simussa; UDID-env),
  kutsupinot218.sh <sha9>. Kulkutavat: bussi|lento|liftaus|laiva|mannerlento (ei "juna").
- iPad-tallenne (oikea iPad-video) vaatii koodaus-käyttäjän Macin näytölle; PT: iPad-videot vain jos omistaja pyytää.
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus eikä T7-kopioita. Luovutusworktree
  natiiviseppa-luovutus-20261103-0120 (PR 6052 mergetty) poistamatta: `tools/uusi-worktree.sh`-poisto epäonnistui argumenttijärjestykseen.
  Levy ~31 Gi.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`.
- Simukäännös (vuoro JU:lta): `PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-sim-<sha9> zsh /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh <sha9>`.
  Videot: `UDID=F7513985-C8BC-4E97-8D29-9C9BD420E962 SIMU_MUISTIRAJA=16 zsh proto-3d/tyokalut/simu-lukko.sh kaari natiiviseppa
  yhteinen-iPad11 -- zsh .../juna218/saapuminen-video-sim218.sh <kansio> <.app>`. Pakkaus: ffmpeg -fflags +igndts … scale=1080:-2 -crf 27.
- Saapumismittaus: `[ASENNA=0] [TYHJENNA=1] LAHI=paalle [JOUTO=240] zsh .../juna218/saapuminen-kohde218.sh <kansio> <sha9> <lähtö> <kohde> bussi`.
- Kartta-testit nopeasti: `bash <työpuu>/Kartta-testit/kaanna.sh` (bash, ~1 min).
