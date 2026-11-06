# Lavastajan luovutus 6.11.2026 13.05 (lattian reiät, friisi2, pari3) — LUE TÄMÄ KOKONAAN

Pohja: -1251:n ja -1233:n Opetukset ja Työkalut pätevät (samassa haarassa). Tila ja järjestys korvattu tällä. A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstivahdin takia (28 %). EI VIENTIÄ.

## Vientiehto nyt
-1233:n ehto (KK:n viisi kuvapistettä, 7 seinää, 3 tukkoa, 5 friisiä) ja on/pois-pari. Lisäksi PT 12.5x: kuljettavalla alueella ei reikiä, kuvat katsottu. PT 13.0x: "Vienti odottaa kaikkia näitä."

## PT:n sana 13.0x (sellaisenaan)
"Friisin rivi jää auki: mittaa -151:n tasoero ja jalka, älä päättele; punaisen alueen siirtymä selvitetään ennen kuin porras on korjattu (kamera vai aito muutos). Reiät: kun kuvat-pisteet1 näyttää 3 pahinta reiäksi, korjaa 269 syystä eli levyt-askeleen säännöstä (v115_korjaa.py), ei kolmio kerrallaan, ja tarkista, ettei palautus nosta tarkoituksella poistettuja. 7:n syy selvitetään yksitellen. Jos kuvat eivät näytä reikää, oletus "tahaton" kumoutuu: kerro PT:lle ennen korjausta."

## Tila
1. Pari3 (b0f94ac0a, b7, juna on b8) alkoi JU L1:llä 13.02. Pisteet1 (35140432d, koejuuri-ovi3, 12 kuvaa) sen perässä. KATSOMATTA. Monitori kuolee nollauksessa: katso, onko A/kuvat-pari3/404.txt ja A/kuvat-pisteet1/404.txt olemassa, tai odota JU:n riviä.
2. VS (local_3b36fe96-0199-4b17-9eb4-46a882ce7399) odottaa kansiota kuvat-pari3 (sille kerrottu, ettei pari2 tule). VS antaa tuloksen LAV:lle ja PT:lle. PT: kirjaa b7 tulokseen; jos porrasalat tulevat liu'usta, VS korjaa ja lopullinen kuva b8-rungosta ennen vientiä; jos eivät, b7 riittää tähän kysymykseen.
3. Friisi2 katsottu (404: 4 tuttua; kuvat-friisi2/parit): porras poissa viidestä. UUSI f2--151: katkoviiva liitoksessa (täysikoossa x noin 1000, y 590-715, parit/viiva-151.png). Rivi auki.
4. Liitoksen mitta (mittaa_liitos151.py): limitys z 288,772-288,921, tasoero enintään 0,5 mm laskettuna kärkiarvoista. Syy "pintojen taistelu" on päättely, ei todistettu. Ehdotettu korjaus taka 0,014 -> 0,017, ei tehty. PT vaatii: mittaa tasoero ja jalka, älä päättele.
5. Punaisen vaalea alue on friisi1:ssä ja friisi2:ssa eri kohdassa (parit/jalka-151.png, noin 150 px). Selvitä kamera vai aito muutos. -136:n oikean punaisen kolmion kärki myös eri kohdassa, ei selvitetty.
6. Reikä (-95,2; 345,5): kolmio on v103-v125:ssä, puuttuu levyt-askeleesta alkaen. koejuuri-aukot16 / koejuuri-ovi3 = aukot15 + tämä kolmio palan nykyisillä kärjillä (tee_aukot16.py). Kuvasta todistamatta: p--95p2-345p5. Lod1-2:ssa sama kolmio ei ole; ei väitettä kaukokuvasta.
7. Reikien lajittelu (reiat-lajittelu2.txt, reiat-lajiteltu.json, kenttä katosi, karjet, muut): v125:n lattiakolmio, keskipiste, aukot15:n vaakapinta +-1 m, kulkukartta v19. Yht 812 / 6 265 m2. Kuljettavia 276 / 2 217 m2: taso1 190, kulje 34, kulje eri korkeudella 52. Katosi levyt 269, rungolle 4, kk2r 3. Kärjet palassa: 3 kärkeä 113, muut 163. Muut paketit eivät peitä yhtään. lataa_pelin ei sisällä pohjaa: kuvan vaalea alue reiässä on siis jokin muu kuin sen ryhmät, ei selvitetty.
8. Yksi rajoite: testi katsoo vain keskipisteen ja kartta v19 on tehty julkaistulla taustalla. Osittaisia reikiä se ei löydä. Ei väitettä nollasta.

