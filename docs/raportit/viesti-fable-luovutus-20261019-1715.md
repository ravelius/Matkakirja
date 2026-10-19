# Päätoimittajan luovutus 19.10.2026 klo 17.15 (oma nollaus, konteksti 30 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332. Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261019-1621.md (käsitelty kokonaan). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.

## 0. HETI ALUSSA
1. Monitorit: odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen).
2. PR #4990 (Raamattu 9.11 yöjunat): merge kun `testit` vihreä. PR #4987 (linna tauolle) mergetty `testit` pending -tilassa → tarkista `gh pr checks 4987`; jos punainen, korjaa heti.
3. Codex odotettavissa: (a) Mantan smaragdin ja Raiatean höyhenvyön UUSINNAT (d33adf39c: smaragdi sileä läpikuultava kabosoni, vyö käsintehty oikeat höyhenet, pituus näkyy), (b) smaragdin UNIKUVA (f652fa977, vasta hyväksytystä smaragdista), (c) Kolme veljestä -löytöhetken MALLIKUVA (c9540615c, vaihe 1; vaihe 2 = tausta + Tripo TASAN 3 vasta omistajan hyväksynnän jälkeen). Tarkista täysikokoisina; kuittaus postilaatikkoon (git commit-tree origin/claude/postilaatikko päälle, ks. tämän vuoron kuittaukset); mallikuva KK:lle ennen omistajaa.
4. Kun Manta + Raiatea hyväksytty → SK vaihtaa kuvat PR 4984:ään ja mergeää → ilmoitus NUI:lle ja JU:lle (sisältöpaketti). 4984 EI mergetä ennen sitä (uusi teksti ei saa näkyä vanhan kuvan kanssa).

## 1. Omistajan päätökset tässä vuorossa (kaikki kirjattu lokiin)
- 16.40 Aarnin korvaajat: Afrikka Kongon kuninkaan kruunu, Etelä-Am. Mantan smaragdi, Oseania Raiatean kuninkaiden höyhenvyö; Raamattu 3.10 "aarre on yhä löytymätön" (#4983, kaanon tarkennettu lähteiden mukaan #4985).
- 16.43 isoisän uneen Mantan smaragdi (2.159). Ääni valmis ja KK:n kuittaama, ämpärissä aanet/isoisan-uni-v2/. NUI:n haara natiivi-ui/uni-smaragdi-204 a8bc3480c odottaa unikuvaa. Uni on pelissä POIS PÄÄLTÄ (omistaja 17.10.), ei junaehto.
- 16.45 pyörivä 3D-aarre löytöhetkeen, kokeilu Kolme veljestä (ks. 0.3c). Työlistalla oma paketti.
- 16.50 (Codexin kautta) juoksupelin seinät normaalikorkuisiksi + drone nousee ovipalkin yli → PK 1dc6448e9, käännös + kuvapari tulossa (PK kertoo miksi 10/22 GLB).
- 16.56 juna 204 ILMAN ISS-luonnonilmiöitä (Tulossa-merkintä). 17.09 juna 204 ilman Laitetestaajan kierrosta: PT katsoo jokaisen ehdon simutodisteet heti ja lähettää polut KK:lle; viimeisen ☑:n jälkeen LUKITSE 204 → TF suoraan ulkoisille.
- 17.05 Olavinlinna TAUOLLA (#4987; tila valmiiksi-listassa osiot 5–6; Codexin linnatilaukset keskeytetty b9d868c0b).
- 17.11 Aarnin kolme uutta aarretta seuraavaan junaan.
- 17.12 laitekierros vain yöjunille (#4990).

## 2. Juna 204: ehdot (Asemataulun 204-rivi on ajan tasalla)
☑ kipin napit ada01496b (NS:lle kuitattu; iPhonen Kysy-veto seuraavaan NUI-simuun)
☑ ✕ irti reunasta + "(1/1)" pois (VS nostokortti-b e696164d9 ⊃ 3c17f1f32; VS pyytää NS:ltä)
☑ LS Kysy-✕ aa19d8ec7 (rungossa; ennen/jälkeen-kuvat tulossa)
☐ NUI valikko-jatko-204 77959b117 (JU L1) + B3 iPad 60 fps -mittaus samassa simussa (iPad-video vain 15 ainutl. ruutua/s; iPhone 60 ✓)
☐ PK kuvalahde-linkki 5890ccd32 (JU L2)
☐ Lavastaja kehyskiilto-204 ea0fe613a (JU L1)
☐ Aarnin luettelo natiivissa: EU/Lähi-itä/Aasia/P-Am mainin teksteistä, Afrikka/Etelä-Am./Oseania Tulossa ilman vanhaa nimeä/kuvaa/tekstiä (NUI, valikko-jatkon kanssa samaan käännökseen jos ehtii); Sheba/Montezuma -v2 vain jos ei viivästytä
Riski: kipin simuissa Pariisi valkoisina OSM-laatikkoina (kuorma) → Karttaseppä selvittää näkyykö saapumishetkellä.
Runko NS 48924e0d8 vihreä (sis. Lavastajan kehyssävy 429cb6099). Arvio KK:lle: pienet ~18.30, LUKITSE ~19–20.

## 3. Muut
- Käännöslinjat: KAKSI (kuorma 5 min < 100); Postivahti hälyttää vasta 5 min keskiarvolla > 100. Valovahdin tauko purettu.
- Valoseppä: B5-ilmiöt eivät junaan 204; jatkuvat seuraavaan (pimennys k6 kääntyy). Nollattu Postivahdilla 17.11.
- Projektiseppä ja Lavastaja: linna tauolla → Projektiseppä levossa (ei uutta projektia vielä); Lavastaja kehyskiilto.
- SK: PR 4984 pidossa (ks. 0.4). Äänittäjä: juoksupelin maisemat Gemini-arviossa.
- Junan 204 jälkeen PT kokoaa retrospektiivin omistajan löydöksistä (päätös 15.35).
