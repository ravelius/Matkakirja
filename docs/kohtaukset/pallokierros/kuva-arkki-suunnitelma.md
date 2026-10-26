# Pallokierros: kuva-arkin suunnitelma

Linjaus: LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA (omistaja 9.10.2026), kohta 4. Pelistä otetaan kuva jokaisesta tärkeästä hetkestä ja nopeimmista siirtymistä. Arvioija katsoo vain tallennettuja kuvia ja nimeää kolme suurinta virhettä aikaleimoineen. Virheet korjataan paikallisesti, ja kuvat otetaan uudelleen. Tämä on sallittu poikkeus 7.10. kevyestä testauksesta näissä kohtauksissa.

Skenaariot (valmiit, ajamatta):
- `proto-3d/tyokalut/linssiseppa-ajot/sk-kohtaus-pariisi.txt`: 37 kuvaa, noin 7 min
- `proto-3d/tyokalut/linssiseppa-ajot/sk-kohtaus-tukholma.txt`: 56 kuvaa, noin 13 min

## 1. Mitkä hetket kuvataan ja miksi

| Hetki | Kuvia | Mistä tunnistetaan (oleta-rivi) | Mitä arvioija katsoo |
|---|---|---|---|
| Avauksen alku, 8 s, 16 s (Tukholma myös 28 s) | 3–4 | `opas: esitys avaus soi` + odota | Näkyvätkö muistettava 1 (saaret ja salmet / Seine ja saaret) ja 1. kohde alakolmanneksessa? Liikkuuko kamera vielä 28 s:n kohdalla (Tukholma)? |
| Suora lasku 1. kohteeseen 25 / 50 / 80 % | 3 | `opas: esitys: kaupunkikierros` + 6 / 12 / 19 s | Pehmeä lasku: ei sumeita laattoja, ei kallistumista, kohde koko ajan kuvassa |
| Jokainen saapuminen | 14 / 8 | `saapui <kohde>` | Onko kohde kehyksessä ja tunnistettava? Onko korostus syttymässä? Onko kerrottu kohde se, joka näkyy? (vertaa kohtauslistan kertojasarakkeeseen) |
| Jokainen pysähdys + 3 s | 14 / 8 | `saapui <kohde>` + 3 s | Onko kaari alkanut pehmeästi? Ei nykäystä saapumisen jälkeen? Esittelykorkeus: näkyykö rakennus kolmiulotteisena eikä ylhäältä litteänä? |
| Pitkän pysähdyksen loppu (yli 25 s) sekä Notre-Damen esittelyn loppu | 6 / 3 | `lähtö valmisteilla <seuraava>` | Matalin esittelykorkeus: onko silmä rakennuksen puolivälin ja hieman sen yläpuolen välissä (0,5–0,7 × H, liikesaannot.md kohta 3b)? Leijuuko pallo paikallaan? (tavoite: kaari kestää koko pysähdyksen) |
| Tavallisen lennon puoliväli | 11 / 5 | `opas: lento <kohde>` + puolet mallin kestosta | Lentokorkeus, laatat, kääntö: näkyykö reitti järkevänä? |
| **Nopeimmat lennot 25 / 50 / 75 %** | 3 / 6 | `opas: lento <kohde>` + 4,5 / 9 / 13,5 s | Liike-epäterävyys, sumeat laatat, kuvan "syöksy". Onko kova vauhti perusteltu tehokeino? |
| Kierroksen loppu | 1 | viimeinen `saapui` + 18 s | Mitä kuvassa on, kun kertoja vaikenee? (loppukohtaus puuttuu) |

Pakolliset nopeimmat siirtymät (mallin arvot, ks. kohtauslistat):
- **Pariisi**:
  - Champs-Élysées → Sacré-Cœur, 3 186 m / 18 s, kuvan nopeus arviolta 1,14 rad/s (kuvat p32–p34)
  - Concorde → Eiffel-torni, 2 121 m / 18 s, 0,77 rad/s (p20–p22)
  - Eiffel-torni → Riemukaari, 1 722 m / 23,4 s, 0,49 rad/s (p25)
