# Codex → PT/KK/SK: Turun lähdetarkistus #2441–2444

16.11.2026. Kaikki neljä postiversiota luettu kokonaan ja niiden Git-blobit tarkistettu. #2444:n järjestys ratkaisee: ensin saatavuus ja huoneiden silmämääräinen tarkistus; leikkaustasoehdotus vasta tämän jälkeen. Tämä on vastaanottokuittaus ja tarkistusraportti, ei mallikuva tai mallitoimitus.

## A. ArkMP:1903_014:n saatavuus

Commonsin täsmähaku palautti 0 osumaa; rajattu hakutulos ja piirustusluokan tarkistus on jo toimitettu commitissa `48beab6854f474dfa290a060832f1f81a4f68806`. Saman haun uusiminen ei tuo uutta tietoa. Oikeaa ArkMP:1903_014-kuvaa tai sen käytettävissä olevaa paikallista polkua ei ole vielä saatu.

Seuraava tarvittava aineisto on **KK:n järjestämä omistajan lataus tai olemassa olevan oikean kuvan täsmällinen polku**. Finnassa ei käyty eikä sen API:a tai kuvia haettu. RHS:n sivun 134 leikkaus on vuoden 1832 viljalaarisuunnitelma (KA, RakH II Iba 97:4); se ei ole Nyströmin ArkMP:1903_014, joten sitä ei nimetä tämän korvaavaksi lähdekuvaksi.

## B. Silmämääräinen tarkistus tehty

Päälähde on [Senaatin julkaisema Turun päälinnan rakennushistoriaselvitys, osa 1](https://www.senaatti.fi/app/uploads/2024/04/978-952-368-117-0_2023_Kari-Jarvinen-ja-Merja-Nieminen-arkkitehdit_Turun-linna-paalinna_RHS_s.pdf). Tarkistin koko sivun kuvat **134, 137 ja 203 sekä tarvittavan lisäsivun 205**. PDF:n sivut ovat vastaavasti 135, 138, 204 ja 206.

| Huone | Piirroksesta varmistettu sijainti | Painettu sivu |
|---|---|---|
| M303, Jordanin kamari | Päälinnan 3. kerroksen itätornin ulkoneva itäinen tila, M301:n vieressä. Ei koko tornin ylin kerros. | 203; 137:n kuvateksti tukee nykyistä kerrosnumeroa |
| M501, Herttuan kamari / sakaristo | Itätorni, nykyinen 5. kerros. N501 on viereisessä eteläsiiven itäosassa; historiallista suoran oven väitettä ei päätellä pelkästään tästä nykyisestä pohjasta. | 205 |
| G301, Iso linnantupa | Eteläsiiven länsiosa, nykyinen 3. kerros. | 203 |
| G501, eteläinen sali | Eteläsiiven länsiosa, nykyinen 5. kerros; sama rakennusosa G301:n yläpuolella. | 205 |
| J503, Kuningattarensali | Pohjoissiiven länsiosa, nykyinen 5. kerros; J501:n itäpuolella. | 205 |
| J307, varavalinta | Keskiaikainen kuninkaansali, pohjoissiiven länsiosa, nykyinen 3. kerros. | 203 |

Sivulla 203 otsikko nimeää nimenomaisesti nykyisen 3. kerroksen ja sivulla 205 nykyisen 5. kerroksen. Näiden huoneiden kerroksia ei siten tarvitse perustella pelkällä koodin ensimmäisestä numerosta tehdyllä oletuksella. Sivu 137 vertailee vuoden 1865 toista ja kolmatta kerrosta nykyisiin kolmanteen ja viidenteen; vanhaa ja nykyistä numerointia ei saa sekoittaa.

### Korjaukset SK:n raporttiin

1. **Sivu 203 ei yksin varmista viidennen kerroksen koodeja.** M501, G501 ja J503 näkyvät sivun **205** pohjassa. Lisää se lähdeviitteeksi.
2. Väite, ettei Kuningattarenkamarille löydy RHS:stä koodia tai paikkaa, on korjattava: sivu **205 nimeää J501:n Kuningattarenkamariksi**, pohjoissiiven länsipäähän, 5. kerrokseen. J503 on erillinen Kuningattarensali. Tämä ei itsessään muuta tilattua neljän kohdan huonevalintaa eikä todista eri kertomusten tapahtumia.
3. Sivulla 205 myös K503 on nimetty kuninkaansaliksi. Varavalinnassa käytetään nimenomaan koodia **J307**, jotta se ei vaihdu huomaamatta toiseen saliin.

## C. Kuvien ja ajoituksen rajat

Sivut 203 ja 205 esittävät nykyistä huonejakoa sekä eri rakennusvaiheiden värikoodeja; niitä ei pidä käsitellä yhden historiallisen vuoden sellaisenaan säilyneenä pohjana. Sivut 134 ja 137 kuvaavat 1800-luvun varastokäyttöä. Tapahtumavuosien huonejärjestys, holvit ja ovet vaativat edelleen ajallisen tulkinnan. Tässä työssä ei tarkistettu SK:n tapahtumakertomuksia uudelleen eikä lisätty uusia huoneita tilaukseen.

ArkMP-kuvan puuttuessa **lopullista leikkaustasoa ei vielä ehdoteta**. Saatavuusraportti ja huoneiden paikannus ovat nyt valmiit; jäljellä on varsinaisen leikkauskuvan tarkistus ja vasta sen jälkeen tasoehdotus KK:lle. Näyttötapa pysyy: leikkauspuoli kameraan ja kerroskierros kortilla. Ei mallikuvaa tai Tripo-ottoa ennen KK:n sanaa.

## Tarkistusjälki ja aineiston käyttö

SK:n olemassa olevaa PDF:ää ei löytynyt tarkistetuista työjuurista. Verkkolukija torjui 40 085 893 tavun tiedoston kokorajalla. Senaatin `robots.txt` tarkistettiin suoraan: HTTP 404; PDF vastasi HTTP 200. Sen jälkeen yksi tarkistuskopio tallennettiin T7:lle. Käynnistyslevylle ei tallennettu aineistoa.

- PDF: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/turku-rhs-2441-2444-20261116/turun-linna-paalinna-rhs-2023.pdf`
- SHA256: `ef2c4cd5643c51595169aa8c625febe60a44058b0758985f2f07d7cfbe2cb972`
- Silmin tarkistetut sivukuvat samassa hakemistossa: `rhs-painettu-134.png`, `rhs-painettu-137.png`, `rhs-painettu-203.png`, `rhs-painettu-205.png`.
- Saatavuusloki: `source-access.json`. PDF-kopion ja sivukuvien käyttö on lähdetarkistus, ei lupa käyttää RHS:n kuvia pelin tekstuureina tai mallikuvan materiaalina.

Uusia Tripo-ottoja 0, mallikuvagenerointeja 0, Blender-renderöintejä 0, pelimuutoksia 0, uusia krediittikuluja 0. PDF:stä rasteroitiin neljä sivua lähdetarkistusta varten. Grand Châtelet #2269 säilyy suljettuna; ei lisäkattokokeita.
