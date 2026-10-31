# Valosepän luovutus 31.10.2026 klo 21.00

Syy: kontekstivahti 30 %. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 18.57–20.57). Proto-repo on vain paikallinen. Edellinen: viesti-valoseppa-luovutus-20261031-1848.md (sen työtavat ovat voimassa).

## VETOVASTUU: KOEKOHTAUS PIHA 06 (omistaja 18.28 / 18.31)
Tavoite: Meridiaaniportin piha 06 Macin Unity-editorissa mahdollisimman hienona, suorituskyvystä välittämättä. Tulos on sovitettu havainnepari KK:lle → omistajalle.

### Valmista
- **Koehaara:** `natiiviseppa/koe67-piha06` (NS) = 5a51c8181 (sis. minun linssiseppa2/piha06-pari abd09ac0b = 3dd03016d + PK:n koe-valo-k4 c9455d902: QA `palatsi osasarja-valo`; NS:n SSR-rajaus, GI-korjaus ja säädettävä SSR-kiilto). eea644ee0 toimii, mutta siinä kiilto ei vaikuta.
- **Leivonta:** LAV k06b (polvi 0,6/0,3, aurinko 45°/318°) → juuri `_tyo/linssiseppa2/juuri-k06b` (juuri-l4 + k06b-kansiot vanhoilla nimillä + `kielletty-osasarja-v6-k06`). k06 (0,65) = juuri-k06.
- **Rajaus sovitettu:** keisari `16.4 -492.3 -2.03`, testikamera `2.4 6.5 3 45` → keisari 0,13/0,12, alareuna 0,82/0,83. Palatsin mittasuhteet poikkeavat havainteesta (sali leveämpi, siivet kauempana), mitat ovat oikeat, joten rajaus on kompromissi (ovet osuvat). Pelikamera ei kelpaa (keisari 0,20, ja testikamera 0:n jälkeen tuli taivaskuva).
- **Skenaario:** `_tyo/linssiseppa2/skriptit-20261031/pari-k06e.zsh` (pohja; VAR = "paikka|testikamera|6.7-komennot ;-erotettuna"). ÄLÄ muokkaa käynnissä olevaa skriptiä (zsh lukee sitä ajon aikana) → kopioi uudeksi tiedostoksi.
- **Keisarin varjo uudella auringolla:** vasemmalle-taakse kuten havainteessa ✓.
- **Luvut** (6.7 pois, k06b): puhki 7,7 %, lattia 210 / havainne 200, p95 239 / 222. SSR täysillä: lattia 179 (lämmin punertava kuten havainteessa), puhki 1,0 %. Sumu 0,002 + GI ilman SSR:ää: 209, 4,9 %. GI: ero pieni. Sumu 0,006 (NS:n oletus) = maitomainen → AINA `valo sumu 0.002` tai `0`.

### KÄYNNISSÄ
- **Ajo 7** `lokit/pari-k06e-*` (5a51c8181, juuri-k06b): kiilto lattia 0,3 / 0,2 / 0,1 + sumu 0,002 + ssr + gi → valitse lattia ≈ 200 ja lämmin sävy.
- Seuraavaksi: lopullinen pari = paras kiilto + **`ui juoksupeli palatsi lodkerroin 5`** (taustan LOD-sauman kierto, PK) → värimittaus (`_tyo/linssiseppa2/tyokalut/varimittaus.py`, aurinko + varjo) + lähikuvat → KK (PT:n kautta). Lisää myös `valo gi 1` (LAV poisti GI:n kaatavat tyhjät primitiivit tausta-v88:sta; k06b:n taustassa niitä voi vielä olla → jos GI kaatuu, aja ilman).

## AVOIMET
1. **Taustan LOD-sauma** (koskee koko junaa): LOD valitaan 239 m palan keskipisteestä → viereinen pala leipomattomana LOD1:nä (terävä kylmä raja). PK tekee "lähin piste palan rajoihin", kun PT antaa erän (PT:lle ehdotettu 20.4x). Kuva `_tyo/linssiseppa2/k06-f0-sauma.png`.
2. **Reitti-216, PT:n kohta 2:** (a) harmaa terassi ja (b) turkoosi kaista = LAV:n tausta-v71:n vika → LAV korjasi **tausta-v88** (SHA256SUMS **ee7676aa4bbd**, uudelleenpaketoitu 20.5x). Tarkistusajo **käynnissä**: `_tyo/linssiseppa2/reitti-v88/aja-v88.zsh` → `reitti-v88/arkki-v88.jpg` (PK:n c3 vs v88: b-11–13 terassi, b-80–81). Jos harmaa ja turkoosi ovat poissa → kuvapari PT:lle ja PK:lle + "VS OK" LAV:lle (LAV vie PT:lle ja JU:lle). Katso myös katoilta tasaiset kulta- tai harmaalaikut (LAV: v71 keksi niitä satoja m² palaa kohden) → paikka LAV:lle. Keisari juoksee terassin sisällä (y 0 vs 0,70) → PK:lle tiedoksi annettu.
3. **Kerroinpäätös tehty:** JuoksuLeivottuKerroin 0,75 → 1 (PK + PT 20.0x) polvi-leivonnoille. Varmista, että PK vie sen junaan.
4. **Havainteiden aurinko** koillisessa (Pekingissä mahdoton) → PT vie KK:lle ennen laajennusta (edelliseltä).
5. LT:n valon kokonaiskulu (ei tullut).

## Osoitteet
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_c7344e20-fba8-433d-ba8e-184a325037ef, PK local_601d33fc-1c61-4ccd-8389-fa425417fafb, LAV local_beb68834-6c4f-4839-ac75-7876b45052c3, Postivahti local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5.
