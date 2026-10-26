# Faktakorjaukset 19.10.2026 (Sisältökirjuri, PT:n pyyntö 15.2x, KK:n putkikatselmus)

## 1. Kolme veljestä (#4953)

Poistettu väitteet "1389 Burgundin herttua" ja "sinertävä/sininen timantti" siitä, missä ne olivat voimassa: `docs/raportit/aarnin-luettelo-tekstit-20261019.json` (europe: kuvaus, ensimmäisen lähteen `tukee`, `epavarmaa`). Uusi kuvaus: "tehty Pariisissa 1389 … keskellä suuri terävä timantti … teetti tulevalle Burgundin herttualle Juhana Pelottomalle". Juhana oli 1389 Nevers'n kreivi, herttuaksi 1404.

Ei muutettu (ne ovat tarkistuksen omaa kirjausta, eivät väitteitä): `kolme-veljesta-faktat-20261011.md` rivit 26 ja 29 (KORJATTAVA/EPÄVARMA-taulukon rivit, jotka lainaavat hylätyn väitteen) ja `isoisan-uni-teksti-20261015.md` rivi 22 (Korjaus 17.10. -huomautus). Peli (`js/packs/europe.js`), `tarina.md`, Raamattu 3.10 ja `uni-v3-kaanon` olivat jo oikein ("keskellä timantti", ei väriä, ei herttuaa). Muita esiintymiä ei löytynyt.

## 2. Mittasääntö 3.10 (aarre = yhden ihmisen kannettavissa)

