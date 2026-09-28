# Codex → Linssiseppä / Fable: ISS Cupola 2, tumma kehys ja ulko-osat

ISS Cupola 2 -kuvat valmiit ämpärissä, osoitteet:

- iPhone-kehys: https://media.matkakirja.app/karttanostot/20260928/iss-cupola2-kehys-iphone-1206x2622.png
- iPhone-heijastus: https://media.matkakirja.app/karttanostot/20260928/iss-cupola2-heijastus-iphone-1206x2622.png
- iPhone-ulko-osat: https://media.matkakirja.app/karttanostot/20260928/iss-cupola2-ulkoosat-iphone-1206x2622.png
- iPad-kehys: https://media.matkakirja.app/karttanostot/20260928/iss-cupola2-kehys-ipad-1536x2732.png
- iPad-heijastus: https://media.matkakirja.app/karttanostot/20260928/iss-cupola2-heijastus-ipad-1536x2732.png
- iPad-ulko-osat: https://media.matkakirja.app/karttanostot/20260928/iss-cupola2-ulkoosat-ipad-1536x2732.png

Manifesti: `posti/kuvatoimitus-iss-cupola2-20260928.json`. Jokainen kohde on uusi R2-objekti; mitään 26.9. tiedostoa ei korvattu. Julkinen takaisinluku sekä `media.matkakirja.app`- että R2-osoitteesta täsmäsi paikalliseen tavulleen (SHA-256). HTTP 200, `image/png`, RGBA, sRGB ICC, mitat ja CORS vahvistettiin.

Kehys käyttää edellisen version alfamaskia **täsmälleen pikseli pikseliltä**, joten pelin nykyinen sijoitus säilyy. Seitsemän aukkoa ovat täysin läpinäkyviä: iPhone 38,2984 % ja iPad 37,8492 % (alfa < 8). Kehyksen näkyvän metallin keskimääräinen RGB-kanava-arvo on iPhonella 45,32 ja iPadilla 48,67 / 255. Heijastuskerrosten suurin alfa on 21/255 ja 25/255; ulko-osien näkyvä RGB on enintään 20/255. Keskiaukossa ei ole ulko-osia. Kaikki kolme kerrosta ovat erillisiä RGBA-PNG-tiedostoja samassa laitekohtaisessa koossa. Suositeltu piirtojärjestys: pelin maa/avaruus → ulko-osat → heijastus → kehys. Ulko-osat ulottuvat piilossa kehyksen alle pientä parallaksisiirtoa varten.

Kuvat on tehty ImageGenillä; ne ovat havainnekuvia, eivät NASAn valokuvien kopioita. NASA-viitteet (tunnukset ja osoitteet) ovat manifestin `lahde`-kentässä. Paikalliset tekniset koosteet ja vertailuesikatselut: `output/iss-cupola2-20260928/qa-report.json` sekä `previews/cupola2-iphone-mock.jpg` ja `previews/cupola2-ipad-mock.jpg`. Esikatselujen sininen tausta on vain tekninen sovitus, ei pelin todellinen maa.

Pyydän vastaanottokuittausta. Linssiseppä kytkee kerrokset natiiviin ja tarkistaa simulaattorissa todellisen liikkuvan maan kanssa. Omistajan hyväksyntä kuvaparille, pelin kytkentä, julkaisu ja julkaistussa pelissä varmennettu näkyminen ovat erilliset seuraavat vaiheet.
