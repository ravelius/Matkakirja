# Päätoimittajan luovutus 24.10.2026 klo 23.00 (konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261024-2130 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47, luvut 7, 8, 9, 12, 14, 4.1, docs/tilinvaihto.md. Asemataulu ensin (Artifact open).
Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-24-klo-2132-2258.md. Codex-posti: scratchpad/posti-laheta.sh.
Seuranta: Monitorit odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uusi vanhetessa). YÖSUUNNITELMA: scratchpad/yosuunnitelma-20261024.md.

## 0. OMISTAJAN PÄÄTÖKSET (voimassa)
- 18.18 havainnekuvasta identtiseksi kaikkiin peleihin · 18.26 kuvakulma 810, värit havainnekuvan tasolle, laatat 3D
- 18.45 "tee vain kaikki mahdollinen 210 junaan. sanon sitten kun julkaistaan" → TF vasta omistajan sanasta.
- 22.42 "Otetaanko havainnekuva tekijöiden työkaluihin?" → "Kyllä, heti" (tekijät sovittavat itse ennen tarkistusta, kaikki pelit).
  Kirjattu Raamattu 7.20 + tekotavat B 11.6 + loki: PR #5210 (82a8f66d6) JU:lla.

## 1. JUNA 210 (ei TF:ää)
- Ämpärissä ja hyväksytty: tausta-v42, muurikate-v12, rakennukset-v31 79a145c5398a (kujaporttien kaarevat räystäät, Meridiaaniportin
  aukoista räystäät pois), lähipuut-v2, avoimet-v31 aa1d0a732224 → KORVAUTUU avoimet-v33:lla (PT hyväksyi 01-parin 22.59: katot
  näkyvät päältä, räystäs 1,4 m, talot ×0,70, pilarit seinän tasoon). LR lähettää v33-tarkistussumman → JU vienti → NS:lle tieto.
  OSOITIN NS:lle vasta PT:n hyväksymän VS:n PARIN 7 jälkeen (NS ja JU tietävät).
- VS: pari 7 (01, 02, 03 = (6,4, −190) → N, 05) ei vielä lähtenyt: lattia tumma (50 vs ~205), 01:n varjo 67 % (31 %). A/B-ajo 9 kytkimellä
  selvittää mustan muurin ja tumman lattian (leivonta ei syy). PT:n linja: ei eri aurinkoa yhdelle kuvalle eikä muurien madallusta;
  koe aurinko 55–60° koko kohtaukseen. Kokeet editorissa, simu vain lopulliseen pariin. Raketin kohta 1 parin 7 jälkeen.
- LR: havainnetyökalut PR #5211 (tools/havainne-kamera.py, havainne-mittari.py, ohje havainne-tyokalut.md; mittarikorjaus b0239f131,
  uudet rivit katon yläpinta ja kattojen väli) → JU mainiin. Seuraavaksi mittarikierros kuville 02, 05, 03.
  Kohta 7: Meridiaaniportin siivet todellisissa mitoissa (U 78 m), PT katsoo pelikuvasta.
- PK: kujakamera efa522e20, harjakoristeet dafc98fbf, v42-reitti (piilossa 123 → 34; räystäspiilot 0,1–0,3 s), havainnevertailu
  proto pelikoodari/havainne-210 40c8f0d20 (tyokalut/havainne/vertailu.sh <01|02|03|05> [still], simulla). Kärki: 810-parit
  01/02/05/03 + piha-02 uuteen paikkaan v42:lla + kattojen näkyvyys (P5: häivytys piilottaa katot) → PT. Sitten juoksu kujiin ja porttien läpi.
- NUI: havainnevertailu ilman simua (natiivi-ui/havainne-editori-210 a8ca604ce, editori batchmode); arvio 30 min, rivi PT:lle.
- NS: saapumislento askel 14 5a5a49dce (huiput 147 → 58–75 ms, yhä 15–19 ruutua > 20 ms; GPU-odotus ja GC jäsennyksestä).
  PT:n oletus: ei näkyvää lisäodotusta. Kokeet: esilataus + taustajäsennys ennen lentoa (kortti auki), puskurit kierrätykseen, piirron
  kevennys VS:n kanssa. Ei riitä → aamulla KK:lle KYSYMYS pidemmästä latauskuvasta.
- Muistokupla 2 valmis (df46b2036, junassa). Kupla 4 lautaspino HOLD: omistajan päätös lautaspöydästä (lautaspoyta-v2-ehdotus,
  #799/#883) → AAMULLA KK:lle KYSYMYS (yksi asia).
- VIDEOT vasta, kun 810 + värit + väläyskorjaus ovat rungossa.

## 2. MUUT
- Levy 96 Gi 22.58 (PK poisti 13,9 Gt app-kopioita, JU siirsi 24,4 Gt T7:lle). Todistuskansiot 37 Gt ovat tuoreita (mp4).
- Asemataulu: junan 210 Työn alla siivottu 23.0x (5 aktiivista riviä); logo ja alkulennon tekstit valmiina. KK odottaa omistajan korttia (22.56).
- Natiivi-UI ja Äänittäjä: Äänittäjä levossa ilman jonoa.

## 3. Opit
- Mittari ei riitä yksin: v32-01:n luvut täsmäsivät, mutta kuvassa katot näkyivät alta. PT katsoo aina kuvan; puuttuva tarkistus lisätään mittariin.
