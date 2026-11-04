# Pelikoodari: luovutus 4.11.2026 klo 05.29 – muuri-koe purettu, KK:n päätökset, silta-koe JU:lla

Edellinen: -20261104-0502 (lisäyksineen, e2ac4a5fd). Tämä korvaa sen muuri- ja ohitusosat; palikka-, omena-, Palvelijatar- ja be56-osat ennallaan. Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja.
Viestit KK:lle suoraan näissä asioissa, PT tiedoksi.

## KK:n päätökset 05.26
1. Muurin korjaus LAV:lle PT:n kautta (PT tilannut; lisäykset lähetetty PT:lle 05.29).
2. **cb8b1f06c ei mene junaan ilman muurin korjausta; samaan junaan yhdessä.** iPad-muisti kuten sovittu.
3. Kivijalka naapurien tasoon (1,2 m) ja punaisen alle.
4. Joki jää, mutta sen pitää näyttää vedeltä vauhdissakin ja rantojen erottua kivestä. Ehdotin VS:ää; ei junan este; kuva KK:lle ennen kytkentää.
5. Kaiteiden tummansininen yläpinta (v-20, v-21): tarkistettava samasta kohdasta; jos sama perhe kuin muuri, lisätään LAV:n hakuun.
6. **Todistus korjauksesta on minun:** vanha | uusi samasta kamerasta, leivonta päällä, koko muuri kuvassa, koko lähestyminen. Minä katson tallenteen, KK:lle kuva.

## SEURAAVA TYÖ
- **Rivi "SILTA AJETTU" (JU):** `_tyo/pelikoodari/muuri-koe/silta/ajo/`. Kuvat z132, z105, z90, z75, kukin -leivottu, -ei-leivontaa, -vertailu, -ei-jokea, samasta jäädytetystä ruudusta. Ei ole ajettu kertaakaan; jos kuvia puuttuu tai paikka ei osu sillalle, säädä odota-peli-lukuja (`sk-silta.txt`). Tarkista:
  - Kaiteet: sininen katoaa -ei-leivontaa-kuvassa → leivonta. Katoaa vain -vertailu-kuvassa → elävä valo/varjot, ei sama perhe. Sillan atlas ei ole sininen (0/1180 yläpintaa, näyte kolmion keskeltä), joten leivonta ei ole todennäköinen. Tulos KK:lle; jos sama perhe, rivi PT:lle LAV:n hakuun.
  - Joki: näkyykö 0,45 m:n marmorireunakivi ja uoman seinä; -ei-jokea-pari kertoo, mikä kuva-alasta on jokea. Tieto VS:lle.
- **Rivi "LOD AJETTU" (JU):** kuten -0502:n lisäys 05.2x; muistihuippu korjaus vs. edeltäjä, rivi PT:lle ja KK:lle.
- **Kun LAV:n korjaus on valmis:** todistus (kohta 6). Sama siemen ja skenaario vanhalla ja uudella taustalla. Tämä ei ole vielä skriptinä.

## Muuri-kokeen tulos (KK:lla ja PT:llä)
Kaikki mitat ja toistoskriptit: `_tyo/pelikoodari/muuri-koe/TULOS.md`, `tyokalut/`; pari `pari-varjot-pois-vs-leivonta-pois.png`. Lyhyesti: tumma lohko on leivontavika, kk-tausta-1-0 x −48,2…−24,7, kaksi pintaa 0,2 m:n päässä toisistaan, molemmat poispäin aukiosta. Harmaa kaista on Kultaisen veden joki. Pintojen suunta on mittaukseni tiedostosta; korjaus todistaa sen.

## Säikähdys: ohitusajo katsottu, raportti KK:lla
Lähikaistalla särkyminen näkyy noin 0,5 s, kaukokaistalla ei säikähdystä; lukua ei säädetty. Ruudut katsottu, liikkuvaa kuvaa ei. Koonnit: `_tyo/pelikoodari/palvelijat-ohitus/ajo/`. KK:n vastaus odottaa. PT 05.4x: palvelijalippu kiinni, koska säikähdyksen todistus ja iPad-muisti puuttuvat; todistus lähti PT:lle ristiin tuon viestin kanssa, tarkista tarvittaessa.
Lokin aika ei vastaa suoraan ruutua: säikähdys 110,85 näkyy noin ruudussa 5605.

Haarat ennallaan: arkihahmot-218 01e3bc89f, kuvarunko palvelijat-kuva-218 349e8f8db, lod-diag-218 a368fdf29 (junaan vain cb8b1f06c).

## Lisäys 06.1x (PT; korvaa kohdan 4 tekijäehdotuksen)
**Joki on minun työni, ei VS:n:** selvitä vesivarjostimesta (`JuoksuLattia.shader` Vesi, _Uoma 1, k6), miksi pinta on tasainen, ja tee siitä vettä. Tavoite KK:lta: pelaaja tunnistaa sen vauhdissakin heti vedeksi, ja rannat erottuvat kivestä. Kuva KK:lle ennen kytkentää. Ei junan este; tehdään **muurin ja säikähdyksen jälkeen**. Lähtöhypoteesi ja koekohta: `_tyo/pelikoodari/muuri-koe/TULOS.md`, lisäys KK 05.26; hypoteesia ei ole testattu.
PT 06.1x: muuritilaus on LAV:lla ja alkanut.

## Lisäys 06.2x (korvaa lisäyksen 06.1x)
- **Joki on sittenkin VS:llä (PT 06.2x); älä tee.** LAV ilmoittaa minulle, kun muurimalli on valmis; sitten todistus.
- **Säikähdys hyväksytty lähikaistalle ruuduista ja lokista, kaukokaista ok (KK 05.29);** lukua ei säädetä. Lippua ei avata vielä. Liikkuvaa kuvaa ei ole katsonut kukaan, ja se kerrotaan omistajalle niin.
- **Seuraavaan ajoon, ei omaa jonoa:** 1. maljakon kantaja lähikaistalta (nyt Palvelijatar vain kaukaa); 2. palvelija heti käännöksen jälkeen, kun 1,3 s ei ehdi täyttyä; lisäksi uusi Palvelijatar ja muurikorjaus.
- **Avoin KK:n kysymys:** kirkas vino alue aukiolla (ohitusajo 5605–5745). Vastattu: ei näytä varjolta, kirkas puoli on lähellä lattiaa ilman leivontaa ja tumma sama kuin leivottu; ei todistettu. Silta-kokeen z132 kertoo, näkyykö se LOD-korjauksella ja elävillä varjoilla; 217:ää ei ole verrattu samasta kohdasta. Tulos KK:lle kaiteiden kanssa.

## Lisäys ennen nollausta
JU: be5632bdb iPad: sali 1 OK 3845 Mt, sali 2 OK 3878 Mt, **juhlasali xf VIKA 4153 Mt ≥ 4080 Mt** (vapaa 966 Mt, 05.29); ketju jatkaa (uudestaan 40 x), rivi "BE56 AJETTU" tulossa. Kansiot `lokit/pk-muistipiikki-219/sali-be5632bdb-{1,2,1-xf}/`. Ei vielä tulkittu eikä kerrottu PT:lle. **Seuraava:** katso `muisti-tarkka.log` (peitto, roskienkeruu kuvan alla) ja rivi PT:lle -0334:n ohjeen mukaan. Ei omaa ajoa.
Viimeisin luovutuskommitti on tämän lisäyksen kommitti, ei eeb0f915f.
