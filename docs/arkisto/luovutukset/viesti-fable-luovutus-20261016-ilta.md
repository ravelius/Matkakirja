# Päätoimittajan luovutus 16.10.2026 klo 17.0x (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm (Julkaisija julkaisi v9: Google-palkki pois). Paikallinen talo/junat.json + tyolista.json: scratchpad/asemataulu/data/talo/ (ajan tasalla; junat viety suoraan v45).

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor, get_usage self. Hoitajan cronit luotu 15.5x (Google-cron poistettu 16.5x).
UUSI PYSYVÄ (omistaja 16.47): junarivillä vain "Työn alla:" ja "Valmiina:", kukin asia kerran, ei ☑/☐ eikä "Julkaistaan, kun" (muisti asemataulu-junarivi-kaksi-otsikkoa). Omistaja 15.53: yksi avoin juna, ei 197-välilehteä ennen lähtöä. Kun omistaja katsoo taulua, vie itse ArtifactData set (if_version) eikä odota Postivahtia.

## 1. JUNA 196 – OMISTAJA PYYSI JULKAISUA
15.39 "laita kaikki junaan 196. sen voi julkaista heti kun nämä kaikki ovat valmiina"; 16.02 "Voi julkaista ilman testejä sitten".
Runko NS 3ab3f1b1e VIHREÄ: koko entinen 197-runko + Praha v7, Wien/Rooma 6daccec73, Belvedere 8576dc030, kori 294914947, kevyt metro 5b70953a8 + naapuririvit e6e7dae9e, vihjevarjo a27706475. Muutosloki #4706 (278 mrk). Louvre k36 osoittimena lukituksessa.
ODOTTAA:
- RAKETIN SAVU k5 (Valoseppä, havainne9/koe5/, ~17.3x). k4: T+3 vanan muoto oikea. k5: alkupurkaus näkyy jo T+1, vanan juuri raketin alta (ei alustan reunasta), juurella oranssi ja ulompana harmaa (k4 valkoinen hehku), liekin kajo laattoihin, alusta tummemmaksi. Vertaa arkin oikeaan sarakkeeseen (Codex). Kelpaa → kuittaa NS:lle + arkki KK:lle (12.58 ehto "ei lähde ennen"; omistaja ei ole nähnyt kokeiluja).
- MUSEOTEKSTIT (omistaja 16.39 "Pois, vaaleissa saleissa tumma teksti"): NUI 14b96078a käännösjonossa (NUI nollattu 16.50, luovutus e45b67ae2). Kuvapari Orsayn keskilaiva + tumma sali → PT tarkistaa → kuittaa NS:lle 196 → KK:lle.
Kun molemmat kuitattu → "LUKITSE 196" NS:lle (ei laitetestejä eikä muistiajoa, vain käännöksen tarkistukset) → Julkaisija TF → rivi KK:lle.

## 2. Seuraava juna (196:n jälkeen)
NUI salilistan kosketuskoe b1ce221ba/4283fb5a4. Louvre-malli: omistaja 16.28 hyväksyi L1–L3 v2 tavoitteiksi; LR k46 rajoissa (96,6/96,7/95,9), Valoseppä tekee pelikuvaparin raketin jälkeen → LR viimeistely → kuvapari PT → KK ennen junaa.

## 3. Päätetty tällä vuorolla
- 15.34 metron taustalaikku "Ei, pelkkä varjo".
- 15.38 nimikyltistä seuraava kohde pois (tehty e6e7dae9e, myös linnan taulun "Seuraavaksi").
- 16.28 Louvre L1–L3 v2 tavoitteiksi.
- 16.47 Google pois: cron poistettu, Asemataulu v9 (#4708), Raamatun avainlista #4707 – Julkaisija mergeää CI:n jälkeen. Worktree /Users/Shared/Claude/wt/fable-google-pois poistetaan mergen jälkeen (tools/uusi-worktree.sh --poista).
- ISS-kohokohdat olivat jo junassa (omistaja 22.06: pienemmät, 3/rivi); työlistan vanha rivi merkitty valmiiksi.
- Asemataulun hoitaja vaatii cronien luontiin KK:n päätösrivin: jokaisen hoitajan nollauksen jälkeen PT ilmoittaa KK:lle "nollattu Asemataulu" (Postivahdin pysyvä ohje kieltää sen tekemästä sitä).

## 4. Roolit nyt
Valoseppä: savu k5. NUI (nollattu): museotekstit → salilista. NS: runko valmiina. JU: valmiudessa TF:ään. LR: odottaa pelikuvaparia. LS: lepää (siivous 196:n jälkeen). Lepäävät oikeutetusti: PK, Karttaseppä (11 pääkaupunkia odottavat OPAS_SALLITUT-kysymystä raketin jälkeen), Siirtoseppä (34 %), Sisältökirjuri, Äänittäjä.
