# Päätoimittajan luovutus 10.10.2026 klo 00.5x (oma nollaus, konteksti ~64 %)

Syy: Raamattu KONTEKSTIN NOLLAUS → FABLEN OMA NOLLAUS. Session id ennallaan local_593b89a1-2514-4d74-b956-2a73db862382.
Keskustelu tallennettu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-09-klo-2229-0052.md. Edellinen luovutus: viesti-fable-luovutus-20261009-yo.md.
Työjonot: scratchpad/tyojonot.md (JUNA 173, PULU PILVESSÄ, roolien NYT-rivit). Kirjattavat: scratchpad/kirjattavat-20261006.md loppu (22.1x–00.4x).
Loki kirjattu tässä PR:ssä (6 otsikkoa 10.10. klo 00.53). YÖ (00–07): ei kortteja, oletukset + aamun kortti.

## 1. Omistaja
- Puhelimella, todennäköisesti nukkumassa. Kysyi illalla: tekstuurimalli (SDXL 1.0 + ControlNet Union ProMax + IP-Adapter Plus ComfyUI:ssa), vapaa lento (TF 170:stä), Notre-Damen tila, nopeutuuko mallien teko — vastattu.
- OPETUS (sitova, lokissa): vastaus omistajan kysymykseen vuoron VIIMEISEKSI tekstiksi; muuten se ei näy puhelimessa.
- AAMUN KORTTI: "Kuninkaanlinna v6j peliin?" Arkki lähetetty 23.5x (proto LS2 docs/raportit/kaappaukset/linssiseppa2-kl6i-20261009/omistajalle-kl-valokuva-v6h-v6j.jpg). Oletus: v6h pysyy. Jos kyllä → Julkaisija vie v6k2 (KTX2 + puukorjaus) tai v6j-paketin ja osoitin junan 174 kanssa.
- OMISTAJAN TOIMET KONEELLA: Freesound-OAuth (Pelikoodarin lataaja klo 09.4x). `claude auth login` ei enää tarpeen (pilvisessiot sovelluksesta).

## 2. JUNA 173 SEIS → korjaus valmistumassa
- JUURISYY MITATTU (Natiiviseppä max, 7f7fb4cc0/50f5ccd39 docs/raportit/muistimittaus-juna173-20261010.md): Notre-Damen omassa mallissa 90 puukorttia → 103 tekstuuria, ND lod1 557 Mt; sama jo TF 172:ssa (v6b, uusin-2; BUILD 172 vahvistettu laitteella).
- Korjaus: a) LS2 data VALMIS 2cc5880df (v6b2 …20261010a = uusin-2/TF 172, v6h2 …10b = uusin-3/173, v6hk2 …10c + v6k2 …10d = uusin-4/174); Julkaisija vie ämpäriin ilman osoitinvaihtoa → osoittimet vasta laiteajon jälkeen (korjaa myös TF 172:n). b) Natiiviseppä junaan 173 omien mallien GPU-budjetti pienellä muistilla (~250 Mt raja → karkeampi LOD). c) PieniKarkeinLisa 1,6, kerroin 4,25 pois. d) LS1:n iPad-portti korjatulla datalla (jos data viivästyy > 1 h, b + c vanhalla).
- Runko: Siirtosepän 9abe4b3b9 (= natiiviseppa/juna-173 571b31309 + "Pelaa latauksen aikana" -äänikorjaus) + Natiivisepän b + c. Intro A (LS1 41fb97f44): alle 12 Gt Eiffel-hetki avauspaikalta (vahti ≥ 1,2 Gt, muuten C).
- Muutosloki 173 KUITATTU (283 merkkiä, käyttöön kun portti läpi): "Pariisi alkaa nykyajan introlla, ja Pariisissa ja Tukholmassa kuuluvat kirkonkellot, suihkulähteet ja satamavesi. Olavinlinnan historiassa kivilinna rakentuu vuosi vuodelta, ja linnan väki puhuu kasvotusten. Varustekuvat ovat valokuvamaisia, eikä peli enää kaadu iPadilla Pariisissa."
- Portin jälkeen: Natiiviseppä effort max → HIGH ja nimi "Natiiviseppä (Opus, high)"; juna 173 auki omistajan "nyt"-sanaan (TF 172 kaatuu 8 Gt iPadeilla → kerro omistajalle, kun korjaus on TF:ssä tai osoitin vaihdettu).

