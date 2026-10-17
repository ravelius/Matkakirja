# Karttasepän luovutus 17.10.2026 klo 19.2x (Postivahti: kova raja 36 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-ilta.md` (52c992cc6).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-myohailta.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA). Proto-worktree:
/Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198 haaralla **karttaseppa/kiina-paketti-200** (peili natiivi-backup
`peili/proto/karttaseppa/kiina-paketti-200`, push aina `git push natiivi-backup karttaseppa/kiina-paketti-200:peili/proto/karttaseppa/kiina-paketti-200`).
JU kääntää nyt suoraan haaran kiina-paketti-200 kärjen (kiina-vaestopinta-199 ei enää käytössä). Linssit-testit: `bash Linssit-testit/kaanna.sh`
(bash, EI zsh), tarkistus `zsh tyokalut/tarkista.sh`. Todistusajon PUUTE "kaannos.txt ≠ sha" on aina käännöspalvelun merge-sha: tarkista
`git merge-base --is-ancestor <oma> <käännös>`.

## Omistajan päätökset tänään (PT:n kautta)

- 18.20: **"A, selkeä historiakartta (Suositus)"** → A on Kiinan linssin pohja (`KiinaKerros.Selkea = true` oletuksena; QA `kiina selkea 0` = vanha v8,
  `2` = hunnullinen vaihtoehto B, hylätty). "Nykyinen Kiina" -nimiö irti rajaviivasta. 19 pysäkkiä A-tyylillä → video → PT → KK. EI junaan ennen hyväksyntää.
- 19.06: **"Pitäisikö kokeilla lisätä ne korkeus animaatiot näihin pohjin?"** → KOE yhdeltä pysäkiltä (250, Punainen kallio): pohja tasainen,
  korkeus vain kertojan hetkellä (väestöpinta dynastian värisenä → armeija huippuna + isku aaltona → laskeutuu tasaiseksi), kamera saa hetken
  kallistua hieman, nimet luettavina. 19 pysäkkiin vasta hyväksynnän jälkeen.

## 1. ENSIN: VIDEO v3 (koko linssi A-tyylillä + korkeuskoe 250) → PT

**TILA 19.2x:** KÄÄNNÖSPYYNTÖ JU:lla: `kiina-paketti-200 = 1af33ce7f` → `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-selkea-19-v3-app`,
sitten SIMU NYT ~10 min. (v2-käännös e8b71772c oli kesken; sen simua ei tarvita.)

1. JU:n KÄÄNNETTY → tarkista että käännös sisältää 1af33ce7f (merge-base) → kirjoita `kiina-selkea-19-v3-app/kaannos.out`:
   `KÄÄNNETTY 1af33ce7f karttaseppa/kiina-paketti-200 (käännös-sha …)`.
2. SIMU NYT → taustalle `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-koko-linssi/odota-selkea-19-v3.zsh > …/odota-selkea-19-v3.out`
   (skenaario `sk-selkea-19-v3.txt`: `kiina selkea 1` + `kiina korkeus 250`) → valmis → **SIMU VAPAA JU:lle heti**.
3. `zsh …/kiina-koko-linssi/yhdista-video.zsh <todistuskansio>` → `kiina-koko-omistajalle.mp4`. Katso itse: ffmpeg-arkit
   (`-vf fps=1/2.5,scale=400:-2,tile=4x4`) alusta (rajahetki nyt tasaisella pohjalla, 221 eaa. ei lähikuvaa), pysäkki 250 (~1:05–1:25 videossa:
   pinta nousee, armeija + isku, laskeutuu; nimet luettavina), 440/500 palkki Pingcheng/Luoyang, 950 nimet, 1421 NURGAN.
   Kuva-arkin "0 nimeä" on normaalia: nimet tulevat ~5 s pysäkin alusta musteen jälkeen.
4. PT:lle 3 riviä: videon polku + mitä näkyy + puutteet.

