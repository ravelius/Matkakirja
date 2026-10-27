# Päätoimittajan luovutus 10.10.2026 klo 12.3x (TILINVAIHTO, omistajan pyyntö; konteksti 56 %)

Session local_593b89a1-2514-4d74-b956-2a73db862382. Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-10-klo-1122-1234.md.
Edellinen luovutus: viesti-fable-luovutus-20261010-paiva3.md. Siirtoprompti: viesti-fable-siirtoprompti-20261010.md.
Työjonot: scratchpad/tyojonot.md (Päivitetty 12.1x + JUNA 176 -kohdan ylin "!!! OMISTAJA 12.4x" -rivi). Kirjattavat: scratchpad/kirjattavat-20261006.md
loppu 10.1x–12.5x: EI vielä lokissa eikä Raamatussa → ENSIMMÄINEN OMA TEHTÄVÄ uudella tilillä: loki- ja Raamattu-PR (ks. kohta 4).
OMISTAJA ON HEREILLÄ. Kysymykset aina korttina, vastaus kortin jälkeen. RUTIINIVUORON LOPPUUN VAIN "–" (omistaja 10.10.: ei "Ei sinulle uutta").

## 1. JUNA 176 → BUILD 177 (OMISTAJA 12.4x: "kaikki korjauspyynnöt täytyy saada seuraavaan julkaisuun. tee julkaisu heti kun ne valmistuvat")
- Runko natiiviseppa/juna-176 51e42e7a6 (+ Siirtoseppä 023c37675 vaihe-esittely kuitattu 12.4x; 1210b674e ehdolla Linssit läpi).
- JUNA LÄHTEE HETI, kun omistajan TF 176 -korjaukset ovat sisällä: N-UI (1) latauskuva: etuala ja maassa näkyvä köyden kiinnitys pois, köysi vinoon kuten alkuperäisessä kuvassa, pallo liikkumaan, latausruutuun Poistu-nappi (olemassa oleva nappi), joka palaa kartalle ja keskeyttää latauksen (2) pelin alun lentokohteet irronneet karttapallosta (3) Ateenaan saavuttaessa paperi ei peitä yläreunaa (4) kehittäjänäkymässä kaupunkeja ei voi valita kartalta. LS1: Pariisin pallo suoraan toisesta maasta → oppaan esittelykuvat pallon päällä ja kertoja ei ala. LS2: Ateenan horisontin tumma seinä, diagnoosi (yleinen 6.7-vika → 177, muuten Ateenan omaan vuoroon).
- Muistiajo etukäteen nykyisellä rungolla. TF iOS + Mac heti lukituksen jälkeen (Julkaisija). Muutosloki Natiiviseppä → PT → Julkaisija. Tämä on päivän 2. TF.
- TF 176 (175:n sisältö, Unity 6.7) on sisäisillä iOS + Mac (Mac: phonon-bundlejen tunnisteet korjattu, pysyvä c7db5ba3e). Omistajalle kerrottu.

## 2. OMISTAJAN PÄÄTÖKSET JA TOIVEET 11.2x–12.5x (kaikki kirjattavissa)
- KAIKKIIN MAIHIN pääkaupunki + maan ja kaupungin perustiedot + rajat (poikkeus VAIN EUROOPPA -linjaan): lista docs/raportit/puuttuvat-maat-ja-paakaupungit-20261010.md (64 maata puuttuu kokonaan, 117 pääkaupunkia). Karttaseppä vetää (pääkaupunkipiste kokoelmat/paakaupungit.json, ei pysäkki, olemassa olevalla kaupunkimerkillä; Eurooppa 14 ensin, minivaltiot kevyesti), Sisältökirjuri faktat (Eurooppa, Kaukasus + Lähi-itä, Afrikka, Aasia valmiit; Amerikat + Oseania kesken). Päiväntasaajan Guinea: Ciudad de la Paz (asetus 2.1.2026, lähteet). Jerusalem kaupunkina ilman kannanottoa, Palestiinalle Ramallah.
- CODEX: 2 havainnekuvaa jokaiselle 171 pääkaupungille (kortti "Kaikille 171") = 342 kuvaa; erät 1–4 (244 kuvaa) postilaatikossa, toimituksia ei vielä.
- KAUPUNKIKAPPALEET: kortti "Ensin 16 isointa" → 16 valmiina äänisivulla (artifact Qr7WvfZvKiNxGNwbFEeW2t versio 13, Musiikki-osion alku); omistaja kuuntelee → Pelikoodari vie peliin → loput 28. ÄÄNISIVU TÄYNNÄ (256 MiB).
- KARTAN MUSIIKKI (11.1x): vain kaupungin oma kappale; aloituslennon marssikin pois (PT:n tulkinta) → Pelikoodari 80ab967fa junassa + web #4342.
- KEHITTÄJÄTILAN PALLOT: muun kuin kohdemaan pallot 0,4 × (NUI c74736f7c junassa).
- NOTRE-DAME: ulokkeet ja piha liian vaaleat → parvis v3h kuitattu (paketti ilman Eiffeliä vientiin), ulokkeet LR:n ND v4c vertailuportin KALIBROINNIN jälkeen (ortokuvasta teksturoitu maa antoi −19…−27 % → renderin vinouma). ND v4b ei vientiin.
- VERTAILU OIKEAAN MAAILMAAN pakolliseksi (RAAMATTUUN): LR:n vertailuportti (kaupunkipinnat-v1/lahde/vertailuportti.zsh), Karttasepän ortot (_tyo/karttaseppa/vertailu/), Sisältökirjurin Commons-vertailukuvat (_tyo/sisaltokirjuri/vertailu/).
- EIFFEL: omistaja tyytyväinen Googlen torniin → ei omaa mallia.
- "EI SINULLE UUTTA" -rivit pois: rutiinivuoron loppuun vain "–".
- Malesia: kysyi, onko pelissä → ei kaupunkia (maa on pelissä tietoineen).

