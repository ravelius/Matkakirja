# Pulu DNK: raportti

- Vastauksia: vaihe 1 = 230 (46 kohtaa x 5), vaihe 2 = 458 (linkkitaso), yhteensä 688.
- Kesto: noin 43 minuuttia (vaihe 0 -> paketti).
- Agentit: 20 Sonnet-agenttia (effort low), enintään 2 rinnakkain: 10 vaihe 1, 6 vaihe 2, 4 käsitekorjausta (2 + 2). Tokenit yhteensä noin 2,5 miljoonaa (agenttien raportoimien lukujen summa, likiarvo: vaihe 1 noin 0,92 milj., vaihe 2 noin 1,27 milj., korjaukset noin 0,27 milj.).
- Tarkistus (tarkista-era.mjs): vaihe 1 alussa 65 virhettä (64 käsitemäärää 1 tai 0 + 1 liian pitkä uusi kysymys 31.3), vaihe 2 alussa 34 (käsitemäärä). Kaikki korjattu (käsitekorjausagentit + 31.3 lyhennetty). Lopputulos: vaihe 1 virheitä 0, vaihe 2 virheitä 0.
- Tarkistus (tarkista-valmis.mjs): lopussa virheitä 0, varoituksia 0. Matkan varrella yksi rivinvaihtovirhe (vastaus 7.x Burchardin tulva, yksi \n -> tyhjä rivi) korjattu.
- Faktapistokoe (superlatiivit: suurin/ensimmäinen/vanhin/korkein): luettu läpi koneellisella poiminnalla. Korjattu: "Tanskan suurin yhtenäinen hiekkanummi" (Hanstholm, 5 kohtaa) -> "laaja yhtenäinen hiekkanummi" (varmistamaton). Møns Klint -maailmanperintöväite oli oikaistu agentin toimesta aineiston mukaan. Muu pistokoe jäi kevyeksi: Råbjerg Mile "Pohjois-Euroopan suurin liikkuva hiekkasärkkä", Frederiksborg "Skandinavian suurin renessanssiasunto", "Tanskan historian suurin rakennushanke" (Storebælt 1986) kannattaa varmistaa ihmisen silmällä.
- PAIKKA-rivejä: vaiheessa 1 muutamassa vastauksessa (erä 2 koordinaatit muistinvaraisia: Ribe, Frederiksborg); erät 8–10 ilman. Suositus: tarkista tai poista erän 2 ja 6 PAIKKA-rivit ennen vientiä.
- Paketti: pulu-esigenerointi/DNK/DNK.json (46 kohtaa, 230 + 458 vastausta). maat.json päivitetty (DNK 202610100141). FRA/ ei muutettu.
