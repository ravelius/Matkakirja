## Codex → Fable: foto-laajennus #51, osatoimitus

8/29 uutta JPEG-näytettä on toimitettu R2:een ja tarkistettu tavulleen. Generointikutsuja tähän mennessä 23/29. Kokonaismäärä on26+3=29, ei32. Muut kohteet jatkavat samaa tilausta; tämä ei kuittaa niitä valmiiksi.

Lähde ja lisäys luettu kokonaan, molemmat Git-blobit tarkistettu. C-uusinnat ja kolme lisäystä generoitiin ensin, sitten B-isot ja lopuksi A-minit. Jokainen tuotettu tiedosto on kokonaan uusi builtin-generointi; yksi kutsu per assetti, ei lisävariantteja. Mini–iso-identiteettiä ohjattiin omilla tuoreilla generoiduilla scene-referensseillä; viitteet ja scene-contractit on kirjattu.

| Kohde | Muoto | Mitat | Kuva |
|---|---|---|---|
| tahdet | mini | 512 × 512 | [JPG](https://media.matkakirja.app/linssikatalogi/tahdet-foto-mini-v2.jpg?t=0559c0cf5f70d1aa) |
| tahdet | iso | 1600 × 900 | [JPG](https://media.matkakirja.app/linssikatalogi/tahdet-foto-iso-v2.jpg?t=6a4bdcf8ef0d8517) |
| yokartta | mini | 512 × 512 | [JPG](https://media.matkakirja.app/linssikatalogi/yokartta-foto-mini-v2.jpg?t=2457c652dc165edc) |
| poikkileikkaus | mini | 512 × 512 | [JPG](https://media.matkakirja.app/linssikatalogi/poikkileikkaus-foto-mini-v2.jpg?t=0f71b5d697451644) |
| poikkileikkaus | iso | 1600 × 900 | [JPG](https://media.matkakirja.app/linssikatalogi/poikkileikkaus-foto-iso-v2.jpg?t=e7df7790c0d6917e) |
| ihmisen-matka-2 | iso | 1600 × 900 | [JPG](https://media.matkakirja.app/linssikatalogi/ihmisen-matka-2-foto-iso-v2.jpg?t=b04727d8e38722ca) |
| maapallon-vuosi | iso | 1600 × 900 | [JPG](https://media.matkakirja.app/linssikatalogi/maapallon-vuosi-foto-iso-v2.jpg?t=aa96c56d77577e05) |
| mylly | iso | 1600 × 900 | [JPG](https://media.matkakirja.app/linssikatalogi/mylly-foto-iso-v2.jpg?t=507749da5712cf87) |

[Kuvakooste](https://media.matkakirja.app/linssikatalogi/20261009-foto-laajennus-kooste-osa8.jpg?t=1b6ab31e4ddc105f). Manifesti `posti/kuvatoimitus-varustekuvat-foto-laajennus-20261009.json`: SHA-256:t, tarkat promptit, natiivikoot, viitteet ja kaikki QA-poikkeamat.

Kaikki JPEG q90, sRGB, läpinäkymätön RGB. XMP Description/Source: Havainnekuva. Tekoälyllä tuotettu, ei valokuva. CDN404-välimuistin vuoksi esiluku ja tavutarkistus tehtiin ?t-parametrilla; manifestissa ovat sekä toimiva välimuistin ohittava URL että kanoninen URL. Olemassa olevia objekteja ei ylikirjoitettu.

Satelliitin vanhan viitteen ihmishahmoa/käsiä ei käytetty. Tuotannossa pyydettiin erillistä tyhjää kypärää ja filmikameraa; mahdollinen ihmishahmovirhe pysäyttää vain kyseisen kohteen. Patsas/rintakuva on lähteen nimenomaisesti sallima poikkeus kasvojen kieltoon.

Kuvakohtaiset tarkistushavainnot (näytetoimitus ei tarkoita kaikkien ehtojen toteutumista):

- `tahdet-mini-v2`: Seitsemän kirkasta Otavan päätähteä, mutta hentoja yhdysjälkiä ja väärä tähtigeometria; työntekijän suuntapoikkeama-arvio noin21°.
- `tahdet-iso-v2`: Vain kuusi kirkasta Otavan päätähteä, hentoja yhdysjälkiä ja väärä geometria; työntekijän suuntapoikkeama-arvio noin27°. Maisema/kaukoputki sama kuin minissä.
- `yokartta-mini-v2`: Hyväksyttyyn isoon verrattava Eurooppa/Pohjois-Afrikka/Niili/Earthcurve; pyöreä rajaus ja96px-luettavuus toimivat.
- `poikkileikkaus-mini-v2`: Kolme päätornia ja valaistut tyhjät leikkaushuoneet/holvit näkyvät; ympyrä leikkaa saaren ulkoreunoja mutta keskinen leikkaustaso säilyy96px:ssä.
- `poikkileikkaus-iso-v2`: Sama kolmitorninen malli/leikkaus kuin minissä, ympäristö leveämpänä; mittakaava visuaalisesti tulkinnanvarainen.
- `ihmisen-matka-2-iso-v2`: Päivämaapallo Afrikan/Euraasian valossa, lämmin valokeila. Reitti Afrikassa/Punaisellamerellä näkyy, jatko Euraasiaan heikko.
- `maapallon-vuosi-iso-v2`: Neljä kokonaista vuodenaikasaarta samassa järjestyksessä ja sama fyysinen kalteva messinkiakseli, kaikki mahtuvat leveään sommitteluun.
- `mylly-iso-v2`: 24 pistettä, kolme neliötä, neljä sivukeskiliitosta, tyhjä keskus,3+3nappulaa. Lauta kokonaan näkyvissä, kamera hieman miniä matalampi.

Sisältökirjuri tarkistaa näytteet ja Natiivi-UI kytkee hyväksytyt. Pelikytkentää tai hyväksyntää ei ole päätelty toimituksesta. Ei main-mergeä, versionnostoa tai julkaisua Codexilta.
