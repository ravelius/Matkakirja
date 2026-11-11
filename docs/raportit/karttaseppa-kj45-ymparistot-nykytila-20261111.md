# KJ45: Pariisin 13 nähtävyyden ympäristöt, NYKYTILA (KS 11.11.2026, KK 16.30 jono 2)

Ajo: JU 17.21, käännös 03ad357fb (= juna-224 + syvyysveto), oletustalot (v16 = palat-v41-pp), 27/27 kuvaa, rc 0.
Kuvat: /Users/Shared/Claude/proto-3d/lokit/ks-kj45-ymparistot-03ad357fb (1000 px kopiot K/ymparistot-kj45/k1000).
ARKIT (rivi/kohde: peli ylhäältä | IGN-ilmakuva samalta alalta | peli viisto 45° etelästä):
K/ymparistot-kj45/kj45-arkki-1.jpg (Eiffel, Riemukaari, Notre-Dame, Sainte-Chapelle), -2 (Louvre, Panthéon, Invalidit, Opéra),
-3 (Sacré-Cœur, Grand Palais, Petit Palais, Orsay), -4 (Montparnasse). K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna.
IGN-ala vastaa pelin kuvaa: ~480 m leveä (Eiffel, Louvre, Invalidit), muut ~650 m (lähimmän tason raja). IGN-kuvissa on sumennettuja suojakohteita (ND, Palais de Justice).

## Puutteet kohteittain (vakavin ensin)

A. SUURET (kartta ei jatku kohteeseen, raivattu tila näkyy)
1. EIFFEL: torni seisoo tasaisen oliivinkeltaisen neliön keskellä (vanha Tripo-ajan pohja eiffel-pohja-haiv2; Eiffelillä EI PohjaPoisKoodilla, vaikka torni on koodimalli).
   Oikeassa: puiston puut ja polut tornin ympärillä, Champ de Mars'n nurmet ja puurivit, Quai Branlyn puut. Pelissä nolla puuta jalan ympärillä.
   Korjaus: PohjaPoisKoodilla Eiffelille → katukartta + puut näkyviin; tarkista, jääkö alle tyhjää (raivattu kartta).
2. SACRÉ-CŒUR: kirkon ympärillä laaja tasainen nurmi-/hiekka-ala; naapurirakennukset (Saint-Pierre de Montmartre, kirkon itäpuoli, pohjoisen korttelit) vain litteinä
   ruskeina pohjapiirroksina ilman taloja. Mäellä ei yhtään puuta (oikeassa Square Louise-Michel on metsäinen), etelän portaat yhtenä pitkänä valkoisena kaistana.
   HUOM: menee päällekkäin Montmartre v17:n (talot rinteessä, KJ43 yöviennin jälkeen) kanssa → ehdotus: SC:n ympäristö samaan Montmartre-erään.
3. GRAND PALAIS + PETIT PALAIS: molempien ympärillä tyhjät oliivinvihreät nurmet; Jardins des Champs-Élysées'n tiheä puusto puuttuu lähes kokonaan
   (oikeassa puut täyttävät GP:n länsi- ja eteläpuolen ja PP:n puutarhan). Talot paikallaan.

B. KESKISUURET
4. SAINTE-CHAPELLE: Palais de Justice'n alue suurelta osin matalina/litteinä kappaleina ja tasaisena vaaleana pihana; oikeassa yhtenäinen korkea rakennusmassa
   kappelin ympärillä (kappeli on pihan pohjalla). Kappeli itse pieni tummansininen katto ylhäältä.
5. INVALIDIT: esplanadi ja nurmet piirretty, mutta puurivit (esplanadin sivut, Dômen ympäristö, puutarhat länsi-/itäpuolella) puuttuvat; laajat tyhjät nurmet.
6. NOTRE-DAME: parvis'lla vaaleita haamukuvioita (vanhan pohjan tai arkeologisen kryptan jälki?) ND:n länsipuolella; muuten saari, puisto ja Hôtel-Dieu kunnossa.

C. PIENET / KUNNOSSA
7. LOUVRE: kunnossa; Carrousel'n puutarhan puut ja pensasaidat puuttuvat lännestä.
8. PANTHÉON: kunnossa (portiikki länteen kuten oikeassa); aukio tyhjää hiekkaa, rue Soufflot'n ja Lycée Henri IV:n puut puuttuvat.
9. MONTPARNASSE: kunnossa; tornin jalan länsipuolen matala siipi puuttuu; viistokuvassa torni leikkautuu yläreunaan (rajaus, ei vika).
10. ORSAY: kunnossa; ympäröivät korttelit paikallaan.
11. OPÉRA: kunnossa.
12. RIEMUKAARI: kunnossa (aukio ja kadut vastaavat ilmakuvaa).
13. EIFFELIN 1. KERROS (KK 16.45, kuva ym45-14): siniharmaa suorakaide = 1. kerroksen paviljonkien LASISEINÄT (EiLasi 0x6E787C, OhjelmaKohdeEiffel.cs:167–170),
    EI kerroksen alapinta eikä runko. Oikeissa paviljongeissa on lasiseinät, joten väri ei ole virhe; jos KK haluaa, sävy tummemmaksi/ruskeammaksi (EiLasi), 1 rivi.

## Ehdotus järjestykseksi (KK päättää rajaukset)
1) Eiffel: pohja pois koodilla + puut (suurin näkyvä puute, pieni koodimuutos). 2) GP + PP + Invalidit: puusto takaisin (yhteinen syy selvitetään: piirroskartan puut
raivattu Tripo-alueilta vai puuttuvat lähteestä). 3) Sainte-Chapelle: Palais de Justice'n talot. 4) ND:n parvis-kuviot. 5) SC Montmartre-erään.
Korjaukset yhtenä talot-eränä + parit samoista rajauksista (skripti sk-mac-ymparistot-kj45.txt).
