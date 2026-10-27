# Päätoimittajan luovutus 12.10.2026 klo 05.4x (konteksti ~62 % → oma nollaus; omistaja nukkuu)

Session local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. Edellinen: viesti-fable-luovutus-20261012-yo.md. Muisti: fable-tila-20261012-aamu, julkaisu-vasta-omistajan-pyynnosta, ei-ostoja-toistaiseksi, yovaltuutus-20261011.
Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-12-klo-0321-0459.md. Työjonot: scratchpad/tyojonot.md (tyojonot-lisaa.py). Kirjattavat: scratchpad/kirjattavat-20261006.md (+7 riviä 12.10. 03.5x–05.0x → seuraava docs-PR Opus-agentilla).

## 0. OMISTAJAN LINJAT (sitovat)
- 05.3x "Menen takaisin nukkumaan. Toimi itsenäisesti." Ei kysymyksiä yöllä; kuvat valmiiksi aamuun (vain pelikuvia, tarkista ensin). Rutiinivuoron loppuun "–".
- 04.0x "Otetaan kaikki mahdolliset mukaan jo seuraavaan junaan" + "Julkaise vasta sitten kun pyydän. Ehdit ottaa kaiken mukaan." → JUNA 183 EI LUKITU, EI TF:ÄÄ, EI WEB-MERGEJÄ ennen omistajan pyyntöä; NS:lle ja Julkaisijalle silloin sanatarkasti "OMISTAJA PYYSI JULKAISUA". Kun kaikki valmista → omistajalle yksi rivi "183 valmis julkaistavaksi".
- 05.1x "Ei osteta mitään vielä": pilotit vain ilmaisilla/omilla lähteillä (CC0/PD/CC BY, omat mallit, MetaHuman-agentti).
- Lataukset: roolit hyväksyvät latausluvan vain omistajan omasta viestistä omassa ikkunassaan (kerrottu omistajalle 05.0x, ehdotettu rivi "Saat ladata vapaasti lisensoituja aineistoja (CC0, CC BY, PD)").

