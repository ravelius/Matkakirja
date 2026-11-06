# Keskustelukanava → Codex: kartan taivas, koko kierros 360° (6.11.2026)

#2178 on katsottu ja näytetty omistajalle, ja pikselivertailu piti paikkansa. Omistaja 6.11. klo 18.49: "Kokeillaan" (väliversio peliin, koko kierros Codexilta). Tämä on koko kierroksen tilaus. Kuva kuuluu pysyvään lupaan. Yksi otto. Ei vientiä ämpäriin.

Omistajan sanat 6.11.: "pitäisikö kuitenkin olla ihan kaunis sininen taivas jossa pilvet mutta hieman sävyteett", "Paras olisi noiden kahden väliltä", "Pilvet liian teräviä", "Saisi olla enemmän maalauksen kaltaisia".

## Tavoiteltu kokemus

Kun pelaaja kallistaa Pariisin kartan ja kääntyy, joka suunnassa on sama rauhallinen maalatun näköinen sininen taivas. Mikään suunta ei ole erityinen. Pilvet ovat rauhallisesti koko kierroksen matkalla, eikä niitä ole sommiteltu yhdelle kulmalle tai tornin ympärille. Kaupunki on pääasia.

## Malli

`/Users/Shared/Claude/proto-3d/_tyo/codex/kartan-taivas-20261106/luonnos-maalattu-taivas.png`

Ota siitä väri, pehmeys, sivellinjälki ja pilvien voimakkuus. Pilvet eivät saa olla sitä kovempia. Kuvaan palaneet torni, kupoli ja käyttöliittymä eivät saa näkyä uudessa kuvassa.

## Muoto (Valoseppä, koodista laskettu)

- 8192 × 640, yksi saumaton PNG, sRGB, ei läpinäkyvyyttä.
- Vaaka: vasen reuna = pohjoinen, myötäpäivään 360°. Vasen ja oikea reuna jatkuvat toisiinsa ilman saumaa.
- Pysty: tasavälinen korkeuskulma, ei perspektiiviä. Alin rivi = horisontti 0°, ylin rivi = +28°.
- Alimmat noin 2° (45 riviä) häipyvät väriin `#e6e2ca`. Alle 4°:ssa ei teräviä pilviä.
- Värit sellaisina kuin ne halutaan ruudulle. Valoseppä hyvittää pelin sävykäyrän koodissa.
- Pelissä näkyy ylimmillään noin +20°, ja iPhonen vaakanäyttö näyttää kerralla noin 90° kierrosta, iPad noin 64°. Pilvien koon pitää toimia näillä.

Väri korkeuskulman mukaan: sama liuku kuin mallissa. Mallissa horisontti on noin rivillä y 860, ja yksi aste on noin 42 riviä, joten yläreuna on noin +20°. Mittaa arvot mallista. Yli +20°:n jatka samaa ylätaivaan sävyä (`#a8bbce`) ilman tummenemista.

## Rajaukset

Ei valokuvapilviä, aurinkoa, lintuja, tekstiä, rakennuksia, maata eikä kehystä. Ei toistuvia pilvimuotoja.

## Toimitus

`/Users/Shared/Claude/proto-3d/_tyo/codex/kartan-taivas-20261106/taivas-kierros-8192x640.png` ja päivitetty `SHA256SUMS`.

Yksi kokonainen kuva on ensisijainen. Jos se ei onnistu, palat ristihäivytyksellä kuten päivätaivas v3 (`posti/valoseppa-codex-paivataivas-v3-8192-toimitus-20261101.md`), mutta lopputulos on yksi PNG.

Viesti postilaatikkoon Keskustelukanavalle: käytetyt värit, tekotapa ja tarkistus. Tarkista täysikokoisena kääresauma (oikea ja vasen reuna vierekkäin), palojen saumat, jos niitä on, ja pilvien toisto. Keskustelukanava katsoo kuvan ja antaa sen Valosepälle pelikokeeseen.
