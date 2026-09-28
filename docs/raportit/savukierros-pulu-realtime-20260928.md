# Pulu-TF (puhekeskustelu + xAI-nappi) laiteajo: FAIL — löydös, ei julkaisuvalmis (Laitetestaaja, 28.9.2026 klo 13.4x)

iPhone 18 Pro (1572C658), asennus 13:35, juna/b13 0cd85ecc (sisältää `pelikoodari/pulu-realtime` 0da1f589).
Kehittäjätila päällä (koodi `POLLO_KEHITTAJAKOODI`:sta), pöllön koodi asetettu.

## Toistokulku

1. `kehittaja koodi` (Documents/kehittaja-koodi.txt) → kehittäjätila päällä, pöllön koodi on.
2. `uusi-peli 1 ateena` → Kartta.
3. `pulu realtime tila` → alkutila "Valmis, kanava kiinni, lupa kysymättä".
4. `pulu realtime paalle` → mikrofonilupa-dialogi ilmestyi ("Saako Matkakirja 3D käyttää mikrofonia?"), sallittu.
5. Uusi `pulu realtime paalle` luvan myöntämisen jälkeen → tila kävi "Yhdistaa" ja palasi ~6 s:ssa "Valmis"-tilaan,
   **viimeisin virhe: "Äänikeskustelu keskeytyi."** Toistettu kolmesti, sama tulos joka kerta.

## Juurisyy (natiivi debug-loki, `xcrun simctl spawn <udid> log stream --predicate 'process == "Matkakirja3D"'`)

```
MATKAKIRJA puhekanava: auki (192000 Hz, 1 kanavaa → 24 kHz mono, kaiunpoisto 1)
MATKAKIRJA puhekanava: keskeytys (moottorin kokoonpano muuttui)
```

Äänikanava (`MatkakirjaPuhekanava.mm`) AVAudioEngine avautuu onnistuneesti, mutta **AVAudioEngine-kokoonpano
muuttuu välittömästi avaamisen jälkeen** (`AVAudioEngineConfigurationChangeNotification`), mikä tulkitaan
keskeytykseksi ja katkaisee yhteyden ennen kuin mikrofonidataa ehtii lähteä palvelimelle.

**Epäily (ei varmistettu koodista, vaatisi Natiivisepän/Pelikoodarin arvion):** 192 000 Hz on epätavallinen
syötemuoto — oikealla iPhonella mikrofoni ei aja tätä taajuutta. Tämä viittaa Simulaattorin oman
ääni-inputin (Macin oma mikrofoni/ääniyksikkö) läpivientiin, joka voi vaihtaa formaattia heti istunnon
alettua ja laukaista `AVAudioEngine`:n konfiguraationvaihtoilmoituksen — tunnettu Simulaattori-rajoitus
`.voiceChat`-tilan ääniyksiköille. **En pysty päättelemään varmasti, onko tämä puhtaasti Simulaattori-
rajoitus vai toistuisiko sama oikealla iPhonella** — vaatii testin fyysisellä laitteella.

## Muuta

- Token/WebSocket-vaihe ehti käynnistyä (tila "Yhdistaa" näkyi), mutta en saanut erillistä lokiriviä
  token-hausta tai WebSocket-avauksesta ennen keskeytystä — todennäköisesti äänikanava avautui ensin ja
  keskeytti koko yhteysyrityksen ennen niitä (koodikommentti: "session.update lähtee ennen mikrofonia").
- `pulu realtime pois` toimi siististi (ei kaatumista, tila palasi "Valmis"-tilaan).
- Kehittäjätila + pöllön koodi toimivat oikein, "Puhu Pululle (koe)" -reitti oli tavoitettavissa
  debug-komennolla (en käynyt UI:sta napin kautta, koska debug-komento kattaa saman polun täsmällisemmin).

## Suositus

**EI PASS tällä ajolla.** Ei suosittele TF-vientiä tätä ominaisuutta varten ilman jompaakumpaa:
(a) varmistus fyysisellä iPhonella (Natiiviseppä/omistaja) että ääniyhteys pysyy auki, tai
(b) koodikorjaus joka sietää/ohittaa ensimmäisen kokoonpanonvaihdon Simulaattorissa (jos syy on
Simulaattori-spesifinen ja tiedossa).

Ominaisuus on kehittäjätilan takana (ei näy tavallisille pelaajille), joten tämä EI estä muun sisällön
TF-vientiä — vain itse Pulu-realtime-kokeilun julkaisukelpoisuutta.

## Jatkoajo: 1.0.36-juna (5480b556) — PASS (korjaus vahvistettu)

Pelikoodarin korjaus `4395a922` (moottori käynnistyy uudelleen kokoonpanon muutoksessa, ei enää
tulkita keskeytykseksi) + `a6edbd06` (uusi eristetty debug-komento `pulu realtime kanava paalle|pois|tila`).

**Testattu iPhone 18 Pro (1572C658), asennus 14:11:37:**
- Eristetty kanava (`pulu realtime kanava paalle`, ei WebSocketia): sama "moottorin kokoonpano muuttui"
  -tapahtuma tuli kuten ennenkin, mutta natiivilogissa näkyi nyt **"uudelleenkäynnistys 1 (moottorin
  kokoonpano muuttui), sama moottori"** eikä keskeytysvirhettä — juuri odotettu korjaus.
- Täysi polku (`pulu realtime paalle`, kehittäjäkoodilla): tila eteni Yhdistaa → **Kuuntelee**, kanava
  auki, ja pysyi vakaana **~30+ sekuntia** (neljä `pulu realtime tila` -tarkistusta, "jäljellä" laski
  normaalisti 178 s → 147 s), sama kokoonpanon-muutos+uudelleenkäynnistys-tapahtuma näkyi lokissa mutta
  EI katkaissut yhteyttä. Pysäytettiin siististi `pulu realtime pois`:lla, ei virhettä.

**PASS.** Alkuperäinen katkeaminen (BUILD 35 / 0cd85ecc) on korjattu tässä junassa. En saanut oikeaa
puhesisältöä läpi (ei ihmisääntä syötteenä simulaattorissa), joten itse keskustelun sisältöä/vastausta
ei todennettu — vain yhteyden pysyvyys ja tilakoneen kulku. Suosittelen silti fyysisen laitteen
lopputestiä ennen laajempaa julkaisua, koska simulaattorin 192 kHz-syöte on yhä epätavallinen eikä
vastaa oikeaa iPhone-mikrofonia.