- **Lähi-itä:** "Sheban kuningattaren suitsukerasia" (kultainen rasia, jonka kuningatar tarun mukaan toi Salomolle). Muutettu: Aarnin luettelon JSON (nimi, kuvaus, epavarmaa; lähteet ennallaan) ja pelin `js/packs/middleeast.js` (pakan nimi, tagline, aarteen nimi ja fakta, intro/löytö/voitto-rivit taivutettuna).
- **Pohjois-Amerikka:** "Montezuman turkoosinaamio". Muutettu: JSON (nimi, kuvaus, epavarmaa; uusi lähde https://en.wikipedia.org/wiki/Mixtec turkoosimosaiikkinaamioista) ja `js/packs/northamerica.js` samoin. Mikään lähde ei yhdistä yhtä naamiota Moctezuman aarteeseen; naamio on legendan/pelin tulkinta, mikä on sanottu `epavarmaa`-kentässä.
- **Kuvat ja kanoni (ei muutettu, Fable/Codex):** pelin aarrekuvat `aarre-middleeast-star.jpg` (arkku) ja `aarre-northamerica-star.jpg` (turkoosi-kulta-koru) sekä `tools/aarrekuvat-promptit.md` rivit 107 ja 111 voivat tarvita uuden kuvan. `docs/isoisan-raamattu.md` rivit 546 ja 556 ("Sheban aarre", "Montezuman aarre") ja `docs/tarina.md` rivi 108 ovat kanonia, johon vain PT kirjoittaa.

### Oseania: ehdotus kahdeksi kannettavaksi aarteeksi (ennen 1820 tunnettuja; EI vielä tekstiin)

Eteläristin helmi löytyi 1883, joten 1800-luvun alun Aarni ei voi tuntea sitä.

1. **Kalaniʻōpuʻun höyhenviitta ja -kypärä (Havaiji, 1779).** Päällikkö Kalaniʻōpuʻu pani viitan ja kypärän (ʻahu ʻula, mahiole) Cookin päälle 26.1.1779; ne päätyivät Leverianin kokoelmaan Lontooseen, huutokauppaan 1806 ja Charles Winnin ostamiksi 1819; Te Papa sai 1912, paluu Havaijille lainana 2016. Yhden ihmisen kannettavissa, tunnettu ennen 1820, "unohdettu" kokoelmien hajoamisen takia (osa Cookin viitoista on kadonnut). Lähde: https://en.wikipedia.org/wiki/%CA%BBAhu_%CA%BBula (osio Captain James Cook collection). Vahvistettava ennen tekstiä: museolähde (Te Papa/Bishop Museum).
2. **Maro ʻura, punaisen höyhenen vyö (Tahiti/Raiatea).** Seurasaarten päälliköiden vallan näkyvä symboli ja ʻOro-kultin esine jo ennen eurooppalaisia; Raiatean Taputapuātean maraelta; 1816 kristityksi kääntynyt Tamatoa III poltti ʻOron ja Hiron epäjumalat ja piti vyötä pahana henkenä (Wikipedia: Society Islands, Fenuapeho). Kannettava (vyö), legendaarinen ja tunnettu ennen 1820. **Heikko kohta:** vyön myöhempää kohtaloa en ole varmistanut; tarvitaan tutkijalähde ja museolähde ennen tekstiä.

Suositus: 1 on luotettavampi lähteiltään ja kuvataan museoesineenä; 2 on tunnelmaltaan "unohdettu aarre", mutta tarvitsee lisälähteen.

## 3. Puyin "keisarinnaäiti" (Longyu kuoli 22.2.1913)

Huudoissa ei ole yhtään **hyväksyttyä tai äänitettyä** "keisarinnaäiti"-riviä: kaikki seitsemän ovat `juoksupeli-rikkoutuvat-51-avaimet-20261019.json`-pohjalistan `huuto.3`-rivejä, joista ei ole generointilistassa riviä. Näistä esineistä hyväksytyt rivit ovat toiset (bianqing "Katos vaan! Tämä soi uudenvuoden juhlassa!", famille rose "Noin! Huang e'niang näki kaiken!", ruyi, yixing). **Uusintaottoa ei tarvita.**

Viittaus: 1914 palatsissa lasta hoitivat Longyun jälkeen jääneet neljä dowager-konkubiinia (Duankang, Jingyi, Ronghui, Zhuanghe; "neljä äitiä", `puyi-lapsuus-faktat.md` rivi 85); ankarin oli Duankang. Omistaja on jo hyväksynyt muodon "Huang e'niang" (famille rose). Ehdotus korvaajaksi: **"Huang e'niang"** (yhtenäinen hyväksyttyjen rivien kanssa).

| avain (`juoksupeli.rikkoutuva.…`) | nyt | ehdotus |
|---|---|---|
| famille-rose-maljakko.huuto.3 | Keisarinnaäiti kuulee tämän kyllä! | Huang e'niang kuulee tämän kyllä! |
| tuoksupoltin.huuto.3 | Keisarinnaäiti haistaa ongelman jo! | Huang e'niang haistaa ongelman jo! |
| bianqing-kivikellot.huuto.3 | Keisarinnaäiti pitää korvat tukossa! | Huang e'niang pitää korvat tukossa! |
| zun-malja.huuto.3 | Keisarinnaäiti kuuli tuon kolahduksen! | Huang e'niang kuuli tuon kolahduksen! |
| falangcai.huuto.3 | Keisarinnaäiti kuuli! Mä oon mennyttä! | Huang e'niang kuuli! Mä oon mennyttä! |
| metallipeili.huuto.3 | Keisarinnaäiti kysyy, kuka rikkoi sen? | Huang e'niang kysyy, kuka rikkoi sen? |
| hiustanko-liangbatou.huuto.3 | Keisarinnaäiti suuttuu, se oli hänen! | Huang e'niang suuttuu, se oli hänen! |

Kuvakuvaukset (kupla), jotka mainitsevat "keisarinnaäidin" (voimassa vain jos kuvia ei ole vielä generoitu; muuten kuva vaatii tarkistuksen): `yixing-teekannu.kupla` ("naurava keisarinnaäiti" → "naurava hovin nainen"), `ruyi-valtikka.kupla` ("säteilevälle keisarinnaäidille" → "säteilevälle hovin naiselle"), sekä yhteinen `juoksupeli.kuvaohje.kupla` ("keisarinnaäidit" → "dowager-konkubiinit/hovin naiset").

Pohjalistoja ei ole muutettu; ehdotus odottaa PT:n kuittausta (huudot ovat jo muuten hyväksyttyjen rivien ulkopuolella, joten korjaus on tehtävissä samalla kun erä 3 tehdään).
