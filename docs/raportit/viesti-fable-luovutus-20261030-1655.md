# PT:n luovutus 30.10.2026 klo 16.55

Edellinen: viesti-fable-luovutus-20261030-1343.md. Päivä: kortit omistajalle KK:n kautta.
Viestit aina id:llä (mcp__ccd_session_mgmt__send_message). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## Tehty
- Juna 216 runko 9301522f7 (NS, testit vihreät): VS loiva-216 4b0476ca0 (sivukäytävien raidat + kivijalka harmaaksi kaikille kujille)
  + LAV paketti v98c (vain Meridiaani v197 + kiilojen poisto; PT tarkisti SHA-vertailulla v97:ään; JU ämpärissä 15.56).
- OMISTAJAN PÄÄTÖS 15.35: Meridiaani v197 (avoimet sivukäytävät, harmaa 1,6 m kivijalka kuvamittauksesta, pielikivet) junaan 216.
- OMISTAJAN PÄÄTÖS 16.0x: tekijän oma tarkistus (orto piirroksen päälle, värit + lähikuvat, [A]-mitat kuvista) → Raamattu 2.177 (PR 5646).
- OMISTAJAN PÄÄTÖS 16.20: ladonta päälle muureille/kivijaloille/kaiteille junassa 216 → loki (PR 5648). Hallit pysyvät malleina.
- LAV:n v98 ja v98b hylätty (hyväksymättömiä osia); JU ei vienyt.
- Täyte 98302f381 (PK) jätetty pois junasta: ei näkyvää muutosta.

## Kesken (jono)
1. LAV: KK pidätti v198-kortin 16.4x. Korjattavana: Taihedianin terassin tasojen seinät valkoiseksi marmoriksi (kaiteet erottavat),
   御路-keskiluiska valkoiseksi veistetyksi marmoriksi (Taihemen + Taihedian), aukion 03 harmaat laatat (taustan 2-1 Codex-jalustojen
   kuvaton V4_marmori → yläpinnat V4_lattiaksi; tarkista V4_marmori myös sivuhallien jalustassa ja pielikivissä), 06-lattiasauma
   (taustan 2-0 kiilakolmiot y 0:aan, PK:n tausta_kiilat.py). Kooste ilman räystään lähikuvaa → PT → KK, kortilla kolme erillistä
   kysymystä (Taihemen, sivuhallit, Taihedian). Kyllän jälkeen paketti v99 uusilla kansionimillä → PT kuittaa SHA-vertailulla → JU → NS.
2. LAV sen jälkeen: osasarja-v2 (PK:n VAATIMUKSET-osasarja-v2.md, proto-3d/_tyo/pelikoodari/piirrokset-20261030/) → PT kuittaa → JU;
   PK kytkee ladonnan + ortovertailu/pari.
3. PK: jono tyhjä (A6 odottaa Codexin GLB:tä). VS: jono tyhjä.
4. Juna 216 = 9301522f7; lukitus ja TF vain omistajan pyynnöstä.

## Säännöt, jotka opin
- Ennen kortille vientiä: tarkista värit omistajan päätöksiin (kivijalka harmaa 27.10.) ja [A]-mitat; KK palauttaa muuten.
- LAV:n paketti: vertaa SHA256SUMS edelliseen hyväksyttyyn (versionumerot normalisoiden) ennen kuittausta; hyväksymättömät osat pois.
- Ämpäri ei ylikirjoita: muuttuneet kansiot uusilla nimillä, pelin viittaukset NS/PK.
- tl.py-tyyppiset taulupäivitykset: älä aja samaa lisäystä kahdesti (tilanne tuplaantuu).

Asemataulu: junat.json juna 216 (runko 9301522f7) ja tyolista.json Meridiaani = valmis päivitetty.
