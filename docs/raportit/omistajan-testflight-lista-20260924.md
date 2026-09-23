# TestFlight-kokeilun tarkistuslista (build 3, 24.9.2026)

Lyhyt läpikäynti kohta kohdalta. "Puute" = tiedossa oleva ero build 2:een
tai kesken oleva asia — ei tarvitse raportoida uudelleen.

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

**4. Aloituskaupunki**
Pitäisi näkyä: 14 kaupungin ruudukko. Jos jätät valitsematta / käytät
oletusta: **matka alkaa nyt Lontoosta, ei Pariisista** — tarkoituksellinen
tarinamuutos (23.9. päätös), ei bugi.

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
Puute: **rosvon kaksintaistelu on poistettu pelistä kokonaan** (23.9.
päätös) — jos et näe sitä, se on oikein.

**10. Aarteen paljastus**
Pitäisi näkyä: oikean vastauksen jälkeen löytökuva, lyhyt faktateksti ja
lähdeviite, punnat lisääntyvät.
Puute: ei tunnettuja, testattu tänään ja toimi hyvin.

**11. Linssit (yleiskatsaus)**
Pitäisi näkyä: valitsin-lista kuvakkeineen, tumma odotuspeite avatessa,
selitekortti (väriskaala + maakortti).
Puute: **Maailmanradio näkyy jo listalla**, vaikka oma näkymä ei vielä
toimi — ei vielä käytettävissä.

**12. Keksinnöt-aikajana (linssi)**
Pitäisi näkyä: vuosiluku juoksee, valot syttyvät Euroopan kartalle.
Puute: aloituskortti ("Käynnistä") voi jäädä ruudulle hetkeksi ennen kuin
kaari lähtee käyntiin — kosketa korttia, jatkuu normaalisti.

**13. Muut linssit** (topografia, vesistöt, astronautti, vertailu, maatiedot)
Pitäisi näkyä: kaikki avautuvat ja piirtyvät kartalle sujuvasti.
Puute: ei tunnettuja, kaikki testattu tänään.

**14. Offline-lataus**
Pitäisi näkyä: asetuksista "Lataa offline-käyttöön" -lista maittain,
lataus etenee ja valmistuu.
Puute: ei tunnettuja — testattu tänään, toimi täydellisesti (733
osumaa offline-datasta verkottomana).

**15. Matkan huipennus** (kaikki 6 aarretta löydetty)
Pitäisi näkyä: "Aarnin luettelo on täynnä" -kortti, matkan tilastot
(päivät/kaupungit/aarteet), "Jatka vaeltamista" / "Uusi matka" -napit.
Puute: **korjattu tänään** — jos näet vanhan version (tyhjä ruutu tai
kaupunkivalinta jää päälle), kerro heti.

**16. Radio**
Pitäisi näkyä: EI VIELÄ MITÄÄN — radion oma näkymä ei ole tässä
buildissa. Odota seuraavaa.

**17. Sulavuus**
Pitäisi näkyä: tasainen liike, ei nykimistä missään kohtaa.
Puute: ei tunnettuja — mitattu tänään iPadilla, 0 tökkäystä paikallaan
ollessa (120 Hz).

---
Jos jokin muu kuin yllä mainitut "puutteet" tuntuu väärältä, se on uusi
löydös — kerro Fablelle.
