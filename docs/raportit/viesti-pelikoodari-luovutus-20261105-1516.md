# Pelikoodari: luovutus 5.11.2026 klo 15.16: avauksen ensikäännös korjattu; seuraavaksi katselu JU:n vuorolla

Korvaa -1413:n tilan. Sen kohdan 2 "ei nähty" -lista ja kohdan 3 kohdat 3–4 pätevät, kuten -1337:n kohta 3 (avoimet päätökset) ja -1225:n kohdat 1, 2 ja 5. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `4c4d6f297` (pushattu natiivi-backupiin). Juoksu-testit 190/190, unity-tarkistus 0 virhettä. Ei iPad-ajoja, ei junaan mitään. KK 15.06: älä odota joutilaana; tee vuoroa odottaessa koodityötä, joka ei vaadi ajoa.

## 1. Tehty: `4c4d6f297`, peliin ei vielä katsottu
**Syy e11–e12:lle (seinä ilman keisaria):** vapaa reitti käänsi keisarin ovelta itsestään etelään (`TyohuoneKaanto = -1`, lisätty 6e87fe375). Avauksen kamera ja opetus odottavat, että hän pysähtyy vastaseinälle ja pelaaja kääntää hänet pohjoiseen (`JuoksuAvaus.SeinaKaanto`). Keisari juoksi siis kameran ohi väärään suuntaan: etäisyys 1,3 m → 24,5 m (t 30,6–35,3), ja kurkistuskuva katsoi ovea. Tämä rikkoi omistajan 2.11. 13.38 linjausta "ei automaattisia käännöksiä".
**Korjaus:**
- `TyohuoneKaanto`, `alkuKaanto` ja `AlkuKaannosta` pois. Oven takainen kappale päättyy seinälle, ja sivut luetaan kartalta. Vanha testi `LahtoKaantyyKujalleItsestaanKerran` poistettu, uusi `OvestaVastaseinalleEiKaannyItsestaan` ajaa oikealla kartalla ja pelin kehyksessä: pysähtyy s 9,5:een, 0 käännöstä, oikea auki, pelaajan käännöksellä pohjoiseen.
- Kamera: `vapaaOhjaa` ei ota ohjausta, kun `AvausSeinaYaw` on voimassa, ja vapaan kameran jälki alustetaan kujan suuntaan seinällä odottaessa. Muuten kamera olisi kääntynyt oveen päin ja katsonut seinää.
- QA-botti ei askella vapaassa maailmassa avauksen aikana (`JuoksupeliNakyma`, `Botti && !VapaaJuoksu`), koska se kääntäisi keisarin seinällä heti.
Huom: oma ensiväitteeni "syy on botti" oli väärä, ja oikaisin sen. Keisari kääntyi myös ilman bottia.

## 2. Seuraavaksi, järjestyksessä
1. **Vuoro on pyydetty JU:lta** rungolle `4c4d6f297`, jonossa kahden Pariisi-ajon jälkeen. Aja vasta "ESIKATSELU NYT" -viestin jälkeen, zsh:lla:
   `zsh tyokalut/esikatselu.sh 4c4d6f297 /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/sk-e.txt > /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/aja-e.log 2>&1` (linja 1: `PROTO_LINJA=1` eteen). Aja taustalla Monitorilla ja kerro JU:lle rivillä, kun valmis.
   `sk-e.txt`: ei bottia, opetus nollattu ja päällä, 18 s:n jälkeen kuvat a01–a24 sekunnin välein (avauksen loppu ja seinä), sitten `kaanna 1 seina` ja botti siemenellä 7, kuvat e01–e60 2 s välein.
2. **Katso täysikokoisina a-kuvat ja käännös (Raamattu 9.5).** Tarkista:
   - keisari kuvassa koko avauksen lopun, kurkistuskuva näyttää eunukin ja keisarin
   - laskenta 3-2-1 ja kamera kujaa pitkin
   - opetuksen oikea pyyhkäisy näkyy seinällä; ohje hidastaa peliä, joten a-kuvien ajat venyvät
   - käännöksen jälkeen sekoitus vapaaseen kameraan (1,2 s) ilman heilahdusta
   - takaa-ajaja ei ehdi kiinni seinällä liian nopeasti opetuksen aikana
   Sijainti lokista: `kameraväli t`, `paikka Puyi pohja`, `seinan edessa`.
3. Samasta ajosta -1413:n "ei nähty": sivulta tuleva eunukki, ilmestyminen, esineen rikkoutuminen, "Taso läpi!", kynnysviesti. Jos ei tule, pakota kohtaus tai vaihda siementä.
4. **Rivi ja kuvat KK:lle, kun taso 1 on näytettävässä kunnossa** (KK 15.06 pyysi kuvat), mukaan -1337 kohdan 3 päätökset. Täysikokoiset itse katsottuina, ei selitekaistaa.
5. Yhden oven kamerakoe (D) vasta tason jälkeen. Täytteet 绥寿殿, 益寿斋, 南库, 军机处: LAV, pyyntö (-1050 kohta 2).

## 3. Avoimet pienet
- **Liikevahti punainen ennen junaa:** `tyokalut/liikevahti.py`: `JuoksuKulkuKamera.cs` 1 > 0 ja `JuoksuV4Maailma.cs` 2 > 0. Ei tullut tästä muutoksesta (uusia Lerp-rivejä 0), vaan aiemmasta vapaan maailman kamerakoodista. Selvitä, onko liikepohja vai `// liikepoikkeus: syy` oikea, kun kamera on hyväksytty. Voi tehdä vuoroa odottaessa.
- **`tyokalut/tarkista.sh` muuttaa tyylikirjan tiedostoja** (`Tyylikirja.uss`, `Tyylikirja.cs`, `tyylikirja/tyylikirja.json`, generoidaan mainista). Älä committaa niitä tähän haaraan: `git checkout --` kolmelle tiedostolle, kuten nyt tein.
- **Poikkeus `ArgumentOutOfRangeException` on selvitetty:** Unity-editorin oma QuickSearch-indeksointi käynnistyksessä (`SearchDatabase.cs:354`), ei peli. Ei korjattavaa.
- Botti kiersi 60 s yhtä korttelia (-1413): botin arvonta, ei korjattu.

## OPIT
Ennen kuin syytät testityökalua, lue, mitä peli tekee ilman sitä: botin osuus näytti selitykseltä, mutta reitin oma pakotettu käännös löytyi vasta koodista. Uusi testi löysi kaksi omaa virhettä ennen kuin mitään ajettiin: kartta kuljetetaan pelin kehyksessä (lähtö ja kierto), muuten kaikki on seinää, ja takaa-ajaja pidetään avauksessa pidossa kuten pelissä. Koordinaatit: loki = Unity, reitti = (Unity x, −Unity z), kartta = pohja; `paikka Puyi pohja` antaa parin.
