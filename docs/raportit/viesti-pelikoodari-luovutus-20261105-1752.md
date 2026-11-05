# Pelikoodari: luovutus 5.11.2026 klo 17.52 (konteksti, PT): katseluajo fb9811afd käynnissä L2:lla, omistaja perui koko kierroksen, tilalle 20 pisteen lista

Korvaa -1744:n kohdan 0 ja täydentää sitä; -1744:n muut kohdat pätevät, lue se kokonaan. Proto-kärki `b6dd34bdb` (`fb9811afd` + `tarkastelu.sh`:n odotusraja ympäristömuuttujana, ei vaikuta peliin). Pushattu natiivi-backupiin.

## 0. Ajo
Katselu `fb9811afd`, `vapaa-1/sk-i.txt`, L2 (JU:n vuoro). Kansio `/Users/Shared/Claude/proto-3d/lokit/esikatselu-20261105-174557`, loki `_tyo/pelikoodari/vapaa-1/aja-m.log`. **Tarkista, että se päättyi:** `tail -2 aja-m.log`. Jos L2-rivi JU:lle (`local_b4a7e82a-2522-437f-84ff-813401120931`) ei näy lähetettynä, lähetä se. Jos ajo katkesi, pyydä uusi vuoro JU:lta.

Katso sitten -1744:n kohdan 2 ja kohdan 3.1 asiat: `grep 'eunukki jahtiin' unity.log` (sivu-arvot), eunukit kuvissa, törmäys e11–e20 ja kiinniotto `k01–k08`. Pitkät tulokset Sonnet-ali-agentille (PT).

## 1. OMISTAJAN PÄÄTÖS klo 17.51 (KK:n välittämä, sanoin)
"kannattaisiko ennemmin ajaa vain muutamia pisteitä ja tehdä yleisiä korjauksia niiden perusteella ja sen jälkeen tehdä uudestaan vain muutamia pisteitä. Minusta on turhaa ajaa niin hirveän isoa määrää."

**Peruttu:** koko kierros, joka neljäs ja yöajo. Älä aja `tarkastelu.sh`:ää koko alueelle. JU:lle kerrottu.

**Tilalle (KK):** kiinteä lista, noin 20 pistettä neljästä suunnasta, sama joka ajossa, `tarkastelu_kuvat.sh`:llä: 8 havainnekohtaa, kuja, aukio, portti, muuri sekä tunnetut viat (vihreät boordit 4.11. 11.22, tunnettu puuttuva pinta).

**Kulku:** ajo tavallisella vuorolla → yhteenveto ja pahimmat KK:lle (`local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe`) → KK ryhmittelee → yksi yleinen korjaus → sama lista uudelleen. Oma katselu jatkuu rinnalla.

**Mittari, omistajan sanat:** 17.4x "näkyvätkö elementit oikein, eikä seiniä puutu, eikä mikään värise"; 4.11. 11.22 "mitkä asiat väreilevät kuvassa (nyt esim. vihreät boordit monessa paikka)", "mitkä seinät tai katot puuttuvat rakennuksista". Suunnitelma `Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-juoksupeli-tarkastelutila.md`; todistukset 1 (vihreät boordit listan kärjessä) ja 2 (tunnettu puuttuva pinta löytyy) kerrotaan KK:lle.

## 2. Listan teko (seuraava työ, ei aloitettu)
- **Muoto** `tyokalut/koekuvat-*.txt`: `nimi x y z yaw pitch [fov …]`, y maan yläpuolella, pitch alas +. Kaksi riviä esimerkiksi `koekuvat-ovimalli-yihe.txt`.
- **Paikat:** havainnekohdat ja `Laatat` ovat `JuoksuTarkastelu.cs`:n riveillä 377–389 (`Havainne`, `Laatat`). Kameran paikka lasketaan `Pisteet`-funktiossa (rivi 398: `x − sin(suunta) × taakse`, `z − cos(suunta) × taakse`). Kuja, aukio, portti ja muuri: valitse `JuoksuKierros.json`:ista ja kartalta.
- **Vihreät boordit:** en etsinyt paikkaa. Lähde: omistajan 4.11. sanat ja vanhat kierrokset `lokit/tarkastelu-f9c80ae5a-125935/yhteenveto.md` (347 kuvaa, väreilyn pahimmat).
- **Avoin:** `tarkastelu_kuvat.sh` kirjoittaa `mittaukset.jsonl`:n, mutta en tarkistanut, mittaako se väreilyn ja tekeekö `tarkastelu_yhteenveto.py` siitä yhteenvedon. Kierroskoodin (`JuoksuTarkastelu`, `Pisteet`) kiinteä lista voi olla kevyempi tapa: `tarkastelu kierros` lukee listan tiedostosta. Katso tämä ensin ja valitse kevein.

## 3. Muutokset tilaan
- `scratchpad/kierros.sh` ei ole enää käytössä.
- `-1744:n` kohdan 3 järjestyksessä lista tulee kohdan 1 jälkeen, omistajan uutena tilauksena.
- LAV kuittasi e14:n laatan jonoonsa (`muuri/KORJAUS.md`), juuri selvittämättä.
- KK kertoo omistajalle kierroksen jaon perumisen; minulla ei ole siinä toimia.

## OPIT
Arvio kesto ennen kuin isoa ajoa valmistellaan ja kerro se heti: 6 400 kuvan koko paljastui vasta, kun olin laskenut pisteet.
