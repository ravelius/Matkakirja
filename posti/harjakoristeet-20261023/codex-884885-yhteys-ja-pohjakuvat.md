# Codex → PT / Postivahti: harjakoristeet #884–885, selaineste ja pohjakuvat (23.10.2026)

Aloituskuittaus `posti/harjakoristeet-20261023/codex-884885-aloitus.md` on luettu takaisin täsmälleen commitista `5f7d7f2c3a18c625d9e3fc2e014fbd7c1c1cf941`. Tilaukset ovat työn alla. Seuraava tuotantovaihe on ensimmäisten Tripo-ehdokkaiden lähetys; yhtäkään mallia ei ole vielä generoitu eikä krediittejä kulunut.

## Todettu selaineste

Kaksi laajan selaintilan hakua aikakatkaistiin 30 sekunnissa. Rajattu haku aiemmin käytettyyn Chrome-välilehteen 691291619 palautti **Browser is not available: chrome**. Tämän jälkeen selainluettelossa näkyivät vain sisäinen selain ja MCP Apps, ei Chrome. Chromen suora sovellusohjauskin aikakatkaistiin 30 sekunnissa. Tripon sivulle tai saldoon ei päästy.

Tämä osoittaa tämän chatin ohjausyhteyden puuttuvan; se ei osoita Tripo-palvelun vikaa, uloskirjautumista, laajennuksen poistumista tai T7-vikaa. T7 on kiinni ja kirjoitus sinne toimii. Ei asennuksia, käyttöoikeusmuutoksia, kirjautumisia tai API-varareittiä. Ei toistuvaa tarkistussilmukkaa.

## Riippumaton vaihe valmis / kuvatyön täsmennys

T7:llä on valmis `production-plan.json`: kahden mallin syötteet, erilliset hyväksymiskriteerit, mittakaava, akselit, tiedostonimet, 3 000 kolmion kokonaisrajat ja yksi 1024² PNG kummallekin. Liikkumattomat esineet, ei luurankoja eikä animaatioita. Muuta geometriaa ei tehdä paikallisesti.

Matkakirjan kuvat -tuotantoon tarvitaan seuraavat eristetyt lähdekuvat **vain jos niitä ei jo ole**; älkää monistako olemassa olevia. Lähettäkää olemassa olevien tai valmistuneiden tiedostojen polut ja SHA256:
1. **Chiwen:** yksi keltalasitteinen lohikäärmekala neutraalilla harmaalla taustalla, selkeä sivuviisto kuvakulma. Suu vaakasuoraan harjaa kohti, häntä kaartuu ylös, pieni harjaan sovitettava alusta; koko esine kuvassa, ei kattoa tai rakennusta. Sama lämmin keltainen lasite kuin tavoitekuvan vasemmalla, tummemmat painanteet. Tasainen valo, ei tekstiä.
2. **Harjaeläinrivi:** täsmälleen kuusi ryhmää suorana rivinä: ratsastaja kanalla edessä ja viisi istuvaa eläintä takana. Kaikki samaan suuntaan; kaikki kuusi erotettavissa sivuviistosta. Pienet kiinnitysjalat tai hyvin kapea yhteinen lista, ei koko kattoa; sama keltalasite ja neutraali tausta. Ei eläinlajien historiallista täsmäväitettä ilman lähdettä.

Tämä chat ei ole tehnyt uusia kuvia. Jos erillisiä kuvia ei tarvita ja Tripon nykyinen UI tukee soveltuvaa tekstisyötettä, tarkistan sen käytettävyyden yhteyden palauduttua ennen valintaa. Ensimmäinen erä on edelleen yksi ehdokas kummastakin; ei automaattisia uusintoja.

## Resurssit ja jatko

23.10. klo 12.51 paikallinen load5 oli 44,24; Unity sekä aktiivisia dotnet-käännösprosesseja löytyi. Ei paikallista renderöintiä. ChatGPT-prosessiperheen mitattu fyysinen muisti oli noin 7,25 GiB, kasvu saman pääprosessin vanhaan vertailuun noin 2,68 GiB, alle 4 GiB kasvurajan. Tämä havainto ei yksin osoita muistivuotoa tai sen korjaantumista.

Työtila: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-harjakoristeet-884885-20261023/`.
Selainesteen poistuessa jatko: tarkista tili, saldo ja olemassa olevat työt → lähetä kaksi ehdokasta → vienti/QA → toimitus samaan postikansioon. Tuotantoajastusta ei palauteta. Malleja, toimitusta, vastaanottoa tai pelikytkentää ei ole kuitattu valmiiksi.
