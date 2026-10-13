# Pääkaupunkitekstien pistokoe e04–e14 (13.10.2026, Sisältökirjuri)

Otos 31 kaupunkia / 93 (3 per erä), 11 riippumatonta Sonnet-tarkastajaa; faktat tarkistettu lähteistä, suomen kieli, kuvatekstit, päällekkäisyys pelin kanssa. Täydet löydökset: proto-3d/_tyo/sisaltokirjuri/teksti-pistokoe-20261013/tulos-eNN.json. Löydökset yhteensä: VIRHE 7, KORJAA 153, HUOM 191.

| Erä | Kaupungit (verdikti VIRHE/KORJAA/HUOM) | Suositus |
|---|---|---|
| e04 | rabat OK 0/6/6; monrovia KORJATTAVA 1/8/6; nouakchott HYLKÄÄ 2/5/5 | EI KYTKETTÄVISSÄ |
| e05 | bamako KORJATTAVA 0/5/6; abuja KORJATTAVA 0/4/6; ouagadougou KORJATTAVA 0/5/6 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e06 | bangui KORJATTAVA 0/7/6; libreville KORJATTAVA 0/6/6; brazzaville KORJATTAVA 0/9/3 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e07 | kampala KORJATTAVA 0/5/7; khartum KORJATTAVA 0/3/8; asmara KORJATTAVA 0/6/5 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e08 | mbabane KORJATTAVA 0/4/8; gaborone KORJATTAVA 0/5/7; portlouis KORJATTAVA 0/4/7 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e09 | taskent KORJATTAVA 0/7/3; dhaka KORJATTAVA 0/6/5; asgabat KORJATTAVA 0/5/4 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e10 | kualalumpur KORJATTAVA 0/7/6; male KORJATTAVA 0/6/4; pjongjang KORJATTAVA 1/6/4 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e11 | ottawa OK 0/0/6; santodomingo KORJATTAVA 0/2/3; washington KORJATTAVA 0/4/4 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e12 | portofspain KORJATTAVA 0/4/5; kingstown KORJATTAVA 0/3/9; basseterre KORJATTAVA 1/2/7 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e13 | georgetown OK 0/3/7; paramaribo OK 0/4/8; brasilia OK 0/4/6 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |
| e14 | palikir KORJATTAVA 2/5/6; canberra OK 0/1/6; majuro OK 0/2/6 | KYTKETTÄVISSÄ KORJAUSTEN JÄLKEEN |

## Toistuvat viat (kaikki erät)
1. Kirjoitusprosessin/metapuhe pelaajatekstissä ("lähteen mukaan", "tässä aineistossa", "ei pidä päätellä…") ja tyhjät yleiset loppukaneetit — koneluku: 31 osumaa e04–e14 (e04 4, e05 6, e06 3, e07 2, e09 2, e12 4, e13 2, e14 8).
2. Kuvatekstit: lyhyt = selite (identtiset) ja yleislauseita jotka eivät kerro mitä kuvassa näkyy; osa väittää enemmän kuin Commons-sivu (e04, e11, e12, e14).
3. Generaattorin välilyöntivirhe vuosiluvuissa ("vuonna2020"), vain e04: 28 kenttää (Rabat, Nouakchott, Conakry …) — korjattavissa koneellisesti (regex [a-zäö]\d{4}).
4. Konekäännösmäistä suomea: "kelttikala/kelttikeitto" (e10 Pjongjang, 4 kenttää; oikea harmaakefaali), "nahkakilpikonna" (e06; merinahkakilpikonna), "simpukka"=kotilo (e09) ym.; pehmeä tavuviiva e09 Asgabat, tuplavälilyönti e07.
5. Visat: vihjeet paljastavat vastauksen, houkuttimet absurdeja (e09, e08, e13); oikea vastaus aina indeksissä 0 (465/465) mutta game.js sekoittaa (shuffledOrder), joten ei vika.
6. Aikasidonnaiset väitteet (matkustusvaroitukset toistuvat 6–8 kertaa Bamako/Ouagadougou; Smithsonianin sulku Washington) vanhenevat; UM-sivut eivät avautuneet (403) → ei vahvistettu.
7. Faktat: ei väärää correct-vastausta yhdessäkään 93 otoskysymyksestä; 7 VIRHE-löydöstä Basseterre "kevyesti suolattu" suolakala, Palikir rikkinäiset lauseet+sisäinen ohje fact-kentässä, Pjongjang kelttikala, Monrovia/Nouakchott ks. alla.
8. e04: Nouakchott HYLKÄÄ (kuvat/kohteet/sää puuttuivat, rakentamisen ajoitus epätarkka, meteoriittikysymys aiheen ulkopuolella), Monrovia KORJATTAVA (viisi muualla kuvattua kuvaa — jo poissa v2-kuvalistasta?). Vain Rabat valmis.
9. Päällekkäisyys pelin kanssa: Brazzaville (rumba, Pool Malebo) ja Librevillen/Brazzavillen kohdekartat (e06), Brasília (js/packs/maastokohteet-bra.js), Port Louis -kartta (maakartat.js), Dhaka rikshamaalaus (maakuntarivi) — tarkista ennen kytkentää, ettei sama tarina tule kahteen kertaan.
