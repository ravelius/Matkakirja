# Päätoimittajan luovutus 29.10.2026 klo 07.25 (tili sami.reivinen@vvi.fi, PT local_8d8ebf72, konteksti 30 %)

Id:t: /Users/Shared/Claude/osoitekirja.md. Edellinen -20261028-2123. Taulu: scratchpad/asemataulu/data/talo/*.json
(.tmp + os.replace + copymode, ylätason `d['ts']` nykyhetkeen; apuskriptit scratchpadissa eivät säily → kirjoita uudet).
VIESTIT: SendMessage-raja täyttyi 28.10. 21.4x → käytä mcp__ccd_session_mgmt__send_message täydellä id:llä.
Lokin PR:t `gh pr merge --squash`.

## 1. JULKAISTU
- TF 213 ULKONA 28.10. 22.16 (runko b8a92d661 = a7b9b71d4 + KS suomeksi-213 98b9bace8 + leirit pois 457d05f98).
  Ensimmäinen ajo (a7b9b71d4) peruttiin ennen IPA:ta: englanninkieliset nähtävyysnimet (2 988/5 231 ilman fi-nimeä).

## 2. JUNA 214 (auki; TF vasta omistajan pyynnöstä)
- NS:n runko 72952b7fe vihreä 2217/761/573: NUI esikatselu b48ecd7f8, PK porttiovet 65° 21a8962da, NUI kohdenostot
  408d80914 (omistajan bugit 3–4), NUI arkki-tuplat 4192cf990 (pin + tuplajohdanto), KS nimet-214 93d520848 → aa48b61f7
  → d25b6f69f (omistajan bugit 1–2, koot 16/13/10–12 pt, suomen kielen käytäntö), NUI nostonimet 616d4b6e0, KS tasangot
  de6053ab8 (JU vei palat 01.00 omiin versiokansioihin). Omistaja hyväksyi nimikoot 06.12.
- ODOTTAA: KS siirtymä-SSE 0c14f6d80 (ent. 8ac9ac545) → pienen iPadin mittaus omistajan studiokäynnillä.
- KUJA 05 NIPPUNA (PT kuittaa nipun, ei osia erikseen): LR malli v119 (v118 itämuuri peitti t-portin aukon) +
  vientipaketti (tausta-v63, muurikate, rakennukset/avoimet, kuja 01 v112) → KS pohja pk7 e8a5b232 (PT kysyi, onko tehty
  v119:stä, KS viestissä "v102") → PK ratatarkistus + uusi haara (pk6-214 7e9c8473c EI junaan) → JU ämpäri → NS.
  Kuja-29:n aukko = näkymä, ei reittiä (KK päättää, jos halutaan).

## 3. JUOKSUPELI (KK johtaa)
- Kuja 01 muoto LUKITTU (omistaja 06.20, v112: vihreä vain kapeassa palkissa ja kannakkeissa).
- Kuja 02: omistajan 06.41 "kavennetaan" perustui väärin päin oleviin mittarilukuihin → kavennus SEIS. LR: leveys
  havainne 4,5 | peli ≥ 4,3 hahmon korkeutta; kattojen välin ero = kamera (sovitettu kamera 0,84, testikamera 0,54,
  havainne 0,70). KK:lla uusi kortti, suositus "leveys ennallaan", kuva lokit/havainne-editori-20261029-070615/02/.
  Vastauksen jälkeen kirjaa. LR korjasi vertailu-lr.sh:n (havainne ensin + sarakevahti exit 3; proto-3d/_tyo, ei SHA:ta).
- VALO vasta kun KAIKKIEN kujien muodot hyväksytty + omistajan kortti "Aloitetaanko valo?" (27.10. 10.56). VS levossa.
- PK drone-214 ea52d4a50 video KK:lla. Codexin J4-v5 (6c2cc9edd) pari KK:lla.

## 4. MUU AUKI
- KS myöhemmin: jokinimien harvennus (Seine/Marne 7–8×/näkymä); Alppien vaalea saumaneliö Torinon yllä (ennen = jälkeen).
- R2-poisto ja pienen iPadin mittaus omistajan studiokäynnillä (komento KK:lla, ks. edellinen luovutus).
- SK maakuntatekstit ennallaan (edellinen luovutus).

## 5. LOKIIN TÄNÄÄN (PR:t 5513, 5514, 5518, 5523–5525, 5527, 5530)
21.40 porrastus kelpaa; 21.56 leirit pois nähtävyyksistä; oppi 22.41 valo; 06.09 kuja 01 liikaa vihreää; 06.12 nimikoot;
06.20 kuja 01 lukittu; 06.41 kuja 02 kavennetaan + korjaus/oppi (luvut väärin päin).

## 6. KONE
Ei omia taustaajoja. Nollatut yöllä: KK 15., LR 18., NUI 9., NS 6., PK 15.