**LISÄYS 19.3x:** PK:n kevyt taistelu 269f285d8 (selkeässä laaja kuva pysyy, kallistus 18° lyönnin hetkeen, `KiinaKertovaKamera.KevytKallistus`)
fast-forwardattu kiina-paketti-200:aan, peili päivitetty. v3-käännös oli jo käynnissä (todennäköisesti 1af33ce7f) → JU:lta pyydetty
269f285d8 → `kiina-selkea-19-v4-app` ja SIMU NYT vain v4:lle; ajo silloin `odota-selkea-19-v4.zsh` (muuten sama). Tarkista KÄÄNNETTY-viestin SHA:
jos v3 sisältää 269f285d8:n, aja v3.
**JU 19.2x VAHVISTI:** v3 EI sisällä 269f285d8:aa → v4 (269f285d8) odottajana heti v3:n perään → `kiina-selkea-19-v4-app`;
SIMU NYT tulee VAIN v4:lle (~19.45). v3:a ei simuloida. `odota-selkea-19-v4.zsh` valmiina.
**TILA 19.5x: KOHTA 1 TEHTY.** v4 ajettu 19.35–19.45 (käännös 3deebd6dc ⊇ 269f285d8), SIMU VAPAA JU:lle 19.45. Video PT:lle:
`proto-3d/lokit/todistus-kiina-selkea-19-v4-20261017-1935/kiina-koko-omistajalle.mp4` (6.40). Puutteet (PT:lle kerrottu): 250 armeija/isku ei erotu,
pinta ei laskeudu tasaiseksi ennen siirtoa, harmaat haamualueet lännessä; siirtymissä 166/296/441 läikikäs pinta; harha "e2"-teksti Taiwanin kohdalla 1100→.
SEURAAVAKSI: odota PT:n/omistajan palautetta videosta. LEVY 19.4x: wt/karttaseppa-kiinan-kerrokset ja wt/karttaseppa-esittely-kuvat poistettu.

**PK (Pelikoodari) kallistus (valmis, ks. lisäys):** pyydetty 19.1x: selkeässä taistelun lähikuva (1500 km/45°) liikaa → kevyt 15–20° hetki. Jos PK antaa SHA:n,
yhdistä (`git merge <sha>`) kiina-paketti-200:aan ennen käännöstä tai seuraavaan.

## 2. Valmiit tällä vuorolla (kiina-paketti-200, ei junassa)

| Erä | SHA |
|---|---|
| Sui 589 korjaukset: pohja koko pallolle (selkea-pohja.json koko maapallo, skeema 3), nimet ilman syvyystestiä, nykyraja nimien alle, nimiö pysyy, ITÄTURKIT 44,3 N | cc7375a3f |
| Nykyraja 4,6 + reunus 3,0 (PT 17.27) | 44ded1621 |
| Hunnullinen vaihtoehto B (QA selkea 2) | 947b16ea1 |
| A pohjaksi, nimiö "Nykyinen\nKiina" Itä-Kiinan merellä rajan punaisella (IsoisaKerros.Vari), testi nimiö irti rajasta | 128c2924e |
| Muu hetken kun kertoja puhuu: taistelu ristinä nimineen, valot lauseen ajan, Silkkitie; kaikki häipyvät; pohja jo rajahetkeen | 33a93efe1 |
| PK:n d8f65ec23 (221 eaa. kiinteä laaja) yhdistetty | e8b71772c |
| KK:n löydökset (palkki, puherivit, NURGAN, 950) + korkeuskoe (QA kiina korkeus <vuosi>, KiinaVaestopintaKerros.Laske) | 1af33ce7f |

Kuvat ja videot: `proto-3d/lokit/todistus-kiina-hunnu-589-20261017-1810/kuvat/pari-A-selkea-B-hunnullinen.jpg` (omistaja valitsi A),
`proto-3d/lokit/todistus-kiina-selkea-19-20261017-1844/kiina-koko-omistajalle.mp4` (video v1, PT:llä).

## 3. Avoimet

- **Main-data hyväksynnän jälkeen:** nimipaikat muutettu vain proton kopiossa (`Resources/Kiina/kiinan-dynastiat.json`): ITÄTURKIT 589
  45,88 → 44,3; NURGAN 1421 47,9/132,91 → 45,5/129,5; ETELÄINEN TANG 950 → "ETELÄINEN\nTANG" 25,9/116,0. Lähde main `data/linssit/kiinan-dynastiat/kiinan-dynastiat.json`.
  Samoin `nykyinen-kiina.json` nimiö (tyokalut/kiina_nykyraja.py päivitetty) ja uusi `kiina-puherivit.json` (Williamin käsikirjoitus v2:n perus-lauseet).
- **Kanavat ja muurit** "hetkenä": Williamin otoissa ei segmenttiä → ei tehty (589 Suuri kanava mainitaan perus-lauseessa).
- Maapolygonit.geojson (pohjan maa) kattaa vain pelin 135 maata: Afrikasta puuttuu maita (ei näy Kiinan kuvassa).
- Paikallinen `.claude/settings.local.json` on muutettu (ei omani, ei commitoida).
