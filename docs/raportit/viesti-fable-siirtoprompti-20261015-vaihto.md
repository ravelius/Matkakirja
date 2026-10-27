# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 15.10.2026 klo 12.1x; omistaja 11.53: "tehdään tilinvaihto heti sen jälkeen jos se on järkevää")

VVI-tili: viikko 97 %, nollautuu vasta ti 20.10. Tarkka tila: docs/raportit/viesti-fable-luovutus-20261015-paiva.md (KOKONAAN) + kohta 3 alla. Roolit pyydetty 11.5x (Postivahdin kautta) päivittämään luovutus + aloitusviesti ja pushaamaan.

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

Omistaja avaa uudella tilillä session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, medium) ja liittää:

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, medium)".
> Checkout /Users/Shared/Claude/Matkakirja-fable. Lue CLAUDE.md, docs/raportit/viesti-fable-siirtoprompti-20261015-vaihto.md KOKONAAN ja
> docs/raportit/viesti-fable-luovutus-20261015-paiva.md KOKONAAN sekä muistin MEMORY.md (fable-tila-20261015-paiva, perutut-tyot-lokista-ja-junakortti,
> saastot-2-nollaus-35, tf-valmistuminen-asemataululle, testaus-vain-automaattiset, julkaisu-vasta-omistajan-pyynnosta). Ensin set_remote_control self true.
> Ota roolisessiot käyttöön siirtopromptin kohdan 2 taulukon mukaan (aloitusviesti kullekin; jos sessiota ei ole, luo se), kytke Remote Control kaikille,
> käynnistä odottajavahti (kohta 4), tee tämän tilin Asemataulu (scratchpad/asemataulu/osoitteet.md, "Tilinvaihdossa"; lähde
> scratchpad/asemataulu/asemataulu-julkaisu.html, jossa Boost-nappi) ja jatka. EI jonokierros-cronia (Postivahti herättää).
> Keskustelukanava (KK) välittää omistajan päätökset; kysy tämän tilin viikkoraja KK:n kautta ja kerro se Postivahdille. Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Aja ensin git fetch origin, lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md omasta haarastasi (päivitetty 15.10. 11.5x:n jälkeen) sekä sen osoittama luovutus kokonaan, ja jatka. Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, medium). Jos sait vanhoja PT:n viestejä, ne on jo tehty."

Uudet session id:t → /Users/Shared/Claude/osoitekirja.md (kansiot ja mallit ennallaan).

| Rooli | Checkout | Malli | Kärki |
|---|---|---|---|
| KESKUSTELUKANAVA | Matkakirja-fable | Opus, max | omistajan kortit; luodaan vain omistajan pyynnöstä |
| Postivahti | Matkakirja-posti | Sonnet 5.5, medium | kierros, mittarit, roolien nollaukset; uuden tilin viikkoraja |
| Asemataulu | Matkakirja-asemataulu | Sonnet 5.5, low | ASEMATAULU-ROOLI.md; uuden taulun osoite PT:ltä |
| Julkaisija | Matkakirja-julkaisija | Opus, medium | TF 192 ulkoisille kun vienti valmis; julkaisu VAIN "OMISTAJA PYYSI JULKAISUA" |
| Natiiviseppä | Matkakirja-3d-selvittaja | Opus, high | juna 193 runko db5abdf0e (vihreä; Kuu, Praha, Tower Bridge); EI lukitusta ilman omistajan pyyntöä |
| Natiivi-UI | Matkakirja-natiivi-ui | Opus, high | skannerin kirjainääni uuteen nimeen iss-skanneri-kirjain-mekaaninen.wav → juna 193 |
| Pelikoodari | Matkakirja-pelikoodari | Opus, high | aloituslennon kamera (juna 193) |
| Linssiseppä | Matkakirja-linssiseppa | Opus, high | Ranskan museo: lähikuvakohdat, nimikylttien lista NUI:lle |
| Valoseppä | Matkakirja-linssiseppa-2 | Opus, high | jono tyhjä; valaan luuranko (LR), Petřín (Codex) odottavat |
| Karttaseppä | Matkakirja-karttaseppa | Opus, high | kippikaupunkien sää/vesi/maasto |
| Linnanrakentaja | Matkakirja-linnanrakentaja | Opus, high | Olavinlinna tauolla; valaan luuranko |
| Siirtoseppä | Matkakirja-siirtoseppa | Opus, high | levossa |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | Sonnet 5.5, high | Codex-posti; kaupunkiesittelyt |
| Äänittäjä | Matkakirja-aanittaja | Sonnet 5.5, high | äänisivu; odottaa omistajan valintoja |
| Laitetestaaja | Matkakirja-laitetestaaja | Sonnet 5.5, high | levossa (ei testejä junaan, omistaja 09.36) |