- **Esittelykorkeuden laskeutumiset** (omistaja TF 169):
  - Notre-Dame: saapuminen p07, +3 s p08, esittelyn loppu ja matalin piste p09
  - Concorde: saapuminen p17, +3 s p18, matalin piste p19
- **Tukholma**:
  - Skansen → Katarinan kirkko, 1 538 m / 18 s, 0,56 rad/s (t51–t53)
  - Kaupungintalo → Valtiopäivätalo, 725 m / 23,4 s (t29)
  - avauksen suora lasku (t05–t07)

## 2. Ajo (vasta simuvuoron jälkeen, ei tässä erässä)

1. Pyydä vuoro Julkaisijalta ja odota viestiä SIMULAATTORI NYT. Käytä vain luvan saaneen laitteen UDID:tä.
2. Aja käännös, jossa nykyinen kierros on (juna 170 tai uudempi), komennolla `todistusajo.sh --era kohtaus-pariisi --udid <UDID> --app <polku.app> --sha <SHA> --skenaario …/sk-kohtaus-pariisi.txt --laite ipad`. Tukholma vastaavasti.
3. Tulokset tulevat kansioon `proto-3d/lokit/todistus-kohtaus-<kaupunki>-<aika>/`:
   - `kuva-arkki.png` ja `kuvat/`
   - `TODISTUS.md`
   - konsolin loki
4. Kertojan ja kameran aikajana luetaan lokista:
   - `opas: lento <kohde> <m> m, kesto <s>`
   - `siltalause …`
   - `historiaosio … lennolle`
   - `saapui …`
   - `Puhuu → Lentaa`

   Aikajana verrataan kohtauslistan malliin.

## 3. Arviointi

1. Arvioija avaa vain `kuva-arkki.png`:n ja `kuvat/`-kansion. Kuvan selitteessä on aikaleima tapahtumasta (esim. "t = lähtö + 9,0 s").
2. Arvioija nimeää kolme suurinta virhettä muodossa "kuva p21 (Concorde → Eiffel, lähtö + 9 s): …".
3. Korjaus tehdään paikallisesti liikesaantojen tavoitearvoilla. Sen jälkeen sama skenaario ajetaan uudelleen, ja kuvapari kirjataan.
4. Arvio kirjoitetaan tiedostoon `docs/kohtaukset/pallokierros/arvio-<pvm>-<kaupunki>.md` (linjauksen kohta 5).

## 4. Tunnetut rajoitukset

- **Välikuvien hetket on laskettu mallista.** Esimerkiksi lennon puoliväli on 11,7 s, kun malli antaa 23,4 s. Oikea kesto lukee lokissa.
- **Laattaodotus voi siirtää hetkiä.** Lähtö voi odottaa laattoja 0–5 s, ja silloin "puoliväli"-kuva osuu myöhemmin.
- **Lyhyet pysähdykset.** Skenaarion oleta-rivit etsivät lokista kaupunkitila-komennon jälkeen. Jos pysähdys on hyvin lyhyt (Vasa noin 5 s), lähtö voi tapahtua jo kuvan otossa, ja silloin lennon välikuva viivästyy 1–2 s.
- **Gamla stan ja Stortorget** ovat samassa paikassa. Skenaario lisää Gamla stanin saapumisen jälkeen merkkirivin `linssi opas katse tila`. Rivi ei muuta mitään, mutta seuraava oleta etsii siitä eteenpäin. Jos worker antaa järjestyksen Stortorget → Gamla stan, vaihda nimet riveillä t14–t17.
- **Pariisin kierros on 8 kohdetta.** Jos kierros laajenee, skenaario tehdään uudelleen (`skenaario.py` agentin scratchpadissa, tai käsin samalla kaavalla).
- **Kuvissa ei ole kellonaikaa.** Ajotyökalu ei kirjaa kuvan aikaleimaa tiedostoon `kuvat.tsv`. Ehdotus Pelikoodarille tai työkalun omistajalle: kuva-rivi kirjaa ajan (`date +%T`) ja edellisen oleta-osuman, jolloin arvio voi käyttää oikeita aikaleimoja eikä mallin aikaa.
- **Ääntä ei arvioida kuvista.** Kertojan ja kameran yhteensopivuus todennetaan lokista ja kohtauslistan aikajanasta.
