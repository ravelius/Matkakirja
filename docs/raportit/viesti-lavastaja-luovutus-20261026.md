# Lavastaja: luovutus 26.10.2026 klo 10.1x (Postivahdin kova raja 41 %)

Edellinen: `docs/raportit/viesti-lavastaja-luovutus-20261025b.md` (874e9359e). Haara `linnanrakentaja-tyo-20260929`.
Proto: `wt/proto-lavastaja-muoto`, haara `lavastaja/muoto-210` (ei etärepoa, JU ottaa paikallisesti; juna-211 mergattu).
Kone kaatui 25.10. 14.34 (WindowServer). Paketit tarkistettu 26.10. 10.07 (SHA ok), L1-lukkoa ei jäänyt.

## Erät 25.10. iltapäivä

| Paketti (`_valmiit/…`) | SHA256SUMS | Sisältö | Tila |
|---|---|---|---|
| kielletty-rakennukset-v43-vienti-20261025 | b4ff235dcfed | kujaporttien p, -2, -3 ovilehdet aukon korkuiset lattiasta, 90° seinää vasten | ämpärissä, osoitin muoto-210 d9fd89ba0 |
| kk-tausta-peking-v51-vienti-20261025 | 6cd1c7dba6f5 | aukio 03: laatat 1-1 ja 2-1 leivottu nykygeometrialla (vanha leivonta käytti sijoitus14:ää) | PT kuitannut, osoitin 42a288eaa → JU/NS juna 211 |
| kk-tausta-peking-v52-vienti-20261025 | 05464a2406c9 | v51 + 3 porttihallia irrotettu + aukion siru (2-1:n päällekkäiset lattiakolmiot) korjattu | PT kuitannut 26.10. 10.2x JU:lle, osoitin muoto-210 467f8a6b1; editoritarkistus vielä ajamatta |
| kielletty-rakennukset-v44-vienti-20261025 | aef9cdf51d80 | v43 + t-portti-m15, t-portti-120, t-portti-m216 (katto + yli 6 m katto-solmussa, LOD0 leivottu) | sama kuin v52 |

## Kesken (järjestys PT 26.10. 10.1x)

1. **L1-ajot vasta JU:n ilmoituksen jälkeen** (TF 210). Valmis skripti `proto-3d/_tyo/linnanrakentaja/havainne-kuja40/aja-v52-ja-kujat.zsh`:
   aukio 03 juuri-v52:lla (v52/v44) + kujat 02 ja 05p juuri-v3:lla. Osoitin tehty (467f8a6b1, juna-211:n merge-ristiriita
   ratkaistu v52/v44:n hyväksi). Tuloksista viesti PT:lle ja PK:lle (PK testaa räystäskameran laitepiilot sk-laite-b.txt).
2. **Kujat 02/05 (ehdotus 2; NUI mitannut < 10 %, PT hyväksynyt; EI ämpäriin ennen omistajaa)**: `kielletty-rakennukset/kuja40-ehdotus2/`
   (kielletty-tausta, kk-muurikate-porras.glb, rakennukset). 02 muurit 6,64 m + reunaporras 0,95 m (väylä 4,7); 05 muurit 8,98 m +
   porras 0,75 m, kujaportti aukko 6,8 × 4,6 m (vie.py:n hyväksytyt arvot palautettu; ehdotuksen arvot kommentissa ja
   `vie.py.hyvaksytty-20261025` = nykyinen). AVOIN: reunaportaan materiaali. V4_sokkeli_kansi = oliivi, V4_kivireunus / V4_jalustalaatta0 /
   V4_lattia = tasavalkoinen (muurikatteen varjostin ei tekstuuroi). Nyt kokeilussa V4_sokkeli (`PORRAS_MAT=V4_sokkeli python3
   kuja_reunaporras.py …`). Jos ei kelpaa: portaat taustalaattaan V4_lattia-primitiivinä (lattiavarjostin) ja leivonta. Kolmikot
   `havainne-kuja40/{02,05}-kolmikko-ehdotus2*.png` (vertailu: levennetty nyt = ajot 120013/02 ja 125507/05b).
3. **Sali (VS)**: pilotti 3 `kielletty-rakennukset/leivottu-sali/avoimet-pilotti-leivottu-3/` (1,6×, 2048 näytettä, 3 × 3 -suodatus,
   harjakatteet pois). VS ajaa kolmikon. 88°:n juhlasalikopio tarvitsee oman leivonnan.
4. 05:n takaseinän tumman rakennusvarjon lähde varmistamatta (todennäköisesti taustan leivonta ennen muurien siirtoa).

## Diagnoosit ja opit

- avoin_uv2.py: kohteet ilman TEXCOORD_0:aa → Blender ei tuo UV1:tä → jäivät leivonnasta (pylväät mustia); nyt UV0 lisätään. Kierto
  normaaleja vastaan (talopilarit) → Cycles musta; nyt kierto käännetään.
- leivo_valo.py: SIJ oli kovakoodattu vanhaan sijoitus14.json:iin (aukion kiilojen syy); nyt taustan oma avoimet-sijoitus.json.
  Jo leivotusta palasta vanha UV1 poistetaan ennen uutta purkua. Taustan aurinko 170°/45° (pelin VS-arvo salille 188°/45°).
- Taustalaatoissa on täyttölattioita ja päällekkäisiä samantasoisia lattiakolmioita (myös muissa kuin 2-1:ssä, esim. 0-0, 1-0, 2-4):
  työkalut tayttolattia_alas.py, lattia_rajan_yli_alas.py, lattia_paallekkaiset_pois.py, lattia_osittaiset_alas.py; leivonta perään.
- Havainne-editori: `MALLIT=file://<juuri>/ zsh havainne-kuja40/editori-lr.sh <kohdat>`; uusi kohta lisättävä PAIKKA-taulukkoon
  sekä editori-lr.sh:ssa että vertailu-lr.sh:ssa (05p = −251,2 391). NUI:n leveys.py (perusasento 3,8 m / 14,2°) mittaa havainteen.
- L1-sääntö: TF 210:n aikana ei Unity-/editoriajoja; jonossa odottava oma ajo perutaan (kill), käynnissä oleva saa päättyä.

## Työkalut (`proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/tyokalut/`)

kuja_leikkaus.py, kuja_reunaporras.py, kuja40_muotoilu.py (ehdotus 2 -arvot), aja_hallit_v52.zsh, tayttolattia_alas.py,
lattia_rajan_yli_alas.py, lattia_paallekkaiset_pois.py, lattia_osittaiset_alas.py, avoin_uv2.py, avoin_leivo.py (KERROIN, SUODATA,
TAIVAS_VARI, MAA_VARI), leivo_valo.py.
