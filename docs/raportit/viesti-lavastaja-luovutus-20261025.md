# Lavastaja: luovutus 25.10.2026 klo 03.27 (Postivahdin kova raja 77 %)

Edellinen: `docs/raportit/viesti-lavastaja-luovutus-20261023.md` (2f8e3a93f). Haara `linnanrakentaja-tyo-20260929`.

## Tila: juna 210 (ei TF), kaikki PT:n kuittaamia

| Paketti (`_valmiit/…-vienti-2026102x`) | Tila | Sisältö |
|---|---|---|
| kielletty-tausta-v46 (2996ef07fc29) | julki 02.48 | oikeat paikat ja koot, muurit pohja.json 4,0 m + harja, valo neutraalilla taivaalla |
| kielletty-muurikate-v14 (a94ba205227e) | julki 01.23 | luodattu v44:n muureista |
| kielletty-rakennukset-v37 (aa5ec43267f3) | JU:lla vietävänä (PT kuittasi) | v35 nastaovet, v36 Meridiaaniportin ovet seinien suuntaisiksi, v37 u-jingshan |
| kk-ulkorengas-v3 (3da49cdb4260) | JU:lla vietävänä (PT kuittasi) | Jingshanin alta rakennukset pois; v2:n puristus kumottu |
| avoimet-v42 (e84bb4863cc9) | julki 03.53 | harmaa lattia, matot/sermit/maljakot/lyhdyt/kasvit/arkut/kääröt pois, pylväät ø 0,6 m räystääseen 2,9 m levenevillä jalustoilla, punainen seinä, ohut maalattu kehä, Codexin kaapit #955 ja penkit #959 (sävy 0,72/0,72/0,52) |
| aarteet799-v3b → aarteet799-v3 (b0b0d4a6ce20) | julki 01.27 | lautaspöytä #948 (1,627 m, PT), lautaset opaakit karheus ≥ 0,3 |

Proto: `wt/proto-lavastaja-muoto`, haara `lavastaja/muoto-210`, viimeisin 0b465e7c5 (Palatsi.cs-vakiot). Esikatselu-linkit:
`proto-3d/_tyo/linnanrakentaja/esikatselu-mallit/`.

## Linjat (tämän yön, PT)

- Omistaja 20.10. 07.30 "oikeilla paikoillaan oikeassa koossa" on voimassa; "identtiseksi" (18.18) = vain ulkoasu. PT kumosi yön
  paikka- ja mittakomennot (Taihemen-siirto, G-madallus, muuri 3,7 m, korkeuspuristukset). Lista:
  `proto-3d/_tyo/linnanrakentaja/identtisyys-erot/yon-muutokset-mitat-vai-ulkoasu-20261025.md`.
- Avoimet × 0,70 pidetään (todellisen kaltainen ~3 m räystäs). Havainteen sommitelmaa ei tavoitella siirroilla.
- JU vie Lavastajan välittämällä PT:n sanatarkalla kuittauksella, kun tunniste täsmää (PT, JU 03.22).

## Raportit ja työkalut

- Kohdittainen taulukko 01–07: `docs/raportit/havainne-810-kohdittain-20261025.md` (d936a6d57). Parit
  `proto-3d/_tyo/linnanrakentaja/identtisyys-erot/b11-20261025/`.
- Havainnetyökalut PR https://github.com/ravelius/Matkakirja/pull/5211 (worktree `wt/lavastaja-havainnetyokalut`): kamera `--osumat`
  (`--osumaalue`, `--osumat-materiaali`), `--katot-pois`, `--ulkorengas`, `--vapaa`; mittari: harja, taivas keskellä, hallin alareuna,
  julkisivu. Kaikki kommitoitu (d641cff30).
- Leivonta: `leivo_malli.py`/`leivo_valo.py` ympäristömuuttujat TAIVAS 1,8, TAIVAS_VARI 0,45,0,46,0,50, KIMPOAMISET 4 (VS).
- Tuotantoskriptit `proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/tyokalut/`: avoimet_tiilikate, avoimet_lattia_harmaa,
  avoimet_sisustus_pois, avoimet_kalusteet (kaappi + penkki), avoimet_sali_havainne (pylväät, kehä, seinät), vie.py (u-jingshan,
  G_*-muuttujat oletuksena pois), peking_tausta (TAUSTA_TAIHEMEN_SIIRTO, TAUSTA_MATALA_ALUE, TAUSTA_KORKEUS oletuksena pois).

## Seuraava

- PT: lepo, kunnes PK:n pelikuvat rungosta tulevat; niistä muotoerot Lavastajalle.
- Avoinna muilla: 03:n sommitelma oikeissa mitoissa (omistaja aamulla PT:n kautta), PK kameran 810 rajaus muurikatteelle (02, 05)
  ja 05:n kuvaus kujaportilta (−249,4, 382), VS täyttö ja terassin marmorin sävy pelissä, 07:n pihojen puut kauas (PK/VS).
- Ensimmäinen askel: lue tämä ja PT:n viimeisin viesti; seuraa PR #5211:n CI:tä.
