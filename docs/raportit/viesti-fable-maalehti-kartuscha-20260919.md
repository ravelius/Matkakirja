# Opus 2 → Fable: Maalehden infotaulu kartuschaan

19.9.2026 klo 23.45. Haara `opus2-maalehti-kartuscha`, pohjana
`origin/claude/bold-ride-vow4ki-v1968`. Ei versionostoa eikä PR:ää.
Raamatun osio: MAALEHDEN INFOTAULU (VASEN ALAKULMA).

## Mitä tehtiin (kohdat 1–5)

1. **Kartuscha.**
   - Avattu infotaulu piirretään paperikartuschaan: läpikuultava paperi
     `rgba(247,239,219,.94)`, ohut reunaviiva ja sisäinen hiusviiva.
   - Leveys on kiinteä 40 % ruudusta. Alle 700 px:n ruudulla 40 % ei riitä
     luettavaan riviin (390 px:ssä 156 px), joten siellä kartuscha on
     ruudun levyinen marginaalien sisällä.
   - Järjestys ylhäältä alas:
     1. masthead (RANSKA, France · tasavalta v. 1873)
     2. 1873-lohko
     3. nyt-rivit ja kielet
     4. kategoriat
   - Kaluste on edelleen ankkuroitu vasempaan alakulmaan, joten
     kartuscha kasvaa ylöspäin.
2. **Kategoriat.**
   - Ranskan valikossa on nyt seitsemän erillistä merkkiä: Historia, Ruoka,
     Keksinnöt, Luonto, Urheilu, Arki, Menovinkit.
   - Datassa muuttuivat vain näytettävät nimet: "Ruokaa ja tapoja" →
     "Ruoka" ja "Arki ja tavat" → "Arki".
   - Duplikaatti poistettiin valikosta säännöllä: kun maalla on `arki`,
     `tavat`-sivulla ei ole omaa merkkiä (`maanAiheet`).
   - Tavat-sivu jäi lehteen koskemattomana: id, nostot, tehtävä ja
     sivujärjestys ovat ennallaan. Sähkelinkit ja
     `maalehtinostot-fra.js`:n `sivu: 'tavat'` -rivi eivät siis muutu.
   - Merkit ovat pisteviivalla alleviivattuja, kuten pelin linkit.
     Valittu merkki saa aiheen värisen yhtenäisen viivan.
   - Välipiste-erottimet poistuivat, samoin kahden koko ruudun levyisen
     rivin fonttisovitus (`sovitaOtsikot`, `otsikkoRivit`), koska merkit
     kietoutuvat kiinteään leveyteen.
3. **Tunnusluvut.**
   - 1873-lohkossa on vain rivi "Valtiomuoto 1873 · tasavalta", isommalla
     fontilla.
   - Vuoden 1873 väkilukua ja pääkaupunkia ei ole datassa
     (`MAATIEDOT`/`FOKUS_MAANIMET`), joten ne jätettiin pois eikä niitä
     keksitty. Jos haluat ne, ne tarvitsevat lähteytetyn datakentän.
   - Nykyluvut näkyvät pienempinä "Nyt"-otsikon alla.
   - Sijoitukset (23./195) näkyvät vasta, kun nykylukuja napautetaan
     (osumatestin kautta), ja uusi napautus piilottaa ne.
   - Kielet ja tervehdykset säilyivät ennallaan.
4. **Liiku.**
   - Nappi on piilossa, kun infotaulu on auki
     (`body.infotaulu-auki`, samoin kuin vanhassa maataulu-säännössä).
   - Kiinni ollessa nappi on alhaalla keskellä kuten ennen, ja väistö
     `--liiku-pohja` pysyy.
   - Pulun oikea alakulma pysyy tyhjänä.
5. **Pienennetty muoto** on ennallaan. Alariville tuli vain lyhyt
   pisteviiva ja väkänen (`.maapaneeli-vihje`), ja väkänen kääntyy auki
   ollessa.

## Nimiötörmäykset: ennen ja jälkeen

Mittari on scratch-skripti savuke-maapaneelin valjailla. Se laskee
nostokerroksen nimiö- ja ikonilaatikot (`ladoHeti().nostot.laatikot`),
jotka leikkaavat infotaulun tekstiä. Mittaus tehtiin Chromiumilla
saapumisnäkymässä infotaulu auki. Kaupunkien nimet eivät ole näissä
laatikoissa, joten niitä ei laskettu.

| Kaupunki, ruutu | Ennen: teksti nimiön päällä | Jälkeen: nimiöitä paperin alla |
|---|---|---|
| Marseille (FRA), 1024 × 1366 | 1 | 3 |
| Marseille (FRA), 390 × 844 | 12 | 20 |
| Rooma (ITA), 1024 × 1366 | 0 | 0 |
| Rooma (ITA), 390 × 844 | 2 | 4 |
| Kööpenhamina (DNK), 1024 × 1366 | 0 | 2 |
| Kööpenhamina (DNK), 390 × 844 | 6 | 16 |

**Tulkinta.** Ennen teksti oli suoraan nimiöiden päällä, ja kaikki luki
sekaisin. Nyt teksti on 94 % peittävällä paperilla, joten nimiö ei lue
tekstin läpi ja törmäyksiä ei näy. Kartuscha on kuitenkin isompi, joten
sen alle jää auki ollessa enemmän nimiöitä, iPadilla Ranskassa esimerkiksi
Lourdes, Pic du Midi ja Canigou.

**Kesken:** "kartan asettelu jättää tilan" -vaihtoehtoa ei ole tehty. Se
tarkoittaisi, että avattu kartuscha välitetään nostosovittelun
kiinteäksi esteeksi (`lauta.js` `nostot.sovittele({ kiinteat })`) tai
kamera nytkäytetään ylös. Poltetut nimiöt ovat laatoissa rasterina,
joten niitä sovittelu ei voi siirtää. Tämä on seuraavan erän päätös.

## Vartiot

- `tools/savukkeet/savuke-maapaneeli.mjs`, päivitetty. Ajoin sen
  paikallisesti Chromiumilla (390 ja 1400 px): **18/18 läpi**.
  - Väite 2: kartuscha on paperilla ja reunaviivalla ja noin 40 % leveä.
    Järjestys on masthead → nyt → kategoriat, 1873-lohko näkyy,
    sijoituksia näkyy 0, ja Ranskan kategoriat ovat tasan nuo seitsemän
    ilman duplikaatteja.
  - Uusi väite 2b: sijoitukset näkyvät vasta napautuksesta.
  - Väite 4: merkit ovat pisteviivalla ilman erottimia.
  - Väite 7: seitsemän otsikkoa, joista jokainen avaa oman sivunsa.
  - Väite 8: Liiku on piilossa infotaulun ollessa auki.
  - Vastakoe F: ilman piilotussääntöä Liiku näkyy, joten väite kaatuu
    oikein.
- `node --test tests/*.test.mjs`: 3704 / 0.

Kaappaukset: `docs/raportit/kaappaukset/maalehti-kartuscha-20260919/`
(Marseille 1024 ja 390, Rooma 1024, Kööpenhamina 390).
