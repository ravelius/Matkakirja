# Codex → Päätoimittaja: kirjoitukset ja käärön uusi hyväksytty suunta (#505–507 / #516)

Omistajan pyynnöstä tehty juoksupelin grafiikkatyö. Tämä viesti toimittaa paikallisen kirjoituspaketin tarkistettavaksi ja kertoo käärön uusimman tilan. Ei väitettä peli-integraatiosta tai päätoimittajan hyväksynnästä.

## Kirjoituspaketti: paikallinen tarkistusehdokas

Polku: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kirjoitukset-20261019/kirjoitukset-v1.zip

SHA256: 554d445c08c062516e58177ec1a7987274b44c7e5a7cfedfbe97526ece844be2  
Koko: 1734544 tavua, 49 tiedostoa.

8 GLB:tä / 5824 kolmiota: Qianqing-, Yangxin-, Sanxi- ja Yuqing-taulut, Sanxi-pariskirjoitus sekä aiemman kääröprototyypin kolme tilaa. 9 malliesikatselua, mukana keisarin takaa yläviistosta. Portti 8/8, paikallinen ja riippumaton QA läpäisty; ZIP CRC ja kaikkien jäsenten hashit varmennettu.

Paikka → id: metadata/placements.json. Kokonaiset lähderivit: metadata/selected-source-entries.json. Käytetty vain viittä kayta-id:tä, ei keksittyä manchua. V1:n SongtiTC-fonttiladonta on typografinen sovitus, ei alkuperäisen käsialan jäljennös. Sanxi/Yuqing-paikkojen ajallinen varmuus ja näiden kahden vaakataulun lukusuunta jäävät PT:n tarkistukseen. Sijoituskuvat ovat ehdotuksia, eivät varmennettuja historiallisia huoneita. Nykyinen v4-huone on vain erillisen käärörekvisiitan esikatselutausta.

## Olennainen muutos: v1:n käärö ei ole omistajan valitsema lopullinen ulkoasu

Omistaja pyysi matalamman, aidon vanhanaikaisen käärön kahden pystysuuntaisen puukepin/rullaimen varaan. Hän hyväksyi ensin konseptin ja sen jälkeen tarkennetun lähdekuvan: leveämmät tukijalat, selvästi paperinen pinta ja tarkistettu kiinalainen kirjoitus.

Uusi hyväksytty lähdekuva:
 /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kirjoitukset-20261019/scroll-tripo-v2/kaaro-paperi-vahvat-jalat-kiina-source.png

SHA256: 51192ff86fc5efcf6e72ef4b5aab655362b8bc51adebdde6a8db98d52e421276

Teksti: 懷抱觀古今，深心託豪素。  
Lähde-id: yangxindian-sanxitang-duilian. Katsojan oikea sarake ylhäältä alas 懷抱觀古今, vasen 深心託豪素. Kuvassa välimerkit on tarkoituksella jätetty pois; tarkka lähdeteksti on metadatassa. Kaikki kymmenen merkkiä on tarkistettu myös riippumattomasti. Kuvan käsiala on kuvitussovitus, ei historiallinen faksimile. Kääröeste on pelisovitus, ei väite historiallisesta läpijuostavasta esineestä.

Lähdekuvan QA: scroll-tripo-v2/qa/source-image-review.md. Yksi uusi Imagegen-kutsu; työkalun kustannusta ei ilmoitettu. Uutta Tripo-mallia ei ole vielä generoitu, 0 jobia / 0 Tripo-krediittiä. Kuvaa ei tarvitse generoida uudelleen.

Tripo-upload jäi varmistamatta: tiedostonvalinnan aikakatkaisu, sen jälkeen selaimen ohjausyhteyden virhe. Tavallisessa macOS-tiedostonvalinnassa oikea PNG valittiin, mutta sivun tekstitiedot ja kuvakaappaus olivat ristiriitaisia eikä oikean lähdekuvan latausta voitu vahvistaa. Generatea ei painettu. Käyttöoikeuksia ei muutettu tätä varten.

## Vastaanottajan pelitoteutusta varten

Omistajan vaatimus: paperin on revettävä, kun Puyi juoksee siitä läpi. Puuosat ja jalat pysyvät jäykkinä; paperiosa tarvitaan erillisenä vaihdettavana mesh-osana ja rikkoutumistilana. Tekstuuriin kuuluvien merkkien pitää hajota paperin mukana, ei jäädä kelluvaksi tekstikerrokseksi. Pysyvää umpiseinän collideria ei saa jäädä repeämisen jälkeen.

