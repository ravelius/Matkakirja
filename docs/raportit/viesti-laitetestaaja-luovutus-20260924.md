# Laitetestaaja → seuraava sessio: luovutus (24.9.2026, konteksti 71 %)

## Tehty tänään (kronologisesti)

1. **Radio** (master fff33f5→d28176d): lisenssiluokittelu OK, yhden aseman
   (Bern/stream.rabe.ch) TLS-vika juurisyy löydetty (Linssiseppä).
2. **Tallennusmigraatio** v3/v4→v5: PASS, kaksi Pelikoodarin vanhaa
   TestFlight-tallennusta jatkuivat oikein.
3. **B7 kuulokoe**: 6/13 kohtaa mitattu peli-tila.json:sta, ei virheitä.
4. **Omistajan TestFlight-tarkistuslista** build 4:ään, PR #3010 mergetty.
5. **Natiivi-UI:n A1–A9, mediarivi, C1–C6**: kaikki PASS lopulta (A4/A5
   löysivät oikeita bugeja, korjattiin ja uusinta vahvisti; C2:n
   välinäytös löytyy vain luonnollisella etenemisellä, ei suoralla
   pysäkkihypyllä). Raportti Natiivi-UI:n omassa checkoutissa
   `docs/raportit/kuvasarjat-natiivi-ui-20260924-tulos.md` (ei
   committoitu — heidän haaransa).
6. **T1–T5 (työhuone/Raamattu-liite)**, master 2bb8687, koepaketti v34,
   kehittäjätila päällä (`kehittaja 1`):
   - T1 PASS (KOKEET: Raamattu + Kehittäjälehti rivit).
   - **T2 EI ONNISTUNUT — LÖYDÖS (bugi)**: Raamattu-sivun tekstikentän
     napautus avaa muokkauspopupin oikein (checkmark/X, valmis/kesken-
     chip kunnossa). MUTTA kun kenttää on napautettu/muokattu kerran,
     JOKAINEN seuraava napautus SAMALLA SIVULLA — myös aiemmin toimineet
     napit kuten "Seuraava" — avaa uudelleen saman muokkauspopupin sen
     sijaan että osuisi kohteeseensa. Toistettu 5+ kertaa varmuuden
     vuoksi eri koordinaateilla, sama tulos joka kerta. "Lähetä
     muutokset" -nappia EI koskaan saatu napautettua tämän vuoksi — EI
     LÄHETETTY MITÄÄN FABLELLE. Pääsin pois vain komentorivillä
     (`ui sulje`), ei kosketuksella. Todennäköinen syy: koko sivun
     ScrollView reitittää kosketukset viimeksi fokusoituun TextFieldiin
     riippumatta napautuskoordinaatista. Sivulle jäi vaaraton testimerkintä
     " [LAITETESTI-POISTA-TAMA]" (mangeltunut å/¨-merkeiksi kosketus-
     injektiosta) YHDEN kentän loppuun ("Ydinajatus ja kohderyhmä" ->
     "…heti kun sessio on avattu tai nollattu." jälkeen) — EI kuitenkaan
     tallentunut/lähetetty mihinkään koska Lähetä-nappia ei saatu
     painettua; puhdas sovelluksen uudelleenkäynnistys/tuore koepaketti
     pyyhkii sen pois.
   - T3 PASS (Tilannelehti + Poiminnat -rivit).
   - T4 PASS (Tilanne-sivu, vasta valmistuneet -chipit, Testattavaa-
     seuraava-nappi).
   - T5 PASS: `ui tyohuone poiminta` tallensi testiparin, vientisivu
     näytti avaimen/parin/JS-lohkon oikein. **Huom:** sivun oma teksti
     kertoo tallennusten menevän myös "ehdotuskanavaan" Fablelle
     kuratoitavaksi — testiparini ("Testikysymys 05.09.01") saattaa
     näin ollen olla siellä, selvästi test-nimikoitu.
   - **T6 KESKEN**: `ui lehti pariisi` → chat-kysymys lähetetty, vastaus
     latautumassa kun konteksti loppui. "Tallenna juttuun" -pillerin ja
     "Poista laitteelta" -minipopupin tarkistus jäi tekemättä.

## Ympäristö nyt

- Simulaattori 1572C658…, master 2bb8687, kehittäjätila päällä
  (PlayerPrefs, säilyy uudelleenkäynnistyksissä).
- Koepaketti v34 `Documents/sisalto-koe`:ssa (kontaineri
  `0BEBCCF2-EE8E-47B7-B148-348440A239F0`).
- Ääni: ei muutettu tällä kierroksella (oletusarvoinen simulaattoriääni,
  ei kaiuttimiin kytketty — testit ilman ääniä -pyyntö noudatettu
  toiminnallisesti, ei laitteistotasolla).
- iPad vapaana, ei käytössä juuri nyt.

## Seuraavalle sessiolle

1. **T2-bugi ensin Natiivi-UI:lle/Pelikoodarille**: kerro tarkasti
   yllä kuvattu — "kosketus jää kiinni viimeksi muokattuun kenttään,
   Lähetä muutokset ei ole napautettavissa sen jälkeen". Tarvitsee
   oikean debug-työkalun (Unity-editorin Game-näkymä tms.) koska
   koordinaattiarvailu simulaattorin screenshotista ei riitä diagnoosiin.
2. **T6 loppuun**: `ui lehti pariisi` on jo auki, chat-vastaus oli
   latautumassa — jatka siitä tai aloita uudelleen.
3. Natiivi-UI:n B-osio (aiemmat erät) ja C-sarjan äänikierros (osio C)
   ovat vielä tekemättä.
4. B7:n loput 7/13 kohtaa (mannerlento, jalan/laiva-raidat, tausta/
   takaisin, sanelu — "tärkein" Pelikoodarin mukaan, äänettömyys/
   Bluetooth vaatii fyysisen iPadin).

## Opittua

- `ui aloita <kaupunki>` ja peli-komennon vastaavat pikakomennot
  OHITTAVAT Aloitusnakyman/UI:n visuaalisen virran (ei lentotekstiä,
  ei saapumisluentaa) — käytä aina oikeaa napautusvirtaa kun testataan
  nimenomaan UI-siirtymiä, ei vain lopputulosta.
- `ui lehti vierita <px|loppu>` (uusi, Natiivi-UI) on turvallinen tapa
  vierittää lehteä komennolla ilman kosketusarvailua — käytä tätä AINA
  kun mahdollista sen sijaan että laskee swipe-koordinaatteja käsin.
- Kosketuskoordinaatit: alkuperäinen kuva 1206×2622 px = laite 402×874
  pt (kerroin ×3 tarkka), näytetty kuva skaalataan kertoimella ~1.311
  alkuperäiseen — molemmat on kerrottava peräkkäin oikean pisteen
  saamiseksi. Laskuvirheitä sattui tänään useasti kiireessä.
