# Historiaosioiden kuvat: Praha, Ateena, Kööpenhamina (Sisältökirjuri 15.10.2026)

PT:n erä 15.10.: historiaosioiden yksityiskohtakuvat kuten Tukholmalle ja Pariisille (esittely/<id>-historia-v1/<id>-historia-yksityiskohdat.json + kuvat/). Konsolin "historiaosioiden kuvat praha: ei (404)" korjautuu, kun vienti on R2:ssa.

## Tulos (42 kuvaa, kaikki PD / CC0 / CC BY)

| Kaupunki | Osioita | Kuvia | Huomio |
| --- | --- | --- | --- |
| Praha | 8 | 16 | 2 kuvaa/osio; Kansallisteatterin värivedos rajattu (teksti pois); Vituksen "valmistui 1929" -kuvaksi CC0-valokuva valmiista katedraalista (Mockerin suunnitelma poistui) |
| Ateena | 8 | 10 | Räjähdys 1687: vain piiritys (räjähdyksestä ei vapaata kuvaa); maratonkuvaksi Spyridon Louisin 1170 px:n valokuva (694 px:n piirros poistui) |
| Kööpenhamina | 8 | 16 | Carlsbergin laboratorio: Peter Elfeltin 1914-kuva (CC BY 4.0) dokumentoimattoman nykykuvan tilalle; Absalonin muuria ei löytynyt vapaasti, joten 1679-linnakaiverrus |

Menettely: Sonnet-ali-agentti etsi ja rakensi kuvat (kuva.py: lisenssisuodatin, ankkurivalidointi, ≥ 15 sanan väli, rajaus, leveys ≤ 1280), toinen riippumaton Sonnet-agentti katsoi jokaisen valmiin kuvan tekstiä vasten (Praha 13 OK/3 HEIKKO, Ateena 9/1, Kööpenhamina 15/1). Kaikki HEIKKO-rivit korjattu rajauksella, kuvatekstillä tai vaihtamalla kuva; kuvatekstit tarkennettu tarkistajien ehdotusten mukaan.

## CC BY: tekijä mainittava
- Praha, Vencelin aukio (Velvet-vallankumous): RobbieIanMorrison, CC BY 4.0
- Kööpenhamina: Rundetårn-ramppi (Marek Ślusarczyk / Tupungato, CC BY 3.0), Kastellet (Joccay, CC BY 2.0), Carlsbergin laboratorio (Peter Elfelt, CC BY 4.0)
Kaikki lähteet ja lisenssit: LAHTEET.md viennissä.

## Vienti Julkaisijalle
`/Users/Shared/Claude/proto-3d/_valmiit/historiakuvat-praha-ateena-koopenhamina-vienti-20261015/` (esittely/praha-historia-v1, ateena-historia-v1, koopenhamina-historia-v1; LAHTEET.md; SHA256SUMS). Työaineisto ja työkalut: proto-3d/_tyo/sisaltokirjuri/historiakuvat-20261015/ (kuva.py, OHJE.md, ehdotus.json, tarkistus.json).

## Avoimet
- **Lontoo**: historiaosioita ei ole (opas/historia-v1/lontoo.json 404), joten kuvia ei voi tehdä ennen tekstejä. Jos PT tilaa Lontoon historiatekstit, kuvat tehdään samalla työkalulla.
- **Koodi**: tools/pollo/aineistot.js `historia_yksityiskohdat_polut` (ja `historia_polut`, testi tests/opas-esittely.test.mjs) sisältää nyt vain Tukholman ja Pariisin; Praha, Ateena ja Kööpenhamina on lisättävä samoilla poluilla esittely/<id>-historia-v1/<id>-historia-yksityiskohdat.json, jos worker lukee polut sieltä (Pelikoodari/Julkaisija; ei tässä erässä).
- Pienet kuvat: Absalonin patsas (540 px) ja Andersenin piirros (550 px) ovat Commonsin suurimmat vapaat versiot.