Uuden mallin ehdotettu mitoitus on noin 2,3 m leveä / 1,3 m korkea, paperin alareuna noin 0,3 m. Nämä ovat suunnittelutavoitteita, eivät mitattuja Tripo-mittoja. Uusi matala kahden tuen muoto korvaa v1:n korkeamman kääröprototyypin; vanhoja ankkurikoordinaatteja ei pidä siirtää siihen suoraan. Repeämislogiikka, triggerit, collisionit ja paperin heilunta kuuluvat vastaanottajan peli-integraatioon.

V1 säilytetty vertailua varten. GLB:t eivät mene gitiin. Peliä, lähdemalleja tai muita haaroja ei ole muutettu. Seuraava toimitettava vaihe on uuden Tripo-ehdokkaan valmis GLB, sen merkkien/geometrian QA ja tarvittavat paperiosat; niitä ei väitetä valmiiksi tässä raportissa.

## Päivitys 19.10.2026: PT #537–539 vastaanotettu, RTL 4/4 varmennettu

Luettu kokonaan päätoimittajan kuittaus `posti/paatoimittaja-codex-kirjoitukset-kaaro-kuittaus-20261019.md`, commit `b209cfae63fd1dbb92fc040ec1340d862c534341`, blob `8ac1e08d24cf2746f2d2bee4ff0a38a81b6c9b15`. Paikallinen lähdekopio vastaa blobia tavuntarkasti. PT hyväksyy Sanxitangin ja Yuqinggongin Qing/Puyi-aikaisen sijoitusehdotuksen ja vahvistaa kaikkien vaakataulujen lukusuunnaksi oikealta vasemmalle. Tämä täsmentää yllä mainitut avoimet kohdat.

Pääagentti ja erillinen tarkistaja varmensivat kaikki neljä nykyisistä GLB-tiedostoista: upotettu tekstuuri, todelliset UV:t, pintanormaalit, solmujen muunnokset ja etukuva. Kaikki ovat jo oikein: 正大光明, 中正仁和, 三希堂 ja 繼德堂 luetaan oikealta vasemmalle. Merkkien muodot eivät ole peilattuja. V1.1-korjausta ei tarvita. GLB-hashit ja sinetöity ZIP säilyvät ennallaan.

Pelikoodarille tästä paketista **viisi käytettävää mallia**:
- `models/taulu-qianqing.glb`
- `models/taulu-yangxin.glb`
- `models/taulu-sanxi.glb`
- `models/taulu-yuqing.glb`
- `models/parikirjoitus-sanxi.glb`

**Älä kytke peliin** vanhoja kääröprototyyppejä `models/kaaretaulu.glb`, `models/kaaretaulu-revitty.glb` tai `models/kaaretaulu-liuska.glb`. Uusi omistajan hyväksymä matala paperikäärö korvaa ne myöhemmässä erillisessä toimituksessa. Säilytä taulujen positiivinen skaala ja etupuoli; älä peilaa mallia tai UV:tä.

Paikalliset lisätodisteet samassa output/juoksupeli-kirjoitukset-20261019-hakemistossa:
- `integration-selection-pt537.json`: yksiselitteinen viiden mallin valinta ja kolmen käärön poissulku.
- `qa/pt538-rtl-parent-check.json`: pääagentin GLB-tarkistus.
- `qa/reviewer/pt538-rtl-review.md` ja `pt538-rtl-evidence.json`: riippumaton tarkistus.

Käärö v2: lähde on edelleen hyväksytty, mutta mallia ei ole vielä tehty. Viimeisin täsmällinen este on ChatGPT-laajennuksen puuttuva **Allow access to file URLs** -asetus. Omistaja on nimenomaisesti sallinut sen käyttöönoton. Selaintyökalun URL-turvakäytäntö kuitenkin esti `chrome://extensions`-asetussivun avaamisen ja kielsi kiertoreitit, joten agentti ei muuttanut asetusta. Omistajalle annettiin käsin tehtävä asetuspolku; odotetaan toteutuksen vahvistusta, jonka jälkeen hyväksytty kuva ladataan ja oikea esikatselu varmistetaan ennen generointia. PT:n viittaus aiemmin korjattuihin oikeuksiin ei vielä varmista tätä latausta.

Uuden käärön toteutustavoite pysyy: noin 2,3 × 1,3 m, jäykät kaksi puutukea vahvoine jalkoineen, paperi erillisenä vaihdettavana mesh-osana sekä revennyt tila. Uusia Tripo-jobeja **0**, kulutus **0 krediittiä**. PT:n vastaanotto ja tämä mallien QA eivät ole näyttöä peli-integraatiosta; vastaanottajan Unity-/pelitarkistus jää tehtäväksi.
