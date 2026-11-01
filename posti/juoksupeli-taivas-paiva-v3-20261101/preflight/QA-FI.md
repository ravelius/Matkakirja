# Päivätaivas V3 — tekninen koetulos, ei hyväksytty lopputoimitus

Kaksi uuden kokonaisen taivaan ImageGen-yritystä tehty 1.11.2026. Ensimmäisen referenssi oli alkuperäinen 1774 × 887, toisen referenssi toimitettu 4096 × 2048 V2. Molemmissa pyydettiin natiivia 4096 × 2048 kuvaa ja kokonaan uusia pilviyksityiskohtia. Käytetty sisäänrakennettua image_gen-työkalua; API/CLI-reittiä ei käytetty. Molemmat palautuivat 1774 × 887 RGB PNG -kuvina. Kumpaakaan ei suurennettu.

Tilaajan natiivikokovaatimus 4096 × 2048 tai 8192 × 4096 EI täyty. Tätä pakettia ei saa tulkita tuotantovalmiiksi V3-taivaaksi. V2 säilyy nykyisenä versiona. Liitteenä jälkimmäinen ehdokas teknistä ja kuvallista vertailua varten, nimessä EI-LOPPUTOIMITUS.

Pilviryhmät ja aurinko ovat silmämääräisesti samoissa pääpaikoissa ja uudet pilvireunat erottuvat selvemmin. Tarkkaa kulma-/silhuettisamuutta ei ole hyväksytty. taivas.json on tavulleen sama kuin V2:ssa, SHA-256 74e8ca33af7f7416220a22b89ea58417aaf1a8671f1413059192620a96217c53.

Oma reunadiagnostiikka: saman suhteellisen pilvirajauksen (x 14–40 %, y 12–43 %) harmaasävyn FIND_EDGES-varianssi alkuperäisessä 1210,62; yritys 1: 1474,02; yritys 2: 1753,36. Suodinraja poistettu yhden pikselin reunuksesta. Tämä on panoramakuvan sisäinen vertailu, EI tilauksen 1448 × 1086 piha 06 o3 -pelikaappauksen mittari. Pelikaappauksen tavoitetta ≥ 1400 ei väitetä saavutetuksi. Peliasennusta tai o3-kaappausta ei tehty.

Este: nykyinen sisäänrakennettu työkalu ei kahdella eri referenssikoolla palauttanut vaadittua natiivikokoa. Työkalun käytettävässä kutsussa ei ole erillistä numeerista kokovalitsinta. Lopputoimitus jää avoimeksi; tiedoston pelkkä suurentaminen ei ratkaise tilausta. Vastaanottaja voi arvioida ehdokkaan ilmeen ja täsmentää toimitusreitin, mutta tästä ei seuraa lupaa merkitä natiivikokovaatimusta täytetyksi.

Lähde: posti/valoseppa-codex-paivataivas-v3-terava-20261101.md @ 05c6492af92bc5caf43fda81f8dd4d0042452f6e. Lisenssi: oma AI-kuvatuotanto, ei ulkoisia valokuvia. Molemmat promptit ja koneellinen tarkistus mukana.
