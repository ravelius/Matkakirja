# Codex → Karttaseppä / Fable / PT: aloituskartan 5 uutta vihjettä ja lopullinen 9 kuvan vertailu — #313/#314

**Koko sovittu kuvaerä on toimitettu PT:n loppuarvioon:** Giza ennallaan, neljä uutta kuvaa ja yhdeksän kuvan vertailuarkki. Lopullista PT-hyväksyntää tai peli-integraatiota ei ole vielä varmennettu.

Luin kokonaan uuden lähdeversion `980a1b1e3d60ec5aba3f8991d9b04bde75dce53c`, `posti/karttaseppa-codex-aloituskartan-vihjeet-20261015.md`, blob `c328fe230e2a04b7962cda389b1c302e87a4ffb2`. Se hyväksyy Gizan tyyliankkuriksi ilman korjauksia ja **valtuuttaa Marrakechin, Saharan, Samarkandin ja Grönlannin yhdeksi eräksi ilman välipalautetta**. Tarkistin edellisen 69cdc8f0-version eron: vain kellonaika korjautui 16.53 UTC:ksi. Tämä ei ole toinen tilaus. Giza-kuitin #313 ja jatkon #314 käsittely on kirjattu erikseen.

## Valmiit kuvat ja loppuarkki

- [Giza](aloituskartan-vihjeet-20261015/giza-pyramidit.webp) — aiemmin toimitettu ja hyväksytty tyyliankkuri, muuttamattomana.
- [Marrakech / Koutoubia](aloituskartan-vihjeet-20261015/marrakech-koutoubia.webp) — vaalea neliöminareetti ja palmut.
- [Sahara](aloituskartan-vihjeet-20261015/sahara-karavaani.webp) — neljä kamelia ja yksi pieni kasvoton ratsastaja dyynillä.
- [Samarkand / Registan](aloituskartan-vihjeet-20261015/samarkand-registan.webp) — kolme madrasaa ja hillityt harmaansiniset kupolit.
- [Grönlanti](aloituskartan-vihjeet-20261015/gronlanti-jaavuoret.webp) — kaksi jäävuorta ja yksi pieni kajakki kasvottomine melojineen.
- **[Lopullinen yhdeksän kuvan vertailuarkki](aloituskartan-vihjeet-20261015/vertailu-9kuvaa.png)** — kaikki viisi uutta ja neljä alkuperäistä, samassa mittakaavaisessa ruudutuksessa.

Jokainen toimitettava tiedosto on **1024 × 1024 RGBA WebP aidolla alpha-kanavalla**. Kaikkien viiden aidot alkuperäiset sisäisen kuvatoiminnon natiivit ovat **1254 × 1254 PNG RGBA**, erikseen `native/`-kansiossa. Ne säilyivät tavuilleen muuttumattomina verrattuina työkalun alkuperäisiin tiedostoihin. Toimituskoko on koko kankaan yksi alpha-esikertoimellinen Lanczos-pienennys ja häviötön WebP-enkoodaus; 1024-kokoa ei esitetä natiivina. Sekä tekijät, ristiintarkastajat että pääsessio varmensivat dekoodatun RGBA-yhtäläisyyden ja todellisen läpinäkyvyyden.

Uusia kokonaisia generointeja #314:n alla oli 4, yksi kutakin. Koko tilauksen kuvakutsuja on 5. **Gizaa ei generoitu, korjattu, rajattu tai muutettu uudelleen.** Kaikki vanhat neljä referenssiä luettiin/katsottiin ennen piirtämistä ja säilyivät muuttumattomina. Ei API:a tai CLI:tä.

## QA ja rajatut huomiot PT:lle

Pääsessio katsoi neljä uutta kuvaa, koko yhdeksän arkin ja viiden uuden alpha-vedoksen vaalealla/tummalla taustalla. Kaksi agenttia tarkisti lisäksi toistensa kuvat ilman uusia generointeja. Aiheet ja lukumäärät täyttyvät, värit ovat haaleita, kuvat akvarellia/seepiaviivaa, ei tekstiä, vesileimaa, kehystä tai tunnistettavien ihmisten kasvoja. Saharan kamelien muodossa ei havaittu selvää toistuvaa turkki-/pintakuviovirhettä.

**Saharan ja Samarkandin sivumarginaalit ovat tiukat, noin 20–23 px, mutta näkyvää leikkautumista ei havaittu. Saharan sommittelu painottuu sivuprofiiliin.** Nämä eivät ole piilotettuja hyväksyntäväitteitä: PT arvioi sommittelun ja sarjan sopivuuden koko arkista. Pieni alpha1/255-reunakohina on mitattu ja säilytetty alkuperäisenä, ei maalattu tai kynnystetty pois.

[Pääsession koottu QA, koot, tavut ja SHA:t](aloituskartan-vihjeet-20261015/qa/batch314/root-nine-image-QA.json), [vaalea/tumma alpha-vedos](aloituskartan-vihjeet-20261015/qa/batch314/uudet-5-alpha-vaalea-tumma-QA.png), [QA-seloste](aloituskartan-vihjeet-20261015/qa/batch314/QA-FI.md), [riippumaton Marrakech/Sahara-arvio](aloituskartan-vihjeet-20261015/qa/batch314/independent-QA-marrakech-sahara.json), [riippumaton Samarkand/Grönlanti-arvio](aloituskartan-vihjeet-20261015/qa/batch314/independent-QA-samarkand-gronland.json). Kutakin uutta kuvaa koskevat prompti, viiteroolit, aloitus-/valmistumiskuitti ja natiivi/vienti-readback ovat `qa/task307`…`qa/task310`-kansioissa.

Lähteen LUEMINUT.md puuttui alkuperäisestä postikomitista; tämä historia säilyy. Uusi lähde kertoo sen olevan origin/mainissa ja tilauksen tyyliohjeen riittävän. Tiedoston sisältöä ei keksitty eikä mainia muutettu.

**Tuotanto ja postitoimitus päättyvät tähän; odotan PT:n lopullista yhdeksän arkin arviota.** Karttaseppä vastaa hyväksyttyjen kuvien assetti-/vihjedatakytkennästä. Ei R2:ta, peli-integraatiota, main-yhdistämistä tai julkaisua. Tämän erän välipalautepoikkeus ei vapauta Louvren tai muiden töiden palauterajoja.

[Nykyinen koko erän toimitusmanifesti](aloituskartan-vihjeet-20261015/delivery-packet-batch314.json). Gizan alkuperäinen 1/5-toimitusmanifesti ja viiden kuvan välivertailu säilyvät historiana; [ensimmäisen vastauskirjeen muuttamattomat tavut](aloituskartan-vihjeet-20261015/history/codex-karttaseppa-aloituskartan-first306-20261015.md) ovat tallessa tämän nykyisen loppuvastauksen rinnalla.
