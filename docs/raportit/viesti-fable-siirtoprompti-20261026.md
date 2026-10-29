# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 26.10.2026 klo 16.1x; omistaja 16.05: "tee siirtoprompti toiselle tilille. osaako uusi tili nyt paremmin aloittaa ja lukea ohjeet heti aluksi?")

Vanha tili: vvi@vvi.fi (koodaustili), viikko 96 %, nollautuu to 30.10. klo 07; sen taulu Qo5w6Wk4JSYRwYbyf2fJrm.
UUSI TILI: omistajan valitsema. Uusi PT katsoo
tilin rivin ja taulun scratchpad/asemataulu/osoitteet.md:stä (Artifact list: jos tilillä on jo taulu, read + publish samaan osoitteeseen).
Käytännön lista: docs/tilinvaihto.md kohdat 0.0–8 (UUSI kohta 1.5 kotikansiot ja kohdan 8 OHJEIDEN KOE); VOIMASSA OLEVA ARVO voittaa.

## Mitä on parannettu aloittamiseen (vastaus omistajan kysymykseen)
- Jokainen sessio lukee ENSIN tuotannonohjauksen osion 0 ja oman LUE ALOITTAESSA -rivinsä (`node tools/raamattu-luku.mjs 7.47`,
  suoraan origin/mainista), ei koko Raamattua.
- Kotikansiot päivitetään mainiin ENNEN roolisessioiden luontia (tilinvaihto.md 1.5), koska sessio lataa CLAUDE.md:n vain
  käynnistyessään; 26.10. klo 16.1x kuiva-ajossa 8/17 kansiota oli jäljessä, nyt ne ajetaan ennen vaihtoa.
- Tilinvaihto ei ole valmis ennen OHJEIDEN KOETTA: tuore Sonnet lukee vain CLAUDE.md:n ja PT:n rivin ja vastaa kysymyslistaan.

## 0. Vaihdon järjestys (vanhalla tilillä)
1. Kaikki aktiiviset roolit luovuttavat ja pushaavat (PT pyytää); NS:n iPad Pro 11 -ketju kirjataan luovutukseen sellaisenaan.
2. Postivahti siistii oman kansionsa (Matkakirja-posti, likainen); Projektiseppä lepää → sen kansio ohitetaan ja kirjataan.
3. PT ajaa `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara` (kansiot, joiden sessio on pysähtynyt) ja kuiva-ajon uudelleen.
4. KK tallentaa keskustelunsa (`python3 tools/tallenna-keskustelu.py <uuid> Keskustelukanava`), PT samoin; PT luovuttaa.
5. PT ilmoittaa KK:lle "valmis vaihtoon"; KK näyttää omistajalle kohdan ODOTTAA OMISTAJAA.

