# Pelikoodari: luovutus 5.11.2026 klo 18.37 (konteksti 26 %): sininen laikku ja turkoosit laatikot selvitetty, kaiteet kesken

Täydentää -1822:ta, jonka kohta 2 on kirjattu KK:n järjestyksessä ja päivitetty (lue se kokonaan). -1744 pätee edelleen. Proto `pelikoodari/tarkastelu-219`, kärki `f25ccb55a`, ei muutoksia tässä sessiossa. Ei ajoa käynnissä, ei junaan.

## 1. Tila
- **Taso 1 on pääasia** (-1744 kohta 3); nämä pieninä sen rinnalla.
- **Sininen laikku:** ei syvyyssäännön sivuvaikutus; `f25ccb55a` saa jäädä. Vietiin LAV:lle.
- **Turkoosit laatikot ja U-viivat:** `V4_konsoli` ilman kantta ja takaseinää, 2 cm upotus. Vietiin LAV:lle. LAV 18.3x: molemmat jonossa (`muuri/KORJAUS.md`) lattia17:n jälkeen, versiota ei luvattu, ei vielä tarkistettu mallista.
- **KK:lle kerrottu** nämä 18.3x. Omistajalle ei sanota, että seinät ovat kunnossa, ennen muuri- ja porttipisteiden ajoa.
- **Ajo:** ei vielä pyydetty JU:lta. KK 18.2x: 9 kuvaa (`boordi-1`, `boordi-2`, `boordi-3`, `havainne-02`, `havainne-04`, `muuri`, `portti`, `vareily-4`, `laatta-m15`), jos kaiteiden korjaus on samassa ajossa; muuten 7 ilman kahta viimeistä. Rivi "mitä tämä ratkaisee" pyyntöön (10.5).

## 2. Seuraavaksi
1. **Marmorikaiteet, kesken.** Kuvat `lokit/tarkastelukuvat-c6670f9df-180215/vareily-4.png` ja `laatta-m15.png`. Tumma sininen viiva on terassin juuressa korkeudella noin 0,3 m (kuvapiste (1700, 1015) `laatta-m15`:ssa). Mitattu vain `g-jalusta-lod0.glb`:stä (`kielletty-rakennukset-v118`, siirto -0,308; -0,845): kaikki 102 028 kolmiota ovat `V4_marmori`:a, ja kuudessa tutkitussa kuvapisteessä säde osuu terassiin vain kerran. **Joten viiva ei ole terassin omien kerrosten syvyystaistelu.** Taustan palaa (`V4_lattia` 0,32, `V4_kivireunus` 0,36) ei ole vielä otettu mukaan, ja se on seuraava epäilty, koska viiva on samalla korkeudella. Raidoitusta ei selvitetty: katso täysikokoinen rajaus, ja mallin `TEXCOORD`/valokuva, ennen kuin arvaat. Kuvapisteet on luettu silmällä, joten tee ensin materiaalikartta ja vertaa pelikuvaan.
2. **Auki `boordi-2`:ssa:** tiedoston seinä z = 277,35 ulottuu ainakin korkeudelle 5,78 m (`V4_red` ja `V4_palatsi_friisi` täsmälleen samassa tasossa), mutta pelikuvassa sen yläreuna on noin 5,7 m:ssä, ja sen yli näkyy kaukaisen seinän takapuoli. Materiaalikartta `kartta-boordi-2.png` ei täsmää pelikuvaan tältä seinältä. Syy tuntematon.
3. **Yksi ajo** kohdan 1 mukaan JU:n vuorolla, kun kaiteet on selvitetty.
4. **Massassa, `SarjatPeittoon` ja sali:** tason 1 osaan C (-1822 kohta 2.4). Varmista, puuttuuko juuri muuri.

## 3. Työkalut (scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/c09a3693-f682-4093-a1f5-08ee552297ac/scratchpad/`)
- `kartta2.py`: materiaalikartta ilman syvyyssääntöjä; vertaa pelikuvaan ennen päätelmiä. `kaide.py`: säteet kuvapisteiden läpi. `konsoli.py`: laatikkosaarekkeet ja väli seinään.
- `glb2.py` lukee solmujen kiertojen hierarkian; `glb.py` (edellisen session scratchpad `7e7d497b…/scratchpad`) ei lue, ja se sijoittaa avoimet huoneet väärin. Taustan palat `…/7e7d497b…/scratchpad/data`.
- Aja `python3 <skripti>` ilman `-I`:tä (numpy on käyttäjän sijainnissa), skriptit eri kansiossa kuin ladatut tiedostot. Kuvapisteet ovat kuvan 2000 × 1500 -näytössä.
- Osa kansioista: `kielletty-rakennukset-v118/`, `avoimet-v52/`, `osamallit791-v10/sijoitus.json`; vakiot `JuoksuSokkeloMaailma.Palatsi.cs` rivillä 68 ja eteenpäin.

## OPIT
- Tarkista oma mittari kuvaa vasten ennen päätelmää: ensimmäinen materiaalikartta ei täsmännyt, koska `glb.py` ohitti solmujen kierrot. Sama sijainti olisi antanut oikean materiaalin väärästä syystä.
- Kerro, mikä on laskettu ja mikä nähty: kannen näkyminen pelaajalle on laskettu kameran vakioista, ei nähty pelistä.
- Säde ilman syvyyssääntöjä ratkaisee sivuvaikutuskysymyksen ilman Mac-ajoa, jos kartta täsmää kuvaan.
