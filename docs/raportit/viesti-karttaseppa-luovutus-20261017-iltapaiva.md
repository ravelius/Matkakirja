# Karttasepän luovutus 17.10.2026 klo 14.4x (Postivahti: kova raja 35 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-keskipaiva.md` (76b84cb86).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-iltapaiva.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA). Simut ovat T7-sarjassa:
`xcrun simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja" list devices booted` (oletussarja ei näe niitä).
Proto-worktree: /Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198, NYT haaralla **karttaseppa/kiina-paketti-200** (peili natiivi-backup).
Käännöshaara `karttaseppa/kiina-vaestopinta-199` = samaan kärkeen siirrettävä (proto-kaanna.sh kääntää haaran nimellä; todistusajo
tarkistaa, että haaran kärki on käännöksessä → älä siirrä sitä kesken toisen roolin ajon samalla haaralla).

## 1. KESKEN: KIINAN DYNASTIAT -LINSSI, OMISTAJAN VIDEO v5 (KS vetää)

**Omistajan päätös 17.10. klo 11.55 (sanatarkasti, NUI:n koodikommentista ja PT:ltä):** "Iso vuosi- ja dynastiaotsikko sittenkin vain yläreunaan".

**PT 14.3x, kolme kohtaa (KK:n löydökset v3-videosta ennen junaa):**
1. **Yläpalkki: iso vuosi + dynastia** joka pysäkillä ilman katkeamista. TEHTY koodissa: junan 200 runko ddbc71745 (sis. NUI 471163876
   päädynastia otsikkona + 288035f99) yhdistetty kiina-paketti-200:aan. NUI 14.4x: muutosta ei tarvita (vuosi kellossa 21,6–30,4 pt,
   otsikko = päädynastia 21 pt pysyvä; "1873 · Peking" on toinen rivi ja jää; otsikko vaihtuu pysäkillä). → **Näytä NUI:lle v5-kuvat.**
2. **Kesto ~5 min** (v3 6:41; Williamin repliikit 4:48, EI leikata). TEHTY 324ebca0a: KiinanDynastiatLinssi.Tahti MatkaMs 900,
   LuennanTaukovaraMs 300 (KellonTahti uudet kentät, oletus ennallaan), taistelun hetki lauseen mittaan 8–16 s (KiinaKertojaJono.Hetki).
   Arvio ~5:10 → **mittaa v5:stä** (`ffmpeg … silencedetect` aani/kiina-koko.wav; pysäkit konsolin "kiinan dynastiat: vuosi").
3. **Terävät seinämät ja kamera liian lähellä: odota omistajan väestökortin vastausta (PT välittää). ÄLÄ muuta huippujen muotoa ennen sitä.**
   Pinnan pehmeä katto a59345b2c PERUTTU (revert e84d113ca). Huiput Song/Qing jopa 999 km.

**Seuraavat askeleet:**
1. Odota PK:n kameran regressiokorjaus 324ebca0a:n päälle (PK:lle lähetetty 14.3x; v4 14.17 = katto + 17297a308 toi kameran pinnan
   sisään; ehdotus lähikuva ≥ max(2,5 × KorkeinM, 1200 km)). Yhdistä (`git merge` kiina-paketti-200:aan), Linssit-testit `sh kaanna.sh Kiina`,
   `zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"` = 0, push peili, siirrä `git branch -f karttaseppa/kiina-vaestopinta-199 <kärki>`.
2. KÄÄNNÖSPYYNTÖ JU:lle → uusi kansio `_tyo/karttaseppa/kiina-koko-linssi-v5-app`; kirjaa `kaannos.out` ("KÄÄNNETTY <sha> karttaseppa/kiina-vaestopinta-199").
3. SIMU NYT → `zsh _tyo/karttaseppa/kiina-koko-linssi/ajo-koko.zsh <v5-app> > ajo-5.out` (skenaario sk-koko-linssi.txt v3: video + aani-alku 400,
   kuvat 30 s välein). Odotusskripti mallina `odota-v4.zsh` (T7-sarja). → SIMU VAPAA JU:lle.
4. `zsh _tyo/karttaseppa/kiina-koko-linssi/yhdista-video.zsh <todistuskansio>` → kiina-koko-omistajalle.mp4 (1600 px, crf 24, ~80 Mt).
   Arkki ffmpeg xstack (malli: todistus-…-1417/arkki-v4.jpg). Katso ITSE: kamera pinnan yllä, palkissa dynastia, kesto.
5. Video PT:lle (3 riviä) + kuvat NUI:lle ja PK:lle. Junaan vasta PT:n kuittauksella (NS).

**Tilanne ajoittain** (kaikki iPad 00CF62C2, lokit `/Users/Shared/Claude/proto-3d/lokit/`):
| Ajo | Käännös | Tulos |
|---|---|---|
| 12.28 kulma | eb8bb4ca6 | Wein kulma: 31° N / 2600 km paras → oletus (bf962acf8) |
| 12.32 koko v1 | eb8bb4ca6 | kamera pinnan sisällä, tahti hidas (vanha kertoja) — loki T7:llä |
| 13.08 v2 | 03d0bb1a4 | Williamin äänet OK, mutta 11/19 pysäkkiä (260 ms/vuosi) |
| 13.47 v3 | 3e09bdfeb (c487cdb37) | 19/19, 6:41, kamera yllä → **OMISTAJAN VIDEO** `todistus-kiina-koko-linssi-20261017-1347/kiina-koko-omistajalle.mp4` |
| 14.17 v4 | 90add615e (a59345b2c) | HYLÄTTY: kamera pinnan sisällä (katto + 17297a308) |

**Paketin sisältö (kiina-paketti-200, 324ebca0a):** 19 pinnat, 5 taistelua, valopisteet + Silkkitie (Gutenberg 1421, taolaisuus 30.638/103.403
SK:n mukaan), KiinaKerros.TekstiNakyy pois, Williamin v2-kertoja `aanet/kiina-william-v2/` (ajat/<id>.json ohjaa taistelun, valot ja juovan;
KiinaKertoja.Ajat), KorkeinM, Kiinan oma kellon tahti, PK:n kertova kamera (47e1ffbf9 … 17297a308), NUI:n palkki rungon kautta.
Testit: Linssit-testit 2019/2019.

## 2. Valmiit tällä vuorolla

| Erä | Toimitus |
|---|---|
| Wein kulma | bf962acf8 (KiinaVaestopintaKerros.Kamera* 31/114,5/2600/40) |
| Tivoli pysäkki 8 (LR) | Q110289 vahvistettu; omistaja 12.20 pysäytti lennon → ei töitä |
| SK:n koordinaatit + käsikirjoitus v2 | 1d3e627b9, 5ad4ca1ad |

## Muistiinpanot

- `KiinaVaestopintaTestit` lukevat nyt 250-aineistoa (208-tiedostot poistettiin 19 pinnan yhteydessä).
- Taustaseurannassa ei pgrep-sanoja; seuraa tiedostoja (Monitor `tail -F … | grep`).
- Levy 30 Gi (JU 14.1x): yksi videoajo kerrallaan, video pieneksi.
