# Pelikoodari: luovutus 10.11.2026 klo 02.16

Korvaa kaikki aiemmat. Edellinen: `git show 15c7500ab:docs/raportit/viesti-pelikoodari-luovutus-20261110-0115.md` (hoidettu tai alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu,
haara pelikoodari/juoksu-leivottu = 0b94205f1 (remote natiivi-backup). Python-työkalut ilman -I:tä (numpy käyttäjän site-packagesissa).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-leivottu/: SUUNNITELMA-vaihe2.md (lue ensin), TULOS-ipad-ab.md.

## TEHTY TÄSSÄ VUOROSSA
- MUISTIHUIPPU: TULOS-ipad-ab.md:n 2776/2733 Mt olivat väärät (kuvaloki loppui ennen juoksun avausta) → korjattu. Juoksun aikana
  fp ≈ 5119 − "talot muisti … vapaa" (pari-1: 4090 = VIKA-rivi). Leivottu 4,04–4,12 Gt, pois-puoli 4,27–4,37 → säästö ~250 Mt.
  pari-1: Kartassa fp 2683 → juoksussa ~3870 (gfx +970: ASTC-kuvat ~550 + verkot/RT), latauksen aikana +250 Mt ylimenevä huippu.
  PT 01.4x: leivottu EI junaan ennen kuin huippu selvästi < 4080 Mt kaikissa skenaarioissa; korjaus vasta erittelyn jälkeen.
- Erittelyajo sk-ipad-muisti-1.txt JU:lle (muisti-tarkka.txt = 100 ennen käynnistystä; T-rivit = tekstuurit+verkot nousun hetkellä,
  A-rivit = VM-alueet; "komento talot tila" ja "komento kartta muisti tila" ennen/jälkeen juoksun) → lokit/pelikoodari-muisti-1.
- Lohkot-1 (fa45864cc) luettu: lataus 14,8 s; LOD0 3,27 s/100 r, valmiin jälkeen 1,76, alku 1,70, ulkorengas 1,10, kopiot+lepo 0,88 … (SUUNNITELMA).
- Rakennukset-v127 (LAV): b6ffa01a4 = JUNA 224 (JU 01.49, testit läpi). Ämpäri täsmää LAV:n SHA256SUMS:iin.
- Leivottu paketti-v2 (PT): a2e7d0496 (lista v118→v127, Palvelin leivottu-v2, Rakennus/työkalu paketti-v2). paketti-v2/ valmis,
  1054 tiedostoa, SHA256SUMS OK; v1:stä muuttui vain LAV:n 11 glb:tä. EI VIETY: vienti-leivottu-v2.zsh JU:lle PT:n luvalla.
- Vaihe 2a 0b94205f1: ulkorengas esihaku (3), osasarja haut rinnakkain + ruutubudjetti 10 ms, lähipuiden 18 lajia rinnakkain.
  QA vanhaan: palatsi rengasesihaku 0 / rinnakkaishaku 0 / ruutubudjetti 0. unity-tarkistus 0 virhettä. A/B sk-ipad-vaihe2-0/-1
  (ajot 0,1,0,1) vaatii leivottu-v2:n ämpäriin; PT:lle kysytty 02.1x (vastaus auki).
- HUOM: haaran kärki (0b94205f1) hakee leivottu-v2:ta → iPad-ajot tällä haaralla vasta v2:n viennin jälkeen. ccd8531d2-ajot (v1) ennallaan.

## JONO
1. JU:n koontiviesti ccd8531d2:n ajoista (kylma-0/-1, piikki-0/-1, pari-0/-1; kaikissa VIKA-ohitus): kokoa kuvaparit PT:lle (vasen 0,
   oikea 1, sama rajaus, täysikoko): pari a–d ja piikki a/b. Piikki vain 1:ssä → leivonnan vika (vertaa glb lähde vs paketti), molemmissa
   → vanha, kerro kenen. Keisari kuvioituna piikki1-a:ssa? Kylmä lataus: "latauksen ositus" s + "verkosta yhteensä N tiedostoa X Mt",
   kylma-1:ssä "leivottu paketti palvelimelta 1054 tiedostoa" eikä "leivottu kuva" -varoituksia. Muistihuippu jokaisesta: 5119 − min vapaa
   juoksun aikana (awk-rivi: /juoksupeli: avataan/ jälkeen "vapaa N Mt" min).
2. MUISTI-1 (lokit/pelikoodari-muisti-1, muisti-tarkka.log): selitä huippu (T-rivien suurimmat tekstuurit/verkot, A-rivien alueet, talot
   palat/Mt, kartan muisti). Korjaa niin, että huippu selvästi < 4080 Mt (tavoite ~3,7 Gt). Ehdokkaat: latauksen ylimenevä ~250 Mt
   (glb-tavut/CPU-kopiot ennen kopiot+lepo-vaihetta), Kartan jäänteet (talot 60–108 palaa, piirroslaatat, elävä kartta; KartanMuisti
   vapauttaa vain Pallo-tilesetin; talot = Karttasepän alue → kysy KS:ltä/PT:ltä). ASTC 6x6 (−290 Mt) muuttaa ulkoasua → vain PT:n luvalla.
   Tulos rivinä PT:lle ja KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a). Sitten kuvapari + piikki + kylmä lataus uudelleen (PT).
3. PT 02.3x (kumoaa 02.2x:n "ei vientiä"): v2 viedään omaan kansioon leivottu-v2/; JU:lle pyydetty 02.3x vienti + muisti-1:n
   jälkeen 0b94205f1-käännös ja sk-ipad-vaihe2-0,-1,-0,-1 → lokit/pelikoodari-vaihe2-0a/-1a/-0b/-1b. Lue lohkot + muistihuippu (5119 − min vapaa)
   → rivi PT:lle. Muistikorjaus, joka muuttaa pakettia → uusi kansio v3. Seuraavaksi LOD0 (EsihakuN 3 → ? muistin kanssa), valmiit verkot vasta jos rakenna pullonkaula.
4. LAV:n uusi lattia + valo (omistaja 22.56): kun LAV ilmoittaa → paketti-v3 (uusi kansio, Palvelin leivottu-v3, SHA256SUMS, vienti-skripti).
   ÄLÄ muokkaa lattian geometriaa tai valoa.
5. JUNAAN vasta PT:n kuittauksella (kuvapari + sekunnit + muistihuippu).

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh). Laitteet: iso iPad JU:n vuorolla; iPhone mittaamatta, laite puuttuu.
