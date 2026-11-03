# Karttaseppä: luovutus 3.11.2026 klo 08.48 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-0731.md (PR 6099; käsitelty: AVOIN 1 jatkuu, AVOIN 2 jatkuu, PR 6089 yhdistetty).
Syy: kontekstivahti 25 %. P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`,
N = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261103/`,
postilaatikon worktree `/Users/Shared/Claude/wt/karttaseppa-postilaatikko` (detached; fetch + checkout --detach
origin/claude/postilaatikko, commit, push HEAD:claude/postilaatikko).

## TEHTY
1. **PR 6089 (tasankoresepti kierros 3) yhdistetty** mainiin b4e622969.
2. **Delta-perus palautettu** CDN:ään (JU 08.05, 6/2/30 ym. = 200). Ei omia toimia.
3. **Pariisin palat:** HYVÄKSYTTY 00 (koepala), 03, 05 (v3), 06, 07, 10, 11 → `P/hyvaksytyt.json` = [3, 5, 6, 7, 10, 11].
   Kuittaukset postilaatikossa: 05 ea78027a0, 07 93a4294fc, 11 b5f6c082b, 03 a47a2dd92. Kylttisiirrot kopioitu P:hen.
4. **lukitse.py korjattu** (oma vika: lukitsi myös hyväksymättömät `_review`-palat) → lukitsee vain pala00 +
   `hyvaksytyt.json`. Lisää pala listaan AINA kuittauksen yhteydessä ja päivitä `P/SHA256SUMS`-rivi (hyvaksytyt.json).
5. **Saumaliukuma** `P/tarkistus/saumaliukuma.py <pala> <palat/palaNN/ohjaus-maski.png> <ulos> 100`: matalataajuinen
   värisovitus lukon reunasta, lukitut ennallaan. PT KUITTASI koonnin vakiovaiheeksi; kirjattu `P/LUE.md`:hen. Sävyero ei
   ole palautussyy; kuvio- ja korttelikatkot ovat. Pari: P/tarkistus/saumaliukuma/pari-09-15-ennen-jalkeen.jpg.

## TARKISTUSKAAVA (joka pala)
`cd P/_review-palaNN && shasum -a 256 -c SHA256SUMS`; lock-verification lockedPixelDifferences 0 ja lockedPixelCount =
`palat/palaNN/ohjaus-maski.png`:n valkoiset (vain hyväksytyt naapurit!); `python3 -I P/tarkista_ala.py P/_review-palaNN
P/palat/palaNN/merkit.json` (PUUTE-lista = kylttisiirrot-avaimet, ≤ 140 m); saumaliukuma → `P/tarkistus/kokoa_monta.py`
(uusin ensin, kangas_px `palajako.json`); katso lukon raja 1:1 ja 3×; saumamittari (rivin/sarakkeen L-ero / ympäristön
±40 riviä) – hyväksytyt 1,05–1,54, palautetut 1,65–2,06. Venv: "/Volumes/T7 4TB/Matkakirja-karttaseppa/venv-kartta/bin/python".
Huom: Codex lähettää koostepostia samoista otoista (esim. 8fc7779cb, 907a93e1f) → vertaa kuvan SHA:ta ennen tarkistusta.

## AVOIN (järjestyksessä)
1. **Pariisi, Codexin jono (PT kuittasi):** 09 v4 → 15 v2 → 02 v2 → 14 → sitten 1, 13, 4, 8, 12.
   - pala09: v3 d3a146d5c (kuva 760bcd02…) – poukama OK; Champ de Marsin puurivit/Eiffelin jalusta/kadut katkeavat
     riville y = 154 (b5111216c, e76671a06).
   - pala15: 35061115b (1b12503c…) – korttelit ja vesikuvio katkeavat y = 154; Vincennes litteä täyttö → metsäpuisto
     (57e4df407). Pala11:n itäreunan kapea litteä kaista hyväksytään niittyreunana.
   - pala02: fd4200b3e – pystysauma pala03:n kanssa x = 1306 (kadut, talokoko), mittari 1,90 (f1fa2ac83).
   Joka hyväksynnästä rivi PT:lle (mitä, sha, kuvan polku). Kaikkien jälkeen koko kankaan koonti (saumaliukuma joka
   palaan) ja tasot (luovutus 20261102-2210 AVOIN 2); omistajalle vain koottu kaupunki.
2. **Tasankopoltto:** N/ketju.sh (pid 6208) vaihe 1/5 (pohja) käynnissä 07.30 alkaen; seuraa N/ketju.out. Ketjun jälkeen
   N/LUE.md "Ketjun jälkeen" (delta perusta vasten: perus-20261015.json.gz, välitaso, VIENTI.md JU:lle, NS:n osoite,
   Tanska-pari PT:lle).
3. Vanha 27.10. poltto: T7-arkistointi (N/arkistoi-vanha.zsh) vasta, jos levy < 50 Gi.
4. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; muut Pariisin osat vasta KK:n suunnitelman jälkeen.
