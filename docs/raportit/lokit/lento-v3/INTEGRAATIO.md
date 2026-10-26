# Lento v3 -integraatio natiiviin (Natiivisepän apuagentti, 27.9.2026 klo 02.00)

**Commit:** `cdd285f9` haarassa `natiiviseppa/lento-v3` (worktree `/Users/Shared/Claude/wt/proto-natiiviseppa-lento-v3`,
pohja `6b0997ef`). Ei mergetty, ei pushattu, ei käännetty Xcodella.

**Tarkistukset:** `Peli-testit/unity-tarkistus.sh` → 0 virhettä (kaikki 6 assemblyä). `Kartta-testit/kaanna.sh` → 330/330
läpi (uusia 10 testiä `LennonV3KaytavaTestit`, Linssisepän 11 `LennonV3Testit` edelleen läpi).

## Mitä tehtiin

| Tiedosto | Muutos |
|---|---|
| `Kartta/Nappula.LentoV3.cs` (uusi, `Nappula` nyt `partial`) | V3-haara: kytkin, odotus, leikkaus, 15 s:n lento, purku, äänen ja UI:n rajapinta |
| `Kartta/Nappula.cs` | `Lenna` ja `AloitusLento` haarautuvat v3:een; `Pysayta`/`Paatalento` purkavat v3:n; `Nakyvat` koskee konetta; `Esilammita` rakentaa Tiger Mothin valmiiksi |
| `Kartta/LennonV3Kaytava.cs` (uusi, puhdas) | Käytävän laatat, esilämmitys, koneen lisäkorkeus maaston yllä, leikkausehto |
| `Kartta/KarttaKerrokset.cs` | `EsilataaLentoV3` + `KaytavaLataus`; aloitusnäytön `EsilammitaLentoV3`; `LentoPohjaValmiiksi` ei luo satelliittipintaa v3:ssa |
| `Kartta/LennonV3.cs` (Linssisepän) | Vain kehyskohtaiset varaukset pois: kanavat ilman `s`:ää kaappaavaa delegaattia, `Pituudet` + ylikuormat `ReitinKohta(p, pit, u)` ja `Kallistus(p, pit, t)`. Arvot identtiset (testi `PituudetYlikuormaSamaArvo`) |
| `Kartta/Komennot.cs` | `lento v3 0\|1\|tila` |
| `Kartta/Symbolimallit.cs` | Symbolit piiloon v3-esityksen ajaksi (speksi 3; vanhalla lennolla `aurinko.Paalla` hoiti tämän) |
| `Scripts/Peli/PeliOhjain.cs`, `.Aloitus.cs` | Varakello v3:lle (`Nappula.LentoV3VaraS` = 26,5 s + 0,75 s), `matkakirja-lento-v3` säilyvien kehitysavainten listaan |
| `Kartta-testit/kaanna.sh`, `Testit/LennonV3KaytavaTestit.cs` | Uusi lähde ja testit |

### Kulku (kytkin päällä)
1. **Odotus** nykyisessä näkymässä: ei `Mustaverho`a, ei `LentoPohja(true)`a, ei usvalevyä, pilviä, lennon aurinkoa eikä
   filmipinoa. Käytävä (`EsilataaLentoV3`) ja reitin maastokysely (32 pistettä, `SampleHeightMostDetailed`) käynnistyvät.
   Kone piirretään kaksi kehystä lähtöpaikassaan (varjostimen esilämmitys) ja piilotetaan leikkaukseen asti.
   Tapahtuma `"kaynnistys"`. Muulla kuin aloituslennolla `Vaihe = Nousu` heti (PeliOhjaimen oma ajastin ei etene).
2. **Leikkaus** (`LennonV3Kaytava.Leikkaa`): vähintään 0,5 s ja käytävä ≥ 96 % + alku 100 % → "valmis"; alku valmis ja
   6 s → "katto"; 10 s → "ehdoton". Loki `MATKAKIRJA lento v3: odotus …` ja `VerkkoOdotus.Kirjaa("lento", "v3-odotus")`.
   Esitys: nappula piiloon, reittikaaret pois, kohteen punainen rengas + korostus + maamerkki (vain kohde), kohdemaan
   saapumislaatat kiireellä (VARTIJA 171, aloituslento), `lahti` (vanha lentoääni, luenta, `AloitaLento`), tapahtuma `"leikkaus"`.
3. **Lento 15,0 s** (`Time.unscaledTime`, ei SaapumisKiireen venytystä): kone `LennonV3.ReitinKohta(KoneenOsuus(t))`,
   korkeus `LennonV3Kaytava.KoneenKorkeus` (3,5 km + maaston lisä, laskussa kohteen liioiteltuun maahan
   `KaupunkiMerkit.PisteenKorkeus − nosto`), kallistus `LennonV3.Kallistus`, elo `TigerMothKone.Aseta`, siipiväli 5 km.
   Kamera `LennonV3.Kamera(t, näkyvä pituus)` → `PalloKierto.Kuvaa(katsepiste, etäisyys, 90° − korkeuskulma,
   suuntima + θ, katseen korkeus)`; katsepiste liukuu 13–15 s 30 % kohti kaupunkia. Vaiheet Nousu 0–5, Matka 5–11,
   Lasku 11–15 s. Saapumisvartija alkaa 11 s. Tapahtumat `"kosketus"` 14,3 s, `"tyhjakaynti"` 14,6 s, `"perilla"` 15 s.
