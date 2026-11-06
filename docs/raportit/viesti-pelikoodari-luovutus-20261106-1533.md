# Pelikoodari: luovutus 6.11.2026 klo 15.33: peukalokohdat renkaina, nähty pelistä, parit KK:lla

Täydentää -1130:ta; sen kohdat 2.2, 2.4, 2.6, työkalut ja OPIT pätevät, kohdat 2.1, 2.3 ja 2.5 on korvattu tässä. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `76840f429`, b8, puhdas, ei pushattu. Ei junaan. **Taso 1 on yhä pääasia.** Ei ajoa käynnissä; L2 vapautettu JU:lle.

Lukulista: periaatteet, 7.4, 7.23–7.25, 7.37, 7.47, 9.1–9.3, 9.5, 2.209 ja 2.177:n alku, UI-pohjista 4.1–4.4, 4.6 ja 4.14 luettu. Luvusta 12 vain 12.9:n alkuosa ja rivien alut, luvusta 6 ei mitään.

## 1. Tehty
- **OMISTAJAN PÄÄTÖS 11.39 (KK):** "vain alussa ja silloin ne voisivat olla pyöreät ympyräviivat, jotka näkyvät silloin selkeämmin". Commit `76840f429`: rengas 64 pt ilman täytettä (`ohjainopetus.uss`), häviää pehmeästi ensimmäisestä ohjauksesta (`mPeukaloOhjattu`; ele, napautus, näppäin, rimpuilu, QA:n `kaanna`), palaa uudessa juoksussa. Opetuksen syke ja rimpuilun hehku ennallaan. Botilla renkaita ei näy. `unity-tarkistus` 0 virhettä, testit 867/867.
- **`Peukalokohta.Aseta`:** Pois säilyttää nyt edellisen tilan luokan. Ennen väri hyppäsi häivytyksen ajaksi oletukseen (valkoinen hehku; luettu koodista, ei nähty pelistä).
- **Väri:** ruskea ei täyttänyt KK:n ehtoa (kontrasti 1,2–1,4 punaisella, 1,4 harmaalla kivellä). Vaihdettu vaaleaan viivaan (`kuulto-valkoinen-92`) ja varjoon (`kuulto-musta-25`), sama pari kuin pyyhkäisyosoittimessa. KK tietää ja voi perua.
- **Runko:** `fcce6131f` protossa (`8589caa87`).
- **Ajo sk-v** (`lokit/esikatselu-20261106-152541`, L2, b8, 318 s): `vapaa-1/sk-v.txt`, `aja-v.zsh`. Katsottu täysikoossa ja rajauksina:
  - `r1`: 2 rengasta harmaalla kivellä, ei läikkää, ei täytettä.
  - `r2`: ensimmäisen käännöksen jälkeen ei renkaita.
  - `r3`: sama ovi kuin KK:n t3, läikät poissa. Kuvassa kynnysviesti "Sisälle pääsee seuraavalla tasolla." (koodi 5.11., ei tästä muutoksesta).
  - `r4`: koekomennon renkaat 22 % ja 78 % leveydestä: selvät tummalla kivellä ja oven aukossa.
  - Peli-404: 4 tunnettua; ovi tuli mediasta ilman 404:ää.
- **Parit KK:lle ja rivi PT:lle lähetetty:** `pari-renkaat-alussa_kaannoksen-jalkeen.png`, `pari-ovi-puhdas_renkaat-kokeena.png` samassa kansiossa. KK:n viesti oli jonossa lähetyshetkellä.

## 2. Auki
1. **KK:n vastaus odottaa:** riittävätkö kuvat omistajalle vai kuvataanko rengas vielä punaiselle ovipinnalle ja vaalealle marmorille. Rengas ei osu niille yhdessäkään kuvassa, eli ehto on niiltä osin laskelman varassa.
2. **Näkemättä:** häivytys liikkeessä; ensikertalaisen yhdistelmä opetuksen kanssa (vasen rengas + oikea punainen syke heti ohjauksen alkaessa). Ajo oli `opetus 0`.
3. **Pohjateksti:** `tyylikirja/tyylikirja.json` on webin lähde, proton kopio generoidaan (`node tools/tyylikirja.mjs --natiivi <proto>`). Käsin muutos kaataa tarkistussumman, joten peruin sen. Kun muutos menee junaan, päivitä webin OHJAINOPETUS-pohjan PEUKALOKOHTA- ja `nakyvyys`-rivit. PT tietää.
4. **Kartta:** PT 15.2x: LAV:n seuraaja on jäänteiden kimpussa, sana tulee LAV:lta leivonnan jälkeen. Sitten kartta ja rajat (-0004 kohta 2.1), PK vahvistaa viittaukset ennen vientiä.
5. Runko etenee: yhdistä uudelleen, kun jatkat koodia.

## OPIT
- Vuoropyynnössä JU:lle aina rivi "mitä tämä ratkaisee" ja skenaarion täysi polku (Raamattu 10.5); ensimmäinen pyyntö palautui.
- Opetus alkaa samalla ruudulla kuin ohjaus siirtyy: oikea peukalo sykkii heti. Kahden renkaan kuva vaatii `opetus 0`.
- Proton `tyylikirja.json` on generoitu kopio: älä muokkaa käsin.
- Lisäodotus sk-reitillä on turvallista, koska keisari odottaa seinällä: `kuva` väliin ei riko reittiä.