## 3. Muutokset 11.0x–12.1x (luovutuksen -paiva jälkeen)

- KIRJOITUSÄÄNI: omistaja valitsi 10.5x vaihtoehdon 1 "matala mekaaninen". Äänittäjä vei sen ämpäriin UUDELLA nimellä iss-skanneri-kirjain-mekaaninen.wav (immutable-välimuisti, ei ylikirjoitusta). TF 192 soittaa vanhaa ääntä; NUI vaihtaa nimen koodiin → varmista että muutos on junan 193 rungossa (NS). Julkaisijan ylikirjoitus PERUTTU 12.1x.
- BOOST-NAPPI (omistaja 23.39, muistutti 11.28 ja 11.51): Julkaisija tekee ja julkaisee Asemataululle + tallentaa lähteeseen scratchpad/asemataulu/asemataulu-julkaisu.html. Määritys: nappi → talo/boost {paalla, alkoi}; mittarit vain Boostin aikana; sammuu tunnin kuluttua; viikkorivi selkokielelle. Asemataulu-sessio (Sonnet low) ei tee sivumuutoksia.
- JUNA 193 runko db5abdf0e vihreä (1843/586/492, tarkista 0): Tower Bridge -varadata 6406b2f9d, Kuu-TELE 708b1ae60, Prahan yövesi 5e699a463. Taulu junat v122 (Valmiina 3, Työn alla Ranskan museo). Tyolista v86 (Boost-rivi).
- Omistaja 09.36 "Ei testejä junaan": Valoseppä ohjattu viemään yövesi ilman simua.
- Web #4607 (8 pysäkkiä) on mainissa.

## 4. Ajastukset uudessa sessiossa

- Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000; uudelleen joka vanhenemisella (ODOTTAA → ArtifactData set talo/toimi-<rooli>-odottaa; JATKUU → delete).
- EI JONOKIERROS-cronia (säästöt 2).

## 5. Roolien luovutukset

Kuittaukset (haara + SHA) kirjataan tähän, kun Postivahti raportoi.
- Asemataulu: scratchpad/asemataulu/hoitaja/luovutus-20261015-a.md + aloitusviesti-20261015-a.md (paikallinen). Boost-sivumuutos EI sille – Julkaisija tekee.
- Valoseppä: 8613c7284 (viesti-valoseppa-luovutus-20261015-paiva.md); jono tyhjä.
- Linssiseppä: d8a66abc0; Ranskan kohtien ajoitus odottaa Äänittäjää.
- Sisältökirjuri: d2f784d0e (viesti-sisaltokirjuri-luovutus-20261015.md).
- Pelikoodari: f731bfc6f (pelikoodari-luovutus-20261014-paiva; viesti-pelikoodari-luovutus-20261015-paiva.md); jono tyhjä.
- Natiivi-UI: 89d066fc0 (viesti-natiivi-ui-luovutus-20261015-paiva.md); päivitetty 0c639bacd; kirjainääni iss-193 ad776c15d NS:n jonossa junaan 193.
- Natiiviseppä: c882df9ed; runko 193 db5abdf0e; TULOS-rivit auki.
- Karttaseppä: 0e8b2d67d. Äänittäjä: ed0c25cbe.
- BOOST JULKAISTU (Julkaisija, taulun versio 4); lähde asemataulu-julkaisu.html sisältää Boostin.
- Julkaisija: 72461dabc (viesti-julkaisija-luovutus-20261015-paiva.md); TF 192 ulkoinen liitos 11.56, beta-arvio Applella. Levossa olevat (LR, Siirtoseppä, Laitetestaaja): aloitusviestit ennallaan, ellei Postivahti raportoi muuta.
- TF 192 ULKOISILLA 11.56 (beta-arvio hyväksytty); vanhennus 191 käynnissä (Julkaisija).
