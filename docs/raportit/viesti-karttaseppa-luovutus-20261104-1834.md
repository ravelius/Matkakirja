# Karttaseppä: luovutus 4.11.2026 klo 18.24 (KS)
Syy: konteksti 26 % (7.37). Korvaa kaikki aiemmat 4.11. luovutukset. Vanhoja ei tarvitse lukea. Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104.

## Valtuus
**KK:n valtuus on tauolla (PT 18.2x), kunnes omistaja vahvistaa:** KK ei hyväksy omin päin. Kuvat viedään silti KK:lle.

## ENSIN: OMISTAJA 18.27 (KK) ja PT:n jono
Omistaja: "puut näyttävät olevan aivan liian kirkkaita." Puut samaan kuvaan kirkon ja kartan kanssa, kukkiva vaimeaksi, rykelmä hajalle. Erilliset puut pysyvät, ei 3D-maastoa.
- **KK 18.3x, uusi työ, aloittamatta: vene ja vana taivaalla.** iPad 92c47e215 s-270:ssa vene leijuu utua vasten (täyskuvassa noin x 1737, y 218; rajaus Matkakirja-fable/scratchpad/keskustelukanava/kuvat/nd-ipad-92c47e215/s-270-taivas.jpg). KK:n arvio, ei todistettu: kartta häipyy utuun, mutta vene ei. Tavoite: kaukana vene ja vana häipyvät samaan utuun kuin kartta. Koe kääntäen kameraa jokea pitkin. Omistaja näki tämän puutteena 15.39.
- **Puuajon kuvat: katso KAIKKI ennen riviä KK:lle ja kerro, mitä jäi katsomatta (KK 18.3x).**
- KK katsoi iPadin 12 kuvaa: kirkko, katot, jalka, Hôtel-Dieu ja muisti kelpaavat kokeeseen. Harmaa laikku selvin y-0036:ssa, s-090:ssä ja s-180:ssä (VS:n kohta 3). Aiempi sanani "vene vedessä" koski vain katsomiani kuvia.
- KK 18.3x: **älä lähetä vanhoja pareja**, vain uusi pari 834376445. iPad 92c47e215 on kerrottu KK:lle.
- **Tehty 834376445** (karttaseppa/nd-puut-219): _Savy 0,68/0,62/0,56 ja _Haalistus 0,35 (simuloitu A/nd22-puut/kalibroi.py: valopuoli noin 130/125/75, puisto pelissä 197/168/123), 16 puuta hajalla (sijoita.py, 0 virhettä). Kääntämättä.
- **Seuraavaksi:** Mac-ajo pyydetty JU:lta, lokit/julkaisija-nd-puut-834376445, sk-nd-puut.txt. Tee parit parit.py:llä (vaihda polut), katso k-0012, y-0012, s-270 ja s-000 täysikoossa, uusi pari KK:lle. Tarkista erityisesti: puita näkyy lännestä (s-270), puut eivät loista, kukkiva ei ole valkoinen.
- **nd20d tilattu e1bcd197a:** kukat vaimeammiksi, toimitus puut-3d-v3/. Kun tulee: tarkistus, kopioi .glb:t Resources/NotreDameKoe/puut/puu-1..4.bytes.
- **PT 18.3x, jono tämän jälkeen:** Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-lisaa-nahtavyyksia.md, osat A, B, C tässä järjestyksessä: A NotreDameKoe yleiseksi, B Louvre, C Sainte-Chapelle (pohja jatkuu ND:n palasta). Kuvat ennen Tripoa KK:lle. Ei junaan. iPad (D) JU:lta, kun A ja vähintään yksi malli ovat kasassa. Suunnitelmaa ei ole vielä luettu.
- KK:n hyväksymisvaltuus on tauolla, kunnes omistaja vahvistaa (PT 18.2x): KK ei hyväksy omin päin.

## 1. Odottaa JU:ta: kaksi ajoa, kumpikaan ei ole vielä tuottanut kuvia
- **iPad 92c47e215 valmis:** 3304 Mt, 0 varoitusta, 12/12, katsottu k-0012 ja y-0036: joki jatkuu, jalka ehjä korkeudella 80 ilman syvyyssiirtoa, pohjan alue yhä harmaampi laikku y-0036:ssa (VS:n kohta 3). Muita 10 kuvaa ei ole katsottu. KK:lle kerrottu, PT:lle rivi lähetetty.
- Mac 834376445: katso yllä. Ajo 67d4783c7: syvyys ja jalka kunnossa Macilla. 639208872 on ohitettu.

