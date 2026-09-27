# Offline-verkkokatko-kierros TF 1.0.31 (Laitetestaaja, 27.9.2026 klo 18.1x)

## Tehtävä
Fablen jono: "aito offline-verkkokatko 1.0.31:llä (lentotila/verkko pois simulaattorista,
Eurooppa-kaupunki: kartta, nostot, kuvat, Pulu kertoo offline-tilasta)".

## Este: aito verkkokatko ei ole mahdollinen Simulaattorissa
iPhone 18 Pro -simulaattorin (1572C658) Asetukset-sovelluksessa EI ole Wi-Fi-, Lentotila- eikä
Solutieto-riviä ollenkaan (tarkistettu `App-prefs:root=AIRPLANE_MODE` → aukesi suoraan
Asetukset-etusivulle, ei kohdesivulle; etusivun listassa Apple-tili → Yleiset/Käyttöapu/Haku/
Kamera/Koti-valikko/Siri/StandBy/Toimintopainike/Ulkoasu, ei yhtään verkkoriviä). Simulaattorilla
ei ole oikeita radioita, joten se käyttää isäntäkoneen verkkoa suoraan — ei per-simulaattori-
verkkokatkoa UI:sta. Host-tason verkon katkaisu (pf/Network Link Conditioner) olisi koko Macin
laajuinen ja vaarantaisi muiden roolien käynnissä olevat poltot/ajot samalla koneella — EI tehty.
**Aito verkkokatko vaatii TestFlight-laitteen** (sama rajoitus kuin yläpalkin vetotesti, ks. resepti).

## Tehty sen sijaan: debug-simulointi `ui offline verkoton` / `ui offline demo`
Uusi peli Pariisiin (Eurooppa), kartta latautui normaalisti verkolla. Ajettu:
- `ui offline verkoton` → loki "→ ok", ei virhettä.
- `ui offline demo` (pitäisi näyttää "Ladataan Ranska · X %" -pilleri) → loki "→ ok", ei virhettä.
- `ui puu` -dumpissa (100 elementtiä) EI yhtään `mk-offlineTila`-luokan elementtiä kummankaan
  komennon jälkeen, eikä kuvakaappauksissa näy offline-pilleriä yläpalkin alla vasemmalla
  (ks. OfflineTilaUi.cs: pillerin pitäisi näkyä `sallittu`-tilassa aina kun `rivi != null`,
  ja `ui offline demo` pakottaa rivin non-null-tilaan riippumatta oikeasta palvelusta).
- `ui offline pois` ajettu lopuksi, tila palautettu.

**Epäilty FAIL, ei varmistettu laajuudeltaan**: offline-pilleri ei renderöidy tässä käännöksessä/
näkymässä testikomennoilla, vaikka OfflineTilaUi.cs (git log: commit 7d6f7bc3, "build 20") on
selvästi vanha ja pitäisi olla mukana BUILD 31:ssä. En testannut Pulun tekstivastausta
xAI-kulutussäännön vuoksi (ei säilöttyä/aiemmin käytettyä offline-kysymystä reseptissä — en
keksinyt uutta kysymystä uuden xAI-kulutussäännön takia).

## Suositus
1. Natiiviseppä/Pelikoodari: vahvista onko OfflineTilaUi kytketty tämän hetkiseen Kartta-scenen
   Tilarivi-konttiin BUILD 31:ssä, tai onko kyse siitä että testikomento ei tavoita oikeaa
   `ui.OfflineTila`-instanssia.
2. Aito verkkokatko: ajetaan TestFlight-laitteella lentotila päälle/pois, ei simulaattorilla.
