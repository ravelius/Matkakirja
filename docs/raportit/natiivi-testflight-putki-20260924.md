# Natiivin TestFlight-putki — mikä meni pieleen ja miksi (24.9.2026)

Julkaisija (Opus). Kattaa build 3:n ja 4:n lataukset 23.–24.9.2026, kymmenen
epäonnistunutta ajoa ja niistä syntyneet korjaukset `.github/workflows/proto3d-testflight.yml`:ään.
Tavoite: seuraava putken korjaaja ei toista samoja virheitä.

## Lopputila

- **Build 4** (1.0.0, build 202609232339, proto 7706efd) ladattu 24.9. klo 02.42 (run 35934690874)
  ja jaettu sisäiselle ryhmälle "Beta testaajat" (run 35935682403). Ryhmä saa kaikki buildit
  automaattisesti; omistaja on siinä tilin omistajana.
- **Putki** (mainissa): pysyvä avainnippu, identiteetit SHA-1:llä, oma Development-identiteetti,
  ei automaattista perumista, sisäinen ryhmä skriptillä, yöajo klo 04 Unity-viennillä,
  levyraja 30 Gt.
- **ASC-varmenteet**: DEVELOPMENT 7T28T7UU6N (automaation, avain avainnipussa) + omistajan oma
  Apple Development; iOS Distribution PK8TVTL7Q8 (käytössä, SHA-1 AE4FD1EA…) ja ACN2K38688
  (ylimääräinen, omistaja perii portaalissa).

## Virheet aikajärjestyksessä

| # | Oire | Todellinen syy | Korjaus |
|---|------|----------------|---------|
| 1 | "Apple Development … private key is not installed" | Build 2:n pilviallekirjoitus loi Development-varmenteen **väliaikaiseen** avainnippuun, joka poistettiin ajon lopussa. | Pysyvä avainnippu `~/Library/Keychains/matkakirja-testflight.keychain-db` (#2986). |
| 2 | Pakotettu `CODE_SIGN_IDENTITY="Apple Distribution"` → "conflicting provisioning settings" | Unityn pbxproj allekirjoittaa **arkiston** Development-identiteetillä; vienti allekirjoittaa uudelleen Distributionilla. Komentorivin identiteetti/profiili koskee kaikkia targeteja, myös UnityFrameworkia. | Arkistoon ei anneta identiteettiä eikä profiilia (#2994, #3007). |
| 3 | `KeyError: 'certContent'` heti varmenteen luonnin jälkeen | ASC:n kenttä on `certificateContent`. Varmenne ehti syntyä, mutta sitä ei tuotu. | Kenttänimi (#2992). |
| 4 | Joka ajo loi uuden iOS Distribution -varmenteen → 409 "You already have a current iOS Distribution certificate" | **Juurisyy:** tarkistus haki avainnipusta nimeä "Apple Distribution", mutta ASC:n `IOS_DISTRIBUTION` näkyy nimellä **"iPhone Distribution"**. Avaimet eivät koskaan kadonneet: avainnipussa oli 4 validia identiteettiä. | Identiteetti tunnistetaan varmenteen SHA-1:stä ASC:n aktiivisia varmenteita vasten (#3008). |
| 5 | Välivaiheen harhapolut: WWDR-luottamusketju, "avaimet kadonneet väliaikaisiin nippuihin" | Kumpikaan ei ollut syy (ketju oli jo kunnossa; avaimet olivat tallessa). Diagnoosi tehtiin lokista, ei avainnipusta. | Opetus alla. |
| 6 | Revoke-koodi päätyi mainiin, vaikka päätös oli jättää se pois | `git checkout -- tiedosto` palautti tiedoston **indeksistä** (johon estetty commit-yritys oli sen jo lisännyt), ei HEAD:sta. | Poistettu #3008:ssa. Käytä `git restore --source=HEAD --staged --worktree`. |
| 7 | Arkisto: ajuri ei näe omistajan Development-avainta | Ajuri toimii käyttäjänä koodaus, mutta login-avainnippu ei ole sille auki ajon aikana. | Automaatio luo oman DEVELOPMENT-varmenteen pysyvään nippuun (#3008). |
| 8 | Unity Hub kysyi "matkakirja-testflight"-nipun salasanaa | Ajurin HOME on `/Users/koodaus`; työnkulku asetti nipun käyttäjän **oletusnipuksi**, ja siivous "palautti" alkuarvon, joka oli jo testflight-nippu. | Nippua ei aseteta oletukseksi; siivous poistaa sen hakulistalta ja palauttaa login-nipun (#3008). |
| 9 | Testaajan lisäys 409 "Tester(s) cannot be assigned" | Oletusosoite oli gmail, joka ei ole ASC-käyttäjä. | Testaaja = tilin omistaja ASC-API:sta; osoitetta ei tallenneta repoon (#3009). |
| 10 | Levy täyttyi (0,5 Gt) | Jokainen arkisto jättää DerivedDataan 3–4 Gt projektipolkua kohden; poistettujen vientikansioiden välimuistit jäivät. | Orpo DerivedData poistettu; yöajon levyraja 30 Gt (#3031). |

## Opit

1. **Diagnosoi tilasta, älä lokin tulkinnasta.** `security find-identity -v -p codesigning <nippu>`
   olisi näyttänyt "iPhone Distribution" -identiteetit ensimmäisellä kerralla. Kolme ajoa meni
   teorioihin (luottamusketju, kadonneet avaimet), joita tila ei tukenut.
2. **Älä tunnista varmenteita nimellä.** ASC:n tyyppi ≠ avainnipun nimi (IOS_DISTRIBUTION →
   "iPhone Distribution", DISTRIBUTION → "Apple Distribution"). SHA-1 on ainoa luotettava avain.
3. **Älä aja sokkona uudelleen.** Kymmenestä ajosta neljä oli uusintoja ilman juurisyytä, ja
   kaksi niistä loi turhia varmenteita kiintiöön.
4. **Arkisto ≠ vienti.** Arkisto allekirjoitetaan projektin asetuksilla (Development); vienti
   `method=app-store-connect` allekirjoittaa uudelleen. Pakotetut komentorivin
   allekirjoitusasetukset rikkovat Unityn monitarget-projektin.
5. **Ajuri jakaa kotihakemiston omistajan kanssa.** Kaikki avainnippu- ja oletusmuutokset
   näkyvät omistajan ohjelmissa. Jätä käyttäjän tila sellaiseksi kuin se oli.
6. **Luokitin estää → ilmoita Fablelle ja jatka muuta.** Blokkaava kysymys omistajalle yöllä
   pysäytti koko jonon viideksi tunniksi.

## Käyttö nyt

- **Käsin valmiista viennistä:** `gh workflow run proto3d-testflight.yml -f vienti_kansio=<kansio>`.
- **Käsin proton masterista (build 5 ja myöhemmät):** `-f vie_unitysta=true`. Ajo ohittaa itsensä
  ja kirjaa syyn tiedostoon `proto-3d/lokit/yo-testflight.log`, jos Unity on auki, lukko on varattu,
  työkopio ei ole puhdas master, master on jo ladattu tai levyllä on alle 30 Gt vapaana.
- **Yöllä** sama klo 04.00 Suomen aikaa (01.00 UTC).
- **Uusinta sisäiselle ryhmälle ilman latausta:** `gh workflow run testflight-sisainen.yml -f build_numero=<numero>`.
- Buildinumero on aikaleima (VVVVKKPPTTMM); Unity-viennissä sama numero menee sovelluksen `rakennus.txt`:hen.