## 3. ROOLIEN TILA (luovutukset pyydetty 12.4x "TILINVAIHTO NYT"; SHA:t siirtopromptin taulukossa)
Nollattu tänään: Sisältökirjuri, LR, NUI, Natiiviseppä, Julkaisija (uudet sessiot jatkavat). Karttaseppä 52 % (nollaus pyydetty, luovutus tulossa).
Levy 68 Gi: PT:n Sonnet-agentti siirtää yli 48 h vanhat lokikansiot NAS:lle (raportti tulee tähän sessioon; jos ei ehdi, uusi PT tarkistaa df:n ja tekee saman); Unity 6.3 → T7 Natiivisepällä.

## 4. LOKI- JA RAAMATTU-PR (uuden tilin PT:n ensimmäinen oma tehtävä)
Kirjattavat 10.1x–12.5x lokiin (tools/raamattu-kirjaa.mjs) ja Raamattuun linjaukset: KARTAN MUSIIKKI (vain kaupungin oma kappale), VERTAILU OIKEAAN MAAILMAAN, KAIKKI MAAT JA PÄÄKAUPUNGIT (poikkeus VAIN EUROOPPA:an; pääkaupunkipiste ei ole pysäkki), IKÄKYSELYN MYÖHEMPI VASTAUS (Ei nyt → Asetuksista; vain tiukempaan suuntaan), RUTIINIVUORO ILMAN TEKSTIÄ ("–"), ISS-kupolan koe, Peking-muoto ja suojattu muotokuva, TF-numerointi (hylätyn uusinta uudella numerolla). Ota mukaan paikalliset luovutukset -paiva2, -paiva3, -paiva4, aloitusviesti ja siirtoprompti sekä docs/raportit/puuttuvat-maat-ja-paakaupungit-20261010.md. Pushaa vasta kun TF 177 -käännös ei ole käynnissä (push käynnistää CI:n samalla Macilla).

## 5. LISÄYS 12.4x (PT:n OMA NOLLAUS 67 %, EI tilinvaihto vielä)
- OMISTAJA 12.4x: "tili vaihdetaan vasta kun nuo bugit on korjattu ja juna lähetetty" → TILINVAIHTO JUNAN 177 LÄHDÖN JÄLKEEN. Siirtoprompti viesti-fable-siirtoprompti-20261010.md on valmis; päivitä sen SHA-taulukko juuri ennen vaihtoa ja anna omistajalle kohdan 1 viesti koodilohkona (annettu jo kerran 12.4x).
- KUITATTU 176: NUI saapumisarkki-176 72cbff04b, latauskuva-176 bf820d7fa, ikaraja-asetukset-176 4b36cb4ca; Siirtoseppä 023c37675 + 1210b674e (Linssit 1300/1300). JUNA 177 ODOTTAA VAIN LS1:n KOLMEA KORJAUSTA: Pariisin pallo (esittelykuvat + kertoja), pelin alun lentokohteet irti pallosta, kehittäjänäkymän kaupunkivalinta kartalta (N-UI siirsi 2 ja 4 LS1:lle). LS1 on 50 %:ssa: EI nollausta ennen kuin korjaukset ovat junassa.
- Luovutukset 12.4x: Julkaisija 53bb77c97, LS1 2b54252e3, Postivahti 11dd7c0c4, Pelikoodari f0f29476a, Sisältökirjuri 66d55959c, Siirtoseppä 729db0eaa (muut tulossa: Natiiviseppä, N-UI, LS2, LR, Karttaseppä; Karttaseppä nollautuu 50 %:n takia).
- Sisältökirjuri: Oseania valmis (Codex-erä 6, 28 kuvaa), Amerikat viimeistelyssä; Nauru pysyy "Nauru"/NRU (uusi virallinen nimi vain lähteineen kenttään).
- Unity 6.3 T7:lle (Natiiviseppä 12.34), levy 74 Gi. PT:n Sonnet-agentti siirsi lokikansioita NAS:lle (raportti tuli vanhaan kontekstiin tai jäi kesken: tarkista df ja /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/lokit/).
- Viikko 95 %, 5 h 72 % (nollautuu 13.00). Keskustelu tallennettu nollauksen yhteydessä (/Users/Shared/Claude/keskustelut/, uusin).
