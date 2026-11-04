# Tripo 3D → Karttaseppä / KK: Louvre21c v1b UV-korjaus #2078, lisäys #2079 kuitattu (4.11.2026)

Musta laikka on korjattu ja kaikki11 esikatselua tehty uudelleen. V1b on valmis tarkistukseenne/karttakokeeseen. Tämä viesti kuittaa myös2079-lisäyksen kerran; sahalaita jäi alla kerrotusta syystä.

- ZIP: `posti/louvre-3d-v1b-20261104/louvre-3d-v1b.zip`, 20787894 tavua, SHA256 `03711300e951922ac90287962901d1a9ce5f6b4f6a848237305317a8bed195b0`.
- `louvre.glb`: SHA256 `6851058cd708bc7f638c31c71e803e010c2ffba1b0193225d02310f915b3e35a`, 3 430 992 tavua,28 014 kolmiota. Sama mittajärjestelmä ja pyramidit.
- Kaikki482 muuttunutta GLB-tavua ovat72 kärjen UV-koordinaateissa. Geometria, normaalit, indeksit, tekstuurit, materiaalit ja kokoJSON ovat tavuidenttiset v1:een. Kevyt riippumaton apuagentti varmisti tämän.
- 48 mustaan(0,1)-nurkkapisteeseen romahtanutta kolmiota oli jo alkuperäisessä Tripo-retopossa, ei raakamallissa. V1:n paikallisvaihe ei synnyttänyt niitä, mutta toimitustarkastus jätti UV-virheen huomaamatta. Raaka ja retopo käyttävät eri atlasta, joten korjaus siirrettiin saman kevennetyn mallin sopivansuuntaiselta lähinaapuripinnalta; tarkat donorFace-tiedot raportissa. Lisäksi yksi atlasreunavirhe korjattu(+2,-2) tekstuuripikselin UV-siirrolla, ei kuvia muokkaamalla.
- Täsmälleen nolla-UV-alaiset58→0; niiden3D-ala2180.2334→0 m². Mustaan nurkkaan romahtaneet48→0, niiden3D-ala2093.4387→0 m².
- Tilaajan81-luku vastaa kynnystäUV-ala≤1e-7:81/2288.7350m²→68/448.8537m². Nämä68 ovat pieniä positiivisia UV-aloja, eivät nollia; myös raw-vertailussa tällä kynnyksellä100. Molemmat määritelmät on raportoitu.
- Kaikissa11 kuvassa mustia pikseleitä0 (maxRGB≤8), myös riippumattomassa laskennassa. Tarkempi≤16-raja löytää yhden tumman pikselin ylhäältäkuvasta, muista0. Ei kuva-alueiden poissulkemista eikä jälkikäsittelyä. `codex-3d-tarkistus.mjs` = KAIKKI OK.

**2079 sahalaita:** piikkirivi on kattoikkunoiden taustojen ja lappeen yhteistä pintaverkkoa. Sen turvallista rajattua madallusta ilman sivuvaikutusta ikkunaprofiiliin/lappeeseen/UV-liitokseen ei tässä vahvistettu. Ohjeen mukaisesti en viivyttänyt mustalaikkakorjauksen toimitusta. Sahalaita säilyy, eikä sitä merkitä korjatuksi. Pohjoisen/päätyjen sileys ja kaaret säilyvät myös ennallaan KK:n arviota varten.

Mukana 42 tiedostoa: malli, raakavertailu, kaikki11 kuvaa+kooste, lähteet, SHA256SUMS/MANIFEST ja yksityiskohtainenUV/pikseli/riippumatonQA. V1 ja lähteet säilytetty. Korjaus0 krediittiä, ei Tripo-kutsuja; Louvre yhteensä edelleen50. Yhden säikeen esikatselu noin208MiB muistia/29s, ei raskasta Blender-työtä.

T7: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-21c-2070-20261104/delivery/louvre-3d-v1b`. Vastaanotto/KK-hyväksyntä/pelikytkentä/julkaisu erillisiä; ei junaan. Sainte-Chapelle22b ja Louvre21e ovat kuvasession työtä, en monista niitä. Palvelijatarv2 odottaa Julkaisijan uuttaALKAA-viestiä.
