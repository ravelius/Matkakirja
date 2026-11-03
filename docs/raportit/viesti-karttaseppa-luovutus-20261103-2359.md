# Karttaseppä: luovutus 3.11.2026 klo 23.59 (KS)
Edellinen: docs/raportit/viesti-karttaseppa-luovutus-20261103-2333.md (haara karttaseppa/luovutus-20261103-2315, sha b52bcf9df; PR 6233). Tämä korvaa sen TILAN ja AVOIMEN; sen selitykset (taustaajot, sillat, 2232- ja 19.40-viitteet) pätevät yhä. Syy: konteksti pehmeällä rajalla (7.37).
Y = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/` (python `/opt/homebrew/opt/python@3.14/bin/python3`).
**Aja heti vahti:** `Monitor` komennolla `zsh Y/vahti.zsh`, 30 min välein uudelleen. Sen 12 ensimmäistä TOIMITUS-riviä ovat vanhoja, jo käsiteltyjä.

## TEHTY tässä sessiossa
- **Nimisääntö (KK 23.47, 23.53):** natiivi-backup/karttaseppa/pariisi-nimet-220 **25f99d839** (päällä 1e7d251f1, joka korvaa 4e929f038:n; worktree wt/proto-karttaseppa-ruutu-218). Nähtävyyden oma nimi kuvan alle (qid-taulu `NahtavyysQidt` PiirrosKerros.Esineet.cs), etuoikeus ladonnassa (Pakko), ohittaa NostoQidt:n kuvan näkyessä. "Pont …" -nimi sillan rajauslaatikon alle; muut nimet piiloon nähtävyyden ja sillan alta. Koko kuten c1832c0c2 (042ab0c28). EI KÄÄNNETTY. NS:lle viesti lähti; 25f99d839:n kuittausta ei ole vielä.
- **Sacré-Cœurin sädekehä (lista 3):** Y/sacre-coeur-puut.py → Y/tarkistus-nahtavyydet/sacre-coeur-k3/ (sacre-coeur-taso.png sha256 a6d6a8852c93…, sama alue.json, pari-ennen-jalkeen.jpg). Nurmi pelikuvan omasta puistosta + 62 puu-60-puuta, portaiden edusta vapaa. Pari PT:llä, taso NS:llä; ohje: alue-v2, raivaus vanhasta v1-alfasta. Vain kooste Macin pelikuvan päällä, ei pelissä. Nurmen väri tarkistettava iPadilta.
- **95a733ace katsottu (Mac):** ND 0,8 ja kiekko ok, Sainte-Chapelle ok, a/b-sillat ok. KK 23.53: ND 0,8 saa peittää pohjoishaaran ja sillan, ei korjata.

## AVOIN (järjestyksessä)
1. **Boulognen puut (PT):** kuva lokit/esikatselu-20261103-234105/puut-boulogne.png. SYY LÖYTYI: _tyo/karttaseppa/pariisi-koko-esinepaikat-20261103/esinepaikat.py rivi ~208 ottaa vain puut-pariisi.json:n natural=tree- ja tree_row-kohteet (86 783), joten metsäalueet jäävät tyhjiksi. pariisi-pohja/osm/solu-*.json sisältää natural=wood 340 way + 9 relation ja landuse=forest 1163 way + 21 relation, geometrioineen (natural=scrub 2475, ei käsitelty).
   Ehdotus: uusi skripti samaan kansioon. Rasteri 5 m/px ENU:ssa (origo 48.86122, 2.35092): metsät miinus vesi, rakennukset ja tiet puskurilla. Puut Poisson-levityksellä ja kohinalla ryhmiin, samassa muodossa kuin puut.json, koot kuten puukoko(). Esikatselu: puut pelikuvan päälle kahdella tiheydellä (kuva-ajo `aja 48.8622 2.2480 0.03 2`).
   KK sanoi 2.11. "liikaa puita", joten **tiheys vahvistetaan KK:lta kuvaparilla PT:n kautta ennen NS:ää**. Kysy NS:ltä ruudunpäivityksen raja puumäärälle. Koko-koe ei mene junaan ennen KK:ta. Vincennes samalla.
2. **Louvren kiila (KK 23.53):** oikean alakulman keltainen kiila kuvassa lokit/esikatselu-20261103-234105/nd-louvre.png on sama pohjan tyhjä maa kuin Sacré-Cœurilla. Korjaa samalla tavalla: tee sacre-coeur-puut.py:stä parametrinen (kohde, pelikuva, nurmen näytealue, portaiden vapaa alue). Kiilan muoto ei ehkä ole rengas; katso kuva ennen ajoa. Taso + sha NS:lle, pari PT:lle. Pohjan tyhjä maa voi koskea muitakin aluekuvia (NS).
3. **Pelikuvan arviot seuraavasta ajosta:** nimet (koko, määrä; tupla nostomerkin kanssa? Sainte-Chapelle ND:n vieressä piiloutuu vain, jos osuu ND:n rajaukseen; Eiffel: KK katsoo; Pont Neuf), 90°/30° sillat 628d1a90a (kannen leveys; Invalides ja Alexandre III olivat a/b:llä vinossa katuun nähden, kuten pitikin), Sacré-Cœur k3. Pari PT:lle.
4. **Korttelipinta:** VS muutti pintaa k15:ssä 2d4eb4fad (Y:n ulkopuolella _tyo/linssiseppa2/pariisi-tyyli/k15/, pinta.py). Uusi pinta sovitetaan samalla skriptillä ja mitataan ruudulta. VS:n seuraava sessio vertaa k6:ta k15:een ja tuo parin (f4ad6043d). Odota, älä säädä itse.
5. **Hautausmaat:** KK 23.42 haluaa oliivin polkuruudukolla; maa VS:llä, data hautausmaat.json jo VS:llä. Hautakiviä ei tilata (PT).
6. **Taustaajot:** tasankoketju pid 65143 ja esittelysilmukka pid 68441 käynnissä (vahti ilmoittaa). Jatkot kuten 2333-luovutus AVOIN 6.
7. Vanhat: worktree-poistot (PT, 2315-luovutus), v7/v8 iso-pari (JU), pitkät ruudut.

## Opit
- Puudata = vain OSM-solmut ja -rivit. Metsät ja isot puistot ovat alueita, eivät puita: tarkista täyttö alueittain, ei kokonaismäärästä.
- Pienet puut hajallaan keltaisella maalla näyttivät roskalta (k2): kadut pois maskista avauksella, alle nurmi, puut isompina (22–44 m). Kapea sädekehä ääriviivan vierestä erikseen mukaan.
- Pelikuvan ja tason sovitus onnistuu suoraan kirkon väreistä (skaala + siirto), ks. sacre-coeur-puut.py.
- Halutun rivin paikka nähtävyyden kohdalla: Paikka.omaKeski (Nimikerros), ei Kylttisiirrot, koska nimen korkeus vaihtelee tasoittain.

## LISÄYS klo 00.10 (lue viimeisenä; korvaa AVOIMEN kohdat 1 ja 2)
- Postivahti: nollaus vasta lähellä 35 %:a; uusi LUOVUTUS VALMIS silloin.
- **Louvren kiila tehty:** Y/nahtavyys-nurmi.py (Sacré-Cœurin työkalu yleistettynä) → Y/tarkistus-nahtavyydet/louvre-k2/ (5f8ffe6c902c…). Pari PT:llä, taso NS:llä (alue-v3, raivaus vanhasta v2-alfasta). Vasemman etupuolen keltainen jätetty.
- **Sacré-Cœur k3 pelissä NS:n koekäytössä e101c006e** (alue-v2); ei vielä nähty pelikuvassa.
- **Metsätäyttö:** _tyo/karttaseppa/pariisi-koko-esinepaikat-20261103/metsat.py → metsat-harva.json (latvus 16–24 m, 55189d631b8c…) ja metsat-tihea.json (24–34 m, 87ad8205dc4b…). Kumpikin noin 13 700 puuta, samassa muodossa kuin puut.json; latvus on leveys metreinä. 10–14 m:n latvukset näkyivät pelkkinä pisteinä. Pari pari-boulogne-lahi.jpg PT:llä, suositus oikea (24–34 m). **ODOTTAA KK:n valintaa; vasta sitten NS:lle** (kerro: leveys latvus-kentästä, tarkista ruudunpäivitys). Vincennes jää todennäköisesti rajauksen ulkopuolelle (9,7 km², lähes kaikki Boulognea); tarkistamatta.
- **Tuileries ja Invalidit (a95-silta-katu.png, PT:n kysymys):** kirjainmaiset lohkot ovat OSM:n todellinen puukuvio, eivät säännön tulosta: koodi ottaa puut sellaisinaan (Invalidit 915 yksittäistä, 0 riviä; Tuileries 1693, joista 668 rivipuita). Vastaus PT:llä. Mitä niille tehdään, on auki: jos KK ei halua kuviota, vaihtoehto on täyttää alueen sisus tai harventaa. Ei tehdä ennen KK:n kantaa.
- **Nimet:** JU ajoi 4e929f038:n (lokit/esikatselu-20261103-235507: louvre-kadut, eiffel-kadut pätevät; nd-keski uusitaan). Käytä näitä vain koon ja määrän arvioon; säännön näkee vasta 25f99d839:stä NS:n yhdistelmässä. NS kertoo tuplista kuvan jälkeen.
