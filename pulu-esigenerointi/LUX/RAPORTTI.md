# Pulu LUX: raportti (10.10.2026)

- Vastauksia: vaihe 1 = 80 (16 kohtaa × 5), vaihe 2 = 156; yhteensä 236.
- Kesto: noin 15 min (vaihe 0 mukaan lukien; ajettu 2 agenttia rinnakkain).
- Agenttien tokenit yhteensä: noin 952 700 (8 Sonnet-agenttia, effort low: vaihe 1 erät 4 kpl, linkkikorjaukset 2 kpl, vaihe 2 erät 2 kpl).
- Data: v625 oli poistunut ämpäristä (404), joten lataus ajettiin v651:llä (väliaikainen kopio lataa-data.sh:sta, työkalua ei muutettu). `fokuskohteet`/`maastokohteet` -paketteja ei LUX:lle ole.
- Tarkistus:
  - tarkista-era vaihe 1: aluksi 23 virhettä (käsitemäärä 0–1, erät 1–2), korjattu lisäämällä [[linkit]]; lopuksi 0 virhettä.
  - tarkista-era vaihe 2: 1 virhe jäljellä (#128 Rockhal, 1 käsite; sallittu yksittäinen käsitemäärävirhe).
  - tarkista-valmis: 0 virhettä, 3 varoitusta (Yhdysvallat Emma Kuhn -tarinassa Useldangessa, tarkistettu: kuuluu aineistoon).
- Faktojen pistokoetta (30 vastausta) ei ajettu; agentit raportoivat muistinvaraisiksi: Steichenin vuodet (V2 #6, #8), suurherttua Jean (#33), Carnot (#65), Luxemburgin liittäminen Ranskaan 1795 (#57), luxemburgin kielen asema 1984 (#74), Honorius II, Monnet, Ludvig XIV, Kaarle IV (erä 2-2). Tarkistettava ennen julkaisua.
- Paketti: pulu-esigenerointi/LUX/LUX.json (16 kohtaa, 80 + 156 vastausta); maat.json päivitetty (LUX-rivi).

## Pistokoekorjaukset 10.10.

Korjattu vastaukset-*.txt-tiedostoihin (vaihe 1 ja 2, kaikki maininnat), tarkistukset ajettu uudelleen ja paketti koottu uudelleen:
1. Larochette: linna hiekkakivikielekkeellä noin 50 m laakson yläpuolella (oli 150 m); 7 vastausta.
2. Luxemburgin linnoitus: purku 16 vuotta, yli 1,5 milj. kultafrangia, noin 23 km:n kasemattiverkostosta säilyi noin 17 km (oli "tuhosi yli 24 km"); 2 vastausta.
3. Esch-sur-Alzette: väkiluku runsaasta 1 500:sta (1851) yli 16 000:een (1910) (oli "kymmenkertaistui"); 2 vastausta.
4. Altmünster: "veljensä Rudolf" poistettu (myös [[Rudolfin]]-linkki V1:stä; V2:n Rudolf-vastaus kirjoitettu uusiksi epävarmaksi, joten avain jäi orvoksi); "ainoa oppilaitos" → koululla opetusmonopoli Luxemburgin kaupungissa; 5 vastausta.
5. Wiltz: päärakennus noin 1720, puutarhaportaikko 1727; viimeinen kreivi lähti linnasta 1793 (oli "kuoli"), myös jatkokysymys.
6. Bourscheid: ulkomuuri 1384 (oli 1350); Stolzembourgin talon vuosi (1384) poistettu, koska se oli samalla perusteella epävarma; 4 vastausta. Bourscheidin "noin 150 m" jätettiin ohjeen mukaan koskematta.
7. Useldange: kunnantalo (ei kaupungintalo); V2-käsite "kaupungintalona" → "kunnantalona" (tehtavat-2.json, tehtavat-2-N.txt). Esch-sur-Alzetten kaupungintalo säilyi.

Tarkistus: vaihe 1 virheitä 0; vaihe 2 virheitä 1 (Rockhal #128, entinen); tarkista-valmis virheitä 0, varoituksia 3 (Yhdysvallat/Emma Kuhn, ennallaan).