4. **Perillä** ennallaan: aloituslento → `AloituslentoPerilla` (esitys jää kortin alle, `PaataAloituslento` purkaa),
   muu lento → `Paatalento` + `valmis`. Kone deaktivoidaan (`Potkurit` poistuu PallonLevon animaatioista → lepo ennallaan),
   jäljellä oleva käytävä perutaan, nappula näkyviin kohteessa.

### Materiaali
`Resources/Symbolimalli`-varjostin kuten `Symbolimallit.Start` (värit kärkiväreinä TigerMoth.cs:stä) + ääriviivamateriaali
kuten `Symbolimallit.ReunaMateriaali` (`_Reuna 1`, Cull Off, ZWrite 0, renderQueue −1), leveys `_Tila.z` =
`Symbolimallit.ReunaPt` (1,2 pt) / koneen siipiväli pisteinä, `MaterialPropertyBlock` päivitetään vain > 1 %:n muutoksella.
Potkurilevy `Potkurit.Kiekot(kiekkoMateriaali)`. Valo on kartan rinnevalo (Aurinko ei kytkeydy lentotilaan).

### Suorituskyky
Lentosilmukka ei varaa muistia (reitin pituudet kerran, LennonV3:n kanavat indeksillä, ei LINQiä/merkkijonoja kehyksessä;
`V3Aani` on struct). Poikkeus: `kamerareitti paalle` -näytelista kuten vanhassa lennossa. Lepo: koneen juuri on
pois päältä aina lennon ulkopuolella.

## Kytkin
- Komento `lento v3 1` / `lento v3 0` / `lento v3 tila` (Komennot.cs, delegoi `Nappula.LentoV3`; ei herätä palloa).
- `PlayerPrefs "matkakirja-lento-v3"` (oletus **1** = v3; 0 = vanha lento koskematta) ja `Documents/lento-v3.txt`
  ("0"/"1", voittaa PlayerPrefsin; komento kirjoittaa molemmat). Luetaan kerran istunnossa, komento vaihtaa heti →
  voimaan seuraavasta lennosta. `MATKAKIRJA_APPSTORE`-käännöksessä aina v3.
- Säilyy Uusi peli -tyhjennyksessä (`PeliOhjain.SailyvatAsetukset`).
- Simulaattorissa ilman komentoa: `xcrun simctl spawn <UDID> defaults write app.matkakirja.proto3d matkakirja-lento-v3 -int 0` (sovellus kiinni).

## Esilatauskäytävä: katto ja mitat
- Laatat (`LennonV3Kaytava.Laatat`, 60 näytettä koneen reitiltä): pohja ja maasto Z6 ±2, Z7 ±2, Z8 ±1 koko osuudelta,
  Z9 ±1 kun t ≤ 5 s tai t ≥ 13 s; aikajärjestys, alun 5 s ensin; maasto vain layer.jsonin saatavilla olevat.
  Ennen saatavuussuodatusta: **Ateena pohja 110 + maasto 140 (alku 148)**, Wien–Bratislava 172, Lontoo–New York 315
  (tavoite ≤ 400). Speksi arvioi Ateenalle 116 + 108 (~2,2 Mt); maastoa karsii saatavuus, mitattava laitteella.
- Jonot: alku `Esilataaja.Tehtava(Taso.Nakyva, "lento-v3-alku")`, loput `Taso.SeuraavaRuutu` ("lento-v3"),
  kummankin `Esilataus.Etusija = true` (omat paikat, ei odota näkyvän jonon tyhjenemistä). Speksi sanoi SeuraavaRuutu
  koko käytävälle; alku on Nakyva, koska pelaaja odottaa sitä (kysymys 2 alla).
- **Katot:** vähintään 0,5 s; 6 s, jos alun 5 s on valmis; **ehdoton 10 s**. Offline-tilassa puuttuvat laatat
  epäonnistuvat heti ja lasketaan käsitellyiksi (404 = valmis), joten peli ei jumitu. PeliOhjaimen varakello 27,25 s.
- Esilämmitys aloitusnäytössä (v3 päällä, kerran): 18 aloituskohteen (`LennonAikajana.Kaupungit`) alun Z8–Z9
  taustajonoon (`Tausta`, `Taso.Kohdekaupungit`); Ateena 48 laattaa, 18 kohdetta arviolta 600–850 (speksi ~450). Korvaa
  v3:ssa Lontoon avauksen lähialueen (`AvausLahialue`); `EsilataaAloituslahto` (Lontoo + maaston layer.json) jää.
- Maastokysely (`SampleHeightMostDetailed`, 32 pistettä) ei odota leikkausta; lisäkorkeus tulee pehmeästi 1,5 s:ssa.

