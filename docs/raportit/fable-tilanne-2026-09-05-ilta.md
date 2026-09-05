# Fablen tilannekuva 5.9.2026 klo 22.40 (Suomen aikaa) — jatkosessiolle

Omistaja pyysi resetin. Tämä on kesken olevien asioiden luettelo tunnuksineen,
jotta seuraava Fable-sessio jatkaa ilman arvailua. Julkaisukaava ja roolit:
docs/roolitus.md; linjaukset: js/tyohuone-raamattu.js (viimeisimmät 5.9.2026:
KAIKKI PALLOLLE, VANHA KARTTA JAA VIVUN TAAKSE, KELLONAJAT SUOMEN AIKAA,
FABLEMAX VAIN TARPEESEEN).

## Kesken (tila 22.40)

| asia | tila | mitä seuraavaksi |
|---|---|---|
| **v1594 etusivupallo** (PR #2051, haara claude/matkakirja-lehdet-nqf159) | koodi valmis, CI ajossa; video 2026-09-05c renderöityy työnkululla `tee-etusivupallo` (käynnistetty haarasta 22.35, kesto 35–60 min) | kun R2:ssa on `julisteet/etusivu/2026-09-05c/etusivu.json` (HEAD 200) → squash-merge PR, reset haara mainiin, kaappaa etusivu (scratchpad/etusivupallo-koko/kaappaa.mjs) ja lähetä omistajalle |
| **Pallolaatat kansio c** (run 33985106951, käynnistetty 21.47 mainista, v1589-työkalu, ~80 min) | ajossa; muistutus trig_01Ezz1zV9SSshwW7YMGfTuT9 klo 23.12 | kun valmis: js/pallo.js `PALLO_LAATTATUNNISTE = 'c'`, sw.js LAATTAKANSIO/LAATTAKANSIOT, testit -nostot-c, julkaise; kaappaa navat (scratchpad/asettelu/hattu.mjs) ja lähetä etelänavan kuva; sitten Z8-neljännekset kansioon c (tee-pallolaatat.yml, max 8 min 8 nostot kylla tunniste c, alue "-180,0,-90,85" + "-90,0,0,85", sitten "0,0,90,85" + "90,0,180,85", sitten etelä neljä) kaksi kerrallaan; lopuksi luettelo-input työnkulkuun (laatat.json max 8) |
| **22 Euroopan kohtaamisehdotusta** (posti/kuvatoimitus-eurooppa-uusinnat-2026-09-05.md, kuvaputki 22.21) | Opus tiivistää raportin Fablelle (agentti käynnissä resetin hetkellä — jos raportti katosi, aja tiivistys uudestaan) | Fable päättää kaupungeittain, vastaa postiin (posti/fable-vanha.md, uusin ylimmäs), sitten kaarien luonnos Opuksella + Fablen viimeistely kuten v1593 |
| **Luennat v1593:n kaarille** | 9 kaariluentaa + Lontoon 2 kohtaamisluentaa generoimatta; tekstit `mykistetyt`-listoilla | `NODE_USE_ENV_PROXY=1 ELEVEN_API_KEY=… node tools/generoi-kaari.mjs --mykistetyt lontoo dubrovnik odessa` ja `generoi-kohtaamiset.mjs lontoo` (vaatii uuden hahmoäänen HAHMOT-tauluun); avain ei ole kontissa — omistaja tai työnkulku |
| **Postikierros** | rutiini trig_01SB7J6WarGdjvZY9e7weUuv tunneittain; viimeksi käsitelty kuvaputken commit 1d32042c, Fablen viimeisin 5f3273ba | — |
| **Omistajan päätökset auki** | SunCalc (suositus: seuraava) ja tsParticles kirjastoista; Lyria 4 raitaa; laitekalibroinnit (rullan herkkyys, tarkkuus liikkeessä -vipu); puhelimen isoisän kuvan koko (110 px, isompi vaatii tekstin päälle menon) | kysymyskortit, kun omistaja on paikalla |

## Lisäys klo 23.05 — agentit työn alla resetin hetkellä

Kolme Opus-agenttia työskentelevät omissa worktreissään (`.claude/worktrees/agent-*`, haarat `worktree-agent-*`); niiden commitit cherry-pickataan työhaaraan, kun ne valmistuvat (jos raportti katosi resetissä: `git worktree list` ja `git log worktree-agent-<id> -1`):
- **Isoisän kuvapino** (adc874d5131370d3d): etusivun kuvat pinoon sikin sokin, haaleina ja sumeina tekstin alle; kuvalista datavetoiseksi (uusi pakka), Raamattu ISOISA JAA ARVOITUKSEKSI. Base = työhaara (v1594), menee samaan PR #2051:een.
- **Kaaret erä A** (aa23b5fd3656479fb): Amsterdam (Yara), Islanti (Einar), Pietari (Matvei), Tallinna (Eve), Tromssa (Kjell), Alpit (Anselm, koiran sukumuisti pois), Marseille (rike pois).
- **Kaaret erä B** (aca9da3e54bda2713): Ateena (Dafni), Kiova (Taras), Granada (Inés), Kööpenhamina (Freja, Tivoli), Rooma (Nico, Trevi), Oslo (Oskar, Gjellestad-kysymys), Varsova (Zofia), Madrid/Venetsia kaksoishenkilöt.
- **Avauslento** (a8b097510a2153350): omistaja 23.10 — Bombay-kuva rajataan niin, ettei isoisää näy (kuvateksti "Isoisän kuva: Bombay, 1873"), kone piirtää etusivun paksun punaisen viivan, näkymä lähemmäs, pallo pyörii hitaasti lennon aikana. Base = työhaara (v1594), menee PR #2051:een.
- **Isoisän uudet kuvat** (omistaja 23.15: "kohta pitäisi tulla isoisän uusia kuvia, niin käytä niitä ennemmin"): kun kuvaputki toimittaa ne pelin R2:een (postikierros huomaa), kytke ne HETI etusivun kuvapakkaan ja avauslennon `lento`-avaimeen (ISOISAN_VALOKUVAT) — Bombay-rajaus on vain väliaikainen. Kuvatekstit sanasta sanaan, muoto "Isoisän kuva: <paikka>, 1873"; kasvoja ei näytetä (Raamattu ISOISA JAA ARVOITUKSEKSI).
Fable tarkistaa ja viimeistelee tekstit (kuten v1586 ja v1593), poistaa LUONNOS-merkinnät, julkaisee. Päätökset kaupungeittain: posti/fable-vanha.md 20:05 UTC. Dublin on jäissä (henkilöä ei ole). Kuvaputkelta pyydetty isoisän vaaleat kuvat pelin R2:een kuvatekstein (posti 19:55 UTC).

## Tänään julkaistu (v1553–v1594)

Pallo oletuslaudaksi ja laatu levossa; kirjastot StPageFlip, Tuna,
Vivus+Rough, d3-geo; kaikki linssit pallolle (moottori, topografia,
vesistöt, vertailu, maatiedot, radio, aikajana), lähtökaupungin valinta
pallolle; napakannet, napakerroin, laattatyökalun korjaukset (kansiot
b ja c); 32 eläinkuvaa ja 24 uutta eläintäkyä; kolme uutta kaarta;
sivunkääntö (varjo, huntu); Mac-trackpad; etusivupallo koko sivulle.

## Havainnot työlistalle

- Laattojen reunasaumat tarkimmalla tasolla (Huippuvuoret): reunapehmennys polttovaiheessa.
- docs/kuvatuotanto-kohtaamiset.md rivi 80 viittaa yhä Nediin (tyylikokeiden loki).
- Kaupunkien pisteet (pointsData) näkyvät radio-, vertailu- ja maatiedot-tilassa nappien alla: lauta.js `pisteNakyy` + body-luokat (ehdotus karttapallo.md 10.3).
