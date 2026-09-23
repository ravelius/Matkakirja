# TestFlight-kokeilun tarkistuslista (build 4, 24.9.2026)

Lyhyt läpikäynti kohta kohdalta. "Puute" = tiedossa oleva ero
edelliseen buildiin tai kesken oleva asia — ei tarvitse raportoida
uudelleen. Muutokset build 3:een nähden: kohdat 4, 14, 16 ja uusi
kohta 18.

**1. Asennus**
Pitäisi näkyä: TestFlight asentaa ja avaa suoraan.
Puute: ei tunnettuja.

**2. Portti (avausruutu)**
Pitäisi näkyä: pyörivä pallo, "Aloita seikkailu" -nappi, himmeä "Laita
äänet päälle".
Puute: ruutu ei kerro mistä pelissä on kyse ennen napin painamista —
tiedossa, ei tarvitse raportoida.

**3. Avausteksti**
Pitäisi näkyä: Heathrow'n koukku ("kuka repi kirjasta viimeisen sivun?").
Puute: ei tunnettuja.

**4. Aloituskaupunki (MUUTTUNUT)**
Pitäisi näkyä: sykkivät kultapisteet suoraan pallolla (ei ruudukkoa,
ei enää valintakorttia välissä) — napautus valittavaan kaupunkiin
valitsee HETI ja aloituslento Lontoosta alkaa. Matka alkaa aina
Lontoosta, ei Pariisista — tarkoituksellinen tarinamuutos.
Puute: jos näet vahvistuskortin ("Valitse toinen" / "Aloita täältä")
napautuksen jälkeen, se on vanhaa käytöstä jäänyt puute — kerro heti.

**5. Matka (kaupungista toiseen)**
Pitäisi näkyä: matkavalintadialogi (esim. bussi/liftaus), hinta vähenee
punnista.
Puute: ei tunnettuja.

**6. Saapuminen**
Pitäisi näkyä: merkkipiste kartalla, saapumisbanneri kaupungin nimellä
ja kuukaudella/vuodella.
Puute: ei tunnettuja.

**7. Kaupunkilehti**
Pitäisi näkyä: etusivu kuvineen, sivunkääntö ("Edellinen/Seuraava"-napit
aihenimillä), kaiutin oikeassa yläkulmassa.
Puute: sisällysluettelo (hampurilaisvalikko) ei ole vielä varmistettu
toimivaksi tässä buildissa — jos hampurilainen ei avaa listaa, tiedossa.

**8. Maan oma lehti**
Pitäisi näkyä: perustietolaatikko (väkiluku, pinta-ala ym.), kartta,
useita aiheita (historia, ruoka, keksinnöt...).
Puute: aihemäärä voi olla pienempi kuin web-versiossa — kesken, ei
tarvitse raportoida.

**9. Kysymykset**
Pitäisi näkyä: tavalliset kysymystyypit (visa, väite, kuva, pulma jne.),
vihje ja 50:50 -apu, aikaraja.
Puute: rosvon kaksintaistelu on poistettu pelistä kokonaan (23.9.
päätös) — jos et näe sitä, se on oikein.

**10. Aarteen paljastus**
Pitäisi näkyä: oikean vastauksen jälkeen löytökuva, lyhyt faktateksti ja
lähdeviite, punnat lisääntyvät.
Puute: ei tunnettuja.

**11. Linssit (yleiskatsaus)**
Pitäisi näkyä: valitsin-lista kuvakkeineen, tumma odotuspeite avatessa,
selitekortti (väriskaala + maakortti).
Puute: ei tunnettuja.

**12. Keksinnöt-aikajana (linssi)**
Pitäisi näkyä: vuosiluku juoksee, valot syttyvät Euroopan kartalle.
Puute: aloituskortti ("Käynnistä") voi jäädä ruudulle hetkeksi ennen kuin
kaari lähtee käyntiin — kosketa korttia, jatkuu normaalisti.

**13. Muut linssit** (topografia, vesistöt, astronautti, vertailu, maatiedot)
Pitäisi näkyä: kaikki avautuvat ja piirtyvät kartalle sujuvasti.
Puute: ei tunnettuja.

**14. Offline-lataus (MUUTTUNUT)**
Pitäisi näkyä: asetuksista lataus valittavissa maanosittain TAI
"Kaikki" kerralla; lataustila näkyy (ladattu / osittain / ei ladattu)
per maanosa.
Puute: ei tunnettuja.

**15. Matkan huipennus** (kaikki 6 aarretta löydetty)
Pitäisi näkyä: "Aarnin luettelo on täynnä" -kortti, matkan tilastot
(päivät/kaupungit/aarteet), "Jatka vaeltamista" / "Uusi matka" -napit.
Puute: ei tunnettuja.

**16. Radio (MUUTTUNUT — nyt mukana)**
Pitäisi näkyä: maailmanradion oma näkymä (pistenäyttö, viritysasteikko,
merkkivalo) toimii linssilistalta avattuna; asemat vaihtuvat maittain
napautuksesta tai virityksestä, useimmat soivat suoraan.
Puute: yksittäisiä asemia voi puuttua tai ne eivät vastaa (palvelimen
oma vika, ei sovelluksen) — jos SAMA asema epäonnistuu toistuvasti,
kerro asema+maa; satunnainen yksittäinen ei ole uusi löydös.

**17. Sulavuus**
Pitäisi näkyä: tasainen liike, ei nykimistä missään kohtaa.
Puute: ei tunnettuja — mitattu iPadilla, 0 tökkäystä paikallaan
ollessa (120 Hz).

**18. Aloituslennon esitys (UUSI)**
Pitäisi näkyä: Lontoosta lähtevä lento kohdekaupunkiin — DC-3-kone ja
savujana näkyvät koko lennon ajan, pilvet ja aurinko taustalla, kone
kaartaa laskeutuessa kohteeseen. Avausteksti alareunan kaistaleella ei
peitä konetta eikä valu kaistaleen ulkopuolelle.
Puute: ei tunnettuja — juuri korjattu, kerro heti jos kone jää tekstin
alle tai savujana puuttuu.

---
Jos jokin muu kuin yllä mainitut "puutteet" tuntuu väärältä, se on uusi
löydös — kerro Fablelle.
