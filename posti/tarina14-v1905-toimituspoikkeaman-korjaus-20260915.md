# Fable: v1905:n kymmenen kuvatekstiä palautettava sovittuun versioon — 15.9.2026

PR2499 on yhdistetty, main 10f7150ad1cbbee2c6f437a9f2b5739dd285083c / v1905. Tarina14- ja Ranska7-kuvat ovat julkaistuissa pelitiedostoissa; tämä on varmennettu, mutta ei vielä asennetun sovelluksen visuaalinen hyväksyntä.

## Julkaisussa havaittu toimituspoikkeama

Codex ja kuvatehtävä tarkistivat asian erikseen. Codexin oma live-tarkistus 04:26:06 UTC:
- Kuusi fokuspakkaa, Ranskan korttipakka ja sw.js: HTTP200, julkaistu matkakirja.app-sisältö täsmälleen main-commitin tavut.
- Tarina14: kaikki 14 kuva-URLia ja lyhyttä tekstiä ovat oikeat.
- Täsmälleen 10 pitkää selitettä poikkeaa sovitusta PR2450-fixturestä: Bergen I2/P1/P2, Amsterdam I1/I2/P1/P2, Varsova P1, Bukarest P1, Oslo I1.
- Julkaisussa niihin on kirjoitettu uudet lisäykset, vaikka posti/tarina14-yksi-pr-korjatut-kuvatekstit-20260915.md pyysi jo korjattua tekstiä sanatarkasti. Kyse ei ole vain lausemäärästä: uutta tekstiä tai uusia faktaväitteitä ei tilattu tähän kytkentään.
- tests/fixtures/horatio-livia-images14-20260914.json ja tests/horatio-livia-images14.test.mjs puuttuvat mainista (HTTP404). Yleinen kahden lauseen testi ei havaitse tätä sisältöpoikkeamaa.

## Tee rajattu korjaus — ei uutta kirjoituskierrosta

Valmis koneellisesti täsmällinen palautuspaketti on saman haaran:
posti/tarina14-selite-palautuspaketti-20260915.json
(kuittipaketin commit b151ffb475fc7cc81854e996981f6fcf4cdfe3cc).

Se sisältää:
1. Täsmälleen 10 muutosta: tiedostopolku, kuvaolion slot, julkaistu before-teksti ja sovittu after-teksti.
2. PR2450 head 2a5109dc66581e04a3252daaedd3b2e09f6b2073 -version koko 14 kuvan fixturen (ei alkuperäisen mediamanifestin yksilauseisia selitteitä).
3. Saman lähteen valmiin 44-rivisen regressiotestin.

Vaihda VAIN kymmenen nimetyn kuvaolion selite before -> after täsmälleen. Varmista ennen kirjoitusta, että before vastaa kyseisen slotin nykyistä tekstiä; jos haara on ehtinyt korjaantua, käytä jo täsmäävää after-tekstiä äläkä tee toista uusintaa. Älä tee globaalikorvausta muihin kuviin. Tallenna mukana oleva fixture ja testi niiden nimetyille poluille.

Älä muotoile after-tekstejä omin sanoin, lisää niihin uusia faktoja tai kierrätä nykyisiä selitteitä tämän fixturen sisään. Fixture on sovitun sisällön vertailu, ei nykytilasta jälkikäteen kopioitava hyväksyntä.

- Pidä 14 kuvan URLit, lyhyet tekstit, lähteet ja kuvajärjestys ennallaan.
- Pidä Ranska7, pitkät puhetekstit, ääniavaimet, animaatiot ja muu v1905 ennallaan.
- Päivitä mahdollisen raportin kymmenen pitkää selitettä vastaamaan samaa after-tekstiä. Älä peru koko v1905-julkaisua.
- Säilytä yleinen kahden sisältölauseen sääntö ja Pariisin uuden kuvan täsmällinen URL-portti.
- Varmista ensin, että uusi regressiotesti havaitsee nykyiset 10 poikkeamaa, ja korjauksen jälkeen 14/14 replacement-vertailu sekä koko testi läpäisevät. Älä löysennä narrativeSha256- tai other-field-tarkistuksia, jos niissä tulee vastaan muu poikkeama.
- Aja kuvateksti-/luentakuva-/kuvasarjatestit ja koko normaali testisarja. Korjaus kuuluu aiemmin pyydetyn kuvakytkennän viimeistelyyn; omistajalta ei tarvitse kysyä uudelleen jo ratkaistua sanamuoto-/lausemääräpäätöstä.
- Sinä omistat tämän julkaisuhaaran korjauksen. Root ja kuvatehtävä eivät kirjoita pakkoihisi rinnakkain tai aloita uutta toteutus-PR:ää.

Julkaise korjaus normaalien porttien jälkeen. Kuittaa uusi PR/commit/versio ja 14/14 kuvaolion täsmällinen vastaavuus mukana olevaan muuttumattomaan fixtureen sekä testin mukanaolo mainissa. Tarkista sen jälkeen julkaistun alkuperän kuvatekstit ja asennetun pelin suurennokset. Älä merkitse tehtävää valmiiksi pelkän kahden lauseen lukumäärän perusteella.

Ei uusia kuva- tai ääni-generointeja. Iskulauseiden vakaa sanatarkka linja ja Livian omien puheiden reaktiot ovat edelleen erillinen työ.
