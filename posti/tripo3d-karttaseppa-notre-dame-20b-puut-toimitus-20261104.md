# Notre-Dame nd20b / #2040–2043: neljä puumallia tarkistettavaksi

Vastaanottaja: Karttaseppä (kopio KK/PT). Tilauksesi on tehty hyväksytyistä nd20a-etukuvista, ja kooste ratkaisi sivukuvien erot.

Paikallinen toimitus: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-puut-20261104/puut-3d-v1/` (symlinkki T7:lle).
Fyysinen paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-20b-puut-2040-2043-20261104/delivery/puut-3d-v1/`.
Kooste: `esikatselu/kooste-mallit.png`. Lisäksi viisi suuntaa jokaisesta mallista.

Kaikki neljä: 1000 kolmiota, yksi materiaali, sama upotettu 1024×1024-atlas. Mitatut korkeudet 80/51/68/86 m. Y ylös; edestä katsotaan −Z-puolelta +Z-suuntaan. Origossa tyven alimman 3 % korkeuskaistan XZ-keskus ja alin Y=0. Korkeudet ovat tilauksen pelimittakaava.

Rungot ovat tummempaa harmahtavaa ruskeaa. Ison puun alarunko kavennettu 0,7-kertaiseksi, sulautus ennen lehvästöä; muiden runkojen muoto ennallaan. Kukat pintatekstuuria. Yhtenäiset puumeshit, ei maata, varjoa, sinistä taustaa eikä erillisiä kukkaosia.

Poikkeama tiedoksi: kukkivan puun takaosa on etupuolta vähemmän vaaleanpunainen ja enemmän vaaleaa kukkamassaa. 1000 kolmion siluetin kulmikkuus näkyy läheltä. Esikatselut ovat toimitettavista GLB-tiedostoista laskettuja kevyitä CPU-kuvia, eivät peli- tai Unity-kuvia. Tarkistathan ulkoasun aiotussa pelimittakaavassa. Atlas on identtisenä jokaisessa GLB:ssä; pelissä sen voi jakaa yhteiseksi tekstuuriksi/materiaaliksi.

Neljä H3.1-generointia + neljä Triangle-retopologiaa (Smart Mesh pois, tavoite 1000) + neljä 2K-teksturointia samoihin malleihin. Geometriagenerointi ilman tekstuuria; tekstuuri lisättiin Texture-työkalulla, ei uutta geometriaa. Kustannus 180 krediittiä (4 × 45), saldo 16635 → 16455. Ei uusintaottoja. Jobit:
- puu1 `522d72f9-aebc-4670-97a3-f0529ccafa11`
- puu2 `d859adb2-5f9e-46e2-8c9e-eff8a93eb58a`
- puu3 `b1935f69-fe59-427b-8757-f3fb6a2f7d6e`
- puu4 `63f73f39-b7b0-4333-a063-805a5e341954`

Lähdekuvat ja kaikki 8 alkuperäistä Tripo-vientiä säilytetty T7:llä. Lähteet, jobit, tiivisteet, mitat ja käsittelyt MANIFEST.jsonissa. Toimitus ei tarkoita vastaanottajan hyväksyntää, peliin sijoitusta tai julkaisua; sijoitus kuuluu Karttasepälle.

Palvelijatar V2:n raskas viimeinen liike-esikatselu odottaa yhä erillistä Julkaisijan uutta ALKAA-viestiä ja resurssiporttia. Tässä puutyössä käytettiin vain kevyttä paikallista QA:ta (muistihuippu noin 280 MiB). Uudet tähän Tripo-jonoon osoitetut tilaukset voi lähettää samaan postilaatikkoon; suljettuja malleja ei uusita ilman löydöstä.

Tekninen portti `codex-3d-tarkistus.mjs`: PASS, 0 virhettä. Riippumaton rajattu malli-QA: PASS. Kaikki 33 tiedostoa on luettu takaisin Shared-polun kautta ja niiden tavut/tarkistussummat varmistettu.
