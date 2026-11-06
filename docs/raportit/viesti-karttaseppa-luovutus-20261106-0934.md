# Karttaseppä: luovutus 6.11.2026 klo 09.34 (KS)
Syy: konteksti 25 %, luonteva tauko: maski valmis, odottaa NS:n kansiota. **Voittaa -0921:n ristiriidassa; -0921:stä pätevät edelleen SEURAAVA YHTEINEN AJO (paitsi kansio), AUKI (paitsi taivas) ja kattoparin tulos.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 939741d43, ei pushattu). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, c0bfef077, koskematon). KK:lle SendMessage id:llä local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. NS: katso nimi ListAgentsista; pelkkä nimi ei kelpaa, käytä riviä viitteineen.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen). Lue Raamattu 7.47:n lukulista: minulta jäi lukematta tässä sessiossa.

## TEHTY: LOUVREN TALOMASKI (omistaja 09.20 "Kokeillaan")
Kansio `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/louvre-talomaski/`: tee-maski.py, jalanjalki.py, asenna-pohja.py, maski.png, korvaus.json (sisältää ND:n rantamaskin), tarkistus.jpg (oranssi talo, punainen maski, sininen malli), louvre-pohja-talot.png.
- Ruudukko sama kuin v2: 1536×1024, 1,25 m/px, siirto -160,-95.
- Raja: v2:n Tuileries (Rivolin linjasta etelään) ja mallin etelä-puoli Seineen + mallin suorakaide + 8 m + kokonaan 166 mallia koskevaa taloa + Saint-Eustachen OSM-talo way/53762963 (VS:n malli seisoo siinä; v2 poisti sen tähän asti, OHJELMA-listaa ei muutettu).
- Maski21:tä EI käytetty: sen sisään olisi jäänyt litteä kaista, koska malli on oikeaa isompi.
- Tulos tee-palat-prefiksillä: maski poistaa 175 taloa, lävistäviä 0, lähin talo 6,2 m. Laskettu aineistosta, ei nähty pelissä.
- W 939741d43: Pohja = NotreDameKoe/louvre-pohja-talot (sama kuva, alfa samaan rajaan, 496 125 → 407 404 px); vanha louvre-pohja.png jää. Kääntämättä.
- NS:lle 09.30 (korvaus.json) ja KK:lle kerrottu, myös jäävä litteä: Palais-Royal'n eteläosan läikkä noin 100 × 75 m, Saint-Germain l'Auxerrois, Oratoire, Hôtel du Louvre, kaista mallin ja Seinen välissä. KK:n vastausta tähän ei vielä ole.

## SEURAAVA TYÖ: YHTEINEN AJO, KUN NS:N KANSIO ON TULLUT
**NS 09.3x: kansio on valmis:** `/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/palat-v7-louvre` (kansion sha 871505b8fb51ce5b, tee-palat.py bf7204d495d41be8, korvaus = KS:n korvaus.json). Korvaa v6:n; 175 taloa pois, talot 127 660, 12 palaa muuttui, eheys 0 virhettä. NS pyytää ajoon kuvat Louvren itä- ja pohjoispuolelta matalalta: yhdistä ne KK:n kolmeen, älä lisää erikseen. Talokansio valitaan skenaariossa (`palat-v6` ei ole Y:n koodissa; malli sk-pariisi-yhteinen-5.txt). Sitten:
1. Yhdistä Y:hen: W 939741d43, NUI 8c3f3931f, VS 3203aa555 (molemmat commitit löytyvät Y:stä; c0bfef077 ei vielä sisällä NUI:ta). Y on puhdas. Mac-esikatselu oli käynnissä 09.33 (lokit/esikatselu-20261106-093308); kysy JU:lta, ajaako se Y:tä, ennen kuin yhdistät.
2. Skenaario -0921:n listasta, kuvia vähän. KK 09.3x lisäsi: yksi kuva Octroin kohdalta (sk-seuraavaan-ajoon-hdv-etelaan.txt:ssä) ja VS:n Concorde. Enintään 3 Louvren kuvaa KK:lle: Les Halles matalalta (po-la), Palais-Royal ja Rivoli pohjoissivulta, itäpää. Rivi `komento concordemaa` pois.
3. Pyydä ajo JU:lta, ei omaa ajoa. Katso kuvat itse täysikoossa ennen KK:lle viemistä; koko kuva, ei vain kohta.
4. Tarkista kuvista: katoaako itäpään haalea reuna, peittävätkö talot porrasreunaiset korttelit (po-la x 1200–1500, y 1300–1600). Jos eivät, korjaus on KS:n.

## KK:N VASTAUKSET 09.3x (viety)
**KK kuittasi:** laivat jäävät, suodatinta ei tehdä; taivas poistettu listalta. co-45:n hahmo: jos näkyy seuraavassa ajossa, kerro KK:lle kohde, kun se on varmistettu.
- **Laivat:** ehto "yksi suodatin, eikä muuta muutu" ei täyty. Rakennuskerroksessa ei ole lajia (ElavaTyyli.cs:150); suodatin olisi keskipiste vedessä + Pariisi, vaatisi tyyliversion e16 → e17 ja poistaisi myös uimalan ja ravintolalaivat. Se, että laivat ovat tässä kerroksessa, on päätelty koodista ja väristä.
- **Taivaan vaakaraja:** peruttu, väite oli väärä. Riviero ilman UI:ta 2,3–3,0 / 765; rivin 96 ero oli nimipalkki. po-la:n 7,65 rivillä 496 on katsomatta kuvasta. Älä toista väitettä.
- **co-45 hahmo x 1000–1350, y 150–340:** häipyvä 3D-kohde, pilkut = NotreDameKirkko.shader:74 kohinaleikkaus. Opéra todennäköisin, Madeleine ei poissuljettu, ei projisoitu kuvaan.

## ODOTTAA
- KK: kattokortti omistajalle lähtenyt (v4 vai v6, suositus v6).
- PT: JU:n tieto ennen junaa: Y c0bfef077 ei läpäise tarkista.sh:n VALOVAHTIA (OhjelmaKohteet.cs vari 1, TaloKerros.cs vari 1, TaloKerros.shader varjostin 4). Poikkeus tai siirto Valopohjalle on PT:n päätös, ei KS:n tehtävä ennen sitä.

## Oppi
Nosta ero mittaamalla ilman käyttöliittymää: sama rivi kolmessa eri kamerassa on ruudun elementti, ei taivas. Tarkista myös, mitä kohteita vapautuva maski paljastaa (Saint-Eustache oli piilossa vain v2:n takia).

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
