# Pienoismallit puuttuvat: 7 vanhaa kohdetta (2026-09-21)

Löydetty pienoismallitarkistuksessa (Amsterdam/Bergen/Ateena/Wien):
nämä 7 ovat vanhoja `bare-id`-viittauksia (`js/media.js assetOsoite`,
odottaa PNG:tä ämpäristä `kohtaamiset/miniatyyrit/<tunnus>.png`), eivät
Codexin 97-erässä, ja palauttavat 404:n. Eivät ole repossakaan valmiina
(tarkistettu `assets/kartat/miniatyyrit/`). Sama tyyli kuin 97-erän
tilaus: yksivärinen seepiamusteluonnos, kevyt karikatyyri, muutama
varma viiva, paperinvärinen tausta, kohde tunnistettavana siluettina,
ei tekstiä. Tapahtumakohteet (Maratonhuijaus, Elginin marmorit)
piirretään tunnistettavana esineenä/hetkenä, ei henkilön muotokuvana.

| Kaupunki | Kohde | Nykyinen viite | Piirrettävä aihe | Ehdotettu tiedostonimi |
| --- | --- | --- | --- | --- |
| Ateena | Akropolis-museo | `js/packs/maakartat.js:4466` (`nosto: 'akropolis-museo'`) | Moderni lasi- ja kivirakennus Akropoliin kallion juurella, lasilattian alla näkyvä kaivaus. | `ateena-akropolis-museo.webp` |
| Ateena | Iliou Melathron | `js/packs/maakartat.js:4478` (`nosto: 'syvennys-ateena-schliemann'`) | Schliemannin koristeellinen 1800-luvun kaupunkipalatsi Ateenassa, friisissä kaivava hahmo. | `ateena-iliou-melathron.webp` |
| Ateena | Maratonhuijaus | `js/packs/maakartat.js:4495` (`nosto: 'skandaali-belokas-maratonhuijaus-1896'`) | Tapahtuma 1896: hevoskärry pölyisellä maratonreitillä lähellä tienviittaa — ei juoksijan muotokuvaa. | `ateena-maratonhuijaus.webp` |
| Ateena | Elginin marmorit | `js/packs/maakartat.js:4500` (`nosto: 'skandaali-elginin-marmorit'`) | Tapahtuma 1801–: Parthenonin friisin marmoripaneeleita nostetaan purjelaivan kannelle Akropolin juurella. | `ateena-elginin-marmorit.webp` |
| Ateena | Diogeneen astia | `js/packs/maakartat.js:4505` (`nosto: 'syvennys-ateena-diogenes'`) | Suuri savinen pithos-astia Agoran laidalla, antiikin rauniot taustalla. | `ateena-diogeneen-astia.webp` |
| Ateena | Niken temppeli | `js/packs/maakartat.js:4510` (`nosto: 'syvennys-ateena-nike'`) | Pieni ioninen temppeli (Athena Niken pyhäkkö) Akropoliin lounaisbastionilla. | `ateena-niken-temppeli.webp` |
| Wien | Vuoristovesijohto | `js/packs/maakartat.js:5189` (`nosto: 'syvennys-wien-vesijohto'`) | Kivinen akvedukti ylittämässä laaksoa vuoristomaisemassa (Ensimmäinen Wienin vuoristovesijohto, 1873). | `wien-vuoristovesijohto.webp` |

Sisältötekstit (juttu, ei muutettu): `js/packs/nahtavyysjutut.js` —
Ateena-lohko riviltä ~5773, Wien-lohko riviltä ~3669.
