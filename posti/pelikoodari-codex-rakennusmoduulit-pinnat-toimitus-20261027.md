# Codex → Valoseppä ja Pelikoodari: räystään, oven ja ikkunan pinnat 1068–1071

Ensimmäinen pintapaketti on valmis vastaanottajan pelitestiin. Tilaukset 1f83e14a3 ja c1b73c0e huomioitu; 1070 ja 1071 korvaavat aiemmat 1059 ja 1060.

| Numero | Tiedosto | Koko ja käyttö |
|---|---|---|
| 1068 | 1068-kannatinrivi.png | 2048×512 RGBA, neljä kannatinta; nauhan fyysinen leveys 2,4 m antaa 0,6 m keskivälin. Suositus korkeus 0,6 m sisältäen läpinäkyvät marginaalit. |
| 1069 | 1069-paattotiilirivi.png | 1024×256 RGBA, neljä pyöreän päätytiilen ja valutiilen paria; toisto X. Fyysinen koko lähtökohtaisesti 1,2×0,3 m, sovita räystääseen ympyröitä venyttämättä. |
| 1070 | 1070-ristikko-pariovi.jpg | 512×1024 RGB; punaruskea lakka, alaosan paneelit, yläosan ruuturistikko, pronssirenkaat. |
| 1071 | 1071-ristikkoikkuna.jpg | 512×512 RGB; tumma paperi, ei alfaa; toisto X/Y. |

Paikallinen ensisijainen paketti:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/delivery-surfaces-v1/`

Pyydetty vastaanottopolku `/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupinnat-v1/` on luotu linkkinä tähän T7-kansioon, jotta omistajan käsky säilyttää tuotanto T7:llä toteutuu eikä käynnistyslevylle tule kuvakopiota. Alkuperäiset luontikuvat ja promptit säilyvät projektin sources/ ja prompts/ kansioissa.

QA: kuvakoot, kanavat ja SHA256 tarkistettu; molemmissa PNG:issä oikea alfa. Kaistat toistavat samaa kokonaista luontiyksikköä. 1068:n ensimmäinen rajautunut ja liian korumainen ehdokas hylättiin; uusi kokonainen puukannatin valittiin havainteen perusteella. 1071:n ruudukon reunat rajattu ulompien puiden keskelle ja 2×2-toistokuva tarkastettu. Toiston puunsävyssä on pieni paikallinen ero (reunojen keskimääräinen RGB-ero noin 6/255), ei ruudukon katkosta.

Rajoitus: generoiduissa pinnoissa on matalaa uurre-/kohokuviovarjostusta; ne eivät ole mitattuja fyysisesti puhtaita albedoja. Kohtausvarjoja tai laajaa valaistusgradienttia ei ole. VS tarkistaa pinnat pelin valaistuksessa ja vähentää mahdollista kaksinkertaista varjostusta tarvittaessa. Alfan suositus MASK/cutoff 0,5; tarkista mipmap-reunat ja materiaalin värien laajennus läpinäkyvälle alueelle.

QA-kooste: `pinnat/qa/pinnat-nelja-ja-toistot.png`. Tarkempi lähde-, mitta- ja tarkistetieto MANIFEST.json:ssa. Viisi sisäisen image_gen-työkalun kutsua, joista yksi hylätty; rahahinta ei näy työkalulle. Ei Tripo-kutsuja tai Tripo-krediittejä tässä pintaerässä.

Valoseppä kytkee kuvat peliin ja tarkistaa havainnevertailun. Pelikoodari vastaanottaa. C1/C3 3D-palojen tuotanto jatkuu erikseen; C5 pysyy vain suunnitelmana. Tämä toimitus ei tarkoita pelissä hyväksymistä tai integraatiota.
