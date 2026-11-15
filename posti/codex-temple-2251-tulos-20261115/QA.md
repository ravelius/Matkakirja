# Temple #2251 — ensimmäisen halkaistun Tripo-kokeen tulos

## KK:n neljä kysymystä

- **Sisäpinnat:** neljän salin lattiat, keskipilarit ja kaaret syntyivät kolmiulotteisiksi; täydellistä holvikuorta ei ole osoitettu, ja otospaikoissa kattojen alapinnat ovat lähes tasaisia.
- **Portaikko:** askelmat ja niiden kiertyminen ovat oikeaa geometriaa myös tekstuurittomassa kuvassa. Kävelykelpoisuutta tai kaikkia kerrosliittymiä ei ole varmennettu.
- **Aukot:** joissakin ikkunoissa näkyy läpirakoja ja säteillä löytyy vapaita suuntia; kaikkien ikkunoiden tai portaikon ja salien ovien läpäisevyyttä ei ole vahvistettu. Ovien suljettuja syvennyksiä epäillään.
- **Kolmiot:** 1 868 577; alkuperäinen GLB 72 270 664 tavua, värikuva 8192² ja normaali- sekä metalli/karheuskuvat 4096².

## Mitä kuvat osoittavat

01 leikkaus suoraan edestä, 02 viisto saleihin, 03 portaikko läheltä ja 04 ulkopuoli takaa ovat pyydetyt neljä näkymää. 05–06 ovat lisänä tekstuurittomat kuvat: ne erottavat varsinaisen muodon pintakuvioinnista. Neljä salia ja ullakko säilyivät, portaikko vasemmalla ja pienet tornitilat oikealla. Takajulkisivu on yhden syötekuvan perusteella tehty Tripo-tulkinta, ei lähteestä hyväksytty rekonstruktio.

`geometry-probes.json` sisältää kevyen sädetarkistuksen. Kahdeksassa näkyvän salitilan otospaikassa x=±3, y=-2 jokaiselle kerrokselle löytyvät lattia ja katon alapinta. Y=1-otoksia ei saa tulkita varmasti huoneiden sisällä oleviksi: osassa säde osuu vasta maatasoon tai ei pintaan. Takaseinään päin suunnatuissa 605 säteen viuhkoissa per kerros löytyi 14, 20, 17 ja 20 esteetöntä sädettä. Tämä on näyttö vapaan säteen olemassaolosta, **ei kaikkien nimettyjen aukkojen tai kulkureittien tarkastus**. Ei manifoldisuus-, törmäys- tai kävelyreittitestiä.

## Arvio tekniikasta ja rajat

Halkaistu syöte toimii näkyvien sisärakenteiden visualisointikokeena: tulos on enemmän kuin tasainen sisäkuva. Sitä ei hyväksytä tämän perusteella historialliseksi rakennemalliksi tai peliin. Geometrian siistiminen, täydet holvit ja aukkojen varmistaminen vaatisivat erillistä työtä. Kevyttä pelimallia ei vielä tehty.

Vain yksi hyväksytty otto käytettiin, 65 krediittiä. Toinen otto ei ole sallittu ilman KK:n erillistä sanaa; kokeen alkuperäinen noin 100 krediitin kokonaisraja on edelleen muistissa. Korkeuden 39/50 m lähderistiriita ja maantieteellinen suunta ovat avoinna. Tarkastuskuvien 39 yksikön korkeus on ainoastaan likimääräinen esitysmittakaava. Ei peilausta, peliin siirtoa tai julkaisua.

## Alkuperäinen ja tuotantoloki

Tripo-job `17ddf794-b654-41f4-a5cb-c07aac61c203`, aloitus 15.11.2026 17:21:34 UTC. Palvelun ensimmäinen arvio 116 s; valmistuminen ja arkisto varmistettu 17:28:12 UTC. Kulutus 15425 → 15360 krediittiä. HD H3.1 / Single Image / Ultra / 2M / Triangle / 8K / PBR / Remove Lighting; AI Complete ja Generate in Parts pois.

Muuttumaton alkuperäinen T7:llä:
`output/tripo-halkaistu-koe-2243-20261115/tripo-2251/temple-2251-max-original-8k.glb`

SHA256 `5c7114ffba86b69ff9fe8e128c0e9b221f19b71845c0d6b74607e556dbdebe3d`.
Kaikki kuvat GLB:n sisällä; ei ulkoisia riippuvuuksia. Käynnistyslevyn oma latauskopio siirrettiin T7:lle ja tarkistettiin hashilla. Lähde ja alkuperäinen GLB säilyvät muuttumattomina. Tarkastus johdannaisessa Blender-tiedostossa, kuusi Workbench-kuvaa 3,5 sekunnissa, kaksi säiettä; ei raskasta renderiä tai tekstuurileivontaa.
