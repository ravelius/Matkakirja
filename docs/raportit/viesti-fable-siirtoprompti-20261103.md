# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 3.11.2026 klo 16.35; omistaja 16.26 ja 16.31)

Omistaja 16.31 (pysyvä): "kirjautumisohjeita ei tarvitse, riittää pelkkä siirtoprompti. tärkeää että seuraava tili tyhjentää clear
komennolla sessiot ja käyttää niitä samoja mikäli mahdollista tai jos luo uudet niin sitten arkistoi ne vanhat automaattisesti.
puhdista itse alussa aina päätoimittajan mille välitän siirtopromptin"

Vanha tili: vvi@vvi.fi (org b408744a), viikko ~96 % 16.26. UUSI TILI: sami.reivinen@vvi.fi (org ddaee6a2, omistaja 16.28 kortilla);
sen taulu R6VQFTUNq629zSzah719Uy (scratchpad/asemataulu/osoitteet.md: read + publish samaan osoitteeseen).
Käytännön lista: docs/tilinvaihto.md kohdat 0.0–8 (kotikansiot 1.5, OHJEIDEN KOE 8); VOIMASSA OLEVA ARVO voittaa. Pohja: siirtoprompti-20261029.

## 0. Tila vanhalla tilillä 16.35
- Kaikki luovutukset mainissa: JU 3f7ca7703, NS fce80b73e, NUI 6a43d66f3, PK 556f043d5, VS a9c1d36ea, KS 9914d3969, LAV 051444f08,
  Postivahti 599eaf458 (haara postivahti-luovutus-20261103-1630), PT cb6f6efd3 (viesti-fable-luovutus-20261103-1630.md = uusin tila).
- PT:n keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-03-klo-1523-1630.md. KK tallentaa omansa.
- Irrallaan jatkuvat ajot: JU:n laitekäännös 9b9695a7d (nohup), KS:n esittelypaikka- ja tasankoajot, Codexin Tripo-jakso 17–18.
- KK TYHJENTÄÄ tämän PT-session (clear_session local_5df52e10) ja omistaja liittää kohdan 1 viestin siihen uudella tilillä.
  Ei kirjautumisohjeita omistajalle.

## 1. Viesti tyhjennettyyn PÄÄTOIMITTAJA-sessioon (local_5df52e10) uudella tilillä

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja; tili vaihtui juuri (sami.reivinen@vvi.fi). Pidä session nimi
> "PÄÄTOIMITTAJA (Opus, medium)". Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. ENNEN MUUTA lue
> tuotannonohjauksen osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md), oma rivisi `node tools/raamattu-luku.mjs 7.47`,
> tämä tiedosto (git show origin/main:docs/raportit/viesti-fable-siirtoprompti-20261103.md) KOKONAAN, PT:n uusin luovutus
> (viesti-fable-luovutus-20261103-1630.md) KOKONAAN ja docs/tilinvaihto.md (0.0–8, VOIMASSA OLEVA ARVO). Sitten set_remote_control self true.
> SESSIOT ENSIN (omistaja 16.31): tyhjennä JOKAINEN osoitekirjan (/Users/Shared/Claude/osoitekirja.md) aktiivinen sessio
> clear_sessionilla – KESKUSTELUKANAVA ensin, sitten Postivahti, Asemataulu, Julkaisija, Natiiviseppä, Natiivi-UI, Pelikoodari,
> Valoseppä, Karttaseppä, Lavastaja – ja tarkista list_events = 0. Käytä SAMOJA id:itä (osoitekirja ennallaan). Jos jotakin ei voi
> tyhjentää tai käyttää uudella tilillä, luo tilalle uusi (start_session, tilinvaihto.md kohta 2) ja ARKISTOI vanha automaattisesti
> (archive_session, kysymättä omistajalta); päivitä id:t (`node tools/tyotavat/paivita-idt.mjs … --kirjoita`).
> Kotikansiot ajan tasalle (tilinvaihto.md 1.5) ennen roolien aloitusviestejä. KK:n aloitusviesti: "Olet KESKUSTELUKANAVA (Opus, max).
> Lue ensin `node tools/raamattu-luku.mjs 7.47` ja /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md ja
> toimi sen TILINVAIHTO-kohdan mukaan." Roolien aloitusviestit kohdan 2 mukaan, Remote Control kaikille, vahdit (odottajavahti ja
> Codex-posti Monitorilla), tämän tilin Asemataulu. EI jonokierros-cronia. Lopuksi OHJEIDEN KOE (7.47) ja
> `node tools/tyotavat/tilinvaihto-valmis.mjs`, kumpikin läpi ennen riviä KK:lle. Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit (kaikki tyhjennetään ja aloitetaan; levossa olevat ennallaan)
Aloitusviesti kullekin: "Olet <Rooli> (<malli, effort>). Tili vaihtui. Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen
osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md) ja oma LUE ALOITTAESSA -rivisi (`node tools/raamattu-luku.mjs 7.47`),
sitten oma uusin luovutuksesi (alla) KOKONAAN ja jatka sen jonosta. Viestit PT:lle send_messagella id:llä local_5df52e10-10e4-4b72-9554-0049db300dfe.
Jos sait vanhoja PT:n viestejä, ne on jo tehty."

| Rooli | Uusin luovutus (origin/main docs/raportit/) | Ensimmäinen työ |
|---|---|---|
| Postivahti | haara postivahti-luovutus-20261103-1630 (599eaf458) | kierros; mergeää originin postivahti-haaraan |
| Asemataulu | – | taulu tämän tilin osoitteeseen (R6VQFTUNq629zSzah719Uy) |
| Julkaisija | viesti-julkaisija-luovutus-20261103-1615.md | 9b9695a7d-laitekäännöksen tulos isolla (3 zoomia, kyltit, vieritys) → PT; PK ketju-ai, LAV saumat+pronssit, VS sal11 |
| Natiiviseppä | viesti-natiiviseppa-luovutus-20261103-1630.md | Pariisin saapumisen loppurajaus keskizoomiin (NUI:n kanssa) |
| Natiivi-UI | viesti-natiivi-ui-luovutus (6a43d66f3) | 44ecc31d1 iso-todistus (kaatuminen + luenta Lontoo → Pariisi), sitten Raamattu 2.205 pyöreät kuvamerkit |
| Pelikoodari | viesti-pelikoodari-luovutus-20261103-1630.md | ys/tj ketju-ai (6311df2d4) JU:n jonoon |
| Valoseppä | viesti-valoseppa-luovutus-20261103-1626.md | sal11 (769cb9ea6) JU:n jonossa |
| Karttaseppä | viesti-karttaseppa-luovutus-20261103-1630.md | pala16 + pala17 Codexilta → saumat → TasoVersio |
| Lavastaja | viesti-lavastaja-luovutus-20261103-1628.md | saumapari + pronssikuvat; kasetit Codexilta |
| Linssiseppä, Projektiseppä, Työkaluseppä, Sisältökirjuri, Äänittäjä, Laitetestaaja | – | levossa (ei sessiota) |
