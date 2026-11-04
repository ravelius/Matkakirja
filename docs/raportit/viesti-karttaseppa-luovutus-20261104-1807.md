# Karttaseppä: luovutus 4.11.2026 klo 18.07 (KS)
Syy: konteksti 26 % (7.37). Vanhaa luovutusta -20261104-1720 ei tarvitse lukea. Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104.

## Valtuus
KK 17.1x, omistaja 17.13: "Saat hyväksyä puolestani kaikki"; KK hyväksyy, ja kuvat näytetään omistajalle jälkikäteen.

## 1. Odottaa JU:ta: kaksi ajoa, kumpikaan ei ole vielä tuottanut kuvia
- **iPad 92c47e215** (karttaseppa/nd-ipad-219b; VS:n valo v4 c2b0d96c5 + pehmennys + reitti + kohdat 4–5): koonti oli käynnissä 18.0x, kansio lokit/julkaisija-nd-ipad-92c47e215, skenaario sk-nd-ipad. **Kun valmis:** katso kuvat täysikoossa, muisti, rivi PT:lle ja KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a). KK vie omistajalle.
- **Mac 67d4783c7** (karttaseppa/nd-puut-219): kirkko ilman puita | puiden kanssa, 18 kuvaa, kansio lokit/julkaisija-nd-puut-67d4783c7, skenaario sk-nd-puut.txt, komento ndpuut 0/1. **Kun valmis:** parit samalla kameralla KK:lle. Pyyntö lähetetty JU:lle 18.07. Tarkista: puun ja kirkon syvyys, puun varjot, nimet puiden alla, kukkivan puun väri.
- Koodia ei ole käännetty eikä ajettu kummastakaan haarasta.

## 2. Tärkein löydös: pohjan korkeus
- Pohja näkyi y-0012:ssa 4,4 % striimiä suurempana alapisteen ympärillä, yhtymispiste ruudulla 1338,995 (ruudun keskikohta 1366,1024). Skripti A/nd21-liitos/mittakaavat.py. y-0036-mittaus ei onnistunut (korrelaatio 0,18–0,26), joten tulos on yhdestä kuvasta. Pohja oli noin 70 m striimin yläpuolella.
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
- **nd20c tilattu 97caa3e45** (_tyo/codex/pariisi-nd-puut-20261104/TILAUS-20c-pinta.md): rungot lämpimän ruskeiksi, kukat joka puolelle, sirpaleet pois. Toimitus puut-3d-v2/. Lehvästöä ei muuteta ennen kuin se on nähty pelin valossa (KK).
- **Sijoitus D tehty nykyisillä malleilla:** 15 puuta, A/nd22-puut/sijoita.py (0 virhettä; dJ.npy tulee jalanjalki.py:stä), kuva sijoitus.png vanhoilla paikoilla: aja sijoita.py uudelleen, niin se päivittyy. 7 puistossa, 8 kiven taskuissa kirkon sivuilla. Taulukko NotreDameKoe.PuuPaikat. Sama materiaali kuin kirkolla, joten _Savy kirkkaampi kuin kirkon tarve voi vaatia säädön kuvan jälkeen.
- **Kun v2 tulee:** tarkistus, sitten kopioi .glb:t Resources/NotreDameKoe/puut/puu-1..4.bytes. Malli vaihtuu suoraan. Vie kirjastoon _kirjasto/kartta-osat/ (hakemisto.json), kun KK hyväksyy.
- Kerro KK:lle nd20a:n kohdat, jos eivät vielä ole selvinneet: sivukuvien ero, kukkalaikut.

## 5. Muu odottaa (ei toimia ennen sanaa)
- Tasankopoltto seis (PT): jatko vain PT:n sanalla: zsh _tyo/karttaseppa/tasangot-poltto-20261103/jatka.sh.
- Nimet vain kokonaan ruudulla 79186922b, ed711573d (Pariisi-linja), kääntämättä. Kipinät 052e192f9 iPadilta mittaamatta. Karsi, Vincennes, Boulogne, minor-nimet ja puut 43ba52fe7 odottavat pelikuvia. Ei muita nähtävyyksiä ennen omistajan korttia.

## Käytännöt
- **Vahti:** Monitor, fetch origin claude/postilaatikko 60 s välein (/Users/Shared/Claude/wt/karttaseppa-postilaatikko), käsitelty 97caa3e45 asti. Vahdi myös _tyo/codex/pariisi-nd-puut-20261104/puut-3d-v2/SHA256SUMS. Kuolee nollauksessa; 30 min välein uudelleen.
- Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 on nyt haarassa nd-puut-219. proto-3d:n varmuuskopio: natiivi-backup.
- Mac- ja iPad-ajot vain JU:n vuorolla. OpenFreeMap-haut kielletty.

## Opit
- Pelin kuvassa pohjan oma kuva on kohdistusviite: mittakaava pohjan sisältä ja ulkoa kertoo korkeuseron. Kokeile tätä ennen kuin korjaat maskia.
- Älä päättele striimin korkeutta PiirrosKerroksesta: ElavaTyyli.Striimi on pallon tileset.
- GlbLukija kääntää z:n: tarkista kirkon jalanjälki sen jälkeen. Rajauslaatikko on väärä mittari puille, koska kirkon sivuilla on taskuja.
