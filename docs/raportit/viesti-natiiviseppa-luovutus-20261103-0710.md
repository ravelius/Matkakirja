# Natiivisepän luovutus 3.11.2026 klo 07.10 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-0455.md (sen JONO ja TILA siirretty tähän).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä.

## TEHTY TÄLLÄ VUOROLLA
- **Intron muistitappo junassa:** kuvapari ennen 08aa2aa61 | jälkeen 689cdc446 (intron 2,9 s ja 17,6 s) pikselilleen sama (keskiero 0,00/255),
  PT kuittasi → merge 45d70f638. Parit proto-3d/lokit/natiiviseppa-intro-kuvapari-20261103/. Skripti juna218/intro-kuvapari218.sh
  (konsoli aikaleimattuna aikaleima218.py:llä, komento.txt-jono "kuva/odota 0.4", valinta intro-valinta218.py).
- **Välitaso junassa:** SileaUrl + Rakennus.LaattaUrl + Pallo.unity → 2026-11-03-pohja-valitaso (747e44081), JU vei 06.08 (täysi sarja
  324 939, CDN 200) → merge **f1264eea9 = juna-218 nyt** (testit 2223/793/589 läpi, tarkista rc=0, peili pushattu).
  Delta tarkistettu: Z9-bittikartta kattaa 5 846 muuttunutta, Z10 null = koko taso uudessa kansiossa. offline.json EI muutu
  (natiivi lukee siitä vain Z10-joukon pallo-z10.json, ennallaan; URL tulee SileaUrlista) – KS:lle kerrottu.
- **Lepokuvat (simu, f1264eea9):** proto-3d/lokit/natiiviseppa-valitaso-video-f1264eea9-20261103-0624/kaari-{1.5,0.8,0.4,0.2}.png → KS:lle.
  Tiet näkyvät kaarella 1.5, Thames leveänä kaarella 0.8. LÖYDÖS KS:lle: kaarella 0.8 elävän kartan (Z11) alueen reunassa tyyliraja
  (pohjan tiet paksut ruskeat, Z11:n ohuet harmaat).
- proto-kaanna.sh: `PROTO_UUDELLEENASENNUS=1` = simctl uninstall ennen installia (JU:n löydös, vain epäonnistuneen käynnistyksen jälkeen).
- Levy: poistettu omat vanhat laiteäpit 16c732c8c, 390e3d9d9, 4ffd8aae5-kehitys + kutsupinot-profiilin .raw (2,1 Gt) + valitaso-worktree.

## SAAPUMISVIDEO TEHTY (07.13) – ODOTTAA KS:N ARVIOTA
- proto-3d/lokit/natiiviseppa-valitaso-video3-f1264eea9-20261103-0707/saapuminen-lontoo-pieni.mp4 (+ ruudukko zoomaus-1_5-8s-0_5s-valein.jpg)
  → KS:lle 07.13. Zoomaus ei enää tyhjä (tiet ja Thames näkyvät), mutta suurennettuina/sumeina (Z10 kaupunkitasolla) ja välissä tasaisen
  beigejä ruutuja ~2,0/3,5/4,5–5 s. KS arvioi: riittääkö vai syvempi välitaso (Z11–Z12) / tyylin sovitus elävään karttaan.
- 1. video (0624) hylätty: matka Pariisin intron aikana hyppäsi Lontooseen. valitaso-video218.sh odottaa nyt "aloitusintro pariisi
  Paattyi" (simussa ei tullut 120 s:ssa → jatkaa silti, VIKA-rivi; video kelpasi). VAIN_VIDEO=1 = ilman lepokuvia.
- Komento: `VAIN_VIDEO=1 zsh proto-3d/tyokalut/simu-lukko.sh kaari natiiviseppa yhteinen-iPad13 -- zsh .../juna218/valitaso-video218.sh <kansio> proto-3d/lokit/natiiviseppa-app-218-sim-f1264eea9/Matkakirja3D.app` (vuoro JU:lta, ~5 min).

