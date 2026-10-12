# Taškent — rajattu A-lähdekooste C-luonnosta varten

Omistus: sessio 05, vain e09/taskent. Luettu 12.10.2026. Työjuuri on olemassa oleva NAS-klooni `sessio-72-20261011/e09`. Tämä on rajattu lähdekooste, ei täysi A-portti eikä riippumaton D-varmennus.

## 0. Lähteet ja hakutapa

Yhteinen `valiaikainen/sallittu_haku.py`: robots ensin, jokaisen lähdesivun redirectit erikseen tarkistaen, yhteinen yhden sekunnin hakuportti. Ei API-, Commons-, kuva- tai PDF-hakuja. Tallenteet ja tarkistustodisteet ovat `valiaikainen/nopea-e09-taskent/`-kansiossa; lähteiden ja tuotantotiedostojen SHA256:t `SHA256SUMS.txt`:ssä.

- S1 [Tashkent](https://en.wikipedia.org/wiki/Tashkent), osiot Etymology; Islamic Caliphate; Kokand Khanate; Tsarist period; Languages; Districts; Main sights; Transportation. Tallenne `city.html/txt`.
- S2 [Tashkent, Wikivoyage](https://en.wikivoyage.org/wiki/Tashkent), osiot Understand; Talk; Get in/By train; Get around; Old town; Museums; Parks; Buy; Eat. Tallenne `voyage.html/txt`. Käytännön palvelutiedoissa ei hintoja, aukioloaikoja, linjanumeroita tai nimettyjä ravintolasuosituksia.
- S3 [Kukeldash Madrasah (Tashkent)](https://en.wikipedia.org/wiki/Kukeldash_Madrasah_(Tashkent)), johdanto, rakennustapa, korjaukset, käyttöhistoria ja koordinaatit. Tallenne `kukeldash.html/txt`.
- S4 [State Museum of Applied Arts of Uzbekistan](https://en.wikipedia.org/wiki/State_Museum_of_Applied_Arts_of_Uzbekistan), History: Polovtsevin talon rakennus- ja käyttöhistoria. Tallenne `museum-wiki.html/txt`.
- S5 [Uzbekistan Railways](https://railway.uz/en/), yhtiön oma sivu: Passenger transportation, Online purchase of tickets ja matkustajapalvelut. Tallenne `railway.html/txt`. Vahvistaa verkkolipunmyynnin olemassaolon; yksittäiset asemat ja kaupungit S2:sta.

Muut luetut mutta tekstifaktana käyttämättömät lähteet: [Boris Grabovsky](https://en.wikipedia.org/wiki/Boris_Grabovsky) ja [Early Television Foundation / Television in Uzbekistan](https://earlytelevision.org/uzbekistan.html). Televisioaihe poistettiin: säätiön oma historiakooste ilmoittaa koonneensa aineiston verkkosivuista ja pitää tapahtumien luotettavuutta epävarmana. Ei television ensimmäisyys-, kokeilu- tai tekniikkaväitteitä lopulliseen C:hen.

Epäonnistuneet haut, ei käytetty todisteena: Yunus_Khan_Mausoleum-artikkeli HTTP 404; `uzbekistan.travel`-verkkotunnuksen robots.txt HTTP 301 ja Location `/ru/robots.txt/` (lähdesivua ei haettu); `artmuseum.uz` ja `www.artmuseum.uz` TLS `UNRECOGNIZED_NAME` robots-vaiheessa (virallista lähdesivua ei haettu). HTTPS- tai robots-vaatimuksia ei ohitettu.

## 1. Olemassa oleva aineisto ja rajaus

`konteksti.json` luettu. Uzbekistanin maalehdellä ovat jo kaupungin maanjäristys, metro kuvataideaiheena, plov, leipä, yön yli kypsyvä pata, tee, suzani, ikat ja keramiikka sekä historialliset matemaatikot ja musiikkiaiheet. Näitä ei kerrota uudestaan uusina nostoina. Metro mainitaan vain oppaan kulkuneuvona; maanjäristys ei ole tämän lehden tarina.

Uudet kaupungin aiheet: nimihistoria, Chorsu arkisena kauppapaikkana, Ankhor-kanavan yli kasvanut uusi asutus, kieli ja kirjoitusasut, Kukeldashin tiilien uudelleenkäyttö ja rakennuksen muuttuvat tehtävät, vanhat daha-kaupunginosat, Polovtsevin talon käyttöhistoria sekä vanhan kaupungin savinen puolustus.

## 2. Luvut, ristiriidat ja ajallinen kehys

Tarkat perustamisvuodet, porttien määrät, muurin pituudet, etäisyydet, asukasluvut ja väestöosuudet jätetty pois. S1 antaa vanhan kaupungin porteista eri kohdissa 12 ja 11 sekä muurille eri pituuksia. C sanoo vain savimuuri, vallihauta ja portteja. Nimessä kivikaupungin tulkinta on tavanomainen, mutta Chach-etymologian tutkijakiista kerrotaan avoimesti.

S3 ajoittaa Kukeldashin noin vuoteen 1570, S1 Abdullah Khan II:n aikaan ja S2 nimeää eri perustajan kuin S3. Ei tarkkaa vuotta tai perustajan nimeä C:hen; vain 1500-luku. Tiilien uudelleenkäyttö 1830–1831 muuttuu 1800-luvuksi, opetukseen palautuminen 1990-luvulla viime vuosisadan lopuksi. Tiedossa oleva vanha rakentamisaika riittää toteamaan rakennuksen olemassaolon isoisän matkavuonna 1873. Sen tarkkaa silloista ulkoasua, käyttöä tai isoisän tekemisiä ei keksitä.

Kontekstin väestöluku koskee Taškentin kaupungin pysyvää väestöä 1.10.2025. Se ei ole ympäröivän maakunnan tai metropolialueen väkiluku. Lukua ei käytetty teksteissä.

Yunus Khanin mausoleumista S1 sanoo hauta ja S2 ettei henkilöä ole haudattu sinne. Oma kohdehaku 404. Ei hautaväitettä, koordinaattia eikä karttakohdetta.

S4 sanoo museon olleen Polovtsevin talossa 2000-luvun alkuun asti, mutta S1 ja S2 kuvaavat sitä edelleen museon taloksi. Virallinen sivu ei avautunut TLS-virheen vuoksi. C:n nosto kertoo vain talon HISTORIALLISET käyttövaiheet; opas ei suosittele vierailua talossa tai väitä nykyistä museokäyttöä. Oppaan kolmas jakso ja parasta-rivi koskevat S2:n kasvitieteellistä puutarhaa.

## 3. Lopullisten tekstien väitepohja

| Sisältö | Lähde ja tarkistettu asia |
|---|---|
| Intro ja Lue lisää | S1 kaupan historia, keidas ja jokivedet, vanhat daha-nimet, Ankhorin eri puolet, kielimaisema; S2 laaja kaupunki ja liikkuminen, Chorsu; S3 medresan tehtävät; S4 historiallinen asuintalo, orpokoti ja käsityöopetus |
| Kivikaupungin nimessä on monta kerrosta | S1 Etymology/Islamic Caliphate: tavanomainen kivikaupunkitulkinta, Chach/Shash/Binkath ja vanhan etymologian eri tutkimustulkinnat |
| Basaari on samalla kaupungin osoite | S1 Main sights ja S2 Old town/Buy: Chorsu vanhassa kaupungissa, Kukeldash lähellä, hedelmät, vihannekset, mausteet, käsityöpajat ja ruokailupaikat. Ei basaarin modernin kupolin tekijänoikeusaihetta |
| Kanavan toiselle puolelle kasvoi uusi kaupunki | S1 Tsarist period: Ankhor-kanavan toiselle puolelle varuskunta ja venäläinen asutus, kauppiaat, Venäjän Turkestanin hallinnollinen keskus. Neutraali siirtomaahistoria, ei taistelukuvauksia |
| Kaupungin voi lukea kahdella aakkostolla | S1 Languages, S2 Talk ja kontekstin nimiAlkukieli: uzbekki, venäjä asiointikielenä, latina/kyrilliset kyltit, Toshkent/Taškent |
| Medresan tiilet päätyivät toiseen kouluun | S3 käyttöhistoria ja rakennusmuutokset; S2 vahvistaa caravanserai/fort/museum/medresa-vaiheet. Ei tarkkoja vuosia |
| Kaupunginosat edelsivät yhteistä kaupunkivaltiota | S1 Districts ja Kokand Khanate: daha-nimet, Shaykhontokhurin Yunus Khoja, yhdistyminen 1700-luvun lopulla ja myöhempi Kokandin valta |
| Koti, orpokoti ja käsityömuseo | S4 History: Polovtsevin talo, myöhäinen 1800-luvun rakennus, paikalliset sisustajat, orpokoti, ganch-/metallityön koulutus ja kirjontatyöpaja, käsityömuseo. Ei nykykäyttöväitettä eikä yksittäisiä sisustusteoksia kuva-aiheiksi |
| Kivikaupungin puolustusmuuri oli savinen | S1 Kokand Khanate ja Islamic Caliphate: adobe, vallihauta, portit, kauppa Venäjän kanssa, varhaisemmassa Shashissa linnoitus/varsinainen kaupunki/esikaupungit, palatsi ja vankila linnoituksessa. Ei porttien määrää tai muurin pituutta |
| Opas 1 | S2 Get in/By train ja Get around: lentoasema TAS, asemat Central/South, junia Samarkandiin/Buharaan, ennakkoliput; S5 verkkolipunmyynti |
| Opas 2 | S2 Old town ja S3: Chorsu, Kukeldash, opiskelijahuoneet ja palautunut opetuskäyttö. Pääsyä ei luvata |
| Opas 3 | S2 Parks/Walk: puustoinen rauhallinen kasvitieteellinen puutarha, kaupungin laajuus ja alueiden väliset siirtymiset |
| Opas 4 | S2 Buy/Eat: Chorsun elintarviketarjonta ja ruokailu, kaupungin uzbekki-, keskiaasialainen, kiinalainen ja eurooppalainen ravintolatarjonta, kahviloiden leivonnaiset. Ei maalehden ruokatarinoita |
| Opas 5 | S2 Understand: kuuma kesä, kylmä talvi, kevät/syksy kävelyaikoina. Ei lämpö-, sade- tai kuukausinumeroita |
| Visa 1–5 | S1 pääkaupunki, Chorsu ja Ankhor; S3 purettujen tiilien käyttö; S4 orpokoti. Jokainen vastaus on muissa teksteissä, tasot 1–3 mukana |
| Tiedot 1–3 | S1 nimet ja puolustus, S1/S2/konteksti kirjoitusasut ja aakkostot |
| Minitehtävä | Savimateriaali saman historia-sivun neljännessä nostossa; ei toista visan tiilien uudelleenkäyttöä koskevaa kysymystä |

## 4. Kartta ja kohdejuttu — partial

Vain **Kukeldashin medresa**. Oman S3-artikkelin koordinaattitaulu `41.32306, 69.23583`, viisi desimaalia. Ei kaupungin, basaarin tai lähiaseman piste. Rajaus on historiallisen Chorsu/Kukeldash-ytimen ympärillä ja kattaa pisteen marginaalilla.

Jutun väitteet S3: 1500-luku, keltainen tiili, portaali, sisäpiha, opiskelijahuoneet, 1700-luvun karavaanien majoitus, linnoitus, 1800-luvun purku ja tiilien siirto Beklarbegiin, korjaukset, museokäyttö/kansanmusiikki ja paluu medresaksi. Historiallinen rakenne vanha; mahdollisia myöhempiä suojattuja koristeita ei valittu kuvaksi. Jutussa ei arvata vuoden 1873 ulkoasua.

Kartta **1/6–8**, täysi kohdemääräportti avoinna. Muut paikat vaativat oman WP/WD-pisteen ja paikkafaktat. Chorsun nykyinen kupoli, metro, TV-torni, uudet muistomerkit sekä Polovtsevin talon nimetyt sisustusteokset eivät ole karttakohteita tai kuvatilauksen aiheita. Niiden tekijärajat eivät ole varmennetut.

## 5. Kuvat, sää ja avoimet portit

Ei valmista B-valintaa. Kaikissa 19 kuvaroolissa `tiedosto`, `lyhyt`, `selite`, `lahde` tyhjät. Ei kuvahakuja, generointia, vanhoja kuvia tai arvattuja asset-nimiä.

`saatiedot:null`, koska yhteisen sääpoiminnan 48/48 primäärivarmennus on avoin. `saa.json` ei muutettu. Oppaan yleinen sääteksti on S2:sta ilman lukuarvoja.

Avoinna: muu A-kartta ja teosrajat, B/kuvaputki, sääauditointi, muuttuvien opastietojen riippumaton D, E/F, toimituksellinen hyväksyntä, integrointi ja julkaisu. Epävarma televisioaihe poistettu; museotalon nykykäyttö ja Yunusin hautatieto rajattu pois teksteistä, ei muutu piilossa varmennetuksi.
