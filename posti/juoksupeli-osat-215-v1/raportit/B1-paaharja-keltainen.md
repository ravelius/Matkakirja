Toimituksessa valittu pinta: `pinnat/1268-paaharja-keltainen.png`. Kehote: `prompts/B1-paaharja-keltainen.txt`. Alla tuotannon lähde- ja tarkistusraportti; native-polut viittaavat säilytettyihin paikallisiin alkuperäisiin.

# B1 / #1268 — pääharjan keltainen koristenauha

## Tilaus

Pelikoodarin yhteistilaus `posti/pelikoodari-codex-juoksupeli-osat-215-20261029.md`, commit `084f144e819e2a39b546911df1674d2d6a80cf28`, blob `0037d8bd8237c0584e1e2f53f9e1f81ff6642fe2`. Päälähteen A/B-jako ratkaisee liitteiden vanhat päällekkäisyydet. Tämä osaraportti kattaa vain B1:n 2D-pinnan.

Paikallinen lähdekansio: `output/fable-mailbox-work-orders/attachments-20261029-1926/`.

Luettu kokonaan päälähde ja `pelikoodari-codex-juoksupeli-osat-215-20261029/halli-03/tilaus-taihedian.md`. Katsottu viitekuvat samasta halli-03-kansiosta:

- `1-chiwen.png`: oikean alakulman vaakasuora keltainen harjanauha. Chiwen-hahmo ei kuulu tähän kuvaan.
- `k-katto-vasen.png`: harjanauhan sijainti ja kullankeltainen materiaaliperhe.
- `k-julkisivu.png`: yleinen paletin ja pintojen yhteys.

Viiterajaus on pieni ja sumea. Pilvikiehkura on tilauksen kohokuviointia vastaava tyylillinen tulkinta, ei väite historiallisen yksittäisen tiilen täsmällisestä reliefistä. Materiaalin varjoja tai ympäristöä ei kopioitu viitteistä.

## Tuotanto ja valinta

Sisäänrakennettu `image_gen`; ei CLI/API-varatietä. Kolme uutta kokonaista generointia:

1. Hylätty: reliefin ja vaakalistojen varjot olivat leivottuja kuvaan.
2. Hylätty: lievää kohokuvion varjostusta jäi; monen reunakoristeen sommittelu ei sopinut vientiin yhtä hyvin.
3. Valittu: litteä, kahden lähekkäisen keltaisen pigmentin pilvikuvio ilman suunnattua bevel-valoa tai varjoa. Alkuperäinen säilyy `native/B1-attempt3.png`.

Lopullinen kehote: `prompts/B1-attempt3.txt`. Kaikki kehoteversiot ja alkuperäiset ehdokkaat säilytetään.

Vientikäsittely: alkuperäisestä 2172 × 724 kuvasta rajaus `[76,110,2090,614]` valittiin kuvion jatkumokohdista. Sen jälkeen yksi Lanczos-vienti kokoon 2048 × 512. Ei maalausta, kloonausta, paikallista korjausta, saumojen sekoitusta tai sisällön vaihtamista.

## Käyttö ja tarkistus

- Tiedosto: `final/B1-paaharja-keltainen-v1.png`, 2048 × 512, RGB, peittävä PNG.
- Käyttö: yksi jaettu sRGB-värimateriaali pääharjan nauhalle. Toisto U-suunnassa; ei V-toistoa.
- Kyseessä on 2D-väripinta. Kuva ei sisällä normal- tai korkeuskanavaa. Valoseppä päättää pelimateriaalin kiillon ja valaistuksen.
- Todellista metristä toistojaksoa ei ole annettu lähteessä. UV-mittakaava asetetaan vastaanottajan todelliseen harjageometriaan; mittoja ei ole arvattu.
- Vaakasuuntainen toisto tarkastettu kahden peräkkäisen kuvan esikatselusta (`esikatselu/B1-toisto-2x.png`). Listat ja pääkuvio jatkuvat ilman selvästi erottuvaa katkosta. Reunapikselit eivät ole identtiset: keskimääräinen RGB-ero 6,54 / 255, enimmäisero 72 / 255. Jäljellä on pigmentin ja hienon tekstuurin vaihtelua; QA ei väitä matemaattisesti identtistä saumaa.
- `qa/QA.json` sisältää vientitiedot, SHA256:n ja valinnan. Rootin loppuarvio, PK:n vastaanotto, PT:n hyväksyntä ja pelinäyttö ovat erillisiä.

Vanhoihin 1067–1071-pintoihin, kourutiilikattoon, 3D-osiin tai yhteiseen ledgeriin ei tehty muutoksia. Postitoimitusta ei ole tehty tästä agentista.
