# Lavastajan luovutus 7.11.2026 20.05: riittää yksin (korvaa -1930)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/palkki. Loki: muuri/KORJAUS.md, kohdat 19.5x ja 20.03: LUE NE ENSIN. Python: /opt/homebrew/bin/python3 (ei -I).

## Voimassa
Omistaja 18.49: juuri koeversioon, kun oja, laatta ja rako korjattu; uudet kuvat hänelle ennen junaa; puulta näyttävä lattia kiveksi. PT: EI vientiä, EI iPadia, EI juurta PK:lle (local_91a1bc27) ennen PT:n sanaa. Yleiset säännöt, ei paikkoja. Kuvat PT:lle, PT katsoo täysikoossa, KK näyttää omistajalle. Turkoosi ja harmaa taso: ei työtä ilman sanaa. Lokihaarat seina4-loki, seina5-instanssi eivät junaan; v127 ja v115pala eivät vientiin. Agentit vain Opus tai Sonnet.

## PT:n vikalista (19.3x + 19.4x)
Ei saa olla: palikka kulussa (raja3, v-LP, t-LP), tumma viiva lattiassa, oja2 kohoava pala ja reikä, oja3 sirpaleet ja kiila, laatta2 ja t-IP sahalaita ja kiila, t-LK kaista, puu4, rako0 laatikko ja raot, valo palan rajana (oja3, rako0, v-LP), oja6 sirpale, lisa7 viiva. Selvitettävä: oja5/6 muurin puna. Oven väli (179,8; 208,0): oma kuva, kamera ovi. Automaattinen tarkistus kaikille muutetuille paloille: korkeusero naapuriin ja valon hyppy palan rajalla.

## Tila
Juuri koejuuri-saanto4. Rakennetaan aina järjestyksessä: tee_saanto4.py, tee_saanto4b.py, tee_saanto4c.py (noin 3 min). Tarkistus: tarkista_s4.py koejuuri-saanto4, tulos tarkistus-koejuuri-saanto4.json. Kamerat: tee_sk_saanto4.py -> sk-s4.txt, sk-s4-perus.txt (40). Säde: sade3.py <json> 'kielletty-tausta-v115,kielletty-osasarja-v8,avoimet-v52,kielletty-rakennukset-v118,kielletty-muurikate-v37'. Arkit: arkki-s4.py -> parit-s4/, s4-0..4.jpg (0-2 PT:n listan kohdat).
ÄLÄ muuta juurta, kun JU:n ajo on käynnissä: se lukee sitä.

AJOSSA: JU ajaa aja-s4b.zsh (vain saanto4, runko 901e4004b) kansioon kuvat-s4; ilmoitus tulee tähän sessioon. Perus: kuvat-s4-perus (samalla rungolla, käy). Edellinen ajo: kuvat-s4-a, sen arkit kuvat-s4-ensin/.

## Seuraava askel
1. Kun kuvat tulevat: arkki-s4.py, katso arkit 0-4 ja kaikki PT:n listan kohdat TÄYSIKOOSSA. Arkit 3 ja 4 (22 kameraa) on katsomatta myös a-ajosta. Tarkista muurin puna: nyt perus ja s4 samalla rungolla.
2. Oikaise tai korjaa. Avoimet: oja2 (jäävä kapea V4_kivireunus y 0,27 + helma; sääntö puuttuu), t-IP valkoinen katkoviiva ja valo1 ruskeat raidat (säde ei osunut viivaan, syy mittaamatta; jos ne ovat jäljellä, mittaa rajauksesta). PALARAJA 1 837 / 154 m2 ei parantunut: erota varjonrajat (esim. vain paikan tai maalatun reuna, jossa ero ei jatku lattian yli) ja katso suurimmat kohdat (270,1; -338,8), (244,2; 190,6), (-273,1; 265,3). Jos valo on yhä palojen rajana: paikat, joilla on yksi valoarvo, ovat ensimmäinen epäilty.
3. Rivi PT:lle: sha, kuvien polku, mitkä listan kohdat poissa, mitkä jäivät. Älä sano valmiiksi ilman katsottuja kuvia.

## Avoinna muuta
- Tausta-1-2-lod0:ssa ei ole valokarttaa jo perus-juuressa (v96): ei tämän tekemä; sanottu PT:lle viimeistään seuraavalla rivillä.
- Korotettuja välejä y > 0,3 ei täytetä: jäävät lattian tasolle. Täytetyt 27 väliä, 30 m2. Kulkukarttaa ei ole muutettu: jalkojen vajoaminen mitataan PK:n uudella juurella PT:n sanan jälkeen.
- Sokkelilaatikot 37 kpl poistettu kokonaan: kuvat rako0, loota1, loota2. Lod1-2 saivat vain puusäännön.
