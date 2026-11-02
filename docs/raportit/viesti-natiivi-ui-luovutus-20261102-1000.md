# Natiivi-UI: luovutus 2.11.2026 klo 10.00 (tahti todistettu ja NS:llä, aarrepisteen 2× + reunus todistuksessa)

Edellinen: viesti-natiivi-ui-luovutus-20261102-0930.md (PR 5962, lue sen jono ja proto-haarojen kuvaus). Syy: konteksti pehmeällä
rajalla (Raamattu 7.37).

## Tehty 09.30–10.00
- **Tahti todistettu** (yhteinen-iPad13, simu-lukko.sh kaari): natiivi-ui/piirros-tahti-218 **bff93a345**. Kytkimet OK (tahti-e ja -g:
  KARTTA-välilehti, Karikatyyrikartta- ja Kadonneet ihmeet -rivit näkyvät, napautus → `karttakerrokset: … pois`), 0 poikkeusta.
  Skenaarion korjaus: raaka `tap 1301 38` osui pystykehyksessä väärään kohtaan → `tap-teksti mk-linssitNappi` (etsi kiertää koordinaatit).
- **Aarrepisteen vika**: piste nostettiin 5000 m × korkeuskerroin = 10 km maanpinnasta → 4 km:n kamerasta kameran takana (syv −6,4 km),
  12 km:stä vino. Korjaus **bff93a345** PiirrosKerros.NakyvaKorkeus: piirroksen alueella korkeus → MaanpintaH häivytyksen tahdissa
  (Karttapisteet.Aseta ja AnkkurinRuutu). Testikomento **5e053d487** `komento pisteet` (paikka, piirroksen kohta, jono, ruutu, syvyys).
  Aarre avataan skenaariossa: `ui nosto skandaali:mona-lisan-varkaus-1911 vastaa1` (oikea = 1) → MinitehtavatOikein → pulu-vastaus-jalki.
  Todistus proto-3d/lokit/todistus-tahti-g-bff93a345-20261102-0948 (pari-aarre-ennen-jalkeen.png).
- **PT 09.5x**: tahti bff93a345 + veneet 8ada386f3 kuitattu → merge-pyyntö lähetetty NS:lle (merge-tree: ei ristiriitoja).
  Leikehaara natiivi-ui/piirros-leikkeet-218 7280634c4 (wt/proto-natiivi-ui-piirros-leikkeet) MITÄTÖN (omistaja 09.4x: leikkeet eivät
  mene leikekerrokseen) → ei mergeen; worktree voi poistaa.
- **PT 09.5x**: aarrepiste 2× piirroksella ja lukittu erottuvaksi → **a9568fc20** (tahti-haaran päällä, erillinen commit): Valopiste
  `_Reunus` (tumma harmaa reunarengas r 0,8–1 pisteen alle), Karttapisteet: piirroksella koko × (1 + Nakyvyys), reunus = Nakyvyys,
  lukitun alfa 0,45 → 0,9. **586222bc5**: reunuksen harmaa pisteen omasta väristä + lukitun alfan liikepoikkeus (VALOVAHTI ja LIIKEVAHTI hylkäsivät kovakoodatun
  half3-värin ja Mathf.Lerpin: tarkista.sh kaatuu "… > lähtötaso 0"). Todistus proto-3d/lokit/todistus-tahti-h-586222bc5-20261102-1001: 0 poikkeusta,
  koko 28 → 56, pari-aarre-2x-reunus.png (ympyröity) lähti PT:lle 10.1x: rengas erottuu, avatun pisteen vihreä ydin yhä vaalea.
  (Kaannos.txt-PUUTE johtui skriptistä: sed korvasi muuttujan SHA numerolla alkavalla SHA:lla; käännös oikea.)
- **NS 10.1x**: tahti + veneet + testikorjaus **d202f58ce** (natiivi-ui/piirros-testi-218: PiirrosLahinTestit odottaa `|| !Karikatyyri`,
  Kartta 586/586) mergetty: **runko 218 = bc82ac8e6**. Aarre-commitit a9568fc20 + 586222bc5 eivät ole rungossa (odottavat PT:tä);
  merge-pyynnössä ne tulevat tahti-haarasta (sisältää bff93a345:n; d202f58ce ei ole tahti-haarassa, mutta ei ristiriitaa).
- **eleet-c.txt** (proto-3d/lokit/todistus-eleet-c-629ff9da9-20261102-0906): "toinen nipistys" -odotus = `talteen k1` + `vertaa k1 6 >2`
  eletilan korkeudesta (17,5 → 5,7 km olisi läpäissyt).

## SEURAAJAN JONO
1. PT 10.1x kuittasi a9568fc20 + 586222bc5 → NS mergesi: **runko 218 = 52ba93dea** (seuraavat erät tämän päälle).
   **JATKOKOHTA (PT 10.1x)**: avatun aarrepisteen ydin kylläiseksi vihreäksi (Valopiste _Ydin 1: nyt keskus vaalennettu 35 % valkoiseen
   ja hehku pehmeä → piirroksella vaalea), jotta auki/lukittu erottuu yhdellä silmäyksellä; ei kovakoodattuja värejä varjostimeen
   (valovahti), Mathf.Lerp C#:ssa vaatii `// liikepoikkeus:`. Pari ympyröitynä PT:lle (sama kamera kuin tahti-h).
2. **C (UUSI, PT 09.4x, Raamattu-loki "kadonneet ihmeet pyörivinä tähtinä" #5964)**: 9 pyörivää tähteä (KS:n Codex-kuvasarja,
   PNG-silmukka), kukin eri vaiheesta, pieni valohehku vain tähden ympärille; neljällä tähti nykyrakennuksen viereen, ★-kyltti pysyy;
   Kadonneet-kytkin oletus päällä. Odottaa KS:n kuvasarjaa. PiirrosKerros.Leikkeet-lista pysyy tyhjänä.
3. Edellisen luovutuksen jono 2–6: B nostot piirrokselle, F Avauskortti pois, E saapuminen, G kioski + info, sujuvuus iPadilla.

Skriptit: scratchpad-kopiot kunkin todistuskansion kaanna-*.zsh ja *.txt; käännös ensin erikseen (proto-kaanna.sh ilman UDID:tä),
sitten `SIMU_MUISTIRAJA=16 zsh proto-3d/tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh kaanna-x.zsh`.
