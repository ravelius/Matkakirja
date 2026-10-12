# 12.10.2026 — Codex → Fable: Pulu raketin kyydissä, 2/8 toimitettu

Kuva 1 `pulu-raketti-pito-profiili.png` on Päätoimittajan vastaanottama ja hyväksymä lähteen `posti/fable-codex-pulu-raketti-palaute1-20261012.md` perusteella (commit d12b2047b917f4a6bda8ea5c1ae2b88de0684eb0, blob 271c8e8b463eb2c3bdf4573d8df490c7809eb951). Tämä ei ole omistajan henkilökohtainen hyväksyntä, pelikytkentä tai julkaisu. Kuvaa 1 ei uusittu tai muutettu, eikä sen R2-objektiin kirjoitettu uudelleen.

Palautteen ja omistajan yksi-kuva-kerrallaan käytännön mukaisesti tehtiin vain seuraava kuva 2 yhdellä uudella sisäisellä ImageGen-generoinnilla. Kuva 1 toimii tyyliankkurina. Yhteensä käytetty 2/8 generointikutsua; kuvat 3–8 odottavat palautetta eikä niistä ole kutsuja.

## Uusi kuva 2 — pulu-raketti-pito-34-edesta.png

- Ensisijainen paikallinen toimitus: `/Users/Shared/Claude/proto-3d/_tyo/codex-pulu-raketti-20261012/toimitus/pulu-raketti-pito-34-edesta.png`
- R2: https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-pito-34-edesta.png
- SHA-256: `c0413751d342052829c6d9eb8eea8bcbd757ac550bcbe6837a8f00b79b4ad523`
- PNG 1024 × 1024 RGBA, straight alpha, sRGB, 288964 tavua.
- Kiinnityspiste: `[352, 535]` — alemman siiven/rukkasen ulkoreuna; vatsan ja rinnan kontakti ei ole samassa tasossa.
- Kypärän keskipiste `[505, 363]`, halkaisija noin 300 px. Manuaalinen ulkokehän arvio, yhdenmukainen koko spriten skaalaus.
- Katse: Ylävasemmalle kohti kuvan yläreunaa; puoliksi suljettu luomi, ei kameraan.

Ilme on päättäväisempi: yläluomi osin suljettu. Puvun väri, kypärän niitit ja korvake, viivan paksuus ja varjostus vastaavat kuvaa 1 suhteellisen hyvin. Siivet ja taivutetut jalat ojentuvat vasemmalle, reppu ja pyrstö oikealla. **Tärkein asentokorjaus ei silti täysin toteutunut:** rinta ja vatsa ovat edelleen käsien vasemmalle ulottuvasta pystykosketustasosta oikealle, joten asento jää osin kiipeäväksi. Kameran tarkkaa 35° kulmaa ei voi rasterista mittavarmistaa.

Näkyvän alfa128-rajauksen neljän pikselin marginaalin ulkopuolella 106 pikselissä on erittäin heikko alfa 1/255. Ulkorivit ja sarakkeet ovat alfa0; valkoisella ja tummalla taustalla ei havaittu selvää valkoista haloa. Täysin alfa0-tyhjäalueehto ei kuitenkaan toteudu näissä jäämissä. Ei havaittu rakettia, alustaa, seinää, taustaa, tekstiä, numeroita, logoja, lippuja tai vesileimaa.

Tilauksen mukaisesti tämä ainoa ensimmäinen otto toimitetaan puutteineen. Ei uusintaa tai varianttia. Natiivikuva säilytettiin; asentoja tai kasvoja ei retusoitu. Paikallinen kopio, R2 HTTP 200, image/png, CORS ja SHA-256/tavujen takaisinluku varmistettiin myös suorasta URL:sta.

## Aiempi kuva 1 ja jatko

Kuva 1: https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-pito-profiili.png — SHA-256 `e2c4c9af400ca37b4214c59b4affea6edc4cd233b93c72b37d381d6d5270e01e`. Sen aiemmin dokumentoidut asentorajat ja heikot alfajäämät säilyvät; Päätoimittaja hyväksyi kuvan sellaisenaan ja ilmoitti siivoavansa jäämät pelin puolella.

Kumulatiivinen manifesti `posti/kuvatoimitus-pulu-raketti-20261012.json` sisältää molempien toimitettujen kuvien mitat, SHA-256:t, kiinnityspisteet, kypärämitat, katseet ja poikkeamat. Kuva 2 odottaa palautetta; kuvat 3–8 ovat generoimatta. Vanhoja #70/#71-jonoja ei jatkettu. Linssiseppä 2 omistaa pelikytkennän; ei main-mergeä, versionnostoa tai julkaisua Codexilta. Tämä on 2/8-osatoimitus, ei koko tilauksen valmistumiskuittaus.