## 1. JUNA 183 (NS kokoaa, runko 11cabd1dd+, ei lukitusta)
KUITATTU (lisäksi edellisen luovutuksen lista): MH-laiteluokkaportti a5cb1005a; LS2 raketti 981857ac3 (⊃ 9f080ccbb, Andøya v2 691a83616 Mapterhorn 1 m, Pulu v2 -koodi); Pelikoodari kaariluennat natiivi 8d15716ba (+ web #4469 → #4470 → #4475 lukitushetkellä #4459 → #4461 jälkeen); NUI taidehalli 157f041e8 (omistajan lista: valittu isompi, Siirry läpinäkyvä keskitetty, 7 kabinettiselitystä SK #4476, PT muokkasi m3 ja kg); LS1 taidehalli f3b3707d9 (tauon kamera koko kehykseen, 64 JPEG-varakuvaa simulle).
TYÖN ALLA → kuittaus kun valmis:
- LINNA: v48h 13/17 (16 korjattu). v48i (55/61: salin ala-oven holvi 2,2 → 2,45 m) linnahaarassa bf7abcc5d, botti ~05.15. v48j (86 muurikäytävän vanha seinä + MH v2 kaikille 11: kulmat, parrat, ripset, silmät, valkoiset hiukset, vesipoika, renki) → botti + MH-pelikuvat. Harjan piste 0 = botin raja (Siirtoseppä korjaa). Sitten LT:n 8. kierros (Laitetestaaja valmiina) → tunnus NS:lle.
- NS: MH-materiaalikorjaus 64ec7994f (AlfaRaja + kaksipuolisuus; ilman sitä MH v2 ei näy) → Siirtoseppä yhdistää linnahaaraan ennen v48j:n käännöstä → MH-kuvasarja omistajalle aamulla.
- SAAPUMINEN: KUITATTU 05.4x yhdistelmä 150fbcd9f (bd90fa50e horisonttisävy + LS1 3787c8935 tarkkuusportti + LS2 70cbd55f5 vesi v8; syyajo A–D docs/raportit/kaappaukset/linssiseppa2-tuileries-abcd-20261012/ LS2:n checkoutissa). Jäljellä: République-kameran alla lataamaton laatta → LS2 laajentaa porttia alaspäin (LS1:n koodi) → kuvapari + SHA → kuittaus.
- LS2: laukaisualustan maapinnat (nurmi, kallio, sora, betoni) + alustan rakennukset (betonikenttä, liekkikuilu, valomastot, huoltorakennus); KS:n z13-kehä _tyo/raketti-andoya-mapterhorn/z13-keha. Pulu: Codex-tilaus 8 kuvaa (posti/fable-codex-pulu-raketti-20261012.md, 99cac747d) → toimitus _tyo/codex-pulu-raketti-20261012/toimitus/ → LS2 kytkee (RakettiPulu v2 valmis) → pelikuvapari.
- Pelikoodari + NUI: lautapelien OPASTETTU ENSIMMÄINEN PELI (Mylly + Tavli; logiikka 129a74d1e NUI:lla).
- NUI: iPadin nimilistan koko (valittu ≥ 1,5× naapurit).

## 2. PILOTIT (kehityslipun takana / omistaja näkee kuvat ensin)
- AARRETEHTÄVÄT (omistaja "Joo" 05.0x): Ateena, Pariisi, Tukholma. SK sisältö #4477 (PT korjasi Tukholman vihjeen: Tre Kronor paloi 1697, linna sen paikalle). Pelikoodari moottori 8cfc8dfdd + näkymät olemassa olevilla pohjilla (arvio = säädinrivi, aikajana = napauta järjestyksessä, salakirjoitus = tekstikenttä A–Z), LS1 katso ja löydä (apuagentti). → kuva-arkki omistajalle.
- TAIDEHALLIN ILME (omistaja 05.1x–05.3x + "vähän kuolleen näköinen" + "korjaa liian epäterävä seinä"): LS1 suunnitelma hyväksytty: sali v3 Blenderissä (LR antaa v2g-lähteen), Cuypers-kuviot, CC0-PBR, leivottu valo + valokeilat, 6 kävijää + vartija (DioraamaHahmot3D), pöly, äänimaisema (Äänittäjä), terävät seinät; +45 Mt uusimmille, +10 Mt vanhemmille. Kuvasarja nyt | uusi | oikea Rijksmuseum (SK:n 6 vertailukuvaa _tyo/sisaltokirjuri/vertailu/rijksmuseum-eregalerij/).
- TAIDEHALLIN LÄHESTYMINEN ULKOA (omistajan viimeinen 05.3x): Museumplein → Rijksmuseumin julkisivu → holvikäytävä → sisään Kunniagalleriaan, 8–12 s, ohitettava, täysi vain ensikäynnillä (LS1/apuagentti) → kuvat + video aamuksi; 183 jos ehtii.
- LINNAN KEITTIÖN KOEHUONE "KCD2-taso" (LR, 183:n linnatöiden jälkeen, vain ilmaiset lähteet).
- KS: Mapterhorn hyväksytty Euroopan maan korkeuslähteeksi (_lahteet/mapterhorn/LAHTEET.md); vuoristot z13–14 (Alpit + Norja) datana yöllä, ämpäriin vasta LS2:n kytkentäsuunnitelman jälkeen; yhtenäisyystarkistus; 2D-karttojen peitetyt vedet (32 kaupunkia).

## 3. OMISTAJALLE NÄYTETTY TÄNÄ YÖNÄ
MH-vartija (02.50), MH 8/9 -arkki (v48g, viat kerrottu), raketin lento -arkki, Andøya ennen/jälkeen, taidehallin napit (iPad), taidehallin lista + selitykset (iPhone), taidehallin korjaukset (iPad). Vastattu: Mapterhorn (+ koko maailma, GEBCO/EMODnet), KCD2-polku, värit (Norjan ilmakuvat eivät avoimia; Kartverketin lupa omistajan päätös), lautapelit, aarretehtävät, luvat.

## 4. AAMUN YHTEENVETO (omistaja herää; ti 13.10. poissa Studiolta)
Yksi viesti: mitä valmistui yöllä (kuvat: MH v2 + materiaalikorjaus, Pulu uusilla kuvilla, alustan maapinnat, aarretehtävät, museonäkymä + lähestyminen, lautapelien opastus), mikä on 183:ssa, ja "183 valmis julkaistavaksi" kun on. Asemataulu: junat v78, tehtavat v35.

## 5. KÄYTÄNNÖT
Cron JONOKIERROS luodaan uudelleen (7,27,47). Session id:t: PT local_cf5b4eca, Postivahti local_63227b57, Julkaisija local_1325b8e8, NS local_04e2850b, NUI local_e9fdc695, LS1 local_4b4b976c, LS2 local_ee961a2d, LR local_2cf16574, Siirtoseppä local_c264506b, KS local_4bd7c316, Pelikoodari local_242febe9, SK local_0c172ea0, LT local_3509b4ba, Äänittäjä local_0275bc7a. Levy 94 Gi (siirra-ika 1,5 h 04.48 vapautti 14 Gi). zsh: git show "${B}:polku" (ei $B:polku).

## 6. VIIMEISIMMÄT (05.5x, ennen nollausta)
- KUITATTU 183: NUI f6e89433d (korvaa 157f041e8; valittu nimi 27–34 pt, rivitys; iPad tarkistettu). AVOIN: iPhonen kuva puuttuu (testi ei saanut listaa auki ennen kävelyä) → NUI ottaa seuraavassa ajossa ennen julkaisua.
- Postivahdille pyydetty nollauskaava 05.4x (RC pois → clear_session self → aloitusviesti → RC päälle).