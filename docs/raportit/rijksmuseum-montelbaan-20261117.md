# Rijksmuseum yhdeksi nimeksi + Montelbaanstoren 1852 (SK, KK 17.11.2026 klo 03.10)

## Rijksmuseo → Rijksmuseum (taivutuksineen)
57 esiintymää 4 tiedostossa: js/linssit/museo-kysymykset.js 42, js/packs/fokusvirta-amsterdam.js 7, js/packs/nahtavyysjutut.js 7,
docs/raportit/pulu-amsterdam-kasin-20261117.md 1 (Rijksmuseon → Rijksmuseumin, -lle → -ille, -oon → -iin, -ossa → -issa).
git grep "Rijksmuseo" js/ ja Pulun raportti = 0.
Ei muutettu (KK 03.13: vain jos pelaaja näkee tai kuulee tekstin): docs/kohtaukset/museoteokset/kohdat-alankomaat.json (38), lyhyt-alankomaat.json (6)
ja docs/kohtaukset/kaupunkiesittelyt/amsterdam.json (1). Tarkistus: git grep koodista (js, tools, data, natiivi) ei viittaa tiedostoihin; kohdat-alankomaat.json:n
tekstin alku ("Mustapukuinen kapteeni johtaa komppaniaa") löytyy koko repon git grepillä vain tästä JSONista, ei js/data/natiivi-tiedostoista; amsterdam.json:n
osuma on `muutos_sk`-muutosmuistiinpanossa (ei pelitekstiä). Pelin museotekstit tulevat js/linssit/museo-kysymykset.js:stä (korjattu). Uusia äänitysavaimia ei synny.
NLD.json: PK, PR 6912 (9e7290e809). Vanhat raportit ja arkisto ennallaan.

## Montelbaanstoren 1852
Lähde nl-Wikipedia (nl.wikipedia.org/wiki/Montelbaanstoren): "In 1852 dreigde de toren te worden gesloopt, maar in 1878 werd het Stadswaterkantoor in de toren gevestigd." = purkamisella uhattiin (ei "ehdotettu"). en-WP ja ONH eivät mainitse 1852:ta.
NJ ja FV: "Vuonna 1852 se oli ollut purettavaksi, mutta pelastui." → "Vuonna 1852 tornia uhkasi purkaminen, mutta se säästyi."
Huomio: fokusvirta-amsterdam.js 1606 kysymyschip "Miksi torni oli purettavaksi vuonna 1852?" jäi ennalleen (KK: älä muuta muuta);
suositus: "Miksi tornia uhkasi purkaminen vuonna 1852?" (Pulun vastaus kysymykseen puuttuu raportista ja NLD.json:sta ei löydy sitä suoraan.)

## Äänitysjono (avainten vaihdot)
cb1c2ce7→4001c4d8 (Montelbaanstoren 2), fbaf3f3e→9b6ef97d (Maitotyttö 2), 97450373→01af175a (Maitotyttö 3),
88406452→3a456642 (Yövartio 1), 0769699c→917b8c13 (Yövartio 3), a42f5226→9145aa47 (amsterdamin-yovartio 1). Muuhun jonoon ei koskettu.
