# Lavastajan luovutus 20.10.2026 klo 11.16 (Opus, medium): Postivahti pyysi nollausta (konteksti 35 %)

Edellinen: `viesti-lavastaja-luovutus-20261020-0810.md` (0bbae900e). Viestit lähetetään send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`).
PT:lle enintään 3 riviä. **Vientipakettia ei muuteta sen jälkeen, kun se on lähetetty (PK/JU)**, vaan korjaus tehdään aina uudella nimellä.
**LAHTEET.md EI SAA olla SHA256SUMS:ssa** (JU hylkäsi koko viennin 08.2x). Paketin muoto: `_valmiit/<nimi>-vienti-20261020/juoksupeli/maailma-v4/<kansio>/…` + SHA256SUMS + LAHTEET.md.
Ei rm, ei cd. Skriptit tiedostoon, ja muokkaukset Editillä tai .tmp + os.replace -tavalla.

## ENSIN (uusi Lavastaja)
1. **Odota Codexin PT734–737:ää** (T7 `…/output/juoksupeli-kielletty-koristeet-v2/`):
   - Qianqingmenin kullatut leijonat (korvat luimussa): kultamateriaalin tilalle
   - kohokuvioitu lohikäärmepylväs: Taihedianin 6 kultapylvään tilalle (`kk_sisusta.kultapylvaat`, KULTAPYLVAAT_V7)
   - Taihemenin lohikäärmekivi: `lohikaarmekivi` portaiden keskiluiskaan
   - ovien kukkaristikko: `kk_juoksu.ristikko`
   Kokoa ne rakennukset-v12:ksi samalla tavalla kuin v7:ssä:
   - `vie.koristeet()` tuo glb:t KORISTEET-listasta ja yhdistää ne runkoon
   - lisää uudet kohteet `kk_sisusta`:aan; tuplen muoto on (malli, x, y, z, skaala, kultamateriaali)
   - tarkista CODEX_MALLIT-polku (v1 → v2)
2. PK:n simukuvat 208:sta (tausta-v4, rakennukset-v11, kulmatorni-v1b): tarkista kulmat, leijonat, valtaistuin ja muurin harja, kun ne tulevat.

## Voimassa olevat paketit (kaikki ämpärissä, PK kytkenyt palatsi-208:aan)
- **rakennukset-v11** (`kielletty-rakennukset-v11`, 12 mallia). Solmut runko, katto ja **palkit** (V4_teal erillään, katon häivytys ei vie niitä).
  - Codexin leijonat: uros + pallo idässä, naaras + pentu lännessä, peilattu niin, että tassut ovat sisäpuolella. Qianqingmenin pari on 0,8 × ja väliaikaisesti kultaa.
  - Taihedianin valtaistuin ja sermi. Takimmaiset kultapylväät on siirretty kohtaan y 1,6, ja pylväät ovat sileää V4_gold_relief-kultalakkaa.
  - Kultatiililattia V4_jinzhuan (+ sauma).
  - Ristikko-ovet kaikissa 11 jänteessä; keskijänteen lehdet auki sisäänpäin.
  - Uutena mallina e-kultaisen-veden-sillat: 5 siltaa OSM:stä, paikka_pohja (10,873, −310,585).
- **kulmatorni-v1b** (`kielletty-kulmatorni-v1b`): Codexin v6, skaalattu 17,5 m:iin muurin harjalta. Neljä paikkaa kulmatorni.json:ssa, y = 10 (muuri 10 m).
- **tausta-peking-v4** (`kielletty-tausta-v4`):
  - maa tasattu tasoon 0 60 m ruuduissa
  - joen kohta tasaista V4_lattiaa, jonka VS:n varjostin leikkaa (VS tekee uoman ja veden)
  - Pekingin kulmatornit poistettu yli 9,5 m:n korkeudelta ja omien mallien kohdat yli 0,25 m:n korkeudelta
- Vanhat (älä kytke): rakennukset v1–v10, tausta v1–v3, kulmatorni v1.

## Työkalut `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/tyokalut/`
- `vie.py -- <ulos> [mallit]` (ensin kopioi edellinen vN uudeksi kansioksi; rakennukset.json yhdistetään vanhaan)
  - S.CODEX = True; koristeet() hoitaa leijonien peilauksen ja materiaalien yhtenäistyksen
  - jaa() erottaa palkit-solmun
- `kk_sisusta.py` (valtaistuin, kultapylväät, leijonapari), `kk_juoksu.py` (halli: jinzhuan, ristikko, avoimet ovilehdet), `kk_sillat.py`
- `kulmatorni.py`, `peking_tausta.py` (aja: `aja_tausta_v4.zsh` → peking/tausta5) ja `tausta_json.py`
- Esikatselu: `esikatsele_koristeet.py -- <vN> <etuliite>`, `esikatsele_maasto.py`, `esikatsele_kulma_tausta.py` ja `esikatsele_kulmatorni.py` → `esikatselu/`
- Kaikki 12 mallia: `vie.py -- <vN> a-meridiaaniportti b-… c-… d-… e-kultaisen-veden-sillat f-taihemen g-baohedian g-jalusta g-taihedian g-zhonghedian l-… m-…`
  (ilman listaa ajetaan myös vanhat g-jalusta-etu ja N/O)

## Opit
- Codexin uroksen pallo on +X:ssä (patinan rajat), vaikka esikatselukuva näyttää muuta. Tarkista puoli glb:n rajoista.
- V4_gold = kattotiilen laji pelissä → kultaosiin V4_gold_relief.
- Maan arvio: 20 m ruuduissa hallien katot tulkittiin maaksi (−7,4 m); 60 m ruudut ja rajaus −4…+1 korjaavat sen.
- Kiinni pidetyt T7-polut: Codex `…/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/`, Peking v11 `…/peking-codex-20261013/delivery-archive/peking-codex-v11-pt261-20261014`.

## Avoimet
- 60 fps on mittaamatta. Taihedianin LOD0 on 27,8k ja g-jalusta 98k kolmiota.
- Siltojen leveydet ovat OSM:n mukaiset (keskimmäinen 7,6 m). Jos KK haluaa keskimmäisen selvästi leveämmäksi, muuta kk_sillat.py:tä.
- Ei irrotettuja ajoja eikä taustatehtäviä käynnissä.
