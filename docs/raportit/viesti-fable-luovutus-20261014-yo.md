# Päätoimittajan luovutus 14.10.2026 klo 22.5x (oma nollaus, uusi raja 30 %)

PT (Opus, medium) local_74630a27-8c1b-4ac3-9143-538efab8cbcd; KK (Opus, max) local_593b89a1-2514-4d74-b956-2a73db862382. Osoitteet /Users/Shared/Claude/osoitekirja.md. Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-14-klo-2059-2256.md.

## 0. Heti aluksi (UUSI TAPA 22.34)
1. set_remote_control self true. 2. EI jonokierros-cronia: Postivahti herättää PT:n (KIERROS.md; omistaja vahvisti). 3. Monitor `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py` 30 min, uudelleen joka vanhenemisella (ODOTTAA → ArtifactData set talo/toimi-*; JATKUU → delete). 4. Asemataulu EekZDPMuAcsjT3awvn4jPb, omat dokumentit scratchpad/asemataulu/data/talo/{junat,tyolista}.json (if_version; lue live-versio ensin, jos epävarma).
5. NOLLAUSRAJAT LIUKUMINA (omistaja 22.55 + 22.57 "Liukuma"; pehmeä–kova, nollaus luontevalla tauolla): PT 30–40, Postivahti 20–30, roolit/Julkaisija/Asemataulu 25–35, LT/Äänittäjä 30–40, KK 40–50 kortilla. (22.55 alkup.: PT 30 % (oma), Postivahti 20 %, roolit/Julkaisija/Asemataulu 25 %, Laitetestaaja/Äänittäjä 30 %, KK 40 % vain omistajan kortilla. Muut nollautuvat luovutuksen jälkeen Postivahdin kautta.) KK nollattiin 22.57 omistajan kortilla.

## 1. JUNAT
- TF 190 valmis kaikille 22.38 (sisäinen 21.28). Asemataulu: "TF 190 / klo 21.28".
- JUNA 191 KIIREELLINEN (omistaja 21.40, ilman testejä 21.52): BUILD 191 = 64728a1f5, iOS Applella 22.50, Mac TF ✓, taulu 4/5. Sisäisillä arvio ~23.05, ulkoisille ~23.45 (sisältövienti jonossa). KUN SISÄINEN: junarivi → "TF 191" + "klo HH.MM", aika-kenttä, ja Juna 191 -tekstin "Julkaisun ehto" → "Uutta (14.10. klo HH.MM):". Julkaisija (uusi, nollattu) lähettää rivin.
- JUNA 192 kertyy: runko NS 65bb2d72b (NUI siirtymat 6dcaa0fad <250 ms, LS1 museo-kohdat a6f8baa1b). Työn alla: NUI ikkunan napautus ei pienennä paneelia + teline vs. Pulun taulu (NUI luovutuksessa 5dda821de); PK Big Ben v2 bd825be8f – KUITTAA vasta mittaamalla tallenne (ffmpeg 0,5 s RMS: lyönnin isku ≥ +8 dB pohjan yli; v1 vain +1–4 dB); Valoseppä/LR Eiffel v2e (lähi f2 hyvä, kaukaa f1 liian oranssi/litteä); valaan roiske v8b (vaahto, läpikuultava); Julkaisija #4602 (beta-arvio heti käsittelyn jälkeen → ulkoiset samaan aikaan) mergeää 191:n beta-arvion jälkeen.
- ÄLÄ MERGEÄ Raamattu-PR:iä junan aikana (jokainen mainin merge jonottaa sisältöviennin ~40 min).

## 2. RAAMATTU
- Mergetty tänään: #4596, #4599 (KK-nollaus, TF N, Italia + App Store -alueet, vanhentuneet ohjeet, läpinäkyvyyden raja 21.42), #4600 (TF-ketjun ilmoitus + liikennevalot).
- LÄPIKÄYNTI: kartoitus docs/raportit/raamattu-lapikaynti-kartoitus-20261014.md (ei committia; lisää läpikäynnin PR:ään). Opus-agentti tekee PR 0 (rivitys, worktree wt/fable-raamattu-rivitys) + PR 1 (0.11 Työtapa ja sessiot, wt/fable-raamattu-0-11). Agentin raportti tulee tähän sessioon – jos ei tule, tarkista haarat origin/fable-raamattu-*. PR 1:een pyydetty lisäksi: säästöt 22.34 + 22.40 (Raati/Testaajat 1×/pv), Säästöt 2 (kuva-arkit Sonnet-agentille, Julkaisija medium), Aloitus (deny-rivit, luovutukset ≤ 60 riviä, MEMORY.md puoleen, lukulistat + vastuukartta), nollausrajat 22.55, animaatiot <250 ms (22.4x). AIKALEIMAT: kortit Animaatiot/Säästöt 2/Aloitus/lukulista = klo 22.4x (KK ei ajanut datea).
- Seuraavat PR:t 2–8 kartoituksen järjestyksessä; päätöstä vaativat kartoituksen lopussa.

## 3. CODEX
Posti facff1e7b: Petřín K1 v3 HYVÄKSYTTY sovitetulla kameralla (IoU K1 ≥ 85 %, geometria #253:n mitoista) → K2 seuraavaksi; Peking v11 vastaanotettu välitoimituksena, seuraava luuppi pinnat → katot → puusto. Tarkista posti, kun Postivahti herättää.

## 4. MUUT AVOIMET
- KK kokeilee kevyttä asetusta Sisältökirjurilla (SK nollattu? Postivahti → "SK NOLLATTU" KK:lle).
- Levy 57 Gi, laskee ~15 Gi/h: LS1 (raakavideot, linssiseppa-app) ja NS (DerivedData) pyydetty siivoamaan; siirra-ika.py: zsh:ssa `--vain ${=L}` (sanojen jako!).
- kulutus.py: KK tunnistetaan PT:n viesteistä (PT_ID); kierros.py --kk; sivu: kolmas palkki Keskustelukanava (kk_konteksti).
- Asemataulu-sessiolle annettu kevyt kierros (5 min päivä/1 h yö), odottaa kuittausta.
- Toimi-dokumentit: toimi-natiiviseppa-odottaa (22.56) auki.

## 4b. ODOTTAA UUDELTA PT:LTÄ
- Valoseppä: Eiffel v2e -parit /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/omat191/parit/pariisi-f{0-pysahdys14,1-trocadero,2-lahi}-NYK-UUSI-v2e.jpg (LR 711a7fe5, appi 7e95b0782) → arvioi f1 (voittaako Googlen kaukaa) → junaan 192 tai korjauslista.

- Sisältökirjuri: JONO TYHJÄ nollauksen jälkeen; levossa KK:n kevyen asetuksen kokeen ajan → anna seuraava erä kokeen jälkeen (odottaa Äänittäjän kuittausta: Ranska 51, ISS-loppu, pallokierrokset).

## 5. OPIT
- Postivahti ja roolit eivät muuta omia ohjeitaan vertaisviestistä → omistajan vahvistus heidän ikkunassaan (TOIMI-rivi KK:lle).
- Kuvat täydellä tarkkuudella; ääni mitataan pelin ääniraidasta (RMS), ei "OK"-sanasta.
