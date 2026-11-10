# Pelikoodari: luovutus 10.11.2026 klo 03.33

Korvaa kaikki aiemmat. Edellinen: `git show 078812989:docs/raportit/viesti-pelikoodari-luovutus-20261110-0315.md` (hoidettu tai alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu
(haara pelikoodari/juoksu-kylma = 318b4a3d0, remote natiivi-backup). Python ilman -I:tä.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-leivottu/ (TULOS-vaihe2-3a3011bb8.md, TULOS-muisti-2.md, sk-ipad-kylma-3.txt).
Pulu-työpuu /Users/Shared/Claude/wt/pulu-kaupungit-maat (haara pelikoodari/pulu-kaupungit-maat = 20d3470c1, origin).

## TEHTY TÄSSÄ VUOROSSA
- GLB-ESIHAKU 318b4a3d0 (PT:n KYLLÄ 03.1x): JuoksuLeivottu.Esihae(m) käynnistää myös hakemiston glb:t taustalle (GlbHakuja 6 rinnakkain,
  kukin omine kuvineen ennen levykirjoitusta); JuoksuHahmot.Hae → JuoksuLeivottu.HaeGlb (käynnissä oleva haku muistista / levy / oma haku);
  kesken jääneet työt pois Aloitassa. QA "juoksupeli palatsi glbesihaku 0|1", "glbhaut N". Raportti: "glb taustalta N (Mt), etuala odotti N";
  loki "glb-esihaku valmis". unity-tarkistus 0 virhettä. MITTAAMATTA: JU:n JX = sk-ipad-kylma-3.txt KAHDESTI → lokit/pelikoodari-kylma-3a/-3b.
- VAIHE2 lämmin (3a3011bb8): vanha 16,8/16,8 s → vaihe 2 15,5/15,4 s (−1,3 s; ulkorengas 1,45 → 0,45). PT:lle 03.2x.
- MUISTI-2 (3a3011bb8, talot pois): huippu 3997 Mt (muisti-1 4182), ei VIKAa; talot 0 juoksussa, palaavat paluussa. PT kuittasi 03.3x.
- PULU v6 VIETY: KK:n luku A 1–10 (23d6b0518, -2) + B 5 lausetta (bdfb0874f, -3) → KK KELPAA 03.26 → PT kuittasi → JU vei 03.27
  pulu/vastaukset/v6/ (44 tiedostoa; CDN FRA/GBR/maat tarkistettu). Työkalu tools/pulu-esigenerointi/korjaa-paketti.py + SKANDAALIT/MUUTOKSET-KK.md
  (rakenna-v6.sh viimeinen vaihe; v5-pohjasta tulleet jäänteet korjataan paketissa). Osa C ja nimien yhtenäistys PT:llä. NUI tekee v6-polun.

## JONO
1. KYLMÄ-3: kun JU:n kylma-3a/3b valmiit: "latauksen ositus" (tavoite selvästi < 122 s; kylma-2 115,5), lohkot LOD1/LOD0, "glb-esihaku valmis",
   "etuala odotti", muistivahti.log huippu (esihaku pitää glb:itä muistissa) → TULOS-kylma-3.md + rivi PT:lle.
2. MUISTI ≤ ~3800 Mt (PT 03.3x: ≥ 280 Mt marginaali kaikissa skenaarioissa; nyt 3997): "taivas pakatuksi + latauskuvat".
   - TAIVAS: ajonaikainen Compress (TaivasPalatPakkaa, iOS:llä ETC2) on PT/PK 27.10. porrastuksen takia hylätty → tee LEIVOTTU taivas:
     uusi tyokalut/juoksu-taivas-leivonta.py: lataa Polku + "taivas-paiva-codex-v3-8192/" palat.json + palat + v2:n taivas.png, porttaa
     KoostaTaivasPalat (JuoksuV4Maailma.TaivasPalat.cs: zeniitti v2:sta 2× bilineaarinen, vaaka/pysty-ristihäivytys, kääre) numpyyn →
     PNG → juoksu-leivonta.pakkaa() 4x4 sRGB (mipit mukana, ~21 Mt vs 64) → leivottu paketti-v3 (uusi kansio, hakemistoon polku esim.
     juoksupeli/maailma-v4/taivas-paiva-codex-v3-8192/taivas-koottu.astcm). Peli: KoostaTaivasPalat alkuun "jos PalvelinUrl(kansio+taivas-koottu.astcm)
     → Hae + Texture2D + JuoksuLeivottu.Lataa", muuten koostus kuten ennen (simu). Säästää myös koostuksen 1,5 s. Kuvapari koostettu vs leivottu PT:lle.
   - LATAUSKUVAT: huippu (171 s) on latauskuvan vielä näkyessä → selvitä Kuvat-välimuistin purettujen latauskuvien koko (EsilataaLatauskuvat purkaa
     6 kuvaa SeuraavaRuutu-tasolla; vain näytettävä tarvitaan) ja pura vain käytettävä / vapauta muut juoksun avautuessa.
   - Muut erät: TULOS-muisti-1.md "Korjaussuunnitelma" (malloc-huippu latauksessa). Mittaus: muisti-3 (JU), uusi paluukuva LÄHEMPÄÄ niin, että
     talot erottuvat (PT 03.3x: nyt koko kaupunki) → muokkaa sk-ipad-muisti-2.txt → -3 (kamera alas ennen kuvia).
3. Paketti-v3 yhdistää LAV:n uuden lattian + valon (jono-5 ent.) ja taivaan: uusi kansio, Palvelin leivottu-v3. ÄLÄ muokkaa lattian geometriaa/valoa.
4. Kaupunki/maa-erä (1 870) lähdetarkistukseen vasta myöhemmin (PT kirjaa työlistaan).
5. JUNAAN vasta PT:n kuittauksella (huippu ≤ ~3800, kylmä selvästi < vanha, lämmin nopeampi ✔, kuvapari ilman valkoisia).

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh; 318b4a3d0: 0 virhettä). Laitteet: iso iPad JU:n vuorolla.
Vahti: lokit/pelikoodari-*.ajo.log VALMIS-rivit (Monitor, mtime-raja nykyhetki, ettei vanhat laukea).
