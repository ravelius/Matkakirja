# nollaus-ja-luovutus · vastuu PT · tarkistettu 12.11.2026

TAVOITE: Jokainen sessio työskentelee kevyellä kontekstilla, ja työ jatkuu nollauksen yli katkeamatta. Seuraaja tietää heti, mikä on kesken ja mistä se löytyy.

SÄÄNNÖT:
1. Rajat pehmeä–kova: Postivahti 20–30 %, PT 30–40 %, KK 30 %; muut roolit aloituksen lukema +15 / +25 %-yks., kunnes aloitus ≤ 15 %. [R-7.37] [P-261112-15]
2. Pehmeän rajan yli ei aloiteta uutta isoa tehtävää, ja nollaus tehdään ensimmäisellä luontevalla tauolla, viimeistään kovalla. Käynnissä olevan käännöksen tai pitkän ajon päälle ei nollata; kovan rajan saa ylittää ajon loppuun. [R-7.37]
3. Jokainen nollaa itsensä ilman lupaa samassa vuorossa: luovutus tiedostoksi yhteiseen luovutuskansioon ilman työpuuta, haaraa tai PR:ää; KK:lla ja PT:llä keskustelun tallenne; Postivahdille LUOVUTUS VALMIS ja polku; KK:lla etäohjaus pois; nollaus. [P-261104-6] [P-261111-5] [P-261112-10]
4. Odotan nollausta ei ole sallittu lopputila. Jos nollaus estyy jonossa olevan viestin takia, viesti käsitellään ja nollaus tehdään heti uudelleen. [P-261105-6] [R-7.37]
5. Postivahti lähettää aloitusviestin alle minuutissa ja kuittaa PT:lle; nollaus on tehty vasta kuittauksesta. Nollauskäskyn jälkeen roolille ei lähetetä muuta ennen aloitusviestiä; tauon aikana nollatulle heti taukoviesti. [R-7.37] [R-7.23]
6. Uusi KK ja PT kytkevät ensimmäisenä etäohjauksen päälle; muut eivät koske siihen. [R-7.37]
7. Aloituksessa luetaan vain oma luovutus, omat aihekortit (kirjaa lue) ja työlistan oma rivi; Raamatun lukuja ei kokonaan, haku tarpeen mukaan. Tavoite ≤ 15 %. [P-261112-9] [P-261112-15] [R-7.22]
8. Luovutus on enintään 8 kt: haara, commit, käynnissä olevat ajot, odottavat päätökset ja seuraava askel. Valmis, peruttu ja historia eivät siirry; erillistä tilatiedostoa ei pidetä. [P-261112-9] [R-7.24]
9. MEMORY.md on enintään 3 kt. Postivahti mittaa koot; ylityksestä PT pyytää siirtämään ylimääräisen arkistoon samana päivänä. [P-261112-9] [R-7.22]
10. Kontekstivahdin muistutus on käsky. Postivahti lukee kontekstiluvut joka kierroksella ja käskee kovan rajan ylittäneen nollautumaan; PT:llä 40 % on pakkonollaus, ja 20 min ilman luovutusta asian ottaa KK. [R-7.37]
11. Ei tiivistystä eikä edellisen session jatkamista. [R-7.37]
12. Raskaat lukemat (pitkät lokit, muistikansiot, laajat haut) tehdään apulaisella, kuvat enintään 1000 px:n kopioina. PT nollautuu heti raskaan kertatyön jälkeen. [R-7.37] [P-261109-5]
13. Puuttuvan roolisession PT luo itse ja irrottaa sen omaksi istunnokseen. [R-12.22]

EI VIKA:
- Postivahti ei nollaa muita sessioita.
- Luovutus ei ole repossa.

TEKOTAPA:
- Luovutus /Users/Shared/Claude/luovutukset/<rooli>-<pvm>-<aika>.md; KK:lla keskustelukanava/aloitus.md.
- Tallenne tools/tallenna-keskustelu.py. Aloitusviestit Matkakirja-posti/NOLLAUS.md.
- Koot tools/tarkista-tiedostokoot.sh. Tilinvaihto: tilit-ja-kiintio.
