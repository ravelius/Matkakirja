# Valoseppä: luovutus 23.10.2026 klo 13.15 (kova raja 43 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(kaikki tämän päivän rivit 11.53–13.15). Lue tämä kokonaan ennen jatkoa.

## Jono

1. **YKKÖSTYÖ: juoksupelin grafiikka latauskuvan tasolle (omistaja 12.26 PT:n kautta).** Kierrokset junaan 210, iPadin raja 14 ms,
   kuvapari PT:lle jokaisen kierroksen jälkeen. Haara `linssiseppa2/grafiikka-210` (proto), worktree
   `/Users/Shared/Claude/wt/proto-linssiseppa2-grafiikka`, kärki **0228c9c0a** (pohja Lavastajan k1b 4ea7fec01 + k2e).
   - k3 6352a7adc: kattojen kourutiilet (JuoksuLattia `KattoTiilet`), päivän varjo kierretyllä 4-näytteellä, räystäspalkin maalaus
     (JuoksuMaailma `Maalaus`). k3b ab7394c27: **testikamera** (`ui juoksupeli valo testikamera 1.6 4 3 60` / `0`; vain piirron
     ajaksi, pelikamera ennallaan – PT: älä muuta pelikameraa) + pihan laattojen materiaali. k4 e3c0d8319: päivän kontrasti 18,
     kylläisyys 18, lämpö 8. 28057795f: J-korjaus poimittu. k5 0228c9c0a: lämmin utuinen horisontti, usva 70–650 m, varjo 0,8 /
     2 tx, pilvet 5 oktaavia.
   - A/B samasta jäädytetystä hetkestä: `valo tiilet|maalaus|pehmea|k4|k5 0|1` (heti).
   - Kuvaus: `zsh _tyo/linssiseppa2/kierros2/aja-k3.zsh <sha>` (odottaa käännöslokin, Macin joutilaisuuden ≥ 600 s ja ettei
     rakettivideo ole käynnissä; skenaario `kierros2/sk-k3.txt` = Lavastajan k1b-paikat 01/03/04/05/06, joka paikassa p = pelikamera,
     a = testikamera k3–k5, b = testikamera k2, mika-luotaukset; odottaa "ohjaus pelaajalle", komennot ≥ 3 s välein). Parit
     `kierros2/k3-<sha>/pari-*.png`. **0228c9c0a:n ajo käynnissä/jonossa** (JU käänsi 13.1x) – jos ei tulosta, aja uudelleen.
   - Käännökset jatkossa itse (JU 13.2x): `zsh _tyo/linssiseppa2/kierros2/kaanna-l2.zsh <sha>` + rivi jonolokiin.
   - PT:n palaute k3b 05/06: laattojen sävy ja kattotiilet OK suunta. Auki: pilvet, horisontti, kaukosumu, varjot (k5 tehty, ei vielä
     nähty), **salikuvan kattopalkki katon yllä (bugi?)** – selvitä 04-sali pelikamerakuvasta + mika-riveistä konsolissa.
   - Tiedostojako Lavastajan kanssa sovittu: minä varjostimet, Valo/Taivas/Pinnat, ValoKohteet/Valopohja; Lavastaja glb:t ja
     kansiovakiot. Harjakoristeet: PT tilasi Codexilta Tripolla (cca459c3a, posti/harjakoristeet-20261023/); Lavastaja kokoaa,
     minä asetan harjoille; pääharjan V4_harja tekee seuraava Lavastaja.
2. **J-regressio (PT/NS):** LT 210b: J 15,92 ms / 99 ruutua > 20 ms s 466–480 (portti-kuja8). Korjaus NS:lle
   `linssiseppa2/juoksu-210-j` **01ac4de68** (revert 8a38c9e3f; reitti ja kamera samat molemmissa ajoissa → katot pysyivät
   häivytettyinä ulkonakin). Odottaa LT:n J-mittausta. Jos yhä yli: seuraava epäilty b56b79380 (profiili). LT k34:n ovelta ulos
   -tapaus (15–21 ruutua piilossa) jäi auki → uusi ratkaisu (esim. vain Puyin juuri jättämä katto, ≤ 8 m) J:n jälkeen.
3. **Rakettivideo (omistaja 11.43: päivälläkin, 10 s + 3 s).** Mac-appi c9346d0fb (`linssiseppa2/rakettivideo-210`: tallentimen
   kamera = laukaisun kamera, täysi taajuus näytön levossa). Ajo 13.07 kuvasi kaiken, mutta laukaisu ei alkanut 10 s:ssa
   (käynnistys ennen avauslennon loppua). `aja-mac.zsh` odottaa nyt "avaus ohi, alustalla"; uusinta: `zsh
   _tyo/linssiseppa2/rakettivideo/odota-c9346.zsh` (jonossa k5-ajon jälkeen). Näyte (rakettivideo-kokeilu-pysty.mp4 + ruudut-4.jpg)
   PT:lle vasta kun laukaisu näkyy. Opit: SHA 8 merkkiä; odota "linssien aineisto valmis" ennen laukaisua; vain yksi
   Matkakirja-Mac-appi kerrallaan (Lavastajan esikatselun komennot menivät rakettiappiin 12.2x; sama komentokansio); caffeinate.
4. A taide.md PR [ravelius/Matkakirja#5186](https://github.com/ravelius/Matkakirja/pull/5186) ennallaan.

## Opit

- Juoksun latauskuva kestää ensimmäisellä juoksulla ~75 s (palatsin lataus) → odota lokiriviä "ohjaus pelaajalle".
- JU:n valoseppa-vahti voi käynnistää vakiokierroksen samalle simulle (A26BC7D0…) – pysäytä, jos turha (JU:n lupa).
- Pihan laattojen ja palatsin maan oikea varjostin selviää `ui juoksupeli mika X Y` -riveistä (k3b:ssä laattamuutos ei näkynyt
  selvästi 50 m:stä).