## LISÄYS 13.0x: pari3 ajettu (korvaa kohdan 1 pari3-osan)
kuvat-pari3 valmis, 404: 4 tuttua, "tarkastelu: alku" lokissa. Oikea seinä on kuvassa, joten pari1:n puuttuva seinä ei toistu. Katsottu vain 800 px:n koossa: tummaa porrasta ei erotu kummassakaan, ei täysikoossa arvioitu, ei väitettä. Kansio kerrottu VS:lle; tulos tulee VS:ltä LAV:lle ja PT:lle.

## Seuraajan järjestys
1. Lue Raamattu 7.47.
2. VS:n tulos parista 3 tuli (TULOS: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/raystas/TULOS-pari3.md): s--275p8:n porras poissa on- ja pois-kuvista täysikoossa, seinää ei muuteta tämän takia. VS:n päätelmä, ei erikseen todistettu: porras oli liu'un jälki ennen räystäscommitteja. PT:n ehdon mukaan lopullinen kuva otetaan siis b8-rungosta ennen vientiä; varmista PT:ltä, koska VS:n korjaus on jo junassa. Ei katettu: s--185p9 ja s--81p1: ota VS:n pyynnöstä seuraavaan omaan listaan koodilla b0f94ac0a (ei omaa ajoa) ja kerro kansio VS:lle. f--151 on oma friisikohta. Kysymys `v4 7`:stä auki.
   PT 13.1x: porrasalojen vientiehto täyttyi vasta s--275p8:lla (pari3, b7). Koko ehto täyttyy vasta, kun s--185p9 ja s--81p1 on katsottu samalla koodilla b0f94ac0a: seuraavaan listaan, ei omaa ajoa. Jos jokin näyttää yhä porrasalan, kerro PT:lle ja VS:lle. Kamerat: sk-saumat1.txt (-186.7 1.7 478.9 6 -8 80 ja -79.9 1.7 243.5 -168 -8 80).
3. PISTEET1 AJETTU: tarkista 404. Katso r--109-227, r--380-517, r--265--248 täysikoossa: näkyykö reikä? Kuvissa kamera 3,5 m pinnan yläpuolella, katse alas (pitch 50), ei tarkistettu, että kamera on avoimessa. Katso p--95p2-345p5: korjaus. Katso muut 8 kuvaa KK:n pisteistä (ehto -1233).
4. Jos reikä näkyy: korjaa levyt-askeleen säännöstä (yleinen/levyt/v115_korjaa.py), ei kolmio kerrallaan. Sen rivi 1: vanha pinta pois solusta, jos sitä ei ole uudessa; rivi 2: uusi lisätään vain, jos solusta poistettiin vähintään puolet eikä samalla korkeudella ole pintaa; rivi 66 jättää solun, ettei tule reikää. Selvitä, miksi 269 jäi silti tyhjäksi. Tarkista, ettei palautus nosta tarkoituksella poistettuja. Lisätyillä kolmioilla UV1 = 0 tuossa askeleessa: pala on leivottava (2,5 min/pala, JU:n vuorolla), tai käytä olemassa olevia kärkiä, jos niitä on.
   Jos reikä EI näy: "tahaton" kumoutuu, kerro PT:lle ennen korjausta.
5. 7:n syy yksitellen (katosi rungolle 4, kk2r 3; suurin (-109,44; 227,53) 94,9 m2, rungolle).
6. Friisi: mittaa -151 ja jalka, punaisen siirtymä (PT). Korjaus samaan uuteen juureen reikien kanssa: rakenna11.py + suunnitelma, tee_aukot15.py mallina; kolmio tee_aukot16.py:stä. Uudet friisikuvat samoista kameroista.
7. Sitten -1233:n kohdat 3-4: -0939:n 5-6, PK:n rivi. Lopullinen juuri on uusi, ei ovi2/ovi3.

## Opetukset
- Sattumalta löytynyt vika on testattava koko kartalta: reiät jäivät 40 kuvan ajolta huomaamatta, ja levyt-askeleen oma sääntö "solu ei saa jäädä tyhjäksi" ei taannut tulosta.
- Verrokki ensin: tunnettu reikä pidettiin juuressa aukot15, jotta lajittelu todisti löytävänsä sen.
- Rajaus kohdasta: tarkista koordinaatit parikuvasta. Viiva-rajaus meni ensin väärään y:hyn, koska parikuvan alaosa alkaa rajauksen korkeuden jälkeen.
- Kärjet voi käyttää uudelleen, kun saaren valo-UV:n muoto täsmää alkuperäiseen; valitse ehdokas lähimmän naapurikärjen mukaan.

## Työkalut (A/), uudet
mittaa95.py, 95b, 95c, 95d, mittaa_pois.py (vertailu v115:een, ei käyttökelpoinen sellaisenaan), mittaa_reiat.py, lajittele_reiat.py, lajittele_reiat2.py, tee_aukot16.py, tee_sk_pisteet1.py, lisaa_sk_pisteet1.py, friisi2_parit.py, friisi2_viiva.py, mittaa_liitos151.py.
