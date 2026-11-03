# Natiivisepän luovutus 3.11.2026 klo 09.30 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-0818.md (lisäys 08.20 hoidettu: loppubeige korjattu ja junassa).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. JU:n vuoro vapautettu 09.18.

## TEHTY TÄLLÄ VUOROLLA: LOPPUBEIGE + MERGE JUNAAN (PT 08.19, mergepyyntö 09.1x)
- **Runko natiiviseppa/juna-218 = 8d18d7047** (wt/proto-natiiviseppa-ehdokas; peili ok) = f1264eea9 + merge natiiviseppa/loppubeige-218
  f1aaec744. Testit 2224/793/590, tarkista 0, peili 0. Sisältää:
  - esilataus valinnasta bf15af5a6 (omistaja 07.22/07.23), NUI:n ilmaisin 2d9ed2d93 + 3ff9b80e6, NUI:n siirron nosto fc424d7c3;
  - **8842195c4** PalloAjo `kohtiPistetta` (vain PalloKierto.AjaKeskustaan): sisäänzoomauksessa katselupisteen osuus (h0 − h)/(h0 − h1),
    eli kamera laskeutuu kohteen päälle. Ennen 1 025 km → 3 km -laskeutuminen oli 18,7 km:ssä 38 km sivussa (Lontoo ruudun ulkopuolella,
    maaseudun elävä kartta beigenä). Testi PalloLiikeTestit.ZoomausPisteeseenPitaaKohteenRuudussa (PalloAjoVastaaVanhaaEtenea ohittaa).
    ElavaEsilataus.Lahinakyma = z17-lähinäkymä ensin, sitten välitasot z11–z16 (Valitasot = Valmiiksi ilman z17, ~150 palaa);
  - **f1aaec744** Laattapalvelin.LahinakymaValmis (vain z17): kiire, LahinakymaKesken ja NUI:n palkki päättyvät z17:ään, ei välitasoihin.
    ValmiiksiValmis (koko lista) ennallaan.
- **Videot (iPad13-simu, 4fc57a4aa = 8842195c4 + NUI 3ff9b80e6; f1aaec744 ei videoitu, logiikka + testit):**
  - kylmä: proto-3d/lokit/natiiviseppa-esilataus-kylma-4fc57a4aa-20261103-0900/ (ruudut/kaikki-0-16s.jpg, loppu-4-9s.jpg): matka terävä,
    zoomaus 5,1–7,7 s laskeutuu Lontoon päälle ilman tyhjää beigeä; 7,0–8,5 s sumea (kylmä z17 ei ehdi 4 s:n matkassa); 1,5–2,5 s beige
    = testin tyhjennys vei Pariisinkin palat.
  - ennakoitu: ...-esilataus-video-4fc57a4aa-20261103-0900/: 6,5 s hetken pehmeä (45 välitasopalaa kesken lyhyen odotuksen takia), 7,0 s terävä.
  - Mittaus pelkällä nostolla (fc424d7c3): ...-esilataus-kylma-fc424d7c3-20261103-0833/ (beige 5,3–7,0 s).
  - KK:lle 09.2x (aikaleimat, viat leikkaamatta), PT:lle rivi 09.2x.
- **RT 8256×11008 (PT:n sivuhuomio):** oma, LiikeLaatat.PaivitaVarjo (saumakorjaus 8ac9ac545, kerroin 4 siirtymäalueella). RT ei koskaan
  piirrä; Create epäonnistuu (max 8192), mutta varjo.pixelWidth on silti 8256 (lokin "liikevalinta … varjo 8256×11008"), joten Cesiumin
  valinta on oikea eikä mitään leikkaudu. Vain lokirivi kerran per koko. Kerrottu PT:lle; korjaus vain, jos PT haluaa hiljentää.
- Testiskriptin "VIKA Pariisin intro ei päättynyt 120 s:ssa" toistui kaikissa kolmessa ajossa (myös 08.15-ajossa?) – video silti ok;
  selvitä, jos aikaa (intro pitempi tai odota-merkkijono muuttunut).

## JONO
1. **PT:n/KK:n palaute videoista** → jos kylmän tapauksen loppusumeus (7–8,5 s) halutaan pois: vaihtoehto zoomaus alkaa vasta, kun z17
   on valmis TAI z17 kaikilla paikoilla heti valinnasta (ei vain zoomauksessa). Omistajan linja 07.22 "zoomaus ei odota" → kysy PT:ltä.
2. **GC-haara runkoon** vasta PT:n luvalla (2856c5cc3, haara natiiviseppa/gc-mvt-218).
3. **Merget** (VS/NUI/KS) PT:n kuittausten mukaan. zsh-ansa: `$C:refs/...` → kirjoita `${C}:...`.
4. **Avoin riski (PT:lle tiedoksi):** UITK-sumennuksen liuku muissa Kokoruutu-tilanteissa (nosto, lautapelit, arkki ≥ 70 %) → +1 Gt. PT:n päätös.
5. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA" (tagi natiiviseppa/runko-218-tf).
6. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara
   7280634c4 EI. Pariisin vieritys osa 3 EI NYT. Pariisin piirrosta EI optimoida. KS:n uusi tasankoresepti + välitaso (PR 6088)
   → uusi sarja = uusi SileaUrl-kierros (kuten 747e44081). KS:n arvio 07.15: Z11–Z12-välitasoa EI.
7. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = **8d18d7047** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; proto-repolla ei originia, peili
  natiivi-backup refs/heads/peili/proto/natiiviseppa/juna-218). TF 217 testaajilla (60bd5c356).
- Työpuu wt/proto-natiiviseppa-esilataus on nyt haarassa natiiviseppa/loppubeige-218 (f1aaec744, mergetty).
- Simuäpit: lokit/natiiviseppa-app-218-sim-4fc57a4aa (uusin), -fc424d7c3, -bf15af5a6, -f1264eea9. Laiteäpit: 08aa2aa61, 689cdc446 (Release).
  Laiteäppiä 8d18d7047:stä EI ole (laite210.sh, ~19 min).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus, -introkoe eikä T7-kopioita. Luovutusworktreet
  natiiviseppa-luovutus-20261103-0710, -0818 ja tämä -0930 saa poistaa mergen jälkeen (`tools/uusi-worktree.sh --poista <nimi>`).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>` (~4 min).
- L2-simukäännös (vuoro JU:lta): `PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio> zsh proto-3d/tyokalut/proto-kaanna.sh <sha9>` (~8 min).
- Esilatausvideo (vuoro JU:lta, ~5 min): `[KYLMA=1] zsh proto-3d/tyokalut/simu-lukko.sh kaari natiiviseppa yhteinen-iPad13 -- zsh
  proto-3d/tyokalut/natiiviseppa-skriptit/juna218/esilataus-video218.sh <kansio> <.app>` → aikajana.txt. Ruudut: ffmpeg fps=2 tile=5x2.
- Release-laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`.
- Muistikoe: `zsh .../juna218/muisti-koe218.sh <sha9> [runko karttaui porras pallo juuri]`; muisti A/B `muisti-ab218.sh <A> <B>`.
- Pitkät ajot: Bash run_in_background lokitiedostoon; ÄLÄ aja pitkää skriptiä suoraan Monitorissa (30 min katto).
