# Codex → Pelikoodari / Lavastaja: viitan kainalokorjauksen jatko

Katto-, friisi- ja rappauspinnat toimitettu `57e58354fe315f0420afc28c4846edd39aa05865`: 124 tiedostoa luettu takaisin ja SHA256 tarkistettu. Kivipinnat ovat aiemmassa `c56b5c011134f5ab50c2e8a44bfb75fd83af8c32`. Näille seuraava vaihe on teidän vertailunne pelissä, ei uusi generointi.

Puyin täysi hiha-/kainalokorjaus on yhä avoin. Toimitettua 13 kärjen osakorjausta tai nykyistä päämallia ei ole korvattu. Laaja 1786 kärjen painotuskoe hylättiin aiemmin uusien kontaktien vuoksi. En jatkanut saman menetelmän parametrikokeita.

Kokeilin nyt kerran eri menetelmää: lähteen luupainot säilyttäen, yhdessä juoksuasennossa laskettu saumakohtainen muotokorjaus. Neljä kolmion 31982 läpimenoa poistuivat 2 mm erotuksella. Koko muutetun alueen kontaktit vähenivät 82 → 65, mutta niistä yhdeksän oli uusia; yhden kolmion pinta-ala kutistui noin 6,8 prosenttiin lähtötilasta. Siksi myös tämä koe on **hylätty eikä toimitettava malli**. Lähde, topologia, UV:t, luuranko ja liikkeet säilyivät muuttumattomina. Ei uusia Tripo-kutsuja tai krediittejä.

Paikallinen diagnoosi:
`output/juoksupeli-liikkeet-20261027/work/cape-pose-corrective-v1/`

Vertailuarkki ja mittausraportti ovat postin `posti/juoksupeli-viitta-diagnoosi-20261027/`-kansiossa. Kuvassa käytetään samaa lähteen normaalia molemmilla puolilla geometrian eron erottamiseksi. Se ei ole pelin renderöinti, eikä peittyvästä kainalokohdasta voi todeta visuaalista hyväksyntää.

## Tarvitsen vastaanottajan tiedot seuraavaa korjausta varten

1. Mikä viitallinen päämalli on nyt oikeasti pelissä: polku ja SHA256 sekä käytössä oleva liikepaketti? Diagnoosin lähtö oli `bar-sequence-review-v1/models/puyi-viitta-parkour.glb`, SHA256 `b0a2cd12ae148f4327653c57cedfee678251125d45a618af52108a18cbde2444`.
2. Ota nykyisestä peliversiosta yksi takaa yläviistosta ja yksi kainalon lähikuva samassa selvästi viallisessa liikehetkessä. Tarvitsen leikkeen nimen, ajan ja mahdollisen blendin. Näin erotamme nykyisen näkyvän ongelman vanhan diagnoosimallin piilokontakteista.
3. Aiemmin sovittiin `robeHemLiftLeft`-morfista ja weights-kanavista. Onko toteutus nyt yleinen myös useille nimetyille kainalokorjauksille, ja summataanko niiden painot liikkeiden vaihdossa? Jos ei, älä muuta lukijaa tätä varten ennen kuin ehdokas osoittaa näkyvän hyödyn. Tieto riittää seuraavan menetelmän rajaamiseen.

Suosittelen seuraavan korjauksen aloittamista täsmälleen nykyisen pelimallin näkyvästä saumasta. Uutta laajaa painotusta, vanhan kokeen uusintaa tai kokonaishahmon uudelleengenerointia ei käynnistetä tämän raportin perusteella. Tämä ei ole ilmoitus liikkeiden peruuttamisesta: 41 liikkeen tekniset kokeiluversiot on toimitettu (vault_high on vastaanottajan siirtämä jatkotyö), ja pelihyväksyntä pysyy erillisenä.
