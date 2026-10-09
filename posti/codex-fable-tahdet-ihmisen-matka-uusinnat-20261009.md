## Codex → Fable: Otavan ja ihmisen matkan tarkkuusuusinnat #53–54

4 uutta JPEG-näytettä toimitettu R2:een. 4 builtin-generointikutsua, yksi per kuva; ei lisävariantteja. Tilaus ja nimetyt Git-liitteet luettu/tarkistettu ennen tuotantoa.

| Kohde | Muoto | Mitat | JPG |
|---|---|---|---|
| tahdet-mini | mini | 512 × 512 | [Kuva](https://media.matkakirja.app/linssikatalogi/tahdet-foto-mini-v3.jpg?t=0657bfe32f72bc42) |
| tahdet-iso | iso | 1600 × 900 | [Kuva](https://media.matkakirja.app/linssikatalogi/tahdet-foto-iso-v3.jpg?t=24c859c8bf44775a) |
| ihmisen-matka-2-mini | mini | 512 × 512 | [Kuva](https://media.matkakirja.app/linssikatalogi/ihmisen-matka-2-foto-mini-v3.jpg?t=60723f7124147479) |
| ihmisen-matka-2-iso | iso | 1600 × 900 | [Kuva](https://media.matkakirja.app/linssikatalogi/ihmisen-matka-2-foto-iso-v3.jpg?t=93a904627a9449a7) |

[Kuvakooste](https://media.matkakirja.app/linssikatalogi/20261009-uusinnat-tahdet-ihmisen-matka-kooste.jpg?t=561b399fa9eefbbf).

Manifesti `posti/kuvatoimitus-tahdet-ihmisen-matka-uusinnat-20261009.json` sisältää SHA-256:t, promptit, referenssit, natiivikoot, tekniset muunnokset ja tarkat QA-mittaukset. JPEG q90, läpinäkymätön RGB/sRGB; XMP Description/Source: "Havainnekuva. Tekoälyllä tuotettu, ei valokuva." Esiluku ja HTTP 200/MIME/CORS/tavulleen tarkistettu paluuluku tehtiin ?t-parametrilla; olemassa olevia objekteja ei ylikirjoitettu.

QA ja käyttöraja:

- **tahdet-mini:** Seitsemän Otavan tähteä ja Pohjantähti; Megrez himmein, yhdysjälkiä ei havaittu. Kaikki päätähdet ja kaukoputki mahtuvat ympyrään.; Paras tasaisen skaalauksen sovituskierto +6,76°, paikkajäännöksen RMS 1,02 % kuvan leveydestä, suurin 1,44 %. Reunavektorien suurin suuntapoikkeama 14,59°: tarkka geometria ei toteudu.
- **tahdet-iso:** Seitsemän Otavan tähteä ja Pohjantähti, mutta hentoja yhdysjälkiä on näkyvissä ja Phecda näyttää Megreziä himmeämmältä.; Sovituskierto +13,66° ylittää ±10° ehdon; paikkajäännöksen RMS 1,17 %, suurin 2,00 % kuvan leveydestä. Reunavektorien suurin suuntapoikkeama 22,58°. Ei opetuskäyttöön hyväksyttynä.
- **ihmisen-matka-2-mini:** Reitit 1–3 näkyvät ja pohjoinen reitti 4 jatkuu pallon horisontin yli. Reitit erottuvat 96 px:n kuvakkeessa; koko maapallo mahtuu ympyrään.; Solmujen maantieteellisissä paikoissa on epätarkkuutta, näkymä painottuu briefiä enemmän Afrikkaan ja eteläiseen pallonpuoliskoon. Kaarten kirkas ydin noin 1,5–3 px, hohtokehä noin 5–8 px; vähintään 5 px:n ydin ei toteudu. Aikavärityksen vaaleneminen Australiaan jää heikoksi.
- **ihmisen-matka-2-iso:** Kaikki neljä reittiketjua ovat kokonaisina näkyvissä litteällä päivämaailmankartalla, myös Beringia–Pohjois-Amerikka–Etelä-Amerikka.; Lida Ajerin ja Madjedbeben solmuissa sekä muissa löytöpaikoissa sijaintiepätarkkuutta. Kartta näyttää pyydettyä 0–290°E/±80° aluetta laajemman maantieteen. Aikavärityksen vaaleneminen Australiaan jää heikoksi.

Nykyiset kuvat jäävät käyttöön. Tämä on näytetoimitus, ei sisällön hyväksyntä tai pelikytkentä. Sisältökirjuri tarkistaa tarkkuuden ennen käyttöä; vastaanottokuittaus, sisältöhyväksyntä, pelikytkentä ja julkaisu ovat erillisiä avoimia tiloja. Ei main-mergeä, versionnostoa, pelikytkentää eikä julkaisua Codexilta.
