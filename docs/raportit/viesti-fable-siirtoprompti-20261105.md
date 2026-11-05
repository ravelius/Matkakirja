# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 5.11.2026 klo 17.10; omistaja 17.05 ja 17.06)

Vanha tili: sami.reivinen@vvi.fi (org ddaee6a2), viikko 96 % klo 17.03. UUSI TILI: päätili (org f04011ee, raja 92 %, omistaja 17.06).
Tilin taulu Rq5ajPU4SraE2XKd7BYAix (scratchpad/asemataulu/osoitteet.md: read + publish samaan osoitteeseen).
Käytännön lista: docs/tilinvaihto.md kohdat 0.0–8 (kotikansiot 1.5, OHJEIDEN KOE 8); VOIMASSA OLEVA ARVO voittaa.

## 0. Omistajalle
Omistaja vaihtaa tilin ja avaa uuden istunnon kansiossa /Users/Shared/Claude/Matkakirja-fable. Hän liittää siihen kohdan 1 viestin. Kirjautumisohjeita ei tarvita (omistaja 3.11. 16.31).
Uusi istunto on puhdas, joten se täyttää ehdon "puhdista päätoimittaja". Päätilin vanha PT-sessio arkistoidaan kysymättä.

## 1. Viesti uuteen sessioon päätilillä

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja; tili vaihtui juuri päätilille. Nimeä sessio "PÄÄTOIMITTAJA (Opus, medium)". Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md), oma rivisi `node tools/raamattu-luku.mjs 7.47`, tämä tiedosto (git show origin/main:docs/raportit/viesti-fable-siirtoprompti-20261105.md) KOKONAAN, PT:n uusin luovutus (viesti-fable-luovutus-20261105-1710.md) KOKONAAN ja docs/tilinvaihto.md (0.0–8, VOIMASSA OLEVA ARVO). Sitten set_remote_control self true ja get_usage: jos päätilin viikkokäyttö on jo lähellä 92 %:a, kerro se KK:lle heti.
> SESSIOT ENSIN (omistaja 3.11. 16.31): tyhjennä tämän tilin aiemmat roolisessiot send_messagella "lataa clear_session ja kutsu self" ja tarkista list_events = 0: KESKUSTELUKANAVA ensin, sitten Postivahti, Asemataulu, Julkaisija, Natiiviseppä, Natiivi-UI, Pelikoodari, Valoseppä, Karttaseppä, Lavastaja. Jos roolilla ei ole tämän tilin sessiota tai sitä ei voi tyhjentää, luo uusi (start_session, tilinvaihto.md kohta 2) ja arkistoi vanha kysymättä. Vie id:t osoitekirjaan: `node tools/tyotavat/paivita-idt.mjs … --kirjoita`.
> Kotikansiot ajan tasalle (tilinvaihto.md 1.5) ennen aloitusviestejä. KK:n aloitusviesti: "Olet KESKUSTELUKANAVA (Opus, max). Lue ensin `node tools/raamattu-luku.mjs 7.47` ja /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md ja toimi sen TILINVAIHTO-kohdan mukaan." Kerro KK:lle sen päätilin id: ~/.claude/CLAUDE.md tuntee KK:n vain tileille sami.reivinen ja vvi, joten omistajan on lisättävä uusi id omalla viestillään. PT ei muuta CLAUDE.md:tä.
> Roolien aloitusviestit kohdan 2 mukaan, Remote Control kaikille, vahdit (odottajavahti ja Codex-posti Monitorilla), tämän tilin Asemataulu. EI jonokierros-cronia. Lopuksi OHJEIDEN KOE (7.47) ja `node tools/tyotavat/tilinvaihto-valmis.mjs`, kumpikin läpi ennen riviä KK:lle. Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit
Aloitusviesti kullekin: "Olet <Rooli> (<malli, effort>). Tili vaihtui. Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md) ja oma LUE ALOITTAESSA -rivisi (`node tools/raamattu-luku.mjs 7.47`), sitten oma uusin luovutuksesi (alla) KOKONAAN ja jatka sen jonosta. Viestit PT:lle send_messagella uudella id:llä <PT:n id>. Jos sait vanhoja PT:n viestejä, ne on jo tehty."

| Rooli | Uusin luovutus (haara, sha) | Ensimmäinen työ |
|---|---|---|
| Postivahti | Matkakirja-posti/docs/raportit/viesti-postivahti-luovutus-20261105-1710.md (levyllä) | kierros; KIERROS.md id:t |
| Asemataulu | – | taulu tämän tilin osoitteeseen; mittarit (viikko ja levy jäivät vanhoiksi) |
| Julkaisija | julkaisija-luovutus-20261105-1706, d0e50c49e | jono: vuorottelu juoksupeli / Pariisin 3D-rakennukset; LAV:n aja13 uudelleen, jos kuoli |
| Karttaseppä | karttaseppa/luovutus-20261105-1706, 3d2b2b5cb | Grand Palais otto 2 ja muut kuusi Codexilta; ND-torneja EI suoristeta (2.215) |
| Natiivi-UI | natiivi-ui/luovutus-20261105-1704, 5d5c94a72 | kylttien paikanvaihto; Auki 1–3 KK:n sanalla |
| Pelikoodari | pelikoodari-luovutus-20261105-1706, c372aade5 | proto 4c4cf9d8d:n katselu |
| Lavastaja | lavastaja/luovutus-20261105-1706, aa14c1acc | koejuuri-lattia13: kuvat, saumat, pari PT:lle; ei vientiä |
| Natiiviseppä | natiiviseppa-luovutus-2052, bab7451f0 | lepo, kunnes PT antaa työn; ei uusia kokeita |
| Valoseppä | linssiseppa2/luovutus-20261105-1645, 095fe1068 | lepo: omistaja 16.41; Pariisin kokeet seis |
| Linssiseppä, Projektiseppä, Työkaluseppä, Sisältökirjuri, Äänittäjä, Laitetestaaja | – | levossa, ei sessiota |

## 3. Irralliset ajot vanhalla tilillä
Mac jatkaa ajoja tilistä riippumatta, jos prosessi ei kuole session mukana: LAV aja13 (L1, JU:n mukaan kuolee session mukana) ja PK 4c4cf9d8d (L2, pid 76844). Tarkista lokit ennen uudelleenajoa.