## 3. JUNA 174 (kuitattuja, Natiiviseppä kokoaa)
Äänet pelikoodari/muisti-174-ls1 8ac72eada (silmukat, pakkaukset −40…−71 Mt/näkymä, äänimuistivahti, LS1 kaupunkisilmukat 6e7c12b11); Siirtoseppä d7dc17f07 + LR linna-v45d fbffee576; NUI chat-pin d6bcb66f2, kysy-viiva 36630eedd, turva-sivut 6c6c54687, aanentasot 5324d7b22, laukku-mylly e0d51dfb6, asettelutesti 27c480ff3; LS2 ktx2-174 2cc5880df (uusin-4 → v6hk2, vienti laiteajon jälkeen). Työn alla: NUI Mylly/Tavli-aloituskortti ScrollViewiin + Nostokortin kysymysmuoto Pulun valmiisiin; Siirtoseppä huoneäänet de6b7621e (todennus simulla) + v46p-kytkentä; Laitetestaaja Olavinlinnan iPad-portti 174-käännöksellä (Siirtosepän skripti).
- Olavinlinna: LR v46p = katot s6 + tila-kentät + sinisen neutralointi (v46m:n länsiseinät ja kallio olivat sinisiä) → Siirtoseppä kytkee + 8 suunnan kuva-arkki PT:lle. AUKI: LR vastaa, kuuluuko 225°:n punatiili vuoteen 1499.

## 4. Sisältö
- Notre-Dame: LR tekselitason projisointi omalla UV-atlaksella (v3-pinnat) → vertailu valokuvaan → omistajalle havainnekuva (aamulla).
- KL v6j ks. kohta 1. KTX2: kuvapari puhdas (ETC1S käy).
- Yövalot: Karttasepän OSM-yövalodata (Pariisi 70 000 katuvaloa ym.) → LS1 kytkee 174/175 muistibudjetilla, 173-portti edellä.
- Pulu: GRC/DEU/ITA valmiit ja korjatut → Julkaisija vie (natiivitesti 0 vikaa). ROU/ESP/NLD valmiit 00.38–00.46 → Sisältökirjuri korjaa + pistokoe → Julkaisija. AUT/IRL/SWE AJOSSA (luotu sovelluksesta 00.5x; kaava tyojonot.md PULU-osiossa). Seuraavat PRT, FIN, HRV. Viestit pilvisessioille eivät mene perille → kaikki kehotteeseen.

## 5. Raamattuun (seuraava sessio, linjausmuutokset; loki on jo kirjattu)
1) PILVIAJOT: pilvisessio sovelluksesta, kun CLI on eri tilillä; viestit pilvisessioille eivät mene perille → korjaukset paikallisesti. 2) OMISTAJALLE VAIN HÄNTÄ KOSKEVAT ASIAT: vastaus vuoron viimeiseksi tekstiksi. 3) SIMULAATTORI VAIN TARVITTAESSA: simu-muistivahti 12/16 Gt + yksi raskas simu + memory_pressure ≥ 20 %. 4) Omien mallien vienti: toistuvat osat yhtenä meshinä + automaattinen tekstuuritarkistus; muistiongelmassa mittaus ennen korjausta. Tee omana PR:nä synkatusta mainista (kirjoita linjaus lyhyesti olemassa olevaan kohtaan).

## 6. Ansat
- Roolit jäävät "waiting"-tilaan shell -c-lupakyselyyn (LR 22.57, Julkaisija 00.40) → stop_session + ohje.
- macOS:n "Pakota lopettamaan" -ikkuna jäi auki 00.15:n muistipiikistä (koodaus-näytöllä, ei estä). Epic Games Launcher on macOS:n keskeyttämä; quit aikakatkaistiin (ei kiireellinen).
- MEMORY.md ~23 kt (raja 24,4 kt), roolit lisäävät rivejä → tiivistä tarvittaessa.
- Levy ~98–100 Gi swapin vuoksi; lokit NAS:lle Julkaisijalla.

## 7. JONOKIERROS-kehote (CronCreate "7,27,47 * * * *", sanatarkasti)
JONOKIERROS (Päätoimittaja, Raamattu Ydinajatus kohta 2 C TYÖJONOT + KONTEKSTIN NOLLAUS): 0) get_usage self: konteksti ≥ 55 % → päivitä tilatiedosto (muisti fable-tila-*), ≥ 65 % → FABLEN OMA NOLLAUS heti (tallenna-keskustelu.py, luovutus + aloitusviesti, push, clear_session self). Tekstityöt omina pilvisessioina heti (krediitti, Raamattu KREDIITTI KÄYTTÖÖN HETI), ei paikallisina agentteina. 1) date. 2) list_sessions (isRunning) + ListAgents; vertaa scratchpad/tyojonot.md:hen: levossa ilman pitkää ajoa → seuraava erä heti viestillä (send_message session id:llä), tyhjä jono → lisää 1–3 erää. Pulun pilvisessiot: seuraa haarojen commiteja (pulu-<maa>-pilvi), valmis maa → pistokoe Sisältökirjurille → seuraava maa (sh scratchpad/kaynnista-pulu.sh <ISO3>). 3) Kerran tunnissa list_events Postivahdille: kierroksessa näkyvät kontekstiluvut, muuten korjaa ajastus. 4) Päivitä tyojonot.md:n Päivitetty-rivi. Juna 173 auki omistajan "nyt"-sanaan. Unity 6.7 -kokeen tulos → omistajalle HETI. KYSYMYKSET AINA KORTTINA päivällä; yöllä (00–07) oletus ja aamun kortti. Omistajalle vain häntä koskevat asiat. Kone vapaa ti 13.10. asti. Kaikki suomeksi.