## LISÄYS 07.15: PT:N UUSI ERÄ (ETUSIJA 1) + PERUSSARJAN 404
- **KS:n arvio videosta:** sumeus johtuu kamerasta (1,5–8 s ruudulla 2–5 km → Z10 ~30× suurennettu), ei aineistosta; Z11–Z12-välitasoa EI.
- **PT 07.1x:** kokeile KS:n ehdotusta: saapumiszoomi pysähtyy Z10:n 1:1-korkeuteen (~100–150 km ruudulla) + ristihäivytys
  piirroskaupunkiin/elävään karttaan. Video nykyinen | uusi samasta kohdasta PT:lle JU:n vuorolla, VASTA perussarjan palautuksen jälkeen
  (beiget ruudut arvioidaan samalla). EI junaan ennen PT:n kuittausta. Uusi haara natiiviseppa/<aihe>-218 rungosta f1264eea9.
- **Perussarja 2026-09-30-pohja-20261015 = 404 CDN:ssä** (laatat.json + laatat, NS tarkisti 07.14). Sekä uusi 2026-11-03-pohja-valitaso
  että TF 217:n 2026-10-26-pohja-20261027 ovat deltasarjoja sen päällä (Z6–Z9 bittikartta) → muuttumattomat palat eivät lataudu
  (konsolissa "pohja-perus 0"). JU palauttaa PT:n pyynnöstä; PT:lle kerrottu, että koskee myös TF 217:ää. Odota JU:n kuittaus.

## JONO
1. **KS:n arvio videosta** → tarvittaessa uusi sarja = uusi SileaUrl-kierros (kuten 747e44081).
2. **Osa C (esilataus) ODOTTAA OMISTAJAN VALINTAA** (ennallaan; KK suosittaa (b) + taustaesilataus). Haara natiiviseppa/esilataus-218 2cf83b7c3.
3. **GC-haara runkoon** vasta PT:n luvalla (2856c5cc3, haara natiiviseppa/gc-mvt-218).
4. **Merget** (VS/NUI/KS) PT:n kuittausten mukaan (ehdokas-työpuussa `git merge --no-ff` + testit210-rinn.sh + peili).
   zsh-ansa: `$C:refs/...` → kirjoita `${C}:...`.
5. **Avoin riski (PT:lle tiedoksi, ei tehty):** sama UITK-sumennuksen liuku muissa Kokoruutu-tilanteissa (nosto, lautapelit, arkki ≥ 70 %)
   → hetkellinen +1 Gt. Ratkaisu tarvittaessa porras kaikkialla → PT:n päätös.
6. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA" (tagi natiiviseppa/runko-218-tf).
7. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara
   7280634c4 EI. Pariisin vieritys osa 3 EI NYT. Pariisin piirrosta EI optimoida (tehdään alusta). KS:n uusi tasankoresepti + välitaso
   uudelleen (KS 06.45, PR 6088) → uusi sarja = uusi SileaUrl-kierros samoin.
8. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = **f1264eea9** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; proto-repolla ei originia, peili
  natiivi-backup refs/heads/peili/proto/natiiviseppa/juna-218). TF 217 testaajilla (60bd5c356).
- Simuäppi f1264eea9: proto-3d/lokit/natiiviseppa-app-218-sim-f1264eea9/Matkakirja3D.app. Laiteäpit: 08aa2aa61, 689cdc446 (Release).
  Iso iPadissa 08aa2aa61 (JU:n pyynnöstä). Laiteäppiä f1264eea9:stä EI ole (tee laite210.sh:lla, jos tarvitaan; ~19 min).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus, -introkoe eikä T7-kopioita.
  Luovutusworktree natiiviseppa-luovutus-20261103-0710 saa poistaa mergen jälkeen (`tools/uusi-worktree.sh --poista <nimi>`).
- Levy: PT siirtää yli 90 min vanhat lokit-kansiot T7:lle symlinkein; proto-kaanna vaatii ≥ 25 Gt.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>` (~4 min).
- L2-simukäännös (vuoro JU:lta): `PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio> zsh proto-3d/tyokalut/proto-kaanna.sh <sha9>` (~16 min).
- Release-laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`.
- Muistikoe: `zsh .../juna218/muisti-koe218.sh <sha9> [runko karttaui porras pallo juuri]`; muisti A/B `muisti-ab218.sh <A> <B>`.
- Pitkät ajot: Bash run_in_background lokitiedostoon; ÄLÄ aja pitkää skriptiä suoraan Monitorissa (30 min katto).
