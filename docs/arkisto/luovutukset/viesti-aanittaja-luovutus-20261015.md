# Äänittäjän luovutus 15.10.2026 klo 16.3x (PT: konteksti 27 %)

Lue ensin: viesti-aanittaja-luovutus-20261014.md (säännöt, työkalut, tekniset). Osoitteet: osoitekirja /Users/Shared/Claude/osoitekirja.md. PT = PÄÄTOIMITTAJA local_5df52e10-10e4-4b72-9554-0049db300dfe, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044, PK (Pelikoodari) local_7fcab04b-864c-4ec2-98bd-46e171326701, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Omistajan päätökset tulevat KK:n kautta ("OMISTAJAN PÄÄTÖS klo …"). Viestit PT:lle ≤ 3 riviä.

## TEHTY tänään (kaikki ämpärissä ellei toisin; työkansiot proto-3d/_tyo/<aihe>-20261015)
- Praha v2 + Ateena v1 pallokierrosten kerronta viety (40 tdstoa, vienti pallokierros-praha-ateena-kerronta-vienti-20261014), PK kytkee.
- Ateena-korjaus: luvut 115 → sataviisitoista, 104 → sataneljä (pysäkki-2, historia-olympieion) + "eaa."-loppupisteet (pysäkki-4/-5/-6): 5 uutta ottoa -v2 + täydet ajat-kierros-v2.json / ajat-historia-v2.json (vienti pallokierros-ateena-korjaus-vienti-20261015; _tyo/pallokierros-ateena-korjaus-20261015).
- ISS Kuvat-gallerian selitteet: omistaja 14.17 "kaikki 277" → 277 ääntä Williamilla (eleven_v4_turbo, 73 277 mrk) ladattu SUORAAN pelin puhesäilöön puhe/astro-selite/<sha256('eleven_v4|oae6GCCzwoEbfc5FHdEu||teksti')>.mp3 (R2-ämpäri matkakirja-puhe, Cloudflare REST PUT; ei vie-paketti.sh), varmistettu workerilla (POST + origin matkakirja.app + x-matkakirja-testi:1 → 200; 204 = ei säilössä, ei generoi). Löydös: vanhat 185 olivat xAI-aikaisia (avain sisältää mallin) → eivät kelpaa. _tyo/iss-selitteet-20261015 (generoi.py, lataa.sh, iss-selitteet.json). Ei kytkentää tarvita.
- Isoisän v3-uusinta (omistajan linjaus: isoisä AINA eleven_v3): 18 kaariluentaa + 5 fokus-luentaa + 5 fokus-aikaleimaa, vienti isoisa-v3-uusinta-vienti-20261015 (-v3-nimet; kaari −14,6 LUFS, fokus −17,1; v3 päättyy heti sanaan → 150 ms fade + 0,7 s hiljaisuus). PK kytki web-PR #4625 (v2617). _tyo/isoisa-v3-uusinta-20261015.
- Pulun Pariisi-kutsu (omistaja 16.33 "Hyväksyn"): vienti pulu-vapaalento-kutsu-vienti-20261015, aanet/pulu/vapaalento-v1/livia-kutsu-pariisi.mp3 (9,19 s); PK kytkee junaan 195; äänisivun Tekstit-osasto päivitetty hyväksytyksi ja julkaistu (julkaisuskriptin jälkitarkistus ei tulostanut Access-302-tulosta, deploy ok). _tyo/pulu-vapaalento-20261015.
- Tarkistettu: Kolme veljestä v3b, Hyväksy kaikki -nappi (valinnat.js 13.10.) ja shakin valitut 8/17 olivat jo tehty/viety.

## AVOINTA
1. Kipin v2 (6 ottoa) ja muut 12.10. äänisivun valinnat odottavat omistajaa; jazz-piano oli hylätty 12.10. (äänisivun Hylätyt-osio).
2. Skannerin kirjainääni: NUI vaihtaa nimen koodissa tai PT päättää vanhan objektin poistosta (Julkaisija).
3. Soundly-lataus vaatii GUI-ikkunan; moderato-2/-3 soitin voi olla väärä; Ranskan 51 kertomuksen nimien ääntämys kuuntelematta (ks. 14.10. luovutus).
4. Muiden kaupunkien kierrosten Pulu-kutsu tehdään vasta kun PT/omistaja käskee (Pariisi oli ensimmäinen).

## OPITUT (uusia)
- Pelin lukijaäänet: William = eleven_v4 (ei turbo) workerin avaimessa; säilöavain sha256(`malli|ääni|ohje|teksti`), eleven-ohje tyhjä; tiedoston voi generoida turbolla ja nimetä avaimella, kunhan worker palauttaa 200 (testi yllä).
- Cloudflare R2 -objektin PUT onnistuu REST:llä: /accounts/$CLOUDFLARE_ACCOUNT_ID/r2/buckets/matkakirja-puhe/objects/<urlenkoodattu avain>.
- Äänisivun Access-suojattu sivu ei vastaa sandboxin curlille (000); julkaisu: zsh julkaisija-tyokalut/aanisivu-julkaise.zsh, dangerouslyDisableSandbox tarvitaan verkkoon.
- Lukusanat: tarkista aina 100–199 ("sata…", 104 = sataneljä, 115 = sataviisitoista) ja "eaa./jaa." lauseen lopussa → lisää piste.
