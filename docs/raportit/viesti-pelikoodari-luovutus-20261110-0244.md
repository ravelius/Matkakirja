# Pelikoodari: luovutus 10.11.2026 klo 02.44

Korvaa kaikki aiemmat. Edellinen: `git show aa242e7f5:docs/raportit/viesti-pelikoodari-luovutus-20261110-0216.md` (hoidettu tai alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu
(haara pelikoodari/juoksu-leivottu = 96ec56672, remote natiivi-backup). Python-työkalut ilman -I:tä (numpy käyttäjän site-packagesissa).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-leivottu/: SUUNNITELMA-vaihe2.md, TULOS-ccd8531d2-parit.md, TULOS-muisti-1.md.

## TEHTY TÄSSÄ VUOROSSA
- KUVAPARIT ccd8531d2 (kuvaparit-ccd8531d2/, PT:lle raportoitu): leivotun valkoiset lähipuut/aarteet = asiakkaan vika JuoksuLeivottu.Viitteet
  (`i + 40 < b.Length` ohitti tiedoston viimeisen kuvaviitteen, 59 glb:tä/49 kuvaa) → korjaus 96ec56672. Paketti oikein. Piikki molemmissa
  → vanha (rakennusgeometria, LAV). Lämmin 17 vs 23 s, kylmä 274 vs 122 s (kuvahaut sarjassa), huippu 3937–4164 vs 4231–4286 Mt.
- PT:n JUNAEHDOT (02.4x): huippu selvästi < 4080 Mt kaikissa, KYLMÄ ≤ VANHA (kuvahaut rinnakkain), lämmin nopeampi, kuvapari ilman valkoisia.
- MUISTI-1 (TULOS-muisti-1.md): huippu 4182 Mt klo 176 s (latauksen loppu), asettuu ~3960. Kartan talot 108 palaa 231 Mt jäivät juoksuun
  (KartanMuisti vapauttaa vain Pallon) + latauksen lopun ylimenevä ~220 Mt ("valmiin jälkeen": 1. kuva 125 m:stä, varjot, osasarjan atlakset;
  osa purkautumisesta oli talojen pudotusta iOS-varoituksesta) + latauskuvat 2 × 15 Mt + taivas RGBA32 64 Mt.
- TALOT POIS JUOKSUN AJAKSI (PT:n KYLLÄ 02.4x): 544dd537c haara pelikoodari/juoksu-talot-pois (96ec56672:n päällä, natiivi-backup):
  TaloKerros.Paivita alkuun `if (KartanMuisti.Vapautettu) { VapautaKaikki(); return; }`. KS:lle ilmoitettu. KS:n haarat: talot-palvelimelle(-ns),
  sade-yla-220 yhdistyvät ristiriidatta; ajo-yhteinen-44/sade-220/talot-sade ristiriidassa jo ilman tätä (vanhoja kokeita).
- JU: leivottu-v2 viety (ämpäri juoksupeli/leivottu-v2/, 1055, CDN 12/12). Vaihe2-A/B käännös 96ec56672 (JI2), iPad 0a/1a/0b/1b muisti-1:n
  jälkeen → lokit/pelikoodari-vaihe2-*. Muisti-2 pyydetty vaihe2:n jälkeen: käännös 544dd537c, sk-ipad-muisti-2.txt (sis. paluu kartalle:
  talot tila 2/7/17/37 s + kuvat muisti2-paluu-a/b/c) → lokit/pelikoodari-muisti-2.
- PULU HETKET (PT 03.2x rinnakkaiserä): adb39d1c2 (pelikoodari/pulu-kaupungit-maat, työpuu /Users/Shared/Claude/wt/pulu-kaupungit-maat):
  11 hetkeä, 22 + 58 vastausta, kohta hetki:<id> FRA/GBR; tools/pulu-esigenerointi/valmistele-hetket.mjs, yhdista-mallinostot.mjs
  (PULU_MERKINTA). Paketti v5 /Users/Shared/Claude/proto-3d/_valmiit/pulu-v5-hetket-20261110 (SHA256SUMS OK, EI VIETY). KK:lle
  LUETTAVAKSI.md lähetetty 02.4x; junaan vasta KK:n luettua. Natiivin polku v4 → v5 tekemättä (NUI:n PuluValmiitLataus).

## JONO
1. VAIHE2-A/B (JU): lue lokit/pelikoodari-vaihe2-0a/-1a/-0b/-1b: lohkot ("latauksen ositus lohkot"), latausaika, muistihuippu
   (5119 − min "vapaa" juoksun avauksesta) → rivi PT:lle.
2. MUISTI-2 (JU, 544dd537c): huippu ja asettunut; talot tila juoksussa = 0 palaa; paluu: palojen palautusaika ja kuvat a/b/c (ei tyhjää/valkoista
   karttaa) → kuvat + rivi PT:lle ja KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a). Jos yhä > ~3,8 Gt: ylimenevä (1. kuva vasta PuraLod2:n,
   CPU-kopioiden ja GC:n jälkeen; korttipuut/atlakset ennen 1. kuvaa) ja latauskuvat (JuoksupeliNakyma esilataa muistiin r. 56–74; säästö 30 Mt).
   Taivas ASTC 4x4 (−48) / ASTC 6x6 (−290) vain PT:n luvalla.
3. KYLMÄ LATAUS (junaehto): JuoksuLeivottu.HaeKuvat hakee kuvat sarjassa glb kerrallaan → rinnakkain (esim. 6–8 samanaikaista, kuvatKesken-
   lukitus säilyy) tai koko kuvat/-luettelo kerralla hakemistosta. Mittaus kylma-1 uudelleen (sk-ipad-kylma-1.txt; leivottu-v2-polku).
4. PULU SKANDAALIT/SYVENNYKSET (PT, mainissa ca7406df9, PR 6532): 8 korttia (Pariisi 5 + Lontoo 3), 16 kysymystä: js/packs/skandaalit.js,
   fokusvirta-pariisi.js, fokusvirta-lontoo.js. Kohdat skandaali:<id> ja syvennys:<kaupunki>-<täky> (natiivi PuluValmiitLataus.Kohta,
   NUI a970b0d1c). Sama rutiini kuin HETKET: valmistele (kopioi valmistele-hetket.mjs), 2 Sonnet-agenttia vaihe 1 → PK faktatarkistus →
   tarkista-era vaihe1 → valmistele.mjs vaihe2 <data> FRA <kansio> 40 → 2 Sonnet-agenttia → Opus-faktatarkistus → tarkista-valmis →
   yhdista (pohja v5-kansio, PULU_VERSIO=v6, PULU_MERKINTA=skandaalit) → LUETTAVAKSI.md KK:lle + rivi PT:lle. EI vientiä.
5. LAV:n uusi lattia + valo: kun LAV ilmoittaa → paketti-v3 (uusi kansio, Palvelin leivottu-v3). ÄLÄ muokkaa lattian geometriaa tai valoa.
6. JUNAAN vasta PT:n kuittauksella (junaehdot yllä).

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh). Laitteet: iso iPad JU:n vuorolla; iPhone mittaamatta, laite puuttuu.
