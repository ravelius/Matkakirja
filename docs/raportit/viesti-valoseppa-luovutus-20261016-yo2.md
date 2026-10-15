# Valoseppä – luovutus 16.10.2026 yö 2 (01.4x, KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261016-yo.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut). Käännös Julkaisijalta
(local_5cb16c00). D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Jono: $D/JONO.md (TILA 00.3x … 00.5x lopussa). Simuloki: $D/testi196-uusi.log.

## 0. ENSIMMÄISENÄ: SIMU A26BC7D0 ON VALOSEPÄLLÄ (Julkaisija: "pysyy sinulla"; lopuksi SIMU VAPAA Julkaisijalle)
Taustaprosessit (luovuttajan; voivat katketa nollauksessa – tarkista `pgrep -fl "raketti-v2-jono|salamat-eu2-jono|yovalot-tele/aja"`):
1. VALMIS 01.47 (arvioimatta): lokit/todistus-yovalot-tele-20261016-0142/TODISTUS.md. Oli: etsimen A/B käynnissä 01.42 (yovalot-tele 0ca3e2ce2, $D/yovalot-tele/aja.out). aja.zsh lukee nyt SHA:n appin kaannos.txt:stä.
   Valmistuttua kirjataan "LOPPU etsin-AB (merkitty)" lokiin. Tulos → arvioi + PT:lle (etsimen kipinöinti, PT:n järjestys kohta 2).
2. KÄYNNISSÄ 01.47 – salamat-eu2-jono.zsh: etsimen jälkeen SALAMAT EUROOPASSA (sk-salamat-eurooppa.txt: kohdevalikko "Rooma" kesäyö kausi 2 vrk 3,
   testiukkoset radan eteen) → $D/iss-nyt/salamat-eu2.out. ENSIMMÄINEN ajo kohdevalikon kelauksella: tarkista lokista "valikko Rooma
   kelaus" ja "elävät 3". Jos ei kelannut: kokeile "Venetsia"/"Napoli ja Vesuvius" tai `linssi raketti kelaa <lat> <lon>` Cupolassa.
3. raketti-v2-jono.zsh: odottaa testi-196 68a606437 -käännöstä (L2-jonossa) → raketin TÄYSI lento väreily v2:lla (sk-raketti-v2.txt,
   tila + kuva 3 s välein) → $D/iss-nyt/raketti-v2.out. Tarkista tilariveiltä "alusta näkyy" T+0…15 s ja "kauko ×N".
Jos kuolleet: aja itse `SKENAARIO=<sk> APP=<app> zsh $D/iss-nyt/aja-video.zsh <kaannos-sha>` (app: $D/tulivuoret/app tai kopio $D/t196-uusi).

## 1. 23.12-VIDEO = JUNAN 196 EHTO (PT: omistajalle "kaikki kolme" ennen kytkentää)
- AURINGONNOUSU ✓ ja PERSEIDIT ✓ (PT katsoi): lokit/todistus-iss-nyt-video-20261016-0107/iss-nyt-auringonnousu.mp4, -perseidit.mp4.
- SALAMAT: välähtely korjattu (Tiheys 0,5, iss-efektit-196 256088e7e) ✓. PT hylkäsi mustan kuvan (Bengalinlahti) → tarvitaan rannikko/
  kaupunkivalot + horisontti, ei dev-konsolia (`ui konsoli pois` skenaarioon). Intia (0126): yövalot karkeita → Eurooppa. 0135 Italia:
  kuva upea mutta 0 salamaa, koska elävät ukkoset suodatetaan aseman TODELLISESTA maapisteestä (≤ 2300 km) eikä siirra-paikasta →
  eu2-ajo kelaa oikeaan ylilentoon (kohta 0.2). Oranssi "liekki" = punainen keiju (PT:lle selitetty).
