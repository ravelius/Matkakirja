# Omistajan ensikokemus — natiivi, simulaattori (23.9.2026)

TestFlight-build 2:n asennus simulaattoriin ei onnistunut (Fablen mainitsema
rajoite) — käytetty sen sijaan uusinta master-käännöstä (689d020) puhtaalla
tallennuksella (`tallennus.json` poistettu ennen käynnistystä, jotta
aloitusnäkymä käynnistyy kuin uudella laitteella). Kuvat:
`/Users/Shared/Claude/proto-3d/lokit/omistajan-ensikokemus-20260923/`
(kopioitu skriptin scratch-kansiosta).

## Kulku ja havainnot minuutti minuutilta

**0:00–0:40 — Portti.** Pallo pyörii itsekseen (katsottu 40 s), samalla
kellutaan: MATKAKIRJA-logo ylhäällä, "Aloita seikkailu" -nappi keskellä,
himmeä "Laita äänet päälle 🔊" -teksti napin yläpuolella, "Oppiminen on
hauskaa" alhaalla. **Ei mitään muuta koko 40 sekunnin aikana** — ei tarinan
otsikkoa, ei vihjettä mistä pelissä on kyse, pelkkä pyörivä pallo ja
kaupunkinimiä. Ensimmäisen kerran avaava ei tiedä ennen napin painamista
että kyseessä on isoisän matkapäiväkirjan jäljillä kulkeva seikkailu.

**Hämmentävä kohta 1:** "Laita äänet päälle" -teksti ei erotu selvästi
napiksi (ei kehystä, ei taustaa, himmeä) — epäselvää onko se pelkkä ohje vai
kosketettava kytkin.

**Hämmentävä kohta 2 (varmistamatta, ks. alla):** yritin napauttaa "Aloita
seikkailu" -nappia simulaattorin kosketustyökalulla kahdesti oikein
lasketuilla koordinaateilla (napin keskipiste kuvasta mitattuna) — kumpikaan
napautus ei tuottanut mitään muutosta ruudulla, vaikka sama työkalu toimi
moitteetta muissa näkymissä (esim. maiden vieritys asetuspaneelissa aiemmin
tänään). **En saanut varmuutta, onko kyseessä oikea tap-target-ongelma vai
oma mittausvirheeni** — jatkoin siksi kehittäjäkomennolla (`ui aloitus
avaus`) nähdäkseni seuraavan näkymän, joten en voi 100-prosenttisesti
todistaa että itse nappi toimii kosketuksella. Suosittelen, että joku
kokeilee "Aloita seikkailu" -nappia oikealla sormella simulaattorissa/
laitteella varmuuden vuoksi.

**Avausteksti** (nähty `ui aloitus avaus` -komennolla, sama sisältö kuin
napin takana pitäisi olla): "Heathrow, Lontoo, syyskuu 2026. Vintiltä
löytyi isoisän matkalaukku ja kulunut matkakirja. Juokset sisälle
terminaaliin ja olet varma, että ukko oli löytänyt jotain. Mutta kuka on
repinyt kirjasta viimeisen sivun?" + "VALITSE ALOITUSKAUPUNKI" -nappi.
**Hyvä, lyhyt koukku** — mysteeri (kuka repi sivun) herättää uteliaisuuden.
Ei hämmennystä tässä kohdassa.

**Kaupunkivalinta** (kuvattu jo aiemmin tänään, ks. `natiivi-aloitus-
huipennus-20260923/ui-aloitus-valinta.png`): 16 kaupunkia ruudukossa
(ateena, newyork, kairo, rio, mumbai, peking, sydney, moskova, tokio,
singapore, kapkaupunki, sanfrancisco, tanger, istanbul...). **Ei selitystä
miksi juuri nämä 16** tai eroaako valinta muuten kuin lähtöpaikan osalta —
uudelle pelaajalle voi olla epäselvää vaikuttaako valinta muuhun kuin
alkusijaintiin.

**Kartalle saapuminen** (dev-ohitettu Pariisiin, joten isoisän
saapumispuhe/pöllön ensimmäinen kupla EI välttämättä soinut — ks. ui.js/
PeliOhjain-koodin huomio: intro-luento soi vain kun AloitusNakyma-reittiä
EI ohiteta): kartalla näkyy £300 · Päivä 1 · aamu -tilarivi ja "Tutki
kaupunkia" -nappi Pariisin päällä. Ei muuta tekstiä ruudulla — pelkkä
kartta ja yksi nappi. **Toimii, mutta koska en varmuudella nähnyt aitoa
saapumiskupla/pöllö-ohjeistusta** (dev-komento saattoi ohittaa sen), en voi
sanoa selittääkö peli tässä kohtaa mitä "Tutki kaupunkia" tekee tai mitä
pelaajan pitäisi seuraavaksi tehdä. **Suosittelen toistamaan tämän kohdan
oikealla Aloita-napilla** sen varmistamiseksi, näkeekö uusi pelaaja
ohjeistuksen.

## Yhteenveto — löydetyt hämmennyskohdat

1. Portti-ruutu ei kerro mitään pelistä ennen napin painamista (40 s
   pelkkää pyörivää palloa).
2. "Laita äänet päälle" -teksti ei erotu selvästi kosketettavaksi.
3. **Epävarma**: "Aloita seikkailu" -napin kosketus ei rekisteröitynyt
   testityökalulla kahdesti — voi olla oma mittausvirhe, voi olla oikea
   tap-target-ongelma. Tarvitsee varmistuksen oikealla sormella.
4. **Epävarma**: en nähnyt varmasti aitoa saapumisohjeistusta (pöllön/pulun
   kupla) Pariisiin saapuessa, koska reitti kulki kehittäjäkomennon kautta.

Kohdat 1–2 ovat varmoja havaintoja. Kohdat 3–4 vaativat uusinnan oikealla
kosketuksella (laite tai toimiva simulaattorikosketus) ennen kuin niitä voi
pitää vahvistettuina bugeina.
