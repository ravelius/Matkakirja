# Linnanrakentajan luovutus 13.10.2026 ilta (Suomen aika ~19.4x) — nollaus 50 % (PT)

Luovuttaja: Linnanrakentaja (Opus, high). Vastaanottaja: seuraava Linnanrakentaja-sessio. Edellinen: `viesti-linnanrakentaja-luovutus-20261013-paiva.md`
(Olavinlinnan tila, leivontaliput, työtavat; edelleen voimassa).

## 1. Lue ensin
1. `CLAUDE.md`, Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma).
2. Tämä tiedosto kokonaan. Olavinlinnan yksityiskohdat päivän luovutuksesta (kohdat 2, 4, 6).
3. **OLAVINLINNA ON YHÄ TAUOLLA. PEKING ON CODEXILLA, joten Pekingiin ei tehdä mitään** (PT 13.10. ilta).

## 2. SEURAAVA ERÄ (PT 19.3x): Rodinin veistosmallit pelikuntoon
- PT: harvenna ja pakkaa Rodinin mallit kuten NL:n patsaat (patsaat.json + CC BY -krediitti). Lähde: SK:n kansio
  `/Users/Shared/Claude/proto-3d/_valmiit/taidemuseo-ranska-patsaat-vienti-20261013/` (12 mallia, valmis 18.55, `taidemuseo/ranska/patsaat/patsaat.json`,
  lisenssit/, puutteet.md). Mittakaava SK:n liitteestä C1 (`patsaat.json` mitat_cm_kork_lev_syv / mitat_viite), verkko puhtaaksi, budjetti NL-patsaiden
  tasolla. Toimitus LS2:lle (rakentaa Rodin-salin), esikatseluarkki PT:lle.
- **HUOM, tarkista ennen aloitusta (päällekkäisyys):** LS1 ajoi jo 19.17 paketin `taidemuseo-ranska-patsaat-astc-v1-vienti-20261013/`
  (veisto_blender.py), ja LS2 kertoi 19.3x, että pakkaus on nyt LS2:n tehtävä. LS2 korjaa itse Helvetin portit (skannauksessa on
  ympäristöä mukana: mitat 9,89 × 6,35 × 3,24 m, todellinen n. 4,0 × 6,35 × 0,85) ja Balzac-monumentin (ei tekstuuria → pronssipatina, esim.
  sRGB 62/58/46). Kysy PT:ltä ja LS2:lta yhdellä rivillä, mikä osa jää sinulle, ennen kuin aloitat.
- NL:n malli: `taidemuseo-alankomaat-v3/lahde/` (patsaat_pakkaa.py: kärjet yhdistetään ennen dekimointia, mittakaava/kääntö/etupuoli
  patsaat-taulu.json, etupuoli glTF +Z) ja `taidemuseo-alankomaat-patsaat-astc-v1-vienti-20261010` (paketin muoto).
- Salin jalustat (sali.json veistospaikat): rp-portit 4,8 × 0,35 × 1,4 m (max 4,0 × 6,4 × 0,9), rp-balzac 1,4 × 1,0 × 1,4, rp-ajattelija 1,3 × 2,6 × 1,6,
  rp-porvarit 3,0 × 0,4 × 2,6, rb-suudelma 1,6 × 0,5 × 1,6, rb-pronssikausi, rb-danaidi, rb-kasi; sc-nike ja gg-venus ilman mallia.

## 3. Tänään tehdyt (valmiit)
| Erä | Tila | Polku |
|---|---|---|
| Pikkupiha ajo11 / ajo11b (E 102 -käytävä tumma) | LS2:lla (vienti pikkupiha/ajo11b, botti) | `_valmiit/olavinlinna-pikkupiha-v1/ajo11b/`, LUEMINUT osiot ajo11/ajo11b |
| Ro-pax-autolautta (kaukolautat) | LS1 kytkee (ElavaKaupunki "autolautta") | `_valmiit/autolautta-ropax-v1/lahde/RoPaxLautta.cs` (sha256 bebd1567…), esikatselu/ropax-arkki.jpg |
| Ranskan taidemuseo, sali v1 | LS1 kytkee (proto linssiseppa/museo-maa-188) | `_valmiit/taidemuseo-ranska-v1/` (LUEMINUT.md), paketti `_valmiit/taidemuseo-ranska-v1-vienti-20261013/` |

- **Pikkupiha ajo11b:** E 102 -verhous vain suulta z 1,8…5,5. Kuoren leikkaus ei saa osua kävelyosan kirkkotorni-portaiden kolmioihin, koska
  natiivi rajaa ne samalla leikkauksella (RajaaKavelyosat, keskipisteet; seinät ja lattia ovat koko pituuden kolmioita). E 102 -laatikko alkaa
  z 2,8:sta, ja sisätilan x-kaistat ovat y < 0,0. Suulla on leivontavalo `e102-suu` 30 W. Avoin: botti/simuajo LS2:lla.
- **Ro-pax:** `RoPaxLautta.Luo(pituusM = 170)` + `Piippu()`; 170 m 3 044 kolmiota, 90 m 1 818 (Gozo/Pireus). Kääntö ja vienti `lahde/kaanna.sh`.
- **Ranska v1:** 10 osaa, 55 teospaikkaa (teosluettelo-v1, todellinen koko), 10 veistospaikkaa, `esteet`/`penkit` = [x0, x1, z0, z1] (LS1:n muoto),
  `glb` {kansio sali-v1/, atlas 6x6}. Runkolaajennukset: tynnyriholvi, avoin piha, väliseinä, kello, esteet/penkit-malli, valo.valokerroin (lasin
  hehku face-attribuuttina). Valot mitattu `runko/lahde/mittaa_atlas.py`:llä (seinät 25–195 lx C2.6:n kaaren mukaan, piha ~950 lx).
  Avoimet: salonkiripustus yhdessä rivissä, SdE:n sivuseinät tyhjät, 35 materiaalia.

## 4. Työtavat (uutta tänään)
- Asemataulu (Rq5ajPU4…) ei aukea tämän tilin Claude Codesta (ArtifactData: "no access"); ei estä työtä.
- Omistajan Mac-käyttöikkunassa (PT ilmoittaa) EI Blender-leivontoja eikä raskaita ajoja.
- Taidemuseon valotarkistus: `mittaa_atlas.py` (lx osittain) + `atlas_kuvat.py` (albedo × atlas kuten pelissä) ennen toimitusta.
- Pitkät ajot `perl /Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-pikkupiha-v1/lahde/irrota.pl <loki> <komento>`.

## 5. Aloitusviesti

```
Olet Linnanrakentaja (Opus, high) Matkakirja-pelissä. Checkout /Users/Shared/Claude/Matkakirja-linnanrakentaja, haara linnanrakentaja-tyo-20260929.
Aja git fetch origin. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linnanrakentaja-luovutus-20261013-ilta.md KOKONAAN.
OLAVINLINNA TAUOLLA, PEKING CODEXILLA (ei mitään). Seuraava erä: Rodinin veistosmallit (luovutuksen kohta 2), mutta tarkista ensin
päällekkäisyys LS1:n/LS2:n paketin kanssa (yksi rivi PT:lle ja LS2:lle). Agentit vain Opus/Sonnet; skriptit tiedostoihin; yksi leivonta kerrallaan; ei poistoja.
```
