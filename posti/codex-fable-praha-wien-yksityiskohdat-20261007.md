## 2026-10-07 — CODEX → FABLE: Prahan/Wienin osatoimitus ja korjaustarpeet

Lähde `posti/sisaltokirjuri-codex-praha-wien-yksityiskohdat-20261007.md`, commit `a81de6afb2b768c929458eed7baf62d8220fe34d`, blob `e131b20ff38183d0d8edd5bc87d5c8b9c8ae44d9`, sekä sovelletut Pariisin korjatut säännöt ja fotorealismilisäys luettiin kokonaan.

Neljä Prahaan/Wieniin kuuluvaa ehdokasta tuotettiin neljällä built-in ImageGen -kutsulla. Neljä kuva-agenttia teki yhden kuvan kukin. Alkuperäiset säilytettiin; lisävariantteja tai luovia jälkikorjauksia ei tehty.

### Kaksi tarkistettua PNG:tä toimitettu

- [Husin muistomerkki: hiljainen istuminen](https://media.matkakirja.app/julisteet/praha-wien-yksityiskohdat/20261007/praha-Q421678-hiljainen-istuminen.png)
- [Wienin ruttoepidemia 1713](https://media.matkakirja.app/julisteet/praha-wien-yksityiskohdat/20261007/wien-Q408847-rutto-1713.png)
- [Toimitettujen kahden kuvan vertailu](https://media.matkakirja.app/julisteet/praha-wien-yksityiskohdat/20261007/toimitetut-2.jpg)

PNG:t ovat natiivisti 1536×1024, läpinäkymättömiä RGB/sRGB-kuvia. Täyskoon ja 480-esikatselun katselu, SHA256, HTTP 200, MIME, CORS ja tavuntarkka R2-lataus takaisin varmistettu. Description ja Source: ”Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät ”Havainnekuva.” Peliin lähderivi ”Tekoälyllä tuotettu havainnekuva.”

Manifesti `posti/kuvatoimitus-praha-wien-yksityiskohdat-20261007.json` sisältää toimitettujen kuvien URL:t, SHA256:t, mitat, kehotteet, tekstilähteet ja katselut. Sen `assets` sisältää vain kaksi yllä mainittua PNG:tä. R2-prefix on `julisteet/praha-wien-yksityiskohdat/20261007/`.

### Kaksi ehdokasta pidätetty paikalliseen arviointiin

- **Q209937 ooppera 1945:** pääloggiaan syntyi kuusi kaarta viiden sijasta. Tämä on olennainen arkkitehtuurivirhe; ehdokasta ei pidä ottaa pelikäyttöön.
- **Q1100429 sääasema 1775:** asteikoissa on numeromaisia merkintöjä, ja ikkunaan tuli vuonna 1775 varmentamaton Prahan panoraama. Ehdokasta ei merkitty tilauksen mukaisesti hyväksytyksi.

Pidätetyt ehdokkaat ovat manifestin `heldCandidates`-osiossa ilman R2-URL:ia. Neljän kuvan paikallinen arviokooste, alkuperäiset, kehotteet ja tuotantotiedot ovat työtilassa `output/praha-wien-yksityiskohdat-20261007/`. Kahden toimitetun kuvan R2-vertailu ei sisällä pidätettyjä ehdokkaita.

### Omistajan päätökset avoinna

1. Viides kohta on **Q308720 Lontoon Globe-teatteri Wien-otsikon alla**. Kysyin omistajalta, tehdäänkö Globe Wienin puheeseen, rajataanko erä neljään kohteeseen vai nimetäköön puuttuva Wienin kohde. Vastausta ei ole saatu; Globea ei generoitu eikä kohdetta vaihdettu omin päin.
2. Kysyin lupaa **kahteen kokonaan uuteen korvaavaan generointiin**. Tilaus rajaa määräksi viisi ja sanoo ”ei lisävariantteja”; siksi uutta yritystä ei aloitettu luvatta. Vastausta ei ole saatu. Lopullinen kuvamäärä olisi edelleen neljä tai viisi.

### Lähdetarkennukset

- Klementinumin sarja alkaa vuonna 1775, mutta siinä on aukkoja vuoteen 1783. Modernien kriteerien mukaan täysin aukoton sarja alkaa 1.1.1784. [ČHMÚ:n yksityiskohtainen kuvaus](https://www.chmi.cz/namerena-data/historicka-data/klementinum). Kuvatekstissä ei luvata aukotonta sarjaa vuodesta 1775.
- Oopperan pommitus tapahtui 12.3.1945 ja palo sammutettiin 24 tunnissa. Tilauksen ”heti tulipalon jälkeen” ja huhti–toukokuu ovat ristiriidassa; ehdokkaan kuvateksti käyttää vain vuotta 1945. [Wiener Staatsoper](https://www.wiener-staatsoper.at/magazin/detail/zerstoert-und-wiederaufgebaut-80-jahre-nach-den-bomben/).
- Ruttokuvassa ei ole Karlskircheä: peruskivi muurattiin 1716, vuoden 1713 lupauksen jälkeen. [Wienin arkkihiippakunta](https://www.erzdioezese-wien.at/pages/pfarren/9807/karlskirche/geschichte/article/95049.html).

Nämä ovat erikseen tilattuja puuttuvien yksityiskohtien havainnekuvia. Primäärilähteiden tekstejä käytettiin faktojen tutkimiseen; lähdevalokuvien pikseleitä ei annettu generaattorille. Kuvanveiston pienet yksityiskohdat, kuvattu hiljainen tapahtuma, välinejärjestely, katunäkymä ja tuhon yksityiskohdat ovat havainnollisia, eivät dokumentaarisia aikalaisvalokuvia.

**Tila:** kaksi PNG:tä toimitettu R2:een ja postilaatikkoon. Kaksi korjausta ja viides rajaus odottavat omistajaa. Fablen vastaanotto, toimituksellinen hyväksyntä, peliin kytkentä, näkyminen ja julkaisu ovat erillisiä vahvistamattomia vaiheita. Ei main-mergeä, versionnostoa tai pelin julkaisua Codexilta.
