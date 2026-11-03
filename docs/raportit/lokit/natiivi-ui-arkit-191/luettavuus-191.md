# Natiivi-UI: luettavuuskierros 191 (PT 14.10.2026), 14.10. klo 21.3x

Simu, oikea kartta ja kuvat, iPhone pysty + iPad vaaka. NYK = juna 190 -sovellus (luettnyk-ajot 20.28–21.12),
UUSI = natiivi-ui/luettavuus-191 f252d202f (luettuusi-ajot 21.12–21.27). Skenaariot: natiivi-ui-ajoskriptit-20261012/sk-luett-*.txt.

## Korjattu (UUSI, f252d202f)
Vaalea teksti ohuella tummalla varjolla (0 1px 2px) katosi vaalean kartan päälle Lontoossa, Venetsiassa ja Ateenassa:
- ilmoitus ("Kartta tallennettu matkakirjaan")
- pelikello (kello ja PÄIVÄ-rivi)
- offline-rivi ("Ei verkkoa · ei ladattuja maita")
Korjaus: kartan oma tekstityyli (--map-ink-92 + 0 0 4px kerman hehku, sama kuin kartuscha, selite ja kohdekartta). Ei uusia tyylejä.
Arkit: luettavuus-191-{lontoo,ateena}-{iphone,ipad}.png

## Heikko, EI korjattu (PT:n/omistajan päätös)
- Pulun taulu ("Minne katsotaan?") pilvisen maapallon päällä: vaalea teksti hukkuu valkoisiin pilviin (iPhone ja iPad).
- Oppaan valikko, nimilappu ja Aika ja sää vaalean taivaan ja rakennusten päällä. Simussa rakennukset ovat teksturoimattomia
  ja valkoisia (ASTC puuttuu), joten simu liioittelee; taivaan päällä sama myös laitteella.
  Tekstivarjotyylejä vahvempaa olemassa olevaa ei ole (kutsunimen korjauskin on 0 1px 2px). Ainoa olemassa oleva keino on
  pehmeä himmennysliuku (Tyylikirja.Himmennys, kuten taidemuseon otsikon tausta), mutta se muuttaa omistajan "valikot
  läpinäkyviksi" -päätöstä, joten en tehnyt sitä. Arkki: luettavuus-191-ehdotus-linssit.png

## Ei saatu näkyviin tällä kierroksella (skenaario)
ISS-ohjaamo (paneeli, lista), ajattelijan lappu, aikaselain (keksintöjen aloituskortti peitti), maakyltti, nostoselaimen lappu,
Pulun chat ja avauskortti (ikäkysely peitti). Muut katsotut (karttaselite, kartuscha, kohdekartan mittajana ja lähde,
astronautin kuvan selite, radio, maapallon vuosi, vertailu) luettavia.

## Sivuhavainto (ei tämän erän muutos)
Pelikello osuu lennossa suurennuslasin (ja iPadilla ☰:n) päälle oikeassa yläkulmassa, sekä NYK että UUSI.