## Mitä simulaattorissa katsotaan
Komentosarja (`komento.txt`):
```
lento v3 tila
lento v3 1
kamerareitti paalle
valmius auto paalle 20
```
1. Uusi peli → aloitus **Ateenaan** (kylmänä: sovellus poistettu ja asennettu). Katso: ei mustaa kuvaa eikä feidiä,
   valintanäkymä jää elämään odotuksen ajan, kova leikkaus lähikuvaan (Tiger Moth seepiana, ääriviiva, potkurilevy),
   kone Afrikan rannikolta pohjoiseen, Kreeta vasemmalla horisontissa, lasku Ateenaan 14,3 s, 15,0 s → saapumiskortti.
   Lokirivit: `lento v3: käytävä …`, `lento v3: odotus X s (valmis|katto|ehdoton)`, `lento v3: reitin maasto …`,
   `lento v3: perillä … kallistus … kierrokset … kamera enintään … km, katse …°`, kamerareitin raportti (0 HYPPY).
2. Pelissä **lento toiseen kaupunkiin** (esim. Pariisi → Bryssel, Lontoo → New York): sama rakenne, nappula katoaa
   leikkauksessa ja on perillä kohteessa, sen jälkeen normaali saapuminen (kamera-ajo saapumisnäkymään).
3. `lento v3 0` ja sama lento: vanha lento (musta verho, DC-3, satelliittipinta) koskematta → A/B-pari.
4. Lepo lennon jälkeen: `pallo lepo` / kehysmittari — pallo lepää kuten ennen (Potkurit ei pidä hereillä).
5. Kuvat 0 / 2 / 5 / 8 / 11 / 13,5 / 15 s; kone ruudulla, kamera ≤ 20 km, katse −11…−16° (loki).

## Avoimet kysymykset ja TODO
1. **Myös pelin sisäiset lennot** (`Lenna`, PeliOhjaimen kesto 1,5–3 s) muuttuvat 15 s + odotus -mittaisiksi, koska speksin
   A/B-taulukko sanoo "15,0 s kaikilla" ja esimerkkeinä on Pariisi–Bryssel ja Lontoo–New York. Jos v3 halutaan vain
   aloituslennolle, rajaus on yksi ehto `Lenna`ssa. Fablen/omistajan vahvistus.
2. Käytävän alku tasolla **Nakyva** (speksi: SeuraavaRuutu), loput SeuraavaRuutu, molemmat `Etusija`. Hyväksytäänkö?
3. **Kerma (väritaso p060) pois ja rajat 0,35** lennon ajaksi (speksi 3) ei ole tehty: väritason kytkentä kesken
   saapumisvartijan kiireen on riski. Nyt kerma näkyy, ja sen laatat tulevat Cesiumin normaalilla haulla. Nostot
   (UI-merkit) ja nimiöt käyttäytyvät kuten vanhalla lennolla (Nimikerros ja nostojen avautuminen seuraavat `Vaihe`tta);
   symbolimallit piilotetaan.
4. **Ääni:** `LentoAani.Tila` ja käynnistysääni puuttuvat (Pelikoodari). Rajapinta valmiina: `Nappula.LentoV3Tapahtuma`
   ("kaynnistys", "leikkaus", "kosketus", "tyhjakaynti", "perilla") ja `Nappula.V3Aani` (etäisyys, lähestymisnopeus,
   kierrokset, kaasu) joka kehys. Nyt soi vanha lentoääni (`PeliOhjain.Lentoaani`, aloituslennolla leikkauksesta).
5. **UI:** "Kone lähtee…" yli 2 s:n odotuksessa: `Nappula.LentoV3Odotus` (s, −1 = ei odota) Natiivi-UI:lle. Valintanäkymän
   UI:n käytös ilman mustaa verhoa (sulkeutuuko se `AloituslentoAlkoi`ssa siististi) on katsottava simulaattorissa.
6. Ei toteutettu (speksi 3–5, Linssiseppä/Mallinseppä tai myöhempi erä): tasovarjo, pakosavun puhallukset, LOD 600
   kolmiota, kevennetty filmipino ja syväterävyys 0–3 s, etäisyyssumu 150–450 km, SSE 32 lennolle (LiikeLaatat),
   odotuksen kameran ajelehdinta (zoom ≤ 5 %; nyt kamera pysyy), pelin lentolistan kohteiden käytävän ennakointi.
7. Ääriviivavarjostin kasvattaa osia mallin vaakatasossa (suunniteltu ylhäältä katsottaville symboleille); sivukuvassa
   ääriviiva on ohut. Tarkistettava kuvista.
8. Koneen maastokysely `SampleHeightMostDetailed` hakee reitin tarkimmat maastolaatat (32 pistettä): kylmänä lisää
   verkkoa käytävän ulkopuolella. Merireiteillä pieni; vuoristoreiteillä mitattava (kriteeri ≤ 5 Mt).

## Estetyt komennot
Ei yhtään. Xcode-käännöstä, simulaattoria, laitetta, Unity-editoria ja `proto-kaanna.sh`:ta ei ajettu (tehtävän rajaus).
