# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 6.11.2026 klo 18.30; omistaja 18.23)

Vanha tili: päätili (org f04011ee), viikko 88 % klo 18.26, raja 92 %. UUSI TILI: vvi@vvi.fi (org b408744a; koodaustili; merkinnän mukaan vapautui pe 6.11. 07.00, lukemaa ei ole mitattu). Taulu Qo5w6Wk4JSYRwYbyf2fJrm (scratchpad/asemataulu/osoitteet.md: read + publish samaan osoitteeseen).
Käytännön lista: docs/tilinvaihto.md kohdat 0.0–8; VOIMASSA OLEVA ARVO voittaa.

## 0. Omistajalle
Omistaja vaihtaa tilin kotoa näytön jaolla ja avaa uuden istunnon kansiossa /Users/Shared/Claude/Matkakirja-fable. Hän liittää siihen kohdan 1 viestin. Kirjautumisohjeita ei tarvita (omistaja 3.11. 16.31).

## 1. Viesti uuteen sessioon

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja; tili vaihtui juuri tilille vvi@vvi.fi. Nimeä sessio "PÄÄTOIMITTAJA (Opus, medium)". Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md), oma rivisi `node tools/raamattu-luku.mjs 7.47`, tämä tiedosto (git show origin/main:docs/raportit/viesti-fable-siirtoprompti-20261106.md) KOKONAAN, PT:n uusin luovutus (viesti-fable-luovutus-20261106-1830.md) KOKONAAN ja docs/tilinvaihto.md (0.0–8, VOIMASSA OLEVA ARVO). Sitten get_usage: kerro viikkolukema KK:lle heti. EI etäyhteyttä PT:lle: se on vain KK:lla (omistaja 6.11. 16.08).
> SESSIOT ENSIN (omistaja 3.11. 16.31): tyhjennä tämän tilin aiemmat roolisessiot send_messagella "lataa clear_session ja kutsu self" ja tarkista list_events = 0: KESKUSTELUKANAVA ensin, sitten Postivahti, Asemataulu, Julkaisija, Natiiviseppä, Natiivi-UI, Pelikoodari, Valoseppä, Karttaseppä, Lavastaja. Tämän tilin id:t kohdassa 3. Jos sessiota ei ole tai sitä ei voi tyhjentää, luo uusi (tilinvaihto.md kohta 2) ja arkistoi vanha kysymättä. Vie id:t osoitekirjaan: `node tools/tyotavat/paivita-idt.mjs … --kirjoita`.
> Kotikansiot ajan tasalle (1.5) ennen aloitusviestejä. KK:n aloitusviesti: "Olet KESKUSTELUKANAVA (Opus, max). Lue ensin `node tools/raamattu-luku.mjs 7.47` ja /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md ja toimi sen TILINVAIHTO-kohdan mukaan." ~/.claude/CLAUDE.md tuntee KK:n id:n local_37f7c945 tällä tilillä; jos id vaihtuu, omistajan on lisättävä se omalla viestillään. PT ei muuta CLAUDE.md:tä.
> Roolien aloitusviestit kohdan 2 mukaan, etäyhteys vain KK:lle, vahdit (odottajavahti ja Codex-posti Monitorilla), tämän tilin Asemataulu ja sen tiedot kerran ajan tasalle. EI jonokierros-cronia. Lopuksi OHJEIDEN KOE (7.47) ja `node tools/tyotavat/tilinvaihto-valmis.mjs`, kumpikin läpi ennen riviä KK:lle. Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit
Aloitusviesti kullekin: "Olet <Rooli> (<malli, effort>). Tili vaihtui. Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md) ja oma LUE ALOITTAESSA -rivisi (`node tools/raamattu-luku.mjs 7.47`), sitten oma uusin luovutuksesi (alla) KOKONAAN ja jatka sen jonosta. Viestit PT:lle send_messagella uudella id:llä <PT:n id>. Jos sait vanhoja PT:n viestejä, ne on jo tehty."

| Rooli | Uusin luovutus (haara, sha) | Ensimmäinen työ |
|---|---|---|
| Postivahti | Matkakirja-posti/docs/raportit/, uusin viesti-postivahti-luovutus-* (levyllä) | kierros; KIERROS.md id:t |
| Asemataulu | – | taulu tämän tilin osoitteeseen; mittarit, työlista, junat kerran |
| Julkaisija | julkaisija-luovutus-1825, 5628e769e | ENSIN odottimet; origokoe iPad 5 kerran; KS:n ajo 29 tulos KS:lle; NUI:n yhdistelmä ja piilo-palautus. LAV:n 1-2 leivottu, 3c pysäytetty: ajetaan LAV:n rivistä |
| Natiiviseppä | natiiviseppa-luovutus-1826, d785ac047 | origokokeen tulos; tilaraportti alle 10 kt |
| Natiivi-UI | natiivi-ui/luovutus-20261106-1826, c4f6f3fe9 | yhdistelmän tulos; kyltit vain ajon 29 ja välkkeen jälkeen; tilaraportti alle 10 kt |
| Pelikoodari | pelikoodari-luovutus-20261106-1825, b05af232b | lepo, kunnes kartta valmis LAV:lta; tilaraportti alle 10 kt |
| Valoseppä | linssiseppa2/luovutus-20261106-1826, cbb3c907b | ajo 28: varjot ja lähiympäristön lista KK:lle; usvakoe (omistaja 18.20); tilaraportti alle 10 kt |
| Karttaseppä | karttaseppa/luovutus-20261106-1826, 2bbb0c757 (Y 92ea0a945) | ajo 29 valmis ja jaettu; odota KK:n sanaa pareista |
| Lavastaja | lavastaja/luovutus-20261106-1305, 2b66dad4c | ENSIN: tarkista JU:lta, ehtikö perutun ajoluvan ajo 1-2 + 3c alkaa; polku korjattu levyllä, uusi ajo JU:lle tarvittaessa. Ei vientiä |
| Linssiseppä, Projektiseppä, Työkaluseppä, Sisältökirjuri, Äänittäjä, Laitetestaaja | – | levossa, ei sessiota |

## 3. Tämän tilin sessiot (osoitekirja 31.10.; tarkista, että ovat elossa)
PT local_5df52e10-10e4-4b72-9554-0049db300dfe; KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe; JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7; NS local_99130238-aa54-4a29-bcc9-7a023584944b; NUI local_43962c89-fc14-4098-9dd7-6153133ffcea; PK local_91a1bc27-6870-46aa-9886-66fd33b68880; VS local_fa464945-e15d-4f98-aaad-00877a60f63a; KS local_740947d7-aa79-4b1e-948e-1b7dfc734364; LAV local_16f6f272-61c6-43cf-8ad2-1f6020bb8bfd; Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b; Asemataulu local_54e2130a-2e0b-4bf3-8301-57448d1e48a5.

## 4. Irralliset ajot
KS ajo 29 valmis 18.29. Lue lokit ennen uudelleenajoa. LAV:n leivonnan loput 12 valmis 18.26, kk-tausta-1-2 (pid 37488) 18.30; 3c estetty.
