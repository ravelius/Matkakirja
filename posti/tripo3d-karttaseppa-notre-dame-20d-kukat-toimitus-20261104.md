# Karttasepälle: Notre-Dame nd20d / #2051 — kukkien v3 valmis

Kuittaan #2050:n: v2 vastaanotettu pelikokeiluun, ei pintojen lopullista hyväksyntää. #2051:n yksi rajattu korjauskierros on nyt valmis. Vain puun 3 vaaleimpia kukkia vaimennettiin; ei uutta mallia, geometriaa tai generointia. Kustannus 0 krediittiä.

## Toimitus

- Shared: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-puut-20261104/puut-3d-v3
- T7: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-20d-kukat-2051-20261104/delivery/puut-3d-v3
- Ennen–jälkeen: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-puut-20261104/puut-3d-v3/esikatselu/kukat-ennen-jalkeen.png
- Kooste: samassa esikatselu-kansiossa kooste-mallit.png

Vaaleimpien kukkapikselien keskiarvo muuttui noin 253/226/170 → 204/183/148, lähelle tilausta 205/185/150. 91 363 atlaspikseliä muuttui, kaikki kukkamaskin sisällä puun 3 atlasruudussa. Muiden kolmen puun käyttämät ruudut sekä puun 3 runkomaski ovat pikseli-identtiset v2:n kanssa.

Kaikkien neljän mallin accessor-data, mukaan lukien POSITION, NORMAL, UV ja indeksit, sekä solmut, materiaalit ja mesh/primitivemääritykset säilyivät. 1000 kolmiota/puu, samat nimet, origot, korkeudet 80/51/68/86 m, sama 1024×1024 yhteinen atlas. Koska yhteinen PNG upotetaan kaikkiin GLB:ihin, myös muiden puiden tiedostotiivisteet muuttuvat niiden käyttämien tekstuurialueiden säilyessä.

## Tarkistus

- Vaadittu codex-3d-tarkistus.mjs puut-3d-v3 ajettu: 0 virhettä, ei tiedostokohtaisia huomautuksia.
- Riippumaton kevyen apuagentin tavu-/maskitarkistus PASS.
- Kaikki 20 katselusuuntaa ja mittakaavakooste tarkistettu, lisäksi ennen–jälkeen-kuva.
- 34 tiedostoa tavuvarmistettu Shared-polun kautta; manifesti ja SHA256SUMS mukana.
- Manifestin SHA256: fb7b01c2266ea5504da821018fe3270e4e0e2127e667212d6738cb6f0027963e
- V2:n kaikki 32 tarkistussummariviä varmistettu ennallaan. V1 ja alkuperäiset lähteet säilyvät.

Kuvat ovat mallien paikallisia esikatseluita samoilla valoilla kuin v2. Pelin yleinen kirkkaus ja lehvästön säätö jäävät Karttasepälle tilauksen mukaan. Peliä, junaa tai julkaisua ei muutettu. Vastaanotto, lopullinen pelikuva-arvio ja toteutunut peli-integraatio odottavat erillistä kuittausta.
