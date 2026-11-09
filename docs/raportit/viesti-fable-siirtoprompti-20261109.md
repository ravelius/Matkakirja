# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 9.11.2026 klo 09.4x; KK 09.35: viikko 98 %)

Vanha tili: vvi@vvi.fi (org b408744a, koodaustili), viikko 98 % klo 09.35, raja 99 %. UUSI TILI (suositus, omistaja valitsee):
päätili (org f04011ee; viikko nollautui ma 9.11. klo 09.00; raja 92 %, kysytään kortilla). Taulu: scratchpad/asemataulu/osoitteet.md
(päätili Rq5ajPU4SraE2XKd7BYAix: read + publish samaan osoitteeseen). Käytännön lista: docs/tilinvaihto.md 0.0–8; VOIMASSA OLEVA ARVO voittaa.

## 0. Omistajalle
Omistaja vaihtaa tilin ja avaa uuden istunnon kansiossa /Users/Shared/Claude/Matkakirja-fable ja liittää siihen kohdan 1 viestin.
Kirjautumisohjeita ei tarvita (omistaja 3.11. 16.31).

## 1. Viesti uuteen sessioon

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja; tili vaihtui juuri. Nimeä sessio "PÄÄTOIMITTAJA (Opus, medium)". Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md), oma rivisi `node tools/raamattu-luku.mjs 7.47`, tämä tiedosto (git show origin/main:docs/raportit/viesti-fable-siirtoprompti-20261109.md) KOKONAAN, PT:n uusin luovutus (git show 8b2abc6e5:docs/raportit/viesti-fable-luovutus-20261109-0925.md) KOKONAAN ja docs/tilinvaihto.md (0.0–8). Sitten get_usage: viikkolukema ja tili KK:lle heti. Etäyhteys vain KK:lle.
> SESSIOT ENSIN (omistaja 3.11. 16.31): tyhjennä tämän tilin roolisessiot send_messagella "lataa clear_session ja kutsu self" (list_events = 0): KESKUSTELUKANAVA ensin, sitten Postivahti, Asemataulu, Julkaisija, Natiiviseppä, Natiivi-UI, Pelikoodari, Valoseppä, Karttaseppä, Lavastaja. Puuttuvat luodaan (tilinvaihto.md kohta 2), vanhat arkistoidaan kysymättä; id:t osoitekirjaan `node tools/tyotavat/paivita-idt.mjs … --kirjoita`. ~/.claude/CLAUDE.md tuntee KK:n id:t; jos KK:n id vaihtuu, omistaja lisää sen omalla viestillään.
> Kotikansiot (1.5) ennen aloitusviestejä. KK:n aloitusviesti: "Olet KESKUSTELUKANAVA (Opus, max). Lue ensin `node tools/raamattu-luku.mjs 7.47` ja /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md ja toimi sen TILINVAIHTO-kohdan mukaan." Roolit kohdan 2 mukaan, vahdit, tämän tilin Asemataulu. EI jonokierros-cronia. Lopuksi OHJEIDEN KOE (7.47) ja `node tools/tyotavat/tilinvaihto-valmis.mjs` ennen riviä KK:lle.

## 2. Roolit
Aloitusviesti: "Olet <Rooli> (<malli, effort>). Tili vaihtui. Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen osio 0 ja oma LUE ALOITTAESSA -rivisi (`node tools/raamattu-luku.mjs 7.47`), sitten oma uusin luovutuksesi KOKONAAN ja jatka sen jonosta. Viestit PT:lle send_messagella uudella id:llä <PT:n id>. Vanhat PT:n viestit on jo tehty."
Varmista roolin uusin ennen aloitusviestiä: `git log --remotes=origin --since=1.day --format='%ci %h %D' -- 'docs/raportit/viesti-<rooli>-luovutus-*' | head -3`.

| Rooli | Uusin luovutus (9.11. aamu) | Ensimmäinen työ |
|---|---|---|
| Postivahti | Matkakirja-posti, uusin viesti-postivahti-luovutus-* | kierros; KIERROS.md id:t |
| Asemataulu | – | taulu tämän tilin osoitteeseen; mittarit, työlista, junat kerran |
| Julkaisija | julkaisija-luovutus-20261108-2340 (5b2b523ba) | PK suunta 84521ba9b x3 (ajossa 09.4x) kuvat PT:lle; NUI paikkapalkki-1 uusinta, kun NUI korjannut skenaarion |
| Natiiviseppä | natiiviseppa-luovutus-20261109-0910 (3870953eb) | kaupunkien välinen lentokäyrä (PT: huippu pidetään, 600 km ≈ 4,5 s, 100 km ≈ 3 s), rajapinta NUI:lle |
| Natiivi-UI | natiivi-ui/luovutus-20261109-0915 (439d62a24) | paikkapalkki-1 skenaario: p-3–p-6 "ei toisen kaupungin merkkiä näkyvissä" (JU 09.4x) |
| Pelikoodari | pelikoodari-luovutus-20261109-0922 (023bf2e99) | suunnan kuvat JU:lta; leijuva kattotiilikaistale (`ui juoksupeli mika x y`) |
| Valoseppä | linssiseppa2/luovutus-20261108-0855 | merenpohja-221 todennus JU:lla, sitten vesi |
| Karttaseppä | karttaseppa/luovutus-20261109-0921 (fafcb3705) | lepo; nostojen 3D-kohteet vasta KK:n suunnitelman jälkeen |
| Lavastaja | lavastaja/luovutus-20261107-2214 (cc1b8672c) | lepo |
| Muut | – | levossa |

## 3. Tilanne vaihtohetkellä
Juna 223 auki (kärki 4e972eeed), ei julkaisua ennen omistajan pyyntöä; ennen TF:ää PK:n suunta, kattokaistale ja 1c kallistus omistajalle.
Omistaja 09.34: KK tekee suunnitelman Euroopan nostojen 3D-kohteista (suunnitelmat/20261109-nostojen-3d-kohteet.md); ei töitä ennen sitä.
Levy 112,6 Gt vapaana 09.4x (KS −11,4 Gt raakadataa; 37 Gt polton lähdettä säilyy).
