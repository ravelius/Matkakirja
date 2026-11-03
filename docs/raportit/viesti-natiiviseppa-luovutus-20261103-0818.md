# Natiivisepän luovutus 3.11.2026 klo 08.18 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-0710.md (sen lisäykset 07.15/07.25/07.27 hoidettu tai siirretty tähän).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. JU:n vuoro vapautettu 08.18.

## TEHTY TÄLLÄ VUOROLLA: ESILATAUS KOHTEEN VALINNASTA (OMISTAJAN PÄÄTÖS 07.22, TÄSMENNYS 07.23)
- **Haara natiiviseppa/esilataus-valinta-218 kärki bf15af5a6** (työpuu wt/proto-natiiviseppa-esilataus; peili
  peili/proto/natiiviseppa/esilataus-valinta-218). = juna-218 f1264eea9 + merge esilataus-218 2cf83b7c3 (cab3c368e) +
  4cbdea690 + bf15af5a6. Testit 2223/793/590 läpi, tarkista rc=0 (molemmat SHA:t).
  - 4cbdea690: ElavaEsilataus.Lahinakyma = vain lopun ruudun z17 (+1 reunus, lähin ensin; Lontoo iPad13-simussa 252 palaa,
    ennen ~1 400). Karkeat/käytävä/SaapumisenAlku/Nappula.SaatonLoppu pois. PeliOhjain.ZoomaaLahinakymaan korvaa 30 s odotuksen:
    zoomaus alkaa heti; kesken jäänyt lähinäkymä saa kaikki piirtopaikat (ValmiiksiKiire, enintään 30 s). Lokirivit
    "kohde valittu" (Matkusta) ja "valinnasta X s". Käynnistys oli jo valinnassa (Matkusta → SaapuminenTiedossa → SaapumisLaatatSilta).
  - bf15af5a6: Laattapalvelin.ValmiiksiEdistyminen(kaupunki) 0–1/NaN (NUI:n palkki).
- **NUI:n ilmaisin** tämän päällä: natiivi-ui/saapumisilmaisin-valinta-218 2d9ed2d93 (SaapumisKarttaOdottaa: true zoomauksen
  alkaessa, jos lähinäkymä kesken; false aina parina). Mergetään yhdessä tämän kanssa.
- **Videot (iPad13-simu, bf15af5a6, Pariisi → Lontoo bussi; skripti juna218/esilataus-video218.sh, KYLMA=1 = tyhjennys juuri ennen matkaa):**
  - kylmä: proto-3d/lokit/natiiviseppa-esilataus-kylma-bf15af5a6-20261103-0815/ (saapuminen-lontoo-pieni.mp4, aikajana.txt, ruudut/):
    valinta 0,8 s, zoomaus alkaa 4,8 s (4,1 s valinnasta), zoomaus valmis 7,4 s, lähinäkymä valmis 10,7 s (9,9 s valinnasta).
  - ennakoitu (joutilaana Pariisissa): ...-esilataus-video-bf15af5a6-20261103-0807/: lähinäkymä valmis jo zoomauksen alkaessa.
  - KK:lle lähetetty 08.18 (aikaleimat, viat leikkaamatta); PT:lle rivi 08.18 + kysymys junaan ja löydökseen.
- **LÖYDÖS (PT:lle kerrottu):** matkan aikana 1,5–7 s kartta lähes tyhjä beige: siirto pitää Pariisin lähizoomin (lokissa
  "ennakko … leveys 1 yks"), ja maaseudun elävä kartta on sillä tasolla tyhjä. Oli jo 07.07-videossa; ei tämän muutoksen vika.
  Perussarja 2026-09-30-pohja-20261015 palautettu (JU 08.05), ei syy.

## JONO
1. **PT:n kuittaus esilataus-valinta-218 (bf15af5a6) + NUI 2d9ed2d93 junaan** → merge ehdokas-työpuussa (`git merge --no-ff`,
   testit210-rinn.sh, peili). Jos PT haluaa kylmän tapauksen nopeammaksi: vaihtoehto kaikki piirtopaikat heti valinnasta (ei vain zoomauksessa).
2. **PT:n linja beigeen löydökseen** (siirron kameran korkeus lähizoomista / maaseudun elävä kartta) → toteutus PT:n päätöksellä.
3. **GC-haara runkoon** vasta PT:n luvalla (2856c5cc3, haara natiiviseppa/gc-mvt-218).
4. **Merget** (VS/NUI/KS) PT:n kuittausten mukaan. zsh-ansa: `$C:refs/...` → kirjoita `${C}:...`.
5. **Avoin riski (PT:lle tiedoksi):** UITK-sumennuksen liuku muissa Kokoruutu-tilanteissa (nosto, lautapelit, arkki ≥ 70 %) → +1 Gt. PT:n päätös.
6. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA" (tagi natiiviseppa/runko-218-tf).
7. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara
   7280634c4 EI. Pariisin vieritys osa 3 EI NYT. Pariisin piirrosta EI optimoida. KS:n uusi tasankoresepti + välitaso (PR 6088)
   → uusi sarja = uusi SileaUrl-kierros (kuten 747e44081). KS:n arvio 07.15: Z11–Z12-välitasoa EI.
8. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = **f1264eea9** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; proto-repolla ei originia, peili
  natiivi-backup refs/heads/peili/proto/natiiviseppa/juna-218). TF 217 testaajilla (60bd5c356).
- Simuäpit: lokit/natiiviseppa-app-218-sim-bf15af5a6 (esilataus), lokit/natiiviseppa-app-218-sim-f1264eea9 (runko).
  Laiteäpit: 08aa2aa61, 689cdc446 (Release). Iso iPadissa 08aa2aa61. Laiteäppiä f1264eea9:stä/bf15af5a6:sta EI ole (laite210.sh, ~19 min).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus (nyt haarassa esilataus-valinta-218), -introkoe
  eikä T7-kopioita. Luovutusworktreet natiiviseppa-luovutus-20261103-0710 ja -0818 saa poistaa mergen jälkeen (`tools/uusi-worktree.sh --poista <nimi>`).
- Levy 77 Gi vapaana (08.07).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>` (~4 min).
- L2-simukäännös (vuoro JU:lta): `PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio> zsh proto-3d/tyokalut/proto-kaanna.sh <sha9>` (~8 min).
- Esilatausvideo (vuoro JU:lta, ~5 min): `[KYLMA=1] zsh proto-3d/tyokalut/simu-lukko.sh kaari natiiviseppa yhteinen-iPad13 -- zsh
  proto-3d/tyokalut/natiiviseppa-skriptit/juna218/esilataus-video218.sh <kansio> <.app>` → aikajana.txt.
- Release-laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`.
- Muistikoe: `zsh .../juna218/muisti-koe218.sh <sha9> [runko karttaui porras pallo juuri]`; muisti A/B `muisti-ab218.sh <A> <B>`.
- Pitkät ajot: Bash run_in_background lokitiedostoon; ÄLÄ aja pitkää skriptiä suoraan Monitorissa (30 min katto).
