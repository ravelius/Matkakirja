# Natiivi-UI: luovutus 6.11.2026 klo 10.02 (konteksti 28 %, 7.37)

Täydentää -0915:ttä, -0859:ää ja -0750:tä: tausta voimassa, tämä korvaa järjestyksen. Lukulista 7.47 luettu tällä vuorolla; uusi vuoro lukee sen itse.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, nyt haarassa natiivi-ui/alapiste-219, kärki 37907cb54 (8c3f3931f:n päällä), peili natiivi-backup peili/proto/natiivi-ui/alapiste-219.
Ei junaan, ei omaa ajoa. Kartta-testit 662/662 ja unity-tarkistus 0 virhettä kärjessä 37907cb54 (b7).

## Ajo yhteinen-6 (lokit/karttaseppa-yhteinen-6-251af3c48, Y 251af3c48, sisältää 8c3f3931f:n, Unity b7)
Loki ja kuvat katsottu itse; analyysi: scratchpadin karsinta.py, luvut alla.

TODENNETTU LOKILLA:
- Ero alapisteen ja kameran alla olevan pisteen välillä 0,0 km kaikilla 251 rivillä (ennen laskettu 21 km). Nimien "suunta" 0,20° → 0,01°.
- Karsituista usvan edessä 0 rivillä 240/251. Loput 11 riviä: aika 58–71 s, alkuzoomin aikana, kamera korkealla (46,35°, raja 268–320 km, "ei usvaa"). MittaaKarsittu ei katso nimen tasoa, joten luku liioittelee: katutason nimet eivät näy sieltä. Oletus, ei mitattu erikseen.
- Levossa raja 4,6 km, katse 1,2 km, usvan loppu 2391 m: karsinta tapahtuu usvan takana.
- nd-raja noin 4 min alusta ja yli 150 karsinnan jälkeen: Rue de Buci ja Quai Voltaire ladottu, Rue Jacob "syy ladonta" (ei karsinta). Vanhassa ajossa (0b4d74011) nd-raja-nyt: kaikki kolme "ei osumia".

KUVALLA (täysikoossa tai rajaus): co-45, co-ob, p-con, p-con-2: Orsay täysi. ss-talot, nd-raja: Notre-Dame ja Sainte-Chapelle täysiä. Haaleita mallin kylttejä ei näy.

EI TODENNETTU:
- Syy-yhteys: ajo vain 1ec00e883:lla (ilman alapistekorjausta) puuttuu, joten ennen-luvut karsinnasta puuttuvat. Vanhassa ajossa ei ollut lokiriviä.
- Toistuva kysely samalta kameralta: tässä ajossa nd-raja kysyttiin kerran, Belleville ym. ei lainkaan. Seuratut rivit kertovat vain karsinnat ja paluut.
- Muut kaupungit: vain Pariisi ajettu. PT:n ehto ennen junaa auki.
- Nimi ei vilku liikkeessä: ei todistettavissa kuvista.

## Karsinnan kierre on yhä olemassa (ei näy pelaajalle levossa)
251 karsintaa 8 minuutissa (per 60 s: 19 35 97 53 22 6 8 6 5), karsittuja 276 021, palanneita 194 835, viive mediaani 1,6 s, suurin 332 s. Levossakin 5–8 karsintaa minuutissa, noin 1000 nimeä kerralla.
Koodista (ei mitattu): raja 4,6 km on Lähelta-palojen alueen sisällä, joten ElavaNimet.Unohda vapauttaa kameran lähellä olevia paloja ja ne pyydetään uudelleen. Kommentti "karsitut ovat kaukana kamerasta, ei kiertoa" ei päde Pariisissa.
Ruutuaika (Mac, pitkät ruudut, eri skenaariot, ei suora vertailu): Lado mediaani 12 ms, suurin 99 (uusi) vs 10 ja 68 (0b4d74011), 10 ja 71 (c0bfef077). Elavat mediaani 1 ms kaikissa. Pitkiä ruutuja 134 (8,4 min) / 156 (14,3 min) / 145 (7,8 min).
Elävä-vastauksia 84 (8,4 min), 142 (14,3 min), 137 (7,8 min). Lähelta-paloista ei omaa lokia; tämä on vain viite.
Suositus: alapistekorjaus riittää nimikatoon Pariisissa. Kierrettä ei korjata ilman mittausta: Karsin oma kesto ei ole lokissa, ja iPadilla hinta voi olla toinen. Odottaa PT:n sanaa.

## Tehty
1. 37907cb54 hintakyltti (KS: nd-raja "Kuumailmapallo £200" haalea): sama sääntö kuin muilla kylteillä, täysi tai poissa (Horisonttiusva.KylttiUsvassa), köysi mukana, poissa oleva kyltti ei varaa tilaa. Koskee kaikkia KaupunkiPallojen kylttejä (kaupunki, raketti, torni), ei vain palloa. Pallon kuva häipyy usvassa kuten ennen. KÄÄNTYY (unity-tarkistus), EI KUVAA: älä väitä korjatuksi.
2. KS:n yksinäinen pyöreä kuva co-45 (2583, 733), myös nd-raja ja ss-talot: rajauksessa rantakadun valokuva Quai Voltairen kohdalla. Pyöreä katukuva ilman kylttiä on oikein (-1642: "ei vika", KK 16.3x), mutta tämän kuvan kohdetta en tarkistanut datasta. Sainte-Chapellen edustan pyöreä kuva nd-rajassa samaa lajia, kohdetta ei tarkistettu.
3. POIKKEUS ArgumentOutOfRange ajon alussa: UnityEditor.Search.SearchDatabase, editorin oma, ei pelin koodia.

## Unity b8 (NS 09.4x, JU 09.47)
Runko addae63f2 on b8:ssa. Kokeilin vain merge-tree:llä: alapiste-219 + runko = ristiriidat Laattapalvelin.Elava.cs ja LiikeLaatatPaatos.cs (KS:n alue; 244 commitia yli, rungon puolelta 20). EN YHDISTÄNYT: oma haara on KS:n Y:n päällä, joten yhdistys kuuluu Y:hyn. Kysytty KS:ltä. Älä vertaa b7- ja b8-kuvia ilman merkintää.

## SEURAAVAKSI
1. Odota PT:n sanaa suosituksesta. Ei junaan ennen muita kaupunkeja.
2. Seuraavasta yhteisestä ajosta, jossa 37907cb54 on: nd-raja, hintakyltti täysi tai poissa, köysi sen mukana.
3. Muut kaupungit (Lontoo ja Jyväskylä, koska 27.10:n havainnot): ero km, karsituista usvan edessä, "nimet etsi" kahdesti samalta kameralta.

## Yhä avoinna (-0915)
Tuileries'n kuva Louvren kulmassa (KK kelpuutti kokeena); kyltti RANSKA-otsikon ja Liiku-napin alla ei kuvassa; aaripisteet 38 × kärkimäärä ja KS:n Sovita/Lisays-kysymys katsomatta; Metroasema haalea sc-80:ssä tutkimatta. Mittarin viat: ei nyt. Sivuvaikutus f473d4d86: pyöreä kuva häipyy rajalla 0,5 (myös kyltittömällä), ei tarkistettu erikseen.
