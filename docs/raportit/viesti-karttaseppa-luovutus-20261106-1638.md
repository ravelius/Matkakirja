# Karttaseppä: luovutus 6.11.2026 klo 16.38 (KS)
Syy: konteksti yli 25 %, luonteva tauko: ajo 23 katsottu ja jaettu, ei omaa ajoa käynnissä. **Korvaa -1614:n ja -1559:n.** Kaikki kokeena, ei junaan, ei iPadia (2.209). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 6bfc5bdcb). Remote natiivi-backup, ei origin. L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kokeen kohtalo on päätetty).

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Lue `_tyo/karttaseppa/parit-yhteinen-23/tulos.md` kokonaan. Siinä on ajon 23 arvio ja kuvien nimet.
3. Odotat kolmea vastausta (kohta ODOTTAA). Ei avointa ajoa.
4. Etäyhteys on vain KK:lla (Raamattu 7.9): älä kytke sitä itsellesi.
5. Hookin työlistarivit (Concorde, lähialue, saumat): en päivittänyt, työkalu on PT:n ja omistaja epäselvä.

## ODOTTAA
- **KK (omistajan kortti, mallit):** PT 16.4x: valtuus päättyi 15.51, joten omistaja ratkaisee mallit KK:n kortilla; arvio on suositus. Viety KK:lle: parit _tyo/karttaseppa/parit-yhteinen-23/kk/ ja kysymykset 1) Riemukaari jatkoon? 2) Notre-Dame jatkoon vai korjaus? **Vasta KK:n välittämän päätöksen jälkeen kirjoitat Codexille kuittauksen, sinä itse, erikseen #2168 ja #2169:** vastaanotto, molempien SHA:t (d727752c, 99a3d4ee) ja kummankin soveltuvuus. Vain origin/claude/postilaatikko-haaraan. Ei vientiä eikä junaa tällä ajolla (PT).
- **KK (omistaja):** kysytty 16.3x: saavatko litteät laivat ja uimala lähteä joesta. Suositukseni: myös Bercyn yli 1 000 m²:n laatta pois. 265c1ec3a pysyy kokeena ilman hänen sanaansa. Omistajan vastauksen jälkeen ehto VeneMaxAla ja syy.md voi muuttua; tee se Y:hyn, tyyliversio uusiksi (nyt e25).
- **NUI:** kylttimittaus vietiin. Korjaus on NUI:n PT:n sanan jälkeen. Älä muuta koodia tämän takia.

## TEHTY TÄSSÄ SESSIOSSA
- **Codexin mallit #2168 ja #2169 (posti a81cf72dc):** tuontiportti OK, SHA:t täsmäävät. Purettu `_tyo/karttaseppa/codex-lod-20261106/saapunut-v2`. Kytkentä Y 6bfc5bdcb, kansio Resources/NotreDameKoe/lod2-20261106, skripti tee-lod-v2.py. Edelliset lod-20261106 ja nykyiset mallit ennallaan, oletus ei muutu ilman komentoa.
- **Notre-Dame muunnettu karttapaletille:** 18,63 % pikseleistä, portti 2,72 % → 0,00 %, verkko ja UV ennallaan. Pelin tiedoston SHA a62d26013a8f, Codexin GLB d727752c. **Riemukaari** on GLB tavulleen (99a3d4ee).
- **Sävyt** (rungon lineaarinen mediaani pelin nykyiseen malliin, komennon parametri): ND 1.138 1.152 0.851; RK 0.841 0.787 0.520. Kaava: nykyinen kerroin × lin(nykyinen) / lin(uusi). **ND:n nykyinen on paletti-v2/notre-dame.bytes, ei NotreDameKoe/notre-dame.bytes;** ajon 18 sävy laskettiin jälkimmäisestä.
- **Ajo 23:** skenaario `_tyo/karttaseppa/sk-pariisi-yhteinen-23.txt`, loki lokit/karttaseppa-yhteinen-23-b8-6bfc5bdcb, 681 s, 21/21 kuvaa, Shader error 0, error CS 0, PUUTE 0. Parit `_tyo/karttaseppa/parit-yhteinen-23/` (tee-parit.py, tee-rajaukset.py, tee-erot.py).
- **Arvio (ei hyväksyntä):** Riemukaari: suosittelen seuraavaan vaiheeseen. Holvin harmaa ja katon ruudukko poissa, veistokset terävämmät, sävy lähellä nykyistä. Notre-Dame: ei vielä: ylhäältä kaarituet irrallisia tikkuja ja poikkilaivan katto kiilamainen; tornien aukoissa vaaleat tikkaat. Edestä ja 45° selvästi terävämpi, takaa kaarituet näkyvät.
- **GLB:n normaalikartan voimaa peli ei lue:** kartan varjostin käyttää omaa _NormaaliVoima-arvoaan 0,6 (NotreDameKirkko.shader), joten Riemukaaren 0,85 ei vaikuta.

