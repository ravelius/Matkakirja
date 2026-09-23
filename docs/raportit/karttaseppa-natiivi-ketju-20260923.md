# Karttasepän natiiviketju: kohdat 3–5 (suunnitelma ja arviot)

Karttaseppä 23.9.2026 klo 16.40, Fablen ketju (omistajan linjaus: koko peli
natiiviin). Kohdat 1 (maasto Ranska z0–z12, `julisteet/maasto/2026-09-23a`)
ja 2 (poltto 23a, käynnissä) eivät ole tässä.

**Avoin päätös (Fable):** mitkä ovat "pelattavat maat"? Alla arviot kahdelle
joukolle: **E28** = maat, joilla on värilaatasto (FRA GBR ESP DEU ITA NLD AUT
CHE PRT IRL CZE HUN POL GRC HRV BIH BGR ROU UKR FIN EST LVA LTU SWE NOR DNK
TUR), ja **K110** = kaikki nostotason maat.

## 3. Pallon sarja Z9–Z10 DEM-reliefillä: ensin Ranska, sitten muut maat

Nykyinen reliefi tulee 1′-korkeuspaloista (~1,85 km). Pyramidin z10 on
Ranskassa ~40 m/px, joten reliefi pitää lukea GLO-30:stä.

Koodimuutokset (yksi erä, `karttaseppa-syvat-tasot`):
1. `tools/hae-korkeusruudukko.mjs` / `korkeusruudukko()`: uusi lähde `--dem <kansio>`,
   joka lukee GLO-30:n suoraan (`tools/maasto/geotiff.mjs`, sama valinta
   overview-tasosta kuin maastossa). Kun lippu puuttuu, toiminta ei muutu.
   Uusia korkeuspaloja ei tehdä.
2. `tools/generoi-laattapyramidi.mjs`: `--tasoja`-katto 10 → 11 (z10).
   `maastovarjo.js` käyttää ruudun väliä `d`, joten 1″:n ruutu toimii sellaisenaan.
3. `tools/polta-paikallisesti.sh`: sarja `syva` (`--tasot 9-10 --alue …`,
   sarakeshardit kuten z8), ja `--pallo-tasot 9-10` läpi `tee-pallolaatat.mjs`:lle.
4. Luettelo: pyramidi.json saa tasot 9–10 laatastobittikartalla
   (vain alueen laatat). Web ei käytä niitä: pallo pysyy Z8:ssa.

Pallon ZN lähde on pyramidin z(N−1). Z9 tulee siis nykyisestä z8:sta
(1′-reliefi) ja Z10 uudesta z9:stä (DEM). Jos Z9:kin halutaan DEM-reliefillä,
Ranskan z8 poltetaan uudelleen samalla lähteellä, mikä muuttaa webin z8:aa
Ranskan kohdalta. Ehdotan: z9–z10 + pallo Z9–Z11 (Z11 lähteenä z10).

| | Ranska | E28 | K110 |
| --- | --- | --- | --- |
| DEM GLO-30 ladattavana | valmiina 4,8 Gt | ~20–25 Gt | ~250–350 Gt |
| pyramidi z9–z10 | 3 800 laattaa, ~165 Mt, 5 min | ~20 000, ~0,9 Gt, ~20 min | ~150 000, ~7 Gt, 2–3 h |
| pallo Z9–Z11 | ~10 000, ~100 Mt, ~20 min | ~55 000, ~0,5 Gt, ~1,5 h | ~400 000, ~4 Gt, ~10 h |
| CI-tauko | < 30 min | ~2 h | useita iltoja |

K110:n GLO-30 on käytännössä koko maailman maa. Järkevämpi on K110:lle
GLO-90 (kohta 4), koska z10 on 90 m:n aineistolla riittävä muualla kuin Euroopassa.

## 4. Maasto koko maailmalle z0–z10 + pelattavat maat z12

- **Lähde:** Copernicus GLO-90 (sama lisenssi ja lähdemaininta kuin GLO-30,
  AWS `copernicus-dem-90m`). Arvio koko maailmalle ~26 000 ruutua, 80–110 Gt
  NAS:iin; lataus ~30–60 min. **Lupa:** omistajan kortti koski GLO-30:tä,
  joten GLO-90:n kattamisesta tarvitaan vahvistus.
- **Laattamäärä:** z0–z8 koko maailma (~175 000, meri litteänä, pieniä).
  z9–z10 vain maalaatat (~1 miljoona). Yhteensä ~1,2 M laattaa, ~8 Gt.
  Tuotto `--osa i/8` rinnakkain ~20–30 min (NAS-luku rajaa).
- **Vienti:** ~1,2 M objektia nopeudella ~120/s ≈ 3 h (R2 Class A ~5 $).
- **Työkalumuutokset:** (a) monilähde: GLO-90 maailmalle ja GLO-30 maille
  z11–z12:ssa, tasokohtainen valinta; (b) `available` maalaattojen
  rivijuoksuina suorakulmioiksi (z9–z10), jottei merelle listata puuttuvia
  laattoja; (c) `--alue` maalistaksi (maiden rajat → 1°-ruudut).
- **Pelattavat maat z11–z12:** E28 ~550 000 laattaa, ~4,5 Gt, tuotto ~15 min
  8 osalla, vienti ~80 min. Ranska on jo tehty.
- **Julkaisu:** uusi kansio `julisteet/maasto/<pvm>-maailma`. Ranskan
  2026-09-23a jää ennalleen, kunnes natiivi vaihtaa osoitteen.

## 5. Ranska z13 omistajan kokeilun jälkeen

~368 000 laattaa, ~2,5–3 Gt, tuotto ~25 min, vienti ~50 min.

## Järjestys ja kesto

1. (Poltto 23a valmis) → erä `karttaseppa-syvat-tasot` (koodi + testit,
   ~2–3 h työtä) → Ranskan z9–z10 + pallo Z9–Z11 CI-tauolla (< 30 min).
2. Rinnakkain GLO-90-lataus NAS:iin (ei kuormita CPU:ta) ja maastotyökalun
   monilähde- ja available-erä `karttaseppa-maasto-maailma`.
3. Maailman maasto z0–z10 + E28 z11–z12, vienti yöllä.
4. E28:n pyramidi ja pallo syvät tasot, kun GLO-30 E28 on ladattu (~25 Gt).

## Lisätilaus: reliefisarja topografialinssille (Linssiseppä 23.9.)

`tee-pallolaatat.mjs --relief`: reliefipyramidi 20260920 (Miller z0–z7) →
`matkakirja/reliefipyramidi/20260920/pallo/{z}/{x}/{y}.jpg` Z0–Z8 + laatat.json.
Polton 23a jälkeen, osoite arviolta klo 21.
