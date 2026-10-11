# Pelikoodarin luovutus 11.10.2026 klo 07.0x (nollaus 50 %, PT)

Edellinen: viesti-pelikoodari-luovutus-20261011-aamuyo.md. Viestit SendMessage nimellä: "PÄÄTOIMITTAJA (Opus, max)", "Julkaisija (Opus, high)",
"Siirtoseppä (Opus, high)", "Natiivi-UI (Opus, high)", "Linssiseppä (Opus, high)", "Linssiseppä 2 (Opus, high)", "Postivahti (Sonnet 5.5, medium)".

## Tehty 11.10. 03.5x – 07.0x
- Tyrmän taso 864a0c7df −31,0 dB (tavoitteessa), kipinä näkyy 181g:llä (video proto-3d/lokit/pelikoodari-kipina-181g/). PT kuittasi molemmat.
- Kartan hiljaisuus linnan jälkeen (Laitetestaajan vika 6) = omistajan KERRAN LÄPI (30.9.), ei vika. PT ja NUI kuittasivat.
- Sääerä #4383 MERGED 954ef6065: 66 otosvuoririviä → 59 sääaseman normaalia + 7 pois (tools/hae-saa-asemat.mjs, tools/saa-asemat.json).
  PT: MediaWikin/Wikidatan api.php kuvaavalla UA:lla on sallittu (VERKKOLÄHTEET).
- Proto pelikoodari/tyrma-tapahtumat (worktree wt/proto-pelikoodari-tyrma-tapahtumat, pohja siirtoseppa/laituri-varoitus + 32aa0e9b4):
  02cd4d6ba tyrmän harvat tapahtumat 20–40 s + epäilyrepliikki kerran per jakso (V.EpailyKuultu); 0391b4701 laiturin pohja
  (Soundly soutu-silmukka-02 0,9, SeikkailuSade). Siirtoseppä ja Julkaisija tietävät (v10 / 5.–6. kierros); tasot mitataan Laitetestaajan 5. kierroksesta.
- #4326 IP-suola oli jo tuotannossa (#4335, IP_SUOLA julkaistu 11.10. 02.29). PT:lle kerrottu.
- Worktreet siivottu 5 → 2 (Postivahti).

## KESKEN: pääkaupunkien kytkentä (PT hyväksyi suunnitelman 06.4x, junaan 182)
Haara pelikoodari-paakaupungit-lehdet (worktree /Users/Shared/Claude/wt/pelikoodari-paakaupungit-lehdet), commit 3cab61946 (data, KESKEN).
14 kaupunkia: belgrad bratislava chisinau minsk podgorica skopje tirana zagreb andorralavella bern monaco reykjavik sanmarino vaduz.
Data: paakaupungit-e01-pilvi 357c5c4a2, -e02-pilvi f30060c30. Kytkentä uudelleen: node tools/paakaupungit/kytke-pilvisisalto.mjs . <paakaupungit-pilvi-kansio>
(vain puhtaaseen tiedostoon, lisää taulujen loppuun).
Jäljellä (suunnitelman kohdat):
1b) Kohdekarttojen PNG:t: node tools/piirra-kaupunkikartta.mjs <id> × 14 (rajat lisätty, rasterointi korjattu samaan prosessiin). Zagrebin ajo
    jumittui yli 5 min (Overpass tai Chromium) → selvitä (aja yksin, katso missä vaiheessa); KATSO kuvat silmin. tools/tarkista-karttapisteet.mjs.
1c) Tiranan rivi js/packs/paakaupungit.js:12 "noin kolmannes kansasta" → kunta noin neljännes (2023) (PT).
1d) Säärivien lahde on pilvityökalun "en-Wikipedia, ilmastotaulukko"; harkitse asemanimeä (kuten #4383: "sääasema X, en-Wikipedia") saa.json:n tausta.taulukosta.
2) Vienti ilman skeemanostoa: kaupunkilehdet avaimittain (tools/vienti/kokoelmat.mjs:227). Tarkista eheysvartija kaupunki=null-lehdelle ja
   KAUPUNKIKARTAT-vienti pisteen id:llä; aja vie-sisalto ja anna NUI:lle näytepolku kokoelmat/kaupunkilehdet/<id>.json.
3) Web: maakortin pääkaupunkirivi (js/fokusmitat.js:415 maanPaakaupunki palauttaa myös id:n; rivi 632–641 "+"-nappi mallina) → olemassa oleva
   Lue lisää -painike, kun KULTTUURI_KATEGORIAT[id] on → avaaKaupunkiesittely(ui, {id, name}) (js/kaupunkinosto.js:1149). Kohdekartta haetaan
   lehtitila.arrivalShownFor-avaimella (lehti.js:548): varmista, että se on pisteen id. UI vain olemassa olevilla pohjilla.
4) Natiivi = NUI (sovittu: id sellaisenaan, sama polku ja skeema; Liita luo pääkaupungille KaupunkiTiedot-olion; nappi kun lehti on).
5) Vanhat appit: uudet kaupunkilehdet ovat haitattomia (ei sisääntuloa).
6) Testit: tests/lehdet.test.mjs:429–452 sallii KAUPUNKIKARTAT-avaimeksi myös PAAKAUPUNKIPISTEET-id:n; uusi testi pistelehdille (piste + kansi);
   vienti.test null-kaupungin lehdelle. npm test.
7) Yksi PR (data + web + vienti) Julkaisijalle, ei versionostoa; rivi PT:lle.
SEURAAVA jonossa: ISS-äänierä (omistajan kortti 10.10.): valmis erä proto-3d/_tyo/aanisivu-iss-20261010/ (40 ääntä, ääniportti 0 hylättyä,
EHDOTUS.md) → kuuntelu äänisivulle (artifact Qr7WvfZvKiNxGNwbFEeW2t, sivu täynnä 256 MiB: oma sivu) ennen peliin vientiä.

## Opit
- Linssit-testit/kaanna.sh ja unity-tarkistus.sh ajetaan sh:lla, ei zsh:lla (sanojen pilkonta).
- zsh: "$b:Assets/..." tulkitaan :A-muokkaimeksi → käytä "${b}:polku".
- Proton haarat ovat paikallisia (ei origin-pushia); peili natiivi-backup.

## Worktreet
wt/proto-pelikoodari-tyrma-tapahtumat (v10:n jälkeen pois), wt/pelikoodari-paakaupungit-lehdet (KESKEN), wt/pelikoodari-louvre (#4365).