## 2. Tärkein löydös: pohjan korkeus
- Pohja näkyi y-0012:ssa 4,4 % striimiä suurempana alapisteen ympärillä, yhtymispiste ruudulla 1338,995 (ruudun keskikohta 1366,1024). Skripti A/nd21-liitos/mittakaavat.py. y-0036-mittaus ei onnistunut (korrelaatio 0,18–0,26), joten tulos on yhdestä kuvasta. Pohja oli noin 70 m striimin yläpuolella. **Korjaus mitattu Macilla 67d4783c7 y-0012-ilman: suhde 0,956 → noin 0,996** (yksi kuva; pohjan haku osui hakualueen reunaan). iPad ei vielä mitattu tällä korkeudella.
- db3d2713e poisti Lisäyksen, ja sen perustelu (striimi = PiirrosKerros 80 m) oli väärä: striimi on pallon tileset. **5128f0354 korjaa:** MaanpintaH 90 (mitattu), kirkon syvyys 60 m kameraa lähemmäs, jotta maasto ei leikkaa jalkaa kallistettuna, kun pallo piirtyy.
- **92c47e215:ssä on vielä 80 m eikä syvyyssiirtoa.** Siitä ajosta saa mittauksen: aja mittakaavat.py uudelleen uusilla kuvilla, kun polku L on vaihdettu. Odotus noin 0,99. Jos kallistetuissa kuvissa kirkon jalka on leikattu, syy on tämä, ja 5128f0354 on korjaus.
- 5128f0354 on vain nd-ipad-219b:ssä ja nd-puut-219:ssä, EI nd-kirkko-219:ssä (siellä 219e7e2ef = db3d2713e).
- Maavarjon materiaalin ZTest on tarkistamatta (Symbolimalli). Jos varjo katoaa kallistettuna, katso se.

## 3. Muut korjaukset db3d2713e:ssä
- Kohta 4: alfa A/nd21-liitos/liitos.py, liukuma vain yhteisellä vedellä, RGB ennallaan. Parikuva pari-liitokset.jpg. Väriero striimin ja pohjan veden välillä (176,172,139 | 164,165,142) jää VS:lle (kohta 3).
- Kohta 5: NotreDameKoe.Ruudulla; nimi kirkon rajauslaatikkoon osuessa piiloon. Laatikko on kallistettuna iso, joten se voi piilottaa naapurinimiä: katso kuvista.
- Kohta 6 (viiri ruudun reunassa) listalla. Suorista-nappi yhä todistamatta, koska kuvissa ei ole käyttöliittymää.

## 4. Puut
- nd20b tuli 2fe975d71: tarkistus OK, 1 000 kolmiota, 80/51/68/86 m. Vertailu A/nd22-puut/vertailu.jpg. KK: ei uutta mallia.
- **nd20c tuli 32ce285e9, tarkistus OK:** rungot ruskeat, kukat ympäri, sirpaleet poissa; muoto ennallaan, normaaleja korjattu puissa 1, 2 ja 4. Vertailu A/nd22-puut/vertailu-v2.jpg (huomio: kukkiva sivuilta paikoin laikukas). Lehvästöä ei muuteta ennen kuin se on nähty pelin valossa. **Mallit vaihdettu haaraan nd-puut-219 11e16c506;** Mac-ajo 67d4783c7 on vielä v1-puilla (mustat rungot): kerro se KK:lle kuvien mukana.
- **Sijoitus D:** 16 puuta, A/nd22-puut/sijoita.py (0 virhettä; dJ.npy tulee jalanjalki.py:stä), kuva sijoitus.png vanhoilla paikoilla: aja sijoita.py uudelleen, niin se päivittyy. 4 puistossa, 12 kiven taskuissa ja sisäpihoilla kirkon sivuilla. Taulukko NotreDameKoe.PuuPaikat. Sama varjostin kuin kirkolla, mutta oma _Savy (kirkon 1,75 poltti lehvästön limeksi).
- Seuraava ajo 11e16c506o/kartta-osat/ vasta omistajan hyväksynnän jälkeen.
- Kerro KK:lle nd20a:n kohdat, jos eivät vielä ole selvinneet: sivukuvien ero, kukkalaikut.

## 5. Muu odottaa (ei toimia ennen sanaa)
- Tasankopoltto seis (PT): jatko vain PT:n sanalla: zsh _tyo/karttaseppa/tasangot-poltto-20261103/jatka.sh.
- Nimet vain kokonaan ruudulla 79186922b, ed711573d (Pariisi-linja), kääntämättä. Kipinät 052e192f9 iPadilta mittaamatta. Karsi, Vincennes, Boulogne, minor-nimet ja puut 43ba52fe7 odottavat pelikuvia. Ei muita nähtävyyksiä ennen omistajan korttia.

## Käytännöt
- **Vahti:** Monitor, fetch origin claude/postilaatikko 60 s välein (/Users/Shared/Claude/wt/karttaseppa-postilaatikko), käsitelty e1bcd197a asti. Vahdi myös _tyo/codex/pariisi-nd-puut-20261104/puut-3d-v3/SHA256SUMS. Kuolee nollauksessa; 30 min välein uudelleen.
- Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 on nyt haarassa nd-puut-219. proto-3d:n varmuuskopio: natiivi-backup.
- Mac- ja iPad-ajot vain JU:n vuorolla. OpenFreeMap-haut kielletty.

## Opit
- Pelin kuvassa pohjan oma kuva on kohdistusviite: mittakaava pohjan sisältä ja ulkoa kertoo korkeuseron. Kokeile tätä ennen kuin korjaat maskia.
- Älä päättele striimin korkeutta PiirrosKerroksesta: ElavaTyyli.Striimi on pallon tileset.
- GlbLukija kääntää z:n: tarkista kirkon jalanjälki sen jälkeen. Rajauslaatikko on väärä mittari puille, koska kirkon sivuilla on taskuja.
