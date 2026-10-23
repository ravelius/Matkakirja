# B Tekotavat: koodi (natiivi)

*(Pelikoodari 23.10.2026, Raamattu 4.21 STUDIOJAKO (omistaja 21.10.2026 klo 18.02). Käytännön tekotapa pelissä ajettavalle
koodille: pelilogiikka, näkymät, maailmat, botti ja kytkennät natiivissa pelissä (proto-git, Unity 6, C#). Laatutaso: A Suunta;
tuotetyypin kooste: C Reseptit; vaiheet, portit ja luvat vain D Tuotannonohjauksessa. Kooste juna 201–210:n eristä ja
luovutusten opeista; uusia sääntöjä ei ole. Raamattu voittaa ristiriidassa: 2.70 ja 2.201 yhteiset säännöt, 4.1 UI-POHJAT,
4.24 kamera, 6.15 muisti, 9.5 oma tarkistus.)*

## 1. Työkalut ja paikat

| Työkalu | Missä | Mihin |
|---|---|---|
| Proto-git | `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (peili `natiivi-backup`) | kaikki natiivin koodi; erä omaan worktreehen `wt/proto-<rooli>-<aihe>` |
| Puhdas logiikka | `Assets/Matkakirja/Peli/` (asmdef `Matkakirja.Peli`, `noEngineReferences: true`) | säännöt, reitit, botit, pisteet: ei UnityEngineä, testattavissa ilman editoria |
| Unity-osa | `Assets/Matkakirja/Scripts/<ala>/`, näkymät `UI/Pelit/`, `UI/Linssit/` | maailmat, mallit, kamera, ääni, ruudun osat |
| Logiikan testit | `Peli-testit/kaanna.sh [nimen osa]` (Roslyn + dotnet, C# 9) | `Peli-testit/Testit/<Luokka>Testit.cs` |
| Unity-testit | `Linssit-testit/` (esim. `AanipohjaTestit`, `JuoksuHaivytysTestit`) | Unity-riippuvaiset säännöt (äänipohja, häivytys) |
| Käännöstarkistus | `zsh tyokalut/tarkista.sh` | Unity-käännös + pohja-, valo-, liike-, kamera- ja kielivahti, kameratesti; "virheitä yhteensä 0" |
| QA-komennot | `Documents/ui-komento.txt` (`ui …`), `peli-komento.txt` (`uusi-peli 5 amsterdam`) | jokaiselle osalle oma komento: `ui juoksupeli botti 1`, `ui mylly peli vaikea` |
| Todistusajo | `tyokalut/todistusajo/todistusajo.sh` skenaariolla | kuvat ja loki simulta (vain D:n sallimissa tapauksissa) |
| Mittarit | pelin oma mittari (esim. `JuoksuMittari`, `ui juoksupeli mittari`), `tyokalut/nykaysvahti.py` | nykäykset, piilossa-jaksot, latausajat lokiriveinä |
| Ämpäri | `https://media.matkakirja.app/<polku>`; vienti `proto-3d/_valmiit/<nimi>-vienti-<pvm>/` | mallit ja äänet luetaan ajossa ämpäristä, ei repoon |

## 2. Vaiheet käytännössä

1. **Lähtötieto.** Lue erä, oma luovutus ja `git log --all --since` proto-gitistä: osa työstä voi olla jo toisen haarassa.
   Codexin toimitukset voivat olla T7:llä ennen ilmoitusta (`output/<aihe>-*`): katso ennen paikkamerkkityötä.
2. **Worktree erälle.** `git worktree add -b <rooli>/<aihe>-<juna> /Users/Shared/Claude/wt/proto-<rooli>-<aihe> <pohja>`; pohja on
   avoimen junan haara tai `master`. Yksi erä = yksi haara; commit pieninä paloina, kun suunta voi vielä kääntyä.
3. **Säännöt ensin `Peli/`-kansioon testeineen,** sitten Unity-osa. Pelin tila on puhtaassa oliossa (esim. `JuoksuV4Saanto`),
   näkymä vain lukee sen ja piirtää. Satunnaisuus siemenestä (`Satunnainen`), jotta botti, testi ja laite toistavat saman.
4. **Mallit ja tekstit datasta.** Codexin/Lavastajan mallit ladataan ämpäristä (`JuoksuHahmot.Hae` + `DioraamaGlb.Lue` taustasäikeessä),
   paikkamerkki ensin ja malli sen lapseksi latautuessaan (`MalliMerkkiin`). Pelin tekstit `tekstit.fi.json`-avaimista,
   UI:n tekstit `ui.fi.json`:sta (kielivahti). Väri, mitat ja määrät taulukkoina, joita voi vaihtaa ilman logiikkaa.
5. **Yhteiset osat.** Kamera `KameraKirjoittaja`/Kamerajohtajan kautta (kameravahti), uusi `AudioSource` aina `AaniPohja`n kautta
   (`AanipohjaTestit` punaa rungon), UI pohjilta (B UI), liike liikepohjalta (liikevahti), valo valopohjalta (valovahti).
   Puuttuva yhteinen osa tehdään yhteiseksi, ei yhden pelin omaksi.
6. **QA-komento ja botti.** Jokaiselle uudelle osalle `ui`-komento, jolla tilan saa näkyviin ilman pelaamista; videopeleissä botti
   pelaa reitin läpi (`JuoksuBotti`, `botti-osat.sh`) ja mittari kirjoittaa poikkeamat lokiin omina riveinään.
7. **Tarkistus ennen luovutusta.** `kaanna.sh` 0 fail, `tarkista.sh` 0 virhettä; muutos katsottu pelistä tai botin lokista;
   vika toistettu ennen korjausta (testi, joka punaa ilman korjausta).
8. **Luovutus.** Haara peiliin (`git push natiivi-backup HEAD:refs/heads/peili/proto/<rooli>/<aihe>`), ämpäripaketti Julkaisijalle
   (`vie-paketti.sh --kuiva` läpi), Natiiviselle haara ja SHA junaan, PT:lle valmis-rivi. Ominaisuus, jonka pelaaja näkee vasta
   UI:n kautta, menee junaan samassa erässä UI:n kanssa.

## 3. Budjetit (iPad Pro 13 ja iPhone)

Täydet mittarit ja kierrosten luvut: B testaus luku 3.3. Koodin kannalta:

- **Ruutu:** 60 fps; GPU ≤ 14 ms raskaassa kohdassa; yli 20 ms:n ruutu kameran liikkeessä on nykäys (nykäysvahti).
- **Ei työtä ruudussa, joka kasvaa maailman mukana:** `GetComponentsInChildren` joka hierarkiamuutoksella ja ~20 000 `Instantiate`a
  yhdessä ruudussa jäädyttivät pelin sekunneiksi (20.10.). Rakenna erissä, lataa taustasäikeessä, yhdistä verkot materiaaleittain.
- **Lämmitys latauskuvan alla:** varjostimet ja silmukat lämpimiksi ennen kuin latauskuva poistuu; `WarmupAllShaders` kaatui
  laitteella (juna 209), joten lämmitä vain käytetyt.
- **Muisti:** ei kiinteää rajaa (6.15); laitteella ei jetsameja ja vapaata ≥ 0,5 Gt. Tekstuurit ≤ 1024 px kerättäville ja esineille,
  glb:n kuvat tyhjennetään rakennuksen jälkeen (`g.Kuvat.Clear()`).
- **Lataa vain tarvittava:** esim. paperilohikäärmeet vain, kun reitillä voi olla niitä (taso 1 ilman).

## 4. Tyypilliset virheet

- **Väärä mittauskohta:** "ratkaistu"-luku voi olla eri siemenestä tai kohdasta. Varmista siemen ja sekunti ennen ilmoitusta.
- **Korjaus suoraan kameraan:** näkyvyysnosto suoraan kameran paikkaan nykäisi 0,12–0,27 m (66533c06e, peruttu); liike aina
  tavoitteeseen jousella tai pidolla.
- **Rajan ylitys osien välillä:** reittiosan vaihdossa kertynyt siirtymä (profiilin sivuliuku) siirsi hahmoa 3 m/ruutu; testaa
  osien saumat erikseen.
- **Pelkkä törmäysmalli näkyvyydessä:** peitto mitataan visuaalisen mallin seinillä (`DroneNostoTestit`), ei törmäysproxylla.
- **Katon renderer piiloon, collider jää:** näkymätön lattia estää putoamisen; piilota molemmat (Codexin yläreitti v2 -ohje).
- **Oma `AudioSource`, oma kamera-ajo tai oma liike** pohjien ohi: vahdit ja `AanipohjaTestit` hylkäävät.
- **JSON uudelleenkirjoitettuna:** `json.dumps` muuttaa muotoilun; lisää rivi tekstinä. Tiedostomuokkaus `.tmp` + `os.replace`.
- **Merge kaataa toisen funktiot:** `--theirs` pudotti gallerian omat funktiot; yhdistä toisen osat käsin omaan versioon.
- **`kaanna.sh`:n pino ilman rivejä:** aja kopio `-debug:portable`-lipulla.

## 5. Opit

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui tässä.

- **23.10.2026, Codexin lisäosa korvattuun maailmaan.** Yläreitti v2 tehtiin v4-maailmaan, jonka sokkelo korvasi; kytkentä jäi
  odottamaan tason 2 paluuta. Muuttuu: tarkista ennen tilausta ja ennen kytkentää, mikä maailma on pelissä (vaihe 1).
- **20.10.2026, jäätymiset.** Ks. luku 3; muuttui: hierarkiaa ei käydä läpi ruudussa, rakennus erissä.
- **19.10.2026, suunnan kääntyminen.** Omistajan suunta voi kääntyä 15 minuutin välein; pienet commitit eikä käännöksiä ennen kuin
  suunta pysyy (vaihe 2).
