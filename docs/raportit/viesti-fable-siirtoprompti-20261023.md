# Siirtoprompti tilinvaihtoon (KESKUSTELUKANAVA 23.10.2026 klo 11.2x; omistaja 21.10. klo 21.53: "perjantai aamuna aukeaa toisen tilin limit", 23.10.: "anna aloitusprompti tilinvaihtoon")

Vanha tili: PÄÄTILI (Asemataulu Rq5ajPU4SraE2XKd7BYAix), viikko 82 % (raja 80 % ylittyi 2 %:lla pysähdyksessä), loput omistajan
Coworkille, nollautuu ma 26.10. noin klo 9. Kaikki vanhan tilin sessiot pysähtyivät 22.10. yöllä (Postivahti, isRunning false).
UUSI TILI = vvi@vvi.fi (koodaustili; `claude auth status` 23.10. klo 11.1x: komentorivi jo tällä tilillä; viikko nollautui
pe 23.10. klo 7.59). Tämän tilin Asemataulu: https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm (scratchpad/asemataulu/osoitteet.md).
Raja: VOIMASSA OLEVA ARVO koodaustilille 99 % (docs/tilinvaihto.md), mutta KK kysyy rajan omistajalta kortilla uudella tilillä.
Tarkka tila: PT:n luovutus docs/raportit/viesti-fable-luovutus-20261021-2210.md (origin/main) ja KK:n
scratchpad/keskustelukanava/aloitus.md (ENSIN 21.10. klo 23.56). Menettely: docs/tilinvaihto.md kohdat 0–8.

## ODOTTAA OMISTAJAA (KK näytti tämän omistajalle 23.10.)
- Vaihda Claude-sovellus tilille vvi@vvi.fi ja avaa uusi sessio kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, medium). Liitä kohdan 1 viesti.
- Kirjaudu puhelimen Claude-sovellukseen ja Chromessa claude.ai:hin samalla tilillä (Asemataulu ja etäkäyttö).

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, medium)". Tili vaihtui
> 23.10. tilille vvi@vvi.fi. Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. Lue CLAUDE.md,
> /Users/Shared/Claude/Matkakirja-fable/docs/raportit/viesti-fable-siirtoprompti-20261023.md KOKONAAN, PT:n uusin luovutus KOKONAAN
> (origin/main docs/raportit/viesti-fable-luovutus-20261021-2210.md) ja docs/tilinvaihto.md (kohdat 0–8 ja VOIMASSA OLEVA ARVO).
> Ensin `claude auth status` (pitää olla vvi@vvi.fi) ja set_remote_control self true. HETI sen jälkeen luo KESKUSTELUKANAVA (Opus, max,
> kansio Matkakirja-fable, start_session, irrotettuna) aloitusviestillä "Olet KESKUSTELUKANAVA (Opus, max). Tili vaihtui 23.10.
> tilille vvi@vvi.fi. Lue /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md: Pysyvät toimintatavat ja
> ENSIN-osio, ja toimi niiden mukaan." Omistaja puhuu vain KK:lle. Luo roolisessiot kohdan 2 mukaan, kytke Remote Control kaikille,
> päivitä id:t (`node tools/tyotavat/paivita-idt.mjs … --kirjoita`) ja ota tämän tilin Asemataulu käyttöön
> (https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; tietokanta tiedostoista scratchpad/asemataulu/data/talo/*.json; osoitteet.md).
> EI jonokierros-cronia. Lopuksi `node tools/tyotavat/tilinvaihto-valmis.mjs`. Jatka luovutuksen kohdista 2–3. Älä kerro omistajalle
> teknisiä yksityiskohtia.

## 2. Roolit (luovutusten mukaan; PT päättää lopullisesti)
Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Tili vaihtui 23.10. tilille vvi@vvi.fi. Aja git fetch origin, lue CLAUDE.md,
Raamatun Ydinajatus kohta 2, oma uusin luovutuksesi (MEMORY.md, Rooli-tilaraportit; tarkista git logista) ja jatka. Päätoimittajan
session nimi on PÄÄTOIMITTAJA (Opus, medium). Jos sait vanhoja PT:n viestejä, ne on jo tehty." Mallit ja kansiot: osoitekirja.

| Rooli | Luo heti? | Seuraava työ (PT:n luovutus 21.10. 22.10) |
|---|---|---|
| Postivahti, Asemataulu | kyllä | normaali kierros; Asemataulun hoitaja: luovutus hoitaja/luovutus-20261021.md |
| Natiiviseppä | kyllä | juna 210 auki (rikottavat-210, NUI:n P2/P3/P7/P8/P10, VS:n korjaukset) |
| Pelikoodari | kyllä | rikottavat-210 da5883ffb; kahdeksan muistokuplan kytkentä omistajan valinnan jälkeen; #5059; B koodi, C historiapeli ja minipeli |
| Lavastaja | kyllä | B 3D ja kuvat, C museo ja 3D-maamerkki; lautaspino HOLD |
| Valoseppä | kyllä | A taide; junan 210 korjaukset (käännösnykäykset, piiloon jääminen, saapumislento) |
| Natiivi-UI | kyllä | P2/P3/P7/P8/P10 junaan 210 (6f8455f1a NS:llä) |
| Äänittäjä | kyllä | Soundly-haku junaan 210, kun Mac vapaa |
| Julkaisija | kyllä | vahdit, merget; B julkaisu yhdessä NS:n kanssa |
| Laitetestaaja | kyllä | junan 210 mittaukset |
| Linssiseppä | vain jos luovutuksessa kesken | kameratyylit odottavat omistajaa |
| Projektiseppä, Sisältökirjuri, Karttaseppä, Työkaluseppä | ei | levossa, ellei studiojaon erä tarvitse |

## 3. Omistajaa odottaa
Muistokuplien valinta (8 rikottavaa, arkit KK:lla), kameratyylit (omistaja palaa itse), esikuvat. Omistaja matkalla ma 26.10. asti.
