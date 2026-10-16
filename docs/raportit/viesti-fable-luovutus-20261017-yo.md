# Päätoimittajan luovutus 17.10.2026 klo 00.2x (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikallinen talo/junat.json ja tyolista.json ajan tasalla 00.2x (scratchpad/asemataulu/data/talo/).
Edellinen luovutus: viesti-fable-luovutus-20261016-yo2.md (#4737). KELLO AINA `date +%H.%M` (KK huomautti 00.04: PT:n ajat olivat ~2 h edellä).

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor (30 min, uudelleen joka vanhenemisella), get_usage self. Tämä luovutus on PR:ssä → docs-PR, mergeä suoraan.

## 1. JUNA 197 (julkaisupyyntö 22.45; KK hyväksyy omistajan puolesta, valtuutus 23.06–23.07)
NS:n runko e846cd1a6 on VIHREÄ (Linssit 1961, Peli 590, Kartta 495, tarkista 0). Rungossa: NUI museo-juna-197 9f1e78fd6 (kehys ja varjolaatta pois, kaiutin levossa ☰:n sävyllä ja lukiessa kultainen, EB Garamond KK-ok 00.5x, i-kortti, leveät teokset f7ed065c7, Ranskan i-kortti valmiina) + lukijan valinnat pois 716614385.
LUKITUSEHDOT, kaikki täytyttävä ennen "LUKITSE 197" Julkaisijalle:
- [ ] PK 8e00df046 (⊃ intro abc4accff + museon kamera taulun keskikorkeudelle + kehys suorakulmainen myös suurennuksessa ja i-kortissa). Käännös d79778a43, simu KS:n jälkeen → video PT → KK-ok → NS. Intron mittaus jo hyvä (GPU 1 ms, p50 16,7 ms).
- [ ] Karttaseppä: pienoismallit + lasipohja 4 paneeliin (simu nyt).
- [ ] KK:n ok korttikuville (i-kortti, ympyräkortti, kabinettikyltti + lukijavalikko, iPhone + iPad) NUI:n 716614385-ajosta (simu PK:n jälkeen). Omistaja 23.58 "tasot näyttää heilahtaneen" (varjolaatta, poistettu) ja 23.59 "kaiutin ei näy … juuri ollenkaan" (korjattu).
- [x] #4742 mergetty 612c08882. [x] Louvre v6k22 Julkaisijan listalla.
- web-PR #4746 (lukijan valinnat pois, web) → Julkaisija mergeää vihreänä.
"MUKAAN, JOS EHTII" (eivät pidätä): SS 9db0288e9 (AaniPohja + ääni pois linssin/pelin avautuessa; käännös lukossa 00.15); LS vapaalento-197 da98b2e4a/259bdbecb (matala lento, kaasuvipu, kipin nimet, kompassi, Louvren avaus KIINNI PariisiMuseoAuki=false, sk-museomaa-197 tarkistaa Amsterdam/valitsin = Alankomaat); PK ISS-raketti 960ad3907 (säiliöt "Heippa"-sanan kohdalla, MECO "sammuvat", Pulu liukuu narun varaan, telakointiääni — rakennettava AaniPohjan päälle, ei omaa reittiä; äänet audio/iss-192/pulu-max-livia-v4.mp3 + telakointi-kolahdus-v1.mp3); NUI Cupolan "Ohita esittely" (PK vastaa NUI:lle, mikä esittely on; AaniPohjan päällä); Karttaseppä ISS-rajat 51,6° pienoispallolle + ruskea verho (omistaja 00.12); Valoseppä valas k3 (koko hyppy näkyy kaikissa ikkunoissa, omistaja 00.09).
L2-JÄRJESTYS (Julkaisija): SS (lukossa) → NUI 716614385 → LS → Valoseppä. SIMU: KS → PK → NUI → muut. Yöllä 1 simu + 1 käännös kerrallaan (levyhätä 23.39: swap 58 Gt, 2 simua + L2 + Codexin python; levy 2 Gi → nyt 40 Gi).

## 2. OMISTAJAN PÄÄTÖKSET TÄNÄ YÖNÄ (sanatarkat KK:n viesteissä)
- 23.35 Italia "Ei vielä". Pyramidin vertailukuvat ≤ 10 → LR:n Codex-tilaus 9 kuvaa (K1–K7 + L1 + L3; L2:ssa pyramidi ei näy), postilaatikko a1ac41f9e.
- 23.38 TUOTANTOPOHJAT ja 23.41 SANASTO → Raamattu + loki #4740 MERGED aa41ef358. Seitsemän pohjaa: 3D-maamerkki, kuumailmapallokierros, taidemuseon maa, pääkaupungin avaus, uusi linssi, historiapeli, kertojan teksti ja ääni. ENSIMMÄINEN pohja valmis: kertojan-teksti-ja-aani.md (Äänittäjä #4747 MERGED). Pohjat ovat kansiossa docs/moduulit/tuotantopohjat/ (alikansio ei ole dokumentit.testin piirissä). Muut kuusi pohjaa jaetaan rakentajille junan 197 jälkeen. Kartta: lisää pohjat Raamatun dokumenttikarttaan, kun useampi on valmis. Konevalvonta (pohja olemassa, opit kirjattu, museon maiden pariteettitesti) on vielä tekemättä.
- 23.53 KUMOAA 23.35:n: Ranskan museo avataan Pariisista vasta, kun se on samalla tasolla kuin Alankomaat; nimi "Louvre". Pariteettierä (ei junaan 197): LS linssiseppa/louvre-pariteetti (kohdat.json dcac520d2, askeleet 66fb8b7fc; avaus ja houkutin pallon viereen, korjaus "valitsimesta avattu museo jää Ranskaksi"); SK Louvre-teksti #4741, kohdat #4743 (152/51), i-kortti jo rungossa; Äänittäjä kivi_hiekka- ja sora-askeleet v3 (portti läpi). Taidemuseon maan tuotantopohjaan pariteettitesti (samat tiedostot ja kentät, askelääni jokaiselle lattialle).
- 00.04 ja 00.09 ympyröiden puhelupa 20 800 mrk → EI KÄYTETÄ: ympyrät puhuvat workerin kautta (KortinLukija → Puhe.Lue "kertoja"), muisti museon-ympyrat-puhuvat-workerin-kautta. PT:n väärä korjaus 00.1x peruttiin.
- 23.58 lukijan valinnat pois (tehty), 23.58–23.59 korttien tasot ja kaiutin (tehty, kuvat KK:lle), 00.09 ISS-raketti ja valas, 00.12 Cupolan ohitus ja ISS-rajat pallolle (jaettu, ks. yllä).

## 3. MUUT
- Louvre/pyramidi (LR, luuppi, ei junaan): k59 oma pyramidi, k61 sora, k62 gravelly_sand; Valosepän varjostinhaara linssiseppa2/pyramidi-lasi c49687f22 → 1 käännös + simu junan 197 jälkeen → k59s/k62-pari PT:lle → KK. Codexin 9 kuvaa odottaa.
- Valopohja ennen|jälkeen PT hyväksyi (V2/arkki.jpg, pelitila sama).
- Linssisepän messinkikahva-kysymys: EI tilata (omistaja pyysi olemassa olevaa vipupohjaa).
- Nollattu yöllä: LR, Asemataulu, Linssiseppä, Sisältökirjuri, Natiivi-UI, Äänittäjä. Lähellä rajaa: KK 38 %, SS 34, JU 34, VS 33.
- Levossa syystä: Äänittäjä (jono tyhjä, odottaa äänipohjan tasoja SS:n simusta), Sisältökirjuri (jono tyhjä 00.1x jälkeen).
