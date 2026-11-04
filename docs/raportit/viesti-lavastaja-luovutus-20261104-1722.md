# Lavastajan luovutus 4.11.2026 klo 17.2x — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: e1ab69b5a:docs/raportit/viesti-lavastaja-luovutus-20261104-1540.md (korvattu, paitsi sen kohta 3:n 弘义阁-palkki, joka on yhä vastaamatta). M = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri, Y = M/yleinen, N = M/jalustat, K = M:n vieressä katot-v125. Python: /opt/homebrew/bin/python3. Tiedot: M/KORJAUS.md loppu ja M/LESHOU-PORTAAT.md loppu.

## 1. Terassi: KK hyväksyi 17.1x (omistajan valtuutus 17.13), vienti koerunkoon, ei junaan
Paketti _valmiit/juoksupeli-kk-lavastaja-terassi-v1-vienti-20261104, SHA256SUMS 6bc8ca34dd4f: rakennukset-v124 (v122 + etu lod0–2 ilman V4_lattiaa), c2-v39 (c2-v37 + kaiteeton uudelleen). v123 ja c2-v38 ovat keltakatot-v2:n. diff: vain nämä 4 tiedostoa eroavat. PT kuittasi. Rivi JU:lle lähetetty 17.21, oli jonossa; varmista, että JU kuittaa.
Rungossa ei vielä testattu näillä kansionimillä; kuvat on otettu koejuuri-terassista, jossa tausta on yleisen korjauksen tausta. Paketti ilman yleistä tuli uutena yhdistelmänä: kuvaa siitä ei ole.

## 2. KK:n jatko, odottaa sanaa: lähetetty KK:lle 17.2x, oli jonossa
Selvitetty, ei korjattu:
- Rako: ei aukko. kk-tausta-2-1 V4_gold valo 0,71–0,73 → 0,03–0,47; geometria sama.
- Kivipalkit: kk-tausta-2-2 lod1 V4_marmori-reunat (y 0,27–0,85) jäivät, kun taso poistui. sovita.py:n RIM ei sisällä marmoria. Korjaus ilman leivontaa: lod1:n marmorireunat samoista ryhmistä pois.
- Harmaat laatikot: g-jalusta-etu V4_marmori, kuvioton pystypinta, C2-kaide samassa linjassa; päällekkäisyyttä ei mitattu tarkasti. Sama ennen-kuvassa.
Ehdotin: palkit ja rako seuraavalla kierroksella, rako pitämällä vanha valo kaukana korokkeista; laatikot jätetään. Laajempi kolmiotaso odottaa KK:ta.
Saumaehdokkaat 157 (samat 8 paria 114; aiemmin 120). Aitoja 5 (rako 1, palkit 4), epäselvä #109, 9 hiusviivaa myös ennen-kuvissa; arkki pienenä, ei täysikoossa yksitellen. Y/terassi2/ehdokkaat, Y/terassi2/parit. kaide-poikki-kamera on seinän sisällä, poista seuraavasta sk:sta (Y/terassi2/tee_sk.py).

## 3. Portaat (PT): koejuuri-jalustat, EI valmis
Tehty: N/siirra_valo.py: vanhat kolmiot vanhalla atlaksella, 896 uutta saarekkeina täytetystä leivonnasta. Katon viirut poissa kolmessa katsotussa koko-kuvassa (Yangxing katsomatta), levy poissa.
Auki: vanhat askelmat tummempia kuin ennen (Leshou 3–4 riviä, Ningshoumen 2), vaikka valo on atlaksessa sama (824 kolmiota, ero 0,0). Syy on atlaksen ulkopuolella, ei selvitetty. Seuraava askel: pintatieto/lodtieto-QA kohdasta (JuoksuV4Maailma.Valo.cs) ja selvitä, piirtääkö toinen pinta tai kuvakohtainen ero. Kirkas kiila Leshoun portaan juuressa, sama myös ennen-kuvassa, auki. Parit N/parit-siirto PT:llä; PT ei ole kuitannut. Leivonnoista puuttui valo_tayta; siniharmaat pinnat ovat myös ennen-kuvassa, joten raitaepäily ei saanut tukea.
Ovilista N/kulku/ ei lopullinen.

## 4. Levy
15 vanhaa koejuurta ja koeajoa siirretty T7:lle symlinkein (/Volumes/T7 4TB/proto-arkisto/linnanrakentaja-katot-v125), kansio 16 → 5,9 Gi. koejuuri-ulkomuuri, -yleinen, -terassi, -jalustat paikallaan, koska niihin viitataan. PT sai rivin.
