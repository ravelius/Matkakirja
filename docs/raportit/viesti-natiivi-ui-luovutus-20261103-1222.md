# Natiivi-UI: luovutus 3.11.2026 klo 12.22 (KK 1–7 kuitattu; valkoiset pallot, kartussi ja terävä-odotus koodattu; simu odottaa yhdistelmää)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1059.md (+ LISÄYS 11.08). Syy: kontekstivahti 25 %.

## Tehty (proto `natiivi-ui/saapumiskuvat-nousu-218`, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin,
## peili natiivi-backup peili/proto/natiivi-ui/saapumiskuvat-nousu-218; KOE)
- Simu 749ce84be (lokit/nui-kk-korjaukset-749ce84be-20261103): PT kuittasi KK 1, 3, 4, 7.
- **7ce5d4f80** KK 2: isoisän kuva ei noussut matkakirjasta, koska .mk-kuvakortin USS-siirtymä (translate 0,22 s) pehmensi
  KuvaKasvaan ruuduittaiset arvot → transitionDuration 0 nousun ajaksi (Luentakuvasarja.Nousee). Simu b11d3fc67: OK, PT kuittasi.
- **b11d3fc67** `ui kohdenostot` kertoo pienen kuvan tilan (KuvanTila: näkyy, valmis, tekstuuri, ruutu).
- **5cf520dd5** kartussi: Matkalla lähtömaa (Kartuscha.lahtoMaa), kohdemaa vasta saapuessa (NS:n selvitys, PT kuittasi koodin).
- **b5aead9f6** valkoiset pallot Notre-Damen ja Panthéonin kylttien oikealla = LRU tuhosi näkyvät pikkukuvat (tekstuuri False;
  tuhottu piirtyy valkoisena) → Kuvat.Kiinnita (NostotKartalla.Merkki.KuvaTex, vapautus kuvan vaihtuessa; SaapumisKuvat pienet).
- **e9e815017** Saapumistraileri.KarttaTerava (Func<string,bool>, null = ei odotusta): nousukokeessa 1. kuva odottaa kartan
  terävöitymistä, 400 ms sen jälkeen, alaraja NousuPysahdysMs, katto 3 s. Kytkentä odottaa NS:ää (alla).
- Simu b11d3fc67:n pallo/reittivideo epäonnistui: "kulkutapa bussi" avaa listan, ei noppaa. Noppa = **kulkutapa liftaus**
  (HeitaJaValitse) → siirtokohteet, sitten "rivi 0". "heita" toimii vain vaiheissa Heitto/Siirto.

## SEURAAJAN JONO
1. JU antaa yhdistelmän SHA:n (juna-218 + KS Big Ben + NUI e9e815017 [+ NS af33a29ba, jos NS:n mittaus terävä]; nyt 5d742b53d,
   worktree /Users/Shared/Claude/wt/julkaisija-yhdistelma-218) ja "KÄÄNNÖS NYT L<n>". Päivitä SHA skriptiin
   /Users/Shared/Claude/proto-3d/lokit/nui-pallot-kartussi-b5aead9f6-20261103/ajo.zsh (rivit 10–11) ja aja `zsh ajo.zsh <n>`
   taustalla → VAPAA JU:lle heti lopussa.
   Tarkista: pariisi-pienet-kuvat.png ilman valkoisia palloja + `ui kohdenostot` konsolissa "tekstuuri True"; kartussi lennolla
   lähtömaa (video nousu-lontoo: RANSKA, ei ISO-BRITANNIA); pallot-reitit: panorointi maatasolla (pallot paikallaan), liftaus →
   reitit, rivi 0 → liikkuminen (reitit näkyvät, pallot pois valinnan ajaksi). Tulos PT:lle 3 riviä → PT kokoaa KK:lle.
2. NS (local_99130238): ehdotettu rajapinta: NS tekee Kartta-puolelle staattisen `bool <Luokka>.SaapumisTerava(string)` (≥ 99 %);
   NUI kytkee UiNakymatissa `Saapumistraileri.KarttaTerava = k => …`. Vastausta ei vielä tullut.
3. Pieneen iPadiin vain PT:n luvalla (JU, yksi asennus).
4. Vanhat: video iPadilta; veneet joen keskiviivaa; animaatiokuvien ämpärivienti PT:n luvalla; Codexin vana-otto.
