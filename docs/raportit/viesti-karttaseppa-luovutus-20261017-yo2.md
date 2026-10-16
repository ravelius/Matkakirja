# Karttasepän luovutus 17.10.2026 klo 01.5x (Postivahti: kova raja 36 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-yo.md` (cf1f77d54).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-yo2.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖS / SIMU NYT, 1 + 1); ilmoita SIMU VAPAA. Junaan vain PT:n/KK:n ok:lla.

## 1. AVOIN: ISS-pienoispallo – rajat + reittiviiva + telinelaatikko pois (juna 198)

- Haara `karttaseppa/iss-reitti-198` (worktree /Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198, natiivi-backup),
  kärki **aeb76a609** = iss-rajat 2d0957ef6 (rajat ±51,6°, verho, kertojan v1-lansi 17,5 s) + reittiviiva 34941a7a5
  (omistaja 00.50: kuluva kierros 0,55 taakse + 0,45 eteen, AstronauttiLinssi.AlusReitti, varjostimen _Reitti 48 pistettä,
  edessä kirkas, takana haalistuu; testi `linssi astro pallo reitti 0|1`) + harmaa telinelaatikko pois (PT: omistajan kuva
  iss-linnunrata-katkeaa-0043.png; AstronautinNakyma.cs kyytiTeline poistettu). tarkista.sh 0. EI VIELÄ KÄÄNNETTY.
- iss-rajat-197 ei saa omaa käännöstä (juna 197 lukittiin fd8e3f769 ilman sitä; JU ohitti).
- Julkaisija kääntää L2:lla NUI:n 198-erien jälkeen → `proto-3d/_tyo/karttaseppa/iss-reitti-198-app`. Sitten SIMU NYT iPhone
  123B4B25 (~7 min) → `zsh proto-3d/_tyo/karttaseppa/iss-reitti-198/ajo-iss-reitti-198.zsh` (skenaario sk-iss-reitti-198.txt:
  J1 reitti | E1 ilman = kuvapari, J2 reitti + rajat, J3 pieni reunassa ilman laatikkoa, R4 kertojan rajat). Jos app-kansiossa
  ei ole kaannos.out-tiedostoa, kirjoita `KÄÄNNETTY <sha> karttaseppa/iss-reitti-198` ensin (ajo lukee SHA:n siitä).
- Kuvapari + videot PT:lle (3 riviä) → junaan 198 PT:n ok:lla (NS:lle sha). Ilmoita SIMU VAPAA Julkaisijalle.

## 2. AVOIN: Kiinan dynastiat -kerrokset (omistaja 01.25 "yritä tehdä valmiiksi")

- PR https://github.com/ravelius/Matkakirja/pull/4764 (haara karttaseppa-kiinan-kerrokset, faf3badee; sparse-worktree
  /Users/Shared/Claude/wt/karttaseppa-kiinan-kerrokset). 241 kerrosta LS:n litteässä muodossa (`kerrokset` +
  `kerrokset_lahteet`, MUOTO-KERROKSET.md); lukittu `vuodet` ennallaan. LS kuittasi muodon ja lukee 241/241 proto-haarassa
  linssiseppa/kiina-valmis-198 aaa7193c1 (ei käännetty). Taistelut SK:n tarkistamilla koordinaateilla (epavarma, tausta).
- Seuraavaksi: CI vihreäksi → merge kaavan mukaan (vihreä PR ilman korttia). Väestön alueosuudet ovat oma arvio (merkitty).
- Mahdolliset jatkot LS:n piirron jälkeen: joukkojen määrät taisteluihin (nyt arvo null), Zheng He'n matkat erikseen.

## 3. Valmiit tällä vuorolla

| Erä | Toimitus |
|---|---|
| Pienoismallien maavarjo (KK:n bugi) | vihjeet-198 cbd0ad793, käännös b6c4b3025, iPad-todistus `lokit/todistus-vihjeet-paikoilla-jalkeen-ipad-198-20261017-0133/varjo-lahikuva-ennen-jalkeen.png`; KK ja VS hyväksyivät; NS:lle junaan 198 |
| Skannerin korkokuva joka Cupolan nimelle (omistaja 00.53) | karttaseppa/skanneri-korkokuva-198 158e90cd9: +1 025 kohdetta (k-/v-), viivat.json 1 168:lle (Natural Earth 10m PD), SkanneriHaku Ydin-puolelle, SkanneriKattavuusTestit 1 131/1 131; NUI piirsi 5c2cb709b. Työkalut `_tyo/karttaseppa/skanneri-korkokuva-198/` (korkeudet.py, viivat.py, venv-kartta) |
| Levysiivous | 3 worktreetä pois (vihjeet-198, skanneri-198, iss-rajat-197; haarat natiivi-backupissa) |

## Muistiinpanot

- OSM (ODbL) on jakoehtoinen → ei pysyvässä latausluvassa; Overpass /api/ robots-kielletty. Viivoihin Natural Earth (PD).
- GLO-30-laatat ovat kaikki NAS:lla (26 452), latauksia ei tarvita; python tifffile vain venv-kartassa (T7).
- Julkaisijan yo-kääre odottaa lukossa haaranimeä; SHA-käännös kirjoittaa lukkoon SHA:n (ei jumi, vaan toisen rooli).
