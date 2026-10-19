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