## AUKI
- **Haalea raita laikka-1:ssä:** ylemmästä laikasta jäi ohut haalea raita (rajaus-laikka-1-ero.jpg). z14:n kolme rengasta täyttävät ehdon, z13:ssa ja z12:ssa jokirenkaita ei ole (`laikka-vesi-20261106/jaannos.py`). Tarkistamatta: piirroslaatat ja talokerros. Ei ole vielä kerrottu syytä kenellekään; KK:lle ja PT:lle on kerrottu, että syy on auki.
- **Pn-matala-2:n suunnan laikat:** en näe niitä ajossa 23, mutta pikselivertailun osumat olivat rakennuksissa, joten arvio on silmämääräinen.
- **Bercyn laatta:** 48.83611,2.37607 (1 951 m²) näkyy punertavana laattana vedessä. Uimala on päätelty vain sijainnista. Vertailukuvaa ajosta 22 ei ole.
- **Pont Neufin raita** pysyy jonossa ennallaan. **Tuileries'n ruskeat pisteet** (pn-matala-2, noin 590,1437 ja 920,1432): tutkimatta, eivät vedessä.
- **Louvren haamu:** odota PT:n ja VS:n päätöstä; ei omaa korjausta. **Eiffel 85b** VS:llä. **Kärkilaskenta** iPadilla mittaamatta.
- **Riemukaaren pienet viat:** tumma viiva kaaren yläreunassa 45°:sta, ohuet vaaleat viivat seinässä 5°:sta (rk-5-uusi-x2.jpg). Syy selvittämättä. Mukana tulos.md:ssä.

## MUUTA
- Seuraava yhteisen ajon numero 24. Ajotilaus JU:lle: UNITY b8, Y + kärki, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>, 1 rivi "ratkaisee". Älä muuta skenaariota tilauksen jälkeen.
- Kevyiden mallien lisä `koemalli <nimi> <kansio> [r g b]`; ei hakua verkosta: OpenFreeMapin robots.txt palautti 403:n.
- Kartta-testit: `sh kaanna.sh <nimi>`. Skriptien Python: /opt/homebrew/bin/python3 (numpy ei löydy -I:llä). Kuvat 2752 × 2064. Pelin palat: /private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf.
- Väriparit samassa vuorokaudenajassa, tai sana parin selitteeseen, jos aika poikkeaa. Parit KK:lle ilman selitekaistaa.
- Ennen päätelmää: katso, näkyykö vika samalta kameralta ennen korjausta. Muuten kamera ei todista.

## OPIT
- Kun lasket sävyä "nykyiseen", katso koodista, mikä tiedosto on oikeasti käytössä (Nahtavyysalue.cs Tiedosto), äläkä oleta. ND:llä ero oli sinisessä noin 10 %.
- Tasainen mediaani ei kerro kaikkea: katso myös kuvasta rajaus täysikokoisena.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
