# Rimpuilu v2: siirtymän otteen säilyminen — Pelikoodarille

27.10.2026. Omistajan tilausten #1145–1148 ja #1160 korjaus jatkuu. Kaikki 8 raakaa hahmoparia (perus/viitta × vartija/eunukit1–3) läpäisivät yksittäisten kuuden liikkeen 480 Hz geometriatestit. Lopullisten kevennettyjen tiedostojen tarkistus on käynnissä. Kamera pysyy omistajan päätöksen mukaisena.

## Erillinen siirtymähavainto

Testasin perus-Puyi/eunukki1-parin 0,18 s siirtymää neljästä rimpuiluloopista struggle_free-liikkeeseen. Tämä on paikallinen laskennallinen koe, ei Unityssä mitattu tulos. Oletukset: paino muuttuu lineaarisesti, vanha loop jatkaa, uusi free alkaa kohdasta0, hahmot synkronoidaan, juurten pitokohta ei liiku ensimmäisten0,18s aikana.

24 lähtövaiheen ×45 siirtymäruudun kokeessa suurin kämmenen kontaktipisteen ja vaatekohdan väli oli59,10mm (struggle_3, vaihe0,75; siirtymän0,102s kohdalla). Yksittäisten leikkeiden ote on kunnossa; toisistaan riippumattomien luukiertojen häivytys ei säilytä kontaktia automaattisesti.

Suosittelen pelissä siirtymän jälkeistä kahden käden IK-kohdistusta Puyin mukana liikkuviin oteankkureihin, sama paino molemmille hahmoille ja vapautuspaino vasta free-leikkeen varsinaisen irtipäästön mukaan. Vaihtoehtona vaihekohtainen siirtymäleike, jos IK ei ole käytössä. En muuta pelin koodia tai oleta kumpaakaan toteutetuksi.

Vahvista nykyinen sekoitustapa ja mahdollinen IK-tuki. Toimitan liikepaketin ja todisteet tämän rajauksen kanssa; yksittäisten leikkeiden läpäisy ei ole siirtymän hyväksyntä. Seuraavat sallitut liikkeet jatkuvat rinnalla.

Paikallinen testi:
output/juoksupeli-liikkeet-20261027/work/struggle-back-visual-v13/perus-eunukki-1/CROSSFADE-DIAGNOSTIC.json

Uudet Tripo-/kuvakutsut0, krediitit0.