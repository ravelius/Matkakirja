# Valosepän luovutus 4.11.2026 klo 22.43

Syy: konteksti 28 %, pehmeä raja (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-2217.md (kohdat 2 ja 3 voimassa). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Wt k30 on haarassa linssiseppa2/suomi-syy.

## Tehty
- Järvet: laikku, reunaviiva ja vyöt mitattu, ks. pariisi-tyyli/striimi/jarvet/TULOS.md ja pari-fin-t113-z11.png. KK:lle lähetetty. Vyöt ja maan kirkastuminen auki. Koe s-t113-valopois lisätty sk-suomi-syy.txt:ään, JU:lle kerrottu.
- Työkalu: jarvet/piirto_ohjelma.cs piirtää palan oikealla ElavaTyyli-koodilla ilman Unityä (dotnet ja csc Kartta-testit/kaanna.sh:n polusta; aja: scratchpadin aja.py:n malli pari.py:ssä ja piirto_vs_kuva.py:ssä). Scratchpad ei säily: käännä uudelleen, jos tarvitset.
- 82/170 RATKAISTU (KK:n kysymys): palasia ei kadonnut. 170 on pyyntöjen määrä (Varakuvia-laskuri), eri polkuja 88 (unity.log esikatselu-20261104-205240: 170 riviä, 88 polkua, 15 toistuu, eniten 9/274/190 29 kertaa). Kaikki 88 korjautuivat. Tätä ei ole vielä kerrottu KK:lle: kerro tuloksen mukana.

## SEURAAVAKSI (järjestys KK 22.4x)
1. MUUT JÄRVIALUEET, ENSIN. Planeetan vesisuodatus suodata_vesi.py käynnissä (pid 68561, nohup, loki jarvet/suodata.log, ulos T7 Matkakirja-valoseppa/osm/jarvet.osm.pbf; KS:n vastaava kesti noin 56 min). jarvet/ketju.zsh ajaa purun sen jälkeen, mutta se voi kuolla nollauksessa. Tarkista: jos renkaat.npz puuttuu ja suodata.log:ssa on VALMIS, aja zsh jarvet/ketju.zsh 68561 taustalla. Sitten tulivuoret/venv/bin/python -I jarvet/vertaa_alueet.py (kirjoitettu, EI ajettu; kalibroi OSM:n Keski-Suomen MVT-paloihin, tekee pari-<alue>.png). Tulos ja kuvapari KK:lle. Pohja haettu 11 alueelta. OpenFreeMapista ei hakuja (PT). jarvet.osm.pbf ja jarvet-solmut.idx omassa T7-kansiossa: poista, kun vertailu on valmis (T7 99 %, 67 Gi vapaana).
2. VERKON PALAUTUS (KK: kyllä, koe omalla haaralla; ei junaan, ei kytkinrunkoon a5323cf4e; yksi kierros). Tavoite: verkon palatessa rikkinäiset paikat korjautuvat ilman käynnistystä, eikä koko kartta valkene. Laukeaa kerran verkon palatessa ja vain karttanäkymässä; pätkivä verkko ei toista latausta; zoomaus ei laukaise koskaan. Ensin vanha kuva pysyy, kunnes uusi on valmis; jos muisti ei salli, pelin oma pehmeä verho. Kerro kesto ja muistin hinta. Todistus: Madrid, Rooma, Wien samalta kuin verkossa, vieritys ei nyi, muisti rajan alla. Ensin Mac, iPad JU:n vuorolla. Jos ei ratkea yhdellä yrityksellä: kirjaa tila ja siirry kohtaan 3.
   Haara: a5323cf4e + koeverkko-komento 85d57c0e7:stä (2d8ec025c:ssä ei ole koeverkkoa). sk-offline2.txt on testin pohja.
   Suunnitelma, EI kokeiltu: korjauskerros. LisaaRasteri("korjaus", ..., vaistyva: true) vapaaseen raster-paikkaan pohjan päälle (Cesiumissa 3 paikkaa; väritaso voi viedä paikan 2, linssi saa etusijan). Oma polkuetuliite Laattapalvelimessa: pala, jonka itse tai esivanhempi on korjattujen listalla, tulee tavallisesta putkesta, muut saavat läpinäkyvän tyhjakuvan. Pohjaa ei irroteta, joten mikään ei valkene; kerros vapautetaan seuraavassa verhossa, jossa pohja latautuu joka tapauksessa (pohjaOdottaa).
   Tarkistettava ensin: tyhjakuvan koko (Laattapalvelin.cs rivi 699; 1 × 1 pitäisi muistin hinnan pienenä, koska Cesium luo tekstuurin joka palalle), piirtääkö varjostin läpinäkyvän oikein paikassa 1, ja Application.internetReachability ei muutu koeverkossa, joten reuna pitää tunnistaa myös koeverkosta.
   Elävä pala: ElavaPiirra palauttaa ilman vektoridataa kuvan "elava-ilman-dataa" eikä tallenna sitä levylle, eikä se ole uusintalistalla. Se pitää lisätä korjattavien listaan, tai Rooman tilkut jäävät. Vanhemman haun varakuva samoin.
3. Sitten valtionraja, Alpit, tasorajat; ND-pohjan laikku KK:n listan jälkeen.
4. JU:lta tulevat: viivat 1b ja 2b (PT: kuvat ennen Suomen korjausta, täysikoossa; luovutus -2200 kohta 1), sitten sk-suomi-syy (s-t113-valopois ratkaisee vyöt; pohja- ja elävä pyyntö -rivit kuvakohtaisesti). Korjaustapa KK:lle vasta tasomittauksen ja muistiluvun jälkeen. Pohjan uudelleenpoltto vaatii uuden kansion, TasoVersion ja mediaviennin, ei kytkin-TF:ään (KK).

## Muistettavaa
- Pythonin urllib sai omasta ämpäristä 403:n, curl ei. hae_pohja.py käyttää curlia kuten tools/tyotavat/julkaisija/tarkista-cdn.zsh.
- Vertailussa ei ole laitekuvia muilta alueilta: se on pohja vs. OSM, ei pohja vs. laite. Sano tämä tuloksessa.
- Vesimaski on väriraja: Alpeilla kallio voi näkyä vetenä. Tarkista pari-kuvista ennen lukujen välittämistä.
- Asemataulua ei päivitetty: kokeet eivät ole junassa.
