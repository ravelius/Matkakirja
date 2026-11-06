# Natiivisepän luovutus 6.11.2026 (konteksti 25 %, 7.37)

Korvaa -1611:n Tilan ja SEURAAVA TYÖ:n. -1611:n Linjaukset, Mitattu ja Opit pätevät; samoin sen viittaamat vanhemmat osat. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Remote Controliin ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, L = /Users/Shared/Claude/proto-3d/lokit. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, nyt haarassa natiiviseppa/origo-koe, peili natiivi-backup.

## LISÄYS 16.3x (PT, KK:n tarkennus)
- Origokokeen tulos SUORAAN KK:lle, ei vain yhtenä rivinä PT:n kautta. KK on jo kertonut 4b:n tuloksen omistajalle: älä toista sitä.
- Kyltit NUI:lle vasta kokeen jälkeen. Viesti NUI:lle ehti lähteä ennen tarkennusta; ei toimia. Kokeen jälkeen ei tarvitse lähettää uudelleen, ellei tulos muuta sitä.

## Tila
- iPad 4b luettu: D/tulos.md, skriptit D/hyppy2.py (hyppy2.txt), kyltti2.py, kaanna.py. PT:llä ja KK:lla. Lukukorjaus (akselivirhe) lähetetty molemmille. KK:lla pätkät D/patka-*.gif.
- PT 16.3x: KYLLÄ yksi origokoe omassa koehaarassa, JU:n vuorolla 3c:n jälkeen. EI junaan eikä oletukseksi. KK:lle yksi rivi kokeesta vasta sen jälkeen.
- Haara natiiviseppa/origo-koe 0f152ced2 (peilissä), komento palikat origo <lat> <lon> <h> | pois. Tyyppitarkistus 0 virhettä; ei käännetty eikä ajettu. Haara palikka-koe 2bfb126b0 ennallaan.
- JU:lla, kuitattu toimitus 16.3x, tulos tälle session-id:lle:
  1. IPAD 3C 190448df6 (P/ajopyynto-ipad-3c.md, lokit L/natiiviseppa-palikka-ipad3c-190448df6).
  2. MAC-12 0f152ced2 (O/ajopyynto-mac-12.md, sk-mac-12.txt, lokit L/natiiviseppa-origo-mac12-0f152ced2).
  3. IPAD 5 0f152ced2 (O/ajopyynto-ipad-5.md, lokit L/natiiviseppa-origo-ipad5-0f152ced2): VAIN NS:N LUVALLA Mac-12:n jälkeen. Palauttaa tyhjän indeksin 3c:n päälle.
- NUI:lle lähetetty kyltit tiedoksi (PT:n pyyntö, ei korjausta nyt). Kehysaikapiikit auki erikseen (PT), ei tämän kokeen asia.

## SEURAAVA TYÖ, järjestyksessä
1. IPAD 3C -TULOS: -1611:n kohta 2 sellaisenaan. Ei sekoiteta origokokeeseen.
2. MAC-12 -TULOS: rivi "palikat: origo CartographicOrigin", |p| B-jäljessä alle 8 km ja float-askel alle 1 mm, kuvat m-a1, m-b, m-veto-b, m-a2 täysikoossa: ei sinistä pohjapalloa, ei reikiä, kolmiot ja kutsut. Mac ei todista iPadia. Kelpaa: lupa iPad 5:lle JU:lle viestillä. Ei kelpaa: rivi PT:lle, ei iPadia.
3. IPAD 5 -TULOS: läpimeno on LUKITTU ennen ajoa, D/origokoe-ehdot.md; älä muuta ehtoja jälkikäteen. Aja V/jalki2.py = P/valmis-jalki2/jalki2.py kaikille 7 jäljelle ja D/hyppy2.py:
   hyppy2.py <kansio> r4-a1 r4-a1-t; hyppy2.py <kansio> r4-b r4-b-t --origo 48.8585 2.3586 0; hyppy2.py <kansio> r4-a2 r4-a2-t; eteen-a/eteen-a-t; eteen-b/eteen-b-t --origo …; sivu-*: lisää --alku 20.
   HUOM: jäljen alun rivit voivat olla ennen origon siirtoa vain, jos komennot kuittautuivat myöhässä: tarkista konsolista, että origo-rivi on ennen jälki-riviä. Pätkät A/B: P/valmis-jalki2/sarja.py käännetyille kuville (D/kaanna.py), KK:lle, EI omistajalle.
   Rivi PT:lle ja yksi rivi KK:lle. Tulkinta lukittu: 1 ja 2 täyttyvät = todennettu osasyy, osuus laskusta; 1 täyttyy, 2 ei = hyppy ei ole pääsyy; 3 tai 4 pettää = koe ei kelpaa.
4. Toteutusehdotus vain, jos PT sitä pyytää kokeen jälkeen. Jäännöksestä suurin osa jää odotuksenkin mukaan selittämättä, sano se.
5. C1 ja D2 -1247:n kohdan 6 mukaan, jos PT ei toisin sano.

## Opit
- UNITY-AKSELIT TRUEORIGINISSA: Unity (x, y, z) = ECEF (X, Z, Y). Väärä akseli sai float-tarkka-vertailun antamaan kertoimen 1 helposti, koska sama virhe oli molemmilla puolilla. Tarkista aina: float-tarkka-sijaintiero enintään float-puoliaskel (hyppy2.py tulostaa sen). Origolla Pariisissa Unity = (itä, ylös, pohjoinen).
- SARJAN KUVAT OVAT LAITTEELTA YLÖSALAISIN. Katso kuva ennen alan valintaa. Macin suuntaa ei ole katsottu; hyppy2.py:ssä --ei-kaanto.
- Y 300–450 sisältää kylttejä; niiden askel sotkee kaukaisen kohdan luvun. Kartan mittaus ruuduista y 384–752.
- Tyyppitarkistus: V/tyyppitarkistus.zsh kääntää V:n kopion PalikkaKerros.cs:stä, ei työpuun. Tee muokattu kopio, jossa kaikki Kartta/**/*.cs työpuusta, omaan scratchpadiin.
- Ajopyynnön suunnat 4b:ssä olivat väärin: veto 0.1 0 kulkee länteen, veto 0 0.1 etelään; vedon alussa kamera kääntyy suuntimasta 90 suuntimaan 0 (1,5 s), joten sivu-sarjasta jätetään 20 kuvaa pois.
