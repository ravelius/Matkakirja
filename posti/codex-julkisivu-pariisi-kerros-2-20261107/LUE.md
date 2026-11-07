# Pariisin julkisivupalan uusi maalattu otto · #2195

Toimituksessa on yksi kokonaan uusi 1024 × 1024 harmaasävyinen PNG, pariisi-julkisivu-kerros.png. Tasan yksi ikkunaväli ja yksi kerros. Tarkistus-4x4.png on saman palan suora 4 × 4 toisto koossa 4096 × 4096. Tarkistus-128.png on palan 128 × 128 pienennös.

## Työkalu, alkuperä ja valinta

Tehtiin yksi kokonaan uusi otto sisäänrakennetulla OpenAI ImageGen -työkalulla. Käytetty kehote on prompt.txt. Lähdetilaus on posti/pt-codex-julkisivu-uusi-otto-20261107/LUE.md, commit e3684073bd5e4813d1e5cdafe5a6678bab6986a5, blob 518ba6e81d6fb34d84a08c87e7e620cb5f93bf96.

Ennen tuotantoa katsottiin tilauksen vertailu-arkki.jpg ja G-tyylikuva. Vertailuarkin SHA-256 on ad3f29da1386f52e1b9a8008531a8fd92ea141c21057d365b65b96c6925c5a6a. G-tyylikuvan SHA-256 on 692ff29f2c330a77d56dd6dd2f6bd50c4822d404ff128365b57cdd51b8fa2bde. Molemmat varmennettiin tavuista. G:n maalattujen talojen käsialaa sovellettiin yleiseen julkisivuun.

Valitussa kuvassa on korkea kapea tumma ikkuna, hento pystyjako, suhteellisen ohut kivikehys, alhaalla yhtenäiseksi muodoksi pelkistetty ranskalainen parveke ja ohut kerroslista. Kivi on maalattu laajoin pehmein sivellinlaikuin.

## Reunojen tasaus lähteen kohdan 8 mukaisesti

Generaattorin 1254 × 1254 kuva muunnettiin Pillow'lla harmaasävyiseen L-muotoon ja pienennettiin Lanczos-suodatuksella 1024 × 1024 kokoon. Sen jälkeen käsiteltiin molemmin puolin 64 pikselin reunakaistat. Vastakkaiset pikseliparit vietiin asteittain kohti yhteistä keskiarvoaan kosinipainolla. Ulkoreunassa paino on yksi ja 63 pikseliä sisempänä nolla. Ensin tasattiin vasen ja oikea kaista, sitten ylä- ja alakaista. Arvot pyöristettiin 8-bittisiksi harmaasävyiksi. Menetelmä koskee myös kulmia.

Lopputiedoston ensimmäinen ja viimeinen sarake ovat pikselilleen samat, samoin ensimmäinen ja viimeinen rivi. Molemmat maksimierot ovat 0/255. Myös 4 × 4 tarkistuskuvan kaikki kuusi sisäsaumaa tarkistettiin tallennetusta tiedostosta ja niiden vierekkäiset rivit tai sarakkeet ovat samat. Keskustan 896 × 896 aluetta reunakäsittely ei muuttanut. Reunakäsittelyn suurin yksittäinen muutos oli 25/255 ja koko kuvan keskimääräinen muutos 0,459/255. QA.json sisältää tulokset.

## KK:n arvioon nostettu kohta

Kerroslistan alapuolella on ohut tumma maalattu reuna, joka voi näyttää kevyeltä varjolta. Tämä on kuvassa näkyvä mahdollinen poikkeama, joka kuuluu KK:n tyylitarkastukseen. Tekninen saumattomuus, harmaasävyisyys ja kokovaatimukset läpäisivät tarkistukset. Tyylin hyväksyntä odottaa KK:ta ennen muita paloja.

Aiempi #2194-toimitus säilyy omassa kansiossaan hylätyn tyylin historiatietona. Pelikytkentä ja julkaisu odottavat erillistä vaihetta.
