# Pelikoodarin luovutus 20.10.2026 klo 10.33 (Postivahdin KOVA RAJA 42 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-0837.md (sen ENSIN-kohta tehty: 208v2–v8 ajettu). Rooli: Pelikoodari (Opus, high).
Proto-repo paikallinen (ei pushia), worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206, haara
**pelikoodari/palatsi-208 = 60bdd9871** (puhdas; vain Peli-testit/Testit/TilapainenVerkkoVienti.cs seurannan ulkopuolella, EI committia).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei omia ajoja eikä agentteja. JU kääntää **60bdd9871** → _tyo/pelikoodari/palatsi-208v10-app (jonossa ~10.36, LS:n jälkeen SIMU NYT).
  Ajetaan VAIN 208v10 (208v9/v9b = d98ed4257/95ff9013b, ei ajeta).

## ENSIN
1. JU:n SIMU NYT (sha 60bdd9871) → `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-sokkelo-206/aja-palatsi-208v10.zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/palatsi-208v10-app/Matkakirja3D.app`
   (taustalle; sk-palatsi-208v10.txt: oleta joki v2 9 vesialuetta, esto leivottu, verkko, peittokartta, malleja 12). Valmis → **SIMU VAPAA → JU**.
2. Kuvat täysikokoisina (lokit/todistus-juoksu-palatsi-208v10-{iphone,ipad}-*): V1 joki vedellä + 5 siltaa; V3/V6 kamera ei muurin
   sisällä, ei punaista rengasta; V4 Taihedianin julkisivu ristikko-ovin + palkit (katto häivyttyy vain kameran ollessa lähellä); V5 Puyi
   kujalla ilman häivytysikkunaa (kamera ylempänä/lähempänä). Sitten V1–V6 + video KK:lle (local_8e4fcfed…) ja PT:lle (≤ 3 riviä).
3. TARKISTA V1/V2: VS mittasi Taihemenin aukion laatan (tausta-v3 1-0/2-0) korkeudelle −1,4…−2,0 (ei 0). Jos Puyi on siellä ~1,5 m
   ilmassa tai joki (y −1,5) laatan alla → korjaus laattaan (Lavastaja: aukio 0, uoma alle) tai VS:n jokimaskiin; sovi VS:n kanssa
   (local_e675f86d…; VS ei tee toista jokea, PT 10.5x).

## TEHTY TÄLLÄ VUOROLLA (testit 675/675, unity-tarkistus 0, liikevahti ok)
- 9351a79f0 tausta-v3 + kulmatornit päälle; 1b2c253c4/268bbb1a4/60bdd9871 rakennukset v7 → v9 → **v11** (12 mallia, sillat;
  "palkit"-solmu rungon ryhmään – RakennaSolmuittain piirtää vain luetellut solmut).
- 60d58037b **JuoksuKorkeusKartta** (Peli, puhdas): LOD2-geometrian 2 m ruudukko (ylä = max, ala = matalin ei-vaakasuora, d98ed4257);
  Peittaa = näkölinja kamera → Puyin rinta jonkin ruudun välin läpi (räystään alta näkee, AlaVara 1 m). Käyttö: JUOKSU_SEINA palatsi
  v2:ssa (V4Maailma seina-ehto) ja kamerapuomi.
- ffaf8ab9a **leivottu esto** (PT 09.5x): taustalaattojen talojen seinät (jyrkät ≥ 1,5 m) verkon 0,5 m rasteriin → JuoksuPalatsiEsto
  (MKPE v1, gzip-bitit). Leivonta: `PALATSI_SISAAN=… TAUSTA=… ESTO_ULOS=… ./kaanna.sh PalatsiEstoLeivonta` (kaanna.sh sisältää nyt
  DioraamaGlb.cs). Ämpärissä maailma-v4/palatsi-esto-v1/esto.bin (paketti juoksupeli-palatsi-esto-v1b, 44 kt, 111 400 ruutua); ajossa
  luku 3/7 ms. Verkko 3511 → 1529 solmua, yksi komponentti, kaikki kohteet. Uusi pohja tai tausta = uusi leivonta ja polku (v2).
- 7342e33d2/d98ed4257 **kamerapuomi** (KK 10.3x): ehdokkaat (etäisyys, korkeus) ensin ylemmäs+lähemmäs, lopuksi matalammalle; Liikepohja.Jousi;
  QA `palatsi puomi 0|1`. Palatsin mallien katot häivytetään KAMERAN paikan mukaan (palatsiKatot, KameraPaikka). Häivytysreikä 1,1 m,
  reunavyö 10 % (ei punaista rengasta).
- 95ff9013b **Kultaisen veden joki** vesipinnaksi pohjasta (LuoMaaV2: joki.vesialueet 9, y −1,5, laji 15); laatoissa oli vain V4_lattia.
- QA uudet: `palatsi seinat 0|1` (esto), `palatsi puomi 0|1`.
- Pohjapiirrokset: _tyo/pelikoodari/palatsi-208/verkko-v2-seinin-koko.png, -seinin-piha1.png, -ilman-piha1.png.

## AVOIMET
- V4-selitys PT:lle: aiemmin KattoHaivytys poisti katto-solmun (sis. etupalkit) Puyin ollessa räystään alla → nyt kameran mukaan + v11 palkit erikseen.
- Kulmatornit eivät näkyneet yhdessäkään simukuvassa (V6 B:n alusta näkyy tunnelin seinä); Lavastaja tarkisti omista kuvistaan.
- B-alku (pohjoisportti): Puyi aloittaa porttitunnelista seinää kohti – katso v10:n V6.
- Nimet: NUI:n juoksu-nimet-208 (kehys vahvistettu NUI:lle: puyi.localPosition = (X, −Z) Maailmaan-kehyksessä). KS: nimet.json v1e NUI:lle.
- Juna 208: palatsi-208 junaan vasta KK:n OK:n jälkeen simukuvista.
