# Taakse katsominen ja ele juostessa

`taunt_run` 2,4 s molemmille asuille. Puyi jatkaa juoksua, vilkaisee olkansa yli ja elehtii oikealla kädellä. Ääntä/huulisynkkaa ei ole tässä leikkeessä.

## Tuonti

12leikkeen kumulatiiviset motions/puyi-perus-liikkeet.glb ja motions/puyi-liikkeet.glb. Pohjana90d72c063:n11leikkeen morfikanavakorjattu kirjasto; kaikki vanhat kanavat ja näytteet säilyvät tavutarkasti, myös kaavun weights. Uusi taunt_run korvaa samannimisen vanhan leikkeen; älä poista kirjaston ulkopuolisia päämallin liikkeitä. Päämalli/riggi/lepopose/geometria/luupainot eivät muutu. Ei verkkoa/materialeja/kuvia liiketiedostossa.

+Y ylös,+Z eteen. Ulkoinen juuri[0,0,5*t], ei päälle toista juoksusiirtoa. ROOT-SAMPLES.csv ja parameters.json. Nimellisnopeus5m/s; muulla nopeudella tämä jalkakontaktitulos ei päde sellaisenaan. Liike alkaa run-lähdevaiheesta0,152s ja palaa perus0,96200018s/viitta2,17033344s. Run-toiston lähdenopeus1,9. Pelin0,18s ristiinhäivytys ja todellinen run-vaihe pitää vielä tarkistaa; paikallinen liittymäasentovertailu ei ole pelitesti. Ei automaattista land_soft-väliä. Kaavumorfi0: tauntissa ei weights-kanavaa ja sovittu1187-lukija nollaa sen.

## Tarkistukset ja tunnettu rajoitus

Koko verkon lattia960Hz, nivelkulmat ja oikean käden paikalliset vartalokolmiot240Hz: molemmat PASS. Lattia vähintään0,571mm/perus ja0,684mm/viitta; käsi–vartalo-risteämänäytteitä0; suurin nivelaskel12,50°/12,12°240Hz. 8 paikallista still-asentoa/asumalli takaa yläviistosta ja edestä tarkistettu.

**Jalkatestiä ei kuitata kokonaan läpi.** Tiukka6mm-laajuinen saappaan pohjan lähialueen testi jää FAIL: liikkuvan reunan suurin ero8,93mm/perus ja7,42mm/viitta. Sama geometrinen kärki, joka on sekä kontaktin keskellä että tarkistushetkellä4mm sisällä lattiasta: suurin ero6,10mm/perus ja3,30mm/viitta; kontaktipistejoukon mediaanin pahin ero0,485mm/0,126mm. Nilkan lukitusvirhe enintään0,235mm. Kengän alkuperäisissä luupainoissa on säären vaikutusta, joten pohjan reuna muuttaa muotoaan vaikka nilkka pysyy paikallaan. Alkuperäisiä luupainoja ei vaihdeta tässä animaatiotoimituksessa. Tiukka epäonnistunut QA on mukana sellaisenaan, ei peitetty hyväksytyksi.

Tämä on pelitarkistukseen tarkoitettu toimitus tunnetulla pienellä kenkärajoituksella. Koko vaatteen itseleikkauksia ja viitan aiempaa kainalovirhettä ei ole tällä testillä todistettu korjatuiksi. Ei pelin hyväksyntää eikä omistajan hyväksyntää. Tarkista erityisesti juoksuun siirtymä ja pohjan näkyvyys varsinaiselta takaa seuraavalta kameralta.

Ei Tripo-/kuvagenerointeja tai krediittejä. Tarkistetut full-mallit ovat SOURCE-FILES.jsonin paikallisissa poluissa; niitä ei korvata peliin eikä lisätä gitiin.
