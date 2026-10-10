# Pulu ISL: raportti (10.10.2026)

- Vastauksia: vaihe 1 = 150 (30 kohtaa x 5), vaihe 2 = 308 (linkkitaso), yhteensä 458.
- Kesto: noin 35 min (vaihe 0 mukaan lukien; agentit enintään 2 rinnakkain).
- Agentit: 10 kpl Sonnet (effort low), tokenit yhteensä noin 1 446 000 (vaihe 1: 608 000, vaihe 2: 838 000).
- Datan lataus: lataa-data.sh viittaa versioon v625, jota ei enää ole (404). Ajettiin kopiolla versiolla v649 (uusin löytynyt); repon skriptiä ei muutettu. fokuskohteet-isl puuttuu paketista (404, skripti ohittaa).
- Tarkistuksen virheet ja korjatut:
  - tarkista-era vaihe 1: 9 käsitemäärävirhettä (1 käsite) -> lisätty toinen [[linkki]]; sen jälkeen 1 pystyviivavirhe -> korjattu. Lopuksi 0.
  - tarkista-era vaihe 2: 16 virhettä (1 vastaus ilman JATKOT-riviä ja rivinvaihtovirhe, 15 käsitemäärävirhettä) -> korjattu. Lopuksi 0.
  - tarkista-valmis: lopuksi 0 virhettä, 1 varoitus (Golfvirta-vastauksessa mainitaan Meksiko tavallisena tekstinä, kunnossa).
  - Sisältökorjaukset (pistokoesäännöt 4-6): poistettu epävarmat sijoitus-/ensimmäisyysväitteet (Dettifossin ja Urriðafossin järjestys, maan vanhin maatalousoppilaitos / hirsitalot, Skálholtsskólin "ensimmäinen koulu", Leifur Eiríksson "ensimmäinen", Islands-lehden 1991/2021-sijoitukset, Akureyrin "12 asukasta" -anekdootti ja asutusvuosi).
- Faktapistokoetta (30 vastausta) ei ole ajettu: Päätoimittajan tai Laitetestaajan tehtävä.
- Paketti: pulu-esigenerointi/ISL/ISL.json; maat.json päivitetty (ISL: 202610101323).

## Pistokoekorjaukset 10.10.

Sisältökirjurin pistokokeen korjaukset (kaikki vastaukset, vaihe 1 ja 2, joissa aihe mainitaan; muita ei muutettu):
1. Ísafjörður/Hornstrandir: lähteetön väite tuomittujen karkotuksesta Hornstrandirille poistettu (1-4, 2-3 x2); tilalle "tuomitut poltettiin roviolla".
2. Flateyjarbók: Orkneyinga-saaga "säilynyt täydellisenä vain tässä käsikirjoituksessa"; "ainoa"-väite Färsaarelaisten saagasta poistettu (1-6).
3. Vatnajökull 1934: "noin 4,5 km³ (vanhemmat arviot 7–10 km³)" (1-3, 2-2 x2).
4. Eldfell 1973: alku noin klo 1.55; noin kolmannes rakennuksista (noin 400 taloa); evakuoituja yli 5 000; tuhkamäärä poistettu (1-2, 2-2 x5).
5. Látrabjarg: "yksi Euroopan suurimmista lintujyrkänteistä" (1-2 x2, 2-2 x2).
6. Grímsey: asukasluku vuoden 2026 alussa 47 (1-4, 2-3 x2).
Tarkistukset uudelleen: tarkista-era vaihe 1 ja 2: 0 virhettä; tarkista-valmis: 0 virhettä, 1 varoitus (Golfvirta/Meksiko, ok). Paketti ISL.json koottu uudelleen.
Huom.: Ísafjörður-vastauksessa 2-3 jäi muuttamatta (ei kuulunut tehtävään) väite "maan vanhin hirsitalojen ryhmä" (Neðstikaupstaður).