- RAKETIN VÄREILY: v1 ei näkynyt (lähikuva loppuu T−0:01, liekki vain kaukokuvassa; 0126 tila T+0:50 "näkyy 0,62"). PT: EI pois →
  v2 tehty: vareily-196 0f51d09ea (alustan lämpönauha 90 × 14 m sytytyksestä, hiipuu 4–15 s; liekin nauha ×≤ 4 kaukokuvassa;
  unity-tarkistus 0), testi-196 68a606437, käännöspyyntö Julkaisijalla. Jos ei vieläkään erotu videolla: säätimet testikomennolla
  `linssi raketti vareily _Siirto=0.012` (koskee molempia aineita) tai Vareily.Raketti.AlustaKorkeus/AlustaSade/KaukoPx.
- Kun kaikki kolme kunnossa: PT:lle ≤ 3 riviä + mp4-polut. Junaan (PT kuittaa): NS:lle iss-efektit-196 + vareily-196 (kytkimien takana).
- Arviot: $D/iss-nyt/ARVIO-0021.md, ARVIO-0107.md, ARVIO-0126.md.

## 2. Peking (omistaja 00.3x, junan 196 ehto) – TEHTY, seuranta
- NS:lle peking-testi-196 2c72c4935 runkoon 196 (lähetetty 00.5x; kuittausta ei vielä nähty → tarkista NS:ltä).
- Ämpäri: kartta/omat-mallit/piilo/peking/uusin.json → p284v2/ VIETY 00.42 (200 OK, tarkistettu curlilla).
- Codex-posti 7d9404451 (claude/postilaatikko): seuraava paketti heti ilman ajoitusrajaa. Uusi paketti → peking284/rakenna.py →
  lentotesti peking284/ajo.zsh → uusi versiokansio + uusin.json vientinä (vie-paketti.sh Julkaisijalla, ei junaa).
- Pelin puoli kesken: iltavalo (katot oliivinruskeat klo 18) + Ionin maan piilotus Codexin polygonista (odottaa pakettia).

## 3. Louvre (LR) – pari valmis, LÄHETTÄMÄTTÄ (PT: vasta junan ehtojen jälkeen)
- LOD0 + LOD1 syvyysleivottu k23:lla (LR:n k23 00.37 = k21 Denon-korjaukset + reunus pois): louvre1/syvyys/LOD0-RAPORTTI.md,
  leivo0b.py (agentti; LOD0 COLOR_0, GPU +0 Mt). Paketti louvre1/v6k18-lv2f-k23s (portti 0 virhettä).
- Pari: $D/louvre1/louvre-v2f-k23s-pari-kulmaB.jpg (k14s | k23s): kaarikäytävät tummemmat, patsaan tumma reunus poissa → LR:lle.

## 4. Kierrokset (testi-196): 7/7 ajettu; arvio $D/KIERROKSET-20261016-ARVIO.md + <ilmiö>/kierrokset/kN/ARVIO.md
- Ei yhtään omistajalle valmista. LÄHES: tähdenlennot k1 (ohentuva viiru, väri), hurrikaani k1 (kummut), vanat k1 (leveys iän mukaan).
  EI: salamat k3 (valo sinisemmäksi, kirkkaus 3,2→1,6, keijun ydin), tulivuoret k6 (Etna: Sisilia ei latautunut; kiekot litteitä),
  pimennys k1 (kokeile `_Jyrkkyys=0.35 _Pohja=0.006`). Salamat k3 + revontulet k11 ajettu uudelleen 06ad8a2b7:llä (ei vielä arvioitu).
- Kuvakulmat: Reykjanes, hurrikaanin silmä, tähdenlentojen zoomi jäävät reunaan/paneelin taakse → korjaa skenaariot ennen seuraavia.

## 5. Haarat (proto-3d, worktreet /Users/Shared/Claude/wt/proto-linssiseppa2-*)
- iss-efektit-196 256088e7e, vareily-196 0f51d09ea, testi-196 68a606437 (kierroksiin, EI junaan), yovalot-tele-196 a0f1f82a0,
  peking-testi-196 2c72c4935.