## ODOTTAA OMISTAJAA (KK näyttää tämän omistajalle yhtenä viestinä)
- Vaihda Claude-sovellus uudelle tilille ja avaa uusi sessio kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, medium), liitä kohdan 1 viesti.
- Kirjaudu Chromessa claude.ai:hin ja puhelimen Claude-sovellukseen samalla uudella tilillä (Asemataulu ja ilmoitukset).
- Jos uusi PT pyytää sallintoja: `bash /Users/Shared/Claude/Matkakirja-fable/tools/tyotavat/palauta-sallinnat.sh`

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, medium)".
> Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. ENNEN MUUTA lue: tuotannonohjauksen osio 0
> (git show origin/main:docs/tuotanto/tuotannonohjaus.md), oma rivisi `node tools/raamattu-luku.mjs 7.47`, tämä tiedosto
> (git show origin/main:docs/raportit/viesti-fable-siirtoprompti-20261026.md) KOKONAAN, PT:n uusin luovutus KOKONAAN (git log,
> viesti-fable-luovutus-*) ja docs/tilinvaihto.md (kohdat 0.0–8 ja VOIMASSA OLEVA ARVO). Sitten
> set_remote_control self true. HETI sen jälkeen luo KESKUSTELUKANAVA (Opus, max, kansio Matkakirja-fable, start_session, irrotettuna)
> aloitusviestillä "Olet KESKUSTELUKANAVA (Opus, max). Lue ensin `node tools/raamattu-luku.mjs 7.47` (oma rivisi) ja
> /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md ja toimi sen TILINVAIHTO-kohdan mukaan."
> Omistaja puhuu vain KK:lle. Tarkista kuiva-ajolla, että kotikansiot ovat ajan tasalla (tilinvaihto.md 1.5) ENNEN roolien luontia.
> Luo roolisessiot kohdan 2 mukaan, kytke Remote Control kaikille, päivitä id:t (`node tools/tyotavat/paivita-idt.mjs … --kirjoita`),
> käynnistä odottajavahti ja Codex-postivahti (kohta 4) ja ota tämän tilin Asemataulu käyttöön (osoitteet.md, tietokanta tiedostoista
> scratchpad/asemataulu/data/talo/*.json). EI jonokierros-cronia. Lopuksi OHJEIDEN KOE (7.47) ja `node tools/tyotavat/tilinvaihto-valmis.mjs`;
> kumpikin läpi ennen riviä KK:lle. Jatka kohdasta 3. Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit (luodaan ne, joilla on jonoa tai keskeneräinen luovutus)
Aloitusviesti kullekin: "Olet <Rooli> (<malli, effort>). Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen osio 0
(git show origin/main:docs/tuotanto/tuotannonohjaus.md) ja oma LUE ALOITTAESSA -rivisi (`node tools/raamattu-luku.mjs 7.47`),
sitten oma uusin luovutuksesi (MEMORY.md, Rooli-tilaraportit; tarkista git logista) ja jatka. Päätoimittajan session nimi on
PÄÄTOIMITTAJA (Opus, medium). Jos sait vanhoja PT:n viestejä, ne on jo tehty." Mallit ja kansiot: /Users/Shared/Claude/osoitekirja.md.

| Rooli | Luo heti? | Seuraava työ (tarkista roolin luovutuksesta) |
|---|---|---|
| Postivahti, Asemataulu | kyllä | normaali kierros; Postivahti herättää PT:n |
| Julkaisija | kyllä | vahdit, merget, LR-pakettien vienti ämpäriin |
| Natiiviseppä | kyllä | juna 211 -runko + KS elava-kartta 4fccd2490 laitekäännökseen; iPad Pro 11 -asennus vasta omistajan luvalla |
| Laitetestaaja | kyllä | Lontoo-todennus uusittuna (London Eye ja höyrylaiva kaikilla tasoilla), b6-reittiajo Isolla iPadilla kylmänä |
| Karttaseppä | kyllä | omistajan karttapalautteen 5 kohtaa: kuvat 3 zoomtasolta + video PT:lle; Tripo-vertailu |
| Valoseppä | kyllä | tausta-v57:n mittaus (LR leipoo), muurikatteen kytkimet P46 |
| Lavastaja | kyllä | tausta-v57 (45°/215°, valkoinen viiva, kiilaraot, takaoven harmaa laikku) |
| Pelikoodari | kyllä | latauskuvan asettelu, kun Codexin vaakakuva tulee; elävyysvideo v57:n jälkeen |
| Natiivi-UI | kyllä | latauspalkki uuteen vaakakuvaan PK:n kanssa |
| Linssiseppä, Projektiseppä, Sisältökirjuri, Työkaluseppä, Äänittäjä | ei | levossa |

## 3. Tila 26.10. klo 16.1x
- Juna 211 AUKI (runko b6). Julkaisu, lukitus ja TF VAIN omistajan pyynnöstä (TF 210 ulkona).
- OMISTAJAN PYYNTÖ 14.32: uusi versio iPad Pro 11:een suoraan (UDID 00008142-0019686E02F3801C). 114803c2e HYLÄTTY (3D-sarja katosi
  lähitasoilla); KS korjasi 4fccd2490 → NS käännös → LT simukuvat → PT 1:1 → KK kysyy omistajalta asennushetken (asennus sulkee pelin).
  Omistajalle kerrotaan vain asennetusta versiosta todennetut asiat.
- Odottaa omistajaa: asennushetki, kartan korjausten kuvat ja video, latauskuva vaakana 3 laitteelta, elävyysvideo äänellä,
  Tripo-vertailu + yksi kortti, Tanska-pari.

## 4. Ajastukset uudessa sessiossa
- Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000, uudelleen joka vanhenemisella.
- Monitor "bash /Users/Shared/Claude/hooks/codex-posti-vahti.sh", timeout_ms 1800000, uudelleen; postilaatikon fetch heti.
- EI jonokierros-cronia.
